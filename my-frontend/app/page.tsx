import Categories from "./Components/Categories";
import PropertyList from "./Components/properties/PropertyList";
import Conversationpage from "./inbox/[id]/Pages";
import InboxPage from "./inbox/Pages";
import MyPropertiesPage from "./myproperties/Page";
import MyReservationpage from "./myreservation/page";
import MyReservation from "./myreservation/page";

export default function Home() {
  return (
    <main className=" max-w-[1500px] mx-auto px-6 mt-9">
      <Categories />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3">   
           <PropertyList/>
    
      </div>
      {/* <PropertyDetailsPage/> */}
      {/* <LandlordDetailsPage/> */}
      {/* <MyReservationpage/> */}
      {/* <MyPropertiesPage/> */}
      {/* <InboxPage/> */}
      {/* <Conversationpage/> */}
    </main>
  );
}
