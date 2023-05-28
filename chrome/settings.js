console.log("Settings.js is loaded");

// On page load, restore previously saved settings
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM is fully loaded");
  restore_options();
  assignShortcutListener();
// When form is submitted, save settings
document.getElementById('shortcut-form').addEventListener('submit', function(e) {
  save_options(e);
});

});

// Assigns shortcut listener
function assignShortcutListener() {
  var shortcut1 = document.getElementById('shortcut1');
  shortcut1.addEventListener('keydown', function(event) {
    event.preventDefault();  // Prevent the default action
    console.log("Key pressed: " + event.key);  // Log the pressed key
    document.getElementById('shortcut1').value = event.key;  // Assign the pressed key
    return false;  // Prevent the form from being submitted
  });
}

// Enable/Disable Shortcut Function
document.getElementById('enable-shortcut1').addEventListener('change', function() {
  var enableShortcut = document.getElementById('enable-shortcut1').checked;
  document.getElementById('shortcut1').disabled = !enableShortcut;
});

// Saves options to chrome.storage.sync
function save_options(e) {
  e.preventDefault();
  console.log("Saving options...");
  console.log("Shortcut value:", document.getElementById("shortcut1").value);
  console.log("Enable Shortcut:", document.getElementById("enable-shortcut1").checked);
  
  chrome.storage.sync.set(
    {
      shortcut1: document.getElementById("shortcut1").value,
      enableShortcut1: document.getElementById("enable-shortcut1").checked,
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
      // Add other shortcuts and their enable/disable values here
    },
    function (items) {
      document.getElementById("shortcut1").value = items.shortcut1;
      document.getElementById("enable-shortcut1").checked = items.enableShortcut1;
      // Set other shortcut values and enable/disable states here
      document.getElementById("shortcut1").disabled = !items.enableShortcut1;

      console.log("Shortcut1 enabled:", items.enableShortcut1);
      console.log("Shortcut1 value:", items.shortcut1);
      
      // Set the default shortcut value without waiting for keydown event
      if (items.shortcut1 === "Enter") {
        document.getElementById('shortcut1').value = "Enter";
        chrome.storage.sync.set({ shortcut1: "Enter" });
      }
    }
  );
}

chrome.storage.sync.get(
  {
    shortcut1: "default shortcut", // default value
    enableShortcut1: false, // default value
    // Add other shortcuts and their enable/disable values here
  },
  function (items) {
    // Apply shortcuts here
    // For example, if your shortcut is a string representing a key, you could do:
    window.addEventListener("keydown", function (e) {
      if (items.enableShortcut1 && e.key === items.shortcut1) {
        // Perform action for shortcut 1
      }
      // Handle other shortcuts here
    });
  }
);
