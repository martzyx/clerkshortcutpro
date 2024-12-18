// src/components/ScriptExecutor.tsx

const ScriptExecutor = () => {
  const handleClick = async () => {
      chrome.runtime.sendMessage({ message: 'Hello from the popup!' });
  };

  return (
    <button onClick={handleClick}>Send Message</button>
  );
};

export default ScriptExecutor;