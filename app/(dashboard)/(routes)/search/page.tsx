import { db } from "@/lib/db";
import CategoryList from "./_components/category-list";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="p-6">
      <CategoryList items={categories} />
    </div>
  );
};

export default SearchPage;
