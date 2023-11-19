"use client";

import { formatPrice } from "@/lib/format-price";
import { Badge } from "@/components/ui/badge";

interface PriceDisplayProps {
  price: number | null;
}

const PriceDisplay = ({ price }: PriceDisplayProps) => {
  return (
    <>
      {price && price > 0 ? (
        formatPrice(price)
      ) : (
        <Badge className="ml-1" variant={"secondary"}>
          Free
        </Badge>
      )}
    </>
  );
};

export default PriceDisplay;
