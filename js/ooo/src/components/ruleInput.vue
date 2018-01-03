<template>
  <div :class="['rule-input',{'is-error':isShow}]">
    <input ref="input" :disabled="disabled" :type="type" class="el-input__inner" :value="value" @input="updateVal($event.target.value)">
    <span v-if="isShow" class="el-form-item__error">{{rule.message}}</span>
  </div>
</template>
<script>
export default {
  props: ['value', 'rule', 'type', 'disabled'],
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    updateVal(val) {
      this.test(val)
      this.$emit('input', val)
    },
    test(val) {
      this.isShow = this.rule.rule(val)
    }
  }
}
</script>
<style lang="scss">
.rule-input {
  position: relative;
  display: inline-block;
  margin-right: 5px;
  &.is-error {
    .el-input__inner {
      border-color: #ff4949;
    }
  }
}

.el-input__inner:disabled {
  background-color: #eef1f6;
  border-color: #d1dbe5;
  color: #bbb;
  cursor: not-allowed;
}

.el-form-item__error {
  white-space: nowrap;
}
</style>
