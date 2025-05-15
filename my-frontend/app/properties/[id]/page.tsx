import ReservationSidebar from "@/app/Components/properties/ReservationSidebar";
import { getUserId } from "@/app/lib/action";
import apiService from "@/app/services/apiServices";
import Image from "next/image";
import Link from "next/link";



const PropertyDetailsPage = async ({params}:{params :{id:string}}) => {
  const property = await apiService.get(`/api/properties/${params.id}`);
  console.log("property list",property.data);
  
  const userId = await getUserId();

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Banner Image */}
      <div className="w-full h-[60vh] relative rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/assets/beach_item.avif"
          alt="Property"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-10">
        {/* Left Section */}
        <div className="lg:col-span-3 space-y-6">
          <h1 className="text-4xl font-semibold text-gray-900">{property.data.title}</h1>
          <p className="text-lg text-gray-600">
            {property.data.guests} Guests · {property.data.bedrooms} Bedrooms · {property.data.bathrooms} Bathrooms
          </p>
          <hr className="border-gray-300" />

          {/* Host Info */}
          <Link href={`/landlord/${property.data.landlord.id}`}>
            <div className="flex items-center gap-4 py-4">
              <Image
                src="/assets/profile.jpg"
                width={50}
                height={50}
                className="rounded-full object-cover"
                alt="Host profile"
              />
              <p className="text-gray-800 text-base">
                <strong>John</strong> is your host
              </p>
            </div>
          </Link>
          <hr className="border-gray-300" />

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed">{property.data.description}</p>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-2">
          <ReservationSidebar property={property.data} userId={userId} />
        </div>
      </div>
    </main>
  );
};
export default PropertyDetailsPage;
