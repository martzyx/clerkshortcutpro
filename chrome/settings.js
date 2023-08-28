window.addEventListener("reactComponentLoaded", function (e) {
    // Restore previously saved settings
    restore_options();
    assignProceedShortcutListener();
    assignCloseModalShortcutListener();
    toggleProceedShortcutListener();
    toggleCloseModalShortcutListener();
    toggleDeleteDesignsListener();

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
                event.preventDefault(); // Prevent the default action
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

    function toggleProceedShortcutListener() {
        // Enable/Disable Shortcut Function for shortcut1
        var enableshortcut1 = document.getElementById("enable-shortcut1");
        if (enableshortcut1) {
            enableshortcut1.addEventListener("change", function () {
                var enableShortcut = enableshortcut1.checked;
                document.getElementById("shortcut1").disabled = !enableShortcut;
            });
        }
    }
    function toggleCloseModalShortcutListener() {
        // Enable/Disable Shortcut Function for shortcut2
        var enableShortcut2 = document.getElementById("enable-shortcut2");
        if (enableShortcut2) {
            enableShortcut2.addEventListener("change", function () {
                var enableShortcut = enableShortcut2.checked;
                document.getElementById("shortcut2").disabled = !enableShortcut;
            });
        }
    }

    function toggleDeleteDesignsListener() {
        // Enable/Disable Delete Designs Function
        var enableDeleteDesignsEl = document.getElementById("enable-delete-designs");
        if (enableDeleteDesignsEl) {
            enableDeleteDesignsEl.addEventListener("change", function () {
                var enableDeleteDesigns = enableDeleteDesignsEl.checked;
                chrome.storage.sync.set({ enableDeleteDesigns: enableDeleteDesigns });
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

                // Add other shortcuts and their enable/disable values here
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
                shortcut1: "Enter", // default value
                enableShortcut1: true, // default value
                shortcut2: "Escape", // default value
                enableShortcut2: true, // default value
                enableDeleteDesigns: true, // default value
                // Add other shortcuts and their enable/disable values here
            },

            function updateItems(items) {
                const shortcut1Element = document.getElementById("shortcut1");
                const enableShortcut1Element = document.getElementById("enable-shortcut1");
                const shortcut2Element = document.getElementById("shortcut2");
                const enableShortcut2Element = document.getElementById("enable-shortcut2");
                const enableDeleteDesignsElement = document.getElementById("enable-delete-designs");

                if (shortcut1Element) {
                    shortcut1Element.value = items.shortcut1;
                    shortcut1Element.disabled = !items.enableShortcut1;
                }

                if (enableShortcut1Element) {
                    enableShortcut1Element.checked = items.enableShortcut1;
                }

                if (shortcut2Element) {
                    shortcut2Element.value = items.shortcut2;
                    shortcut2Element.disabled = !items.enableShortcut2;
                }

                if (enableShortcut2Element) {
                    enableShortcut2Element.checked = items.enableShortcut2;
                }

                if (enableDeleteDesignsElement) {
                    enableDeleteDesignsElement.checked = items.enableDeleteDesigns;
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

    chrome.storage.sync.get({
        shortcut1: "default shortcut", // default value
        enableShortcut1: false, // default value
        shortcut2: "default shortcut", // default value
        enableShortcut2: false, // default value
        enableDeleteDesigns: false, // default value
        // Add other shortcuts and their enable/disable values here
    });
});

// Get the current tab.
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0]; // There should only be one in this list

    // Inject the code into the current tab.
    chrome.scripting.executeScript(
        {
            target: { tabId: currentTab.id },
            function: checkDOM,
        },
        (results) => {
            // results[0] will contain the result of the injected function (if any)
            console.log(results[0]);
        }
    );
});

function checkDOM() {
    function getApiKey() {
        // if(typeof Clerk == 'function') {
        //     Clerk._config.key
        // }
        // Find the script tag with the specific src attribute pattern
        const scripts = Array.from(document.getElementsByTagName("script"));
        for (let script of scripts) {
            if (script.src && script.src.includes("api.clerk.io")) {
                // Extract API key using a regular expression
                const match = script.src.match(/key%22%3A%22([^%]+)%22/);
                if (match && match[1]) {
                    return decodeURIComponent(match[1]);
                }
            }
        }
        return null;
    }

    // Example usage:
    const apiKey = getApiKey();
    console.log(apiKey); // This will log the API key to the console
}
