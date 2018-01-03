<template>
  <div class="order-detail">
    <div class='title'>订单详情
      <el-button v-if="$route.query.noBar != 1" style="margin-left: 5px;" size="mini" type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <!-- <a href="#" @click.prevent="goback">返回列表页</a>  -->
    <div class="detial-wrap">
      <same-detail :orderDetail="orderDetail" :yesNotRequest="false" />
      <template v-if="$route.query.columnName != 'notifyPayView'">
        <!-- 当是从通知付款过来的时候不显示匹号信息 -->
        <div class="clearfix" style="margin-bottom: 5px;">
          <div class="clearfix" style="display: inline-block; position: relative;">
            <el-select v-model="checkCloth" placeholder="请选择" style="display: inline-block; width: 130px;" @change="selectPiHao" :disabled="$route.query.status != undefined">
              <el-option label="全部匹号" value="3">全部匹号</el-option>
              <el-option label="入仓单号" value="0">入仓单号</el-option>
              <el-option label="出仓单号" value="1">出仓单号</el-option>
            </el-select>
            <el-select placeholder="请选择" v-model="subCheckCloth" style="display: inline-block; width: 180px;" v-if="checkCloth != '3' && Object.keys(repsoityList).length" @change="selectSubPiHao" :disabled="$route.query.status != undefined">
              <el-option :label="key+'/共'+value.count+'匹'" :value="key" v-for="(value, key) in repsoityList">{{key}}/共{{value.count}}匹</el-option>
            </el-select>
          </div>
        </div>
        <div class="y_table_wrap">
          <el-table :data="resultSort" border style="width: 100%" :max-height="500">
            <el-table-column inline-template :label="'匹号信息('+result.length+')'" class-name="piWrap" min-width="220">
              <div class="pi-color">
                <p>
                  <span class="pi-l">匹号：</span>{{row.number}}
                  <span class="y-icon" v-if="row.isInReturn == 1">退</span>
                </p>
                <p>
                  <span class="pi-l">色号：</span>{{row.color}}</p>
                <p v-if="row.hasCheckReport == 1">
                  <span v-if="row.rank == 0">
                    <span class="pi-l">等级评分：</span>无等级</span>
                  <span v-if="row.rank == 1">
                    <span class="pi-l">等级评分：</span>A</span>
                  <span v-if="row.rank == 2">
                    <span class="pi-l">等级评分：</span>B</span>
                  <span v-if="row.rank == 3">
                    <span class="pi-l">等级评分：</span>C</span>
                  <span v-if="row.rank == 4">
                    <span class="pi-l">等级评分：</span>D</span>/{{Number(row.average).toFixed(2)}}分

                </p>
                <p v-if="row.hasCheckReport == 1">
                  <span>
                    <span>验布师：{{row.checkerName}}</span>
                  </span>
                </p>
                <el-popover trigger="hover" placement="top" v-if="row.outRepsoity">
                  <div class="pop-content" style="width: 400px;">
                    <p>通知出仓时间: {{ row.outRepsoity.createTime | convertTime}}</p>
                    <p>发货时间: {{ row.outRepsoity.outTime | convertTime}}</p>
                    <p>出仓人: {{ row.outRepsoity.outReposityRealName }}</p>
                    <p>出仓明细: {{ row.outRepsoity.outReposityDetail }}</p>
                    <p>配送方式: {{ row.outRepsoity.sendTypeStr }}</p>
                    <p>客户名称: {{orderDetail.company}}</p>
                    <p>收货地址: {{ row.outRepsoity.province }}{{ row.outRepsoity.city }}{{ row.outRepsoity.area }}{{ row.outRepsoity.addr }}</p>
                    <p>出仓备注: {{ row.outRepsoity.remark }}</p>
                  </div>
                  <div slot="reference" class="name-wrapper" style="text-align: center;">
                    <el-button type='text' size="small">出仓信息</el-button>
                  </div>
                </el-popover>
                </p>
              </div>
            </el-table-column>
            <el-table-column inline-template label="销售单价" min-width="120">
              <div>{{row.salePrice | convertNumber}}{{row.salePriceUnit}}</div>
            </el-table-column>
            <el-table-column inline-template label="采购单价" min-width="120" show-overflow-tooltip>
              <div>{{row.buyPrice | convertNumber}}{{row.buyPriceUnit}}</div>
            </el-table-column>
            <el-table-column v-if="buyerRole" inline-template label="成本单价" min-width="120" show-overflow-tooltip>
              <div>{{row.costPrice | convertNumber}}{{row.costPriceUnit}}</div>
            </el-table-column>
            <el-table-column inline-template label="入仓实数" min-width="120" show-overflow-tooltip>
              <div>{{row.quantity | convertNumber}}{{row.quantityUnit}}</div>
            </el-table-column>
            <el-table-column inline-template label="实际布长" min-width="120" show-overflow-tooltip>
              <div>{{row.buchang | convertNumber}}{{row.buchangUnit}}</div>
            </el-table-column>
            <el-table-column prop="quantity" label="入仓时间" min-width="120" inline-template show-overflow-tooltip>
              <div>{{row.inRepsoity.createTime | convertTime}}</div>
            </el-table-column>
            <el-table-column prop="quantity" label="入仓类型" min-width="120" inline-template show-overflow-tooltip>
              <div>{{row.inRepsoity.type | formateText}}</div>
            </el-table-column>
            <el-table-column label="操作" min-width="200" inline-template fixed="right">
              <div>
                <a :href="row.reportDetailUrl" target="_blank">
                  <el-button v-if="row.hasCheckReport == 1" size="small" type="primary">下载验货报告</el-button>
                </a>
                <a :href="row.checkReportDetailUrl" target="_blank">
                  <el-button v-if="row.hasCheckReport == 1" size="small">查看验货报告</el-button>
                </a>
              </div>
            </el-table-column>
          </el-table>
        </div>

        <div style="margin-top:10px">
          <el-button type='primary' style="margin-left: 5px;" @click.native="downReportDialog.isShow = true">
            批量下载
          </el-button>
        </div>

        <el-dialog title="批量下载" v-model="downReportDialog.isShow" size="small" class="downFileDialog">
          <div>
            <span style="width:70px; display:inline-block">下载类型:</span>
            <span>
              <el-radio-group v-model="downReportDialog.downType" @change="handleChangeDownType">
                <el-radio class="radio" :label="1">
                  验货报告
                </el-radio>
                <el-radio class="radio" :label="2">
                  销售发货单
                </el-radio>
              </el-radio-group>
            </span>
          </div>
          <div style="margin:20px 0">
            <el-select v-model="downReportDialog.checkCloth" placeholder="请选择" style="display: inline-block; width: 130px; margin-left:70px;" @change="selectColorPiHao">
              <el-option label="全部匹号" value="3">
                全部匹号
              </el-option>
              <el-option label="入仓单号" value="0">
                入仓单号
              </el-option>
              <el-option label="出仓单号" value="1">
                出仓单号
              </el-option>
            </el-select>
            <el-select placeholder="请选择" v-model="downReportDialog.subCheckCloth" style="display: inline-block; width: 180px;" v-if="downReportDialog.checkCloth != '3' && Object.keys(repsoityList).length" @change="selectColorSubPiHao">
              <el-option :label="key+'/共'+value.count+'匹'" :value="key" v-for="(value, key) in repsoityList">
                {{key}}/共{{value.count}}匹
              </el-option>
            </el-select>
          </div>
          <div class="color-checked-list" style="margin-left:70px;">
            <template v-if="Object.keys(downReportDialog.colorOrderList).length">
              <el-row type="flex" v-for="(value,key) in downReportDialog.colorOrderList">
                <el-col style="width:25%">
                  <el-checkbox v-model="value.checked" :disabled="downReportDialog.downType == '1' && value.list.every((item)=>{return !item.hasCheckReport})" @change="handleCheckAllColor(key)">
                    {{key}}/共{{value.list.length}}匹
                  </el-checkbox>
                </el-col>
                <el-col style="width:75%">
                  <el-checkbox v-for="item in value.list" v-model="item.checked" @change="handleCheckColor(key)" :disabled="!item.hasCheckReport && downReportDialog.downType == '1'" style="width:33%">
                    <span>{{item.number.substr(-2)}} /
                      <template v-if="orderDetail.type == 1">
                        {{item.quantity}}{{item.quantityUnit}}
                      </template>
                      <template v-else>
                        <span v-if="item.hasCheckReport == 1">{{item.buchang}}{{item.buchangUnit}}</span>
                        <span v-else>{{item.quantity}}{{item.quantityUnit}}</span>
                      </template>
                    </span>
                    <span v-if="item.isInReplace">(换货中)</span>
                  </el-checkbox>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <div style="text-align:center; padding:20px 0">
                暂无数据
              </div>
            </template>
          </div>
          <div style="text-align:right; margin-top:20px">
            合计
            <span style="color:red">{{countData.count}}</span>匹/
            <span style="color:red">{{countData.metre}}</span>{{countData.unit}}
          </div>
          <div style="margin:20px 0 20px 70px" slot="footer">
            <el-button type='primary' @click.nation="handleDownFile" :disabled="!countData.count">立即下载</el-button>
            <el-button type='primary' @click.nation="downReportDialog.isShow = false">取消</el-button>
          </div>
        </el-dialog>

      </template>
      <!-- 费用明细 -->
      <div class="block-title">费用明细</div>
      <table class='custom-table' v-if="orderDetail.productSource == 0">
        <!-- 订单为货源为现货 -->
        <tr>
          <td>销售货款： {{orderDetail.saleMoney | convertNumber}}元</td>
          <td>采购货款： {{orderDetail.buyMoney | convertNumber}}元</td>
          <!-- 贸易单时不显示服务费字段 -->
          <td v-if="orderDetail.type == 1">服务费： {{orderDetail.serviceMoney | convertNumber}}元</td>
          <td>采购商税款：{{orderDetail.taxMoney | convertNumber}}元（{{orderDetail.taxPoint}}%税点）</td>
        </tr>
        <tr v-if="buyerRole">
          <td>成本货款： {{orderDetail.costMoney | convertNumber}}元</td>
          <td>供应商税款： {{orderDetail.sellerTaxMoney | convertNumber}}元（{{orderDetail.sellerTaxPoint}}%税点）</td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <table class='custom-table' v-if="orderDetail.productSource == 1">
        <!-- 订单为货源为订货 -->
        <tr>
          <td>销售货款： {{orderDetail.saleMoney | convertNumber}}元</td>
          <td>采购货款： {{orderDetail.buyMoney | convertNumber}}元</td>
          <!-- 贸易单时不显示服务费字段 -->
          <td v-if="orderDetail.type == 1">服务费： {{orderDetail.serviceMoney |convertNumber}}元</td>
          <td v-if="buyerRole">成本货款： {{orderDetail.costMoney | convertNumber}}元</td>
          <td v-if="buyerRole">供应商税款： {{orderDetail.sellerTaxMoney | convertNumber}}元（{{orderDetail.sellerTaxPoint}}%税点）</td>
          <td v-else></td>
        </tr>
        <tr>
          <td>采购商税款： {{orderDetail.taxMoney | convertNumber}}元（{{orderDetail.taxPoint}}%税点）</td>
          <td>
            <!--从通知付款页 或者支付页 支付定金改为”定金“ -->
            <template v-if="$route.query.columnName != 'notifyPayView' && $route.query.columnName != 'payView'">已付</template>
            定金： {{orderDetail.earnestMoney | convertNumber}}元
          </td>
          <!-- 从通知付款页进入的详情页，当支付定金时，不展示尾款 -->
          <td>
            <template v-if="($route.query.columnName == 'notifyPayView' && $route.query.fundType == 3)">尾款： {{orderDetail.finalMoney | convertNumber}}元</template>
            <!-- 通知付款页 或者支付页 都不是 -->
            <template v-if="($route.query.columnName != 'notifyPayView' && $route.query.columnName != 'payView')">尾款： {{orderDetail.finalMoney | convertNumber}}元</template>
          </td>
          <td v-if="orderDetail.type == 1"></td>

        </tr>
      </table>
      <div class="block-title">码单及凭据</div>
      <div class="show-image">
        <el-row style="background: #fff; padding: 10px; border-radius: 4px;">
          <el-col style="margin-right: 10px;" :span="3" :href="item" :key="item" v-lightbox="madanList" v-for="(item, index) in madanList" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>码单
                  <span>({{madanList.length}}张)</span>
                </p>
                <!-- <p>2016-12-07 10:49</p>
                        <p>李跟单</p>
                        <p>备注：备注备注备注备注备注备注备注备注备注备注备注</p> -->
              </div>
            </el-card>
          </el-col>

          <el-col style="margin-right: 10px;" :span="3" :href="item" :key="item" v-lightbox="buyerCertificateList" v-for="(item, index) in buyerCertificateList" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>采购商付款凭据
                  <span>({{buyerCertificateList.length}}张)</span>
                </p>
                <!-- <p>2016-12-07 10:49</p>
                       <p>李跟单</p>
                       <p>备注：备注备注备注备注备注备注备注备注备注备注备注</p> -->
              </div>
            </el-card>
          </el-col>
          <el-col v-if="buyerRole" style="margin-right: 10px;" :span="3" :href="item" :key="item" v-lightbox="soouyaCertificateList" v-for="(item, index) in soouyaCertificateList" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>搜芽付款凭据
                  <span>({{soouyaCertificateList.length}}张)</span>
                </p>
                <!-- <p>2016-12-07 10:49</p>
                       <p>李跟单</p>
                       <p>备注：备注备注备注备注备注备注备注备注备注备注备注</p> -->
              </div>
            </el-card>
          </el-col>
          <el-col :span="3" :href="item" :key="item" v-lightbox="sendCertificateList" v-for="(item, index) in sendCertificateList" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>物流凭据
                  <span>({{sendCertificateList.length}}张)</span>
                </p>
                <!-- <p>2016-12-07 10:49</p>
                       <p>李跟单</p>
                       <p>备注：备注备注备注备注备注备注备注备注备注备注备注</p> -->
              </div>
            </el-card>
          </el-col>

        </el-row>
      </div>

      <div class="remark-area">
        <div class="block-title">
          备注
        </div>
        <div class="remark-text">
          <p>
            跟单员备注：{{orderDetail.leaveMessage}}
          </p>
          <p v-if="isGenDan == false">
            买货员备注：{{orderDetail.sellerMessage}}
          </p>
        </div>
      </div>
    </div>
    <lightbox />
  </div>
</template>
<script>
import AuthSub from 'utils/subNav'
import {
  getCache,
  formatTimeString,
  newRequest
} from 'utils/tool'
import Api from 'api/reposity'
import SameDetail from './sameDetail'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    SameDetail,
    Lightbox
  },
  data() {
    return {
      checkCloth: '3',
      downLink: '1',
      result: [],
      imgPath: 'http://www.soouya.com',
      tempResult: [],
      orderDetail: {},
      clothList: '1',
      multipleSelection: [],
      madanList: [],
      buyerCertificateList: [],
      soouyaCertificateList: [],
      sendCertificateList: [],
      outRepsoityList: {},
      inRepsoityList: {},
      inRepsoityCount: {},
      outRepsoityCount: {},
      repsoityList: [],
      subCheckCloth: '',
      downReportDialog: {
        isShow: false,
        downType: 1,
        checkCloth: '3',
        subCheckCloth: '',
        showPiHao: false,
        colorOrderList: {},
      },
      colorOrderList: {},
      isGenDan: true
    }
  },
  mounted() {
    this.checkUser()
    this.getList()
    this.getDetail()
    // this.initShow()
  },
  filters: {
    convertNumber(val) {
      return Number(val).toFixed(2)
    },
    convertTime(val) {
      return val ? formatTimeString(val) : '--'
    },
    formateText(val) {
      if (val == 1) {
        return '采购入仓'
      } else if (val == 2) {
        return '采购换货入仓'
      } else if (val == 3) {
        return '客户发回入仓'
      } else {
        return '售后换货入仓'
      }
    }
  },
  computed: {
    buyerRole() {
      return new AuthSub().buyerRole()
    },
    //  filterDownLink () {
    //    let url = ''
    //    let pihaoList = this.multipleSelection.map((item) => item.id)
    //    if (this.downLink == 1) { // 下载验货报告
    //      url = '/redwood/reposity/CheckCloth/exportCheckCloth?param={clothLoneIds:' + JSON.stringify(pihaoList) + '}'
    //    } else if (this.downLink == 2) { // 下载销售发货单
    //      url = `/redwood/reposity/InReposity/exportReposity?param={clothLoneIds:${JSON.stringify(pihaoList)}}`
    //    }
    //    return url
    //  },
    resultSort: function () {
      let _ = require('lodash')
      return _.sortBy(this.result, 'number')
    },
    countData() {
      let orderList = this.downReportDialog.colorOrderList
      let count = 0
      let metre = 0
      let pihaoList = []
      let url = ''
      let unit = ''
      let downYanhuo = '/redwood/reposity/CheckCloth/exportCheckCloth?param={clothLoneIds:'
      let downFahuo = '/redwood/reposity/InReposity/exportReposity?param={clothLoneIds:'
      for (let prop in orderList) {
        if (orderList.hasOwnProperty(prop)) {
          orderList[prop].list.forEach((item) => {
            if (item.checked) {
              count++
              metre += item.quantity
              pihaoList.push(item.id)
              unit = item.quantityUnit
            }
          })
        }
      }
      metre = metre.toFixed(2)
      url = `${this.downReportDialog.downType == '1' ? downYanhuo : downFahuo}${JSON.stringify(pihaoList)}}`
      return {
        count,
        metre,
        url,
        unit
      }
    }
  },
  methods: {
    handleChangeDownType(val) {
      if (val == 1) {
        let colorOrderList = this.downReportDialog.colorOrderList
        for (let key in colorOrderList) {
          if (colorOrderList.hasOwnProperty(key)) {
            colorOrderList[key].list.forEach((item) => {
              if (!item.hasCheckReport) {
                colorOrderList[key].checked = false
                item.checked = false
              }
            })
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDownFile() {
      window.open(this.countData.url)
    },
    handleCheckColor(colorName) {
      let orderList = this.downReportDialog.colorOrderList[colorName]
      orderList.checked = orderList.list.every(item => {
        return item.checked
      })
    },
    selectColorPiHao(val) {
      if (val == 0) {
        // 入仓单号
        this.downReportDialog.colorOrderList = this.formatToColor(this.inRepsoityList.map((item) => JSON.parse(JSON.stringify(item))))
        this.repsoityList = this.inRepsoityCount
        this.downReportDialog.subCheckCloth = ''
      } else if (val == 1) {
        // 出仓单号
        this.downReportDialog.colorOrderList = this.formatToColor(this.outRepsoityList.map((item) => JSON.parse(JSON.stringify(item))))
        this.repsoityList = this.outRepsoityCount
        this.downReportDialog.subCheckCloth = ''
      } else if (val == 3) {
        this.downReportDialog.colorOrderList = JSON.parse(JSON.stringify(this.colorOrderList))
      }
    },
    selectColorSubPiHao(val) {
      let repsoityList;
      if (this.downReportDialog.checkCloth == '1' && val) {
        repsoityList = this.outRepsoityList.filter((item) => {
          return item.outRepsoity.number == val
        })
        this.downReportDialog.colorOrderList = this.formatToColor(repsoityList);
      } else if (this.downReportDialog.checkCloth == '0' && val) {
        repsoityList = this.inRepsoityList.filter((item) => {
          return item.inRepsoity.number == val
        })
        this.downReportDialog.colorOrderList = this.formatToColor(repsoityList);
      }
    },
    handleCheckAllColor(colorName) {
      let allChecked = this.downReportDialog.colorOrderList[colorName].checked
      this.downReportDialog.colorOrderList[colorName].list.forEach(item => {
        if (this.downReportDialog.downType === 1) {
          if (item.hasCheckReport) {
            item.checked = allChecked
          }
        } else {
          item.checked = allChecked
        }
      })
    },
    formatToColor(data) {
      let colorOrderList = {}
      data.forEach((item) => {
        if (colorOrderList[item.color]) {
          colorOrderList[item.color].list.push(item)
        } else {
          colorOrderList[item.color] = {
            checked: false,
            list: [item]
          }
        }
      })
      return colorOrderList
    },
    getDetail() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: Api.getDhDetail,
        method: 'post',
        contentType: 'application/json',
        data: {
          orderNumber: this.$route.query.orderNumber
        }
      }).then(data => {
        this.$store.dispatch('changeload', false)
        if (data.success === '1') {
          let costMoney = 0
          data.obj.productList.forEach((item) => {
            item.editStatus = false
            if (item.price && item.quantity) {
              costMoney += Number(item.price) * Number(item.quantity)
            }
          })
          this.orderDetail = data.obj
          this.madanList = this.formateImgList(this.orderDetail.madanList)
          this.buyerCertificateList = this.formateImgList(this.orderDetail.buyerCertificateList)
          this.soouyaCertificateList = this.formateImgList(this.orderDetail.soouyaCertificateList)
          this.sendCertificateList = this.formateImgList(this.orderDetail.sendCertificateList)
          this.orderDetail.sellerTaxPoint = this.orderDetail.sellerTaxPoint || 0
          this.orderDetail.sellerTaxMoney = costMoney * this.orderDetail.sellerTaxPoint / 100
        } else {
          this.$message({
            type: 'error',
            message: data.msg,
            duration: 1000
          })
        }
      })
    },
    formateImgList(list) {
      let arr = []
      list.map((item) => {
        arr = arr.concat(item.imgList)
      })
      arr = arr.map((item) => {
        return this.imgPath + item
      })
      return arr
    },
    getList() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: Api.GetClothLoneList,
        method: 'post',
        contentType: 'application/json',
        data: {
          orderNumber: this.$route.query.orderNumber
        }
      }).then(data => {
        this.$store.dispatch('changeload', false)
        if (data.success === '1') {
          this.convertDate(data)
        } else {
          this.$message({
            type: 'error',
            message: data.msg,
            duration: 1000
          })
        }
      })
    },
    convertDate(data) {
      let inRepsoityList = []
      let outRepsoityList = []
      let inRepsoityCount = {}
      let outRepsoityCount = {}
      let colorOrderList = {}
      this.result = data.result.map((item) => {
        const host = location.host
        let webUrl = ''
        if (host == 'hspc.soouya.com') {
          webUrl = 'http://testmhongshan.soouya.com/'
        } else if (host.indexOf('test') != -1) {
          webUrl = 'http://testmhongshan.soouya.com/'
        } else {
          webUrl = 'http://mhongshan.soouya.com/'
        }
        item.checkReportDetailUrl = `${webUrl}reportDetail.html?clothLoneId=${item.id}`
        item.reportDetailUrl = '/redwood/reposity/CheckCloth/exportCheckCloth?param={clothLoneIds:' + JSON.stringify([item.id]) + '}'
        console.log(item.reportDetailUrl);
        item.checked = false
        if (item.outRepsoity) {
          const outRepsoityNumber = item.outRepsoity.number
          outRepsoityList.push(item)
          if (outRepsoityCount[outRepsoityNumber]) {
            outRepsoityCount[outRepsoityNumber].count++
          } else {
            outRepsoityCount[outRepsoityNumber] = {
              count: 1
            }
          }
        }
        if (item.inRepsoity) {
          const inRepsoityNumber = item.inRepsoity.number
          inRepsoityList.push(item)
          if (inRepsoityCount[inRepsoityNumber]) {
            inRepsoityCount[inRepsoityNumber].count++
          } else {
            inRepsoityCount[inRepsoityNumber] = {
              count: 1
            }
          }
        }

        if (colorOrderList[item.color]) {
          colorOrderList[item.color].list.push(item)
        } else {
          colorOrderList[item.color] = {
            checked: false,
            list: [item]
          }
        }
        this.tempResult.push(item)
        return item
      })
      if (this.$route.query.status) {
        this.checkCloth = this.$route.query.status.toString()
      }
      this.inRepsoityList = inRepsoityList
      this.outRepsoityList = outRepsoityList
      this.inRepsoityCount = inRepsoityCount
      this.outRepsoityCount = outRepsoityCount
      this.colorOrderList = colorOrderList
      this.downReportDialog.colorOrderList = JSON.parse(JSON.stringify(colorOrderList))
    },
    filterSelect(row) {
      if (this.downLink == 1) {
        if (row.hasCheckReport == 1) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    // 匹号选择
    selectPiHao(val) {
      console.log(val)
      if (val == 0) {
        // 入仓单号
        this.result = this.inRepsoityList.map((item) => item)
        this.repsoityList = this.inRepsoityCount
        this.subCheckCloth = ''
      } else if (val == 1) {
        // 出仓单号
        this.result = this.outRepsoityList.map((item) => item)
        this.repsoityList = this.outRepsoityCount
        this.subCheckCloth = ''
      } else if (val == 3) {
        this.result = this.tempResult.map((item) => item)
      }
      if (this.$route.query.status != undefined) {
        this.subCheckCloth = this.$route.query.id
        this.selectSubPiHao(this.subCheckCloth)
      }
    },
    selectSubPiHao(val) {
      console.log(val)
      if (this.checkCloth == '1' && val) {
        this.result = this.outRepsoityList.filter((item) => {
          return item.outRepsoity.number == val
        })
      } else if (this.checkCloth == '0' && val) {
        this.result = this.inRepsoityList.filter((item) => {
          return item.inRepsoity.number == val
        })
      }
    },
    checkUser() {
      const currentUser = getCache({ key: 'currentUser' })
      console.log(currentUser.loginInfo)
      if (currentUser.loginInfo) {
        this.isGenDan = currentUser.loginInfo.woodFollowLeader
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.color-checked-list {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  .el-checkbox {
    margin: 5px 0;
  }
  .el-row {
    padding: 5px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #000;
    }
  }
}


.pop-content {
  min-width: 200px;
  p {
    line-height: 1.5;
  }
}

.pi-color {
  text-align: left;
  padding-left: 10px;
  .pi-l {
    display: inline-block;
    width: 70px;
    text-align: right;
  }
}

.show-image {
  p {
    line-height: 1.5;
  }
  .image {
    width: 100%;
    height: 200px;
    cursor: pointer;
  }
}

.order-detail {
  .y-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #ccc;
    line-height: 24px;
    text-align: center;
    color: red;
  }
  .title {
    width: 100%;
    border-bottom: 2px solid #ccc;
    padding-bottom: 15px;
    a {
      float: right;
      text-decoration: none;
    }
  }
  .detial-wrap {
    font-size: 14px;
    padding-left: 20px;
    .block-title {
      margin-bottom: 15px;
      margin-top: 10px;
    }
  }
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
  }
  .custom-table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ccc;
    border-bottom: 0;
    border-right: 0;
    border-collapse: separate;
    table-layout: fixed;
    text-align: left;
    margin-bottom: 20px;
    th {
      white-space: nowrap;
      overflow: hidden;
      background-color: #EFF2F7;
      height: 20px;
      min-width: 0;
      line-height: 40px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      color: #1f2d3d;
      padding: 0 10px;
      &.pro-info {
        min-width: 120px;
      }
    }
    tr {
      height: 30px;
    }
    th.w1 {
      width: 10%;
    }
    th.w2 {
      width: 20%;
    }
    th.w3 {
      width: 100px;
    }
    th.w4 {
      width: 110px;
    }
    .color-list {
      min-width: 200px;
      span {
        display: inline-block;
        width: 32%;
        text-align: center;
      }
    }
    .no-right-border {
      border-right: none;
    }
    td {
      padding: 0 10px;
      font-size: 14px;
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      min-width: 0;
      min-width: 100px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      &.pro-info {
        padding: 10px;
        line-height: 16px;
        .pro-info-left {
          .name {
            width: 150px;
            padding: 15px;
            margin-bottom: 5px;
            text-align: center;
          }
        }
        .pro-info-right {
          padding-left: 20px;
          .status {
            margin-top: 20px;
          }
        }
      }
    }
  }
  .border {
    border-radius: 4px;
    border: 1px dotted #3c8dbc;
    padding: 5px;
  }

  .remark-area {
    .remark-text {
      padding: 10px;
      border: 1px solid #ccc;

      p {
        line-height: 24px;
      }
    }
  }
}
</style>
