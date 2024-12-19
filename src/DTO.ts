enum DTO {
    ClerkSniffer = 'clerksniffer'
}

export type ClerkSniffer = {
    type: DTO.ClerkSniffer;
    state: boolean;
}


export default DTO;