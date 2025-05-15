'use client';
import {format} from 'date-fns';
import React, { useEffect, useState } from 'react';
import PropertyListItem from './PropertyListItem';
import apiService from '@/app/services/apiServices';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';

export type PropertyType={
id:string;
title:string;
image_url:string;
price_per_night:number;
is_favorite:boolean;
}


interface PropertyListProps{
  landlord_id?:string | null;
  favorites?: boolean | null;
}


function PropertyList({landlord_id,favorites}:PropertyListProps) {
  const searchModal=useSearchModal();
  console.log("qury search", searchModal.query);


    const params= useSearchParams();
    const country = searchModal.query.country;
    const numGuests = searchModal.query.guests;
    const numBathrooms = searchModal.query.bathrooms;
    const numBedrooms = searchModal.query.bedrooms;
    const checkinDate = searchModal.query.checkIn;
    const checkoutDate = searchModal.query.checkOut;
    const category = searchModal.query.category;
    console.log("numbr of bed rooms", numBedrooms);
    console.log("number of nath rooms", numBathrooms);
    
    
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
        if (property.id == id) {
            property.is_favorite = is_favorite

            if (is_favorite) {
                console.log('added to list of favorited propreties')
            } else {
                console.log('removed from list')
            }
        }

        return property;
    })

    setProperties(tmpProperties);
}
  
  // const getProperties = async () => {
  //   let url='api/properties/';
  //   // if(landlord_id){
  //   //   url += `?<landlord_id1>l</landlord_id1>`
  //   // }
  //   if(landlord_id){
  //     url += `?landord_id=${landlord_id}`
  //   }
  //   try {
  //     console.log('Fetching properties...');
  //     const response = await apiService.get(url);
  //     console.log('API Response:', response);
      
  //     // Check for various possible response structures
  //     const propertyData = response?.data?.data || response?.data || [];
      
  //     if (Array.isArray(propertyData) && propertyData.length > 0) {
  //       console.log('Setting properties:', propertyData);
  //       setProperties(propertyData.data.map((property:PropertyType)=>{
  //         if (propertyData.favorites.includes(property.id)) {
  //           property.is_favorite = true
  //       } else {
  //           property.is_favorite = false
  //       }

  //       return property
  //       }));


  //     } else {
  //       console.log('No properties found in response');
  //       setError('No properties found');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching properties:', err);
  //     setError('Failed to fetch properties');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const getProperties = async () => {
    let url = 'api/properties/';
    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`; 
    }
    else if(favorites){
      url +=`?is_favorites=true`
    }

        else {
            let urlQuery = '';

            if (country) {
                urlQuery += '&country=' + country
            }

            if (numGuests) {
                urlQuery += '&numGuests=' + numGuests
            }

            if (numBedrooms) {
                urlQuery += '&numBedrooms=' + numBedrooms
            }

            if (numBathrooms) {
                urlQuery += '&numBathrooms=' + numBathrooms
            }

            if (category) {
                urlQuery += '&category=' + category
            }

            if (checkinDate) {
                urlQuery += '&checkin=' + format(checkinDate, 'yyyy-MM-dd')
            }

            if (checkoutDate) {
                urlQuery += '&checkout=' + format(checkoutDate, 'yyyy-MM-dd')
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery);

                urlQuery = '?' + urlQuery.substring(1);

                url += urlQuery;
            }
        }
  
    try {
      console.log('Fetching properties...');
      const response = await apiService.get(url);
      console.log('API Response:', response);
  
      const responseData = response?.data;
      const propertyArray = responseData?.data ?? []; // array of properties
      const favorites: string[] = responseData?.favorites ?? [];
  
      if (Array.isArray(propertyArray) && propertyArray.length > 0) {
        const mappedProperties = propertyArray.map((property: PropertyType) => ({
          ...property,
          is_favorite: favorites.includes(property.id), 
        }));
  
        setProperties(mappedProperties);
      } else {
        console.log('No properties found in response');
        setError('No properties found');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };
   
  
  useEffect(() => {
    getProperties();
  }, [category,searchModal.query,params]);
  
  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }
  
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyListItem 
          key={property.id} 
          property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
           />
        ))
      ) : (
        <div className="col-span-full text-center py-8">No properties available</div>
      )}
    </div>
  );
}

export default PropertyList;