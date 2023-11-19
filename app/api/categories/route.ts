import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const category = await db.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log({ err });
    return new NextResponse("Internal error", { status: 500 });
  }
}
