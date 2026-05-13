import mongoose from "mongoose";

const { Schema } = mongoose;

const contractSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    type: {
      type: String,
      enum: ["retainer", "project", "one_off", "subscription"],
      default: "retainer",
      index: true,
    },
    label: { type: String },
    value: { type: Number },
    currency: { type: String, default: "DKK" },
    startDate: { type: Date },
    endDate: { type: Date },
    renewalDate: { type: Date },
    status: {
      type: String,
      enum: ["draft", "active", "notice", "ended"],
      default: "active",
      index: true,
    },
    /** Snapshot of commercial terms / SOW ref */
    termsSummary: { type: String },
  },
  { timestamps: true },
);

contractSchema.index({ clientId: 1, status: 1 });

const Contract = mongoose.models.Contract ?? mongoose.model("Contract", contractSchema);

export default Contract;
