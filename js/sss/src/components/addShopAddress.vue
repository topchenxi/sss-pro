<template>
  <el-dialog title="添加供应商" v-model="config.isShow" size="tiny">
    <el-form label-width="100px" ref="addressForm" :model="formData">
      <el-form-item label="档口名称" :rules="{required: true, message:'档口名称不能为空', trigger: 'blur'}" prop="company">
        <el-input v-model="formData.company"></el-input>
      </el-form-item>
      <el-form-item label="电话类型">
        <div style="text-align:left">
            <el-radio v-model="formData.telType" label="手机" @click.native="formData.tel = ['']"></el-radio>
            <el-radio v-model="formData.telType" label="固话" @click.native="formData.tel = ['','']"></el-radio>
        </div>
      </el-form-item>
      <el-form-item label="档口电话" :rules="{required: true, message:'档口电话格式错误', trigger:'blur', validator:validateTel}" prop="tel">
        <el-row type="flex">
          <template v-for="(item,index) in formData.tel">
            <template v-if="index != 0">
              <span style="margin:0 5px">-</span>
            </template>
            <el-input v-model="formData.tel[index]"></el-input>
          </template>
        </el-row>
      </el-form-item>
      <el-form-item label="省市区" :rules="{required: true, message:'省市区不能为空', trigger: 'blur', type:'array'}" prop="fullAddress">
        <el-cascader :options="proCity" v-model="formData.fullAddress" @change="handleChange" style="width:100%">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" :rules="{required: true, message:'详细地址不能为空', trigger: 'blur'}" prop="addr">
        <el-input v-model="formData.addr"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="config.isShow = false">取消</el-button>
      <el-button type="primary" @click="setAddress('addressForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { proCity } from 'common/proCityArea'
import { request } from 'src/common/utils.js'

export default {
  props: ['config'],
  data() {
    return {
      proCity,
      formData: {
        company: '',
        tel: [''],
        addr: '',
        fullAddress: [],
        telType: '手机',
      }
    }
  },
  methods: {
    handleChange() { },
    setAddress(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            url: '/redwood/sys/Shop/save',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
              _time: +new Date(),
              company: this.formData.company,
              province: this.formData.fullAddress[0] || '',
              city: this.formData.fullAddress[1] || '',
              area: this.formData.fullAddress[2] || '',
              addr: this.formData.addr,
              tel: this.formData.tel.join('-'),
            })
          }).then((response) => {
            if (this.requestIsSuccess(response)) {
              this.$emit('selectedAddress', response.obj)
              this.config.isShow = false
            }
          })
        }
      })
    },
    validateTel(rule, value, callback) {
      let tel = value.join('-')
      let isOk = false
      if (value.length === 1) {
        isOk = (/^1[34578]\d{9}$/.test(tel))
      } else {
        isOk = (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel))
      }
      if (isOk) {
        callback()
      } else {
        callback(new Error(rule.message))
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
