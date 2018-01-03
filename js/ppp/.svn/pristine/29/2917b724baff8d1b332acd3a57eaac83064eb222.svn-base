<template>
  <!-- <Tab></Tab> -->
  <section>
    <title>下大货</title>
    <div class="bulkMsg-box">
      <div class="productNumber-box">
        <mt-field label="货号：" placeholder="请输入货号" v-model="reqParams.productNumber"></mt-field>
      </div>
      <div class="colorList-box">
        <div class="colorUnit-box">
          <span>色号：</span>
          <el-select v-model="reqParams.unit" placeholder="请选择">
            <el-option value="米" label="米"></el-option>
            <el-option value="码" label="码"></el-option>
            <el-option value="公斤" label="公斤"></el-option>
            <el-option value="千克" label="千克"></el-option>
          </el-select>
        </div>
        <div id="newColorId" style="padding: 10px 4% 10px 4%;background-color:#f9f9f9;width: 92%;">
          <img src="../../../assets/add@1x.png" width="25px" @click="newColor"></img>
          <span style="color:#08ce95;vertical-align:7px;" @click="newColor">增加色号</span>
        </div>
        <template v-for="(item, index) in reqParams.colors">
          <div class="color-box" :key="index">
            <div style="width: 80%; border-right: 1px solid #ddd;">
              <mt-field label="色号：" placeholder="请输入色号" v-model="item.color"></mt-field>
              <mt-field label="数量：" @input="calcTotalMoney" type="number" placeholder="请输入数量" v-model="item.quantity">{{reqParams.unit}}</mt-field>
              <mt-field label="单价：" @input="calcTotalMoney" type="number" placeholder="请输入单价" v-model="item.price">元/{{reqParams.unit}}</mt-field>
            </div>
            <img @click="delectColor(index)" src="../../../assets/delete@1x.png" width="30px" style="float:right; margin-top:-100px;margin-right:10px;"></img>
          </div>
        </template>
        <div @click="toSelectAddr" style="padding:12px 4% 12px 4%;background-color:#fff;margin-top:10px;">
          <span style="font-size: 1.6rem; color:#000;">收货地址：</span>
          <!-- 待增加参数 -->
          <el-button style="border:none;float:right;height:25px;padding:0px; width:80px;">
            <template v-if="this.reqParams.addressId">
              <span style="color:#08ce95">重新选择</span>
            </template>
            <i style="float:right" class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <template v-if="reqParams.addressId">
          <div class="address-box">
            <span style="font-weight:600;font-size:1.6rem">{{reqParams.addressName}}</span>
            </br>
            <span style="font-size:1.6rem; color:#000;">{{reqParams.addressTel}}</span>
            </br>
            <span style="font-size:1.3rem; color:#999;">{{reqParams.addressProvince}}&nbsp{{reqParams.addressCity}}&nbsp{{reqParams.addressArea}}&nbsp{{reqParams.addressAddr}}</span>
          </div>
        </template>
        <div style="padding:12px 4% 10px 4%;background-color:#fff;vertical-align:middle;margin-top:3px;" id="boxId">
          <!-- <mt-field id="remarkId" label="备注：" rows="2" type="textarea" v-model="reqParams.remark"></mt-field> -->
          <span id="remarkId" style="font-size: 1.5rem;">备注：</span>
          <el-input resize="none" v-model="reqParams.remark" id="inputId" type="textarea" @change="changePosition" @keyup.enter.native="changePosition" :autosize="{ minRows: 2, maxRows: 8 }" style="border-color:#fff;margin-left:50px;width:67%;"></el-input>
        </div>
        <div style="height: 100px;background-color:#f9f9f9"></div>
      </div>
    </div>
    <div class="btn-box">
      <div style="width:55%;" @click="inputVisible = true">
        <span>总计：
          <template v-if="inputVisible">
            <el-input type="number" style="width:50%;" autofocus @keyup.native="handleInputTotal" @blur="handleBlur" v-model="reqParams.totalMoney"></el-input>
          </template>
          <template v-else>
            <a style="color:#e63939">{{reqParams.totalMoney | formatNumber}}</a>
          </template>
        </span>
      </div>
      <el-button @click="orderConfirm" :disabled="checkOut()" style="border-radius:0px;border:0px; margin-top:-50px; height: 50px;width:40%; float:right;" type="success">下单</el-button>
    </div>
  </section>
</template>

<script>
import Tab from '../bottomTab.vue'
// import autosize from 'autosize'
import { MessageBox } from 'mint-ui'
export default {
  components: {
    Tab,
  },
  data() {
    return {
      scrollHeight: 0,
      inputVisible: false,
      reqParams: {
        productNumber: '',
        unit: '米',
        colors: [
        ],
        addressId: '',
        addressProvince: '',
        addressCity: '',
        addressArea: '',
        addressAddr: '',
        addressName: '',
        addressTel: '',
        totalMoney: 0,
        remark: '',
      }
    }
  },
  mounted() {
    const self = this
    window.onscroll = function() {
      self.scrollToTop()
    }
    this.changePosition()
    // autosize(document.querySelectorAll('textarea'))
    if (this.$route.query.status == 2) {
      let msg = JSON.parse(sessionStorage.getItem('bulkMsg'))
      this.reqParams = msg
      let obj = JSON.parse(sessionStorage.getItem('selectAddr'))
      // console.log(obj)
      this.reqParams.addressId = obj.id
      this.reqParams.addressName = obj.name
      this.reqParams.addressTel = obj.tel
      this.reqParams.addressProvince = obj.province
      this.reqParams.addressCity = obj.city
      this.reqParams.addressArea = obj.area
      this.reqParams.addressAddr = obj.addr
    }
    let msg = JSON.parse(sessionStorage.getItem('orderConfirm'))
    if (msg && msg.set) {
      this.reqParams = msg
    }
  },
  methods: {
    handleBlur() {
      // console.log('ss')
      this.inputVisible = false
    },
    handleInputTotal() {
      console.log(this.reqParams.totalMoney)
      if (Number(this.reqParams.totalMoney) > 10000000) {
        this.reqParams.totalMoney = 10000000
      }
      console.log(this.reqParams.totalMoney, '2')
    },
    orderConfirm() {
      let obj = JSON.stringify(this.reqParams)
      sessionStorage.removeItem('orderConfirm')
      sessionStorage.setItem('orderConfirm', obj)
      this.$router.push({ name: 'orderConfirm' })
    },
    newColor() {
      if (this.reqParams.colors.length < 20) {
        let list = {
          color: '',
          quantity: '',
          price: '',
        }
        this.reqParams.colors.push(list)
      } else {
        // console.log(this.reqParams.colors.length)
        MessageBox({
          title: '温馨提示',
          message: '一个订单中最多不得超过20个色号?'
        })
      }
    },
    delectColor(index) {
      MessageBox({
        title: '温馨提示',
        message: '确认删除该色号?',
        showCancelButton: true
      }).then(action => {
        if (action != 'cancel') {
          this.calcTotalMoney()
          this.reqParams.colors.splice(index, 1)
        }
      })
    },
    calcTotalMoney() {
      this.reqParams.totalMoney = 0
      this.reqParams.colors.forEach(item => {
        this.reqParams.totalMoney += Number(item.price) * Number(item.quantity)
      })
    },
    toSelectAddr() {
      let obj = JSON.stringify(this.reqParams)
      sessionStorage.removeItem('bulkMsg')
      sessionStorage.setItem('bulkMsg', obj)
      this.$router.push({ name: 'addressList' })
    },
    changePosition() {
      // console.log(document.getElementById('inputId'))
      let height = document.getElementById('inputId').offsetHeight
      height += 'px'
      document.getElementById('remarkId').style.lineHeight = height
      // console.log(height)
    },
    scrollToTop() {
      this.scrollHeight = document.body.scrollTop
      // console.log(document.body.scrollTop)
      if (this.scrollHeight > 100) {
        if (document.getElementById('newColorId')) {
          document.getElementById('newColorId').style.position = 'fixed'
          document.getElementById('newColorId').style.top = '0px'
          document.getElementById('newColorId').style.zIndex = 100
        }
      } else {
        if (document.getElementById('newColorId')) {
          document.getElementById('newColorId').style.position = 'static'
        }
      }
    },
    checkOut() {
      let bool = true
      let bool1 = false
      // console.log(this.reqParams, 'req')
      if (this.reqParams.productNumber && this.reqParams.addressId) {
        if (this.reqParams.colors.length) {
          this.reqParams.colors.forEach(item => {
            if (item.color && item.quantity && item.price) {
              // console.log(bool)
              bool = false
            } else {
              bool1 = true
            }
          })
        }
      }
      return (bool || bool1)
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'orderConfirm') {
      let obj = JSON.parse(sessionStorage.getItem('orderConfirm'))
      obj.set = true
      sessionStorage.removeItem('orderConfirm')
      sessionStorage.setItem('orderConfirm', JSON.stringify(obj))
    } else {
      if (sessionStorage.getItem('orderConfirm')) {
        let obj = JSON.parse(sessionStorage.getItem('orderConfirm'))
        obj.set = false
        sessionStorage.removeItem('orderConfirm')
        sessionStorage.setItem('orderConfirm', JSON.stringify(obj))
      }
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != 'addressList' && to.name != 'orderConfirm') {
      MessageBox({
        title: '温馨提示',
        message: '还未下单,确定要返回吗?',
        showCancelButton: true
      }).then(action => {
        if (action != 'cancel') {
          next()
        } else {
          this.$router.push({ name: 'sendBulk' })
        }
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  font-size: 1.3rem;
  background-color: #f9f9f9;
}

.el-icon-arrow-right {
  color: #999;
}

.bulkMsg-box {
  .productNumber-box {
    padding: 0px 4% 0px 1%;
    background-color: #fff; // border-bottom: 1px solid #ddd;
    font-size: 1.3rem;
    .mint-field {
      font-size: 1.6rem;
      height: 52px;
      text-decoration: none;
    }
  }
  .colorList-box {
    font-size: 1.3rem;
    .colorUnit-box {
      padding: 10px 4% 10px 4%;
      background-color: #fff;
      font-size: 1.6rem;
      .el-select {
        margin-left: 50px;
        width: 67%;
        border: none;
      }
    }
    .color-box {
      text-align: left;
      margin-top: 3px;
      padding: 10px 4% 10px 4%;
      background-color: #fff;
      &>span {
        font-size: 1.6rem;
        line-height: 2.5rem;
      }
      .mint-field {
        height: 52px;
        text-decoration: none;
      }
    }
  }
  .address-box {
    // margin-top: 3px;
    padding: 10px 4% 10px 4%;
    background-color: #fff;
    >span {
      line-height: 25px;
    }
  }
}

.btn-box {
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0px;
  padding: 0px 4% 0px 4%;
  font-size: 1.6rem;
  line-height: 50px;
  height: 50px;
  display: inline-block;
}
</style>
