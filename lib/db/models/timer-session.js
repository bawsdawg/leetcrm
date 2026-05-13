import mongoose from "mongoose";

const { Schema } = mongoose;

/** Live stopur pr. bruger (én aktiv session — Toggl-lignende). */
const timerSessionSchema = new Schema(
  {
    /** Auth user (Workspace `User`._id) — højst én aktiv timer pr. bruger */
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    teamMemberId: { type: Schema.Types.ObjectId, ref: "TeamMember", index: true },
    /** Påkrævet for Agency-tid (kunde); matcher `Client.slug` / mock id */
    clientSlug: { type: String, required: true, trim: true, index: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", index: true },
    departmentKey: { type: String, index: true },
    taskKey: { type: String, trim: true, index: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    description: { type: String, trim: true },
    billable: { type: Boolean, default: true },
    startedAt: { type: Date, required: true, index: true },
  },
  { timestamps: true },
);

timerSessionSchema.index({ userId: 1, startedAt: -1 });

const TimerSession =
  mongoose.models.TimerSession ?? mongoose.model("TimerSession", timerSessionSchema);

export default TimerSession;
