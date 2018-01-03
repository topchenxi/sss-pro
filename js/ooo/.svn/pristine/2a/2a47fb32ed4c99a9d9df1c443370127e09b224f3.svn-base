<template>
  <div class="cutDetail-jb-publish">
    <div class="jb-content">
      <div style="padding-left: 10px; margin: 10px 0;">
        <div class="section">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">采购商供应商信息</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>订单号:</span>
              </div>
              <div class="line-item-r">
                {{details.number}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>订单时间:</span>
              </div>
              <div class="line-item-r">
                {{details.createTime | formatTime}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>采购商:</span>
              </div>
              <div class="line-item-r">
                {{details.customerCompany}} {{details.customerTel}}
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
                <span>供应商:</span>
              </div>
              <div class="line-item-r">
                {{details.shopCompany}} {{details.shopTel}} {{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}
              </div>
            </div>
          </div>
        </div>

        <div class="section" v-for="(value, key) in details.productNumbers" :key="key">
          <div class="jb-content-buyer-info top-line clearfix operate-wrap">
            <span class="jb-info">货号({{key+1}})</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix" v-if="value.shopId != ''">
              <div class="line-item-l">
                <span>原供应商:</span>
              </div>
              <div class="line-item-r">
                {{value.shopCompany}}&nbsp;&nbsp;&nbsp;&nbsp;{{value.shopTel}}&nbsp;&nbsp;&nbsp;&nbsp;{{value.shopProvince}}{{value.shopCity}}{{value.shopArea}}{{value.shopAddr}}&nbsp;&nbsp;&nbsp;&nbsp;原货号：{{value.shopOriginalNumber}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>商品图片:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :href="imgPath + item" :key="item" v-lightbox="value.imgUrls" v-for="(item, index) in value.imgUrls" class="madan-wrap">
                    <img :src="imgPath + item" width='40' height="40" />
                  </a>
                  <!-- <lightBox :value="value.imgUrls"></lightBox> -->
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>色卡图片:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :href="imgPath + item" :key="item" v-lightbox="value.colorUrls" v-for="(item, index) in value.colorUrls" class="madan-wrap">
                    <img :src="imgPath + item" width='40' height="40" />
                  </a>
                  <!-- <lightBox :value="value.colorUrls"></lightBox> -->
                </div>
              </div>
            </div>
            <div class="line-item clearfix" style="height:30px;">
              <div class="line-item-l">
                <span>品名:</span>
              </div>
              <div class="line-item-r">
                {{value.title}}
              </div>
            </div>
            <div class="line-item clearfix" style="height:30px;">
              <div class="line-item-l">
                <span>货号：</span>
              </div>
              <div class="line-item-r">
                {{value.number}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>货物信息:</span>
              </div>
              <div class="line-item-r">
                <table class="pure-table pure-table-bordered fix-table fix-width" style="background: #fff; text-align: center; max-width: 700px;">
                  <thead>
                    <tr class="th">
                      <th style="min-width:150px; width: 10%; text-align: center;">色号</th>
                      <th style="min-width:100px; width: 10%; text-align: center;">数量</th>
                      <th style="min-width:100px; width: 10%; text-align: center;">销售价</th>
                      <th style="min-width:100px; width: 10%; text-align: center;">采购数量</th>
                      <th style="min-width:150px; width: 10%; text-align: center;">成本单价</th>
                      <th style="min-width:150px; width: 10%; text-align: center;">采购单价</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="itemColor in value.colors">
                      <td>
                        <div>{{itemColor.color}}
                          <label style="color:red;" v-if="itemColor.status == 0">(无货)</label>
                        </div>
                      </td>
                      <td>
                        <div v-if="itemColor.followerQuantity > 0">
                          <span>{{itemColor.followerQuantity}}</span>{{itemColor.followerQuantityUnit}}</div>
                        <div v-else>--</div>
                      </td>
                      <td>
                        <div v-if="itemColor.salePriceMoney > 0">
                          <span>{{itemColor.salePriceMoney}}</span>{{itemColor.salePriceUnit}}</div>
                        <div v-else>--</div>
                      </td>
                      <td>
                        <div v-if="itemColor.cutterQuantity > 0">
                          <span>{{itemColor.cutterQuantity}}</span>{{itemColor.cutterQuantityUnit}}</div>
                        <div v-else>--</div>
                      </td>
                      <td>
                        <div v-if="itemColor.followerPriceMoney > 0">
                          <span>{{itemColor.followerPriceMoney}}</span>{{itemColor.followerPriceUnit}}</div>
                        <div v-else>--</div>
                      </td>
                      <td>
                        <div v-if="itemColor.cutterPriceMoney > 0">
                          <span>{{itemColor.cutterPriceMoney}}</span>{{itemColor.cutterPriceUnit}}</div>
                        <div v-else>--</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">其它</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix">
              <div class="line-item-l clearfix">
                <span>是否需要发票:</span>
              </div>
              <div class="line-item-r">
                <span v-if="details.needInvoice == 1">需要</span>
                <span v-else>不需要</span>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.needInvoice == 1">
              <div class="line-item-l">
                <span>税率:</span>
              </div>
              <div class="line-item-r">
                <span>{{details.taxPoint}}%</span>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>期望发货时间:</span>
              </div>
              <div class="line-item-r">
                <span>{{details.expectedSendTime
                  <=0 ? '--' : details.expectedSendTime | formatDate}}</span>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>备注:</span>
              </div>
              <div class="line-item-r">
                <span>{{details.followerRemark}}</span>
              </div>
            </div>
          </div>

          <div class="jb-info-content clearfix" v-if="details.status != 500 && details.status != 530">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>档口码单:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :href="imgPath + item" :key="item" v-lightbox="details.madanUrls" v-for="(item, index) in details.madanUrls" class="madan-wrap">
                    <img :src="imgPath + item" width='40' height="40" />
                  </a>
                  <!-- <lightBox :value="details.madanUrls"></lightBox> -->
                </div>
              </div>
            </div>
            <div class="jb-info-content clearfix" v-if="details.status != 500 && details.status != 530">
              <div class="line-item clearfix">
                <div class="line-item-l">
                  <span>码单号:</span>
                </div>
                <div class="line-item-r">
                  <div style="max-width: 400px; word-break: break-word;">{{details.madan}}</div>
                </div>
              </div>
            </div>
            <div class="jb-info-content clearfix" v-if="details.status == 522 || details.status == 523">
              <div class="line-item clearfix">
                <div class="line-item-l">
                  <span>支付凭据:</span>
                </div>
                <div class="line-item-r">
                  <div class="showmadan">
                    <a :href="imgPath + item" :key="item" v-lightbox="details.payCredentialUrls" v-for="(item, index) in details.payCredentialUrls" class="madan-wrap">
                      <img :src="imgPath + item" width='40' height="40" />
                    </a>
                    <!-- <lightBox :value="details.payCredentialUrls"></lightBox> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.status != 500 && details.status != 530">
              <div class="line-item-l">
                <span>成本货款:</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <span style="width: 100px; margin-right: 10px;color:red;">{{details.costMoney}}</span>元
                </div>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.status != 500 && details.status != 530">
              <div class="line-item-l">
                <span>总费用:</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <span style="width: 100px; margin-right: 10px;color:red;">{{details.totalMoney}}</span>元
                </div>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.status == 520 || details.status == 521 || details.status == 522 || details.status == 523">
              <div class="line-item-l">
                <span>收货备注:</span>
              </div>
              <div class="line-item-r">
                <div style="max-width: 400px; word-break: break-word;">{{details.receiveRemark}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line-item clearfix" v-if="details.status == 521 || details.status == 522 || details.status == 523">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">物流信息</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>发货凭据:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :href="imgPath + item" :key="item" v-lightbox="details.sendCredentialUrls" v-for="(item, index) in details.sendCredentialUrls" class="madan-wrap">
                    <img :src="imgPath + item" width='40' height="40" />
                  </a>
                  <!-- <lightBox :value="details.sendCredentialUrls"></lightBox> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <el-button @click.native="$router.go(-1)">返回</el-button>
        </div>
      </div>
    </div>
    <lightbox />
  </div>
</template>

<script>
import Lightbox from '@/components/light-box/lightbox'
import mixinFilters from '@/mixin/filters'
import request from '@/utils/request'
export default {
  data() {
    return {
      imgPath: 'http://www.soouya.com',
      details: {}
    }
  },
  components: {
    Lightbox
  },
  mixins: [mixinFilters],
  mounted() {
    this.getDetail()
  },
  computed: {},
  watch: {},
  methods: {
    getDetail() {
      request('/redwood/ziying/cut/' + this.$route.query.id, {
        method: 'GET'
      }).then((res) => {
        if (res.success === '1') {
          this.details = res.obj
        }
      })
    }
  }
}
</script>
<style src="../../../assets/style/table.scss" lang="scss"></style>
<style lang="scss">
.cutDetail-jb-publish {
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
      width: 100%; // top: 35px;
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
      width: 100%; // top: 36px;
      background: #bfcbd9;
    }
  }

  .jb-info {
    float: left;
    width: 150px;
    padding: 10px 0;
    background: #20a0ff;
    text-align: center;
    color: #fff;
  }
  .jb-info-content {
    padding-bottom: 20px;
    .line-item {
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
        min-width: 500px; // float: left;
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
      float: left;
      margin-right: 20px;
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
    height: 50px;
    .madan-wrap {
      position: relative;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
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
    float: left;
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

.cutDetail-pay-money {
  min-width: 500px;
  .pay-content {
    min-width: 500px;
    .pay-item {
      position: relative;
      padding-bottom: 10px;
      .pay-item-l {
        width: 110px;
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
  .el-upload-list {
    display: none;
  }
}

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}

.clearfix {
  zoom: 1;
}

.line-item {
  min-height: 40px;
  margin-bottom: 10px;
}

.madan-wrap {
  img {
    margin-right: 5px;
  }
}
</style>
