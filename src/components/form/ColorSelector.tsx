import React, { useState } from "react";

interface ColorSelectorProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const COLOR_OPTIONS = ["red", "yellow", "green", "blue", "fuchsia"];

export default function ColorSelector({
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div>
      <div className="font-bold text-lg text-primary">Color *</div>
      <div className="flex items-center gap-x-4 mt-2">
        {COLOR_OPTIONS.map((color) => (
          <label key={color} className="relative">
            <input
              type="radio"
              name="color"
              value={color}
              className="sr-only peer"
              onChange={handleColorChange}
              checked={selectedColor === color}
            />
            <span
              className={`block w-10 h-10 rounded-full cursor-pointer bg-${color}-500 ${
                selectedColor === color ? "border-4 border-white" : ""
              } 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
              aria-label={`${color} color option`}
            ></span>
          </label>
        ))}
      </div>
    </div>
  );
}
