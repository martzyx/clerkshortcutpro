import DTO, { MyClerkContent, MyClerkInfo } from "../../DTO";

enum ClerkContentKinds {
    CART = "Cart",
    CATEGORY_PAGE = "Category Page",
    HOME_PAGE = "Home Page",
    PRODUCT_PAGE = "Product Page",
    DEFAULT = "Recommendations"
}

enum ClerkContentType {
    POPULAR = "Popular",
    HOT = "Trending",
    NEW = "New",
    OTHERS_ALSO_BOUGHT = "Others Also Bought",
    VISITOR_COMPLEMENTARY = "Visitor Complementary",
    COMPLEMENTARY = "Complementary",
    ALTERNATIVES = "Alternatives",
    SUBSTITUTING = "Substituting",
    MOST_SOLD_WITH = "Most Sold With"
}

type ClerkTranslations = {
    kind: ClerkContentKinds;
    type: ClerkContentType;
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
        kind: ClerkContentKinds.CART ,
        type: ClerkContentType.OTHERS_ALSO_BOUGHT,
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
        kind: ClerkContentKinds.CATEGORY_PAGE,
        type: ClerkContentType.POPULAR,
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
        kind: ClerkContentKinds.HOME_PAGE,
        type: ClerkContentType.POPULAR,
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
        kind: ClerkContentKinds.HOME_PAGE,
        type: ClerkContentType.HOT,
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
        kind: ClerkContentKinds.HOME_PAGE,
        type: ClerkContentType.VISITOR_COMPLEMENTARY,
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
        kind: ClerkContentKinds.PRODUCT_PAGE,
        type: ClerkContentType.ALTERNATIVES,
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
        kind: ClerkContentKinds.PRODUCT_PAGE,
        type: ClerkContentType.OTHERS_ALSO_BOUGHT,
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
// 

let MY_CLERK_CONTENT: MyClerkContent | undefined = undefined;
let MY_CLERK_INFO: MyClerkInfo | undefined = undefined;

function waitForMessage(): Promise<void> {
  return new Promise((resolve) => {
    window.addEventListener('message', function handler(event) {
      if (event.data.type === DTO.MyClerkContent) {
        MY_CLERK_CONTENT = event.data;
      }
      if (event.data.type === DTO.MyClerkInfo) {
        MY_CLERK_INFO = event.data;
      }
      if (MY_CLERK_CONTENT != undefined && MY_CLERK_INFO != undefined) {
       // window.removeEventListener('message', handler);
        resolve();
      }
    });
  });
}

function handleMutations(mutations: MutationRecord[]) {   
  
  for (const mutation of mutations) {
    if (mutation.nextSibling?.baseURI?.includes('/content')) {
      document.querySelectorAll("p").forEach(async p => {
        if (p.innerHTML == "headline") {
          const input = p.closest("div")?.querySelector("input");
          if (!input) return;
    
            console.log(getTranslation());
          if (input.value.length == 0) {
            // todo
          }
          return;
        };
      });
      return;
    }
 
  }
}

function getTranslation() {
    const contentType = getContentType(MY_CLERK_CONTENT!);
    const contentKind = getContentKind(MY_CLERK_CONTENT!);

    translations.map((t) => {
        if(contentKind == t.kind || t.kind == ClerkContentKinds.DEFAULT && contentType == t.type) return t
    })
    return null;
}

function getContentType(contentData: MyClerkContent): ClerkContentType {
   for (const value of Object.values(ClerkContentType)) {
    const transformedValue = value.toLowerCase().replace(/ /g, "");
    if(contentData.content.content.api.toLowerCase().replace(/ /g, "").match(transformedValue)){
        return value;
    }
   }
   throw new Error("Content type not found");
}

function getContentKind(contentData: MyClerkContent): ClerkContentKinds {
    for(const value of Object.values(ClerkContentKinds)){
        const transformedValue = value.toLowerCase().replace(/ /g, "");
        if(contentData.content.content.api.toLowerCase().replace(/ /g, "").match(transformedValue)){
            return value;
        } 
    }
    throw new Error("Content Kind not found");
}



async function main() {
  if (document.URL.includes('https://my.clerk.io/')) {
    

    const observer = new MutationObserver(async (mutations) => {
       await waitForMessage();
       handleMutations(mutations);
    });

    observer.observe(document.body, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  }
}

// Run the main function
main();