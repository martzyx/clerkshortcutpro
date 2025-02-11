const browserAPI = window.browser || window.chrome; // Use `browser` in Firefox, fallback to `chrome` in Chrome

contextMenuOldMyClerk();
// Get the stored setting and create the context menu if enabled
browserAPI.storage.sync.get({ openOldMyClerk: false }).then((items) => {
    if (items.openOldMyClerk) {
    }
}).catch(err => console.error("Storage API error:", err));

// Listen for storage changes and update the context menu
browserAPI.storage.onChanged.addListener((changes) => {
    if ("openOldMyClerk" in changes) {
        let storageChange = changes.openOldMyClerk;
        if (storageChange.newValue) {
            contextMenuOldMyClerk();
        } else {
            browserAPI.contextMenus.remove("openOldMyClerkCMenu");
        }
    }
});

function contextMenuOldMyClerk() {
    browserAPI.contextMenus.create({
        id: "openOldMyClerkCMenu",
        title: "Open old myClerk",
        contexts: ["link"],
        documentUrlPatterns: ["*://hq.clerk.io/*", "*://old-hq.clerk.io/*"]
    }, () => {
        if (browserAPI.runtime.lastError) {
            console.error("Error creating context menu:", browserAPI.runtime.lastError);
        } else {
            console.log("Context menu created successfully!");
        }
    });
}

// Handle context menu clicks
browserAPI.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openOldMyClerkCMenu" && info.linkUrl) {
        openOldMyClerk(info.linkUrl);
    }
});

function openOldMyClerk(url) {
    if (url.includes("https://my.clerk.io/#/?client_key=")) {
        const changedUrl = url.replace("https://my.clerk.io/#/?client_key=", "https://old-my.clerk.io/#/?client_key=");
        browserAPI.tabs.create({ url: changedUrl });
    } else {
        console.log("ClerkShortcutPro: error on backend url");
    }
}