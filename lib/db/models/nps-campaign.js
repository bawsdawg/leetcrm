import mongoose from "mongoose";

import { isTestField } from "@/lib/db/schema/test-data-flag";

const { Schema } = mongoose;

const npsCampaignSchema = new Schema(
  {
    name: { type: String, required: true },
    templateId: { type: Schema.Types.ObjectId, ref: "NpsTemplate", index: true },
    status: {
      type: String,
      enum: ["draft", "scheduled", "sending", "completed", "cancelled"],
      default: "draft",
      index: true,
    },
    /** Når bølgen planlægges sendt */
    scheduledAt: { type: Date },
    /** Tom = bureau-bølge; ellers målrettet */
    clientIds: [{ type: Schema.Types.ObjectId, ref: "Client" }],
    createdByUserId: { type: Schema.Types.ObjectId, ref: "User" },
    ...isTestField,
  },
  { timestamps: true },
);

npsCampaignSchema.index({ status: 1, scheduledAt: 1 });

const NpsCampaign =
  mongoose.models.NpsCampaign ?? mongoose.model("NpsCampaign", npsCampaignSchema);

export default NpsCampaign;
