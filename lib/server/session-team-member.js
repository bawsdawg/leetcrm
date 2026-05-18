import mongoose from "mongoose";

import TeamMember from "@/lib/db/models/team-member";
import { connectDb } from "@/lib/db/mongoose";

/** @returns {Promise<string>} TeamMember.key for current user or "" */
export async function assigneeMemberKeyForDbUser(session) {
  const uid = typeof session?.user?.id === "string" ? session.user.id.trim() : "";
  if (!uid || !mongoose.Types.ObjectId.isValid(uid)) return "";
  await connectDb();
  const m = await TeamMember.findOne({ userId: new mongoose.Types.ObjectId(uid) }).select("key").lean();
  return m?.key ? String(m.key) : "";
}
