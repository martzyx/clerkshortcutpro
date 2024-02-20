chrome.storage.sync.get(
    function (items) {
        if (items.getClientInfo) {
            contextMenuClientInfo();
        }
    }
);

// enable/disable if chrome storage variable changes
chrome.storage.onChanged.addListener(function (changes) {
    if ("getClientInfo" in changes) {
        let storageChange = changes.getClientInfo;

        if (storageChange.newValue) {
            contextMenuClientInfo();
        } else {
            chrome.contextMenus.remove("getClientInfoCMenu");
        }
    }
});

function contextMenuClientInfo() {
    chrome.contextMenus.create({
        id: "getClientInfoCMenu",
        title: "Get API keys",
        contexts: ["link"],
        documentUrlPatterns: ["*://hq.clerk.io/*", "*://old-hq.clerk.io/*"],
    });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "getClientInfoCMenu" && info.linkUrl) {
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
