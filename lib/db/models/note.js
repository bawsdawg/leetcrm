import mongoose from "mongoose";

const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    key: { type: String, unique: true, sparse: true, trim: true },
    clientSlug: { type: String, index: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    authorMemberKey: { type: String },
    authorId: { type: Schema.Types.ObjectId, ref: "TeamMember" },
    type: {
      type: String,
      enum: ["note", "call", "meeting", "alert"],
      default: "note",
    },
    body: { type: String, required: true },
    /** Original timeline string or parsed instant */
    occurredAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

noteSchema.index({ clientId: 1, occurredAt: -1 });

const Note = mongoose.models.Note ?? mongoose.model("Note", noteSchema);

export default Note;
