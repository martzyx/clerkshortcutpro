importScripts("getApiKeys.js");
importScripts("openOldMyClerk.js")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "openNewTab") {
        chrome.tabs.create({ url: message.url });
    }
});
