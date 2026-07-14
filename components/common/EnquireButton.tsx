"use client";

import { ArrowUpRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useEnquiry } from "@/components/common/EnquiryProvider";
import { cn } from "@/lib/utils";

interface EnquireButtonProps extends ButtonProps {
  product?: string;
  withArrow?: boolean;
  label?: string;
}

export function EnquireButton({
  product,
  withArrow = false,
  label = "Enquire Now",
  className,
  ...props
}: EnquireButtonProps) {
  const { open } = useEnquiry();
  return (
    <Button
      onClick={() => open(product)}
      className={cn("group", className)}
      {...props}
    >
      {label}
      {withArrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Button>
  );
}
