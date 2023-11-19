import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { MuxVideo } from "@/lib/mux";
import { isTeacher } from "@/lib/teacher";
import { ICourseParams } from "@/lib/models";

export async function PATCH(req: Request, { params }: ICourseParams) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (err) {
    console.log("PATCH COURSE_ID", { err });
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: ICourseParams) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Fonund", { status: 401 });
    }

    for (let chapter of course.chapters) {
      if (chapter.muxData) {
        await MuxVideo.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
        userId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (err) {
    console.log("DELETE COURSE_ID", { err });
    return new NextResponse("Internal error", { status: 500 });
  }
}
