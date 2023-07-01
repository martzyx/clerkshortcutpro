if (window.location.href.includes("recommendations/content")) {
    var headlineInput = document.querySelector("#template-variable-headline");
    var headlineElement = headlineInput.parentNode;
    if (headlineElement) {
        function insertButtons() {
            // Button data: class and innerHTML
            var buttonStyling = "margin: 0 2px;border: 1px solid;padding: 0 2px;";
            var buttonData = [
                { class: "translateEN", text: "EN", style: buttonStyling },
                { class: "translateDK", text: "DK", style: buttonStyling },
                { class: "translateSE", text: "SE", style: buttonStyling },
                { class: "translateNO", text: "NO", style: buttonStyling },
                { class: "translateNL", text: "NL", style: buttonStyling },
                { class: "translateFR", text: "FR", style: buttonStyling },
                { class: "translateDE", text: "DE", style: buttonStyling },
                { class: "translateIT", text: "IT", style: buttonStyling },
                { class: "translateES", text: "ES", style: buttonStyling },
            ];

            // Loop through the button data
            for (var i = 0; i < buttonData.length; i++) {
                // Create a new button element
                var button = document.createElement("button");

                // Set the class and innerHTML for each button
                button.className = buttonData[i].class;
                button.innerHTML = buttonData[i].text;
                button.style = buttonData[i].style;

                // Append the button to the headlineElement
                headlineElement.appendChild(button);
            }
        }
        //translation dictionary
        const translations = [
            {
                origin: "See These Checkout Offers",
                dk: "Andre har også købt",
                se: "Kolla in dessa erbjudanden!",
            },
            {
                origin: "Most Popular In This Category",
                dk: "Populære i denne kategori",
                se: "Mest populära produkter i denna kategori",
            },
        ];

        // shortcut to render translate buttons
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                insertButtons();
                var dkButton = document.querySelector(".translateDK");
                var inputValue = headlineInput.value;
                dkButton.addEventListener("click", () => {
                    for (var i = 0; i < translations.length; i++) {
                        if (translations[i].origin === inputValue) {
                            headlineInput.value = translations[i].dk;
                            break;
                        }
                    }
                });
            }
        });


    } else {
        // Parent label not found
        console.log("headline not found");
    }
}
