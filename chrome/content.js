document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    var saveAndExitbutton = document.querySelector('[click="saveDesign(true)"] > button');
    var deleteButton = document.querySelector('[click="deleteDesign()"] > button');
    var confirmButton = document.querySelector('[click="$root.uiConfirmConfirm()"] > button');
    var leavePage = document.querySelector('[click="hideUnsavedModal(true)"] > button');
    var saveCopy = document.querySelector('[click="saveDuplicateDesign(designToDuplicate)"] > button');
    if (saveAndExitbutton) {
      saveAndExitbutton.click();
    } else if (deleteButton) {
      deleteButton.click();
    } else if (confirmButton) {
      confirmButton.click();
    } else if (leavePage) {
      leavePage.click();
    } else if (saveCopy) {
      saveCopy.click();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    var closeModal = document.querySelector('[ng-click="closeModal()"]');
    if (closeModal) {
      closeModal.click();
    } 
  }
});