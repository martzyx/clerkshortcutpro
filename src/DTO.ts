enum DTO {
    ClerkSniffer = 'clerksniffer',
    HQclerkClients = 'hqclerkclients',
    ClerkApiKey = 'clerkapikey'
}

export type clerkSniffer = {
    type: DTO.ClerkSniffer;
    state: boolean;
}

export type HQclerkCustomers = {
    type: DTO.HQclerkClients;
    clients: HQclerkClient[];
}

export type HQclerkClient = {
    id: number;
}


export type clerkApiKey = {
    type: DTO.ClerkApiKey;
    apiKey: string;
}

export default DTO;