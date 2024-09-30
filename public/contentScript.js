const adSelectors = ['div.ad', 'iframe[src*="ads.com"]', 'div[id*="sponsor"]']

function removeAds() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(ad => ad.remove());
  });
}


window.onload = () => {
  removeAds()
}
