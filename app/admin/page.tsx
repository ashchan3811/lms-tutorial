import { getOverAllAnalytics } from "@/actions/get-analytics";
import DataCard from "@/components/data-card";
import DataChart from "@/components/data-chart";
import { db } from "@/lib/db";

const AdminPage = async () => {
  const courses = await db.course.count();
  const category = await db.category.count();

  const { data, totalRevenue, totalSales } = await getOverAllAnalytics();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={courses} label="Total Courses" />
        <DataCard value={category} label="Total Categories" />
        <DataCard value={totalSales} label="Total Sales" />
        <DataCard value={totalRevenue} label="Total Revenue" shouldFormat />
      </div>
      <DataChart data={data} />
    </>
  );
};

export default AdminPage;
