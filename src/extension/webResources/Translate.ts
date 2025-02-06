import DTO, { MyClerkContent, MyClerkStoreInfo } from "../../DTO";

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
  por: string;
  se: string;
  no: string;
  nl: string;
  fr: string;
  de: string;
  it: string;
  es: string;
}

const languageMap: Record<string, keyof ClerkTranslations> = {
  english: "en",
  danish: "dk",
  portuguese: "por",
  swedish: "se",
  norwegian: "no",
  dutch: "nl",
  french: "fr",
  german: "de",
  italian: "it",
  spanish: "es",
};

function detectLanguage(input: string): keyof ClerkTranslations | null {
  const normalizedInput = input.trim().toLowerCase();
  return languageMap[normalizedInput] || null;
}

export const translations: ClerkTranslations[] = [
  {
      kind: ClerkContentKinds.DEFAULT,
      type: ClerkContentType.OTHERS_ALSO_BOUGHT,
      en: "Customers also bought",
      dk: "Andre kunder købte også",
      por: "Clientes também compraram",
      se: "Andra kunder köpte också",
      no: "Andre kunder kjøpte også",
      nl: "Klanten kochten ook",
      fr: "D'autres clients ont acheté",
      de: "Andere Kunden kauften auch",
      it: "Altri clienti hanno acquistato",
      es: "Otros clientes también compraron",
  },
  {
      kind: ClerkContentKinds.DEFAULT,
      type: ClerkContentType.POPULAR,
      en: "Popular choices",
      dk: "Populære valg",
      por: "Escolhas populares",
      se: "Populära val",
      no: "Populære valg",
      nl: "Populaire keuzes",
      fr: "Choix populaires",
      de: "Beliebte Auswahl",
      it: "Scelte popolari",
      es: "Opciones populares",
  },
  {
      kind: ClerkContentKinds.DEFAULT,
      type: ClerkContentType.HOT,
      en: "Trending now",
      dk: "Trender lige nu",
      por: "Em alta agora",
      se: "Trendande just nu",
      no: "Trender nå",
      nl: "Nu trending",
      fr: "Tendance actuelle",
      de: "Derzeit im Trend",
      it: "Di tendenza ora",
      es: "Tendencias del momento",
  },
  {
      kind: ClerkContentKinds.DEFAULT,
      type: ClerkContentType.ALTERNATIVES,
      en: "You might also like",
      dk: "Du vil måske også kunne lide",
      por: "Você também pode gostar",
      se: "Du kanske också gillar",
      no: "Du liker kanskje også",
      nl: "Je vindt dit misschien ook leuk",
      fr: "Vous aimerez peut-être aussi",
      de: "Das könnte Ihnen auch gefallen",
      it: "Potrebbe piacerti anche",
      es: "También te puede gustar",
  },
  {
    kind: ClerkContentKinds.DEFAULT,
    type: ClerkContentType.COMPLEMENTARY,
    en: "Frequently bought together",
    dk: "Ofte købt sammen",
    por: "Frequentemente comprados juntos",
    se: "Ofta köpta tillsammans",
    no: "Ofte kjøpt sammen",
    nl: "Vaak samen gekocht",
    fr: "Achetés fréquemment ensemble",
    de: "Häufig zusammen gekauft",
    it: "Acquistati frequentemente insieme",
    es: "Comprados juntos frecuentemente",
},
  {
      kind: ClerkContentKinds.DEFAULT,
      type: ClerkContentType.VISITOR_COMPLEMENTARY,
      en: "Recommended for you",
      dk: "Anbefalet til dig",
      por: "Recomendado para você",
      se: "Rekommenderat för dig",
      no: "Anbefalt for deg",
      nl: "Aanbevolen voor jou",
      fr: "Recommandé pour vous",
      de: "Empfohlen für Sie",
      it: "Consigliato per te",
      es: "Recomendado para ti",
  },
  {
    kind: ClerkContentKinds.DEFAULT,
    type: ClerkContentType.SUBSTITUTING,
    en: "Similar alternatives",
    dk: "Lignende alternativer",
    por: "Alternativas semelhantes",
    se: "Liknande alternativ",
    no: "Lignende alternativer",
    nl: "Vergelijkbare alternatieven",
    fr: "Alternatives similaires",
    de: "Ähnliche Alternativen",
    it: "Alternative simili",
    es: "Alternativas similares",
},
];

function getTranslation(kind: ClerkContentKinds, type: ClerkContentType, language: string): string {
  const detectedLanguage = detectLanguage(language);

  if (!detectedLanguage) {
    throw new Error(`[ClerkShortcut] Unsupported language: ${language}`);
  }

  const translation = translations.find(
    (t) => (t.kind === kind || t.kind === ClerkContentKinds.DEFAULT) && t.type === type
  );

  if (!translation) {
    throw new Error(`[ClerkShortcut] Translation not found for kind: ${kind}, type: ${type}`);
  }

  // English as fallback
  return translation[detectedLanguage] ?? translation.en;
}

// 
let MY_CLERK_CONTENT: MyClerkContent | undefined = undefined;
let MY_CLERK_INFO: MyClerkStoreInfo | undefined = undefined;

function waitForMessage(): Promise<void> {
  return new Promise((resolve) => {
    window.addEventListener('message', function handler(event) {
      if (event.data.type === DTO.MyClerkContent) {
        MY_CLERK_CONTENT = event.data;
      }
      if (event.data.type === "myclerkstoreinfo") {
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


          if (!MY_CLERK_CONTENT || !MY_CLERK_INFO) {
            throw new Error("[ClerkShortcut] Clerk content or store info is missing.");
          }

          // Determine content type and kind
          const contentType = getContentType(MY_CLERK_CONTENT);
          const contentKind = getContentKind(MY_CLERK_CONTENT);

          // Detect store language
          if (!MY_CLERK_INFO?.info.language) {
            throw new Error("[ClerkShortcut] Store language could not be found, try refreshing the page.");
          }

          const storeLanguage = MY_CLERK_INFO.info.language;
          const translatedText = getTranslation(contentKind, contentType, storeLanguage);
          if (input.value.length === 0) {
            input.value = translatedText; // Set the translation
          }
          return;
        };
      });
      return;
    }
 
  }
}

function getContentType(contentData: MyClerkContent): ClerkContentType {
   for (const value of Object.values(ClerkContentType)) {
    const transformedValue = value.toLowerCase().replace(/ /g, "");
    if(contentData.content.content.api.toLowerCase().replace(/ /g, "").match(transformedValue)){
        return value;
    }
   }
   throw new Error("[ClerkShortcut] Content type not found");
}

function getContentKind(contentData: MyClerkContent): ClerkContentKinds {
    for(const value of Object.values(ClerkContentKinds)){
        const transformedValue = value.toLowerCase().replace(/ /g, "");
        if(contentData.content.content.api.toLowerCase().replace(/ /g, "").match(transformedValue)){
            return value;
        } 
    }
    throw new Error("[ClerkShortcut] Content Kind not found");
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

main();