import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { ICourseParams } from "@/lib/models";

export async function PATCH(req: Request, { params }: ICourseParams) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: true,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 406 });
    }

    const hasPublishedChapter = course.chapters.some((a) => a.isPublished);

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedChapter
    ) {
      return new NextResponse("Missing required data", { status: 406 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (err) {
    console.log("PUBLISH COURSE_ID", { err });
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
