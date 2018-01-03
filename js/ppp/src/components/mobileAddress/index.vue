<template>
  <div class="mAddress-box">
    <mt-picker showToolbar :slots="addressSlots" class="picker" @change="onValuesChange" :visible-item-count="5">
      <div style="font-size:20px; text-align: center; color:#000;line-height: 40px">{{title}}</div>
    </mt-picker>
  </div>
</template>

<script>
import s from './address3.json'
export default {
  name: 'mAddress',
  props: ['province', 'city', 'area', 'title'],
  data() {
    return {
      addressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(s),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      form: {
        addressProvince: this.province,
        addressCity: this.city,
        addressXian: this.area,
      },
      index: {
        province: 0,
        city: 0,
        a: 0,
      },
      picker: '',
    }
  },
  watch: {
    form: {
      handler(val) {
        this.$emit('change', val)
      },
      deep: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addressSlots[0].defaultIndex = Object.keys(s).indexOf(this.province)
      this.picker.setValues([this.province, this.city, this.area])
      if (!this.province) {
        this.addressSlots[0].defaultIndex = 0
      }
    })
  },
  methods: {
    onValuesChange(picker, values) {
      this.picker = picker
      if (values[0]) {
        // console.log(values)
        let shi = Object.keys(s[values[0]])
        let index = shi.indexOf(values[1])
        let xian = s[values[0]][shi[index]]
        picker.setSlotValues(1, shi)
        // if (shi && shi.indexOf(this.city) != -1) {
        //   picker.setSlotValue(1, this.city)
        // }
        this.form.addressProvince = values[0]
        this.form.addressCity = values[1]
        this.form.addressXian = values[2]
        picker.setSlotValues(2, xian)
        // if (xian && xian.indexOf(this.area) != -1) {
        //   picker.setSlotValue(2, this.area)
        // }
      }
    }
  }
}
</script>

<style>

</style>
