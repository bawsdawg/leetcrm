import mongoose from "mongoose";

const { Schema } = mongoose;

const timeEntrySchema = new Schema(
  {
    key: { type: String, unique: true, sparse: true, trim: true },
    memberKey: { type: String, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    teamMemberId: { type: Schema.Types.ObjectId, ref: "TeamMember", index: true },
    clientSlug: { type: String, index: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", index: true },
    departmentKey: { type: String },
    taskKey: { type: String },
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    /** Duration in minutes */
    durationMinutes: { type: Number, required: true },
    description: { type: String },
    /** When the work happened */
    workedAt: { type: Date, required: true, index: true },
    billable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

timeEntrySchema.index({ workedAt: -1, teamMemberId: 1 });

const TimeEntry = mongoose.models.TimeEntry ?? mongoose.model("TimeEntry", timeEntrySchema);

export default TimeEntry;
