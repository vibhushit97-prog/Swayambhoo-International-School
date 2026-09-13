export interface Facility {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "academic" | "sports" | "campus" | "wellness" | "arts";
  description: string;
  image: string;
  features: string[];
  isConceptual?: boolean;
}
