import { Clients } from "./extension/webResources/ClerkHQScraper";

enum DTO {
    ClerkSniffer = 'clerksniffer',
    HQclerkClients = 'hqclerkclients',
}

export type clerkSniffer = {
    type: DTO.ClerkSniffer;
    state: boolean;
}

export type HQclerkClients = {
    type: DTO.HQclerkClients;
    clients: Clients;
}


export default DTO;