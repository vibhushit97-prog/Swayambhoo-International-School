export interface GalleryItem {
  id: string;
  title: string;
  category: "architecture" | "classrooms" | "labs" | "library" | "sports" | "dining" | "uniforms";
  categoryLabel: string;
  description: string;
  src: string;
  alt: string;
  aspectRatio?: string;
  isConceptual: boolean;
  labelBadge?: string;
}
