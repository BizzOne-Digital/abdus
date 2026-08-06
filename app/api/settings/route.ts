import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { Settings } from "@/models/Settings";

export async function GET() {
  await connectDB();
  const settings =
    (await Settings.findOne({ key: "site" }).lean()) ||
    (await Settings.create({ key: "site" })).toObject();
  return ok(settings);
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  await connectDB();
  const body = await parseJson<Record<string, unknown>>(req);
  const settings = await Settings.findOneAndUpdate({ key: "site" }, body, {
    new: true,
    upsert: true,
  }).lean();
  return ok(settings);
}
