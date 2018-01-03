<template>
  <section>
    <title>编辑地址</title>
    <!-- <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.3rem;"> -->
      <div class="newAddr-box">
        <div style="padding:10px 4% 10px 2%; background-color:#fff;">
          <mt-field label="姓名：" placeholder="请输入收货人姓名" v-model="reqParams.name"></mt-field>
        </div>
        <div style="padding:10px 4% 10px 2%; background-color:#fff;">
          <mt-field label="电话：" placeholder="请输入收货人手机号" v-model="reqParams.tel"></mt-field>
        </div>
        <div style="padding:15px 4% 15px 4%;background-color:#fff;">
          <div style="max-width: 85%;">
            <span style="font-size: 1.5rem; color:#000;">所在地区：
              <a style="font-size: 1.6rem">{{reqParams.province + ' ' + reqParams.city + ' ' + reqParams.area}}</a>
            </span>
          </div>
          <!-- 待增加参数 -->
          <el-button @click="showMAddress" style="border:none;float:right;height:25px;padding:0px; width:50px;postion:relative;margin-top: -22px;">
            <i style="float:right" class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <div style="padding:10px 4% 10px 2%; background-color:#fff;">
          <mt-field label="详细地址：" placeholder="街道、楼牌号" v-model="reqParams.addr"></mt-field>
        </div>
        <div style="margin-top:30px; text-align:center;position:static;">
          <el-button style="width:89.3%;height:48px;" type="success" :disabled="checkOut()" @click.native="handleSaveAddr">保存</el-button>
        </div>
      </div>
      <template v-if="mAddressVisible">
        <div style="width:100%;height:100%;position:fixed;background-color:#000;opacity:0.5;z-index: 100;top:0px;" @click="handleCancel"></div>
        <div style="position: fixed; bottom: 0px;width: 100%;padding-bottom:20px;z-index: 102;background-color:#fff;">
          <mAddress title="所在地区" :province="addr.province" :city="addr.city" :area="addr.area" @change="handleAddrChange"></mAddress>
          <el-button style="width: 40%;background-color:#08ce95;color:#fff;float:right;margin-top: 10px;margin-right:10px;" @click.native="handleConfirm">确定</el-button>
          <el-button style="width: 40%;background-color:#08ce95;color:#fff;float:left;margin-top: 10px;margin-left:10px;" @click.native="handleCancel">取消</el-button>
        </div>
      </template>
    <!-- </mt-loadmore> -->
  </section>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import mAddress from '../../../components/mobileAddress/index.vue'
import request from '@/utils/request'
export default {
  components: {
    mAddress,
  },
  data() {
    return {
      mAddressVisible: false,
      handSave: false,
      addr: {
        province: '',
        city: '',
        area: '',
      },
      reqParams: {
        userId: '',
        id: '',
        name: '',
        tel: '',
        province: '',
        city: '',
        area: '',
        addr: '',
      }
    }
  },
  mounted() {
    // 缺少uesrID
    this.reqParams.userId = this.$route.query.userId
    this.getData()
  },
  methods: {
    getData() {
      let obj = JSON.parse(sessionStorage.getItem('editAddr'))
      this.reqParams = obj
      // console.log(this.reqParams)
      this.addr.province = this.reqParams.province
      this.addr.city = this.reqParams.city
      this.addr.area = this.reqParams.area
    },
    handleSaveAddr() {
      // console.log(this.reqParams)
      request('/redwood/buyfollow/Address/update', {
        data: this.reqParams,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.hadSave = true
          window.history.go(-1)
          // this.$router.replace({ name: 'addressList' })
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000
          });
        }
      })
    },
    showMAddress() {
      this.mAddressVisible = true
    },
    handleAddrChange(val) {
      this.addr.province = val.addressProvince
      this.addr.city = val.addressCity
      this.addr.area = val.addressXian
    },
    handleConfirm() {
      this.reqParams.province = this.addr.province
      this.reqParams.city = this.addr.city
      this.reqParams.area = this.addr.area
      this.mAddressVisible = false
    },
    handleCancel() {
      this.mAddressVisible = false
      this.addr.province = ''
      this.addr.city = ''
      this.addr.area = ''
    },
    checkOut() {
      let bool = true
      if (this.reqParams.city && this.reqParams.province && this.reqParams.tel && this.reqParams.name && this.reqParams.addr) {
        bool = false
      }
      return bool
    },
    loadTop() {
      window.location.reload()
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.hadSave) {
      next()
    } else {
      let obj = JSON.parse(sessionStorage.getItem('editAddr'))
      let keys = Object.keys(this.reqParams)
      let bool = false
      keys.forEach(item => {
        if (this.reqParams[item] != obj[item]) {
          bool = true
        }
      })
      if (bool) {
        MessageBox({
          title: '温馨提示',
          message: '地址还未保存,确认要返回?',
          showCancelButton: true
        }).then(action => {
          if (action != 'cancel') {
            next()
          } else {
            this.$router.push({name: 'editAddress'})
          }
        })
      } else {
        next()
      }
    }
  }
}
</script>

<style>
.el-icon-arrow-right {
  color: #999;
}
</style>
