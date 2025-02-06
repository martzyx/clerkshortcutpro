import DTO, { MyClerkContent, MyClerkInfo } from "../../DTO";
import { Company } from "./ClerkHQScraper";

export type MyClerkContentData = {
  content: {
    api: string,
    name: string,
    is_active: boolean,
  },
  // error handling
  status: string
}

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
  const response = await origFetch(...args);

  if (!response.url.includes('api.clerk.io')) return response;

  if (response.url.match('client/info')) {
    response
      .clone()
      .json()
      .then((data: Company) => {
        const myClerkData: MyClerkInfo = {
          type: DTO.MyClerkInfo,
          info: data
        };

        if (data.status === "ok") {
          window.postMessage(myClerkData, '*'); // send to content script
        }
      })
      .catch(err => console.error(err));
  }

  if (response.url.match('account/content/info')) {
    response
      .clone()
      .json()
      .then((data: MyClerkContentData) => {
        const myClerkContentData: MyClerkContent = {
          type: DTO.MyClerkContent,
          content: data
        };
        if (data.status === "ok") {
          window.postMessage(myClerkContentData, '*'); // send to content script
        }
      })
      .catch(err => console.error(err));
  }

  return response;
};