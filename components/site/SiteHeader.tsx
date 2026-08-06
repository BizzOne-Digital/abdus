/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { Settings } from "@/models/Settings";
import { SiteHeaderClient } from "./SiteHeaderClient";

async function getSettings(): Promise<any> {
  await connectDB();
  return (
    (await Settings.findOne({ key: "site" }).lean()) || {
      siteName: "Vote Shinwary",
      logo: "/images/logo.png",
    }
  );
}

export async function SiteHeader() {
  const settings = await getSettings();
  return (
    <SiteHeaderClient
      settings={{
        siteName: settings.siteName,
        logo: settings.logo,
      }}
    />
  );
}
