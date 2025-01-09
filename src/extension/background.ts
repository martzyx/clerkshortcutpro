import DTO from '../DTO'
import HandleClerkIcon from './webResources/ClerkSniffer'


chrome.runtime.onMessage.addListener(async (request, sender) => {
  if (request.type === DTO.ClerkSniffer) {
    // Handle the clerk icon on the tab
    HandleClerkIcon(request, sender);

    // Append the new tab information
    if(request.state == false) return
    // Handle popup data
    const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
    const data = await chrome.storage.session.get(DTO.ClerkSniffer);
    const updatedData = new Set(data[DTO.ClerkSniffer] || []);

    // Append the new tab information
    updatedData.add(currentTab[0].url);
  
    await chrome.storage.session.set({ [DTO.ClerkSniffer]: Array.from(updatedData) });
  }
  if (request.type === DTO.HQclerkClients) {
    await chrome.storage.session.set({ [DTO.HQclerkClients]: request.clients })
    console.log("Stored HQclerkClients", request.clients);
  }
})
