
import Image from "next/image";
import apiService from "../services/apiServices";


const MyReservationpage = async () => {
  console.log("reservation page");
  
//   const { data: reservations } = await apiService.get('/api/auth/myreservations/');

//   console.log("reservation api",reservations);
  
  return (
    <main className="max-w-[1500px] max-auto px-6 pb-6">
      <h1 className="my-6 mb-2 text-2xl">My Reservation</h1>

      <div className="space-y-4">
        <div className="p-5 mt-4 grid grid-cols-1 md:grid-cols-4 shadow-md border gap-4 border-gray-300 rounded-xl">
          <div className="col-span-1">
            <div className=" relative overflow-hidden aspect-square rounded-xl">
              <Image
                src="/assets/beach_item.avif"
                width={100}
                height={100}
                className="hover:scale-110 object-cover transition h-full w-full rounded-xl"
                alt="the username"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 ">
            <h2 className="mb-4 text-xl"> Property Name</h2>
            <p className="mb-2">
              <strong>Check in date :</strong>14/2/2025
            </p>
            <p className="mb-2">
              <strong>Check out date :</strong>16/2/2025
            </p>

            <p className="mb-2">
              <strong>Number of nights:</strong>2
            </p>
            <p className="mb-2">
              <strong>Total price</strong>$200
            </p>
            <div className=" mt-6 inline-block cursor-pointer text-white  bg-[#ff385c] hover:bg-[#d50027] py-4 px-6 rounded-xl">
                Go Property
            </div>
          </div>
        </div>

        {/* 2nd */}

        <div className="p-5 mt-4 grid grid-cols-1 md:grid-cols-4 shadow-md border gap-4 border-gray-300 rounded-xl">
          <div className="col-span-1">
            <div className=" relative overflow-hidden aspect-square rounded-xl">
              <Image
                src="/assets/beach_item.avif"
                width={100}
                height={100}
                className="hover:scale-110 object-cover transition h-full w-full rounded-xl"
                alt="the username"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3">
            <h2 className="mb-4 text-xl"> Property Name</h2>
            <p className="mb-2">
              <strong>Check in date :</strong>14/2/2025
            </p>
            <p className="mb-2">
              <strong>Check out date :</strong>16/2/2025
            </p>

            <p className="mb-2">
              <strong>Number of nights:</strong>2
            </p>
            <p className="mb-2">
              <strong>Total price</strong>$200
            </p>
            <div className=" mt-6 inline-block cursor-pointer text-white  bg-[#ff385c] hover:bg-[#d50027] py-4 px-6 rounded-xl">
                Go Property
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MyReservationpage;
