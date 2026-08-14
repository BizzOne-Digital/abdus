import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in environment variables");
  process.exit(1);
}

async function forceUpdateEmail() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!");

    const db = mongoose.connection.db;
    
    // Get settings collection
    const settings = db?.collection("settings");
    
    if (!settings) {
      throw new Error("Settings collection not found");
    }

    // Delete ALL existing settings
    console.log("🗑️  Deleting old settings...");
    await settings.deleteMany({});
    console.log("✅ Old settings deleted");

    // Insert fresh settings with correct email
    console.log("📝 Creating new settings...");
    const result = await settings.insertOne({
      key: "site",
      email: "Vote4shinwary@gmail.com",
      phone: "416 419 2457",
      address: "Ward 1, Oshawa, Ontario",
      logo: "/images/logo.png",
      siteName: "Vote Shinwary",
      tagline: "Strong leadership. Better Oshawa. A practical voice for Ward 1.",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    });

    console.log("✅ New settings created!");
    
    // Verify the update
    const verify = await settings.findOne({ key: "site" });
    console.log("\n📧 Current email in database:", verify?.email);
    
    if (verify?.email === "Vote4shinwary@gmail.com") {
      console.log("✅✅✅ EMAIL SUCCESSFULLY UPDATED! ✅✅✅");
    } else {
      console.log("❌ Email update failed!");
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

forceUpdateEmail();
