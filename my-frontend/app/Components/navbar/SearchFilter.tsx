'use client'
import useSearchModal from "@/app/hooks/useSearchModal";
import React from "react";

function SearchFilter() {

   const searchModal= useSearchModal();

  return (
    <div
    onClick={()=>searchModal.open('location')}
     className="h-[48px] lg:h[64px] flex flex-row items-center justify-between border rounded-full">
      <div className=" hidden lg:block">
        <div className="flex flex-row items-center justify-between">
          <div className=" w-[250px] cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <p className="text-xs font-semibold">Where</p>
            <p className="text-sm">Wanted Location</p>
          </div>
          <div className="h-8 border-l border-gray-300"></div>

          <div className="  cursor-pointer px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <p className="text-xs font-semibold">Check In</p>
            <p className="text-sm">Add dates</p>
          </div>
          <div className="h-8 border-l border-gray-300"></div>

          <div className=" cursor-pointer px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <p className="text-xs font-semibold">Check Out</p>
            <p className="text-sm">Add dates</p>
          </div>
          <div className="h-8 border-l border-gray-300"></div>

          <div className=" cursor-pointer   px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
            <p className="text-xs font-semibold">Who</p>
            <p className="text-sm">Add Guests</p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="p-2 lg:p-4 bg-[#ff385c] hover:bg-[#d50027] cursor-pointer  transition rounded-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: 4,
              overflow: "visible",
            }}
          >
            <path
              fill="none"
              d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
