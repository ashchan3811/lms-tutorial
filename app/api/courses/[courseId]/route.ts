import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

interface IPatchParams {
  params: { courseId: string };
}

export async function PATCH(req: Request, { params }: IPatchParams) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
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
