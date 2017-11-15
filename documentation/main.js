import Vue from 'vue'
import Avatar from 'vue-avatar'

/* eslint-disable no-new */
new Vue({
  el: '.container',
  components: {
    Avatar,
    rules: {
      props: ['items'],
      template: '<div>For example:' +
        '<ul id="example-1">' +
          '<li v-for="item in items"><b>{{ item.username }}</b> becomes <b>{{ item.initials }}</b></li>' +
        '</ul></div>'
    }
  },
  data: {
    items: [],
    markupLangs: ['pug', 'html'],
    markupLanguage: 'pug'
  },

  methods: {
    initials: function (username, initials) {
      this.items.push({username: username, initials: initials})
    }
  }
})
