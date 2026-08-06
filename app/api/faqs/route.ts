import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { Faq } from "@/models/Faq";

export async function GET() {
  await connectDB();
  const items = await Faq.find().sort({ order: 1 }).lean();
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
  const created = await Faq.create(body);
  return ok(created, 201);
}
