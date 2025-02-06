import DTO from "../../DTO";
import { Clients, Company } from "../webResources/ClerkHQScraper";

export default async function StoreHQClerkClients(clients: Clients): Promise<boolean> {
  const CLERK_CLIENT_LIMIT = 5 

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


const companyPromises = getExtraClientData(filteredCompanies)

clients.companies = await Promise.all(companyPromises);

await chrome.storage.session.set({ [DTO.HQclerkClients]: clients }); 
return true;
}


export async function updateHQClerkClient(client: Company) {
  chrome.storage.session.get(DTO.HQclerkClients).then(async res => {
    const clients: Clients = res[DTO.HQclerkClients];

    const filteredCompanies = clients.companies.filter((c) => {
      return c.subscription === client.subscription || c.account_id === client.subscription;
    });

    const companyPromises = getExtraClientData(filteredCompanies)

    clients.companies = await Promise.all(companyPromises);
    await chrome.storage.session.set({ [DTO.HQclerkClients]: clients }); 


  return true;

  }).catch((err: unknown) => {
    throw new Error(`Could not update client ${client.name} - ${err}`);
  });
}

function getExtraClientData(clients: Company[]) {
  return clients.map(async (company: Company) => {
    const CompanyExtraData = await getExtraCompanyData(company);
    return { ...company, ...CompanyExtraData };
});
}

async function getExtraCompanyData(company: Company): Promise<Company> {
  const HQ_CLERK_API = 'https://api.clerk.io/v2/client/info?secure=false&client_key=';

  const CompanyExtraData: Company = await fetch(HQ_CLERK_API + company.key,
    {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    ).then(res => res.json()).catch(err => console.error(err));
    return CompanyExtraData;
}