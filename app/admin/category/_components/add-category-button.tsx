"use client";

import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const AddCategoryButton = () => {
  return (
    <Link href={"/admin/category/create"} className="ml-2">
      <Button>
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        New Category
      </Button>
    </Link>
  );
};

export default AddCategoryButton;
