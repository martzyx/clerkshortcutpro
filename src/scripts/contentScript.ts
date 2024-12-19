import DTO from "../DTO";

console.log('Content script loaded');

const script = document.createElement('script');
script.src = chrome.runtime.getURL('webResource.js');
script.onload = async () => {
    script.remove();
};
(document.head || document.documentElement).prepend(script);

window.addEventListener('message', (event) => {
    if (event.source != window 
        || ! event.data 
        || ! event.data.type
        || ! chrome.runtime?.id) {
        return;
      }

    if(event.data.type !== DTO.ClerkSniffer) {
        return;
    }
    chrome.runtime.sendMessage(event.data);
});