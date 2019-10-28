const md = window.markdownit()

const API_URL_BASE = 'https://habitica.com/api/v3'

const HEADERS = {
  'x-api-key': '',
  'x-api-user': ''
}

const urlFor = endpoint => {
  return `${API_URL_BASE}${endpoint}`
}

Ractive({
  target: '#app',

  template: `
    <div>
      {{#if auth}}
        <main />
      {{else}}
        <loading />
      {{/if}}
    </div>
  `,

  data: {
    auth: null
  },

  on: {
    init () {
      this.fetchAuth()
    }
  },

  fetchAuth () {
    console.log('Fetching auth info')
  }
})
