import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseWithDetails } from "@/lib/models";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: CourseWithDetails;
  currentProgress: number;
}

const CourseMobileSidebar = ({
  course,
  currentProgress,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white w-72">
        <CourseSidebar course={course} currentProgress={currentProgress} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
