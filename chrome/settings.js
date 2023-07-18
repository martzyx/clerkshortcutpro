// console.log("Settings.js is loaded");

// On page load, restore previously saved settings
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("Delayed for 100ms.");
        restore_options();
        assignProceedShortcutListener();
        assignCloseModalShortcutListener();
        toggleProceedShortcutListener();
        toggleCloseModalShortcutListener();
        toggleDeleteDesignsListener();

        // When form is submitted, save settings
        document.getElementById("shortcut-form").addEventListener("submit", function (e) {
            console.log("form submitteddd");
            save_options(e);
        });
    }, "100");
});

// Assigns shortcut listener for shortcut1
function assignProceedShortcutListener() {
    var shortcut1 = document.getElementById("shortcut1");
    shortcut1.addEventListener("keydown", function (event) {
        event.preventDefault(); // Prevent the default action
        document.getElementById("shortcut1").value = event.key; // Assign the pressed key
        return false; // Prevent the form from being submitted
    });
}

// Assigns shortcut listener for shortcut2
function assignCloseModalShortcutListener() {
    var shortcut2 = document.getElementById("shortcut2");
    shortcut2.addEventListener("keydown", function (event) {
        event.preventDefault(); // Prevent the default action
        document.getElementById("shortcut2").value = event.key; // Assign the pressed key
        return false; // Prevent the form from being submitted
    });
}

function toggleProceedShortcutListener() {
    // Enable/Disable Shortcut Function for shortcut1
    document.getElementById("enable-shortcut1").addEventListener("change", function () {
        var enableShortcut = document.getElementById("enable-shortcut1").checked;
        document.getElementById("shortcut1").disabled = !enableShortcut;
    });
}
function toggleCloseModalShortcutListener() {
    // Enable/Disable Shortcut Function for shortcut2
    document.getElementById("enable-shortcut2").addEventListener("change", function () {
        var enableShortcut = document.getElementById("enable-shortcut2").checked;
        document.getElementById("shortcut2").disabled = !enableShortcut;
    });
}

function toggleDeleteDesignsListener() {
    // Enable/Disable Delete Designs Function
    document.getElementById("enable-delete-designs").addEventListener("change", function () {
        var enableDeleteDesigns = document.getElementById("enable-delete-designs").checked;
        chrome.storage.sync.set({ enableDeleteDesigns: enableDeleteDesigns });
    });
}

// Saves options to chrome.storage.sync
function save_options(e) {
    e.preventDefault();
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
            alert("Settings saved");
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
        function (items) {
            document.getElementById("shortcut1").value = items.shortcut1;
            document.getElementById("enable-shortcut1").checked = items.enableShortcut1;
            document.getElementById("shortcut1").disabled = !items.enableShortcut1;

            document.getElementById("shortcut2").value = items.shortcut2;
            document.getElementById("enable-shortcut2").checked = items.enableShortcut2;
            document.getElementById("shortcut2").disabled = !items.enableShortcut2;

            document.getElementById("enable-delete-designs").checked = items.enableDeleteDesigns;

            // Set the default shortcut values without waiting for keydown event
            if (items.shortcut1 === "Enter") {
                document.getElementById("shortcut1").value = "Enter";
                chrome.storage.sync.set({ shortcut1: "Enter" });
            }

            if (items.shortcut2 === "Escape") {
                document.getElementById("shortcut2").value = "Escape";
                chrome.storage.sync.set({ shortcut2: "Escape" });
            }
        }
    );
}

chrome.storage.sync.get(
    {
        shortcut1: "default shortcut", // default value
        enableShortcut1: false, // default value
        shortcut2: "default shortcut", // default value
        enableShortcut2: false, // default value
        enableDeleteDesigns: true, // default value
        // Add other shortcuts and their enable/disable values here
    },
    function (items) {
        // Apply shortcuts here
        // For example, if your shortcut is a string representing a key, you could do:
        window.addEventListener("keydown", function (e) {
            if (items.enableShortcut1 && e.key === items.shortcut1) {
                // Perform action for shortcut1
            }
            if (items.enableShortcut2 && e.key === items.shortcut2) {
                // Perform action for shortcut2
            }
            // Handle other shortcuts here
        });

        if (items.enableDeleteDesigns) {
        }
    }
);
