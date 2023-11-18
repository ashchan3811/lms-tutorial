import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { CourseWithDetails } from "@/lib/models";
import NavbarRoutes from "@/components/navbar-routes";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: CourseWithDetails;
  currentProgress: number;
}

const CourseNavbar = async ({ course, currentProgress }: CourseNavbarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} currentProgress={currentProgress} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
