"use client";

import { SelectOptionList } from "@/types/select";
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import Dropdown from "../dropdown";

export default function SearchInput({
  options,
  selectedValue,
  onSelect,
  placeholder = "Search...",
  onSearch,
  isLoading,
}: Readonly<{
  options: SelectOptionList;
  onSelect: (value: string) => void;
  selectedValue: string;
  placeholder?: string;
  onSearch: (search: string) => void;
  isLoading: boolean;
}>) {
  const [value, setValue] = useState("");

  const [highlightedOption, setHighlightedOption] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (selectedValue) {
      setValue(options.find((e) => e.value === selectedValue)?.label ?? "");
    }
  }, [options, selectedValue]);

  useEffect(() => {
    if (value === "") {
      onSelect("");
      setShowDropdown(false);
    }
  }, [onSelect, value]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (value) {
      if (e.key === "ArrowDown") {
        setHighlightedOption((prevIndex) =>
          Math.min(prevIndex + 1, options.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setHighlightedOption((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" && highlightedOption >= 0) {
        onSelect(options[highlightedOption].value);
        setShowDropdown(false);
      } else if (e.key === "Escape") {
        onSelect("");
        setShowDropdown(false);
      }
    }
  };

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = () => {
    if (value && !selectedValue) {
      setShowDropdown(true);
    }
  };
  const handleOnBlur: FocusEventHandler<HTMLInputElement> = () => {
    setShowDropdown(false);
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    onSelect("");

    if (event.target.value.length >= 3) {
      onSearch(event.target.value);
      setShowDropdown(true);
    }
  };

  const handleOnSetHighlighted = (index: number) => {
    setHighlightedOption(index);
  };

  return (
    <div className="flex flex-col w-auto">
      <div className="flex w-auto flex-wrap">
        <input
          className="rounded-md p-4 text-lg w-full"
          value={value}
          onChange={handleOnChange}
          type="search"
          placeholder={placeholder}
          onBlur={handleOnBlur}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          onKeyDown={handleKeyDown}
          onFocus={handleOnFocus}
        ></input>
        <div className="w-full relative">
          <Dropdown
            options={options}
            onSelect={onSelect}
            show={!isLoading && showDropdown}
            highlightedOption={highlightedOption}
            setHighlightedOption={handleOnSetHighlighted}
          />
        </div>
      </div>
    </div>
  );
}
