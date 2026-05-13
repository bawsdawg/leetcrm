import mongoose from "mongoose";

const { Schema } = mongoose;

const teamMemberSchema = new Schema(
  {
    /** Short key matching mock data (e.g. lm, mk) */
    key: { type: String, required: true, unique: true, trim: true, index: true },
    name: { type: String, required: true },
    roleTitle: { type: String },
    departmentKey: { type: String, index: true },
    avatarInitials: { type: String, maxlength: 4 },
    /** For avatar tint when photos are not used */
    hue: { type: Number, min: 0, max: 360 },
    weeklyHours: { type: Number, default: 37 },
    /** Optional link to workspace User account */
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true, sparse: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const TeamMember =
  mongoose.models.TeamMember ?? mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
