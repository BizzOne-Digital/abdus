import { revalidatePath } from "next/cache";

/** Bust static cache after CMS writes so the public site shows fresh content. */
export function revalidatePublicPage(slug: string) {
  if (slug === "home") {
    revalidatePath("/");
  } else {
    revalidatePath(`/${slug}`);
  }
}

export function revalidateHomeAndVision() {
  revalidatePath("/");
  revalidatePath("/vision");
}

export function revalidatePriorityDetail(slug: string) {
  revalidateHomeAndVision();
  revalidatePath(`/priorities/${slug}`);
}

export function revalidateSiteSettings() {
  revalidatePath("/", "layout");
}

export function revalidateGalleryPage() {
  revalidatePath("/gallery");
}
