const s = document.createElement('script');

s.src = chrome.runtime.getURL('screener.ts');

s.onload = async function() {
  s.remove();
};

(document.head || document.documentElement).appendChild(s);


window.addEventListener('load', function(){
  chrome.runtime.sendMessage({type: "window_load_complete", source: "CleSS", message: { showPlaceholder: false } })
});