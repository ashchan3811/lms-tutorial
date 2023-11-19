import { db } from "@/lib/db";
import { ICategoryParams } from "@/lib/models";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CategoryActions from "./_components/category-actions";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import NameForm from "./_components/name-form";
import Link from "next/link";

const CategoryDetailsPage = async ({ params }: ICategoryParams) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  if (!category) {
    return redirect("/");
  }

  const requiredFields = [category.name];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `(${completedFields}/${totalFields})`;
  const isCompleted = totalFields === completedFields;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/admin/category`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to categories
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Category Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completedText}
          </span>
        </div>
        <CategoryActions disabled={!isCompleted} categoryId={category.id} />
      </div>
      <div className="grid grid-cols-1 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your category</h2>
          </div>
          <NameForm initialData={category} categoryId={category.id} />
        </div>
      </div>
    </>
  );
};

export default CategoryDetailsPage;
