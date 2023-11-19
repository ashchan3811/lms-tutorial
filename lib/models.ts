import { Category, Chapter, Course, UserProgress } from "@prisma/client";

export interface IComboBoxOptionItem {
  value: string;
  label: string;
}

export interface IChapterReOrderItem {
  id: string;
  position: number;
}

export interface IChapterParams {
  params: { courseId: string; chapterId: string };
}

export interface ICourseParams {
  params: { courseId: string };
}

export interface ICategoryParams {
  params: { categoryId: string };
}

export interface ICourseAttachmentParams {
  params: { courseId: string; attachmentId: string };
}

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export type GetCoursesParams = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export type CourseWithDetails = Course & {
  chapters: Array<Chapter & { userProgress: UserProgress[] | null }>;
};

export interface ITeacher {
  id: string;
  name: string;
  email: string;
}
