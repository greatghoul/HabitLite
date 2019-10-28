const md = window.markdownit()

const API_URL_BASE = 'https://habitica.com/api/v3'

const HEADERS = {
  'x-api-key': '',
  'x-api-user': ''
}

const urlFor = endpoint => {
  return `${API_URL_BASE}${endpoint}`
}

Ractive.components.loading = Ractive.extend({
  template: `
    <div class="loading">
      Loading
    </div>
  `,

  on: {
    init () {
      console.log('----')
    }
  }
})

Ractive.components.main = Ractive.extend({
  template: '#tpl-main',

  data: {
    auth: null,
    messages: [],
    renderUsername (message) {
      if (message.uuid === 'system') {
        return 'system'
      } else {
        return message.user
      }
    },
    renderMessageText (text) {
      return md.render(text)
    },
    renderTimeAgo (ts) {
      return moment(ts).fromNow()
    }
  },

  on: {
    complete () {
      this.fire('loadMessages')
    },
    scrollToBottom () {
      const message = document.querySelector('.messages').lastChild
      console.log('updated', message)
      message && message.scrollIntoView()
    },
    loadMessages () {
      fetch(urlFor('/groups/party/chat'), { headers: HEADERS })
        .then(res => res.json())
        .then(data => this.set('messages', data.data.reverse()))
        .then(() => this.fire('scrollToBottom'))
    }
  }
})

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
