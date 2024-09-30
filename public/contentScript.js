let adBlockerEnabled = false

function removeAds() {
  if (!adBlockerEnabled) return

  const adSelectors = ['div.ad', 'iframe[src*="ads"]', 'div[id*="sponsor"]']
  adSelectors.forEach((selector) => {
    document
      .querySelectorAll(selector)
      .forEach((ad) => (ad.style.display = 'none'))
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleAdBlocker') {
    adBlockerEnabled = request.isEnabled
    removeAds()
  }
})

chrome.storage.sync.get(['adBlockerEnabled'], (result) => {
  adBlockerEnabled = result.adBlockerEnabled || false
  removeAds()
})

const observer = new MutationObserver(removeAds)
observer.observe(document.body, { childList: true, subtree: true })
