import mongoose, { Schema, models, model } from "mongoose";

const SectionSchema = new Schema(
  {
    key: { type: String, required: true },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    body: { type: String, default: "" },
    image: { type: String, default: "" },
    buttonLabel: { type: String, default: "" },
    buttonLink: { type: String, default: "" },
    items: { type: [Schema.Types.Mixed], default: [] },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["published", "draft"], default: "published" },
    seoDescription: { type: String, default: "" },
    sections: { type: [SectionSchema], default: [] },
  },
  { timestamps: true },
);

export type PageDoc = mongoose.InferSchemaType<typeof PageSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Page = models.Page || model("Page", PageSchema);
