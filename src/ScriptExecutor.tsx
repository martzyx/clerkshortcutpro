// src/components/ScriptExecutor.tsx


const ScriptExecutor = () => {

  const handleClick = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currTab = tabs[0];

    if (currTab.id !== undefined) {
      chrome.tabs.sendMessage(currTab.id, { message: 'Hello from React!' });
    }
  };
    
  return (
    <div className='w-5/12'>
      <span>CLICK</span>
      <button className="w-7 h-7 bg-red-600" onClick={handleClick}>HERE</button>
    </div>
  );
};

export default ScriptExecutor;
