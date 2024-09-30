chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { cancel: true }
  },
  { urls: ['*://*.ads.com/*', '*://*.trackingpixel.com/*'] },
  ['blocking']
)
