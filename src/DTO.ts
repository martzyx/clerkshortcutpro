enum DTO {
    ClerkSniffer = 'clerksniffer'
}

export type ClerkSniffer = {
    type: DTO.ClerkSniffer;
    state: boolean;
}

export type TabState = {
    isClerk: boolean;
    tabId: number;
}

export type TabMap = {
    [tabId: number]: TabState;
}

export default DTO;