window.addEventListener("reactSettingsLoaded", function (e) {
    restore_options();
    assignProceedShortcutListener();
    assignCloseModalShortcutListener();
    toggleProceedShortcutListener();
    toggleCloseModalShortcutListener();

    // When form is submitted, save settings
    var shortcutForm = document.getElementById("shortcut-form");
    if (shortcutForm) {
        shortcutForm.addEventListener("submit", function (e) {
            save_options(e);
        });
    }

    // Assigns shortcut listener for shortcut1
    function assignProceedShortcutListener() {
        var shortcut1 = document.getElementById("shortcut1");
        if (shortcut1) {
            shortcut1.addEventListener("keydown", function (event) {
                event.preventDefault();
                document.getElementById("shortcut1").value = event.key; // Assign the pressed key
                return false; // Prevent the form from being submitted
            });
        }
    }

    // Assigns shortcut listener for shortcut2
    function assignCloseModalShortcutListener() {
        var shortcut2 = document.getElementById("shortcut2");
        if (shortcut2) {
            shortcut2.addEventListener("keydown", function (event) {
                event.preventDefault(); // Prevent the default action
                document.getElementById("shortcut2").value = event.key; // Assign the pressed key
                return false; // Prevent the form from being submitted
            });
        }
    }

    // Disable assignment input for shortcut1 if toggle is not checked
    function toggleProceedShortcutListener() {
        var enableshortcut1 = document.getElementById("enable-shortcut1");
        if (enableshortcut1) {
            enableshortcut1.addEventListener("change", function () {
                var enableShortcut = enableshortcut1.checked;
                document.getElementById("shortcut1").disabled = !enableShortcut;
            });
        }
    }
    // Disable assignment input for shortcut2 if toggle is not checked
    function toggleCloseModalShortcutListener() {
        var enableShortcut2 = document.getElementById("enable-shortcut2");
        if (enableShortcut2) {
            enableShortcut2.addEventListener("change", function () {
                var enableShortcut = enableShortcut2.checked;
                document.getElementById("shortcut2").disabled = !enableShortcut;
            });
        }
    }

    // Saves options to chrome.storage.sync
    function save_options(e) {
        console.log("Saving options...");

        var shortcut1Value = document.getElementById("shortcut1").value;
        var shortcut2Value = document.getElementById("shortcut2").value;

        chrome.storage.sync.set(
            {
                shortcut1: shortcut1Value,
                enableShortcut1: document.getElementById("enable-shortcut1").checked,
                shortcut2: shortcut2Value,
                enableShortcut2: document.getElementById("enable-shortcut2").checked,
                enableTranslationButtons: document.getElementById("translation-button-toggle").checked,
                getClientInfo: document.getElementById("client-info-toggle").checked,
                openOldMyClerk: document.getElementById("old-myclerk-toggle").checked,
            },
            function () {
                // Update status to let user know options were saved.
                console.log("Settings saved successfully");
            }
        );
    }

    // Restores select box and checkbox state using the preferences stored in chrome.storage.
    function restore_options() {
        chrome.storage.sync.get(
            {
                // default values if user has not yet set up
                shortcut1: "Enter",
                enableShortcut1: true,
                shortcut2: "Escape",
                enableShortcut2: true,
                enableTranslationButtons: true,
                openOldMyClerk: true,
                getClientInfo: true,
            },

            function updateItems(items) {
                const shortcut1Element = document.getElementById("shortcut1");
                const enableShortcut1Element = document.getElementById("enable-shortcut1");
                const shortcut2Element = document.getElementById("shortcut2");
                const enableShortcut2Element = document.getElementById("enable-shortcut2");
                const enableTranslationButtonsElement = document.getElementById("translation-button-toggle");
                const getClientInfoElement = document.getElementById("client-info-toggle");
                const openOldMyClerkElement = document.getElementById("old-myclerk-toggle");

                if (shortcut1Element) {
                    shortcut1Element.value = items.shortcut1;
                    shortcut1Element.disabled = !items.enableShortcut1;
                }

                if (enableShortcut1Element) {
                    // sets the element to checked/unchecked based on chrome storage
                    enableShortcut1Element.checked = items.enableShortcut1;
                }

                if (shortcut2Element) {
                    shortcut2Element.value = items.shortcut2;
                    shortcut2Element.disabled = !items.enableShortcut2;
                }

                if (enableShortcut2Element) {
                    enableShortcut2Element.checked = items.enableShortcut2;
                }

                if (enableTranslationButtonsElement) {
                    enableTranslationButtonsElement.checked = items.enableTranslationButtons;
                }

                if (openOldMyClerkElement) {
                    openOldMyClerkElement.checked = items.openOldMyClerk;
                }

                if (getClientInfoElement) {
                    getClientInfoElement.checked = items.getClientInfo;
                }

                // Set the default shortcut values without waiting for keydown event
                if (items.shortcut1 === "Enter" && shortcut1Element) {
                    shortcut1Element.value = "Enter";
                    chrome.storage.sync.set({ shortcut1: "Enter" });
                }

                if (items.shortcut2 === "Escape" && shortcut2Element) {
                    shortcut2Element.value = "Escape";
                    chrome.storage.sync.set({ shortcut2: "Escape" });
                }
            }
        );
    }
});

// When get visitorID button is clicked
window.addEventListener("reactLinksLoaded", function (e) {
    var visitorGoButton = document.getElementById("visitorGoButton");
    if (visitorGoButton) {
        visitorGoButton.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                let currentTab = tabs[0];
                let tabProtocol = new URL(currentTab.url).protocol;
                if (tabProtocol === "http:" || tabProtocol === "https:") {
                    // Inject checkDOM script into current tab.
                    chrome.scripting.executeScript({
                        target: { tabId: currentTab.id },
                        function: checkDOM,
                    });
                }
            });
        });
    }
});

function checkDOM() {
    function getApiKey() {
        var clerkTrackingScript = Array.from(document.querySelectorAll("script")).filter(function (s) {
            return s.textContent.includes("cdn.clerk.io/clerk.js");
        });

        if (clerkTrackingScript.length > 0) {
            var firstScript = clerkTrackingScript[0];
            var keyPattern = /key:\s*'([^']+)'/;
            var match = keyPattern.exec(firstScript.textContent);

            if (match && match[1]) {
                var pubKey = match[1];
                console.log("Public key:", pubKey);
                return pubKey;
            } else {
                console.error("ClerkShortcutPro: Public API key could not be found");
                chrome.runtime.sendMessage({ type: "showError" });
            }
            return null;
        }
    }

    async function fetchVisitorID(apiKey) {
        const apiUrl = `https://api.clerk.io/v2/misc/visitor_id?visitor=auto&key=${apiKey}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const visitorID = data.visitor;
            if (visitorID) {
                console.log("Visitor ID:", visitorID);
                const newTabUrl = `https://api.clerk.io/v2/misc/visitor_id?visitor=auto&key=${apiKey}`;
                // Send a message to background.js to open a new tab with the  URL
                chrome.runtime.sendMessage({ type: "openNewTab", url: newTabUrl });
            }
            return data.visitor;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    const apiKey = getApiKey();
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
        fetchVisitorID(apiKey).then(() => {});
    }
}

// Error popup for React component
chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === "showError") {
        displayError();
    }
});

function displayError() {
    const errorAlert = document.querySelector(".alert-error");
    errorAlert.classList.remove("opacity-0");
    errorAlert.classList.add("opacity-1");
    setTimeout(() => {
        errorAlert.classList.remove("opacity-1");
        errorAlert.classList.add("opacity-0");
    }, 2000);
}
