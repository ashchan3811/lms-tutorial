import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { RESPONSE } from "@/lib/api";
import { ICourseParams } from "@/lib/models";

export async function PATCH(req: Request, { params }: ICourseParams) {
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

    const unPublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unPublishedCourse);
  } catch (err) {
    console.log("UN PUBLISH COURSE_ID", { err });
    return RESPONSE.INTERNAL_SERVER_ERROR;
  }
}
