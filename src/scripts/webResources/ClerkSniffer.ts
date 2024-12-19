import DTO, { clerkSniffer } from "../../DTO";

export type TabState = {
    isClerk: boolean;
    tabId: number;
}

export type TabMap = {
    [tabId: number]: TabState;
}

const requestObserver = new PerformanceObserver(onRequestObserved);   
requestObserver.observe({ entryTypes: ['resource']}); 

function HandleClerkIcon(request: clerkSniffer, sender: chrome.runtime.MessageSender) {
    const tabStates: TabMap = {}
    if(request.type !== DTO.ClerkSniffer) throw new Error("Invalid message type - Should be of 'ClerkSniffer': " + request );

      if(!sender.tab) {
        throw new Error("No tab id in message");
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
        ChangeClerkIcon(tabStates[sender.tab?.id]);
      }
  }

function onRequestObserved(entries: PerformanceObserverEntryList) {
    const loadedResources: PerformanceEntryList = entries.getEntries();

    const clerkSniffer: clerkSniffer = {
        type: DTO.ClerkSniffer,
        state: isClerk(loadedResources)
    }

    if(clerkSniffer.state) {
        window.postMessage(clerkSniffer, '*');
        return clerkSniffer;
    }
    return;
}

function isClerk(observerList: PerformanceEntryList) {
    const clerkDomains = ['api.clerk.io', 'cdn.clerk.io', 'custom.clerk.io'];
    for (const entry of observerList) {
        if (clerkDomains.some(domain => entry.name.includes(domain))) {
            return true;
        }
    }
    return false;
}   

  async function ChangeClerkIcon(state: TabState) {
      const color = state.isClerk ? '#50fa7b' : '#ff5555';
      const text = state.isClerk ? 'YES' : 'NO';
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

  export default HandleClerkIcon;