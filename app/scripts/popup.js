Ractive({
  target: '#app',

  template: `
    <div>
      {{#if auth}}
        <main auth="{{auth}}" />
      {{else}}
        <loading failed="{{failed}}" />
      {{/if}}
    </div>
  `,

  data: {
    auth: null,
    failed: false
  },

  on: {
    init () {
      const auth = this.getAuth()
      if (auth) {
        this.set('auth', auth)
      } else {
        this.fetchAuth()
      }
    }
  },

  getAuth () {
    const apiId = window.localStorage.apiId
    const apiToken = window.localStorage.apiToken

    if (apiId && apiToken) {
      return {
        apiId: window.localStorage.apiId,
        apiToken: window.localStorage.apiToken
      }
    } else {
      return null
    }
  },

  fetchAuth () {
    chrome.runtime.sendMessage({ action: 'fetch-auth' }, resp => {
      if (resp.success) {
        this.set('auth', resp.auth)
      } else {
        this.set('failed', true)
      }
    })
  }
})
