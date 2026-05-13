import mongoose from "mongoose";

const { Schema } = mongoose;

const knowledgeArticleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    title: { type: String, required: true },
    summary: { type: String },
    bodyMd: { type: String },
    tags: [{ type: String }],
    audience: {
      type: String,
      enum: ["internal", "client", "public"],
      default: "internal",
      index: true,
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "TeamMember" },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

knowledgeArticleSchema.index({ title: "text", summary: "text", tags: "text" });

const KnowledgeArticle =
  mongoose.models.KnowledgeArticle ??
  mongoose.model("KnowledgeArticle", knowledgeArticleSchema);

export default KnowledgeArticle;
