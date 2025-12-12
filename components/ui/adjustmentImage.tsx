"use client";

import { useState } from "react";
import { CircleMinus, CirclePlus, RotateCcw } from "lucide-react";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function AdjustmentSlider({
  label,
  value,
  onChange,
}: SliderProps) {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(value - 1);
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500">{value}%</span>
      </div>

      <div className="flex items-center ">
        <button onClick={decrease}>
          {" "}
          <CircleMinus className="text-blue-600 hover:cursor-pointer" />
        </button>
        <input
          type="range"
          min={0}
          max={200}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
          w-full h-2 rounded-lg appearance-none cursor-pointer
          bg-gray-200
          accent-blue-600
          mx-2
        "
        />
        <button onClick={increase}>
          {" "}
          <CirclePlus className="text-blue-600 hover:cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
