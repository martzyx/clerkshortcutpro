import { Clients, Company } from "./extension/webResources/ClerkHQScraper";
import { MyClerkContentData, MyClerkStoreData } from "./extension/webResources/MyClerkScraper";

enum DTO {
    ClerkSniffer = 'clerksniffer',
    HQclerkClients = 'hqclerkclients',
    MyClerkInfo = 'myclerkinfo',
    MyClerkStoreInfo = 'myclerkstoreinfo',
    MyClerkContent = 'myclerkcontent',
    SearchClients = 'SearchClients',
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
    info: Company;
}

export type MyClerkStoreInfo = {
    type: DTO.MyClerkStoreInfo;
    info: MyClerkStoreData;
}

export type MyClerkContent = {
    type: DTO.MyClerkContent;
    content: MyClerkContentData;
}

export type SearchClients = {
    type: DTO.SearchClients;
    query: string;
}

export default DTO;