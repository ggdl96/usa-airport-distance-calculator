"use client";

import { SelectOptionList } from "@/types/select";

export default function Dropdown({
  options,
  show,
  highlightedOption,
  setHighlightedOption,
  onSelect,
}: Readonly<{
  options: SelectOptionList;
  onSelect: (value: string) => void;
  show: boolean;
  highlightedOption: number;
  setHighlightedOption: (index: number) => void;
}>) {
  if (show) {
    return options.length ? (
      <ul className="bg-foreground rounded-b-sm absolute max-h-[30vh] overflow-y-scroll w-full">
        {options.map((item, index) => (
          <option
            className={`text-input p-4 ${
              highlightedOption === index ? "bg-option-highlight" : ""
            }`}
            key={item.value}
            onMouseDown={() => {
              onSelect(item.value);
            }}
            aria-selected={highlightedOption === index}
            onMouseEnter={() => {
              setHighlightedOption(index);
            }}
          >
            {item.label}
          </option>
        ))}
      </ul>
    ) : (
      <div className="bg-foreground rounded-b-sm absolute w-full">
        <p className="text-input p-4">No results</p>
      </div>
    );
  }
  return null;
}
