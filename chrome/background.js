chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "openNewTab") {
        chrome.tabs.create({ url: message.url });
    }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'Get API keys',
    contexts: ['link'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'myContextMenu' && info.linkUrl) {
    // Call your function with the link URL
    getApiUrlWithClientKey(info.linkUrl);
  }
});

function getApiUrlWithClientKey(url) {
  // Define the regex pattern to match the client_key parameter
  const pattern = /client_key=([^&]+)/;

  // Execute the regex pattern against the URL
  const match = url.match(pattern);

  // Check if a match is found
  if (match && match[1]) {
    // Replace CLIENT_KEY in the API URL with the actual client_key
    const apiUrl = "https://api.clerk.io/v2/client/info?secure=false&client_key=CLIENT_KEY";
    const newApiUrl = apiUrl.replace("CLIENT_KEY", match[1]);

    // Open the new API URL in a new tab
    chrome.tabs.create({ url: newApiUrl });
  } else {
    // Log a message if no client_key is found (or you might want to show an alert to the user)
    console.log("No client_key found in the URL");
  }
}
