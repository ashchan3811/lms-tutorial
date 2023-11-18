import { db } from "@/lib/db";

export const getProgress = async (userId: string, courseId: string) => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((a) => a.id);

    const validCompletedChapterProgress = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progress =
      (validCompletedChapterProgress / publishedChapters.length) * 100;

    return progress;
  } catch (err) {
    console.log("GET PROGRESS", err);
    return 0;
  }
};
