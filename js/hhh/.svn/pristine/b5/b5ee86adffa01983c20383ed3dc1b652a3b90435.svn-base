import Vue from 'vue'
import store from './lightboxStore'
Vue.directive('lightbox', {
  bind (el, binding) {
    if (binding.expression) {
      let data = el.getAttribute('data')
      const group = data == undefined ? binding.expression : data
      store.addImage(el.getAttribute('href'), group)
      el.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.tagName.toLowerCase() == 'img') {
          store.open(el.getAttribute('href'), group)
        }
      })
    }
  },
  update (el, binding) {
    // const group = binding.expression
    // store.remove('', group)
    // console.log('binding', binding)
    // binding.value.forEach((item) => {
    //   if (Object.prototype.toString.call(item) == '[object Object]') {
    //     store.addImage(item.url, group)
    //   } else {
    //     store.addImage('http://www.soouya.com' + item, group)
    //   }
    // })
  },
  unbind (el, binding) {
    let data = el.getAttribute('data')
    const group = data || binding.expression
    store.remove(el.getAttribute('href'), group)
  }
})
