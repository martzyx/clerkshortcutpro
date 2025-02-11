chrome.storage.sync.get({ openOldMyClerk: false }, function (items) {
    if (items.openOldMyClerk) {
        contextMenuOldMyClerk();
    }
});

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
    // chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
        id: "openOldMyClerkCMenu",
        title: "Open old myClerk",
        contexts: ["link"],
        documentUrlPatterns: ["*://hq.clerk.io/*", "*://old-hq.clerk.io/*"],
    });
    // });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openOldMyClerkCMenu" && info.linkUrl) {
        openOldMyClerk(info.linkUrl);
    }
});

function openOldMyClerk(url) {
    if (url.includes("https://my.clerk.io/#/?client_key=")) {
        const changedUrl = url.replace("https://my.clerk.io/#/?client_key=", "https://old-my.clerk.io/#/?client_key=");
        chrome.tabs.create({ url: changedUrl });
    } else {
        console.log("ClerkShortcutPro: error on backend url");
    }
}
