<template>
   <div class="preview-jb-publish">
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
                    <span style="position: relative; top: 10px;">采购商:</span>
                  </div>
                  <div class="line-item-r">
                      <div class="buyer-select-info" v-if="customerId">
                         <p>采购商ID:  {{customerNumber}}</p>
                         <p>公司名称:  {{customerCompany}}</p>
                         <p>联系电话:  {{customerTel}}</p>
                      </div>
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l clearfix">
                    <span>收货地址:</span>
                  </div>
                  <div class="line-item-r">
                      <span style="padding-right: 20px;">{{addressData.name}}</span><span style="padding-right: 20px;">{{addressData.tel}}</span>{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.addr}}
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">供应商:</span>
                  </div>
                  <div class="line-item-r">
                         <div class="buyer-select-info clearfix" v-if="showShopData.id">
                         <p style="float:left; margin-right: 100px;"><span style="padding-right: 10px;">供应商ID:</span>{{showShopData.sellerNumber}}</p>
                         <p style="float:left; margin-right: 100px;"><span style="padding-right: 10px;">店铺名称:</span>{{showShopData.sellerCompany}}</p>
                         <p style="float:left; margin-right: 100px;"><span style="padding-right: 10px;">档口名称:</span>{{showShopData.company}}</p>
                         <p style="float:left; margin-right: 100px;"><span style="padding-right: 10px;">档口地区:</span>{{showShopData.province}}{{showShopData.city}}{{showShopData.area}}</p>
                         <p style="float:left; margin-right: 100px;"><span style="padding-right: 10px;">详细地址:</span>{{showShopData.addr}}</p>
                         <p style="float:left; margin-right: 100px;"><span style="padding-right: 10px;">档口电话:</span>{{showShopData.tel}}</p>
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
                        <img :src="'http://www.soouya.com' + item" width='40' height="40" />
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
                    <span>服务费单价：</span>
                  </div>
                  <div class="line-item-r">
                       {{value.price}}{{value.priceUnit}}
                  </div>
                </div>
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; top: 10px;">货物信息:</span>
                  </div>
                  <div class="line-item-r">
                     <table class="pure-table pure-table-bordered fix-table fix-width" style="background: #fff; text-align: center;">
                         <thead>
                             <tr class="th">
                                 <th style="min-width:100px; width: 10%; text-align: center;">{{value.category == 1 ? '货号' : '品名'}}</th>
                                 <th style="min-width:100px; width: 10%; text-align: center;">{{value.category == 1 ? '色号' : '颜色'}}</th>
                                 <th style="min-width:150px; width: 10%; text-align: center;">单价</th>
                                 <th style="min-width:100px; width: 10%; text-align: center;">数量</th>
                             </tr>
                         </thead>
                         <tbody>
                            <tr v-for="itemColor in value.colors">
                                <td><div style="padding: 10px 0;">{{value.number}}</div></td>
                                <td><div style="padding: 20px 0;">{{itemColor.color}}</div></td>
                                <td><div style="padding: 20px 0;">{{itemColor.followerPriceMoney}}{{itemColor.followerPriceUnit}}</div></td>
                                <td><div style="padding: 20px 0;">{{itemColor.followerQuantity}}{{itemColor.followerQuantityUnit}}</div></td>
                            </tr>
                         </tbody>
                     </table>
                  </div>
                </div>

             </div>
          </div>
          <div class="section">
             <div class="jb-content-buyer-info top-line clearfix">
               <span class="jb-info">费用信息</span>
             </div>
             <div class="jb-info-content clearfix">
                <div class="line-item clearfix">
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
                      <span>{{taxPoint}}%</span>
                  </div>
                </div>
                <!--<div class="line-item clearfix">
                  <div class="line-item-l">
                    <span>费用明细:</span>
                  </div>
                  <div class="line-item-r">
                      <div class="money-info clearfix">
                         <p class="money-info-item clearfix">
                           <span class="money-info-ls">预估成本货款:</span>
                           <span style="width: 100px; margin-right: 10px;" >{{estimatedCostMoney}}</span>元
                         </p>
                         <p class="money-info-item clearfix">
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
                         </p>
                      </div>
                  </div>
                </div>-->
                <div class="line-item clearfix">
                  <div class="line-item-l">
                    <span style="position: relative; ">跟单员留言:</span>
                  </div>
                  <div class="line-item-r">
                      <span>{{followerRemark}}</span>
                  </div>
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
import {
    // request,
    // unique,
    // setCache,
    // formatTimeString
}
from 'utils/tool'
export default {
 props: {
   details: {
     type: Object,
     required: false,
     default: function(a) {
       return {}
     }
   }
 },
  components: {
    Lightbox
  },
  data() {
    const data = this.details
    return data
  },
  mounted() {
    this.$store.dispatch('changeload', false)
  },
  computed: {
  },
  watch: {},
  methods: {},
  update () {
    console.log('111')
  }
};
</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
  .preview-jb-publish {
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
        top: 35px;
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
        top: 36px;
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
