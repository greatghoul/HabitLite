Ractive.components.main = Ractive.extend({
  template: `
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
