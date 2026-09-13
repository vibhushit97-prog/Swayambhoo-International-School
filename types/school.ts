export interface SchoolStageInfo {
  id: string;
  title: string;
  classes: string;
  ageGroup: string;
  description: string;
  highlights?: string[];
  image?: string;
  nepFocus?: string;
  curriculumOverview?: string;
  coreSubjects?: string[];
  keyCompetencies?: string[];
  teachingMethodology?: string[];
  facultyRatio?: string;
  defaultApplyingFor?: string;
}

export interface PillarItem {
  title: string;
  description: string;
  icon: string;
}
