import { Clients } from "./extension/webResources/ClerkHQScraper";
import { MyClerkInfoData, MyClerkContentData } from "./extension/webResources/MyClerkScraper";

enum DTO {
    ClerkSniffer = 'clerksniffer',
    HQclerkClients = 'hqclerkclients',
    MyClerkInfo = 'myclerkinfo',
    MyClerkContent = 'myclerkcontent'
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
    info: MyClerkInfoData;
}

export type MyClerkContent = {
    type: DTO.MyClerkContent;
    content: MyClerkContentData;
}

export default DTO;