<template>
  <div class="y-input-wrap">
    <label v-if="label">{{ label }}</label>
    <input
      class="y-input"
      type="number"
      ref="input"
      :value="value"
      @input="updateValue($event.target.value)"
      @focus="selectAll"
      :disabled="disabled"
      @blur="formatValue"
    >
   </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String]
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: String,
      default: '4'
    }
  },
  mounted () {
    // this.formatValue()
  },
  methods: {
    updateValue (value) {
      const reg = /^\+?[0-9]\d{0,5}(\.\d{0,2})?$/
      const maxSize = this.max
      if (!reg.test(value)) {
        if (value.indexOf('.') > -1) {
          let valueArray = value.split('.')
          valueArray[0] = valueArray[0].slice(0, maxSize)
          valueArray[1] = valueArray[1].slice(0, 2)
          value = valueArray.join('.')
        } else {
          value = value.slice(0, maxSize)
        }
        this.$refs.input.value = value
      }
      this.$emit('input', Number(value))
    },
    formatValue: function () {
      if (this.value) {
        this.$refs.input.value = Number(this.value).toFixed(2)
      } else if (/[0]*/.test(this.value)) {
        this.$refs.input.value = 0
      }
    },
    selectAll (event) {
      event.target.select()
    }
  }
}
</script>

<style scoped>
.y-input-wrap {
  display: inline-block;
}
  .y-input {
    width: 200px;
    padding: .5em .6em;
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .y-input:focus {
    outline: 0;
    border-color: #129FEA;
  }
  .y-input[disabled] {
    cursor: not-allowed;
    background-color: #eaeded;
    color: #cad2d3;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"]{-moz-appearance:textfield;}
</style>
