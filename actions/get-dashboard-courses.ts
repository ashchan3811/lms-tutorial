import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";

type CoursesWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number;
};

interface DashboardCourses {
  completedCourses: CoursesWithProgressWithCategory[];
  inProgressCourses: CoursesWithProgressWithCategory[];
}

export const getDashboardCourses = async (
  userId: string,
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasedCourses.map(
      (purchase) => purchase.course as CoursesWithProgressWithCategory,
    );

    for (let course of courses) {
      course.progress = await getProgress(userId, course.id);
    }

    return {
      completedCourses: courses.filter((course) => course.progress === 100),
      inProgressCourses: courses.filter((course) => course.progress < 100),
    };
  } catch (err) {
    console.log("GET_DASHBOARD_COURSES", err);
  }

  return {
    completedCourses: [],
    inProgressCourses: [],
  };
};
