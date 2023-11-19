import { DataTable } from "@/components/data-table";
import { columns } from "./_components/column";
import { db } from "@/lib/db";
import AddCategoryButton from "./_components/add-category-button";

const CategoryPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <DataTable
      columns={columns}
      data={categories}
      searchPlaceholder={"Filter categories...."}
      filterColumn={"name"}
      headerAction={<AddCategoryButton />}
    />
  );
};

export default CategoryPage;
