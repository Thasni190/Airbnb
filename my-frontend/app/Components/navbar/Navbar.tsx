import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchFilter from "./SearchFilter";
import UserNav from "./UserNav";
import { getUserId } from "@/app/lib/action";
import AddPropertyButton from "./AddPropertyButton";

async function Navbar() {
  const userId = await getUserId();
  console.log("userid ", userId);
  
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6 ">
        <div className=" flex justify-between items-center">
          <Link href="/">
            <Image
              src="/airbnblogo.png"
              alt="airbn_logo"
              width={180}
              height={38}
            />
          </Link>
          <div className="flex space-x-6">
            <SearchFilter />
          </div>
          <div className="flex items-center space-x-6">
            <AddPropertyButton
              userId={userId}

             />


            <UserNav
            userId={userId}
             />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
