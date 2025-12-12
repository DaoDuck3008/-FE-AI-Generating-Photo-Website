"use client";

import { cn } from "@/lib/utils";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface RadioCardProps {
  value: string;
  title: string;
  description: string;
  price: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export function RadioCard({
  value,
  title,
  description,
  price,
  selected,
  onSelect,
}: RadioCardProps) {
  return (
    <label
      onClick={() => onSelect(value)}
      className={cn(
        "flex items-start justify-between border rounded-2xl p-4 cursor-pointer transition-all",
        "hover:shadow-md",
        selected ? "border-blue-500 shadow-sm" : "border-gray-400"
      )}
    >
      <div className="flex gap-4">
        {/* Radio */}
        <RadioGroupItem
          value={value}
          className={cn("mt-1", selected ? "text-blue-600" : "")}
        />

        {/* Texts */}
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      {/* Price */}
      <span className="font-medium text-gray-700">{price}</span>
    </label>
  );
}
