import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <Link href={"/teacher/create"}>
        <Button>
          <PlusCircleIcon className="mr-2" /> New Course
        </Button>
      </Link>

      <div className="flex items-center gap-x-2">
        {courses.map((course) => (
          <div key={course.id} className="border bg-sky-200 p-4">
            <p>{course.title}</p>
            <Link href={`/teacher/courses/${course.id}`}>
              <Button variant={"outline"} size={"sm"}>
                View Course
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
