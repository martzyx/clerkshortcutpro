import DTO from '../DTO'
import StoreHQClerkClients from './backgroundScripts/HQClerkClients';
import { Clients} from './webResources/ClerkHQScraper';
import HandleClerkIcon from './webResources/ClerkSniffer'

chrome.runtime.onMessage.addListener(async (request, sender) => {
  if (request.type === DTO.ClerkSniffer) {
    // Handle the clerk icon on the tab
    HandleClerkIcon(request, sender);

    /* Handle logic for clerkSniffer in pop-up */
    if(request.state == false) return
    const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
    const data = await chrome.storage.session.get(DTO.ClerkSniffer);
    const updatedData = new Set(data[DTO.ClerkSniffer] || []);

    // Append the new active tab with clerk to the list
    updatedData.add(currentTab[0].url);
    
    await chrome.storage.session.set({ [DTO.ClerkSniffer]: Array.from(updatedData) });
  }

  if (request.type === DTO.HQclerkClients) {
    const requestClerkClients: Clients = request.clients;
    
    await StoreHQClerkClients(requestClerkClients);
  }

  if(request.type === DTO.MyClerkInfo) {
    await chrome.storage.session.set({ [DTO.MyClerkInfo]: request.info });
  }

  return true;
});
