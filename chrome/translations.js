let currentUrl = "";
function checkUrl() {

    if (
        window.location.href.includes("recommendations/content/") &&
        window.location.href !== currentUrl &&
        window.location.href.split("recommendations/content/")[1].length > 0
    ) {

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
                        button.textContent = buttonData[i].text;
                        button.id = buttonData[i].id;

                        // Set the styling
                        button.style.margin = '0px 2px';
                        button.style.textDecoration = 'none';
                        button.style.color = '#2e7ef9';
                        button.style.borderBottom = '1px solid #2e7ef9';
                        button.style.display = 'inline-block';
                        button.style.marginLeft = '0.4em';
                        button.style.padding = '0.2em 0.6em';
                        button.style.border = '1px solid #2e7ef9';
                        button.style.borderRadius = '5px';
                        button.style.fontSize = '0.9em';
                        button.style.fontWeight = 'bold';
                        button.style.transition = 'all 0.2s';
        
                        // Append the button to the headlineElement
                        headlineElement.appendChild(button);
                    }
                }
        
                insertButtons();
                
                var translationButtons = document.querySelectorAll(".translateButton");
                function applyTranslation(contentName, translationID) {
                    for (var i = 0; i < translations.length; i++) {
                        if (translations[i].origin === contentName) {
                            
                        // copy to clipboard
                        navigator.clipboard.writeText(translations[i][translationID]).then(function() {
                            // create a new div element 
                            var tooltip = document.createElement("div");
                            // and give it some content 
                            var tooltipText = document.createTextNode("Copied to clipboard!"); 
                            // add the text node to the newly created div
                            tooltip.appendChild(tooltipText);  

                            // Set some style
                            tooltip.style.position = 'absolute';
                            tooltip.style.borderLeft = '5px solid #16cc53';
                            tooltip.style.bottom = '20px';
                            tooltip.style.left = '0px';
                            tooltip.style.minWidth = '400px';
                            tooltip.style.maxWidth = '600px';
                            tooltip.style.padding = '10px 20px';
                            tooltip.style.textAlign = 'left';
                            tooltip.style.borderRadius = '0 5px 5px 0';
                            tooltip.style.backgroundColor = 'white';
                            tooltip.style.color = '#1f3038';
                            tooltip.style.boxShadow = '0 0 4px 1px rgba(0, 0, 0, 0.08)';
                            tooltip.style.transition = 'all 0.5s';

                            // add the newly created element and its content into the DOM 
                            document.body.appendChild(tooltip);

                            // hide the tooltip after 2 seconds
                            setTimeout(function() {
                                tooltip.style.display = 'none';
                            }, 2000);

                        }, function(err) {
                            console.error('Could not copy text: ', err);
                        });
                            break;
                        }
                    }
                }
                translationButtons.forEach(function (button) {
                    button.addEventListener("click", function () {
                        var translationID = this.id;
                        applyTranslation(contentName, translationID);
                        headlineInput.value = '';
                    });
                });
                break; // Exit the loop since we found a match
            }
        }
    }
}
setInterval(checkUrl, 1000); // Check every second