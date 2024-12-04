"use client";

import { SelectOptionList } from "@/types/select";
import { KeyboardEventHandler, useEffect, useState } from "react";

export default function SearchInput({
  options,
  selectedValue,
  onSelect,
  placeholder='Search...',
}: Readonly<{
  options: SelectOptionList;
  onSelect: (value: string) => void;
  selectedValue: string;
  placeholder?: string;
}>) {
  const [value, setValue] = useState("");
  const [optionsToDisplay, setOptionsToDisplay] = useState<SelectOptionList>(
    []
  );

  const [highlightedOption, setHighlightedOption] = useState(-1);
  useEffect(() => {
    setValue(options.find((e) => e.value === selectedValue)?.label ?? "");
  }, [options, selectedValue]);

  useEffect(() => {
    if (value) {
      setOptionsToDisplay(
        options.filter((item) => {
          return (
            item.value.toLowerCase().includes(value.toLowerCase()) ||
            item.label.toLowerCase().includes(value.toLowerCase())
          );
        })
      );
    }
  }, [onSelect, options, value]);

  useEffect(() => {
    if (value === "") {
      setOptionsToDisplay([]);
      onSelect("");
    }
  }, [onSelect, value]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (value) {
      if (e.key === "ArrowDown") {
        setHighlightedOption((prevIndex) =>
          Math.min(prevIndex + 1, optionsToDisplay.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setHighlightedOption((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" && highlightedOption >= 0) {
        onSelect(optionsToDisplay[highlightedOption].value);
        setOptionsToDisplay([]);
      } else if (e.key === "Escape") {
        setOptionsToDisplay([]);
        onSelect("");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <input
          className="rounded-md p-4 text-lg flex-1"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onSelect("");
          }}
          type="search"
          placeholder={placeholder}
          onBlur={() => {
            setOptionsToDisplay([]);
          }}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          onKeyDown={handleKeyDown}
        ></input>
      </div>
      {optionsToDisplay.length && !selectedValue ? (
        <ul className="bg-foreground rounded-b-sm">
          {optionsToDisplay.map((item, index) => (
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
      ) : null}
    </div>
  );
}
