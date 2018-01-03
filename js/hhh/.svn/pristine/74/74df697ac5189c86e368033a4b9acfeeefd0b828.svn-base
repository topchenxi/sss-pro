<template>
  <div class="oms-content">
    <el-dialog :title="title" v-model="status" custom-class="pop-table-wrap" :lock-scroll="true" :close-on-click-modal="false" @close="closeAddress" :size="tiny">
      <div class="main-wrap pl0 m0 bsn" v-if="result.length > 0 && !formFlag">
        <el-button type="primary" icon="plus" class="mb20" @click="addAddress()">新增收货地址</el-button>
        <div class="main-content">
          <div class="table-wrap">
            <table class="table">
              <colgroup>
                <col width="20%">
                <col width="15%">
                <col width="28%">
              </colgroup>
              <thead>
                <tr>
                  <th>收货人</th>
                  <th>联系方式</th>
                  <th>收货地址</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in result" :key="index" v-if="item">
                  <td class="ta-l"> {{item.name}}</td>
                  <td class="ta-l">{{item.tel}}</td>
                  <td class="ta-l">{{item.address}} <span class="sign" v-if="item.isDefault==1">默认</span></td>
                  <td>
                    <el-button class="table-btn" @click.native="goDetail(item)">选择</el-button>
                    <el-button class="table-btn submit" @click="editAddress(item)">修改</el-button>
                    <el-button class="table-btn" @click="deleteAddress(item)">删除</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="formFlag" class="address-form" label-width="120px">
        <el-form>
          <el-form-item label="收货人：" class="need">
            <el-input placeholder="" v-model="formData.name" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" class="need">
            <el-input placeholder="" v-model="formData.tel" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="所在地区：" :rules="{message:'省市区不能为空', trigger: 'blur', type:'array'}" prop="addressList" class="need">
            <el-cascader :options="proCity" v-model="formData.addressList" style="width: 320px">
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" class="need">
            <el-input placeholder="" v-model="formData.addr" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-row>
              <el-col style="margin-left: 50px;">
                <el-radio class="radio" v-model="formData.isDefault" :label="radioValue">设为默认地址</el-radio>
                <span style="margin-left: 5px;">（注：每次发单会使用该地址）</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="submit-btn ta-c">
            <el-button type="default" @click="cacnelForm()">取消</el-button>
            <el-button type="primary" @click="saveAddress()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { proCity } from 'common/proCityArea'
import {
  newRequest,
  formatTimeString
} from 'utils/tool'
import Api from 'api/allApi'
export default {
  props: {
    customerId: {
      type: String,
      required: true,
      default: function(a) {
        return ''
      }
    },
    showFlag: false,
  },
  data() {
    return {
      radioValue: 1,
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      dialogTableVisible: false,
      filters: {
        userId: ''
      },
      height: 500,
      result: [],
      status: this.showFlag,
      title: '请重新选择收货地址',
      proCity,
      formData: {
        name: '',
        tel: '',
        isDefault: 0,
        addr: '',
        area: '',
        city: '',
        province: '',
        addressList: [],
        sendCompany: '',
        sendTel: '',
        userId: '',
        haveSendCompany: 0
      },
      formFlag: false
    }
  },
  watch: {
    showFlag(val) {
      this.status = val
    }
  },
  updated() {},
  mounted() {
    this.filters.userId = this.customerId
    this.reqList()
  },
  methods: {
    closeAddress() {
      this.status = false
      this.$emit('closeAddress');
    },
    reqList(req = {}) {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: Api.Address.list,
        data: {
          userId: this.filters.userId,
        },
        contentType: 'application/json'
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.convertData(res.result)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    convertData(result) {
      result.map((item) => {
        item.createTime = formatTimeString(item.createTime)
        item.province = item.province ? item.province : ''
        item.city = item.city ? item.city : ''
        item.area = item.area ? item.area : ''
        item.address = item.province + item.city + item.area + item.addr
      })

      this.result = result
    },
    editAddress(row) {
      this.formFlag = true
      this.title = '编辑地址'
      this.formData = Object.assign({}, row)
      this.formData.addressList = [
        row.province && row.province.replace('省', ''),
        row.city && row.city.replace('市', ''),
        row.area && row.area.replace('区', '')
      ]
    },
    addAddress() {
      this.formFlag = true
      this.title = '新增地址'
    },
    deleteAddress(row) {
      this.$msgbox({
        title: '提示',
        message: '是否删除收货地址',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonText = '执行中...'
            instance.confirmButtonLoading = true
            newRequest({
              url: '/redwood/buyfollow/Address/delete',
              data: { id: row.id },
              contentType: 'application/json'
            }, (res) => {
              instance.confirmButtonText = '确定'
              instance.confirmButtonLoading = false
              if (res.success == '1') {
                this.reqList()
              } else {
                this.alert(res.msg)
              }
            })
            done && done()
          } else {
            done()
          }
        }
      }).then(action => {})
    },
    goDetail(row) {
      this.$emit('getInfo', row)
    },
    saveAddress() {
      let url = ''
      if (this.formData.id) {
        // 编辑
        url = '/redwood/buyfollow/Address/update'
      } else {
        url = '/redwood/buyfollow/Address/add'
        this.formData.userId = this.customerId
      }
      delete this.formData.address
      this.formData.province = this.formData.addressList[0]
      this.formData.city = this.formData.addressList[1]
      this.formData.area = this.formData.addressList[2]
      if (this.formData.name == '') {
        this.alert('请填写收货人')
        return false
      }
      if (this.formData.tel == '') {
        this.alert('请填写联系方式')
        return false
      }
      if (this.formData.provice == '' || this.formData.city == '') {
        this.alert('请选择所在地区')
        return false
      }
      if (this.formData.addr == '') {
        this.alert('请选择详细地址')
        return false
      }
      this.formData.haveSendCompany = 0
      newRequest({
        url: url,
        data: this.formData,
        contentType: 'application/json'
      }, (res) => {
        this.formFlag = false
        this.formData = {
          name: '',
          tel: '',
          isDefault: 0,
          addr: '',
          area: '',
          city: '',
          province: '',
          addressList: [],
          sendCompany: '',
          sendTel: '',
          userId: '',
          haveSendCompany: 0
        }
        if (res.success == 1) {
          this.reqList()
        } else {
          this.alert(res.msg)
        }
      });
    },
    alert(msg, type) {
      this.$message({
        type: type || 'error',
        message: msg,
        duration: 1500
      })
    },
    cacnelForm() {
      this.formFlag = false
      this.formData = {
        name: '',
        tel: '',
        isDefault: 0,
        addr: '',
        area: '',
        city: '',
        province: '',
        addressList: [],
        sendCompany: '',
        sendTel: '',
        userId: '',
        haveSendCompany: 0
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.sign {
  background: #2fb468 !important;
}

</style>
