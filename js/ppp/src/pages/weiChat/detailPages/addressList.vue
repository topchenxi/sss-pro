<template>
  <section>
    <title>收货地址管理</title>
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.5rem">
      <div class="addressList-box">
        <template v-for="(item, index) in result">
          <div class="address-box" :key="index">
            <div @click="confirmSelectAddr(index)" style="max-width:80%;">
              <span style="font-size: 1.5rem; color: #000;line-height:22px;">{{item.name}}</span>
              <span style="font-size: 1.5rem; color: #000;margin-left: 20px;line-height:22px;">{{item.tel}}</span>
              </br>
              <span style="line-height:22px;font-size: 1.3rem; color:#999;margin-top:10px;">{{item.province}}&nbsp{{item.city}}&nbsp{{item.area}}&nbsp{{item.addr}}</span>
            </div>
            <div>
              <template v-if="isAndroid">
                <div style="float:right;margin-right:0px;margin-top:-40px;padding: 10px;">
                  <img @click="delectAddr(index)" src="../../../assets/del@1x.png" width="18px"></img>
                </div>
                <div style="float:right;margin-right:0px;margin-top:-40px;padding: 10px;">
                  <img @click="editAddr(index)" src="../../../assets/edit@1x.png" width="17px"></img>
                </div>
              </template>
              <template v-else>
                <div style="float:right;margin-right:0px;margin-top:-40px;padding: 10px;">
                  <img @click="delectAddr(index)" src="../../../assets/del@1x.png" width="18px"></img>
                </div>
                <div style="float:right;margin-right:0px;margin-top:-40px;padding: 10px;">
                  <img @click="editAddr(index)" src="../../../assets/edit@1x.png" width="17px"></img>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </mt-loadmore>
    <el-button type="success" @click.native="handleNewAddress">新增收货人</el-button>
  </section>
</template>

<script>
import { MessageBox, Toast, Indicator } from 'mint-ui'
import request from '@/utils/request'
// import config from '../data.json'
// import getCache from '@/utils/getCache'
export default {
  data() {
    return {
      userId: '',
      result: [],
      isAndroid: false,
    }
  },
  mounted() {
    var u = navigator.userAgent.toLowerCase()
    this.isAndroid = (u.indexOf('android') > -1) // android终端
    const auth = JSON.parse(localStorage.getItem('weChatUser'))
    this.userId = auth.id
    this.getData()
  },
  methods: {
    getData() {
      // let res = config.addressList
      // this.result = res.result
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      request('/redwood/buyfollow/Address/list', {
        data: {
          userId: this.userId
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.result = res.result
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 2000
          })
        }
        Indicator.close()
      })
    },
    loadTop() {
      window.location.reload()
    },
    confirmSelectAddr(index) {
      let obj = this.result[index]
      sessionStorage.removeItem('selectAddr')
      sessionStorage.setItem('selectAddr', JSON.stringify(obj))
      this.$router.replace({ name: 'sendBulk', query: { status: '2' } })
    },
    editAddr(index) {
      let obj = this.result[index]
      sessionStorage.removeItem('editAddr')
      sessionStorage.setItem('editAddr', JSON.stringify(obj))
      this.$router.push({ name: 'editAddress', query: { status: '2', userId: this.userId } })
    },
    delectAddr(index) {
      MessageBox({
        title: '温馨提示',
        message: '确定删除地址?',
        showCancelButton: true
      }).then(action => {
        // 调用删除方法
        if (action != 'cancel') {
          request('/redwood/buyfollow/Address/delete', {
            data: {
              id: this.result[index].id
            },
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
            if (res.success == 1) {
              this.getData()
            } else {
              Toast({
                message: res.msg,
                position: 'bottom',
                duration: 2000
              });
            }
          })
        }
      })
    },
    handleNewAddress() {
      this.$router.push({ name: 'addAddress', query: { userId: this.userId } })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  background-color: #f9f9f9;
}

.addressList-box {
  padding-bottom: 20%;
  .address-box {
    padding: 15px 4% 15px 4%;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
}

.el-button {
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0px;
  height: 50px;
}
</style>
