<!-- 地址选择组件 -->
<template>
  <el-form :model='form' class='demo-ruleForm' :rules='rules' ref='form' label-position='top'>
    <div class='address'>
      <div class="select-item">
        <el-form-item prop='province'>
          <el-select v-model='form.province' placeholder='请输入省' @change='proChange'>
            <el-option v-for='item in provinces' :key='item.value' :label="item.value" :value='item.value'>
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="select-item">
        <el-form-item prop='city'>
          <el-select v-model='form.city' placeholder='请输入市' @change='cityChange'>
            <el-option v-for='item in citys' :key='item.name' :label='item.name' :value='item.name'>
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="select-item">
        <el-form-item prop='area'>
          <el-select v-model='form.area' placeholder='请输入区'>
            <el-option v-for='item in areas' :key='item.name' :label='item.name' :value='item.name'>
            </el-option>
          </el-select>
        </el-form-item>
      </div>

    </div>
  </el-form>
</template>
<script>
import { addressData } from './city'
function formatData(data) {
  const result = []
  data && data.map((item) => {
    result.push({
      value: item.name
    })
  })
  return result
}
export default {
  name: 'address',
  props: ['province', 'city', 'area'],
  data() {
    return {
      rules: {
        province: [{ required: true, message: '请选择省份', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        area: [{ required: false, message: '请填写详细地址', trigger: 'change' }]
      },
      form: {
        province: this.province,
        city: this.city,
        area: this.area
      },
      provinces: formatData(addressData)
    }
  },
  mounted() { },
  watch: {
    province: {
      handler(val) {
        this.form.province = val
      }
    },
    city: {
      handler(val) {
        this.form.city = val
      }
    },
    form: {
      handler(val) {
        this.$emit('change', val);
      },
      deep: true
    }
  },
  computed: {
    citys() {
      for (let province of addressData) {
        if (this.form.province == province.name) {
          return province.sub
        }
      }
    },
    areas() {
      if (this.citys) {
        for (let city of this.citys) {
          if (this.form.city == city.name) {
            return city.sub
          }
        }
      }
    }
  },
  methods: {
    proChange(val, oldVal) {
      if (oldVal) {
        if (this.citys) {
          this.form.city = this.citys[1].name;
          this.form.area = '';
        } else {
          this.form.city = ''
          this.form.area = ''
        }
      }
      console.log(this.citys)
      if (this.citys) {
        if (this.citys.length == 1) {
          this.form.city = this.citys[0].name;
        } else {
          this.form.city = this.citys[1].name;
        }
      } else {
        this.form.city = ''
      }
    },
    cityChange(val, oldVal) {
      console.log(val, oldVal)
      this.form.area = '';
    }
  }
}
</script>
<style lang="scss">
.address .el-form-item {
  margin-bottom: 0!important;
  margin-right: 0!important;
}

.address {
  .select-item {
    display: inline-block;
    width: 104px;
  }
}
</style>
