"use client";

import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "query-string";
import Button from "@/components/ui/button";
import { cn } from "@/libs/utils";

interface FilterProps {
  valueKey: string;
  name: string;
  data: (Color | Size)[];
}

const Filter = ({ valueKey, name, data }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey); //"sizeId" | "colorId"

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    //console.log("current : ", current); {} -> {sizeId : "sizeId"}

    const query = {
      ...current,
      [valueKey]: id,
    };
    //console.log(query); { sizeId:"sizeId"} -> {sizeId : null}

    //If this condition is true, then the actions following the arrow will occur.
    if (current[valueKey] === id) {
      //valueKey = "sizeId" | "colorId"
      query[valueKey] = null; // {sizeId: null}
    }
    //console.log(valueKey, current[valueKey]); sizeId , undefined -> sizeId , "sizeId"
    //console.log(query[valueKey]); null

    const url = qs.stringifyUrl(
      {
        url: window.location.href, //previous URL -> http://localhost:3001/category/2ff5faa1-4f4c-4b77-ab6e-4167edbd9a4e
        query, //{ sizeId:"sizeId"}
      },
      { skipNull: true } // will skip this -> ?key=null
    );
    //console.log(url); http://localhost:3001/category/2ff5faa1-4f4c-4b77-ab6e-4167edbd9a4e?sizeId=c28c49e6-298b-41d9-948a-8d40f7b2332d

    router.push(url);
  };
  //console.log(valueKey, selectedValue); sizeId , "sizeId"

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
