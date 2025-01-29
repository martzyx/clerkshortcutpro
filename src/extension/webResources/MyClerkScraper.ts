import DTO, { MyClerkContent, MyClerkInfo } from "../../DTO";

export type MyClerkInfoData = {
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

  if (response.url.match('account/info')) {
    response
      .clone()
      .json()
      .then((data: MyClerkInfoData) => {
        const myClerkData: MyClerkInfo = {
          type: DTO.MyClerkInfo,
          info: data
        };
        console.log("network info", myClerkData)

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
        console.log("network content", myClerkContentData)
        if (data.status === "ok") {
          window.postMessage(myClerkContentData, '*'); // send to content script
        }
      })
      .catch(err => console.error(err));
  }

  return response;
};