"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import ConfirmModal from "@/components/modals/confirm-model";
import { Button } from "@/components/ui/button";

interface CategoryActionsProps {
  disabled: boolean;
  categoryId: string;
}

const CategoryActions = ({ disabled, categoryId }: CategoryActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/categories/${categoryId}`);
      toast.success("Category Deleted");

      router.refresh();
      router.push(`/admin/category`);
    } catch (err: any) {
      console.log("category delete error", err);
      toast.error(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmModal onConfirm={onDelete} continueText="Yes" cancelText="No">
        <Button size={"sm"} variant={"destructive"} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CategoryActions;
