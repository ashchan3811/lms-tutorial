import { CourseWithProgressWithCategory, GetCoursesParams } from "@/lib/models";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCoursesParams): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (cource) => {
          if (!cource.purchases.length) {
            return { ...cource, progress: null };
          }

          const progress = await getProgress(userId, cource.id);
          return {
            ...cource,
            progress,
          };
        }),
      );

    return coursesWithProgress;
  } catch (err) {
    console.log("GET COURSES", err);
    return [];
  }
};
