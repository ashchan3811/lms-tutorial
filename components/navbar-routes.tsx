"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { isAdmin } from '@/lib/is-admin';

const NavbarRoutes = () => {
  const { userId } = useAuth();

  const pathName = usePathname();

  const isTeacherPage = pathName?.startsWith("/teacher");
  const isCoursePage = pathName?.includes("/courses");
  const isSearchPage = pathName?.startsWith("/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button size={"sm"} variant={"ghost"}>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <>
            {isTeacher(userId) && (
              <Link href={"/teacher/courses"}>
                <Button size={"sm"} variant={"ghost"}>
                  Teacher Mode
                </Button>
              </Link>
            )}
            {isAdmin(userId) && (
              <Link href={"/admin"}>
                <Button size={"sm"} variant={"ghost"}>
                  Admin Mode
                </Button>
              </Link>
            )}
          </>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
