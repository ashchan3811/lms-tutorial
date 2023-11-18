import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { RESPONSE } from "@/lib/api";
import { IChapterParams } from "@/lib/models";

export async function PATCH(req: Request, { params }: IChapterParams) {
  try {
    const { userId } = auth();

    if (!userId) {
      return RESPONSE.UNAUTHOZED;
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!course) {
      return RESPONSE.UNAUTHOZED;
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unPublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse?.length) {
      await db.course.update({
        where: {
          id: params.courseId,
          userId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(unPublishedChapter);
  } catch (err) {
    console.log("UN PUBLISH COURSE_ID CHAPTER_ID", { err });
    return RESPONSE.INTERNAL_SERVER_ERROR;
  }
}
