import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CourseList from "@/components/course-list";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, inProgressCourses } =
    await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={inProgressCourses.length}
          />
        </div>
        <div>
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedCourses.length}
            variant={"success"}
          />
        </div>
      </div>
      <CourseList items={[...inProgressCourses, ...completedCourses]} />
    </div>
  );
};

export default Dashboard;
