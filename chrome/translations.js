if (window.location.href.includes("recommendations/content")) {
    var headlineInput = document.querySelector("#template-variable-headline");
    var headlineElement = headlineInput.parentNode;
    if (headlineElement) {
        function insertButtons() {
            // Button data: class and innerHTML
            var buttonStyling = "margin: 0 2px;border: 1px solid;padding: 0 2px;";
            var buttonData = [
                { class: "translateEN", text: "EN", style: buttonStyling, id: "en" },
                { class: "translateDK", text: "DK", style: buttonStyling, id: "dk" },
                { class: "translateSE", text: "SE", style: buttonStyling, id: "se"  },
                { class: "translateNO", text: "NO", style: buttonStyling, id: "no"  },
                { class: "translateNL", text: "NL", style: buttonStyling, id: "nl"  },
                { class: "translateFR", text: "FR", style: buttonStyling, id: "fr"  },
                { class: "translateDE", text: "DE", style: buttonStyling, id: "de"  },
                { class: "translateIT", text: "IT", style: buttonStyling, id: "it"  },
                { class: "translateES", text: "ES", style: buttonStyling, id: "es"  },
            ];

            // Loop through the button data
            for (var i = 0; i < buttonData.length; i++) {
                // Create a new button element
                var button = document.createElement("button");

                // Set the class and innerHTML for each button
                button.className = buttonData[i].class + " translateButton";
                button.innerHTML = buttonData[i].text;
                button.style = buttonData[i].style;
                button.id = buttonData[i].id;

                // Append the button to the headlineElement
                headlineElement.appendChild(button);
            }
        }
        //translation dictionary
        const translations = [
            {
                origin: "Cart / Others Also Bought",
                en: "See These Checkout Offers",
                dk: "Andre har også købt",
                se: "Kolla in dessa erbjudanden!",
                no: "Se Disse Kassetilbudene",
                nl: "Misschien ook iets voor jou?",
                fr: "D'autres clients ont aussi acheté",
                de: "Kunden, die diesen Artikel gekauft haben, haben auch diese Artikel gekauft:",
                it: "Altri clienti hanno comprato...",
                es: "Comprados juntos habitualmente",
            },
            {
                origin: "Category Page / Popular",
                en: "Most Popular In This Category",
                dk: "Populære i denne kategori",
                se: "Mest populära produkter i denna kategori",
            },
        ];

        // shortcut to render translate buttons
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                insertButtons();
                var contentName = document.querySelector(".text-main-headline").innerHTML;
                var translationButtons = document.querySelectorAll(".translateButton");
                function applyTranslation(contentName, translationID) {
                    for (var i = 0; i < translations.length; i++) {
                        if (translations[i].origin === contentName) {
                            headlineInput.value = translations[i][translationID];
                            break;
                        }
                    }
                }
                translationButtons.forEach(function (button) {
                    button.addEventListener("click", function () {
                        var translationID = this.id;
                        applyTranslation(contentName, translationID);
                    });
                });
            }
        });
    } else {
        // Parent label not found
        console.log("headline not found");
    }
}
