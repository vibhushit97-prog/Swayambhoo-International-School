export interface SchoolStageInfo {
  id: string;
  title: string;
  classes: string;
  ageGroup: string;
  description: string;
  highlights?: string[];
  image?: string;
}

export interface PillarItem {
  title: string;
  description: string;
  icon: string;
}
