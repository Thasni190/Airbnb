import ContactButton from "@/app/Components/ContactButton";
import PropertyList from "@/app/Components/properties/PropertyList";
import { getUserId } from "@/app/lib/action";
import apiService from "@/app/services/apiServices";
import Image from "next/image";

const LandlordDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { data: landlord } = await apiService.get(
    `/api/auth/${params.id}/landlord/`
  );
  console.log("landord", landlord);

  const userId = await getUserId();
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 mt-9">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar - Landlord Info */}
        <aside className="col-span-1">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 shadow-md bg-white">
            <Image
              src="/assets/profile.jpg"
              width={120}
              height={120}
              className="rounded-full object-cover border border-gray-300 shadow-sm"
              alt="Landlord Profile"
            />
            <h1 className="mt-4 text-xl font-semibold text-gray-800">
                john
              {landlord.name}
            </h1>
            {userId != params.id &&(
            <ContactButton />

            )}
          </div>
        </aside>
        <div className="col-span-3 pl-0 md:pl-6">
          <div className=" grid grid-cols-1 md:grid-cols-3 ">
            <PropertyList
            
             />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandlordDetailsPage;
