var clerkInputs = document.querySelectorAll('[id^="row_clerk_"]');

clerkInputs.forEach(function (clerkElement) {
    var nameElements = clerkElement.querySelectorAll('[name*="groups"]');

    nameElements.forEach(function (nameElement) {
        if (nameElement.hasAttribute("disabled")) {
            nameElement.removeAttribute("disabled");
        }
        if (nameElement.hasAttribute("checked")) {
            nameElement.removeAttribute("checked");
        }
    });
});
