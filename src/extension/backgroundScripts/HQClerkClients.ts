import DTO from "../../DTO";
import { Clients, Company } from "../webResources/ClerkHQScraper";

const CLERK_CLIENT_LIMIT = 5 
const HQ_CLERK_API = 'https://api.clerk.io/v2/client/info?secure=false&client_key=';

export default async function StoreHQClerkClients(clients: Clients): Promise<boolean> {
// Filter 5 unique companies based on company id
const uniqueCompanies = new Set<number>();

let i = 0;
const filteredCompanies = clients.companies.filter(company => {
  if(i == CLERK_CLIENT_LIMIT) return;
  if (uniqueCompanies.has(company.id)) {
    return company
  } else {
    i++;
    uniqueCompanies.add(company.id);
    return company;
  }
})

if(clients.companies === undefined) 
    throw new Error('[ClerkShortcut] No companies found in the clerk client data');

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

clients.companies = await Promise.all(companyPromises);

await chrome.storage.session.set({ [DTO.HQclerkClients]: clients }); 
return true;
}