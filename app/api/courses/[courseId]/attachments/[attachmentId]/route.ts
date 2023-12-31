import { db } from "@/lib/db";
import { ICourseAttachmentParams } from "@/lib/models";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: ICourseAttachmentParams,
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!course) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (err) {
    console.log("COURSE_ID_ATTCHMENT_ID", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
