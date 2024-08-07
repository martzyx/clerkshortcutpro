chrome.storage.sync.get(
    {
        enableTranslationButtons: true,
    },
    function (items) {
        if (items.enableTranslationButtons) {
            initialCheck();
        }
    }
);

function initialCheck() {
    document.addEventListener("DOMContentLoaded", () => {
        // check if iframe is old myclerk
        if (document.body && window.location.href.startsWith("https://old-my.clerk.io/")) {
            const observer = new MutationObserver((mutations, observer) => {
                checkForRec();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }
    });
}

function checkForRec() {
    if (window.location.href.includes("recommendations/content/") && window.location.href.split("recommendations/content/")[1].length > 0) {
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
                    en: "See these checkout offers",
                    dk: "Andre har også købt",
                    se: "Kolla in dessa erbjudanden!",
                    no: "Andre kjøpte også",
                    nl: "Misschien ook iets voor jou?",
                    fr: "D'autres clients ont aussi acheté",
                    de: "Kunden, die diesen Artikel gekauft haben, haben auch diese Artikel gekauft",
                    it: "Altri clienti hanno comprato",
                    es: "Comprados juntos habitualmente",
                },
                {
                    origin: "Category Page / Popular",
                    en: "Most popular in this category",
                    dk: "Populære i denne kategori",
                    se: "Mest populära produkter i denna kategori",
                    no: "Mest populære i denne kategorien",
                    nl: "Populaire producten in deze categorie",
                    fr: "Les produits les plus populaires de cette catégorie",
                    de: "Bestseller in dieser Kategorie",
                    it: "I più popolari in questa categoria",
                    es: "Los más vendidos en esta categoria",
                },
                {
                    origin: "Home Page / Popular",
                    en: "Bestsellers",
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
                    en: "Trending products",
                    dk: "Populære produkter lige nu",
                    se: "Populära produkter för andra kunder just nu",
                    no: "Populære produkter akkurat nå",
                    nl: "Producten van nu",
                    fr: "Les articles tendance",
                    de: "Derzeitige Top Seller",
                    it: "I più venduti recentemente",
                    es: "Productos del momento",
                },
                {
                    origin: "Home Page / Visitor Complementary",
                    en: "Our top picks for you",
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
                    en: "Alternatives",
                    dk: "Relaterede produkter",
                    se: "Inte vad du letade efter? Testa någon av dessa",
                    no: "Alternativer",
                    nl: "Niet meteen wat je zocht?",
                    fr: "Regardez ces produits alternatifs",
                    de: "Alternativen",
                    it: "Prodotti alternativi",
                    es: "Productos relacionados",
                },
                {
                    origin: "Product Page / Others Also Bought",
                    en: "Others Also Bought",
                    dk: "Andre købte også",
                    se: "Andra köpte också dessa produkter",
                    no: "Andre kjøpte også",
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
