chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "openNewTab") {
        chrome.tabs.create({ url: message.url });
    }
});

chrome.storage.sync.get(
    {
        openOldMyClerk: true,
    },
    function (items) {
        if (items.openOldMyClerk) {
            contextMenuOldMyClerk();
        }
    }
);

// enable/disable if chrome storage variable changes
chrome.storage.onChanged.addListener(function (changes) {
    if ("openOldMyClerk" in changes) {
        let storageChange = changes.openOldMyClerk;

        if (storageChange.newValue) {
            contextMenuOldMyClerk();
        } else {
            chrome.contextMenus.remove("openOldMyClerkCMenu");
        }
    }
});

function contextMenuOldMyClerk() {
    chrome.contextMenus.create({
        id: "openOldMyClerkCMenu",
        title: "Open old myClerk",
        contexts: ["link"],
        documentUrlPatterns: ["*://hq.clerk.io/*", "*://old-hq.clerk.io/*"],
    });
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openOldMyClerkCMenu" && info.linkUrl) {
        openOldMyClerk(info.linkUrl);
    }
});

function openOldMyClerk(url) {
    // https://my.clerk.io/#/?client_key=tumEg23cZAxcjvCAeo0RV7cPv8p4hhBxYleOL43rr6vEgEHx2ucAm6S6ew5FZN3W6kcmrtuniW5QPXBXaV0DOzNQx9ld6hQdJxd9gjWVgKeWz5n3Tf8YzD2DQIcvkoZwfsuetEU31X5V3Ka2byrVpJnly4Glzvx0TzDdwI7QI7rF54CMI8apf9YNosFcZjBKEKtRd9rfAViw1jq14hNdFjBbdG2KxEuSf7V7fbNtNwzADHtLonxDMXu8b95zcsN
    if (url.includes('https://my.clerk.io/#/?client_key=')) {
        const changedUrl = url.replace("https://my.clerk.io/#/?client_key=","https://old-my.clerk.io/#/?client_key=");
        chrome.tabs.create({ url: changedUrl });
    } else {
        console.log("ClerkShortcutPro: error on backend url");
    }
}
