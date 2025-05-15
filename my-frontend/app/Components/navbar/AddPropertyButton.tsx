'use client'
import React from 'react'
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal'
import useLoginModal from '@/app/hooks/useLoginModal';

interface AddPropertyButtonProps{
  userId?: string | null;
}
function AddPropertyButton({userId}:AddPropertyButtonProps) {
  const addPropertyModal = useAddPropertyModal();
  const loginModal =useLoginModal();

  const airbnbYourHome=()=>{
    console.log("airbnb button click");

    if(userId){
      addPropertyModal.open()

    }
    else{
      loginModal.open()
    }
    
  }
  return (
    <div 
    onClick={airbnbYourHome}
    className='p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200'>
       Airbnb your home
    </div>
  )
}

export default AddPropertyButton
