// src/components/ScriptExecutor.tsx
import { useEffect } from 'react';
import DTO from './DTO';

const ScriptExecutor = () => {

    useEffect(() => {
    const messageListener = (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
      console.log('Message received in popup:', request);
      // Handle the message here
      if (request.message === 'Hello from the content script!') {
        console.log('Received greeting from content script');
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup the listener on component unmount
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleClick = async () => {
      chrome.runtime.sendMessage({ message: 'Hello from the popup!' });
  };

  return (
    <button onClick={handleClick}>Send Message</button>
  );
};

export default ScriptExecutor;