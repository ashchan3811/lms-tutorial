import { CourseWithDetails } from "@/lib/models";

interface CourseSidebarProps {
  course: CourseWithDetails;
  currentProgress: number;
}

const CourseSidebar = ({}: CourseSidebarProps) => {
  return <p>course sidebar</p>;
};

export default CourseSidebar;
