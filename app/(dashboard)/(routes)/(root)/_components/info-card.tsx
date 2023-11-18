import { IconBadge } from "@/components/icon-badge";
import { type LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

const InfoCard = ({ numberOfItems, variant, label, icon }: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge icon={icon} variant={variant} />
      <div>
        <p className="font-medium">
            {label}
        </p>
        <p className='text-gray-500 text-sm'>
            {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
