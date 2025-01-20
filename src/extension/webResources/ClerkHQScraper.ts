import DTO, { HQclerkClients }  from "../../DTO";

export interface Company {
    id: number;
    subscription: string;
    name: string;
    store: string;
    enabled: boolean;
    key: string;
    products: {
      search: number;
      recommendations: number;
      email: number;
      audience: number;
      chat: number;
    };
    trial_expire_at: number;
    created_at: number;
  }
  
  export interface Store {
    id: string;
    name: string;
    key: string;
    client_key: string;
  }
  
  export interface User {
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
  
  export interface Clients {
    companies: Company[];
    stores: Store[];
    users: User[];
  }

  type HQclerkData = {
    status: string;
    clients: Clients;
  }


  const { fetch: origFetch } = window;
  window.fetch = async (...args) => {
      const response = await origFetch(...args);
      
      // If the response of the network request is from the clerk.io API & the request is a list
      // of clients
    
      if(!response.url.includes('api.clerk.io')) return response;

      if (response.url.match('list')) {
        response
          .clone()
          .json()
          .then((data: HQclerkData) => {
            const clerkClients: HQclerkClients = {
              type: DTO.HQclerkClients,
              clients: data.clients
            };
      
            if (data.status === "ok") {
              window.postMessage(clerkClients, '*'); // send to content script
            }
          })
          .catch(err => console.error(err));
        return response;
      }
      return response;
  };

