import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { columns } from "./_components/columns";
import { DataTable } from "@/components/data-table";
import AddCourseButton from "./_components/add-course-button";

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
      <DataTable
        columns={columns}
        data={courses}
        searchPlaceholder={"Filter courses...."}
        filterColumn={"title"}
        headerAction={<AddCourseButton />}
      />
    </div>
  );
};

export default CoursesPage;
