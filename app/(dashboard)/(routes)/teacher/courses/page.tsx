import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className='p-6'>
      <Link href={"/teacher/create"}>
        <Button>
          <PlusCircleIcon className='mr-2'/> New Course
        </Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
