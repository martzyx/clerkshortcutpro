var s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function() {
    s.remove();
};

chrome.storage.sync.get({
  shortcut1: 'Enter', // Default value is 'Enter'
}, function(items) {
  window.postMessage({ type: "FROM_CONTENT_SCRIPT", shortcut1: items.shortcut1 }, "*");
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
      if (key === 'shortcut1') {
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", shortcut1: changes.shortcut1.newValue }, "*");
      }
      // Handle other shortcuts here
  }
});
