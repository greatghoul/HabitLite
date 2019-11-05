Ractive.components.loading = Ractive.extend({
  template: `
    <div class="loading">
      {{renderMessage()}}
    </div>
  `,
  data () {
    return {
      renderMessage () {
        if (this.get('failed')) {
          return 'Please signin habitica first.'
        } else {
          return 'Loading'
        }
      }
    }
  }
})
