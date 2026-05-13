import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    key: { type: String, unique: true, sparse: true, trim: true },
    clientSlug: { type: String, index: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", index: true },
    title: { type: String, required: true },
    departmentKey: { type: String, index: true },
    assigneeMemberKey: { type: String, index: true },
    assigneeId: { type: Schema.Types.ObjectId, ref: "TeamMember", index: true },
    status: {
      type: String,
      enum: ["todo", "progress", "done", "blocked", "cancelled"],
      default: "todo",
      index: true,
    },
    dueDate: { type: Date },
    estimateHours: { type: Number },
    loggedHours: { type: Number, default: 0 },
  },
  { timestamps: true },
);

taskSchema.index({ clientId: 1, status: 1, dueDate: 1 });

const Task = mongoose.models.Task ?? mongoose.model("Task", taskSchema);

export default Task;
