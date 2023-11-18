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
        <Badge variant={"secondary"}>Free</Badge>
      )}
    </>
  );
};

export default PriceDisplay;
