import { useEffect, useState } from 'react';
import DTO from '../DTO';
const ClerkSniffer = () => {
  // is current tab open with clerk?
  const [isClerk, setIsClerk] = useState<boolean>(false);
  

  useEffect(() => {
    chrome.storage.session.get(DTO.ClerkSniffer, (result) => {
        // Handle popup data
        chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
          const currentUrl = tabs[0].url
          if(currentUrl == undefined || result[DTO.ClerkSniffer] == undefined) return
          for (const url of result[DTO.ClerkSniffer]) {
            if(currentUrl.includes(url)) {
              setIsClerk(true);
            };
        }});
    });
  }, [])
  return (
    <span className='flex gap-2 font-semibold text-sm align-baseline items-center'>
      Clerk is {isClerk ? 'active' : 'inactive'}
      {isClerk ? <ClerkSnifferStatus actice={true} /> : <ClerkSnifferStatus actice={false} />}
      </span>
  );
};


export const ClerkSnifferStatus: React.FC<{ actice: boolean }> = ({ actice }) => {
  return (
    <div className='w-4 h-4'>
        <div className={`w-4 h-4 animate-pulse ${actice ? "bg-green-400" : "bg-red-400" } rounded-full`}/>
        <div className={`w-2 h-2 animate-none  ${actice ? "bg-green-500" : "bg-red-500" } rounded-full relative translate-y-1/2 justify-center m-auto top-[-16px]`} />
      </div>
  )
}



export default ClerkSniffer;