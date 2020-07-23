chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    'enabledPresets': ['general', 'latex'],
    'customMacrosRaw': '',
    'customMacros': [],
    'timeout': 1500,
    'lookbehind': 2,
  });
});
