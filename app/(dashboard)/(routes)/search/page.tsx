import { db } from "@/lib/db";
import CategoryList from "./_components/category-list";
import SearchInput from "@/components/search-input";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <CategoryList items={categories} />
      </div>
    </>
  );
};

export default SearchPage;
