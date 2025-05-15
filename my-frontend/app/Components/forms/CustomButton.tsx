import React from 'react'

interface CustomButtinProps{
    label: string;
    className?:string;
    onClick:()=>void;
}

function CustomButton({label,className,onClick}:CustomButtinProps) {
  return (
    <div 
    onClick={onClick}
    className={`w-full py-4 bg-[#ff385c] hover:bg-[#d50027] transition rounded-xl text-center cursor-pointer text-white ${className}`}
    >
      {label}
    </div>
  )
}

export default CustomButton
