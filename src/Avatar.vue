<template>
  <div v-el:avatar class="avatar" v-bind:style="style">
    <span v-if="!this.src">{{ userInitial }}</span>
  </div>
</template>

<script type="text/babel">
export default {

  props: {
    username: {
      type: String,
      required: true
    },
    initials: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: [String, Number],
      default: 50
    },
    src: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    borderRadius: {
      type: String
    },
    margin: {
      type: String
    },
    lighten: {
      type: Number,
      default: 80
    }
  },

  data () {
    return {
      backgroundColors: [
        '#F44336', '#FF4081', '#9C27B0', '#673AB7',
        '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
        '#4CAF50', '#8BC34A', '#CDDC39', /* '#FFEB3B' ,*/ '#FFC107',
        '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
    }
  },

  compiled () {
    this.$emit('avatar-initials', this.username, this.userInitial)
  },

  computed: {
    sizeValue () {
      return parseFloat(this.size)
    },

    sizeUnit () {
      if (typeof this.size === 'number') {
        return 'px'
      }
      return this.size.replace(/[.0-9]/g, '') || 'px'
    },

    background () {
      return this.backgroundColor ||
              this.randomBackgroundColor(this.username.length, this.backgroundColors)
    },

    fontColor () {
      return this.color || this.lightenColor(this.background, this.lighten)
    },

    isImage () {
      return this.src !== undefined && this.src !== ''
    },

    style () {
      const style = {
        flex: 'none',
        margin: this.margin || 0,
        width: `${this.sizeValue}${this.sizeUnit}`,
        height: `${this.sizeValue}${this.sizeUnit}`,
        borderRadius: this.borderRadius || (this.rounded ? '50%' : 0)
      }

      const imgBackgroundAndFontStyle = {
        background: `url(${this.src}) 0% 0% / 100% 100% no-repeat content-box`
      }

      const initialBackgroundAndFontStyle = {
        backgroundColor: this.background,
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        color: this.fontColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }

      const backgroundAndFontStyle = (this.isImage)
        ? imgBackgroundAndFontStyle
        : initialBackgroundAndFontStyle

      Object.assign(style, backgroundAndFontStyle)

      this.$nextTick(function () {
        this.setFontSize()
      })

      return style
    },

    userInitial () {
      const initials = this.initials || this.initial(this.username)

      this.$nextTick(function () {
        this.setFontSize()
      })

      return initials
    }
  },

  methods: {
    setFontSize () {
      if (!this.isImage) {
        const clientWidth = this.$els.avatar.clientWidth
        if (this.sizeUnit === 'em') {
          this.$els.avatar.style.width = `${clientWidth}px`
          this.$els.avatar.style.height = `${clientWidth}px`
        }
        this.$els.avatar.style.fontSize = `${clientWidth / this.userInitial.length}px`
      }
    },

    initial (username) {
      let parts = username.split(/[ -]/)
      let initials = ''

      for (var i = 0; i < parts.length; i++) {
        initials += parts[i].charAt(0)
      }

      if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
        initials = initials.replace(/[a-z]+/g, '')
      }

      initials = initials.substr(0, 3).toUpperCase()

      return initials
    },

    randomBackgroundColor (seed, colors) {
      return colors[seed % (colors.length)]
    },

    lightenColor (hex, amt) {
      // From https://css-tricks.com/snippets/javascript/lighten-darken-color/
      var usePound = false

      if (hex[0] === '#') {
        hex = hex.slice(1)
        usePound = true
      }

      var num = parseInt(hex, 16)
      var r = (num >> 16) + amt

      if (r > 255) r = 255
      else if (r < 0) r = 0

      var b = ((num >> 8) & 0x00FF) + amt

      if (b > 255) b = 255
      else if (b < 0) b = 0

      var g = (num & 0x0000FF) + amt

      if (g > 255) g = 255
      else if (g < 0) g = 0

      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    }
  }
}
</script>