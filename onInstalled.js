chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    'enabledPresets': [],
    'customReplacements': {},
  });
});
