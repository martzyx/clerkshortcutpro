chrome.runtime.onMessage.addListener(
    async function(request) {
      if(request.source == 'CleSS' && request.type == 'window_load_complete'){
        console.log('Popup received window_load_complete message from content script');
      }
    }
  );