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

export interface ICourseAttachmentParams {
  params: { courseId: string; attachmentId: string };
}
