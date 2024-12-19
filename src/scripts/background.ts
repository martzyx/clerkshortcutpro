import DTO, { ClerkSniffer } from "../DTO";
console.log('Background script loaded');

// Listen for messages from the pop up
chrome.runtime.onMessage.addListener(async (request, sender) => {

  if(request.type === DTO.ClerkSniffer) {
    console.log('Message received in background of type clerksniffer', request, sender);
    HandleClerkIcon(request, sender);
  }else{
    console.log('Message received in background:', request, sender);
  }
  //await HandleClerkIcon(request, sender);
});



async function HandleClerkIcon(request: ClerkSniffer, sender: chrome.runtime.MessageSender) {
    const color = request.state ? '#50fa7b' : '#ff5555';
    const text = request.state ? 'Yes' : 'No';
    const icons = request.state ? {
      16: "/assets/icons/color/16.png",
      32: "/assets/icons/color/32.png",
      48: "/assets/icons/color/48.png",
      128: "/assets/icons/color/128.png"
  } : { 
      16: "/assets/icons/greyscale/16.png",
      32: "/assets/icons/greyscale/32.png",
      48: "/assets/icons/greyscale/48.png",
      128: "/assets/icons/greyscale/128.png"
  };
  await chrome.action.setBadgeBackgroundColor({color: color, tabId: sender.tab?.id});
  await chrome.action.setBadgeText({ text: text, tabId: sender.tab?.id });
  await chrome.action.setIcon({path: icons, tabId: sender.tab?.id});
  return true;
}

