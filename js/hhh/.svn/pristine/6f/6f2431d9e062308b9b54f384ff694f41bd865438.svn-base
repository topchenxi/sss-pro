<template>
  <div class="notify-list">
    <fliter :category="{name: 'date', condition: 'notifyPay'}" :params="filters" @getParams="search" />
    <div class="notify-table">
      <div v-for="(arr, index) in shopList">
        <p class="notify-title">
          <input type="checkbox" v-model="arr.checked" :id="index" @click="checkAll(arr, index)" />
          <label :for="index" style="padding-left: 5px; cursor: pointer">采购商：{{arr.buyerCompany}}</label>
          <template v-if="arr.buyerHasOpenedBaitiao">
          <el-tooltip class="item" effect="dark" content="已开通白条" placement="top-start">
            <img width="12px" height="12px" src="../../../assets/credit.png"></img>
          </el-tooltip>
          </template>
        </p>
        <div class="y_table_wrap mb">
          <el-table :data="arr.orderList" border style="width: 100%" :max-height="300" :key="arr">
            <el-table-column fixed width="50" inline-template>
              <div>
                <input type="checkbox" v-model="row.checked" @change="updateChecked(arr, index, index + 1)" />
              </div>
            </el-table-column>
            <el-table-column prop="serviceNumber" label="订单号" min-width="120"></el-table-column>
            <el-table-column prop="shopName" label="供应商名称" min-width="120"></el-table-column>
            <el-table-column label="大货类型" inline-template min-width="125">
              <div>
                <template v-if="row.type == '1'">服务单</template>
                <template v-if="row.type == '2'">贸易单</template>
              </div>
            </el-table-column>
            <el-table-column inline-template label="现货/期货" min-width="120">
              <div>
                <template v-if="row.productSource == '0'">现货</template>
                <template v-if="row.productSource == '1'">期货</template>
              </div>
            </el-table-column>
            <el-table-column label="货号/色号" min-width="120">
              <template scope="scope">
                <span>{{scope.row.productNumber}}</span>
                <template v-if="scope.row.colorList.length > 1">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" class="unnormal">
                      <p v-for="color in scope.row.colorList">{{color}}</p>
                    </div>
                    <el-button type="text" style="color: #20a0ff;">{{scope.row.colorList[0]}}</el-button>
                  </el-tooltip>
                </template>
                <template v-if="scope.row.colorList.length == 1">/{{scope.row.colorList[0]}}</template>
              </template>
            </el-table-column>
            <el-table-column inline-template label="已付定金" min-width="120">
              <div>
                <template v-if="row.fundType == 2 || row.fundType == 5">--</template>
                <template v-if="row.fundType == 3">{{row.earnestMoney | formateMoney}}</template>
              </div>
            </el-table-column>
            <el-table-column inline-template label="支付定金" min-width="120">
              <div>
                <template v-if="row.fundType == 2">{{row.earnestMoney | formateMoney}}</template>
                <template v-if="row.fundType == 3 || row.fundType == 5">--</template>
              </div>
            </el-table-column>
            <el-table-column inline-template label="支付尾款" min-width="120">
              <div>
                <template v-if="row.fundType == 2 || row.fundType == 5">--</template>
                <template v-if="row.fundType == 3">{{row.finalMoney | formateMoney}}</template>
              </div>
            </el-table-column>
            <el-table-column inline-template label="支付销售货款" min-width="120">
              <div>{{row.saleMoney | formateMoney}}</div>
            </el-table-column>
            <el-table-column prop="redwoodDescr" label="订单状态" min-width="120">
            </el-table-column>
            <el-table-column label="异常原因" min-width="120" show-overflow-tooltip>
              <template scope="scope">
                <!-- <el-popover trigger="hover" placement="top" v-if="scope.row.exceptionMsg && scope.row.exceptionMsg.length > 8">
                       <div style="width: 200px; max-height: 200px; overflow: auto;">{{scope.row.exceptionMsg}}</div>
                      <div slot="reference" class="name-wrapper">
                        <span>{{ scope.row.exceptionMsg | cutString}}..</span>
                      </div>
                    </el-popover>
                     <span v-if="scope.row.exceptionMsg && scope.row.exceptionMsg.length <= 8">{{ scope.row.exceptionMsg}}</span> -->
                {{ scope.row.exceptionMsg}}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300">
              <template scope="scope">
                <div class="operate">
                  <el-button size="small" v-if="scope.row.status !== 339 || !woodFollowLeader" @click.native="cancelDialog(scope.row)">取消</el-button>
                  <el-button size="small" type="primary" @click.native="rejectShop(scope.row)">打回采购</el-button>
                  <a :href="scope.row.editUrl" target="_blank">
                    <el-button type="primary" size="small">编辑</el-button>
                  </a>
                  <router-link :to="{name: 'orderDetail', query: { id: scope.row.reposityNumber, pathIndex: 7, orderNumber: scope.row.orderNumber, columnName: 'notifyPayView', fundType: scope.row.fundType }}">
                    <el-button class="o-btn" size="small" type="primary">详情</el-button>
                  </router-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="shopList.length == 0">
      没有数据啊^__^!!
    </div>
    <div class="showTotal clearfix">
      <p style="float: left; padding-top: 8px;">
        <span class="item">支付总计：
          <strong style="color: red;">{{countTotalMoney}}</strong>
        </span>
        <span class="item">采购商可用总额：
          <strong style="color: red;">{{buyerInfo.available | formateMoney}}</strong>
        </span>
        <span class="item">可用余额：
          <strong style="color: red;">{{buyerInfo.availableBalance | formateMoney}}</strong>
        </span>
        <span class="item">白条额度：
          <strong style="color: red;">{{buyerInfo.followerBaitiaoLine | formateMoney}}</strong>
        </span>
        <span class="item">可用白条额度：
          <strong style="color: red;">{{(buyerInfo.followerBaitiaoRemainLine) | formateMoney}}</strong>
        </span>
      </p>
      <p style="float: right;">
        <el-button type="primary" :disabled="!getId.choseArr.length" @click.native="notifyPay">通知付款</el-button>
      </p>
    </div>
    <!-- 通知付款 -->
    <el-dialog title="通知付款" v-model="dialogVisible" v-if="dialogVisible" custom-class="y-notifyPay-money">
      <div class="pay-content">
        <div class="pay-item">
          <h2>通知财务打款至供应商？</h2>
        </div>
        <div class="pay-item">
          <span class="pay-item-l" style="position: absolute; top: 0; left: 0;line-height: 36px;">采购商付款金额:</span>
          <el-input v-model="payedMoney" type="number" style="width: 300px; display: inline-block;margin-left: 120px;margin-bottom:8px"></el-input> 元
        </div>
        <div class="pay-item">
          <span class="pay-item-l" style="position: absolute; top: 0; left: 0;line-height: 28px">
            采购商付款凭据:
          </span>
          <div style="width: 300px; display: inline-block;margin-left: 120px;">
            <div class="showmadan">
              <a :href="item" :key="item" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" class="madan-wrap">
                <img :src="item" width='40' height="40" />
                <span @click="del(item)" class="del-arrow">X</span>
              </a>
            </div>
            <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="display:inline-block; width: auto; margin-bottom: 8px;" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="pay-item">
          <span class="pay-item-l" style="position: absolute; top: 0; left: 0;line-height: 36px;">通知付款备注:</span>
          <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;margin-left:120px;" v-model="remark"></textarea>
          <span>
            <b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/120字</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" @click.native="confirmNotifyPay">确 定</el-button>
      </span>
    </el-dialog>
  
    <el-dialog title="取消订单" v-model="cancelVisbile" size="tiny">
      <div>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请说明取消的原因，被取消的订单将不能继续交易" resize="none" v-model="content">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearTemData">取 消</el-button>
        <el-button type="primary" :disabled="String(content).length > 0 ? false : true" @click="cancelOrder">确 定</el-button>
      </span>
    </el-dialog>
  
    <lightbox />
  </div>
</template>

<script>
import Fliter from 'components/filter'
import allApi from 'api/allApi'
import Lightbox from 'components/lightbox/lightbox'
import lrz from 'lrz'
import {
  request,
  getCache,
  newRequest
  // extend,
  // setCache,
  // formatTimeString
} from 'utils/tool'
export default {
  data() {
    const auth = getCache({ key: 'currentUser' }).loginInfo
    return {
      shopList: [],
      dialogVisible: false,
      cancelVisbile: false,
      input: '',
      imgUrls: [],
      remark: '',
      imgPath: 'http://www.soouya.com',
      filters: {
        createTimeBegin: '',
        createTimeEnd: '',
        keyword: ''
      },
      temInfo: {},
      content: '',
      tempIndex: '', // 标志是否重新请求采购商的账户信息
      buyerInfo: {
        available: 0, // 可用总额
        availableBalance: 0, // 可用余额
        remainLine: 0, // 剩余额度
        creditLine: 0, // 授信总额  已用授信额度 = 授信总额 - 剩余额度
        baitiaoCreditLine: 0,
        baitiaoRemainLine: 0,
        followerBaitiaoRemainLine: 0,
        followerBaitiaoLine: 0,
      },
      woodFollowLeader: auth.woodFollowLeader
    };
  },
  mounted() {
    this._time = (new Date()).getTime()
    this.reqList()
  },
  components: {
    Fliter,
    Lightbox
  },
  watch: {
    remark(val) {
      if (String(val).length >= 120) {
        this.remark = val.slice(0, 120)
      }
    }
  },
  computed: {
    getId() {
      let choseArr = []
      let orderNumberList = []
      let buyerId = ''
      this.shopList.forEach((item) => {
        if (item.checked) {
          buyerId = item.buyerId
        }
        item.orderList.forEach((item) => {
          if (item.checked) {
            choseArr.push(item)
            orderNumberList.push(item.orderNumber)
          }
        })
      })
      return { choseArr, orderNumberList, buyerId }
    },
    leftnumber() {
      return 120 - Number(this.remark.length)
    },
    countTotalMoney() {
      let count = 0
      this.getId.choseArr.forEach((item) => {
        if (item.fundType == 2) { // 订金
          count += Number(item.earnestMoney)
        }
        if (item.fundType == 3) { // 尾款
          count += Number(item.finalMoney)
        }
        if (item.fundType == 5) { // 货款
          count += Number(item.saleMoney)
        }
      })
      if (this.buyerInfo.available < count) {
        return '￥' + Number(count).toFixed(2) + '   !'
      } else {
        return '￥' + Number(count).toFixed(2)
      }
    }
  },
  filters: {
    formateMoney(val) {
      if (String(val) == '0') {
        return '￥0.00'
      } else if (String(val) == '') {
        return '--'
      } else {
        return ('￥' + Number(val).toFixed(2))
      }
    },
    cutString(val) {
      return val && val.substring(0, 8)
    }
  },
  methods: {
    reqBuyerInfo() {
      if (this.getId.buyerId) {
        this.$store.dispatch('changeload', true)
        request({
          url: allApi.Account_Bill.CustomerAccount_getById + '?id=' + this.getId.buyerId,
          method: 'get'
        }, (res) => {
          this.$store.dispatch('changeload', false)
          if (res.success == 1) {
            // this.buyerInfo = {
            //   available: 12, // 可用总额
            //   availableBalance: 13, // 可用余额
            //   remainLine: 14, // 剩余额度
            //   creditLine: 29, // 授信总额  已用授信额度 = 授信总额 - 剩余额度
            // }
            this.buyerInfo = res.obj
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      } else {
        this.buyerInfo = {
          available: 0, // 可用总额
          availableBalance: 0, // 可用余额
          remainLine: 0, // 剩余额度
          creditLine: 0, // 授信总额  已用授信额度 = 授信总额 - 剩余额度
          baitiaoRemainLine: 0, // 剩余额度
          baitiaoCreditLine: 0, // 授信总额  已用授信额度 = 授信总额 - 剩余额度
          followerBaitiaoRemainLine: 0,
          followerBaitiaoLine: 0,
        }
      }
    },
    reqList(req = {}) {
      this.$store.dispatch('changeload', true)
      const reqs = Object.assign({}, { _time: this._time }, this.filters)
      const options = {}
      for (const key of Object.keys(reqs)) {
        if (reqs[key]) {
          options[key] = reqs[key]
        }
      }
      request({
        url: allApi.OrderProcess.listShoppingCart,
        data: {
          param: JSON.stringify(options)
        }
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          res.result.forEach((item) => {
            item.checked = false
            item.orderList.forEach((val) => {
              val.checked = false
              if (val.type == '1' || val.type == '2') {
                const host = location.host
                let webUrl = ''
                if (host == 'hspc.soouya.com') {
                  webUrl = 'http://localtestmhongshan.soouya.com/'
                } else if (host.indexOf('test') != -1) {
                  webUrl = 'http://testmhongshan.soouya.com/'
                } else {
                  webUrl = 'http://mhongshan.soouya.com/'
                }
                if (val.fundType == 2 || val.fundType == 5) {
                  val.editUrl = `${webUrl}/inputInfo.html?orderNumber=${val.orderNumber}&isEditOrNot=1&from=shopCartList`
                } else {
                  val.editUrl = `${webUrl}/inputFinal.html?orderNumber=${val.orderNumber}&isEditOrNot=1&from=shopCartList`
                }
              }
            })
          })
          this.shopList = []
          this.shopList = res.result
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    singleChoose(index, arr) {
      this.shopList.forEach((val, key) => {
        if (index != key) {
          val.checked = false
          val.orderList.forEach((item, indexKey) => {
            item.checked = false
          })
        }
      })
    },
    checkAll(arr, index) {
      // this.tempIndex = index
      if (this.shopList[index].checked) {
        this.shopList[index].orderList.forEach((item) => {
          item.checked = true
        })
      } else {
        this.shopList[index].orderList.forEach((item) => {
          item.checked = false
        })
      }
      this.reqBuyerInfo()
      this.singleChoose(index)
    },
    updateChecked(arr, index, markIndex) {
      let i = 0;
      arr.orderList.map((item) => {
        if (item.checked) {
          i++
        }
      })
      if (i > 0) {
        arr.checked = true
      } else {
        arr.checked = false
      }
      if (String(this.tempIndex) != String(index)) {
        this.reqBuyerInfo()
      }
      this.tempIndex = index // 顺序不能颠倒过来
      if (this.tempIndex == index && i == 0 && !arr.checked) {
        this.tempIndex = ''
        this.reqBuyerInfo()
      }
      this.singleChoose(index, arr)
    },
    search(params) {
      this.tempIndex = ''
      this.filters = Object.assign(this.filters, params)
      this.reqList()
    },
    // 取消弹窗
    cancelDialog(row) {
      this.cancelVisbile = true
      this.temInfo = row
    },
    cancelOrder() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/buyfollow/Order/cancel',
        contentType: 'application/json',
        data: {
          orderNumber: this.temInfo.orderNumber,
          content: this.content
        },
        method: 'post'
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          const self = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.reqList()
              self.clearTemData()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    beforeUpload(file) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
        quality: 1
      })
        .then(function (rst) {
          // 处理成功会执行
          rst.formData.append('field', 'imgUrl')
          request({
            url: '/redwood/sys/Common/uploadFile.do?type=1',
            method: 'post',
            data: rst.formData,
            dataType: 'FormData'
          }).then(data => {
            that.$store.dispatch('changeload', false)
            if (data.success === '1') {
              that.handleSuccess(data)
            } else {
              that.$alert(data.msg, '', {
                callback: action => {
                  return true
                }
              });
            }
          })
          return rst
        })
      return false
    },
    handleSuccess(file, fileList) {
      this.$store.dispatch('changeload', false)
      this.imgUrls.push(this.imgPath + file.imgUrl)
    },
    handleError(file, fileList) {
      this.$store.dispatch('changeload', false)
    },
    del(url) {
      this.imgUrls = this.imgUrls.filter((item, key) => item != url)
    },
    // 通知付款
    notifyPay() {
      this.payedMoney = ''
      this.dialogVisible = true
    },
    confirmNotifyPay() {
      this.$store.dispatch('changeload', true)
      const submitImgUrl = this.imgUrls.map((item) => { return item.replace(this.imgPath, '') })
      const options = {
        _time: this._time,
        remark: this.remark,
        imgUrlList: submitImgUrl,
        orderNumberList: this.getId.orderNumberList,
        buyerPayedMoney: this.payedMoney
      }
      newRequest({
        url: '/redwood/account/PayGroup/submitShoppingCart',
        contentType: 'application/json',
        data: options
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          const self = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose() {
              self.clearTemData()
              self.reqList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1500
          })
        }
      })
    },
    clearTemData() {
      this.dialogVisible = false
      this.imgUrls = []
      this.remark = ''
      this.content = ''
      this.cancelVisbile = false
      this.temInfo = {}
    },
    rejectShop(row) {
      this.$msgbox({
        title: '提示',
        message: '是否确认打回采购?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.postReject(row, done, instance)
          } else {
            done()
          }
        }
      }).then(action => { });
    },
    postReject(row, done, instance) {
      this.$store.dispatch('changeload', true)
      request({
        url: allApi.Order.sendbackToPurchaser,
        method: 'post',
        data: {
          param: JSON.stringify({
            orderNumber: row.orderNumber,
            _time: this._time
          })
        }
      }, (res) => {
        this.$store.dispatch('changeload', false)
        instance.confirmButtonLoading = false
        if (res.success == 1) {
          const self = this
          done && done()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.reqList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    }
  },
};
</script>

<style lang="scss">
.el-upload-list {
  display: none;
}

.notify-list {
  .notify-title {
    padding: 10px 10px;
    background: #fff;
  }
  .notify-table {
    padding-bottom: 50px;
  }
  .no-data {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #e4e4e4;
    margin-bottom: 10px;
    background: #fff;
    color: red;
  }
  .el-table td,
  .el-table th.is-leaf {
    background: #fff;
  }
  .el-table th>.cell {
    background: #fff;
  }
  .showTotal {
    position: fixed;
    bottom: 0;
    margin-left: 180px;
    left: 0;
    z-index: 1000;
    right: 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #afafaf;
    overflow: hidden;
    background-color: #ecf0f5;
    box-sizing: border-box;
    .item {
      padding-right: 30px;
    }
  }
  .mb {
    margin-bottom: 20px;
  }
  .operate {
    button {
      margin-right: 5px;
    }
  }
}

.y-notifyPay-money {
  min-width: 500px;
  .pay-content {
    min-width: 500px;
    .pay-item {
      position: relative;
      padding-bottom: 10px;
      .pay-item-l {
        width: 120px;
        display: inline-block;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
  .showmadan {
    float: left;
  }
  .madan-wrap {
    position: relative;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .del-arrow {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    top: -10px;
    right: -10px;
    background-color: #ccc;
    color: #fff;
    border: 1px solid #fff;
  }
}

.is-showCover {
  width: 100px;
  height: 100px;
}
</style>
