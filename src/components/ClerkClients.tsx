import React, { useEffect, useState } from 'react'
import { Clients } from '../extension/webResources/ClerkHQScraper';
import DTO from '../DTO';

const ClerkClients = () => {
  const [clients, setClients] = useState<Clients>();
  
  useEffect(() => {
    const fetchClients = async () => {
  
      const result = await chrome.storage.local.get(DTO.HQclerkClients)
      console.log("Fetched HQclerkClients", result[DTO.HQclerkClients]);
      setClients(result[DTO.HQclerkClients])
    }

    fetchClients()
  }, [])

  return (
    <div>
      <button >CLICK HERE</button>
      <h1>Clerk Clients</h1>
      <ul>
        {clients?.companies?.map(company => (
          <li key={company.id}>
            <h2>{company.name}</h2>
            <p>{company.store}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClerkClients