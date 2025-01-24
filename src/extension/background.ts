import DTO from '../DTO'
import { Clients, Company } from './webResources/ClerkHQScraper';
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
    const ClerkClient: Clients = request.clients;

    const HQ_CLERK_API = 'https://api.clerk.io/v2/client/info?secure=false&client_key=';

    const companyPromises = ClerkClient.companies.map(async (company: Company) => {


      const CompanyExtraData: Company = await fetch(HQ_CLERK_API + company.key,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      ).then(res => res.json()).catch(err => console.error(err));

      // merge the two objects
      return { ...company, ...CompanyExtraData };
    });
    ClerkClient.companies = await Promise.all(companyPromises);
    
    console.log(ClerkClient)
    await chrome.storage.session.set({ [DTO.HQclerkClients]: ClerkClient });    
  }
  return true;
});
