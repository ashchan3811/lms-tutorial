import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { ICategoryParams } from "@/lib/models";

export async function PATCH(req: Request, { params }: ICategoryParams) {
  try {
    const { userId } = auth();
    const { categoryId } = params;

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const values = await req.json();

    const category = await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log("PATCH CATEGORY_ID", { err });
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: ICategoryParams) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return new NextResponse("Not Fonund", { status: 401 });
    }

    const courses = await db.course.findMany({
      where: {
        categoryId: params.categoryId,
      },
      select: {
        id: true,
      },
    });

    if (courses.length > 0) {
      return new NextResponse(
        "Cannot delete category, It has been assigned to course(s)",
        { status: 400 },
      );
    }

    const deletedCategory = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (err) {
    console.log("DELETE COURSE_ID", { err });
    return new NextResponse("Internal error", { status: 500 });
  }
}
