import { getAnalytics } from "@/actions/get-analytics";
import DataCard from "@/components/data-card";
import DataChart from "@/components/data-chart";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={totalSales} label="Total Sales" />
        <DataCard value={totalRevenue} label="Total Revenue" shouldFormat />
      </div>
      <DataChart data={data} />
    </div>
  );
};

export default AnalyticsPage;
