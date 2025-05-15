'use client';
import React from 'react'
import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select';

export type SelectCountryValue={
    label:string;
    value:string
}
interface SelectCountryProps{
    value?: SelectCountryValue;
    onChange:(value:SelectCountryValue)=>void;
}

function SelectCountry({value,onChange}:SelectCountryProps) {
    const {getAll}=useCountries()
  return (
   <>
   <Select
   isClearable
   placeholder="Anywhere"
   options={getAll()}
   value={value} 
   onChange={(value)=>onChange(value as SelectCountryValue)}
   />
   </>
  )
}

export default SelectCountry
