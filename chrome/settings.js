console.log("Settings.js is loaded");

// On page load, restore previously saved settings
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM is fully loaded");
  restore_options();
  assignShortcutListener();
  // When form is submitted, save settings
  document.getElementById('shortcut-form').addEventListener('submit', save_options);
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


// Saves options to chrome.storage.sync
function save_options(e) {
  e.preventDefault();
  chrome.storage.sync.set(
    {
      shortcut1: document.getElementById("shortcut1").value,
      // Add other shortcuts here
    },
    function () {
      // Update status to let user know options were saved.
      alert("Settings saved");
    }
  );
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(
    {
      shortcut1: "default shortcut", // default value
      // Add other shortcuts here
    },
    function (items) {
      document.getElementById("shortcut1").value = items.shortcut1;
      // Set other shortcut values here
    }
  );
}

chrome.storage.sync.get(
  {
    shortcut1: "default shortcut", // default value
    // Add other shortcuts here
  },
  function (items) {
    // Apply shortcuts here
    // For example, if your shortcut is a string representing a key, you could do:
    window.addEventListener("keydown", function (e) {
      if (e.key === items.shortcut1) {
        // Perform action for shortcut 1
      }
      // Handle other shortcuts here
    });
  }
);
