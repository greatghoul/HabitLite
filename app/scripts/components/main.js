const md = window.markdownit()

const API_URL_BASE = 'https://habitica.com/api/v3'
const KEY_FOR_PARTY_MESSAGES = 'messages:party:v1'

Ractive.components.main = Ractive.extend({
  template: `
    <div class='party'>
      <div class="main">
        <div class="messages">
          {{#each messages as message}}
            <div class="message">
              <div class="meta">
                <span><strong>{{renderUsername(message)}}</strong></span>
                <span class="text-muted">{{renderTimeAgo(message.timestamp)}}</span>
              </div>
              <div class="body">
                {{{renderMessageText(message.text)}}}
              </div>
            </div>
          {{/each}}
        </div>
      </div>
      <div class="footer">
        <div class="left">
          <textarea></textarea>
        </div>
        <div class="right">
          <button>SEND</button>
        </div>
      </div>
    </div>
  `,

  data () {
    return {
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
    }
  },

  apiRequest (url, options) {
    const auth = this.get('auth')
    return window.fetch(`${API_URL_BASE}${url}`, {
      headers: {
        'x-api-user': auth.apiId,
        'x-api-key': auth.apiToken
      },
      ...options
    })
  },

  loadMessages () {
    let messages = lscache.get(KEY_FOR_PARTY_MESSAGES)
    if (messages) {
      this.renderMessages(messages)
    }

    this.apiRequest('/groups/party/chat')
      .then(res => res.json())
      .then(data => {
        messages = data.data.reverse()
        lscache.set(KEY_FOR_PARTY_MESSAGES, messages)
        this.renderMessages(messages)
      })
  },

  renderMessages (messages) {
    this.set('messages', messages)
    this.fire('messagesReady')
  },

  on: {
    complete () {
      this.loadMessages()
    },
    messagesReady () {
      const message = document.querySelector('.messages').lastChild
      message && message.scrollIntoView()
    }
  }
})
