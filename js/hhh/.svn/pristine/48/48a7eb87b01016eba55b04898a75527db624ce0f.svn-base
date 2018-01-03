function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

function broadcastBrother (componentName, eventName, params) {
  console.log('this.$parent', this.$parent)
  this.$parent.$children.forEach(child => {
    var name = child.$options._componentTag
    if (String(name) === String(componentName.toLowerCase())) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // broadcastBrother.call(child, componentName, eventName, params)
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    dispatch (componentName, eventName, params) { // 子传值与父通信 在子触发， 父定义事件
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast (componentName, eventName, params) { // 父传值与子通信 在父触发，子定义事件
      broadcast.call(this, componentName, eventName, params)
    },
    dispatchBrother (componentName, eventName, params) { // 兄弟之间通信，定义事件可随意
      broadcastBrother.call(this, componentName, eventName, params)
    }
  }
}
