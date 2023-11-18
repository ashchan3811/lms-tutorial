"use client";

import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const AddCourseButton = () => {
  return (
    <Link href={"/teacher/create"} className="ml-2">
      <Button>
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        New Course
      </Button>
    </Link>
  );
};

export default AddCourseButton;
