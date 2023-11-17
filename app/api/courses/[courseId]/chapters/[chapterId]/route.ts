import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { RESPONSE } from "@/lib/api";

interface IPatchParams {
  params: { courseId: string; chapterId: string };
}

export async function PATCH(req: Request, { params }: IPatchParams) {
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

    const { isPublished, ...values } = await req.json();

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    // TODO: handle video upload

    return NextResponse.json(chapter);
  } catch (err) {
    console.log("PATCH COURSE_ID CHAPTER_ID", { err });
    return RESPONSE.INTERNAL_SERVER_ERROR;
  }
}
