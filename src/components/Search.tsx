import React, { useState } from 'react'
import DTO, { SearchClients } from '../DTO'
import searchClerkClients from '../extension/backgroundScripts/search';
import StoreHQClerkClients from '../extension/backgroundScripts/HQClerkClients';
import { Spinner } from 'flowbite-react';
import useClerkClients from './context/useClerkClients';
const Search = () => {
    const [query, setQuery] = useState<string>();
    const [searching, setSearching] = useState<boolean>(false)
    const { setClients } = useClerkClients();

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!query) return
        setSearching(true);
        const s: SearchClients = {
            type: DTO.SearchClients,
            query: query
          }
          const clients = await searchClerkClients(s.query);
          const status = await StoreHQClerkClients(clients.clients);
          if(status) setSearching(false);
          if(clients.clients.companies.length <= 0) return
          setClients(clients.clients)
          return
    }
    
  return (
    <form onSubmit={handleSearch} className="grid grid-cols-[minmax(1rem,2rem)_minmax(1rem,15rem)] items-center border border-gray-300 bg-white rounded-full p-1">
      
      {searching ? <Spinner className='w-5 h-5' /> : <div className="grid place-items-center p-1 gap-2 cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M22.1502 19.9604L17.5874 15.4553C17.501 15.37 17.3882 15.3254 17.268 15.3254H16.7718C17.9558 13.9709 18.6736 12.2083 18.6736 10.2786C18.6736 6.0147 15.1745 2.55981 10.856 2.55981C6.53748 2.55981 3.03833 6.0147 3.03833 10.2786C3.03833 14.5424 6.53748 17.9973 10.856 17.9973C12.8104 17.9973 14.5957 17.2885 15.9675 16.1196V16.6094C15.9675 16.7282 16.0164 16.8395 16.0991 16.9249L20.6619 21.4299C20.8385 21.6043 21.1242 21.6043 21.3008 21.4299L22.1502 20.5913C22.3269 20.4168 22.3269 20.1348 22.1502 19.9604ZM10.856 16.2161C7.53348 16.2161 4.8424 13.559 4.8424 10.2786C4.8424 6.9981 7.53348 4.34106 10.856 4.34106C14.1785 4.34106 16.8696 6.9981 16.8696 10.2786C16.8696 13.559 14.1785 16.2161 10.856 16.2161Z"
              fill="#111111"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_1325_22780">
              <rect
                width="19.2435"
                height="19"
                fill="white"
                transform="translate(3 2.55)"
                data-darkreader-inline-fill=""
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </div>}
      <input
        className="w-full bg-inherit outline-none"
        placeholder="Search for clients"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

export default Search
