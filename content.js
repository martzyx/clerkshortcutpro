document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    var saveAndExitbutton = document.querySelector('[click="saveDesign(true)"] > button');
    var deleteButton = document.querySelector('[click="deleteDesign()"] > button')
    if (saveAndExitbutton) {
      saveAndExitbutton.click();
    } else if (deleteButton) {
      deleteButton.click();
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