import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    name: { type: String, required: true },
    title: { type: String },
    email: { type: String, lowercase: true, trim: true, index: true },
    phone: { type: String },
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true },
);

contactSchema.index({ clientId: 1, email: 1 });

const Contact = mongoose.models.Contact ?? mongoose.model("Contact", contactSchema);

export default Contact;
