enum ClerkTranslationKinds {
    CART,
    CATEGORY_PAGE,
    HOME_PAGE,
    PRODUCT_PAGE,
}

enum ClerkTranslationOrigins {
    CART_OTHERS_ALSO_BOUGHT = "Cart / Others Also Bought",
    CATEGORY_PAGE_POPULAR = "Category Page / Popular",
    HOME_PAGE_POPULAR = "Home Page / Popular",
    HOME_PAGE_TRENDING = "Home Page / Trending",
    HOME_PAGE_VISITOR_COMPLEMENTARY = "Home Page / Visitor Complementary",
    PRODUCT_PAGE_ALTERNATIVES = "Product Page / Alternatives",
    PRODUCT_PAGE_OTHERS_ALSO_BOUGHT = "Product Page / Others Also Bought",
}

type ClerkTranslations = {
    kind: ClerkTranslationKinds;
    origin: ClerkTranslationOrigins;
    en: string;
    dk: string;
    se: string;
    no: string;
    nl: string;
    fr: string;
    de: string;
    it: string;
    es: string;
}

export const translations: ClerkTranslations[] = [
    {
        kind: ClerkTranslationKinds.CART,
        origin: ClerkTranslationOrigins.CART_OTHERS_ALSO_BOUGHT,
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
        kind: ClerkTranslationKinds.CATEGORY_PAGE,
        origin: ClerkTranslationOrigins.CATEGORY_PAGE_POPULAR,
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
        kind: ClerkTranslationKinds.HOME_PAGE,
        origin: ClerkTranslationOrigins.HOME_PAGE_POPULAR,
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
        kind: ClerkTranslationKinds.HOME_PAGE,
        origin: ClerkTranslationOrigins.HOME_PAGE_TRENDING,
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
        kind: ClerkTranslationKinds.HOME_PAGE,
        origin: ClerkTranslationOrigins.HOME_PAGE_VISITOR_COMPLEMENTARY,
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
        kind: ClerkTranslationKinds.PRODUCT_PAGE,
        origin: ClerkTranslationOrigins.PRODUCT_PAGE_ALTERNATIVES,
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
        kind: ClerkTranslationKinds.PRODUCT_PAGE,
        origin: ClerkTranslationOrigins.PRODUCT_PAGE_OTHERS_ALSO_BOUGHT,
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