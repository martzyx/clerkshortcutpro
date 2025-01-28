import { Clients } from "./extension/webResources/ClerkHQScraper";
import { MyClerkData } from "./extension/webResources/MyClerkScraper";

enum DTO {
    ClerkSniffer = 'clerksniffer',
    HQclerkClients = 'hqclerkclients',
    MyClerkInfo = 'myclerkinfo'
}

export type clerkSniffer = {
    type: DTO.ClerkSniffer;
    state: boolean;
}

export type HQclerkClients = {
    type: DTO.HQclerkClients;
    clients: Clients;
}

export type MyClerkInfo = {
    type: DTO.MyClerkInfo;
    info: MyClerkData;
}

export default DTO;