"use client";

import { SelectOptionList } from "@/types/select";
import { useEffect, useState } from "react";

export default function SearchInput({
  options,
  selectedValue,
  onSelect,
}: {
  options: SelectOptionList;
  onSelect: (value: string) => void;
  selectedValue: string;
}) {
  const [value, setValue] = useState("");
  const [optionsToDisplay, setOptionsToDisplay] = useState<SelectOptionList>(
    []
  );

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (value) {
      setOptionsToDisplay(
        options.filter((item) => {
          return (
            item.value.toLowerCase().includes(value.toLowerCase()) ||
            item.label.toLowerCase().includes(value.toLowerCase()) /*&&
              toSelected !== item.code*/
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

  return (
    <div className="flex flex-col">
      <input
        className="pb-2"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onSelect("");
        }}
        type="search"
        placeholder="Search origin Airport..."
      ></input>
      {optionsToDisplay.length && !selectedValue ? (
        <ul>
          {optionsToDisplay.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                onSelect(item.value);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
