"use client";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal";
import React, { useState } from "react";
import Model from "./Model";
import { Calendar,Range } from "react-date-range";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import CustomButton from "../forms/CustomButton";
import DatePicker from "../forms/Calender";

const initialDateRange ={
    startDate: new Date(),
    endDate : new Date(),
    key :'selection'

}

function SearchModal() {
  let content = <></>;
  const searchModal = useSearchModal();
  const [country, setCountry] = useState<SelectCountryValue>();
  const [dateRange,setDateRange]=useState<Range>(initialDateRange);
  const[numGuests,setNumGuests]=useState<string>('1')
  const[numBedrooms,setNumBedrooms]=useState<string>('0');
  const[numBathrooms,setNumBathrooms]=useState<string>('0');


  //set date range

  const _setDateRange=(selection:Range)=>{
    if(searchModal.step==='checkin'){
        searchModal.open('checkout');
    }else if(searchModal.step === 'checkout'){
        searchModal.open('details')
    }
   setDateRange(selection);
  }
    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBathrooms),
            category: ''
        }

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check in date ->"
                    onClick={() => searchModal.open('checkin')}
                />
            </div>
        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

            <DatePicker
                value={dateRange}
                onchange={(value)=> _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Location"
                    onClick={() => searchModal.open('location')}
                />

                <CustomButton
                    label="Check out date ->"
                    onClick={() => searchModal.open('checkout')}
                />
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check out?</h2>

            <DatePicker
                value={dateRange}
                 onchange={(value)=> _setDateRange(value.selection)}            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check in date"
                    onClick={() => searchModal.open('checkin')}
                />

                <CustomButton
                    label="Details ->"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numGuests} 
                        placeholder="Number of guests..."
                        onChange={(e) => setNumGuests(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of bedrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numBedrooms} 
                        placeholder="Number of bedrooms..."
                        onChange={(e) => setNumBedrooms(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of bathrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={numBathrooms} 
                        placeholder="Number of bathrooms..."
                        onChange={(e) => setNumBathrooms(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check out date"
                    onClick={() => searchModal.open('checkout')}
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

   if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step == 'checkout') {
        content = contentCheckout;
    } else if (searchModal.step == 'details') {
        content = contentDetails;
    }

    
  return (
    <div>
      <Model
        label="Search"
        content={content}
        close={searchModal.close}
        isOpen={searchModal.isOpen}
      />
    </div>
  );
}

export default SearchModal;
