document.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    var saveAndExitbutton = document.querySelector('[click="saveDesign(true)"] > button');
    var deleteButton = document.querySelector('[click="deleteDesign()"] > button');
    var confirmButton = document.querySelector('[click="$root.uiConfirmConfirm()"] > button');
    var leavePage = document.querySelector('[click="hideUnsavedModal(true)"] > button');
    var saveCopy = document.querySelector('[click="saveDuplicateDesign(designToDuplicate)"] > button');
    var nextButton = document.querySelector('[ng-click="selectIndex($index, \'next\')"] > button');
    var createDesign = document.querySelector('[ng-click="submitEvent(config)"] > button');
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
    } else if (nextButton) {
      console.log("Clicking nextButton");
      nextButton.click();
    } else if (createDesign) {
      console.log("Clicking create design button");
      createDesign.click();
    }
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === 'Escape') {
    var closeModal = document.querySelector('[ng-click="closeModal()"]');
    var exitDesignCreation = document.querySelector('[ng-click="design.exit()"] > button');
    if (closeModal) {
      console.log("Clicking closeModal");
      closeModal.click();
    } else if (exitDesignCreation) {
      console.log("Clicking exit new design flow");
      exitDesignCreation.click();
    }
  }
});