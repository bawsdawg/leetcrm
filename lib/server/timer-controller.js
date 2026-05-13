import mongoose from "mongoose";

import { auth } from "@/auth";
import { CLIENTS, TASKS } from "@/lib/crm/static-data";
import Client from "@/lib/db/models/client";
import TeamMember from "@/lib/db/models/team-member";
import TimeEntry from "@/lib/db/models/time-entry";
import TimerSession from "@/lib/db/models/timer-session";
import { connectDb } from "@/lib/db/mongoose";

function mongoUserId(session) {
  const raw = typeof session?.user?.id === "string" ? session.user.id : null;
  if (!raw || !mongoose.Types.ObjectId.isValid(raw)) return null;
  return new mongoose.Types.ObjectId(raw);
}

function clientMeta(slug) {
  const c = CLIENTS.find((x) => x.id === slug);
  return c ? { slug, name: c.name } : { slug, name: slug };
}

function taskMeta(key) {
  if (!key) return null;
  const t = TASKS.find((x) => x.id === key);
  return t ? { key, title: t.title, clientId: t.clientId } : { key, title: key };
}

function enrichSession(doc) {
  if (!doc) return null;
  const cm = clientMeta(doc.clientSlug);
  const tm = doc.taskKey ? taskMeta(doc.taskKey) : null;
  return {
    ...doc,
    clientName: cm.name,
    taskTitle: tm?.title ?? null,
  };
}

export async function getTimerForSession(session) {
  const userId = mongoUserId(session);
  if (!userId) return { error: "Unauthorized", status: 401 };
  await connectDb();
  const doc = await TimerSession.findOne({ userId }).lean();
  return { active: enrichSession(doc) };
}

export async function startTimer(session, body) {
  const userId = mongoUserId(session);
  if (!userId) return { error: "Unauthorized", status: 401 };

  const clientSlug = typeof body.clientSlug === "string" ? body.clientSlug.trim() : "";
  if (!clientSlug || !CLIENTS.some((c) => c.id === clientSlug)) {
    return { error: "Ukendt kunde", status: 400 };
  }

  const taskKey = typeof body.taskKey === "string" && body.taskKey.trim() ? body.taskKey.trim() : "";
  if (taskKey) {
    const t = TASKS.find((x) => x.id === taskKey);
    if (!t || t.clientId !== clientSlug) {
      return { error: "Opgave passer ikke til valgt kunde", status: 400 };
    }
  }

  await connectDb();
  const clientDoc = await Client.findOne({ slug: clientSlug }).select("_id").lean();
  const tm = await TeamMember.findOne({ userId }).select("_id").lean();

  const description = typeof body.description === "string" ? body.description : "";
  const billable = body.billable !== false;
  const departmentKey = typeof body.departmentKey === "string" ? body.departmentKey.trim() : undefined;

  const doc = await TimerSession.findOneAndUpdate(
    { userId },
    {
      $set: {
        userId,
        teamMemberId: tm?._id,
        clientSlug,
        clientId: clientDoc?._id,
        taskKey: taskKey || undefined,
        taskId: undefined,
        description,
        billable,
        departmentKey: departmentKey || undefined,
        startedAt: new Date(),
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  ).lean();

  return { active: enrichSession(doc) };
}

export async function stopTimer(session) {
  const userId = mongoUserId(session);
  if (!userId) return { error: "Unauthorized", status: 401 };

  await connectDb();
  const doc = await TimerSession.findOne({ userId }).lean();
  if (!doc) return { error: "Ingen aktiv timer", status: 400 };

  const ms = Date.now() - new Date(doc.startedAt).getTime();
  const durationMinutes = Math.max(1, Math.round(ms / 60000));

  await TimeEntry.create({
    userId,
    teamMemberId: doc.teamMemberId,
    clientSlug: doc.clientSlug,
    clientId: doc.clientId,
    departmentKey: doc.departmentKey,
    taskKey: doc.taskKey,
    taskId: doc.taskId,
    durationMinutes,
    description: doc.description,
    workedAt: new Date(),
    billable: doc.billable ?? true,
    source: "timer",
    timerStartedAt: doc.startedAt,
  });

  await TimerSession.deleteOne({ userId });
  return { ok: true, durationMinutes };
}
