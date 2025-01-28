import DTO, { MyClerkInfo } from "../../DTO";

export type MyClerkData ={
    id: string,
    company_id: string | number,
    name: string,
    domain: string,
    language: string,
    currency: string,
    platform: string,
    enabled: boolean,
    development: boolean,
    // Error handling
    status: string,
}

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    const response = await origFetch(...args);
  
    if(!response.url.includes('api.clerk.io')) return response;

    if (response.url.match('account/info')) {
      response
        .clone()
        .json()
        .then((data: MyClerkData) => {
          const myClerkData: MyClerkInfo = {
            type: DTO.MyClerkInfo,
            info: data
          };

          if (data.status === "ok") {
            window.postMessage(myClerkData, '*'); // send to content script
          }
        })
        .catch(err => console.error(err));
      return response;
    }
    return response;
};