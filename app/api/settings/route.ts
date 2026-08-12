import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { applyNestedUpdate, buildSanitizedUpdate } from "@/lib/persistCms";
import { revalidateSiteSettings } from "@/lib/revalidateSite";
import { Settings } from "@/models/Settings";

export async function GET() {
  try {
    await connectDB();
    const settings =
      (await Settings.findOne({ key: "site" }).lean()) ||
      (await Settings.create({ key: "site" })).toObject();
    return ok(settings);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Failed to load settings", 500);
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }

  try {
    await connectDB();
    const body = await parseJson<Record<string, unknown>>(req);
    const update = buildSanitizedUpdate(body);
    delete update.key;

    let settings = await Settings.findOne({ key: "site" });
    if (!settings) {
      settings = await Settings.create({ key: "site" });
    }

    const allowed = [
      "email",
      "phone",
      "address",
      "facebook",
      "instagram",
      "twitter",
      "youtube",
      "logo",
      "siteName",
      "tagline",
    ] as const;

    for (const field of allowed) {
      if (typeof update[field] === "string") {
        settings.set(field, update[field]);
      }
    }

    await settings.save();
    revalidateSiteSettings();
    return ok(settings.toObject());
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Save failed", 500);
  }
}
