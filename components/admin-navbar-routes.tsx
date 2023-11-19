"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";

import SearchInput from "./search-input";
import { Button } from "./ui/button";

const AdminNavbarRoutes = () => {
  const { userId } = useAuth();

  const pathName = usePathname();

  const isSearchPage = pathName?.startsWith("/search");

  if (!userId) {
    console.log("redirect user");
    return redirect("/");
  }

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        <Button className="flex items-center mr-2" type="button">
          Admin
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default AdminNavbarRoutes;
