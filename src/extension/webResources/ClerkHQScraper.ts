import DTO from "../../DTO";



const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    const response = await origFetch(...args);
    
    // If the reqponse of the network request is from the clerk.io API & the request is a list
    // of clients
    if(response.url.includes('api.clerk.io') && response.url.match('list')){
        response
            .clone()
            .json()
            .then(data => {
                window.postMessage({ type: DTO.HQclerkClients, data: data }, '*'); // send to content script
                //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
            })
            .catch(err => console.error(err));      
            return response;
    } 
    return response;
};

