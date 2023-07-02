let currentUrl = "";
function checkUrl() {
    if (
        window.location.href.includes("recommendations/content/") &&
        window.location.href !== currentUrl &&
        window.location.href.split("recommendations/content/")[1].length > 0
    ) {
        currentUrl = window.location.href;
        var headlineInput = document.querySelector("#template-variable-headline");
        var headlineElement = headlineInput.parentNode;

        function insertButtons() {
            // Button data: class and innerHTML
            var buttonStyling = "margin: 0 2px;border: 1px solid;padding: 0 2px;";
            var buttonData = [
                { class: "translateEN", text: "EN", style: buttonStyling, id: "en" },
                { class: "translateDK", text: "DK", style: buttonStyling, id: "dk" },
                { class: "translateSE", text: "SE", style: buttonStyling, id: "se" },
                { class: "translateNO", text: "NO", style: buttonStyling, id: "no" },
                { class: "translateNL", text: "NL", style: buttonStyling, id: "nl" },
                { class: "translateFR", text: "FR", style: buttonStyling, id: "fr" },
                { class: "translateDE", text: "DE", style: buttonStyling, id: "de" },
                { class: "translateIT", text: "IT", style: buttonStyling, id: "it" },
                { class: "translateES", text: "ES", style: buttonStyling, id: "es" },
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
}
setInterval(checkUrl, 1000); // Check every second
