<template>
  <el-dialog v-model="config.isShow" title="添加地址" :visible.sync="saveAddressShow" custom-class="pop-table-wrap" :lock-scroll="true" size="tiny">
    <el-form label-width="100px" ref="shopForm" :model="saveAddressData">
      <el-form-item label="收货人姓名" :rules="{required: true, message:'收货人姓名不能为空', trigger: 'blur'}" prop="name">
        <el-input v-model="saveAddressData.name"></el-input>
      </el-form-item>
      <el-form-item label="收货人电话" :rules="{required: true, message:'收货人电话不能为空', trigger: 'blur'}" prop="tel">
        <el-input v-model="saveAddressData.tel"></el-input>
      </el-form-item>
      <el-form-item label="省市区" :rules="{required: true, message:'省市区不能为空', trigger: 'blur', type:'array'}" prop="fullAddress">
        <el-cascader :options="proCity" v-model="saveAddressData.fullAddress" style="width:100%">
        </el-cascader>
      </el-form-item>
      <el-form-item label="收货地址" :rules="{required: true, message:'收货地址不能为空', trigger: 'blur'}" prop="addr">
        <el-input v-model="saveAddressData.addr"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click.native="close">取消</el-button>
      <el-button type="primary" @click="saveAddress('shopForm')">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { proCity } from 'components/proCityArea'
import { newRequest } from 'utils/tool'
export default {
  props: ['config'],
  watch: {
  },
  data() {
    return {
      proCity,
      saveAddressData: {
        fullAddress: []
      },
    }
  },
  methods: {
    saveAddress(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          newRequest({
            url: '/redwood/buyfollow/Address/add',
            contentType: 'application/json',
            method: 'POST',
            data: {
              _time: +new Date(),
              userId: this.config.id,
              name: this.saveAddressData.name,
              tel: this.saveAddressData.tel,
              province: this.saveAddressData.fullAddress[0] || '',
              city: this.saveAddressData.fullAddress[1] || '',
              area: this.saveAddressData.fullAddress[2] || '',
              addr: this.saveAddressData.addr,
              haveSendCompany: 0
            }
          }).then((response) => {
            if (response.success == '1') {
              // console.log(response)
              this.$emit('success');
              this.config.isShow = false
            } else {
              this.$message({
                type: 'error',
                message: response.msg,
                duration: 1500
              })
            }
          })
        }
      })
    },
    close() {
      this.config.isShow = false
    }
  }
}
</script>

<style scoped>
span>strong {
  color: #f00;
}
</style>

