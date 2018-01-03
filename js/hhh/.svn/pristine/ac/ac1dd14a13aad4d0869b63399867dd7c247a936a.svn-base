<template>
  <el-dialog title="添加收货地址" v-model="config.isShow" size="tiny">
    <el-form label-width="100px" ref="addressForm" :model="formData">
      <el-form-item label="姓名" :rules="{required: true, message:'档口名称不能为空', trigger: 'blur'}" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :rules="{required: true, message:'手机号格式不正确', trigger: 'blur',validator:validateSellerTel}" prop="tel">
        <el-input v-model="formData.tel"></el-input>
      </el-form-item>
      <el-form-item label="省市区" :rules="{required: true, message:'省市区不能为空', trigger: 'blur', type:'array'}" prop="sellerFullAddress">
        <el-cascader :options="proCity" v-model="formData.sellerFullAddress" @change="handleChange" style="width:100%">
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
import { proCity } from '../common/proCityArea'
import { request } from 'src/common/utils.js'

export default {
  props: ['config'],
  data() {
    return {
      proCity,
      formData: {
        name: '',
        tel: '',
        isDefault: 1,
        addr: '',
        sellerFullAddress: [],
        sellerTelType: '手机',
        sendCompany: '',
        sendTel: ''
      }
    }
  },
  methods: {
    handleChange() { },
    setAddress(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            url: '/redwood/buyfollow/Address/add',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
              name: this.formData.name,
              tel: this.formData.tel,
              province: this.formData.sellerFullAddress[0] || '',
              city: this.formData.sellerFullAddress[1] || '',
              area: this.formData.sellerFullAddress[2] || '',
              addr: this.formData.addr,
              userId: this.config.buyerId,
              // _time: +new Date(),
            })
          }).then((response) => {
            if (this.requestIsSuccess(response)) {
              this.$emit('selectedAddress', {
                addr: response.obj.addr,
                area: response.obj.area,
                city: response.obj.city,
                createTime: response.obj.createTime.time,
                editTime: response.obj.editTime.time,
                email: response.obj.email,
                haveSendCompany: response.obj.haveSendCompany,
                id: response.obj.id,
                isDefault: response.obj.isDefault,
                name: response.obj.name,
                province: response.obj.province,
                sendCompany: response.obj.sendCompany,
                sendTel: response.obj.sendCompany,
                tel: response.obj.tel,
                type: response.obj.type,
              })
              this.config.isShow = false
            }
          })
        }
      })
    },
    validateSellerTel(rule, value, callback) {
      if ((/^1[34578]\d{9}$/.test(value))) {
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
