import { Clients } from "./extension/webResources/ClerkHQScraper";

enum DTO {
    ClerkSniffer = 'clerksniffer',
    HQclerkClients = 'hqclerkclients',
    ClerkApiKey = 'clerkapikey'
}

export type clerkSniffer = {
    type: DTO.ClerkSniffer;
    state: boolean;
}

export type HQclerkClients = {
    type: DTO.HQclerkClients;
    clients: Clients;
}

export type clerkApiKey = {
    type: DTO.ClerkApiKey;
    apiKey: string;
}

export default DTO;