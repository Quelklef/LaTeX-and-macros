chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    'enabledPresets': ['latex math'],
    'customReplacements': {},
    'customCommands': '',

    'tolerance': '1500',
    'lookbehind': '2',
  });
});
