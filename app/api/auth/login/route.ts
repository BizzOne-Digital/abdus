import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { fail, ok, parseJson } from "@/lib/api";
import { AdminUser } from "@/models/AdminUser";

export async function POST(req: Request) {
  const body = await parseJson<{ email?: string; password?: string }>(req);
  if (!body.email || !body.password) return fail("Email and password required");

  await connectDB();
  const user = await AdminUser.findOne({ email: body.email.toLowerCase() });
  if (!user) return fail("Invalid credentials", 401);

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) return fail("Invalid credentials", 401);

  await createSession(user.email);
  return ok({ ok: true, email: user.email });
}
