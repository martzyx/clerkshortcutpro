console.log('Back script loaded');

// Listen for messages from the pop up
chrome.runtime.onMessage.addListener((message) => {
  console.log('Message received:', message);
});
