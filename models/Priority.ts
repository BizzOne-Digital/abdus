import mongoose, { Schema, models, model } from "mongoose";

const DetailSectionSchema = new Schema(
  {
    key: { type: String, required: true },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const PrioritySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    cardImage: { type: String, default: "" },
    icon: { type: String, default: "shield" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    detailSections: { type: [DetailSectionSchema], default: [] },
  },
  { timestamps: true },
);

export const Priority = models.Priority || model("Priority", PrioritySchema);
