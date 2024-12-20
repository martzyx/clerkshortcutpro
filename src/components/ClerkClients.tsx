import React, { useEffect, useState } from 'react'
import DTO, { HQclerkCustomers } from '../DTO';

const ClerkClients = () => {
    const [clients, setClients] = useState(null);
    useEffect(() => {
      console.log('ClerkClients mounted');
        const messageListener = (request: HQclerkCustomers) => {
            if(request.type === DTO.HQclerkClients) {
                console.log(request);
            }
        };
    
        chrome.runtime.onMessage.addListener(messageListener);
    
        return () => {
          chrome.runtime.onMessage.removeListener(messageListener);
        };
      }, []);

  return (
    <div>{clients}</div>
  )
}

export default ClerkClients