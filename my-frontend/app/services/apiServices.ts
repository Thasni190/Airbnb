 import { getAccessToken } from "../lib/action";

const apiService = {
  get: async function (url: string): Promise<any> {
    console.log('get', url);
    
    const token=await getAccessToken();
    // Check if the base URL is defined
    const baseUrl = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';
    
    // Ensure the URL is correctly formed
    // const fullUrl = `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${url}`;
    const fullUrl = `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;

    
    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Uncomment if you add token later

        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response:', data);
      return { data };  // Return in expected format { data: responseData }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  
  post: async function (url: string, data: any): Promise<any> {
    console.log('post', url, data);
    const token = await getAccessToken();

    const fullUrl = `${process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    console.log('Posting to:', fullUrl);

    return new Promise((resolve, reject) => {
        fetch(fullUrl, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`
                // DO NOT add 'Content-Type' here for FormData
            }
        })
            .then(async response => {
                let json;
                try {
                    json = await response.json();
                } catch (err) {
                    console.error("Invalid JSON response", err);
                    reject(err);
                    return;
                }

                console.log('Response:', json);
                resolve(json);
            })
            .catch((error => {
                console.error("Fetch error:", error);
                reject(error);
            }));
    });
},


  
//   post: async function(url: string, data: any): Promise<any> {
//     console.log('post', url, data);

//     const token = await getAccessToken();

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {

//         // fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//             method: 'POST',
//             body: data,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then(response => response.json())
//             .then((json) => {
//                 console.log('Response:', json);

//                 resolve(json);
//             })
//             .catch((error => {
//                 reject(error);
//             }))
//     })
// },

  postWithoutToken: async function(url: string, data: any): Promise<any> {
    console.log('post', url, data);
    // const token=await getAccessToken();

    // Check if the base URL is defined
    const baseUrl = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';
    
    // Ensure the URL is correctly formed
    // const fullUrl = `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}`}${url}`;
    const fullUrl = `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;

    
    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`  // Uncomment if you add token later
        },
        body: JSON.stringify(data)  // Data will be stringified here
      });
      
      // Better error handling
      const responseData = await response.json();
      console.log('Response:', responseData);
      
      if (!response.ok) {
        // Return the error response so it can be handled by the component
        return responseData;
      }
      
      return responseData;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
};

export default apiService;