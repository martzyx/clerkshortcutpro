var s = document.createElement("script");
s.src = chrome.runtime.getURL("injected.js");
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
    s.remove();
};

chrome.storage.sync.get(
    {
        // default values if user has not yet set up
        shortcut1: "Enter",
        enableShortcut1: true,
        shortcut2: "Escape",
        enableShortcut2: true,
        enableTranslationButtons: true,
        openOldMyClerk: false,
        getClientInfo: true,
    },
    function (items) {
        window.postMessage(
            {
                type: "FROM_CONTENT_SCRIPT",
                shortcut1: items.shortcut1,
                enableShortcut1: items.enableShortcut1,
                shortcut2: items.shortcut2,
                enableShortcut2: items.enableShortcut2,
            },
            "*"
        );
    }
);

chrome.storage.onChanged.addListener(function (changes, namespace) {
    var message = { type: "FROM_CONTENT_SCRIPT" };

    if (changes.shortcut1) {
        message.shortcut1 = changes.shortcut1.newValue;
    }
    if (changes.enableShortcut1) {
        message.enableShortcut1 = changes.enableShortcut1.newValue;
    }
    if (changes.shortcut2) {
        message.shortcut2 = changes.shortcut2.newValue;
    }
    if (changes.enableShortcut2) {
        message.enableShortcut2 = changes.enableShortcut2.newValue;
    }

    // Only post message if at least one relevant change occurred
    if (Object.keys(message).length > 1) {
        window.postMessage(message, "*");
    }
});
