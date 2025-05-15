
'use client'; // 👈 Tells Next.js this is a Client Componentimport React from 'react'
 interface MenuLinkProps{
    label:string;
    onClick:()=>void;
 }


function MenuLink({label,onClick}:MenuLinkProps) {
  return (
    <div 
    onClick={onClick}
    className="px-5 py-4 cursor-pointer hover:bg-gray-100 transition">
         {label}
    </div>
  )
}

export default MenuLink
