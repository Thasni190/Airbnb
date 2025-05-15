
'use client';
import React from 'react'
import DatePicker from '../forms/Calender';
import { useState,useEffect } from 'react';
import {Range} from 'react-date-range';
import {format} from 'date-fns';
import { differenceInDays,eachDayOfInterval } from 'date-fns';
import apiService from '@/app/services/apiServices';
import LoginModal from '../model/LoginModel';
import useLoginModal from '@/app/hooks/useLoginModal';


const initialDateRange={
    startDate:new Date(),
    endDate : new Date(),
    key:'selection'

}

export type Property={
    id: string;
    guests:number;
    price_per_night:number;
}

interface ReservationSidebarProps{
    userId:string |null,
    property:Property
}
function ReservationSidebar({property,userId}:ReservationSidebarProps) {
    const loginModal=useLoginModal();

    const[fee,setFee]=useState<number>(0);
    const[night,setNight]=useState<number>(1);
    const[totalPrice,setTotalPrice]=useState<number>(0);
    const [dateRange,setDateRange]=useState<Range>(initialDateRange);
    const[mindate,setMinDate]=useState<Date>(new Date());
    const[guests,setGuests]=useState<string>('1');
    const[bookedDates,setBookedDates]=useState<Date[]>([]);

    const guestsRange=Array.from({length:property.guests},(_, index)=>index+1);



     const performBooking=async()=>{
        console.log("perform booking",userId);
        
        if(userId){
            if(dateRange.startDate && dateRange.endDate){
                const formDate =new FormData();
                formDate.append('guests',guests);
                formDate.append('start_date',format(dateRange.startDate,'yyyy-MM-dd'));
                formDate.append('end_date',format(dateRange.endDate,'yyyy-MM-dd'));
                formDate.append('number_of_night',night.toString());
                formDate.append('total_price',totalPrice.toString());

                const response=await apiService.post(`/api/properties/${property.id}/book/`,formDate);

                if(response.success){
                    console.log("Booking successfully");
                    
                }
                else{
                    console.log("something went worng");
                    
                }

            }
            else{
                loginModal.open();
            }
        }
     }
   
    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }

    const getReservation= async()=>{
        const reservation =await apiService.get(`/api/properties/${property.id}/reservations`);
        console.log('reservation',reservation);

        let dates:Date[]=[];
        const reservationData = reservation.data; // or reservation.reservations
        reservationData.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date)
            });
            dates = [...dates, ...range];
        });
        
        setBookedDates(dates);
    }
    
    useEffect(() => { 
        getReservation() ;   
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night) + _fee);
                setNight(dayCount);
            } else {
                const _fee = (property.price_per_night / 100) * 5;

                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee);
                setNight(1);
            }
        }
    }, [dateRange])


  return (
  <aside className="mt-4 p-6 rounded-2xl border border-gray-200 shadow-xl bg-white space-y-6">
  <h2 className="text-2xl font-semibold text-gray-900">${property.price_per_night} <span className="text-base font-normal text-gray-600">/ night</span></h2>

  <DatePicker
    value={dateRange}
    bookedDates={bookedDates}
    onchange={(value) => _setDateRange(value.selection)}
  />

  <div className="p-4 border border-gray-300 rounded-xl">
    <label className="mb-2 block font-semibold text-sm text-gray-700">Guests</label>
    <select
      value={guests}
      onChange={(e) => setGuests(e.target.value)}
      className="w-full text-sm rounded-md border border-gray-300 p-2"
    >
      {guestsRange.map((number) => (
        <option value={number} key={number}>{number}</option>
      ))}
    </select>
  </div>

  <button
    onClick={performBooking}
    className="w-full py-4 text-white font-semibold bg-[#ff385c] hover:bg-[#d50027] transition-colors rounded-xl"
  >
    Book
  </button>

  <div className="text-sm space-y-2 text-gray-700">
    <div className="flex justify-between">
      <p>${property.price_per_night} × {night} nights</p>
      <p>${property.price_per_night * night}</p>
    </div>
    <div className="flex justify-between">
      <p>Airbnb Fee</p>
      <p>${fee}</p>
    </div>
    <hr />
    <div className="flex justify-between font-semibold text-gray-900 pt-2">
      <p>Total</p>
      <p>${totalPrice}</p>
    </div>
  </div>
</aside>

  )
}

export default ReservationSidebar
