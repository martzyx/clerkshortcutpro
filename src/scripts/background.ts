import DTO from "../DTO";
import HandleClerkIcon from "./webResources/ClerkSniffer";

chrome.runtime.onMessage.addListener(async (request, sender) => {

  if(request.type === DTO.ClerkSniffer) {
    HandleClerkIcon(request, sender);
  }
  
});

