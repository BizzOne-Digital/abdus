"use client";

import { LocalImageField } from "./LocalImageField";
import type { UploadFolder } from "@/lib/uploads";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: UploadFolder;
};

/** Admin image picker backed by MongoDB uploads (serverless-safe). */
export function ImageUploader({
  value,
  onChange,
  label = "Image",
  folder = "pages",
}: Props) {
  return (
    <LocalImageField
      value={value}
      onChange={onChange}
      label={label}
      folder={folder}
    />
  );
}
