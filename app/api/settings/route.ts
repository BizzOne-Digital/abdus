import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { sanitizeMongoUpdate } from "@/lib/sanitizeUpdate";
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
    const update = sanitizeMongoUpdate(body);
    const settings = await Settings.findOneAndUpdate({ key: "site" }, update, {
      new: true,
      upsert: true,
      runValidators: true,
    }).lean();
    return ok(settings);
  } catch (err) {
    return fail(err instanceof Error ? err.message : "Save failed", 500);
  }
}
