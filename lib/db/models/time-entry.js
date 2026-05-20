import mongoose from "mongoose";

import { isTestField } from "@/lib/db/schema/test-data-flag";

const { Schema } = mongoose;

const timeEntrySchema = new Schema(
  {
    key: { type: String, unique: true, sparse: true, trim: true },
    memberKey: { type: String, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    teamMemberId: { type: Schema.Types.ObjectId, ref: "TeamMember", index: true },
    clientSlug: { type: String, index: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", index: true },
    departmentKey: { type: String, index: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
    taskKey: { type: String, index: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    /** Varighed i minutter */
    durationMinutes: { type: Number, required: true },
    description: { type: String },
    /** Hvornår arbejdet blev udført */
    workedAt: { type: Date, required: true, index: true },
    billable: { type: Boolean, default: true },
    source: {
      type: String,
      enum: ["manual", "timer"],
      default: "manual",
      index: true,
    },
    /** Ved stop-af stopur — koble log til sessions starttid */
    timerStartedAt: { type: Date },
    ...isTestField,
  },
  { timestamps: true },
);

timeEntrySchema.index({ workedAt: -1, teamMemberId: 1 });
timeEntrySchema.index({ userId: 1, workedAt: -1 });
timeEntrySchema.index({ clientId: 1, workedAt: -1 });

const TimeEntry = mongoose.models.TimeEntry ?? mongoose.model("TimeEntry", timeEntrySchema);

export default TimeEntry;
