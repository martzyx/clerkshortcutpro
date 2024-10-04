chrome.runtime.onInstalled.addListener(() => {
    console.log('Worker installed');
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.enabled !== undefined) {
          console.log("Service worker received message from sender %s", sender.id, request)
          sendResponse({message: "Service worker processed the message"})
    }
  })