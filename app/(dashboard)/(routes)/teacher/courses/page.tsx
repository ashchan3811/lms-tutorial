import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

import { columns } from "./_components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

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
        headerAction={
          <Link href={"/teacher/create"}>
            <Button>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Course
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default CoursesPage;
