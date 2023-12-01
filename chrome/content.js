var s = document.createElement("script");
s.src = chrome.runtime.getURL("injected.js");
(document.head || document.documentElement).appendChild(s);
s.onload = function () {
    s.remove();
};

chrome.storage.sync.get(
    {
        shortcut1: "Enter",
        enableShortcut1: true,
        shortcut2: "Escape",
        enableShortcut2: true,
        enableDeleteDesigns: true,
    },
    function (items) {
        window.postMessage(
            {
                type: "FROM_CONTENT_SCRIPT",
                shortcut1: items.shortcut1,
                enableShortcut1: items.enableShortcut1,
                shortcut2: items.shortcut2,
                enableShortcut2: items.enableShortcut2,
                enableDeleteDesigns: items.enableDeleteDesigns,
            },
            "*"
        );
    }
);

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        if (
            key === "shortcut1" ||
            key === "enableShortcut1" ||
            key === "shortcut2" ||
            key === "enableShortcut2" ||
            key === "enableDeleteDesigns"
        ) {
            window.postMessage(
                {
                    type: "FROM_CONTENT_SCRIPT",
                    shortcut1: changes.shortcut1.newValue,
                    enableShortcut1: changes.enableShortcut1.newValue,
                    shortcut2: changes.shortcut2.newValue,
                    enableShortcut2: changes.enableShortcut2.newValue,
                    enableDeleteDesigns: changes.enableDeleteDesigns.newValue,
                },
                "*"
            );
        }
    }
});

async function translateText(text, targetLanguage) {
    const apiKey = "API_KEY";
    const url = `https://translation.googleapis.com/language/translate/v2?q=${encodeURIComponent(
        text
    )}&target=${targetLanguage}&format=text&key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error("Error translating text:", error);
        return null;
    }
}

// translateText("sad", "da")
//     .then((translatedText) => {
//         console.log("Translated text:", translatedText);
//     })
//     .catch((error) => {
//         console.error("Translation failed:", error);
//     });
