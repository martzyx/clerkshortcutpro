import DTO from '../DTO'
import HandleClerkIcon from './webResources/ClerkSniffer'

chrome.runtime.onMessage.addListener(async (request, sender) => {
  console.log("Received message", request);
  if (request.type === DTO.ClerkSniffer) {
    HandleClerkIcon(request, sender)
    await chrome.storage.session.set({ [DTO.ClerkSniffer]: request.state })
  }
  if (request.type === DTO.HQclerkClients) {
    await chrome.storage.session.set({ [DTO.HQclerkClients]: request.clients })
    console.log("Stored HQclerkClients", request.clients);
  }
})
