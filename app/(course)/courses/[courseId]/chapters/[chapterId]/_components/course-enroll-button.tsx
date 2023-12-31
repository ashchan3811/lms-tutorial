"use client";

import PriceDisplay from "@/components/price-display";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      if (response.data.success) {
        toast.success("Course Enrolled");
        router.refresh();

        router.push(`/courses/${courseId}`);
      } else {
        window.location.assign(response.data.url);
      }
    } catch (err) {
      console.log("ENROLL ERROR", err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full md:w-auto"
      size={"sm"}
      onClick={onClick}
      disabled={isLoading}
    >
      Enroll for <PriceDisplay price={price} />
    </Button>
  );
};

export default CourseEnrollButton;
