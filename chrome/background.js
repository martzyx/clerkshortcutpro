importScripts('openOldMyClerk.js');
importScripts('getApiKeys.js');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "openNewTab") {
        chrome.tabs.create({ url: message.url });
    }
});
