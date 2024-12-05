"use client";

import { SelectOptionList } from "@/types/select";
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import Dropdown from "../dropdown";

export default function SearchInput({
  options,
  selectedValue,
  onSelect,
  placeholder = "Search...",
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
  const [showDropdown, setShowDropdown] = useState(false);

  const displayOptions = useCallback(() => {
    setOptionsToDisplay(
      options.filter((item) => {
        return (
          item.value.toLowerCase().includes(value.toLowerCase()) ||
          item.label.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }, [options, value]);
  useEffect(() => {
    setValue(options.find((e) => e.value === selectedValue)?.label ?? "");
  }, [options, selectedValue]);

  useEffect(() => {
    if (value) {
      displayOptions();
    }
  }, [displayOptions, value]);

  useEffect(() => {
    if (value === "") {
      setOptionsToDisplay([]);
      onSelect("");
      setShowDropdown(false);
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
        setShowDropdown(false);
      } else if (e.key === "Escape") {
        setOptionsToDisplay([]);
        onSelect("");
        setShowDropdown(false);
      }
    }
  };

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = () => {
    if (value && !selectedValue) {
      displayOptions();
      setShowDropdown(true);
    }
  };
  const handleOnBlur: FocusEventHandler<HTMLInputElement> = () => {
    setOptionsToDisplay([]);
    setShowDropdown(false);
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    onSelect("");
    setShowDropdown(true);
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
            options={optionsToDisplay}
            onSelect={onSelect}
            show={showDropdown}
            highlightedOption={highlightedOption}
            setHighlightedOption={handleOnSetHighlighted}
          />
        </div>
      </div>
    </div>
  );
}
