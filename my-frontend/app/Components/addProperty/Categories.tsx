import React from "react";
import Image from "next/image";
interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}
function Categories({ dataCategory, setCategory }: CategoriesProps) {
  return (
    <>
      <div className=" pt-3 cursor-pointer pb-6 flex items-center space-x-12">
        <div
          onClick={() => setCategory("Beach")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Beach' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
          >
          <Image
            src="/assets/category1.jpg"
            alt="category1"
            width={30}
            height={30}
          />
          <span className="text-sm">Beach</span>
        </div>
        <div
          onClick={() => setCategory("villa")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'villa' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image
            src="/assets/category1.jpg"
            alt="category1"
            width={30}
            height={30}
          />
          <span className="text-sm">Villa</span>
        </div>

        <div
          onClick={() => setCategory("Tiny Homes")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Tiny Homes' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image
            src="/assets/category1.jpg"
            alt="category1"
            width={30}
            height={30}
          />
          <span className="text-sm">Tiny Homes</span>
        </div>

        <div
          onClick={() => setCategory("cabins")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'cabins' ? 'border-gray-800' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image
            src="/assets/category1.jpg"
            alt="category1"
            width={30}
            height={30}
          />
          <span className="text-sm">Cabins</span>
        </div>
      </div>
    </>
  );
}

export default Categories;
