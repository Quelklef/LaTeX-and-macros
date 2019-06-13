chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({'enabled_presets': []});
});
