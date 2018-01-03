import Vue from 'vue'
import store from './lightboxStore'
Vue.directive('lightbox', {
  bind (el, binding) {
    if (binding.expression) {
      const group = binding.expression
      store.addImage(el.getAttribute('href'), group)
      el.addEventListener('click', (e) => {
        e.preventDefault()
        store.open(el.getAttribute('href'), group)
      })
    }
  },
  update (el, binding) {
    const group = binding.expression
    store.remove('', group)
    binding.value.forEach((item) => {
      if (Object.prototype.toString.call(item) == '[object Object]') {
        store.addImage(item.url, group)
      } else {
        store.addImage('http://www.soouya.com' + item, group)
      }
    })
  },
  unbind (el, binding) {
    const group = binding.expression
    store.remove(el.getAttribute('href'), group)
  }
})
