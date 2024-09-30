chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ adBlockerEnabled: false })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(['adBlockerEnabled'], (result) => {
      chrome.tabs.sendMessage(tabId, {
        action: 'toggleAdBlocker',
        isEnabled: result.adBlockerEnabled || false,
      })
    })
  }
})
