# vue-avatar

An avatar component for vue.js.

This component display an avatar image and if none is provided fallback to the
user initials.  This component is highly inspired from
[react-user-avatar](https://github.com/wbinnssmith/react-user-avatar).

Rules used to compute user initials:
- divide the username on space and hyphen
- use the first letter of each parts
- never use more than three letters as initials
- if the username is divided in more than three parts and has part
  starting with an uppercase, skip parts starting with a lowercase.

You can find a few examples and the documentation [here](https://eliep.github.io/vue-avatar)

## Installation

`npm install vue-avatar`

## Usage
vue-avatar is a UMD module, which can be used as a module in both CommonJS and AMD modular environments.
When in non-modular environment, Avatar will be registered as a global variable.</p>

### ES6
```js

import Avatar from 'vue-avatar/dist/Avatar'

export default {
  ...
  components: {
    Avatar
  },
  ...
}
```
After that, you can use it in your templates:

```html
<avatar username="Jane Doe"></avatar>
```

### ES5
```js
var Vue = require('vue')
var Avatar = require('vue-avatar')

var YourComponent = Vue.extend({
  ...
  components: {
    'avatar': Avatar.Avatar
  },
  ...
})
```

### Browser

```
<script src="path/to/vue/vue.min.js"></script>
<script src="path/to/vue-avatar/dist/vue-avatar.min.js"></script>

new Vue({
  ...
  components: {
    'avatar': Avatar.Avatar
  },
  ...
})
```


## Props
<table class="table">
<thead><tr>
  <th>Name</th><th>Required</th><th>Default</th><th>Type</th><th>Description</th>
</tr></thead>
<tbody>
  <tr><td>username</td>
    <td> Y </td>
    <td> - </td>
    <td> String </td>
    <td>The user name that will be used to compute user initial.</td></tr>
  <tr><td>src</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>Path to the avatar image to display.</td></tr>
  <tr><td>backgroundColor</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>The avatar background color to use if no image is provided. If none
      is specified, a background color will be picked depending on
      the user name length.</td></tr>
  <tr><td>color</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>The font color used to render the user initials. If none
      is provided, the background color is used to compute
      the font color.</td></tr>
  <tr><td>:lighten</td>
    <td> N </td>
    <td> 80 </td>
    <td> Number </td>
    <td>A factor by which the background color must be lightened to
      produce the font color. Number between [-100,100].</td></tr>
  <tr><td>:size</td>
    <td> N </td>
    <td> 50 </td>
    <td> Number </td>
    <td>The avatar size in pixel.</td></tr>
  <tr><td>:rounded</td>
    <td> N </td>
    <td> true </td>
    <td> Boolean </td>
    <td>True if the avatar must be rounded.</td></tr>
</tbody>
</table>

## Build Setup
``` bash
# install dependencies
npm install

# serve gh pages with hot reload at localhost:8080/gh-pages
npm start

# build
npm run build
```
## Test
``` bash
npm test
```

## License

Released under the [MIT](LICENSE) License.
