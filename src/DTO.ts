enum DTO {
    ClerkSniffer = 'clerksniffer',
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