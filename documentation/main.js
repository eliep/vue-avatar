import Vue from 'vue'
import Avatar from 'vue-avatar'

const png = '/static/darth-vader.png'

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
    markupLanguage: 'pug',
    dynamicSrc: null
  },

  methods: {
    initials: function (username, initials) {
      this.items.push({username: username, initials: initials})
    }
  },

  mounted () {
    let dynamicChangeSrc  = () => {
      this.dynamicSrc =  this.dynamicSrc ? null : png
      setTimeout(dynamicChangeSrc,2000)
    }
    dynamicChangeSrc()
  }
})
