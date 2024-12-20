
enum DTO {
    ClerkSniffer = 'clerksniffer',
    HQclerkClients = 'hqclerkclients',
    ClerkApiKey = 'clerkapikey'
}

export type clerkSniffer = {
    type: DTO.ClerkSniffer;
    state: boolean;
}


export type clerkApiKey = {
    type: DTO.ClerkApiKey;
    apiKey: string;
}

export default DTO;