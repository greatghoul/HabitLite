const APP_URL = 'https://habitica.com/'
const AUTH_URL = 'https://habitica.com/favicon.ico'
const AUTH_CFG = {
  code: 'localStorage.getItem("habit-mobile-settings")',
  runAt: 'document_end'
}

const fetchAuth = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ url: AUTH_URL, active: false }, (tab) => {
      chrome.tabs.executeScript(tab.id, AUTH_CFG, function (results) {
        try {
          const auth = JSON.parse(results[0]).auth
          window.localStorage.apiId = auth.apiId
          window.localStorage.apiToken = auth.apiToken
          chrome.tabs.remove(tab.id)
          console.log('Fetched auth info', auth)
          resolve(auth)
        } catch (e) {
          console.log('Failed to authorize', e)
          reject(e)
          window.setTimeout(() => {
            chrome.tabs.update(tab.id, { url: APP_URL, active: true })
          }, 1000)
        }
      })
    })
  })
}

const handleMessage = (message, sender, sendResponse) => {
  if (message.action === 'fetch-auth') {
    fetchAuth()
      .then(auth => sendResponse({ success: true, auth: auth }))
      .catch(() => sendResponse({ success: false }))
  }

  return true
}

chrome.runtime.onMessage.addListener(handleMessage)
