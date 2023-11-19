import DataCard from "@/components/data-card";
import { db } from "@/lib/db";

const AdminPage = async () => {
  const courses = await db.course.count();
  const category = await db.category.count();
  const purchase = await db.purchase.count();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <DataCard value={courses} label="Total Courses" />
      <DataCard value={category} label="Total Categories" />
      <DataCard value={purchase} label="Total Purchases" />
    </div>
  );
};

export default AdminPage;
