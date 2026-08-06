import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { Priority } from "@/models/Priority";

export async function GET() {
  await connectDB();
  const items = await Priority.find().sort({ order: 1 }).lean();
  return ok(items);
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return fail("Unauthorized", 401);
  }
  await connectDB();
  const body = await parseJson<Record<string, unknown>>(req);
  if (!body.slug || !body.title) return fail("slug and title required");
  const created = await Priority.create(body);
  return ok(created, 201);
}
