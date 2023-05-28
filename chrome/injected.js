window.addEventListener("message", function (event) {
  if (event.source !== window) return;
  if (event.data.type && event.data.type === "FROM_CONTENT_SCRIPT") {
    setKeyboardShortcut(event.data.shortcut1, event.data.enableShortcut1);
    setKeyboardShortcut2(event.data.shortcut2, event.data.enableShortcut2);
  }
});

function setKeyboardShortcut(shortcut1, enableShortcut1) {
  if (enableShortcut1) {
    document.addEventListener("keydown", function (event) {
      if (event.key === shortcut1) {
        console.log("Proceed shortcut pressed: " + shortcut1);
        var saveAndExitbutton = document.querySelector('[click="saveDesign(true)"] > button');
        var deleteButton = document.querySelector('[click="deleteDesign()"] > button');
        var confirmButton = document.querySelector('[click="$root.uiConfirmConfirm()"] > button');
        var leavePage = document.querySelector('[click="hideUnsavedModal(true)"] > button');
        var saveCopy = document.querySelector(
          '[click="saveDuplicateDesign(designToDuplicate)"] > button'
        );
        if (saveAndExitbutton) {
          console.log("Clicking saveAndExitbutton");
          saveAndExitbutton.click();
        } else if (deleteButton) {
          console.log("Clicking deleteButton");
          deleteButton.click();
        } else if (confirmButton) {
          console.log("Clicking confirmButton");
          confirmButton.click();
        } else if (leavePage) {
          console.log("Clicking leavePage");
          leavePage.click();
        } else if (saveCopy) {
          console.log("Clicking saveCopy");
          saveCopy.click();
        }
      }
    });
  }
}

function setKeyboardShortcut2(shortcut2, enableShortcut2) {
  if (enableShortcut2) {
    document.addEventListener("keydown", function (event) {
      if (event.key === shortcut2) {
        console.log("closeModal shortcut pressed: " + shortcut2);
        var closeModal = document.querySelector('[ng-click="closeModal()"]');
        if (closeModal) {
          console.log("Clicking closeModal");
          closeModal.click();
        }
      }
    });
  }
}