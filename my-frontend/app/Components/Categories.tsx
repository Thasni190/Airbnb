'use client'
import Image from "next/image";
import React, { useState } from "react";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";

function Categories() {

  const searchModal=useSearchModal();
  const [category,setCategory]=useState('');

  const _setCategory=(_category:string)=>{
    setCategory(_category);

    const query: SearchQuery={
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      guests:searchModal.query.guests,
      category: _category,
    }
    searchModal.setQuery(query)
  }

  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      <div 
        onClick={() => _setCategory('')}

      className="pb-4 flex flex-col items-center space-x-2 border-b-2  border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/assets/category1.jpg"
          alt="category1"
          width={30}
          height={30}
        />
        <span className="text-sm">All</span>
      </div>
      <div
        onClick={() => _setCategory('home')}

       className="pb-4 flex flex-col items-center space-x-2 border-b-2  border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/assets/category1.jpg"
          alt="category1"
          width={30}
          height={30}
        />
        <span className="text-sm">Home</span>
      </div>

      <div
        onClick={() => _setCategory('beach')}

      className="pb-4 flex flex-col items-center space-x-2 border-b-2  border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/assets/category1.jpg"
          alt="category1"
          width={30}
          height={30}
        />
        <span className="text-sm">Beach</span>
      </div>

      <div 
         onClick={() => _setCategory('villa')}

        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'villas' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
          src="/assets/category1.jpg"
          alt="category1"
          width={30}
          height={30}
        />
        <span className="text-sm">Villa</span>
      </div>

      <div 
        onClick={() => _setCategory('cabin')}

      className="pb-4 flex flex-col items-center space-x-2 border-b-2  border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/assets/category1.jpg"
          alt="category1"
          width={30}
          height={30}
        />
        <span className="text-sm">Cabins</span>
      </div>

      <div 
        onClick={() => _setCategory('resort')}

      className="pb-4 flex flex-col items-center space-x-2 border-b-2  border-white opacity-60 hover:border-gray-200 hover:opacity-100">
        <Image
          src="/assets/category1.jpg"
          alt="category1"
          width={30}
          height={30}
        />
        <span className="text-sm">Resort</span>
      </div>

      

     

     

      
    </div>
  );
}

export default Categories;
