const reactive = new Ractive({
  target: '#app',
  template: `
    <div class="main">
      <div class="messages">
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
  data: {
  },
  oncomplete () {
    this.fire('loadMessages')
  }
})

reactive.on({
  loadMessages () {
  }
})

