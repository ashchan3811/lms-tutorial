import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string };
  }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
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

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (err) {
    console.log("COURSE_ID_ATTCHMENT", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
