import Vue from 'vue'
import { mount } from '@vue/test-utils'

import Avatar from 'src/Avatar'

describe('Avatar.vue', function () {
  it('should divide name in parts on both space and hyphen', function () {
    expect(Avatar.methods.initial('Hubert Felix')).to.equal('HF')
    expect(Avatar.methods.initial('Hubert-Felix')).to.equal('HF')
    expect(Avatar.methods.initial('Hubert-Felix Thiefaine')).to.equal('HFT')
  })

  it('should use only the first letter of each name parts (up to three)', function () {
    expect(Avatar.methods.initial('Hubert-Felix De La Rochefoucault')).to.equal('HFD')
  })

  it('should use only the uppercase letter (up to three) if the name has more than three parts', function () {
    expect(Avatar.methods.initial('Hubert de la Rochefoucault')).to.equal('HR')
    expect(Avatar.methods.initial('Hubert-Felix de la Rochefoucault')).to.equal('HFR')
  })

  it('should use lowercase letter (up to three) if the name has no uppercase', function () {
    expect(Avatar.methods.initial('hubert de rochefoucault')).to.equal('HDR')
    expect(Avatar.methods.initial('hubert-felix de la rochefoucault')).to.equal('HFD')
  })

  it('should use both uppercase and lowercase letter if name has three parts or less', function () {
    expect(Avatar.methods.initial('Hubert de Rochefoucault')).to.equal('HDR')
  })

  it('should render initials if no \'src\' is given', function () {
    const username = 'Hubert-Félix'

    const vm = new Vue({
      template: '<div><avatar username="' + username + '"></avatar></div>',
      components: { Avatar }
    }).$mount()

    const initial = vm.$children[0].initial(username)
    expect(initial).to.equal('HF')
    expect(vm.$el.querySelector('.vue-avatar--wrapper > span').textContent).to.contain(initial)
  })

  it('should use provided parser to render initials if \'parser\' is provided', function () {
    const username = 'Dr. John Smith'
    const parser = (name) => name[4]

    const vm = new Vue({
      template: `<div><avatar username="${username}" :parser="${parser.toString()}"></avatar></div>`,
      components: { Avatar }
    }).$mount()

    const initial = parser(username)
    expect(initial).to.equal('J')
    expect(vm.$el.querySelector('.vue-avatar--wrapper > span').textContent).to.equal(initial)
  })

  it('should be able to use default parser in custom parser', function () {
    const username = 'Dr. John Smith'
    const parser = (name, getInitials) => getInitials(name.slice(3))

    const vm = new Vue({
      template: `<div><avatar username="${username}" :parser="${parser.toString()}"></avatar></div>`,
      components: { Avatar }
    }).$mount()

    const initial = parser(username, Avatar.methods.initial)
    expect(initial).to.equal('JS')
    expect(vm.$el.querySelector('.vue-avatar--wrapper > span').textContent).to.equal(initial)
  })

  it('should render an image with the correct \'src\' when given', function () {
    const username = 'Hubert-Félix'
    const wrapper = mount(Avatar, { propsData: {
      username: username,
      src: 'path/to/img'
    } })

    const backgroundImage = wrapper.element.style.backgroundImage
    expect(backgroundImage).to.contain('path/to/img')
    expect(wrapper.element.querySelector('.vue-avatar--wrapper > span').textContent).not.to.contain('HF')
  })

  it('should render initials if the \'src\' does not load', function () {
    var username = 'Hubert-Félix'

    const wrapper = mount(Avatar, { propsData: {
      username: username,
      src: 'path/to/img'
    } })
    wrapper.setData({ imgError: true })

    expect(wrapper.element.querySelector('.vue-avatar--wrapper > span').textContent).to.contain('HF')
  })
})
