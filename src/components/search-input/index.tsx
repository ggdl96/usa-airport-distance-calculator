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
import { RequestStatus } from "@/types/request-status";

export default function SearchInput({
  options,
  selectedValue,
  onSelect,
  placeholder = "Search...",
  onSearch,
  searchStatus,
}: Readonly<{
  options: SelectOptionList;
  onSelect: (value: string) => void;
  selectedValue: string;
  placeholder?: string;
  onSearch: (search: string) => void;
  searchStatus: RequestStatus;
}>) {
  const [value, setValue] = useState("");

  const [highlightedOption, setHighlightedOption] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (selectedValue) {
      setValue(options.find((e) => e.value === selectedValue)?.label ?? "");
    }
  }, [options, selectedValue]);

  useEffect(() => {
    if (searchStatus === "DONE") {
      setShowDropdown(true);

      return () => {
        setShowDropdown(false);
      };
    }
  }, [searchStatus]);

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
  };

  const handleOnSetHighlighted = (index: number) => {
    setHighlightedOption(index);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value.length >= 3 ? value : "");
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  useEffect(() => {
    if (debouncedValue.length >= 3 && !selectedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, selectedValue]);

  return (
    <div className="flex flex-col w-auto">
      <div className="flex w-auto flex-wrap">
        <input
          className="rounded-md p-2 lg:p-4 text-lg w-full"
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
          {searchStatus === "LOADING" ? (
            <div className="bg-foreground rounded-b-sm absolute w-full">
              <p className="text-input p-4">Searching...</p>
            </div>
          ) : null}
          <Dropdown
            options={options}
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
