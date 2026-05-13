import mongoose from "mongoose";

const { Schema } = mongoose;

/** Skabelon til at oprette standardiserede opgaver — matcher Task templates i UI. */
const taskTemplateSchema = new Schema(
  {
    /** Stabil nøgle fx `tpl-seo-audit` */
    key: { type: String, required: true, unique: true, trim: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    departmentKey: { type: String, index: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
    defaultPriority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    suggestedHours: { type: Number },
    checklist: [{ type: String }],
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

const TaskTemplate =
  mongoose.models.TaskTemplate ?? mongoose.model("TaskTemplate", taskTemplateSchema);

export default TaskTemplate;
