import mongoose, { Schema, models, model } from "mongoose";

const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    email: { type: String, default: "salam.jan111@gmail.com" },
    phone: { type: String, default: "416 419 2457" },
    address: { type: String, default: "Ward 1, Oshawa, Ontario" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
    logo: { type: String, default: "/images/logo.png" },
    siteName: { type: String, default: "Vote Shinwary" },
    tagline: {
      type: String,
      default: "Strong leadership. Better Oshawa. A practical voice for Ward 1.",
    },
  },
  { timestamps: true },
);

export const Settings = models.Settings || model("Settings", SettingsSchema);
