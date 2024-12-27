import DTO from '../DTO'
import HandleClerkIcon from './webResources/ClerkSniffer'

chrome.runtime.onMessage.addListener(async (request, sender) => {
  console.log("Received message", request);
  if (request.type === DTO.ClerkSniffer) {
    HandleClerkIcon(request, sender)
  }
  if (request.type === DTO.HQclerkClients) {
    await chrome.storage.local.set({ [DTO.HQclerkClients]: request.clients })
    console.log("Stored HQclerkClients", request.clients);
  }
})
