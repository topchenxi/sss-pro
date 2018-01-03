<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item detail-right" style="width:100%">
        <h6>采购商供应商信息</h6>
        <dl class="info-item">
          <dt>订单号 :</dt>
          <dd>{{details.number}}</dd>
        </dl>
        <dl class="info-item">
          <dt>订单时间 :</dt>
          <dd>{{details.createTime | formatTime}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商 :</dt>
          <dd>{{details.customerCompany}} {{details.customerTel}}</dd>
        </dl>
        <dl class="info-item">
          <dt>收货地址 :</dt>
          <dd>{{details.addressName}} {{details.addressTel}} {{details.addressProvince}}{{details.addressCity}}{{details.addressArea}}{{details.addressAddr}}</dd>
        </dl>
        <dl class="info-item">
          <dt>供应商 :</dt>
          <dd>
            <p>{{details.shopCompany}}</p>
            <p>{{details.shopTel}} </p>
            <p> {{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}</p>
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-for="(value, key) in details.productNumbers" :key="key">
      <div class="detail-item detail-right" style="width:100%">
        <h6>货号-<span class="green">{{key+1}}</span> </h6>
        <dl class="info-item">
          <dt>原供应商:</dt>
          <dd>
            <p>{{value.shopCompany}}</p>
            <p>{{value.shopTel}}</p>
            <p>{{value.shopProvince}}{{value.shopCity}}{{value.shopArea}}{{value.shopAddr}}</p>
          </dd>
        </dl>
        <dl class="info-item" v-if="value.shopOriginalNumber">
          <dt>原货号:</dt>
          <dd>{{value.shopOriginalNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>商品图片:</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="value.imgUrls" v-for="(item, index) in value.imgUrls" class="pic-item">
                    <img :src="'http://www.soouya.com' + item" width='80' height="80" />
                  </a>
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>色号图片:</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="value.colorUrls" v-for="(item, index) in value.colorUrls" class="pic-item">
                    <img :src="'http://www.soouya.com' + item" width='80' height="80" />
                  </a>
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>品名:</dt>
          <dd>{{value.title}}</dd>
        </dl>
        <dl class="info-item">
          <dt>货号:</dt>
          <dd>{{value.number}}</dd>
        </dl>
        <dl class="info-item mb40">
          <dt>货物信息:</dt>
          <dd>
            <div class="table-warp table-center pt10" style="width:90%">
              <table class="table-normal">
                <colgroup>
                </colgroup>
                <thead>
                  <tr>
                    <th>色号</th>
                    <th>数量</th>
                    <th>销售价</th>
                    <th>采购数量</th>
                    <th>成本单价</th>
                    <th>采购单价</th>
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
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item detail-right cut-left">
        <h6>其他</h6>
        <dl class="info-item">
          <dt>是否需要发票:</dt>
          <dd><span v-if="details.needInvoice == 1">需要</span>
            <span v-else>不需要</span></dd>
        </dl>
        <dl class="info-item" v-if="details.needInvoice == 1">
          <dt>税率:</dt>
          <dd> {{details.taxPoint}}% </dd>
        </dl>
        <dl class="info-item">
          <dt>期望发货时间:</dt>
          <dd>
            <p>
              {{details.expectedSendTime
              <=0 ? '--' : details.expectedSendTime | formatDate}} </p>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>备注:</dt>
          <dd>{{details.followerRemark}}</dd>
        </dl>
        <dl class="info-item" v-if="details.status >500">
          <dt>支付凭据:</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="details.payCredentialUrls" v-for="(item, index) in details.payCredentialUrls" class="pic-item">
                    <img :src="'http://www.soouya.com' + item" width='80' height="80" />
                  </a>
            </div>
          </dd>
        </dl>
        <dl class="info-item" v-if="details.status != 500 && details.status != 530">
          <dt>档口码单:</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="details.madanUrls" v-for="(item, index) in details.madanUrls" class="pic-item">
                    <img :src="'http://www.soouya.com' + item" width='80' height="80" />
                  </a>
            </div>
          </dd>
        </dl>
        <dl class="info-item" v-if="details.status != 500 && details.status != 530">
          <dt>码单号:</dt>
          <dd>{{details.madan}}</dd>
        </dl>
        <dl class="info-item" v-if="details.status != 500 && details.status != 530">
          <dt>成本货款:</dt>
          <dd class="red">{{details.costMoney}} 元</dd>
        </dl>
        <dl class="info-item" v-if="details.status != 500 && details.status != 530">
          <dt>总费用:</dt>
          <dd class="red">{{details.totalMoney}} 元</dd>
        </dl>
        <dl class="info-item" v-if="details.status == 520 || details.status == 521 || details.status == 522 || details.status == 523">
          <dt>收货备注:</dt>
          <dd>{{details.receiveRemark}}</dd>
        </dl>
      </div>
      <div class="detail-item fr cut-right" >
        <h6>物流信息</h6>
        <dl class="info-item" v-if="details.status == 521 || details.status == 522 || details.status == 523">
          <dt>发货凭据:</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="details.sendCredentialUrls" v-for="(item, index) in details.sendCredentialUrls" class="pic-item">
                    <img :src="'http://www.soouya.com' + item" width='80' height="80" />
                  </a>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="jb-content">
     <!--  <div style="padding-left: 10px; margin: 10px 0;">
         <div class="section">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">采购商供应商信息1</span>
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
        <div class="section" v-for="(value, key) in details.productNumbers" :key="key">
          <div class="jb-content-buyer-info top-line clearfix operate-wrap">
            <span class="jb-info">货号({{key+1}})</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix" v-if="value.shopId != ''">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">原供应商:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{value.shopCompany}}&nbsp;&nbsp;&nbsp;&nbsp;{{value.shopTel}}&nbsp;&nbsp;&nbsp;&nbsp;{{value.shopProvince}}{{value.shopCity}}{{value.shopArea}}{{value.shopAddr}}&nbsp;&nbsp;&nbsp;&nbsp;原货号：{{value.shopOriginalNumber}}</p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">商品图片:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="value.imgUrls" v-for="(item, index) in value.imgUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item" width='40' height="40" />
                  </a>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">色卡图片:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="value.colorUrls" v-for="(item, index) in value.colorUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item" width='40' height="40" />
                  </a>
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
                <span style="position: relative; top: 10px;">货物信息:</span>
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
          <div class="jb-info-content clearfix" v-if="details.status >500">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">支付凭据:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="details.payCredentialUrls" v-for="(item, index) in details.payCredentialUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item" width='40' height="40" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="jb-info-content clearfix" v-if="details.status != 500 && details.status != 530">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">档口码单:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="details.madanUrls" v-for="(item, index) in details.madanUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item" width='40' height="40" />
                  </a>
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
            <div class="line-item clearfix" v-if="details.status != 500 && details.status != 530">
              <div class="line-item-l">
                <span>成本货款:</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <p class="money-info-item clearfix">
                    <span style="width: 100px; margin-right: 10px;color:red;">{{details.costMoney}}</span>元
                  </p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.status != 500 && details.status != 530">
              <div class="line-item-l">
                <span>总费用:</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <p class="money-info-item clearfix">
                    <span style="width: 100px; margin-right: 10px;color:red;">{{details.totalMoney}}</span>元
                  </p>
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
                <span style="position: relative; top: 10px;">发货凭据:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="details.sendCredentialUrls" v-for="(item, index) in details.sendCredentialUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item" width='40' height="40" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <el-button @click.native="$router.go(-1)">返回</el-button>
        </div>
      </div> -->
      <lightbox></lightbox>
    </div>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
  formatTimeString
}
from 'utils/tool'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      imgPath: 'http://www.soouya.com',
      details: {},
      on: false,
      index: 1
    }
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to, from)
    to.meta.index = from.meta.index
    next()
  },
  mounted() {
    this.getDetail()
  },
  computed: {},
  watch: {},
  filters: {
    formatDate(val) {
      if (val != undefined) {
        return formatTimeString(val).substring(0, 10)
      } else {
        return val
      }
    },
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  methods: {
    getDetail() {
      this.$store.dispatch('changeload', true)
      const id = this.$route.query.id
      newRequest({
        url: `/redwood/ziying/cut/${id}`,
        method: 'get',
        data: {}
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.details = res.obj
        }
      })
    }
  },
  update() {}
};

</script>
<style src="assets/style/table.scss" lang="scss"></style>
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

</style>
