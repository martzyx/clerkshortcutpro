document.addEventListener("DOMContentLoaded", () => {
    if (document.body && window.location.href.startsWith("https://old-my.clerk.io/")) {
        // check if iframe is old my clerk
        const observer = new MutationObserver((mutations, observer) => {
            checkUrl();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
});

function checkUrl() {
    if (
        window.location.href.includes("recommendations/content/") &&
        window.location.href.split("recommendations/content/")[1].length > 0
    ) {
        // Function to check if the headline is loaded
        function checkHeadline() {
            const element = document.querySelector(".text-main-headline");
            if (element) {
                if (!document.querySelector(".translateButton")) {
                    makeTranslationsButtons();
                }
                observer.disconnect();
            }
        }

        const config = { attributes: false, childList: true, subtree: true };

        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    checkHeadline();
                }
            }
        };

        const observer = new MutationObserver(callback);
        const targetNode = document.body;
        observer.observe(targetNode, config);

        // Check if the element is already present without waiting for mutations
        checkHeadline();

        function makeTranslationsButtons() {
            const contentName = document.querySelector(".text-main-headline").innerHTML;
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
                    de: "Kunden, die diesen Artikel gekauft haben, haben auch diese Artikel gekauft",
                    it: "Altri clienti hanno comprato",
                    es: "Comprados juntos habitualmente",
                },
                {
                    origin: "Category Page / Popular",
                    en: "Most Popular In This Category",
                    dk: "Populære i denne kategori",
                    se: "Mest populära produkter i denna kategori",
                    no: "Mest Populære i Denne Kategorien",
                    nl: "Populaire producten in deze categorie",
                    fr: "Les produits les plus populaires de cette catégorie",
                    de: "Bestseller in dieser Kategorie",
                    it: "I più popolari in questa categoria",
                    es: "Los más vendidos en esta categoria",
                },
                {
                    origin: "Home Page / Popular",
                    en: "Our Most Popular Products",
                    dk: "Vores mest populære produkter",
                    se: "Våra mest populära produkter",
                    no: "Bestselgere",
                    nl: "Onze meest populaire producten",
                    fr: "Les produits les plus populaires",
                    de: "Bestseller",
                    it: "I nostri prodotti più popolari",
                    es: "Los más vendidos",
                },
                {
                    origin: "Home Page / Trending",
                    en: "Hot Among Our Other Customers Right Now",
                    dk: "Populære produkter lige nu",
                    se: "Populära produkter för andra kunder just nu",
                    no: "Populært blant våre andre kunder akkurat nå",
                    nl: "Producten van nu",
                    fr: "Les articles tendance",
                    de: "Derzeitige Top Seller",
                    it: "I più venduti recentemente",
                    es: "Productos del momento",
                },
                {
                    origin: "Home Page / Visitor Complementary",
                    en: "Our Top Picks For You",
                    dk: "Vores anbefalinger til dig",
                    se: "Våra produktval för dig",
                    no: "Våre anbefalinger til deg",
                    nl: "Onze favorieten voor jou",
                    fr: "Nos meilleurs choix pour vous",
                    de: "Wir empfehlen",
                    it: "Prodotti scelti per te",
                    es: "Recomendamos según tus tendencias de compra",
                },
                {
                    origin: "Product Page / Alternatives",
                    en: "Not Right? Try One Of These Instead",
                    dk: "Relaterede produkter",
                    se: "Inte vad du letade efter? Testa någon av dessa",
                    no: "Alternative Produkter",
                    nl: "Niet meteen wat je zocht?",
                    fr: "Regardez ces produits alternatifs",
                    de: "Alternativen",
                    it: "Prodotti alternativi",
                    es: "Productos relacionados",
                },
                {
                    origin: "Product Page / Others Also Bought",
                    en: "Other Customers Also Bought These",
                    dk: "Andre købte også",
                    se: "Andra köpte också dessa produkter",
                    no: "Andre kunder kjøpte disse",
                    nl: "Anderen kochten ook een van deze",
                    fr: "D’autres clients ont aussi acheté",
                    de: "Kunden, die diesen Artikel gekauft haben, haben auch diese Artikel gekauft:",
                    it: "Altri clienti hanno comprato",
                    es: "Comprados juntos habitualmemnte",
                },
            ];
            for (let i = 0; i < translations.length; i++) {
                if (contentName === translations[i].origin) {
                    // currentUrl = window.location.href;
                    var headlineInput = document.querySelector("#template-variable-headline");
                    var headlineElement = headlineInput.parentNode;

                    function insertButtons() {
                        // Button data: class and button text
                        var buttonData = [
                            { class: "translateEN", text: "EN", id: "en" },
                            { class: "translateDK", text: "DK", id: "dk" },
                            { class: "translateSE", text: "SE", id: "se" },
                            { class: "translateNO", text: "NO", id: "no" },
                            { class: "translateNL", text: "NL", id: "nl" },
                            { class: "translateFR", text: "FR", id: "fr" },
                            { class: "translateDE", text: "DE", id: "de" },
                            { class: "translateIT", text: "IT", id: "it" },
                            { class: "translateES", text: "ES", id: "es" },
                        ];

                        var buttonWrapper = document.createElement("div");
                        buttonWrapper.className = "daterange";
                        headlineElement.appendChild(buttonWrapper);
                        buttonWrapper.style.display = "flex";
                        buttonWrapper.style.marginBottom = "1em";

                        // Loop through the button data
                        for (var i = 0; i < buttonData.length; i++) {
                            // button making
                            var button = document.createElement("a");
                            button.className = buttonData[i].class + " translateButton";
                            button.textContent = buttonData[i].text;
                            button.id = buttonData[i].id;

                            // Append the button to the headlineElement
                            buttonWrapper.appendChild(button);
                        }
                    }

                    insertButtons();

                    var translationButtons = document.querySelectorAll(".translateButton");
                    function applyTranslation(contentName, translationID) {
                        for (var i = 0; i < translations.length; i++) {
                            if (translations[i].origin === contentName) {
                                headlineInput.value = translations[i][translationID];
                                headlineInput.dispatchEvent(new Event("input", { bubbles: true }));
                                break;
                                // // copy to clipboard
                                // navigator.clipboard.writeText(translations[i][translationID]).then(
                                //     function () {
                                //         headlineInput.focus();
                                //         // create a new div element
                                //         var tooltip = document.createElement("div");
                                //         // and give it some content
                                //         var tooltipText =
                                //             document.createTextNode("Copied to clipboard!");
                                //         // add the text node to the newly created div
                                //         tooltip.appendChild(tooltipText);
                                //         tooltip.className = "ok visible";
                                //         tooltip.id = "message";

                                //         // add the newly created element and its content into the DOM
                                //         document.body.appendChild(tooltip);

                                //         // hide the tooltip after 2 seconds
                                //         setTimeout(function () {
                                //             tooltip.style.display = "none";
                                //         }, 2000);
                                //     },
                                //     function (err) {
                                //         console.error("Could not copy text: ", err);
                                //     }
                                // );
                                // break;
                            }
                        }
                    }
                    translationButtons.forEach(function (button) {
                        button.addEventListener("click", function () {
                            var translationID = this.id;
                            applyTranslation(contentName, translationID);
                        });
                    });
                    break; // Exit the loop since we found a match
                }
            }
        }
    }
}
