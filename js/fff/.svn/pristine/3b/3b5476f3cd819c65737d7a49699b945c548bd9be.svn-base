import Vue from 'vue'
import store from './lightboxStore'
Vue.directive('lightbox', {
  bind(el, binding) {
    if (binding.expression) {
      let data = el.getAttribute('data')
      const group = data == undefined ? binding.expression : data;
      // console.log('bs', binding.expression, data, group);
      store.addImage(el.getAttribute('href'), group)
      el.addEventListener('click', (e) => {
        e.preventDefault()
        store.open(el.getAttribute('href'), group)
      })
    }
  },
  update(el, binding) {
    // const group = binding.expression
    // store.remove('', group)
    // binding.value.forEach((item) => {
    //   if (Object.prototype.toString.call(item) == '[object Object]') {
    //     store.addImage('http://test.soouya.com' + item.imgUrl, group)
    //   } else {
    //     (store.addImage('http://test.soouya.com' + item, group))
    //   }
    // })
  },
  unbind(el, binding) {
    let data = el.getAttribute('data')
    const group = data || binding.expression
    store.remove(el.getAttribute('href'), group)
  }
})
