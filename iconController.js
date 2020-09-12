chrome.runtime.onMessage.addListener((request, sender, callback) => {
  if ('setIconGrayscale' in request) {
    const { setIconGrayscale } = request;
    const iconPath = setIconGrayscale ? './icon-128x-gray.png' : './icon-128x.png';
    chrome.browserAction.setIcon({ path: iconPath });
  }
  return true;
});
