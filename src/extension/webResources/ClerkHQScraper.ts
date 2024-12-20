import DTO from "../../DTO";

 interface Company {
    id: number;
    account_id: string;
    name: string;
    store: string;
    enabled: boolean;
    key: string;
  }
  
   interface Store {
    id: string;
    name: string;
    key: string;
    client_key: string;
  }
  
   interface User {
    id: number;
    account_id: string;
    name: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      profession: string;
      number_format: string;
      error_email: boolean;
      status_email: string;
      created_at: number;
      role: string;
    };
    store: string;
    enabled: boolean;
    key: string;
  }
  
   interface Clients {
    companies: Company[];
    stores: Store[];
    users: User[];
  }
  
  interface ClerkData {
    status: string;
    clients: Clients;
  }

  const { fetch: origFetch } = window;
  window.fetch = async (...args) => {
      const response = await origFetch(...args);
      
      // If the response of the network request is from the clerk.io API & the request is a list
      // of clients

      if(response.url.includes('api.clerk.io') && response.url.match('list')){
          response
              .clone()
              .json()
              .then((data: ClerkData) => {
                  if (data.status === "ok") {
                    console.log(data.clients);
                    window.postMessage({ type: DTO.HQclerkClients, data: data.clients }, '*'); // send to content script
                  }
              })
              .catch(err => console.error(err));
              return response;
      } 
      return response;
  };
