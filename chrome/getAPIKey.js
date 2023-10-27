function getApiUrlWithClientKey(url) {
    // Define the regex pattern to match the client_key parameter
    const pattern = /client_key=([^&]+)/;

    // Execute the regex pattern against the URL
    const match = url.match(pattern);

    // Check if a match is found
    if (match && match[1]) {
        // Replace CLIENT_KEY in the API URL with the actual client_key
        const apiUrl = "https://api.clerk.io/v2/client/info?secure=false&client_key=CLIENT_KEY";
        const newApiUrl = apiUrl.replace("CLIENT_KEY", match[1]);

        // Return the new API URL
        return newApiUrl;
    } else {
        // Return a message if no match is found
        return "No client_key found in the URL";
    }
}
