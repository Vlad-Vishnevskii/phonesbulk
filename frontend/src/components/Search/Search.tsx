"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Select } from "@/ui/Select/Select";

import { Checkbox } from "./CheckBox/CheckBox";
import { getFilterOptions } from "@/app/actions";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [filterOptions, setOptions] = useState();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const getoptin = async () => {
      const options = await getFilterOptions();
      setOptions(options);
    };
    getoptin();
  }, []);

  const handleSearch = (
    term: string,
    par?: string,
    e?: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term && par === "") {
      params.set("query", term);
    }

    if (par === "all" || e?.key === "Delete") {
      params.delete("query");
      params.delete("sort");
      params.delete("filter");
      params.delete("bestprice");
      params.delete("bestseller");
    }

    if (term === "" && (par === "price:asc" || par === "price:desc")) {
      params.set("sort", par);
    }

    if (term === "" && par && par?.includes("manufac")) {
      params.set("filter", par.slice(8));
      params.set("query", term);
    }
    if (par && par?.includes("best")) {
      if (par === "bestpricetrue") {
        params.set("bestprice", "bestprice");
      }
      if (par === "bestpricefalse") {
        params.delete("bestprice");
      }
      if (par === "bestsellertrue") {
        params.set("bestseller", "bestseller");
      }
      if (par === "bestsellerfalse") {
        params.delete("bestseller");
      }
    }

    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="my-2 mt-14 w-full rounded-2xl bg-dark_grey p-2 sm:my-1 sm:mt-9 sm:rounded-xl">
      <div>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:size-4"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#2F2F2F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.0002 21L16.7002 16.7"
                stroke="#2F2F2F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            className="block w-full rounded-lg py-1 pl-9 pr-3 focus:border-transparent focus:ring-0 sm:py-[2px] sm:text-sm"
            type="text"
            name="search"
            onChange={e => handleSearch(e.target.value, "")}
            onKeyDown={e => handleSearch("", "", e)}
          />
        </label>
      </div>
      <div className="">
        <div
          className={`flex gap-3 pt-2 sm:justify-start sm:gap-1 sm:pt-0 ${open ? "visible" : "hidden"}`}
        >
          <div>
            {filterOptions && (
              <Select
                options={filterOptions}
                handle={handleSearch}
              />
            )}
          </div>
          <div>
            <Select
              options={[
                { value: "order", label: "Sort by" },
                { value: "price:asc", label: "Price ↑" },
                { value: "price:desc", label: "Price ↓" },
              ]}
              handle={handleSearch}
            />
          </div>
          <div className="flex gap-1 sm:gap-0">
            <div className="flex items-center gap-1 sm:ml-2 sm:mt-1">
              <Checkbox
                best="price"
                handle={handleSearch}
              />
            </div>
            <div className="flex items-center gap-1 sm:ml-2 sm:mt-1">
              <Checkbox
                best="seller"
                handle={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:size-4"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="#F2F2F2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:size-4"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="#F2F2F2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
