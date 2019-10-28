const openPopup = () => {
  chrome.tabs.create({ url: 'popup.html' })
}

chrome.browserAction.onClicked.addListener(openPopup)
