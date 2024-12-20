import { useEffect, useState } from 'react';
import DTO, { clerkSniffer } from '../DTO';
const ClerkSniffer = () => {
  const [isClerk, setIsClerk] = useState(false);

  useEffect(() => {
    const messageListener = (request: clerkSniffer) => {
      if(request.type === DTO.ClerkSniffer) {
        if(request.state) {
          setIsClerk(request.state);
          return;
        }
      }
      
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div>Clerk avaliable = {isClerk ? "True" : "False"}</div>
  );
};


export default ClerkSniffer;