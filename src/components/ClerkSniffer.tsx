import { useEffect, useState } from 'react';
import DTO from '../DTO';
const ClerkSniffer = () => {
  const [isClerk, setIsClerk] = useState(false);
  
  useEffect(() => {
    chrome.storage.session.get(DTO.ClerkSniffer, (result) => {
      setIsClerk(result[DTO.ClerkSniffer]);
    });
  }, [])
  return (
    <div>Clerk avaliable = {isClerk ? "True" : "False"}</div>
  );
};


export default ClerkSniffer;