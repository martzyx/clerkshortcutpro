import DTO, { ClerkSniffer } from "../../DTO";

const requestObserver = new PerformanceObserver(onRequestObserved);   
requestObserver.observe({ entryTypes: ['resource']}); 


function onRequestObserved(entries: PerformanceObserverEntryList) {
    const loadedResources: PerformanceEntryList = entries.getEntries();

    const clerkSniffer: ClerkSniffer = {
        type: DTO.ClerkSniffer,
        state: isClerk(loadedResources)
    }
    
    window.postMessage(clerkSniffer, '*');
    return clerkSniffer;
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