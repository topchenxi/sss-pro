<template>
  <section min-width="1300">
    <div class="title-box">
      <span style="font-weight:600;">基本信息</span>
      <el-button type="primary" size="small" style="margin-left:50px;" @click.native="toBack">返回</el-button>
    </div>
    <div class="form-box">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="订单号">
          <span>{{obj.order.serviceNumber}}</span>
        </el-form-item>
        <el-form-item label="采购商">
          <!--弹出框  -->
          <el-popover placement="top-start" title="" trigger="click" width="250">
            <el-form label-position="right" label-width="120px">
              <el-form-item label="采购商ID:">
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
            </el-form>
            <el-button slot="reference" type="text" style="font-size: 15px;">{{obj.order.customerCompany}}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="供应商">
          <!--弹出框  -->
          <el-popover placement="bottom" title="" trigger="click" width="">
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
            <span style=" display:block; width: 90%; float:left">{{obj.order.leaveMessage}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.sellerMessage">
          <el-form-item label="买货员备注">
            <span style="display:block; width: 90%; float:left">{{obj.order.sellerMessage}}</span>
          </el-form-item>
        </template>
        <el-form-item label="采购明细">
          <table style="border-collapse:collapse" border="1" border-spacing="0" class="table-box">
            <tr>
              <th style="width:150px">货号</th>
              <th style="width:120px" colspan="1">色号</th>
              <th style="width:120px" colspan="1">采购数量</th>
              <th style="width:120px" colspan="1">销售单价</th>
              <th style="width:120px" colspan="1">采购单价</th>
              <th style="width:120px" colspan="1">成本单价</th>
            </tr>
            <tr>
              <td :rowspan="obj.order.colorList.length + 1" style="text-align:center">{{obj.order.productNumber}}</td>
              <tr v-for="(item,index) in obj.order.colorList">
                <td style="text-align:center">{{item.color}}</td>
                <td style="text-align:center">{{item.quantity}}{{item.quantityUnit}}</td>
                <td style="text-align:center">{{item.salePrice}}{{item.salePriceUnit}}</td>
                <td style="text-align:center">{{item.buyPrice}}{{item.buyPriceUnit}}</td>
                <td style="text-align:center">{{item.price}}{{item.priceUnit}}</td>
              </tr>
            </tr>
            <tr>
              <td colspan="6" style="text-align: right;padding-right: 8px;">
                <label style="border-right: 1px solid #3b3b3b; padding-left:8px; padding-right: 8px;">销售货款:
                  <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                </label>
                <label style="border-right: 1px solid #3b3b3b; padding-left:8px; padding-right: 8px;">采购货款:
                  <strong style="color: #f00">￥{{obj.order.buyMoney | formatMoney}}</strong>
                </label>
                <label style="border-right: 1px solid #3b3b3b; padding-left:8px; padding-right: 8px;">成本货款:
                  <strong style="color: #f00">￥{{obj.order.costMoney | formatMoney}}</strong>
                </label>
                <label style="padding-left:8px;">采购商税款:
                  <strong style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}({{obj.order.taxPoint}}%)</strong>
                </label>
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
    <lightbox></lightbox>
    <div class="title-box">
      <span style="font-weight:600">退换货内容</span>
    </div>
    <div class="form-box">
      <el-form label-width="120px" label-position="right">
        <template v-if="obj.type == 1 || obj.type == 2">
          <el-form-item label="入仓单号">
            <span>{{obj.inReposityNumber}}</span>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="出仓单号">
            <span>{{obj.outReposityNumber}}</span>
          </el-form-item>
        </template>
        <el-form-item label="可退换货数量">
          <span>共{{totalBuchang}}{{totalBuchangUnit}}/{{totalQuantityCount}}匹</span>
          <!--待确认  -->
        </el-form-item>
        <el-form-item label="退换类型" :required="true">
          <el-radio-group v-model="radio1" @change="selectType" style="margin-top:12px;">
            <el-radio-button :label="10" :disabled="radio1 != 10">退</el-radio-button>
            <el-radio-button :label="11" :disabled="radio1 != 11">换</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退换原因" :required="true">
          <el-select v-model="reason" @change="changeSelect" placeholder="请选择" style="margin-top: 12px;" :disabled="true">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <template v-if="reasonInput">
            <el-input style="width:150px; margin-left:20px;" v-model="reasonstr"></el-input>
          </template>
        </el-form-item>
        <template v-if="obj.type == 1 || obj.type == 3">
          <el-form-item label="退货明细" :required="true">
            <el-table :data="obj.beforeList" border style="margin-top:12px; width:1110px" ref="detailTable">
              <el-table-column width="120px" label="货号" prop="productNumber" :formatter="inputProductNumber"></el-table-column>
              <el-table-column label="色号" prop="color"></el-table-column>
              <el-table-column width="150px" label="销售单价" prop="" align="right">
                <template scope="scope">
                  <span>{{scope.row.salePrice | formatMoneym}}{{scope.row.salePriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150px" label="采购单价" prop="" align="right">
                <template scope="scope">
                  <span>{{scope.row.buyPrice | formatMoneym}}{{scope.row.buyPriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column label="税点" prop="taxPoint" align="center" :formatter="formatSellerTaxPoint"></el-table-column>
              <el-table-column label="*退货原数" prop="" width="150px">
                <template scope="scope">
                  <span>共{{scope.row.selectQuantityCount}}匹/{{scope.row.selectBuchang}}{{totalBuchangUnit}}</span>
                  <template v-if="scope.row.productNumber == '合计'"></template>
                  <template v-else>
                    <el-popover placement="bottom" title="" trigger="click" width="545" ref="popover1" :disabled="popoverVisible" :value="popoverVisible">
                      <el-table :data="clothLoneList" border>
                        <el-table-column prop="" label="色号" :formatter="formatColor" align="center" width="100px"></el-table-column>
                        <el-table-column prop="number" label="匹号" align="center" width="100px"></el-table-column>
                        <el-table-column prop="" label="入仓实数" align="center" width="100px">
                          <template scope="scope">
                            <span>{{scope.row.quantity}}{{scope.row.quantityUnit}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="" label="实际布长" align="center">
                          <template scope="scope">
                            <span>{{scope.row.buchang}}{{scope.row.buchangUnit}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="checkFlaws" label="验布结果" align="center" width="120px" :formatter="formatCheckBu"></el-table-column>
                      </el-table>
                      <el-button type="primary" size="mini" @click.native="confirmSelect(scope.row)">确认</el-button>
                      <el-button size="mini" @click.native="setTrue">取消</el-button>
                      <el-button slot="reference" ref="button" class="el-icon-arrow-down" size="mini" @click.native="setPopColor(scope.row, scope.$index)"></el-button>
                    </el-popover>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="*退货实数" width="150px" align="center">
                <template scope="scope">
                  <template v-if="scope.row.color">
                    <el-input style="width:70px;" v-model="scope.row.inputQuantity" @input="calInputQuantity"></el-input>
                    <span>{{totalBuchangUnit}}</span>
                  </template>
                  <template v-else>
                    <span>{{scope.row.inputQuantity}}{{totalBuchangUnit}}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <template v-if="obj.type == 4 || obj.type == 3">
            <el-form-item label="已出仓成本货款" style="margin-top:12px">
              <template v-if="obj.order.type == 1">
                <span>{{serviceSaleMoney | formatMoney}}元</span>
              </template>
              <template v-else>{{tradSaleMoney | formatMoney}}元</template>
            </el-form-item>
          </template>
          <template v-if="obj.followerRemark">
            <el-form-item label="跟单员退货备注">
              <span>{{obj.followerRemark}}</span>
            </el-form-item>
          </template>
          <el-form-item label="买货员退货备注">
            <el-input type="textarea" v-model="requestParams.purchaserRemark" @input="updateVal" style="width:250px; margin-top:12px;"></el-input>
            </br>
            <span style="color:#f00; margin-left: 215px;">{{wordCount}}/500</span>
          </el-form-item>
        </template>
        <template v-if="obj.type == 2 || obj.type == 4">
          <el-form-item label="换货明细" :required="true">
            <el-table :data="obj.beforeList" border style="margin-top:12px; width:1110px" ref="detailTable">
              <el-table-column width="120px" label="货号" prop="productNumber" :formatter="inputProductNumber"></el-table-column>
              <el-table-column label="色号" prop="color"></el-table-column>
              <el-table-column width="150px" label="销售单价" prop="" align="center">
                <template scope="scope">
                  <span>{{scope.row.salePrice | formatMoneym}}{{scope.row.salePriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150px" label="采购单价" prop="" align="center">
                <template scope="scope">
                  <span>{{scope.row.buyPrice | formatMoneym}}{{scope.row.buyPriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150" label="成本单价" align="center">
                <template scope="scope">
                  <span>{{scope.row.costPrice | formatMoneym}}{{scope.row.costPriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column label="税点" prop="taxPoint" align="center" :formatter="formatSellerTaxPoint"></el-table-column>
              <el-table-column label="*换货原数" prop="" width="150px">
                <template scope="scope">
                  <span>共{{scope.row.selectQuantityCount}}匹/{{scope.row.selectBuchang}}{{totalBuchangUnit}}</span>
                  <template v-if="scope.row.productNumber == '合计'"></template>
                  <template v-else>
                    <el-popover placement="bottom" title="" trigger="click" width="545" ref="popover1" :disabled="popoverVisible" :value="popoverVisible">
                      <el-table :data="clothLoneList" border>
                        <el-table-column prop="" label="色号" :formatter="formatColor" align="center" width="100px"></el-table-column>
                        <el-table-column prop="number" label="匹号" align="center" width="100px"></el-table-column>
                        <el-table-column prop="" label="入仓实数" align="center" width="100px">
                          <template scope="scope">
                            <span>{{scope.row.quantity}}{{scope.row.quantityUnit}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="" label="实际布长" align="center">
                          <template scope="scope">
                            <span>{{scope.row.buchang}}{{scope.row.buchangUnit}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="checkFlaws" label="验布结果" align="center" width="120px" :formatter="formatCheckBu"></el-table-column>
                      </el-table>
                      <el-button type="primary" size="mini" @click.native="confirmSelect(scope.row)">确认</el-button>
                      <el-button size="mini" @click.native="setTrue">取消</el-button>
                      <el-button slot="reference" ref="button" class="el-icon-arrow-down" size="mini" @click.native="setPopColor(scope.row, scope.$index)"></el-button>
                    </el-popover>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="换货实数" width="150px" align="center">
                <template scope="scope">
                  <template v-if="scope.row.color">
                    <el-input style="width:70px;" v-model="scope.row.inputQuantity" @input="calInputQuantity"></el-input>
                    <span>{{totalBuchangUnit}}</span>
                  </template>
                  <template v-else>
                    <span>{{scope.row.inputQuantity}}{{totalBuchangUnit}}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <template v-if="rrMadanList.length">
            <el-form-item label="换货码单">
              <el-row>
                <el-col style="min-width:130px;margin-top:12px;" :span="2" :href="item" :key="item" v-lightbox="rrMadanList" v-for="(item, index) in rrMadanList" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px 10px 0px 22px' }">
                    <img :src="item" style="width:80px; height:80px;cursor:pointer">
                    <div style="padding: 0;">
                      <p>码单
                        <span>({{rrMadanList.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>
          </template>
          <template v-if="obj.type == 3 || obj.type == 4">
            <el-form-item label="已出仓成本货款" style="margin-top:12px">
              <template v-if="obj.order.type == 1">
                <span>{{serviceSaleMoney | formatMoney}}元</span>
              </template>
              <template v-else>{{tradSaleMoney | formatMoney}}元</template>
            </el-form-item>
          </template>
          <template v-if="obj.followerRemark">
            <el-form-item label="跟单员换货备注">
              <span>{{obj.followerRemark}}</span>
            </el-form-item>
          </template>
          <el-form-item label="买货员换货备注">
            <el-input type="textarea" v-model="requestParams.purchaserRemark" @input="updateVal" style="width:250px; margin-top:12px;"></el-input>
            </br>
            <span style="color:#f00; margin-left: 215px;">{{wordCount}}/500</span>
          </el-form-item>
        </template>
        <el-form-item>
          <template v-if="obj.type == 1 || obj.type == 3">
            <el-button type="primary" @click.native="confirmEditSubmit" :disabled="wordCount > 500" style="margin-top:25px;">退货出仓</el-button>
          </template>
          <template v-if="obj.type == 2 || obj.type == 4">
            <el-button type="primary" @click.native="confirmEditSubmit" :disabled="wordCount > 500" style="margin-top:25px;">换货出仓</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div style="height:250px;"></div>
  </section>
</template>

<script>
import { newRequest } from 'utils/tool'
// import config from '../data.json'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    Lightbox,
  },
  data() {
    return {
      serviceSaleMoney: 0,
      tradSaleMoney: 0,
      selectIndex: 0,
      rrMadanList: [],
      popoverVisible: false,
      reasonInput: false,
      radio1: 11,
      clothLoneList: [],
      imgPath: 'http://www.soouya.com',
      madanList: [],
      sellerPayList: [],
      wuliuList: [],
      popColor: '',
      reason: '',
      reasonstr: '',
      wordCount: 0,
      totalBuchang: 0,
      totalBuchangUnit: '',
      totalQuantityCount: 0,
      columns: [],
      options: [
        {
          value: '1',
          label: '客户要求退货',
        },
        {
          value: '2',
          label: '验货不通过退货',
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      requestParams: {
        id: '',
        type: 2,
        reason: '',
        lstClothLoneIdToReturnReplace: [],
        followerRemark: '',
        agreeOrNot: 1,
        purchaserRemark: '',
        realQuantityList: [
        ]
      },
      obj: {
        order: {
          colorList: [],
        },
        beforeList: [
          {
            clothLoneList: [],
          }
        ],
      },
    }
  },
  mounted() {
    this.requestParams.id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData() {
      // let res = config.detail
      // this.obj = res.obj
      newRequest({
        url: '/redwood/returnreplace/getById',
        data: this.requestParams,
        method: 'get',
        contentType: 'applicaition/json'
      }).then((res) => {
        this.obj = res.obj
        if (res.success == 1) {
          if (this.obj.type == 1 || this.obj.type == 3) {
            this.radio1 = 10
          } else {
            this.radio1 = 11
          }
          // if (this.obj.reason.indexOf('客户要求') > -1) {
          //   this.reason = 1
          // } else if (this.obj.reason.indexOf('验货不通过') > -1) {
          //   this.reason = 2
          // } else {
          //   this.reason = 3
          //   this.reasonstr = this.obj.reason
          // }
          this.reason = this.obj.reason
          this.requestParams.reason = this.obj.reason
          // console.log(this.obj)
          this.totalBuchang = 0
          this.totalQuantityCount = 0
          for (let i = 0; i < this.obj.beforeList.length; i++) {
            let quantityCount = 0
            let totalQuantity = 0
            let totalUnit = this.obj.beforeList[0].clothLoneList[0].buchangUnit
            this.totalBuchangUnit = totalUnit
            this.totalQuantityCount += this.obj.beforeList[i].clothLoneList.length
            this.obj.beforeList[i].inputQuantity = this.obj.beforeList[i].realQuantity
            for (let j = 0; j < this.obj.beforeList[i].clothLoneList.length; j++) {
              this.totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
              if (!this.obj.beforeList[i].clothLoneList[j].hasSelected) {
                quantityCount += 1
                totalQuantity += this.obj.beforeList[i].clothLoneList[j].quantity
                this.requestParams.lstClothLoneIdToReturnReplace.push(this.obj.beforeList[i].clothLoneList[j].id)
                if (this.obj.beforeList[i].clothLoneList[j].quantity) {
                  this.serviceSaleMoney += this.obj.beforeList[i].clothLoneList[j].quantity * this.obj.beforeList[i].salePrice
                } else {
                  this.serviceSaleMoney += 0 * this.obj.beforeList[i].salePrice
                }
                if (this.obj.beforeList[i].clothLoneList[j].realQuantity) {
                  this.tradSaleMoney += this.obj.beforeList[i].clothLoneList[j].realQuantity * this.obj.beforeList[i].salePrice
                } else {
                  this.tradSaleMoney += 0 * this.obj.beforeList[i].salePrice
                }
              }
            }
            this.obj.beforeList[i].selectQuantityCount = quantityCount
            this.obj.beforeList[i].selectBuchang = totalQuantity
            this.obj.beforeList[i].selectBuchangUnit = totalUnit
          }
          if (this.obj.beforeList[this.obj.beforeList.length - 1].productNumber == '合计') {
            this.obj.beforeList.splice(this.obj.beforeList.length - 1, 1)
          }
          this.madanList = this.formateImgList(this.obj.order.madanImgUrls)
          this.wuliuList = this.formateImgList(this.obj.order.sendCertificateList)
          this.sellerPayList = this.formateImgList(this.obj.order.buyerCertificateList)
          this.rrMadanList = this.formateImgList(this.obj.madanImgUrls)
          // this.rrMadanList.push('http://www.soouya.com/upload/redwood/madan/10cdebee-729b-4939-9071-afafc885c922.jpg')
          this.calQuantity()
          this.updateVal()
          this.$store.dispatch('changeload', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 处理确认"提交审核"按钮事件
    confirmEditSubmit() {
      let len = this.obj.beforeList.length - 1
      let hadInput = true
      for (let i = 0; i < len; i++) {
        let inputList = {
          color: '',
          quantity: 0
        }
        if (!this.obj.beforeList[i].inputQuantity && this.obj.beforeList[i].selectQuantityCount != 0) {
          hadInput = false
          break
        } else if (this.obj.beforeList[i].selectQuantityCount != 0) {
          inputList.color = this.obj.beforeList[i].color
          inputList.quantity = this.obj.beforeList[i].inputQuantity
          this.requestParams.realQuantityList.push(inputList)
        }
      }
      if (!hadInput) {
        this.$message('请填写退换货实数')
      } else {
        // if (this.radio1 == 11) {
        //   this.requestParams.type = 4
        // }
        // if (this.radio1 == 10) {
        //   this.requestParams.type = 3
        // }
        this.selectType()
        if (!this.requestParams.type) {
          this.$message('请选择退换货类型')
        } else if (this.requestParams.lstClothLoneIdToReturnReplace.length == 0) {
          this.$message('退换布匹数不得少于1匹')
        } else {
          // console.log(this.requestParams)
          newRequest({
            url: '/redwood/returnreplace/review',
            method: 'post',
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
        }
      }
    },
    confirmSelect(rows) {
      // rows.clothLoneList = JSON.parse(JSON.stringify(this.clothLoneList))
      // let list = this.requestParams.lstClothLoneIdToReturnReplace
      // rows.clothLoneList.forEach(row => {
      //   console.log(row)
      //   let exist = false
      //   if (!row.isChecked) {
      //     for (let i = 0; i < list.length; i++) {
      //       if (list[i] == row.id) {
      //         exist = true
      //         break
      //       }
      //     }
      //     if (!exist) {
      //       list.push(row.id)
      //     }
      //     row.hasSelected = 1
      //   } else {
      //     for (let i = 0; i < list.length; i++) {
      //       if (row.id == list[i]) {
      //         list.splice(i, 1)
      //       }
      //     }
      //     row.hasSelected = 0
      //   }
      // })
      // this.requestParams.lstClothLoneIdToReturnReplace = list.slice(0)
      this.popoverVisible = true
      // for (let i = 0; i < this.obj.beforeList.length; i++) {
      //   let quantityCount = 0
      //   let totalBuchang = 0
      //   let totalUnit = ''
      //   for (let j = 0; j < this.obj.beforeList[i].clothLoneList.length; j++) {
      //     if (this.obj.beforeList[i].clothLoneList[j].hasSelected) {
      //       quantityCount += 1
      //       totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
      //       totalUnit = this.obj.beforeList[i].clothLoneList[j].buchangUnit
      //     }
      //   }
      //   this.obj.beforeList[i].selectQuantityCount = quantityCount
      //   this.obj.beforeList[i].selectBuchang = totalBuchang
      //   this.obj.beforeList[i].selectBuchangUnit = totalUnit
      // }
      // let len = this.obj.beforeList.length
      // this.obj.beforeList.splice(len - 1, 1)
      // this.calQuantity()
      // console.log(this.obj.beforeList)
    },
    calInputQuantity() {
      let len = this.obj.beforeList.length
      this.obj.beforeList[len - 1].inputQuantity = 0
      for (let i = 0; i < len - 1; i++) {
        if (!this.obj.beforeList[i].inputQuantity) {
        } else {
          this.obj.beforeList[len - 1].inputQuantity += parseFloat(this.obj.beforeList[i].inputQuantity)
        }
        console.log(i)
      }
      // console.log(this.obj.beforeList)
    },
    calQuantity() {
      let lastObj = JSON.parse(JSON.stringify(this.obj.beforeList[0]))
      lastObj.productNumber = '合计'
      lastObj.color = ''
      lastObj.salePrice = null
      lastObj.salePriceUnit = ''
      lastObj.buyPrice = null
      lastObj.buyPriceUnit = ''
      lastObj.taxPoint = ''
      lastObj.costPrice = ''
      lastObj.costPriceUnit = ''
      lastObj.selectBuchang = 0
      lastObj.selectQuantityCount = 0
      lastObj.inputQuantity = ''
      this.obj.beforeList.forEach(item => {
        lastObj.selectBuchang += item.selectBuchang
        lastObj.selectQuantityCount += item.selectQuantityCount
      })
      this.obj.beforeList.push(lastObj)
      // console.log(lastObj)
    },
    selectable(row, column) {
      if (row.selectQuantityCount != 0) {
        return true
      } else {
        return false
      }
    },
    updateVal() {
      this.wordCount = this.requestParams.purchaserRemark.length
      if (this.wordCount > 500) {
        this.$message('备注长度不得超过500字')
      }
    },
    setTrue() {
      this.popoverVisible = true
    },
    // 设置popover中的色号及判断是否选中
    setPopColor(row, index) {
      // console.log(index)
      this.selectIndex = index
      this.popoverVisible = false
      this.popColor = row.color
      let rows1 = row.clothLoneList
      if (rows1) {
        rows1.forEach(row1 => {
          if (row1.hasSelected) {
            row1.isChecked = true
          } else {
            row1.isChecked = false
          }
        })
      }
      this.clothLoneList = JSON.parse(JSON.stringify(rows1))
    },
    changeSelect(val) {
      if (val == 3) {
        this.reasonInput = true
      } else {
        this.reasonInput = false
        this.reasonstr = ''
      }
    },
    selectType(val) {
      // console.log(val)
      if (this.obj.type == 1) {
        if (this.val == 11) {
          this.requestParams.type = 2
        } else {
          this.requestParams.type = 1
        }
      } else if (this.obj.type == 2) {
        if (this.val == 11) {
          this.requestParams.type = 2
        } else {
          this.requestParams.type = 1
        }
      } else if (this.obj.type == 3) {
        if (this.val == 11) {
          this.requestParams.type = 4
        } else {
          this.requestParams.type = 3
        }
      } else if (this.obj.type == 4) {
        if (this.val == 11) {
          this.requestParams.type = 4
        } else {
          this.requestParams.type = 3
        }
      }
    },
    toBack() {
      window.history.go(-1)
    },
    formatMoneym(row, column) {
      let val = row[column.property]
      if (val) {
        return parseFloat(val).toFixed(2)
      } else {
        return ''
      }
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
    formatColor(row, column) {
      let val = row[column.property]
      return val === undefined ? this.popColor : val
    },
    inputProductNumber(row, column) {
      let val = row[column.property]
      return val === undefined ? this.obj.order.productNumber : val
    },
    formatSellerTaxPoint(row, column) {
      let val = row[column.property]
      if (val == undefined) {
        if (this.obj.order.sellerTaxPoint != null) {
          return this.obj.order.sellerTaxPoint + '%'
        } else {
          return '--'
        }
      } else {
        return val
      }
    }
  },
  filters: {
    formatMoneym(val) {
      return val === null ? '' : Number(val).toFixed(2)
    },
  }
}
</script>

<style scoped>
.title-box {
  padding-bottom: 8px;
  border-bottom: 1px dashed #3b3b3b;
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
}

.el-popover .el-form-item {
  margin: 0px;
  padding: 0px;
}

.table-box {
  margin-top: 12px;
}
</style>
