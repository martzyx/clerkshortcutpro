async function translateText(text, targetLanguage) {
    const apiKey = "API_KEY";
    const url = `https://translation.googleapis.com/language/translate/v2?q=${encodeURIComponent(text)}&target=${targetLanguage}&format=text&key=${apiKey}`;

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

//test
// translateText("sad", "da")
//     .then((translatedText) => {
//         console.log("Translated text:", translatedText);
//     })
//     .catch((error) => {
//         console.error("Translation failed:", error);
//     });
