import React, { useEffect, useState } from 'react'
import { Clients } from '../extension/webResources/ClerkHQScraper';
import DTO from '../DTO';

const ClerkClients = () => {
  const [clients, setClients] = useState<Clients>();
  
  useEffect(() => {
    chrome.storage.session.get(DTO.HQclerkClients, (result) => {
      setClients(result[DTO.HQclerkClients]);
    });
  }, [])

  return (
    <div>
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