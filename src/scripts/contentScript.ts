chrome.runtime.onMessage.addListener((message) => {
  console.log('contentScript received message:', message);
});