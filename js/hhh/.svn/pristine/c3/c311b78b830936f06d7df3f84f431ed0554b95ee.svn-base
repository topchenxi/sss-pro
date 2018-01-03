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
              <!-- <el-form-item label="结算周期:">
                                                                                                                                                  <span>{{5555}}</span>
                                                                                                                                                </el-form-item> -->
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
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.leaveMessage}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.sellerMessage">
          <el-form-item label="买货员备注">
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.sellerMessage}}</span>
          </el-form-item>
        </template>
        <el-form-item label="采购明细">
          <table style="border-collapse:collapse" border="1" border-spacing="0" class="table-box">
            <tr>
              <th style="width:22.2%">货号</th>
              <th style="width:22.2%" colspan="1">色号</th>
              <th style="width:18.5%" colspan="1">采购数量</th>
              <th style="width:18.5%" colspan="1">销售单价</th>
              <th style="width:18.5%" colspan="1">采购单价</th>
            </tr>
            <tr>
              <td :rowspan="obj.order.colorList.length + 1" style="text-align:center">{{obj.order.productNumber}}</td>
              <tr v-for="(item,index) in obj.order.colorList">
                <td style="text-align:center">{{item.color}}</td>
                <td style="text-align:center">{{item.quantity}}{{item.quantityUnit}}</td>
                <td style="text-align:center">{{item.salePrice}}{{item.salePriceUnit}}</td>
                <td style="text-align:center">{{item.buyPrice}}{{item.buyPriceUnit}}</td>
              </tr>
            </tr>
            <tr>
              <td colspan="5" style="text-align: right;padding-right: 8px;">
                <label style="border-right: 1px solid #3b3b3b; padding-left:8px; padding-right: 8px;">销售货款:
                  <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                </label>
                <label style="border-right: 1px solid #3b3b3b; padding-left:8px; padding-right: 8px;">采购货款:
                  <strong style="color: #f00">￥{{obj.order.buyMoney | formatMoney}}</strong>
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
        <el-form-item label="入仓单号">
          <span>{{obj.inReposityNumber}}</span>
        </el-form-item>
        <el-form-item label="可退换货数量">
          <span>共{{totalBuchang}}{{totalBuchangUnit}}/{{totalQuantityCount}}匹</span>
          <!--待确认  -->
        </el-form-item>
        <el-form-item label="退换类型" :required="true">
          <el-radio-group v-model="radio1" @change="selectType" style="margin-top:12px;">
            <el-radio-button :label="10">退</el-radio-button>
            <el-radio-button :label="11">换</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <template v-if="radio1 == 10">
          <el-form-item label="退货原因" :required="true">
            <el-select v-model="reason" @change="changeSelect" placeholder="请选择" style="margin-top: 12px;">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <template v-if="reasonInput">
              <el-input style="width:150px; margin-left:20px;" v-model="reasonstr"></el-input>
            </template>
          </el-form-item>
          <el-form-item label="退货明细" :required="true">
            <el-table :data="obj.beforeList" border style="margin-top:12px; width:960px" ref="detailTable">
              <el-table-column width="180px" label="货号" prop="productNumber" :formatter="inputProductNumber"></el-table-column>
              <el-table-column width="150px" label="色号" prop="color"></el-table-column>
              <el-table-column width="150px" label="销售单价" prop="" align="center">
                <template scope="scope">
                  <span>{{scope.row.salePrice | formatMoneym}}{{scope.row.salePriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150px" label="采购单价" prop="" align="right">
                <template scope="scope">
                  <span>{{scope.row.buyPrice | formatMoneym}}{{scope.row.buyPriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150px" label="税点" prop="taxPoint" align="center" :formatter="formattaxPoint"></el-table-column>
              <el-table-column label="*退货原数" prop="">
                <template scope="scope">
                  <span>共{{scope.row.selectQuantityCount}}匹/{{scope.row.selectBuchang | formatMoney}}{{totalBuchangUnit}}</span>
                  <template v-if="scope.row.productNumber == '合计'"></template>
                  <template v-else>
                    <el-popover placement="bottom" title="" trigger="click" width="600" ref="popover1" :disabled="popoverVisible" :value="popoverVisible">
                      <template>
                        <input type="checkbox" v-model="scope.row.selectAll" @change="handleSelectAll(scope)" id="allSelectbox">全选</input>
                      </template>
                      <el-table :data="clothLoneList" border>
                        <el-table-column width="50px" align="center">
                          <template scope="scope">
                            <input type="checkbox" v-model="scope.row.isChecked" name="checkbox" @change="handleSelectChange(scope)"></input>
                          </template>
                        </el-table-column>
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
                      <el-button type="primary" size="mini" @click.native="confirmSelect(scope.row)">选好了</el-button>
                      <el-button size="mini" @click.native="setTrue">取消</el-button>
                      <el-button slot="reference" ref="button" class="el-icon-arrow-down" size="mini" @click.native="setPopColor(scope.row, scope.$index)"></el-button>
                    </el-popover>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </template>
        <template v-if="radio1 == 11">
          <el-form-item label="换货原因" :required="true">
            <el-select v-model="reason" @change="changeSelect" placeholder="请选择" style="margin-top: 12px;">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <template v-if="reasonInput">
              <el-input style="width:150px; margin-left:20px;" v-model="reasonstr"></el-input>
            </template>
          </el-form-item>
          <el-form-item label="换货明细" :required="true">
            <el-table :data="obj.beforeList" border style="margin-top:12px; width:960px" ref="detailTable">
              <el-table-column width="180px" label="货号" prop="productNumber" :formatter="inputProductNumber"></el-table-column>
              <el-table-column width="150px" label="色号" prop="color"></el-table-column>
              <el-table-column width="150px" label="销售单价" prop="" align="center">
                <template scope="scope">
                  <span>{{scope.row.salePrice | formatMoneym}}{{scope.row.salePriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150px" label="采购单价" prop="" align="right">
                <template scope="scope">
                  <span>{{scope.row.buyPrice | formatMoneym}}{{scope.row.buyPriceUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150px" label="税点" prop="taxPoint" align="center" :formatter="formattaxPoint"></el-table-column>
              <el-table-column label="*换货原数" prop="">
                <template scope="scope">
                  <span>共{{scope.row.selectQuantityCount}}匹/{{scope.row.selectBuchang | formatMoney}}{{totalBuchangUnit}}</span>
                  <template v-if="scope.row.productNumber == '合计'"></template>
                  <template v-else>
                    <el-popover placement="bottom" title="" trigger="click" width="600" ref="popover1" :disabled="popoverVisible" :value="popoverVisible">
                      <template>
                        <input type="checkbox" v-model="scope.row.selectAll" @change="handleSelectAll(scope)" id="allSelectbox">全选</input>
                      </template>
                      <el-table :data="clothLoneList" border>
                        <el-table-column width="50px" align="center">
                          <template scope="scope">
                            <input type="checkbox" v-model="scope.row.isChecked" name="checkbox" @change="handleSelectChange(scope)"></input>
                          </template>
                        </el-table-column>
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
                      <el-button type="primary" size="mini" @click.native="confirmSelect(scope.row)">选好了</el-button>
                      <el-button size="mini" @click.native="setTrue">取消</el-button>
                      <el-button slot="reference" ref="button" class="el-icon-arrow-down" size="mini" @click.native="setPopColor(scope.row, scope.$index)"></el-button>
                    </el-popover>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </template>
        <template v-if="obj.type == 1 || obj.type == 3">
          <el-form-item label="跟单员退货备注">
            <el-input type="textarea" v-model="requestParams.followerRemark" @input="updateVal" style="width:250px; margin-top:12px;"></el-input>
            </br>
            <span style="color:#f00; margin-left: 215px;">{{wordCount}}/500</span>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="跟单员换货备注">
            <el-input type="textarea" v-model="requestParams.followerRemark" @input="updateVal" style="width:250px; margin-top:12px;"></el-input>
            </br>
            <span style="color:#f00; margin-left: 215px;">{{wordCount}}/500</span>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click.native="confirmEditSubmit" :disabled="checkOutInput()" style="margin-top:25px;">提交审核</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="height:250px;"></div>
  </section>
</template>

<script>
import { newRequest } from 'utils/tool'
// import config from './data.json'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    Lightbox,
  },
  data() {
    return {
      selectIndex: 0,
      popoverVisible: false,
      reasonInput: false,
      radio1: 11,
      clothLoneList: [],
      imgPath: 'http://www.soouya.com',
      madanList: [],
      wuliuList: [],
      sellerPayList: [],
      popColor: '',
      reason: '',
      reasonstr: '',
      wordCount: 0,
      tableshow: true,
      totalBuchang: 0,
      totalBuchangUnit: '',
      totalQuantityCount: 0,
      columns: [],
      options1: [
        {
          value: '1',
          label: '客户要求换货',
        },
        {
          value: '2',
          label: '验货不通过换货',
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      options2: [
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
        type: 0,
        reason: '',
        lstClothLoneIdToReturnReplace: [],
        followerRemark: '',
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
      // let res = config.waitEdit
      // this.obj = res.obj
      newRequest({
        url: '/redwood/returnreplace/getForFollowerEdit',
        method: 'get',
        data: this.requestParams,
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.obj = res.obj
          if (this.obj.type == 1) {
            this.radio1 = 10
            this.requestParams.type = 1
          } else if (this.obj.type == 2) {
            this.requestParams.type = 2
            this.radio1 = 11
          } else if (this.obj.type == 3) {
            this.radio1 = 10
            this.requestParams.type = 3
          } else if (this.obj.type == 4) {
            this.radio1 = 11
            this.requestParams.type = 4
          }
          this.totalBuchang = 0
          this.totalQuantityCount = 0
          if (this.obj.reason.indexOf('客户要求') > -1) {
            this.reason = this.obj.reason
          } else if (this.obj.reason.indexOf('验货不通过') > -1) {
            this.reason = this.obj.reason
          } else {
            this.reason = this.obj.reason
          }
          // console.log(this.obj)
          for (let i = 0; i < this.obj.beforeList.length; i++) {
            let quantityCount = 0
            let totalBuchang = 0
            let totalUnit = this.obj.beforeList[0].clothLoneList[0].buchangUnit
            this.totalBuchangUnit = totalUnit
            this.totalQuantityCount += this.obj.beforeList[i].clothLoneList.length
            for (let j = 0; j < this.obj.beforeList[i].clothLoneList.length; j++) {
              this.totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
              if (this.obj.beforeList[i].clothLoneList[j].hasSelected) {
                quantityCount += 1
                totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
                this.requestParams.lstClothLoneIdToReturnReplace.push(this.obj.beforeList[i].clothLoneList[j].id)
              }
            }
            this.obj.beforeList[i].selectQuantityCount = quantityCount
            this.obj.beforeList[i].selectBuchang = totalBuchang
            this.obj.beforeList[i].selectBuchangUnit = totalUnit
          }
          if (this.obj.beforeList[this.obj.beforeList.length - 1].productNumber == '合计') {
            this.obj.beforeList.splice(this.obj.beforeList.length - 1, 1)
          }
          this.madanList = this.formateImgList(this.obj.order.madanImgUrls)
          this.wuliuList = this.formateImgList(this.obj.order.sendCertificateList)
          this.sellerPayList = this.formateImgList(this.obj.order.buyerCertificateList)
          this.requestParams.followerRemark = this.obj.followerRemark
          this.updateVal()
          this.calQuantity()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.$store.dispatch('changeload', false)
    },
    checkOutInput() {
      if (this.reason == 1 && this.radio1 == 10) {
        this.requestParams.reason = '客户要求退货'
      } else if (this.reason == 2 && this.radio1 == 10) {
        this.requestParams.reason = '验货不通过退货'
      } else if (this.reason == 1 && this.radio1 == 11) {
        this.requestParams.reason = '客户要求换货'
      } else if (this.reason == 2 && this.radio1 == 11) {
        this.requestParams.reason = '验货不通过换货'
      } else {
        this.requestParams.reason = this.reasonstr
      }
      let bool = false
      console.log(this.requestParams.type, this.requestParams.lstClothLoneIdToReturnReplace.length, this.requestParams.reason)
      if (this.requestParams.type && this.requestParams.lstClothLoneIdToReturnReplace.length && this.requestParams.reason && this.wordCount < 500) {
        bool = false
      } else {
        bool = true
      }
      return bool
    },
    // 处理确认"选好了"按钮事件
    confirmEditSubmit() {
      if (this.reason == 1 && this.radio1 == 10) {
        this.requestParams.reason = '客户要求退货'
      } else if (this.reason == 2 && this.radio1 == 10) {
        this.requestParams.reason = '验货不通过退货'
      } else if (this.reason == 1 && this.radio1 == 11) {
        this.requestParams.reason = '客户要求换货'
      } else if (this.reason == 2 && this.radio1 == 11) {
        this.requestParams.reason = '验货不通过换货'
      } else {
        this.requestParams.reason = this.reasonstr
      }
      if (!this.requestParams.type) {
        this.$message('请选择退换货类型')
      } else if (!this.requestParams.reason) {
        this.$message('请填写原因')
      } else if (this.requestParams.lstClothLoneIdToReturnReplace.length == 0) {
        this.$message('退换布匹数不得少于1匹')
      } else {
        // console.log(this.requestParams)
        this.$store.dispatch('changeload', true)
        newRequest({
          url: '/redwood/returnreplace/edit',
          data: this.requestParams,
          method: 'post',
          contentType: 'application/json'
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
      this.$store.dispatch('changeload', false)
    },
    handleSelectAll(scope) {
      console.log(scope)
      scope.row.clothLoneList.forEach(item => {
        item.isChecked = scope.row.selectAll
      })
      this.clothLoneList = scope.row.clothLoneList
      for (let i = 0; i < this.clothLoneList.length; i++) {
        let list = document.getElementsByName('checkbox')
        for (let j = 0; j < list.length; j++) {
          if (list[j].type == 'checkbox') {
            list[j].checked = this.clothLoneList[i].isChecked
          }
        }
      }
    },
    handleSelectChange(scope) {
      console.log(scope)
      for (let i = 0; i < this.obj.selectList.length; i++) {
        if (this.obj.selectList[i].clothLoneList[0].number == this.clothLoneList[0].number) {
          let allSelect = false
          for (let j = 0; j < this.clothLoneList.length; j++) {
            if (!this.clothLoneList[j].isChecked) {
              allSelect = false
              break
            }
            allSelect = true
          }
          console.log(allSelect)
          document.getElementById('allSelectbox').checked = allSelect
        }
      }
    },
    confirmSelect(rows) {
      rows.clothLoneList = JSON.parse(JSON.stringify(this.clothLoneList))
      let list = this.requestParams.lstClothLoneIdToReturnReplace
      rows.clothLoneList.forEach(row => {
        let exist = false
        if (row.isChecked) {
          for (let i = 0; i < list.length; i++) {
            if (list[i] == row.id) {
              exist = true
            }
          }
          if (!exist) {
            list.push(row.id)
          }
          row.hasSelected = 1
        } else {
          for (let i = 0; i < list.length; i++) {
            if (row.id == list[i]) {
              list.splice(i, 1)
            }
          }
          row.hasSelected = 0
        }
      })
      this.requestParams.lstClothLoneIdToReturnReplace = list.slice(0)
      this.setTrue()
      for (let i = 0; i < this.obj.beforeList.length; i++) {
        let quantityCount = 0
        let totalBuchang = 0
        let totalUnit = ''
        for (let j = 0; j < this.obj.beforeList[i].clothLoneList.length; j++) {
          if (this.obj.beforeList[i].clothLoneList[j].hasSelected) {
            quantityCount += 1
            totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
            totalUnit = this.obj.beforeList[i].clothLoneList[j].buchangUnit
          }
        }
        this.obj.beforeList[i].selectQuantityCount = quantityCount
        this.obj.beforeList[i].selectBuchang = totalBuchang
        this.obj.beforeList[i].selectBuchangUnit = totalUnit
      }
      let len = this.obj.beforeList.length
      this.obj.beforeList.splice(len - 1, 1)
      this.calQuantity()
      console.log(this.requestParams)
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
      lastObj.selectBuchang = 0
      lastObj.selectQuantityCount = 0
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
      this.wordCount = this.requestParams.followerRemark.length
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
      let allSelect = false
      for (let i = 0; i < this.clothLoneList.length; i++) {
        if (!this.clothLoneList[i].isChecked) {
          allSelect = false
          break;
        }
        allSelect = true
      }
      row.selectAll = allSelect
    },
    changeSelect(val) {
      if (val == 3) {
        this.reasonInput = true
      } else {
        this.reasonInput = false
        this.reasonstr = this.obj.reason || ''
      }
    },
    selectType(val) {
      console.log(val)
      if (this.obj.type == 1) {
        if (val == 11) {
          this.requestParams.type = 2
        } else {
          this.requestParams.type = 1
        }
      } else if (this.obj.type == 2) {
        if (val == 11) {
          this.requestParams.type = 2
        } else {
          this.requestParams.type = 1
        }
      } else if (this.obj.type == 3) {
        if (val == 11) {
          this.requestParams.type = 4
        } else {
          this.requestParams.type = 3
        }
      } else if (this.obj.type == 4) {
        if (val == 11) {
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
    formattaxPoint(row, column) {
      let val = row[column.property]
      if (val == undefined) {
        if (this.obj.order.taxPoint != null) {
          return this.obj.order.taxPoint + '%'
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
  width: 650px;
}
</style>
