var s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function() {
    s.remove();
};

chrome.storage.sync.get({
  shortcut1: 'Enter',
  enableShortcut1: true, // Default value is true
  shortcut2: 'Escape',
  enableShortcut2: true // Default value is true
}, function(items) {
  window.postMessage({ type: "FROM_CONTENT_SCRIPT", shortcut1: items.shortcut1, enableShortcut1: items.enableShortcut1, shortcut2: items.shortcut2, enableShortcut2: items.enableShortcut2 }, "*");
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    if (key === 'shortcut1' || key === 'enableShortcut1' || key === 'shortcut2' || key === 'enableShortcut2') {
      window.postMessage({ type: "FROM_CONTENT_SCRIPT", shortcut1: changes.shortcut1.newValue, enableShortcut1: changes.enableShortcut1.newValue, shortcut2: changes.shortcut2.newValue, enableShortcut2: changes.enableShortcut2.newValue }, "*");
    }
  }
});
