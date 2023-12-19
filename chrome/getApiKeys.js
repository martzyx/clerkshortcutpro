
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'myContextMenu',
    title: 'Get API keys',
    contexts: ['link'],
    documentUrlPatterns: ['*://hq.clerk.io/*', '*://old-hq.clerk.io/*']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'myContextMenu' && info.linkUrl) {
    getApiUrlWithClientKey(info.linkUrl);
  }
});

function getApiUrlWithClientKey(url) {
  const pattern = /client_key=([^&]+)/;

  const match = url.match(pattern);

  if (match && match[1]) {
    // Replace CLIENT_KEY in the API URL with the actual client_key
    const apiUrl = "https://api.clerk.io/v2/client/info?secure=false&client_key=CLIENT_KEY";
    const newApiUrl = apiUrl.replace("CLIENT_KEY", match[1]);

    chrome.tabs.create({ url: newApiUrl });
  } else {
    console.log("No client_key found in the URL");
  }
}
