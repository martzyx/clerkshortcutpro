import DTO, { SearchClients } from '../DTO'
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
    const CLERK_CLIENT_LIMIT = 5
    const ClerkClient: Clients = request.clients;
       
    // Filter 5 unique companies based on company id
       const uniqueCompanies = new Set<number>();
       let i = 0;
       const filteredCompanies = ClerkClient.companies.filter(company => {
        if(i == CLERK_CLIENT_LIMIT) return;
         if (uniqueCompanies.has(company.id)) {
           return company
         } else {
          i++;
           uniqueCompanies.add(company.id);
           return company;
         }
       })

    const HQ_CLERK_API = 'https://api.clerk.io/v2/client/info?secure=false&client_key=';

    if(ClerkClient.companies === undefined) throw new Error('[ClerkShortcut] No companies found in the clerk client data');
    const companyPromises = filteredCompanies.map(async (company: Company) => {
      // TODO: This fetch causes the "window not defined" error in "ClerkSniffer.ts"
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

    await chrome.storage.session.set({ [DTO.HQclerkClients]: ClerkClient });    
  }

  if(request.type === DTO.MyClerkInfo) {
    

    await chrome.storage.session.set({ [DTO.MyClerkInfo]: request.info });
  }

  if(request.type === DTO.SearchClients){
    const query: SearchClients = request;
    
    (async () => {
      const rawResponse = await fetch("https://api.clerk.io/v2/client/list", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({query: query.query})
      });
      const content = await rawResponse.json();
    
      console.log("fetch: ", content);
    })();

    console.log("search bg ", query.query)
  }

  return true;
});
