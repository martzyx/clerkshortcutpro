function getApiKey() {
    // Find the script tag with the specific src attribute pattern
    const scripts = Array.from(document.getElementsByTagName("script"));
    for (let script of scripts) {
        if (script.src && script.src.includes("api.clerk.io")) {
            // Extract API key using a regular expression
            const match = script.src.match(/key%22%3A%22([^%]+)%22/);
            if (match && match[1]) {
                return decodeURIComponent(match[1]);
            }
        }
    }
    return null;
}

const apiKey = getApiKey();
