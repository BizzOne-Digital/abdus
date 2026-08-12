import mongoose, { Schema, models, model } from "mongoose";

const GalleryImageSchema = new Schema(
  {
    type: { type: String, enum: ["image", "video"], default: "image" },
    url: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    alt: { type: String, default: "" },
    caption: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const GalleryCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    images: { type: [GalleryImageSchema], default: [] },
  },
  { timestamps: true },
);

export const GalleryCategory =
  models.GalleryCategory || model("GalleryCategory", GalleryCategorySchema);
