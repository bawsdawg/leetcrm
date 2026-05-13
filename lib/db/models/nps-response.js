import mongoose from "mongoose";

const { Schema } = mongoose;

const npsResponseSchema = new Schema(
  {
    clientSlug: { type: String, index: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", index: true },
    contactEmail: { type: String, lowercase: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    sentAt: { type: Date },
    respondedAt: { type: Date, index: true },
    campaignId: { type: String, index: true },
    comment: { type: String },
  },
  { timestamps: true },
);

npsResponseSchema.index({ clientId: 1, respondedAt: -1 });

const NpsResponse =
  mongoose.models.NpsResponse ?? mongoose.model("NpsResponse", npsResponseSchema);

export default NpsResponse;
