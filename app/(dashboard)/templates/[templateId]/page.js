import mongoose from "mongoose";

import { TemplateDetailPageClient } from "@/components/templates/template-detail-page-client";
import { shellMainStudio } from "@/config/shell";
import TaskTemplate from "@/lib/db/models/task-template";
import { TASK_TEMPLATES } from "@/lib/crm/static-data";
import { connectDb } from "@/lib/db/mongoose";
import { cn } from "@/lib/utils";

/** @param {{ params: Promise<{ templateId: string }> }} props */
export async function generateMetadata({ params }) {
  const { templateId } = await params;
  const demoRow = TASK_TEMPLATES.find((t) => t.id === templateId);
  if (demoRow) return { title: `${demoRow.name} · Skabelon · 1337-crm by Searchmind` };

  try {
    await connectDb();
    /** @type {Record<string, unknown>[]} */
    const orClause = [{ key: templateId }];
    if (mongoose.Types.ObjectId.isValid(templateId)) {
      orClause.push({ _id: new mongoose.Types.ObjectId(templateId) });
    }
    const doc = await TaskTemplate.findOne({ $or: orClause }).select("title").lean();
    if (doc && typeof doc.title === "string" && doc.title.trim()) {
      return { title: `${doc.title.trim()} · Skabelon · 1337-crm by Searchmind` };
    }
    return { title: "Skabelon · 1337-crm by Searchmind" };
  } catch {
    return { title: "Skabelon · 1337-crm by Searchmind" };
  }
}

/** @param {{ params: Promise<{ templateId: string }> }} props */
export default async function TemplateDetailPage({ params }) {
  const { templateId } = await params;
  return (
    <main className={cn(shellMainStudio)}>
      <TemplateDetailPageClient templateId={templateId} />
    </main>
  );
}
