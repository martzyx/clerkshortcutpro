import React, { useEffect, useState } from 'react'
import { Clients } from '../extension/webResources/ClerkHQScraper';

const ClerkClients = () => {
    const [clients, setClients] = useState<Clients>();
    useEffect(() => {
      console.log('ClerkClients mounted');
        const messageListener = (request: Clients) => {
      
            
              console.log(request);
              setClients(request);
          
        };
    
        chrome.runtime.onMessage.addListener(messageListener);

        return () => {
          chrome.runtime.onMessage.removeListener(messageListener);
        };
      }, []);

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