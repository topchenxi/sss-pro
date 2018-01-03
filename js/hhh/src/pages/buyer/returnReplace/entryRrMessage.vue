<template>
  <section min-width="1300">
    <div class="title-box">
      <span style="font-weight:600;">基本信息</span>
      <el-button type="primary" size="small" style="margin-left:50px;" @click.native="toBack">返回</el-button>
    </div>
    <div class="form-box" style="padding-top:40px">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="订单号">
          <span>{{obj.order.serviceNumber}}</span>
        </el-form-item>
        <el-form-item label="采购商">
          <el-popover placement="bottom-start" title="" trigger="click" width="300">
            <el-form label-position="right" label-width="120px">
              <el-form-item label="采购商ID:" height="25">
                <span>{{obj.order.customerNumber}}</span>
              </el-form-item>
              <el-form-item label="联系手机:">
                <span>{{obj.order.customerMobile}}</span>
              </el-form-item>
              <el-form-item label="联系电话:">
                <span>{{obj.order.customerTel}}</span>
              </el-form-item>
              <el-form-item label="下单总数:">
                <span>{{obj.order.orderTotalCount}}单</span>
              </el-form-item>
              <el-form-item label="下单总金额:">
                <span>￥{{obj.order.totalOrderSaleMoney | formatMoney}}</span>
              </el-form-item>
              <el-form-item label="有效出仓总金额:">
                <span>￥{{obj.order.tatalOutRepositySaleMoney | formatMoney}}</span>
              </el-form-item>
              <!-- <el-form-item label="结算周期:">
                                                                                                                              <span>{{5555}}</span>
                                                                                                                            </el-form-item> -->
            </el-form>
            <el-button slot="reference" type="text" style="font-size: 15px;">{{obj.order.customerCompany}}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="供应商">
          <el-popover placement="bottom-start" title="" trigger="click">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="联系电话:">
                <span>{{obj.order.shopTel}}</span>
              </el-form-item>
              <el-form-item label="联系地址:">
                <span>{{obj.order.shopFullAddr}}</span>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="text" style="font-size: 15px;">{{obj.order.shopCompany}}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="订单类型">
          <template v-if="obj.order.type == 1">
            <span>服务单</span>
          </template>
          <template v-if="obj.order.type == 2">
            <span>贸易单</span>
          </template>
        </el-form-item>
        <el-form-item label="下单时间">
          <span>{{obj.order.createTime | formatTime}}</span>
        </el-form-item>
        <template v-if="obj.order.expectedTime">
          <el-form-item label="期望货期">
            <span>{{formatDate(obj.order.expectedTime)}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.leaveMessage">
          <el-form-item label="跟单员备注">
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.leaveMessage}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.sellerMessage">
          <el-form-item label="买货员备注">
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.sellerMessage}}</span>
          </el-form-item>
        </template>
        <el-form-item label="采购明细">
          <table style="border-collapse:collapse; border: 1px solid #969696" border="1" border-spacing="0" class="table-box">
            <tr>
              <th style="width:120px;">货号</th>
              <th style="width:120px" colspan="1">色号</th>
              <th style="width:100px" colspan="1">采购数量</th>
              <th style="width:100px" colspan="1">销售单价</th>
              <th style="width:100px" colspan="1">采购单价</th>
              <th style="width:100px" colspan="1">成本单价</th>
            </tr>
            <tr ref="rightTd">
              <td :rowspan="obj.order.colorList.length + 1" class="rightTd" style="text-align:center">{{obj.order.productNumber}}</td>
              <tr v-for="(item,index) in obj.order.colorList">
                <td style="text-align:center">{{item.color}}</td>
                <td style="text-align:center">{{item.quantity | formatMoney}}{{item.quantityUnit}}</td>
                <td style="text-align:center">{{item.salePrice | formatMoney}}{{item.salePriceUnit}}</td>
                <td style="text-align:center">{{item.buyPrice | formatMoney}}{{item.buyPriceUnit}}</td>
                <td style="text-align:center">{{item.price | formatMoney}}{{item.priceUnit}}</td>
              </tr>
            </tr>
            <tr>
              <td colspan="6" style="text-align: right;padding-right: 8px;">
                <template v-if="obj.order.productSource">
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">销售货款:
                    <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">已付订金:
                    <strong style="color: #f00">￥{{obj.order.earnestMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">已付尾款:
                    <strong style="color: #f00">￥{{obj.order.finalMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购商税款:
                    <strong style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}({{obj.order.taxPoint}}%)</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="padding-right:8px; padding-left:8px;display: inline-block">成本货款:
                    <strong style="color:#f00">￥{{obj.order.costMoney | formatMoney}}</strong>
                  </label>
                </template>
                <template v-else>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">销售货款:
                    <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购货款:
                    <strong style="color: #f00">￥{{obj.order.buyMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购商税款:
                    <strong style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}({{obj.order.taxPoint}}%)</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="padding-right:8px;padding-left:8px; display: inline-block">成本货款:
                    <strong style="color:#f00">￥{{obj.order.costMoney | formatMoney}}</strong>
                  </label>
                </template>
                <!--缺图片  -->
              </td>
            </tr>
          </table>
        </el-form-item>
        <template v-if="this.wuliuList.length || this.madanList.length || this.sellerPayList.length">
          <el-form-item label="码单及凭据">
            <el-row>
              <el-col style="min-width:130px;margin-top:12px;" :span="2" :href="item" :key="item" v-lightbox="madanList" v-for="(item, index) in madanList" v-show="index == 0">
                <el-card :body-style="{ padding: '5px 10px 0px 22px' }">
                  <img :src="item" style="width:80px; height:80px;cursor:pointer">
                  <div style="padding: 0;">
                    <p>码单
                      <span>({{madanList.length}}张)</span>
                    </p>
                  </div>
                </el-card>
              </el-col>
              <el-col style="min-width:130px;margin-top:12px;margin-left:10px;" :span="2" :href="item" :key="item" v-lightbox="wuliuList" v-for="(item, index) in wuliuList" v-show="index == 0">
                <el-card :body-style="{ padding: '5px 10px 0px 22px' }">
                  <img :src="item" style="width:80px; height:80px;cursor:pointer">
                  <div style="padding: 0;">
                    <p>物流凭据
                      <span>({{wuliuList.length}}张)</span>
                    </p>
                  </div>
                </el-card>
              </el-col>
              <el-col style="min-width:130px;margin-top:12px;margin-left:10px;" :span="2" :href="item" :key="item" v-lightbox="sellerPayList" v-for="(item, index) in sellerPayList" v-show="index == 0">
                <el-card :body-style="{ padding: '5px 10px 0px 22px' }">
                  <img :src="item" style="width:80px; height:80px;cursor:pointer">
                  <div style="padding: 0;">
                    <p>付款凭据
                      <span>({{sellerPayList.length}}张)</span>
                    </p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div class="title-box">
      <span style="font-weight:600;">退换货内容</span>
    </div>
    <div class="form-box">
      <el-form label-position="right" label-width="120px">
        <!-- <el-form-item label="退换货申请时间">
                                        <span>{{obj.createTime | formatTime}}</span>
                                      </el-form-item>
                                      <el-form-item label="退换货单号">
                                        <span>{{obj.number}}</span>
                                      </el-form-item> -->
        <template>
          <el-form-item label="入仓单号">
            <span>{{obj.inReposityNumber}}</span>
          </el-form-item>
        </template>
        <!-- <template v-else>
                                        <el-form-item label="出仓单号">
                                          <span>{{obj.outReposityNumber}}</span>
                                        </el-form-item>
                                      </template> -->
        <el-form-item label="退换货类型">
          <template v-if="obj.type == 1">
            <span>售前退货</span>
          </template>
          <template v-if="obj.type == 2">
            <span>售前换货</span>
          </template>
          <template v-if="obj.type == 3">
            <span>售后退货</span>
          </template>
          <template v-if="obj.type == 4">
            <span>售后换货</span>
          </template>
          <template v-if="obj.type == 5">
            <span>仅退款</span>
          </template>
        </el-form-item>
        <!-- <el-form-item label="当前状态">
                                        <span>{{obj.statusDescr}}</span>
                                      </el-form-item> -->
        <el-form-item label="换货原因">
          <span>{{obj.reason}}</span>
        </el-form-item>
        <template v-if="obj.type == 2 || obj.type == 4">
          <el-form-item label="换货明细" ref="returnReplace">
            <table style="border-collapse:collapse; border: 1px solid #3399FF; width:880px;" border="1" border-spacing="0" class="table-box">
              <tr>
                <th :rowspan="obj.len" style="background-color:#3399FF; text-align:center;width:120px">
                  <template v-if="obj.type == 1 || obj.type == 3">
                    <span>退前</span>
                  </template>
                  <template v-if="obj.type == 2 || obj.type == 4">
                    <span>换前</span>
                  </template>
                </th>
                <th style="text-align:center; width:120px" colspan="1">色号</th>
                <th style="text-align:center; width:120px" colspan="1">换货实数</th>
                <th style="text-align:center; width:120px">现采购数</th>
                <th style="text-align:center; width:120px" colspan="1">匹号</th>
                <th style="text-align:center; width:120px" colspan="1">入仓实数</th>
                <th style="text-align:center; width:120px" colspan="1">实际布长</th>
                <th style="text-align:center; width:120px" colspan="1">验布结果</th>
                <!--验布报告可能很长很长  -->
              </tr>
              <template v-for="(item1,index1) in obj.beforeList">
                <tr>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.color}}</td>
                  <!-- <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.realQuantity| formatMoney}}{{item1.realQuantityUnit}}</td> -->
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <el-input v-model="item1.inputQuantity" @change="calPrice" style="width:100px"></el-input>
                  </td>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <el-input v-model="item1.inputRealQuantity" @change="calPrice" style="width:100px"></el-input>
                  </td>
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td style="text-align:center;">{{item2.number}}</td>
                    <td style="text-align:center;">{{item2.quantity | formatMoney}}{{item2.quantityUnit}}</td>
                    <td style="text-align:center;">{{item2.buchang | formatMoney}}{{item2.buchangUnit}}</td>
                    <td style="text-align:center;">
                      <template v-if="item2.checkFlaws">
                        <a :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws | formatCheckBu}}</a>
                      </template>
                      <template v-else>{{item2.checkFlaws | formatCheckBu}}</template>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center;">{{item1.totalNumber}}匹</td>
                    <td style="text-align:center;">{{item1.totalQuantity | formatMoney}}{{item1.totalQuantityUnit}}</td>
                    <td style="text-align:center;">{{item1.totalBuchang | formatMoney}}{{item1.totalBuchangUnit}}</td>
                    <td style="text-align:center;"></td>
                  </tr>
                </tr>
              </template>
            </table>
          </el-form-item>
        </template>
        <template v-if="obj.type == 1 || obj.type == 3">
          <el-form-item label="退货明细" ref="returnReplace">
            <table style="border-collapse:collapse; border: 1px solid #3399FF; width:880px;" border="1" border-spacing="0" class="table-box">
              <tr>
                <th :rowspan="obj.len" style="background-color:#3399FF; text-align:center;width:120px">
                  <template v-if="obj.type == 1 || obj.type == 3">
                    <span>退前</span>
                  </template>
                  <template v-if="obj.type == 2 || obj.type == 4">
                    <span>换前</span>
                  </template>
                </th>
                <th style="text-align:center; width:120px" colspan="1">色号</th>
                <th style="text-align:center; width:120px" colspan="1">换货实数</th>
                <th style="text-align:center; width:120px">现采购数</th>
                <th style="text-align:center; width:120px" colspan="1">匹号</th>
                <th style="text-align:center; width:120px" colspan="1">入仓实数</th>
                <th style="text-align:center; width:120px" colspan="1">实际布长</th>
                <th style="text-align:center; width:120px" colspan="1">验布结果</th>
                <!--验布报告可能很长很长  -->
              </tr>
              <template v-for="(item1,index1) in obj.beforeList">
                <tr>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.color}}</td>
                  <!-- <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.realQuantity| formatMoney}}{{item1.realQuantityUnit}}</td> -->
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <el-input v-model="item1.inputQuantity" @change="calPrice" style="width:100px"></el-input>
                  </td>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <el-input v-model="item1.inputRealQuantity" @change="calPrice" style="width:100px"></el-input>
                  </td>
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td style="text-align:center;">{{item2.number}}</td>
                    <td style="text-align:center;">{{item2.quantity | formatMoney}}{{item2.quantityUnit}}</td>
                    <td style="text-align:center;">{{item2.buchang | formatMoney}}{{item2.buchangUnit}}</td>
                    <td style="text-align:center;">
                      <template v-if="item2.checkFlaws">
                        <a :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws | formatCheckBu}}</a>
                      </template>
                      <template v-else>{{item2.checkFlaws | formatCheckBu}}</template>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center;">{{item1.totalNumber}}匹</td>
                    <td style="text-align:center;">{{item1.totalQuantity | formatMoney}}{{item1.totalQuantityUnit}}</td>
                    <td style="text-align:center;">{{item1.totalBuchang | formatMoney}}{{item1.totalBuchangUnit}}</td>
                    <td style="text-align:center;"></td>
                  </tr>
                </tr>
              </template>
            </table>
          </el-form-item>
        </template>
        <!-- <template v-if="obj.type > 2">
                                                      <el-form-item label="已出仓销售货款">
                                                        <span>{{obj.needSaleMoney | formatMoney}}元</span>
                                                      </el-form-item>
                                                    </template> -->
        <!-- <template v-if="obj.type == 1 || obj.type == 3">
                            <el-form-item label="退货原数">
                              <span>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</span>
                            </el-form-item>
                          </template>
                          <template v-if="obj.type == 2 || obj.type == 4">
                            <el-form-item label="换货原数">
                              <span>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</span>
                            </el-form-item>
                          </template>
                          <template v-if="obj.type == 1 || obj.type == 3">
                            <el-form-item label="退货实数">
                              <span>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</span>
                            </el-form-item>
                          </template>
                          <template v-if="obj.type == 2 || obj.type == 4">
                            <el-form-item label="换货实数">
                              <span>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</span>
                            </el-form-item>
                          </template> -->
        <el-form-item label="原成本货款">
          <span>{{totalCostPrice | formatMoney}}元</span>
        </el-form-item>
        <el-form-item label="现成本货款">
          <span>{{totalPrice | formatMoney}}元</span>
        </el-form-item>
        <template v-if="obj.followerRemark">
          <el-form-item label="跟单员换货备注">
            <span>{{obj.followerRemark}}</span>
          </el-form-item>
        </template>
        <el-form-item label="上传换货码单">
          <div style="float: left">
            <a :href="item" :key="item" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" class="madan-wrap">
              <img :src="item" width='40' height="40" />
              <span @click="del(item)" class="del-arrow">X</span>
            </a>
          </div>
          <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="float: left; width: auto;margin-left:10px;" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError">
            <div class="upImg">+</div>
          </el-upload>
        </el-form-item>
        <!-- <template v-if="obj.purchaserRemark"> -->
        <el-form-item label="买货员换货备注">
          <!-- <span>{{obj.purchaserRemark}}</span> -->
          <el-input type="textarea" style="width:250px; margin-top:12px;" @change="calWordCount" v-model="requestParams.purchaserRemark"></el-input>
          </br>
          <span style="color:#f00;margin-left:220px">{{wordCount}}/500</span>
        </el-form-item>
        <el-form-item>
          <div style="margin-top:25px;">
            <el-button :disabled="checkOutInput()" type="primary" size="small" @click.native="confirmSubmit">换货入仓</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <lightbox></lightbox>
    <div style="height:250px;"></div>
  </section>
</template>

<script>
import { newRequest, request } from 'utils/tool'
import Lightbox from 'components/lightbox/lightbox'
import lrz from 'lrz'
// import config from '../data.json' // 模拟数据
export default {
  components: {
    Lightbox,
  },
  data() {
    return {
      webUrl: '',
      imgUrls: [],
      imgPath: 'http://www.soouya.com',
      wuliuList: [],
      sellerPayList: [],
      madanList: [],
      wordCount: 0,
      confirmBtn: false,
      totalPrice: 0,
      totalCostPrice: 0,
      requestParams: {
        purchaserRemark: '',
        id: '',
        lstBuyQuantity: [],
        madanImgUrls: [],
      },
      obj: {
        len: 0,
        order: {
          colorList: []
        },
        beforeList: [
          {
            totalNumber: 0,
            totalQuantity: 0,
            totalQuantityUnit: '',
            totalBuchang: 0,
            totalBuchangUnit: '',
            iputQuantity: 0,
            imputRealQuantity: 0,
            clothLoneList: [],
          }
        ],
        afterList: [
          {
            totalNumber: 0,
            totalQuantity: 0,
            totalQuantityUnit: '',
            totalBuchang: 0,
            totalBuchangUnit: '',
            clothLoneList: [],
          }
        ],
      },
    }
  },
  mounted() {
    this.requestParams.id = this.$route.query.id
    this.getData()
    const host = location.host
    if (host == 'hspc.soouya.com' || host.indexOf('local') != -1) {
      this.webUrl = 'http://testmhongshan.soouya.com/'
    } else if (host.indexOf('test') != -1) {
      this.webUrl = 'http://testmhongshan.soouya.com/'
    } else {
      this.webUrl = 'http://mhongshan.soouya.com/'
    }
  },
  methods: {
    getData() {
      // let res = config.detail
      // this.obj = res.obj
      newRequest({
        url: '/redwood/returnreplace/getById',
        data: this.requestParams,
        method: 'get',
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.obj = res.obj
          this.obj.len = 1
          for (let i = 0; i < this.obj.beforeList.length; i++) {
            console.log(this.obj.beforeList[i].clothLoneList.length)
            this.obj.len += this.obj.beforeList[i].clothLoneList.length
            this.obj.len += 2
          }
          console.log(this.obj.len)
          for (let i = 0; i < this.obj.beforeList.length; i++) {
            this.obj.beforeList[i].totalNumber = this.obj.beforeList[i].clothLoneList.length
            this.obj.beforeList[i].totalBuchang = 0
            this.obj.beforeList[i].totalQuantity = 0
            this.obj.beforeList[i].totalBuchangUnit = this.obj.beforeList[i].clothLoneList[0].buchangUnit
            this.obj.beforeList[i].totalQuantityUnit = this.obj.beforeList[i].clothLoneList[0].quantityUnit
            this.obj.beforeList[i].inputQuantity = this.obj.beforeList[i].realQuantity
            this.obj.beforeList[i].inputRealQuantity = this.obj.beforeList[i].needBuyQuantity
            for (let j = 0; j < this.obj.beforeList[i].clothLoneList.length; j++) {
              this.obj.beforeList[i].totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
              this.obj.beforeList[i].totalQuantity += this.obj.beforeList[i].clothLoneList[j].quantity
            }
            console.log(this.obj.beforeList[i])
          }
          for (let i = 0; i < this.obj.afterList.length; i++) {
            this.obj.afterList[i].totalNumber = this.obj.afterList[i].clothLoneList.length
            this.obj.afterList[i].totalBuchang = 0
            this.obj.afterList[i].totalQuantity = 0
            this.obj.afterList[i].totalBuchangUnit = this.obj.afterList[i].clothLoneList[0].buchangUnit
            this.obj.afterList[i].totalQuantityUnit = this.obj.afterList[i].clothLoneList[0].quantityUnit
            for (let j = 0; j < this.obj.afterList[i].clothLoneList.length; j++) {
              this.obj.afterList[i].totalBuchang += this.obj.afterList[i].clothLoneList[j].buchang
              this.obj.afterList[i].totalQuantity += this.obj.afterList[i].clothLoneList[j].quantity
            }
          }
          this.madanList = this.formateImgList(this.obj.order.madanImgUrls)
          this.wuliuList = this.formateImgList(this.obj.order.sendCertificateList)
          this.sellerPayList = this.formateImgList(this.obj.order.buyerCertificateList)
          this.requestParams.purchaserRemark = this.obj.purchaserRemark
          this.calPrice()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.$store.dispatch('changeload', false)
      // if (this.obj.type == 1 || this.obj.type == 3) {
      //   this.$refs.returnReplace.label = '退货明细'
      // }
    },
    confirmSubmit() {
      this.requestParams.lstBuyQuantity = []
      for (let i = 0; i < this.obj.beforeList.length; i++) {
        let list = {
          color: '',
          needBuyQuantity: 0,
          realQuantity: 0,
        }
        if (this.obj.beforeList[i].inputQuantity) {
          list.color = this.obj.beforeList[i].color
          list.realQuantity = this.obj.beforeList[i].inputQuantity
          list.needBuyQuantity = this.obj.beforeList[i].inputRealQuantity
          this.requestParams.lstBuyQuantity.push(list)
        }
      }
      this.requestParams.madanImgUrls = []
      for (let i = 0; i < this.imgUrls.length; i++) {
        this.requestParams.madanImgUrls.push(this.imgUrls[i].slice(21))
      }
      newRequest({
        url: '/redwood/replace/input',
        methods: 'post',
        contentType: 'application/json',
        data: this.requestParams
      }).then((res) => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.toBack()
        } else {
          this.$message.error(res.msg)
        }
      })
      console.log(this.requestParams)
    },
    checkOutInput() {
      let flag = true
      for (let i = 0; i < this.obj.beforeList.length; i++) {
        if (!this.obj.beforeList[i].inputQuantity) {
          console.log(this.obj.beforeList[i], '55')
          flag = true
          break
        }
        if (!this.obj.beforeList[i].inputRealQuantity) {
          flag = true
          break
        }
        flag = false
      }
      return flag
    },
    calPrice() {
      console.log(this.obj.beforeList)
      this.totalPrice = 0
      this.totalCostPrice = 0
      for (let i = 0; i < this.obj.beforeList.length; i++) {
        if (this.obj.beforeList[i].inputRealQuantity) {
          for (let j = 0; j < this.obj.order.colorList.length; j++) {
            if (this.obj.beforeList[i].color == this.obj.order.colorList[j].color) {
              this.totalPrice += this.obj.beforeList[i].inputRealQuantity * this.obj.order.colorList[j].price
              this.totalCostPrice += (this.obj.beforeList[i].inputQuantity) * this.obj.order.colorList[j].price
            }
          }
        }
      }
    },
    calWordCount() {
      this.wordCount = this.requestParams.purchaserRemark.length
      if (this.wordCount > 500) {
        this.$message('备注长度不得超过500')
        this.confirmBtn = true
      } else {
        this.confirmBtn = false
      }
    },
    toBack() {
      window.history.go(-1)
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
              })
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
    formatDate(val) {
      let date = new Date(val)
      // console.log(date)
      if (val) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
      } else {
        return '--'
      }
      return y + '-' + m + '-' + d
    },
    formateImgList(list) {
      let arr = []
      for (let i = 0; i < list.length; i++) {
        arr.push(this.imgPath + list[i])
      }
      return arr
    },
  }
}
</script>

<style lang='scss' scoped>
.title-box {
  padding-bottom: 8px;
  border-bottom: 1px dashed #3b3b3b;
  width: 100%;
}

.form-box {
  padding-left: 20px;
}

.form-box .el-form-item {
  margin: 0px;
  padding: 0px;
  padding-left: 20px;
}

.el-popover {
  margin: 0px;
  padding-right: 50px;
}

.el-popover .el-form-item {
  margin: 0px;
  padding: 0px;
}

.table-box {
  margin-top: 12px;
  width: 740px;
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
</style>
