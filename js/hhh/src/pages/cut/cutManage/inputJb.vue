<template>
   <div class="input-jb-publish">
      <div class="jb-content" >
        <!-- 预览状态 -->
        <div style="padding-left: 10px; margin: 10px 0;">
          <div class="section">
             <div class="jb-content-buyer-info top-line clearfix">
               <span class="jb-info">采购商供应商信息</span>
             </div>
             <div class="jb-info-content clearfix">
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">订单号:</span>
                  </div>
                  <div class="line-item-r">
                      <div class="buyer-select-info">
                         <p>{{details.number}}</p>
                      </div>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">订单时间:</span>
                  </div>
                  <div class="line-item-r">
                      <div class="buyer-select-info">
                         <p>{{details.createTime | formatTime}}</p>
                      </div>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">采购商:</span>
                  </div>
                  <div class="line-item-r">
                      <div class="buyer-select-info">
                         <p>{{details.customerCompany}} {{details.customerTel}}</p>
                      </div>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l clearfix">
                    <span>收货地址:</span>
                  </div>
                  <div class="line-item-r">
                      {{details.addressName}} {{details.addressTel}} {{details.addressProvince}}{{details.addressCity}}{{details.addressArea}}{{details.addressAddr}}
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">供应商:</span>
                  </div>
                  <div class="line-item-r">
                      <div class="buyer-select-info">
                         <p>{{details.shopCompany}} {{details.shopTel}} {{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}</p>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="section" v-for="(value, key) in productNumbers" :key="key">
             <div class="jb-content-buyer-info top-line clearfix operate-wrap">
               <span class="jb-info" >货号({{key+1}})</span>
             </div>
             <div class="jb-info-content clearfix">
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">图片:</span>
                  </div>
                  <div class="line-item-r">
                    <div class="showmadan">
                      <a :name="index" :href="item" :key="item" v-lightbox:index="value.imgUrls" v-for="(item, index) in value.imgUrls" class="madan-wrap">
                        <img :src="item" width='40' height="40" />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span>品类:</span>
                  </div>
                  <div class="line-item-r">
                       {{value.category == 1 ? '面料' : '辅料'}}
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;"><b style="color: red;">*</b>货物信息:</span>
                  </div>
                  <div class="line-item-r">
                     <table class="pure-table pure-table-bordered fix-table fix-width" style="background: #fff; text-align: center; max-width: 700px;">
                         <thead>
                             <tr class="th">
                                 <th style="min-width:100px; width: 10%; text-align: center;">{{value.category == 1 ? '货号' : '品名'}}</th>
                                 <th style="min-width:100px; width: 10%; text-align: center;">{{value.category == 1 ? '色号' : '颜色'}}</th>
                                 <th style="min-width:150px; width: 10%; text-align: center;">单价</th>
                                 <th style="min-width:100px; width: 10%; text-align: center;">数量</th>
                                 <th style="min-width:100px; width: 10%; text-align: center;">采购数量</th>
                             </tr>
                         </thead>
                         <tbody>
                            <tr v-for="itemColor in value.colors">
                                <td><div style="padding: 10px 0;">{{value.number}}</div></td>
                                <td><div style="padding: 20px 0;">{{itemColor.color}}</div></td>
                                <td><div style="padding: 20px 0;"><el-input v-model="itemColor.cutterPriceMoney" type="number" size="small" style="width: 100px;"></el-input>{{itemColor.followerPriceUnit}}</div></td>
                                <td><div style="padding: 20px 0;">{{itemColor.followerQuantity}}{{itemColor.followerQuantityUnit}}</div></td>
                                <td><div style="padding: 20px 0;"><el-input v-model="itemColor.cutterQuantity" type="number" size="small" style="width: 100px;"></el-input>{{itemColor.followerQuantityUnit}}</div></td>
                            </tr>
                         </tbody>
                     </table>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span>跟单员留言:</span>
                  </div>
                  <div class="line-item-r">
                      <div style="max-width: 400px; word-break: break-word;">{{details.followerRemark}}</div>
                  </div>
                </div>

             </div>
          </div>
          <div class="section">
             <div class="jb-content-buyer-info top-line clearfix">
               <span class="jb-info">费用信息</span>
             </div>
             <div class="jb-info-content clearfix">
                <!-- <div class="line-item clearfix">
                  <div class="line-item-l clearfix">
                    <span>采购商是否需要发票:</span>
                  </div>
                  <div class="line-item-r">
                      <span v-if="needInvoice == 1">需要</span>
                      <span v-else>不需要</span>
                  </div>
                </div>
                <div class="line-item clearfix" v-if="needInvoice == 1">
                  <div class="line-item-l">
                    <span>采购商税率:</span>
                  </div>
                  <div class="line-item-r">
                      <span>{{taxPoint}}</span>
                  </div>
                </div> -->
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span>成本货款:</span>
                  </div>
                  <div class="line-item-r">
                      <div class="money-info clearfix">
                         <p class="money-info-item clearfix">
                           <span style="width: 100px; margin-right: 10px;" >{{costMoney}}</span>元
                         </p>
                         <!-- <p class="money-info-item clearfix">
                           <span class="money-info-ls">服务费:</span>
                           <span style="width: 100px; margin-right: 10px;" >{{serviceMoney}}</span>元
                         </p>
                         <p class="money-info-item clearfix"  v-if="needInvoice == 1">
                           <span class="money-info-l">税费:</span>
                           <span size="small" type="text" style="float:left; margin-top: 8px;margin-right: 10px;">
                             <b style="color:red; font-size: 18px; margin-right: 10px;">{{Number(taxMoney).toFixed(2)}}</b>元
                           </span>
                         </p>
                         <p class="money-info-item clearfix">
                           <span class="money-info-ls">总费用:</span>
                           <span style="float:left; margin-top: 8px;">
                             <b style="color:red; font-size: 18px; margin-right: 10px;">{{Number(totalMoney).toFixed(2)}}</b>元
                           </span>
                         </p> -->
                      </div>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;"><b style="color: red;">*</b>码单:</span>
                  </div>
                  <div class="line-item-r">
                    <div class="showmadan">
                      <a :name="index" :href="item" :key="item" v-lightbox="madanUrls" v-for="(item, index) in madanUrls" class="madan-wrap">
                        <img  :src="item" width='40' height="40" />
                        <span @click="del(item, key)" class="del-arrow">X</span>
                      </a>
                    </div>
                    <el-upload
                      action="/redwood/sys/Common/uploadFile.do"
                      :multiple="true"
                      :show-upload-list="false"
                      style="float: left; width: auto;"
                      :before-upload="beforeUpload"
                      :on-success="handleSuccess"
                      :on-error="handleError"
                    >
                    <div class="upImg" >+</div>
                    </el-upload>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">剪版员留言:</span>
                  </div>
                  <div class="line-item-r">
                    <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="cutterRemark"></textarea>
                    <span><b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/100字</span>
                  </div>
                </div>

                  <div style="text-align: center;">
                     <el-button @click.native="back">返回</el-button>
                     <el-button :disabled="isSubmit" type="primary" @click.native="save">保存</el-button>
                  </div>
            </div>
          </div>
        </div>
        <!-- 录入态结束 -->
        <lightbox />
   </div>
 </div>
</template>

<script>
import Lightbox from 'components/lightbox/lightbox'
import allApi from 'api/allApi'
import lrz from 'lrz'
import {
    getTaxMoney,
    getTotalMoney
} from 'utils/getMoney'
import {
    request,
    deepCopy,
    newRequest,
    // unique,
    // setCache,
    formatTimeString
}
from 'utils/tool'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      imgPath: 'http://www.soouya.com/',
      details: {},
      productNumbers: [],
      madanUrls: [],
      on: false,
      index: 1,
      costMoney: '',
      cutterRemark: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  computed: {
    isSubmit () {
      let on = false
      if (!this.madanUrls || this.madanUrls.length == 0) {
        on = true
      }
      this.productNumbers && this.productNumbers.length && this.productNumbers.forEach((item) => {
         item.colors && item.colors.forEach((val) => {
           if (String(val.cutterPriceMoney) == '' || String(val.cutterQuantity) == '') {
             on = true
           }
         })
      })
      return on
    },
    costMoney () {
      let total = 0
      this.productNumbers && this.productNumbers.length && this.productNumbers.forEach((item) => {
         let temTotal = 0
         item.colors && item.colors.forEach((val) => {
            temTotal += Number(val.cutterPriceMoney) * Number(val.cutterQuantity)
         })
         total += temTotal
      })
      return Number(total).toFixed(2)
    },
    leftnumber () {
      return 100 - String(this.cutterRemark).length
    },
  },
  watch: {
    productNumbers: {
      handler: function (val, oldVal) {
        let total = 0
        this.productNumbers && this.productNumbers.length && this.productNumbers.forEach((item) => {
           let temTotal = 0
           item.colors && item.colors.forEach((val) => {
              temTotal += Number(val.cutterPriceMoney) * Number(val.cutterQuantity)
           })
           total += temTotal
        })
        this.costMoney = total
      },
      deep: true
    },
    cutterRemark (val) {
      if (val.length >= 100) {
        this.cutterRemark = val.slice(0, 100)
      }
    }
  },
  filters: {
    formatTime (val) {
      return formatTimeString(val)
    }
  },
  methods: {
    getDetail () {
     this.$store.dispatch('changeload', true)
     const id = this.$route.query.id
     request({
         url: `${allApi.cut.cut}/${id}`,
         method: 'get',
         data: {}
     }, (res) => {
       this.$store.dispatch('changeload', false)
       if (res.success == 1) {
         this.details = res.obj
         this.productNumbers = res.obj.productNumbers
         this.productNumbers.forEach((item) => {
            if (item.category === null) {
             item.category = 0
           }
            item.imgUrls = item.imgUrls.map((val) => {
              val = (this.imgPath + val)
              return val
            })
         })
         if (res.obj.madanUrls && res.obj.madanUrls.length > 0) {
           res.obj.madanUrls = res.obj.madanUrls.map((item) => {
              item = this.imgPath + item
              return item
           })
         } else {
           res.obj.madanUrls = []
         }
         this.madanUrls = res.obj.madanUrls
         this.costMoney = res.obj.costMoney
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
          url: '/redwood/sys/Common/uploadFile.do?type=5',
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
    handleSuccess (file, fileList) {
      this.$store.dispatch('changeload', false)
      this.madanUrls.push(this.imgPath + file.imgUrl)
    },
    handleError (file, fileList) {
      this.$store.dispatch('changeload', false)
    },
    del (url) {
      this.madanUrls = this.madanUrls.filter(item => item != url)
    },
    back () {
      this.$confirm('点击返回已填写的信息将会丢失，是否确认返回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {
      })
    },
    save () {
      const posTmadanUrl = deepCopy(this.madanUrls).map(item => item.replace(this.imgPath, ''))
      const productNumbers = deepCopy(this.productNumbers).map((item) => {
        item.imgUrls = item.imgUrls.map(val => {
          val = val.replace(this.imgPath, '')
          return val
        })
        item.colors = item.colors.map((val) => {
          val.followerPriceMoney = parseFloat(val.followerPriceMoney)
          val.followerQuantity = parseFloat(val.followerQuantity)
          val.cutterPriceMoney = parseFloat(val.cutterPriceMoney || 0)
          val.cutterQuantity = parseFloat(val.cutterQuantity || 0)
          val.cutterPriceUnit = val.followerPriceUnit
          val.cutterQuantityUnit = val.followerQuantityUnit
          return val
        })
        return item
      })
      let costMoney = Number(this.costMoney)
      let serviceMoney = Number(this.details.serviceMoney)
      let taxPoint = Number(this.details.taxPoint)
      // 税率
      // let taxMoney = this.details.needInvoice == 1 ? Number(((Number(this.costMoney) + Number(this.details.serviceMoney)) * Number(this.details.taxPoint) * 0.01).toFixed(2)) : 0
      let taxMoney = this.details.needInvoice == 1 ? getTaxMoney(costMoney, serviceMoney, taxPoint) : 0
      // 总价
      // let totalMoney = Number((Number(this.costMoney) + Number(this.details.serviceMoney) + Number(taxMoney)).toFixed(2))
      let totalMoney = getTotalMoney(costMoney, serviceMoney, taxMoney)
      const obj = {
        productNumbers,
        madanUrls: posTmadanUrl,
        totalMoney,
        costMoney: Number(Number(this.costMoney).toFixed(2)),
        taxMoney,
        cutterRemark: this.cutterRemark
      }
      this.$store.dispatch('changeload', true)
      newRequest({
        url: `${allApi.cut.cut}/${this.$route.query.id}?_function=input`,
        method: 'put',
        contentType: 'application/json',
        data: obj
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          const self = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose () {
              self.$router.go(-1)
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
  update () {
  }
};
</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
  .input-jb-publish {
    .jb-title {
      font-size: 18px;
      font-weight: normal;
    }
    .jb-progress {
      padding-top: 20px;
      text-align: center;
    }
    .el-upload-list {
      display: none;
    }
    .bot-line {
      position: relative;
      &:after {
        position: absolute;
        display: block;
        content: '';
        height: 2px;
        width: 100%;
        // top: 35px;
        background: #bfcbd9;
      }
    }
    .top-line {
      position: relative;

      &:before {
        position: absolute;
        display: block;
        content: '';
        height: 2px;
        width: 100%;
        // top: 36px;
        background: #bfcbd9;
      }
    }

    .jb-info {
      float: left;
      width: 150px;
      padding: 10px 0;
      background:#20a0ff; text-align: center; color: #fff;
    }
    .jb-info-content {
       padding-bottom: 20px;
      .line-item {
        margin-bottom: 10px;
        .line-item-l {
          float: left;
          font-size: 14px;
          width: 146px;
          text-align: right;
          padding-right: 10px;
        }
        .radio-tit {
          padding-top: 5px;
        }
        .line-item-r {
          font-size: 14px;
          min-width: 500px;
          float: left;
        }
        .buyer-select-info {
          p {
            padding: 10px 0;
          }
        }
        .mark {
          color: red;
        }
      }
    }
    .product-list {
      .pro-title {
        position: relative;
        top: 10px;
        float: left;
        margin-right: 10px;
      }
      .pro-list-item {
       float:left; margin-right: 20px;
      }
    }
    .jb-content-buyer-info {
      margin-bottom: 10px;

    }
    .operate-wrap {
      .operate {
        float: right;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #20a0ff;
        border-radius: 50%;
        cursor: pointer;
        color: #fff;
        &:hover {
          color: #000;
          background: #0c95fb;
        }
      }
      .add {
        margin-right: 20px;
      }
      .plus {
        background: #FF4949;
        &:hover {
          color: #000;
          background: #FF4949;
        }
      }
    }
    .jb-content-title {
      margin: 30px 0;
    }
    .showmadan {
      float: left;
      .madan-wrap {
        position: relative;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
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
    .upImg {
      float:left;
      width: 42px;
      height: 42px;
      line-height: 42px;
      background: #ccc;
      text-align: center;
      color: #fff;
      font-size: 40px;
      cursor: pointer;
      &:active {
        background: #999;
      }
    }
    .money-info {
      .money-info-ls {
        float: left;
        width: 100px;
      }
      .money-info-item {
        margin-bottom: 10px;
      }
    }



  }
</style>
