import mongoose from "mongoose";

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    /** Stable slug: seo, ppc, social, … */
    key: { type: String, required: true, unique: true, trim: true, index: true },
    name: { type: String, required: true },
    shortLabel: { type: String },
    /** Planned monthly capacity in hours (agency planning) */
    capacityHours: { type: Number, default: 0 },
    /** Optional Tailwind / design token name for UI */
    colorToken: { type: String },
  },
  { timestamps: true },
);

const Department =
  mongoose.models.Department ?? mongoose.model("Department", departmentSchema);

export default Department;
