// components/GalleryPreviewServer.jsx
import fs from "fs";
import path from "path";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function GalleryPreviewServer() {
  const dir = path.join(process.cwd(), "public/img/hwheel");

  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => `/img/hwheel/${file}`);

  return <GalleryPreview images={files} />;
}
