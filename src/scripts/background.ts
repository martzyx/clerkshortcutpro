import DTO, { TabMap, TabState } from "../DTO";
console.log('Background script loaded');

const tabStates: TabMap = {}

// Listen for messages from the pop up
chrome.runtime.onMessage.addListener(async (request, sender) => {

  if(request.type === DTO.ClerkSniffer) {
    if(!sender.tab) {
      console.log('No tab id in message');
      return;
    }

    if(typeof sender.tab?.id == 'number' && !tabStates[sender.tab?.id]) {
      console.log('Tab state not found, creating new tab state');
      tabStates[sender.tab.id] = {
        isClerk: request.state,
        tabId: sender.tab?.id
      }
    }

    if(typeof sender.tab?.id == 'number' && request.state){
      tabStates[sender.tab.id]['isClerk'] = request.state;
      console.log('Tab state found, updating tab state');
      HandleClerkIcon(tabStates[sender.tab?.id]);
    }
  }else{
    console.log('Message received in background:', request, sender);
  }
  //await HandleClerkIcon(request, sender);
});



async function HandleClerkIcon(state: TabState) {
    const color = state.isClerk ? '#50fa7b' : '#ff5555';
    const text = state.isClerk ? 'Yes' : 'No';
    const icons = state.isClerk ? {
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
  await chrome.action.setBadgeBackgroundColor({color: color, tabId: state.tabId});
  await chrome.action.setBadgeText({ text: text, tabId: state.tabId });
  await chrome.action.setIcon({path: icons, tabId: state.tabId});
  return true;
}

