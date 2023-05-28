var s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function() {
    s.remove();
};

chrome.storage.sync.get({
  shortcut1: 'Enter',
  enableShortcut1: true // Default value is false
}, function(items) {
  window.postMessage({ type: "FROM_CONTENT_SCRIPT", shortcut1: items.shortcut1, enableShortcut1: items.enableShortcut1 }, "*");
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    if (key === 'shortcut1' || key === 'enableShortcut1') {
      window.postMessage({ type: "FROM_CONTENT_SCRIPT", shortcut1: changes.shortcut1.newValue, enableShortcut1: changes.enableShortcut1.newValue }, "*");
    }
  }
});
