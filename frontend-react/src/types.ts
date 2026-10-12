export type EnrollmentStatus = 'in_progress' | 'completed' | 'not_started';
export type StatusFilter = EnrollmentStatus | 'all';

export type CourseProgress = {
  courseId: string;
  title: string;
  completionPercentage: number;
  lastActivityAt: string;
  status: string;
  isStale?: boolean;
};

export type LearnerProgressResponse = {
  learnerId: number;
  courses: CourseProgress[];
};

export type ApiErrorResponse = {
  error: string;
};
