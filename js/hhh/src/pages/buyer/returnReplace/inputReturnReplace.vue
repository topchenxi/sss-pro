<template>
  <div class="input-returnReplace">
    <el-row>
      <el-button @click.native="$router.go(-1)" type="primary">返回</el-button>
    </el-row>
    <div class="detial-wrap">
      <div class="block clearfix">
         <div class="block-title">订单信息</div>
         <div style="margin-left: 10px;">
           <el-table :data="[orderDetail]" border style="width: 100%;">
             <el-table-column  align="center" prop="serviceNumber" label="订单号" min-width="120"></el-table-column>
             <el-table-column  align="center" label="订单类型" min-width="120">
                <template scope="scope">
                  {{scope.row.type == 1 ? '服务单 ' : '贸易单'}}
                </template>
             </el-table-column>
             <el-table-column  align="center" prop="company" label="采购商" min-width="120"></el-table-column>
             <el-table-column  align="center" label="供应商" min-width="120">
                <template scope="scope">
                  {{scope.row.seller && scope.row.seller.company}}
                </template>
             </el-table-column>
             <el-table-column  align="center" label="原订单总金额" min-width="120">
               <template scope="scope">
                 {{Number(scope.row.saleMoney).toFixed(2)}}
               </template>
             </el-table-column>
           </el-table>
           <div class="section clearfix">
             <div class="section_item section_l">
               <span>采购商备注</span>
             </div>
             <div class="section_item section_r">
               {{orderDetail.leaveMessage}}
             </div>
           </div>
           <div class="section clearfix">
             <div class="section_item section_l">
               <span>货源</span>
             </div>
             <div class="section_item section_r">
               {{(orderDetail.productSource == 0) ? '现货' : '订货'}}
             </div>
           </div>
           <div class="section clearfix">
             <div class="section_item section_l">
               <span>配送方式</span>
             </div>
             <div class="section_item section_r">
               {{(orderDetail.sendType == 0) ? '搜芽配送' : '采购商自提'}}
             </div>
           </div>
         </div>
      </div>
<!-- 退换货信息 -->
      <div class="block clearfix">
         <div class="block-title">退换货信息</div>
         <div style="margin-left: 10px;">
           <div class="section clearfix">
             <div class="section_item section_l">
               <span>换货类型</span>
             </div>
             <div class="section_item section_r">
               {{returnReplaceDetail.type == 2 ? '换货' : '售后换货'}}
             </div>
           </div>
           <div class="section clearfix">
             <div class="section_item section_l">
               <span>换货原因</span>
             </div>
             <div class="section_item section_r">
               {{returnReplaceDetail.reason}}
             </div>
           </div>
           <div class="section clearfix">
             <div class="section_item section_l">
               <span>换货明细</span>
             </div>
             <div class="section_item section_r" v-if="returnReplaceDetail.colorList">
              <el-table :data="returnReplaceDetail.colorList" border style="width: 100%">
                <el-table-column  align="center" prop="productNumber" label="货号" min-width="120"></el-table-column>
                <el-table-column  align="center" prop="color" label="色号" min-width="120"></el-table-column>
                <!-- <el-table-column  align="center" label="销售单价" min-width="120">
                  <template scope="scope">
                    <span v-if="scope.row.salePrice != ''">{{scope.row.salePrice}}{{scope.row.salePriceUnit}}</span>
                  </template>
                </el-table-column> -->
                <el-table-column  align="center" label="成本价(含税)" min-width="120">
                  <template scope="scope">
                    {{scope.row.priceWithTax == undefined?'':scope.row.priceWithTax.toFixed(2)}}{{scope.row.priceUnit}}
                  </template>
                 </el-table-column>
                 <el-table-column  align="center" label="供应商税点" min-width="120">
                   <template scope="scope">
                     <span v-if="scope.row.taxPoint != ''">{{scope.row.sellerTaxPoint}}%</span>
                   </template>
                 </el-table-column>
                 <el-table-column  align="center" label="成本价(不含税)" min-width="120">
                  <template scope="scope">
                    {{scope.row.price== undefined?'':scope.row.price.toFixed(2)}}{{scope.row.priceUnit}}
                  </template>
                 </el-table-column>
                <!-- <el-table-column  align="center" label="退换货入仓总数" min-width="150">
                 <template scope="scope">
                   {{scope.row.clothLoneList | countTotal}}{{scope.row.quantityUnit}}/{{scope.row.clothLoneList && scope.row.clothLoneList.length}}匹
                 </template>
                </el-table-column> -->
                <el-table-column  align="center" label="换货匹号" show-overflow-tooltip min-width="120">
                   <template scope="scope">
                      {{scope.row.clothLoneList | showPiHao}}
                   </template>
                </el-table-column>
                <el-table-column  align="center" label="换货原数" min-width="120">
                   <template scope="scope">
                    {{scope.row.clothLoneList | countTotal}}{{scope.row.quantityUnit}}
                   </template>
                </el-table-column>
              </el-table>
             </div>
           </div>
         </div>
      </div>

      <div class="block clearfix">
         <div class="block-title">录入换货信息</div>
         <div style="margin-left: 10px;">
           <div class="section clearfix">
             <div class="section_item section_l">
               <span style="position: relative; top: 20px;">上传码单</span>
             </div>
             <div class="section_item section_r">
              <div class="showmadan">
                <a :href="item" :key="item" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" class="madan-wrap">
                  <img  :src="item" width='40' height="40" />
                  <span @click="del(item)" class="del-arrow">X</span>
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
              <div class="upImg">+</div>
              </el-upload>
             </div>
           </div>
           <div class="section clearfix">
             <div class="section_item section_l">
               <span><b style="color:red;">*</b>货物信息</span>
             </div>
             <div class="section_item section_r" v-if="colorList">
                <el-table :data="colorList" border style="width: 100%">
                  <el-table-column  align="center" prop="productNumber" label="货号" min-width="120"></el-table-column>
                  <el-table-column  align="center" prop="color" label="色号" min-width="120"></el-table-column>
                  <!-- <el-table-column  align="center" label="销售单价" min-width="120">
                    <template scope="scope">
                      {{scope.row.salePrice}}{{scope.row.salePriceUnit}}
                    </template>
                  </el-table-column> -->

                  <el-table-column  align="center" label="成本价(含税)" min-width="120">
                 <template scope="scope">
                   {{scope.row.priceWithTax == undefined?'':scope.row.priceWithTax.toFixed(2)}}{{scope.row.priceUnit}}
                 </template>
                </el-table-column>
                <el-table-column  align="center" label="供应商税点" min-width="120">
                  <template scope="scope">
                    {{scope.row.sellerTaxPoint}}%
                  </template>
                </el-table-column>
                <el-table-column  align="center" label="成本价(不含税)" min-width="120">
                 <template scope="scope">
                   {{scope.row.price == undefined?'':scope.row.price.toFixed(2)}}{{scope.row.priceUnit}}
                 </template>
                </el-table-column>
                  <!-- <el-table-column  align="center" label="退换货入仓总数" min-width="150">
                   <template scope="scope">
                    {{scope.row.clothLoneList | countTotal}}{{scope.row.quantityUnit}}/{{scope.row.clothLoneList && scope.row.clothLoneList.length}}匹
                   </template>
                  </el-table-column> -->
                  <el-table-column  align="center" label="换货匹号" min-width="120" show-overflow-tooltip>
                      <template scope="scope">
                         {{scope.row.clothLoneList | showPiHao}}
                      </template>
                  </el-table-column>
                  <el-table-column  align="center" label="换货原数" min-width="120">
                     <template scope="scope">
                        {{scope.row.clothLoneList | countTotal}}{{scope.row.quantityUnit}}
                     </template>
                  </el-table-column>
                  <el-table-column  align="center" label="现采购数量" class-name="red" min-width="180">
                    <template scope="scope">
                       <div>
                          <el-input size="small" type="number" style="float:left; width: 80px;" :value="scope.row.newQuantity" @input.native="updateInpt($event.target.value, scope.$index)" />{{scope.row.quantityUnit}}
                       </div>
                    </template>
                  </el-table-column>
                </el-table>

             </div>
           </div>
         </div>
      </div>

      <div class="block clearfix">
         <div class="block-title">货款费用信息</div>
         <div style="margin-left: 10px;">
           <div class="section clearfix">
             <div class="section_item section_l">
               <span>原成本货款</span>
             </div>
             <div class="section_item section_r">
               <div>
                  <span>{{moneyInfo.originPriceMoney}}元（供应商含{{moneyInfo.sellerTaxPoint}}%税）</span>
               </div>
             </div>
           </div>

           <div class="section clearfix">
             <div class="section_item section_l">
               <span>现成本货款</span>
             </div>
             <div class="section_item section_r">
               <div>
                  <span>{{moneyInfo.nowPriceMoney}}元（供应商含{{moneyInfo.sellerTaxPoint}}%税）</span>
               </div>
             </div>
           </div>

           <div class="section clearfix">
             <div class="section_item section_l">
               <b style="color: red;">*</b><span>{{moneyInfo.word}}</span>
             </div>
             <div class="section_item section_r">
               <div>
                  <span><y-input size="small" style="margin-right: 10px;" v-model="countRes" max="6" placeholder="请输入0-9999"></y-input>元（供应商含{{moneyInfo.sellerTaxPoint}}%税）</span>
               </div>
             </div>
           </div>

         </div>

         <div class="operate">
          <el-button style="margin-right: 20px;" @click.native="back">返回</el-button>
          <el-button type="primary" @click.native="confirm" :disabled="isSub">保存</el-button>
         </div>
      </div>
    </div>
     <lightbox />
  </div>
</template>
<script>
  import Lightbox from 'components/lightbox/lightbox'
  import lrz from 'lrz'
  import YInput from 'components/yInput'

  import {
    request,
    // setCache,
    formatTimeString,
    newRequest
  } from 'utils/tool'
  import Api from 'api/reposity'
  import AllApi from 'api/allApi'
  export default {
    components: {
      Lightbox,
      'y-input': YInput
    },
    data() {
      return {
        result: [],
        imgUrls: [],
        imgPath: 'http://www.soouya.com',
        orderDetail: {},
        returnReplaceDetail: {},
        colorList: [],
        disabled: false,
        countRes: ''
      }
    },
    filters: {
      convertTime (val) {
        return val ? formatTimeString(val) : '--'
      },
      countTotal (clothLoneList) {
        let total = 0
        clothLoneList.forEach((item) => {
          total += item.quantity
        })
        return total
      },
      showPiHao (clothLoneList) {
        let strArr = []
        clothLoneList.forEach((item) => {
          strArr.push(item.number)
        })
        return strArr.join('/')
      }
    },
    mounted() {
      // this.getReturnReplaceDetail()
      this.$store.dispatch('changeload', false)
      this.getDetail()
      this.getDhDetail()
    },
    watch: {
    },
    computed: {
      // 校验
      isSub () {
       this.disabled = false
       this.colorList.forEach((val) => {
          Object.keys(val).forEach((key) => {
            if (key == 'newQuantity' && String(val[key]) == '') {
              this.disabled = true
            }
          })
       })
       if (String(this.countRes) == '') {
         this.disabled = true
       }
       return this.disabled
      },
      // 原成本货款和现成本货款 搜芽补款 供应商退款 字段显示
      moneyInfo () {
        let originPriceMoney = 0
        let nowPriceMoney = 0
        let word
        let countRes = 0
        let sellerTaxPoint
        this.colorList.forEach((item) => {
           sellerTaxPoint = item.sellerTaxPoint || 0
           let temQuantity = 0
           item.clothLoneList.forEach((val) => {
             temQuantity += val.quantity
           })
           if (sellerTaxPoint > 0) {
              originPriceMoney += (Number(item.priceWithTax) * Number(temQuantity))
              nowPriceMoney += (Number(item.priceWithTax) * Number(item.newQuantity))
            } else {
              originPriceMoney += (Number(item.price) * Number(temQuantity))
              nowPriceMoney += (Number(item.price) * Number(item.newQuantity))
            }
        })
        if (originPriceMoney < nowPriceMoney) {
          word = '搜芽补款'
          countRes = nowPriceMoney - originPriceMoney
        } else if (originPriceMoney > nowPriceMoney) {
          word = '供应商退款'
          countRes = originPriceMoney - nowPriceMoney
        } else if (originPriceMoney == nowPriceMoney) {
          word = '搜芽补款'
          countRes = 0
        }
        this.countRes = countRes.toFixed(2)
        return {
          originPriceMoney: originPriceMoney.toFixed(2),
          nowPriceMoney: nowPriceMoney.toFixed(2),
          countRes: countRes.toFixed(2),
          sellerTaxPoint,
          word
        }
      }

    },
    methods: {
      formatValue (val, index) {
        Number(this.colorList[index].newQuantity).toFixed(2)
        const newVal = this.colorList[index]
        newVal.newQuantity = Number(val).toFixed(2)
        this.$set(this.colorList, index, newVal)
      },
      updateInpt (val, index) {
        const newVal = this.colorList[index]
        newVal.newQuantity = val
        this.$set(this.colorList, index, newVal)
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
        this.imgUrls.push(this.imgPath + file.imgUrl)
      },
      handleError (file, fileList) {
        this.$store.dispatch('changeload', false)
      },
      del (url) {
        this.imgUrls = this.imgUrls.filter((item, key) => item != url)
      },
      getDetail () {
        this.$store.dispatch('changeload', true)
        request({
          url: Api.getDetail,
          method: 'post',
          data: {
            param: JSON.stringify({
              number: this.$route.query.number
            })
          }
        }).then(data => {
          this.$store.dispatch('changeload', false)
          if (data.success === '1') {
            this.returnReplaceDetail = data.obj
            this.returnReplaceDetail.colorList.forEach((val, index) => {
               val.newQuantity = ''
            })
            this.colorList = this.returnReplaceDetail.colorList
          } else {
            this.$message({
              type: 'error',
              message: data.msg,
              duration: 1000
            })
          }
        })
      },
      getDhDetail () {
        this.$store.dispatch('changeload', true)
        newRequest({
          url: Api.getDhDetail,
          method: 'post',
          contentType: 'application/json',
          data: {
            orderNumber: this.$route.query.id
          }
        }).then(data => {
          this.$store.dispatch('changeload', false)
          if (data.success === '1') {
            this.orderDetail = data.obj
          } else {
            this.$message({
              type: 'error',
              message: data.msg,
              duration: 1000
            })
          }
        })
      },
      confirmInfo (done) {
       this.$store.dispatch('changeload', true)
       const obj = {
         id: this.returnReplaceDetail.id
       }
       if (this.moneyInfo.word == '供应商退款') {
         obj.sellerRefund = this.countRes
       } else {
         obj.moneySoouyaToSeller = this.countRes
       }
       obj.madanImgUrls = this.imgUrls.map((item) => item.replace(this.imgPath, ''))
       obj.lstBuyQuantity = []
       this.colorList.forEach((val) => {
         obj.lstBuyQuantity.push({
           color: val.color,
           quantity: val.newQuantity
         })
       })
       console.log('obj', obj)
       request({
         url: AllApi.Replace.input,
         method: 'post',
         data: {
           param: JSON.stringify(obj)
         }
       }).then(data => {
         const self = this
         this.$store.dispatch('changeload', false)
         done()
         if (data.success === '1') {
           this.$message({
             type: 'success',
             message: data.msg,
             duration: 1000,
             onClose() {
               self.$router.go(-1)
             }
           })
         } else {
           this.$message({
             type: 'error',
             message: data.msg,
             duration: 1000
           })
         }
       })
      },
      confirm () {
        const self = this
        this.$confirm('信息确认填写正确么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose (action, instance, done) {
            if (action === 'confirm') {
              self.confirmInfo(done)
            } else {
              done()
            }
          }
        }).then(() => {
        }).catch(() => {
        })
      },
      back() {
       this.$confirm('点击返回已填写的数据会丢失,确定返回吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.$router.go(-1)
       }).catch(() => {
       })
      }
    }
  }
</script>
<style lang="scss" scoped>
.input-returnReplace{
  .title{
    width: 100%;
    border-bottom: 2px solid #ccc;
    padding-bottom: 15px;
    a{
      float: right;
      text-decoration: none;
    }
  }
  .block {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid #ccc;
  }
  .detial-wrap{
    font-size: 14px;
    padding: 10px;
    background: #fff;
    .block-title{
      padding-bottom: 15px;
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .section {
    padding-top: 10px;
    .section_item {
      float: left;
    }
    .section_l {
      width: 100px;
      padding-right: 10px;
    }
    .section_r {
      min-width: 600px;
    }
  }
  .showmadan {
    float: left;
  }
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

  .operate {
    text-align: center;
  }

  .border{
    border-radius: 4px;
    border: 1px dotted #3c8dbc;
    padding: 5px;
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
}

</style>
