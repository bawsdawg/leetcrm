import mongoose from "mongoose";

import { isTestField } from "@/lib/db/schema/test-data-flag";

const { Schema } = mongoose;

const teamMemberSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true, index: true },
    name: { type: String, required: true },
    roleTitle: { type: String },
    departmentKey: { type: String, index: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "Department", index: true },
    avatarInitials: { type: String, maxlength: 4 },
    hue: { type: Number, min: 0, max: 360 },
    weeklyHours: { type: Number, default: 37 },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true, sparse: true },
    active: { type: Boolean, default: true },
    ...isTestField,
  },
  { timestamps: true },
);

teamMemberSchema.index({ departmentId: 1, active: 1 });

const TeamMember =
  mongoose.models.TeamMember ?? mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
