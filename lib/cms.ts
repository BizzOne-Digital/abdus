import { connectDB } from "@/lib/db";
import { Page } from "@/models/Page";
import { Priority } from "@/models/Priority";
import { Settings } from "@/models/Settings";

export type CmsSection = {
  key: string;
  title?: string;
  subtitle?: string;
  body?: string;
  image?: string;
  buttonLabel?: string;
  buttonLink?: string;
  items?: Array<Record<string, string>>;
  order?: number;
};

export type CmsPage = {
  slug: string;
  title: string;
  seoDescription?: string;
  sections: CmsSection[];
};

export function sectionByKey(
  sections: CmsSection[] | undefined,
  key: string,
): CmsSection | undefined {
  return (sections || []).find((s) => s.key === key);
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  await connectDB();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page: any = await Page.findOne({ slug }).lean();
  if (!page) return null;
  return JSON.parse(JSON.stringify(page)) as CmsPage;
}

export async function getCmsPriorities() {
  await connectDB();
  const items = await Priority.find({ published: true }).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getCmsSettings() {
  await connectDB();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings: any = await Settings.findOne({ key: "site" }).lean();
  return (
    (settings && JSON.parse(JSON.stringify(settings))) || {
      email: "Vote4shinwary@gmail.com",
      phone: "416 419 2457",
      logo: "/images/logo.png",
      siteName: "Vote Shinwary",
      tagline: "Strong leadership. Better Oshawa.",
    }
  );
}
