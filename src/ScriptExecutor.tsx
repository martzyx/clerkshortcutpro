// src/components/ScriptExecutor.tsx

const ScriptExecutor = () => {
  const handleClick = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    setTimeout(() => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: 'executeScript' }, (response) => {
        console.log('Response from content script:', response);
      });
    }, 1000); // Add a delay of 1 second
  };

  return (
    <button onClick={handleClick}>Send Message</button>
  );
};

export default ScriptExecutor;