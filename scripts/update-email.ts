import "dotenv/config";
import { connectDB } from "../lib/db";
import { Settings } from "../models/Settings";

async function updateEmail() {
  try {
    await connectDB();
    
    // First delete any existing settings
    await Settings.deleteMany({});
    
    // Then create fresh settings with correct email
    const result = await Settings.create({
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
      youtube: ""
    });

    console.log("✅ Email updated successfully!");
    console.log("New email:", result.email);
    console.log("Updated settings:", JSON.stringify(result, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating email:", error);
    process.exit(1);
  }
}

updateEmail();
