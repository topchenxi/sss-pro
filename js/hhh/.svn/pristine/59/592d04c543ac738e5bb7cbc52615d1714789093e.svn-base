<template>
  <div class="cutMange-list">
    <el-tabs v-model="tabIndex" @tab-click="handleTableClick">
      <el-tab-pane label="全部" name="-1">
        <el-row :gutter="20" style="margin-bottom:20px">
          <el-col style="width:300px;">
            <el-input placeholder="订单号，采购商名称，供应商名称，手机号" size="small" v-model="filters.key">
            </el-input>
          </el-col>
          <el-col style="width:190px;">
            <el-row type="flex" align='middle' justify='start'>
              <el-col>品类:</el-col>
              <el-col>
                <el-select :key="randomKey" v-model="filters.category" size="small" style="width: 120px; display: inline-block;" placeholder="全部">
                  <el-option label="全部" value="">
                  </el-option>
                  <el-option label="辅料" :value="0" size="small">
                  </el-option>
                  <el-option label="面料" :value="1" size="small">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="width:500px;">
            <el-row type="flex" align='middle' justify='start'>
              <el-col>时间:</el-col>
              <el-col>
                <el-date-picker v-model="filters.createTimeBegin" type="datetime" size="small" placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
              <el-col style="text-align:center">-</el-col>
              <el-col>
                <el-date-picker v-model="filters.createTimeEnd" type="datetime" size="small" placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="width:400px;">
            <el-row>
              <el-button type="primary" size="small" @click.native="search" class="btn-search">
                搜索(enter)
              </el-button>
              <el-button type="primariy" size="small" @click.native="resetSubmit" class="btn-search">
                重置
              </el-button>
              <el-button type="primary" size="small" :disabled="canDownExcel" title="选择时间区间才可以导出" @click.native="exportExcel">导出excel</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[200]" name="200">
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[201]" name="201">
        <el-button type="primary" v-if="woodCutCloth" size="small" :disabled="!multipleSelection.length" @click.native="allSubmitPass(1)" style="margin-bottom:20px">
          批量提交审核
        </el-button>
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[202]" name="202">
        <el-button type="primary" v-if="woodFollowLeader" size="small" :disabled="!multipleSelection.length" @click.native="allSubmitPass(2)" style="margin-bottom:20px">
          批量审核通过
        </el-button>
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[220]" name="220">
        <el-button type="primary" v-if="woodFollowLeader" size="small" :disabled="!multipleSelection.length" @click.native="allSubmitPass(3)" style="margin-bottom:20px">
          批量发货
        </el-button>
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[221]" name="221">
        <!-- <el-button type="primariy" size="small" class="btn-search"  @click.native="waitSubmitExport" style="margin-bottom:20px">
          导出excel
        </el-button> -->
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[222]" name="222">
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[223]" name="223">
        <el-button type="primariy" size="small" class="btn-search" v-if="woodFollowLeader" :disabled="multipleSelection.length == 0" @click.native="print" style="margin-bottom:20px">
          打印
        </el-button>
      </el-tab-pane>
      <el-tab-pane :label="tableLabel[230]" name="230">
      </el-tab-pane>
    </el-tabs>
    <div class="y_table">
      <div class="y_table_wrap">
        <el-table :data="result" :resizable="false" :height="height" @selection-change="handleSelectionChange" v-if="result.length>0">
          <!-- 201:待提交审核  202:待审核  220:待发货 -->
          <el-table-column type="selection" width="55" fixed="left" v-if="isNeedselection">
          </el-table-column>
          <el-table-column prop="number" label="订单编号" align="center" min-width="200">
          </el-table-column>
          <el-table-column align="center" width="160" label="订单时间">
            <template scope="scope">
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column prop="customerCompany" align="center" label="采购商名称" width="120">
          </el-table-column>
          <el-table-column prop="shopCompany" align="center" width="120" label="供应商名称">
          </el-table-column>
          <el-table-column align="center" :render-header="title" width="700" class="product-td" class-name="product-column">
            <template scope="scope">
              <ul class="product-wrap">
                <li v-for='(product, index) in scope.row.productNumbers' class="product-item">
                  <div>
                    {{product.category == 0 ? '辅料' : '面料'}}
                  </div>
                  <div>
                    {{product.number}}
                  </div>
                  <div v-if="scope.row.editStatus">
                    <el-input v-model="product.price" @keyup.native="rePrice(scope.row)">
                    </el-input>
                    <div v-if="product.category == 1">
                      <el-select v-model="product.priceUnit" placeholder="请选择单位">
                        <el-option v-for="item in priceUnitList" :label="item" :value="item"></el-option>
                      </el-select>
                    </div>
                    <div v-else>
                      {{ product.priceUnit ? product.priceUnit : product.colors[0].cutterPriceUnit }}
                    </div>
                  </div>
                  <div v-else>
                    <span v-if="product.price">
                                            {{product.price | formateNumber}}{{product.priceUnit}}
                                        </span>
                    <span v-else>
                                            --
                                        </span>
                  </div>
                  <div>
                    <ul class="item-table">
                      <li v-for='(color, key_2) in product.colors' class="color-item">
                        <span>{{color.color}}</span>
                        <span :class="color.quantityAlert">
                                                    {{color.followerQuantity}}{{color.followerQuantityUnit}}
                                                </span>
                        <span class="list-import" :class="color.quantityAlert">
                                                    {{color.cutterQuantity ? color.cutterQuantity + color.cutterQuantityUnit: '--'}}
                                                </span>
                        <span :class="color.priceAlert">
                                                    {{color.followerPriceMoney ? color.followerPriceMoney + color.followerPriceUnit : '--' }}
                                                </span>
                        <span class="list-import" :class="color.priceAlert">
                                                    {{color.cutterPriceMoney ? color.cutterPriceMoney + color.cutterPriceUnit : '--'}}
                                                </span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column align="center" label="税率">
            <template scope="scope">
              {{scope.row.taxPoint == '' ? '--' : scope.row.taxPoint + '%' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="成本货款" width="100">
            <template scope="scope">
              <span v-if="scope.row.status == 200 || scope.row.status == 230">
                                {{scope.row.estimatedCostMoney | formateNumber}}元
                            </span>
              <span v-else>
                                {{scope.row.costMoney | formateNumber}}元
                            </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="服务费" width="80">
            <template scope="scope">
              <template v-if="scope.row.serviceMoney">
                {{scope.row.serviceMoney | formateNumber}}元
              </template>
              <template v-else>
                --
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="运费" width="80">
            <template scope="scope">
              <template v-if="scope.row.freightMoney">
                {{scope.row.freightMoney | formateNumber}}元
              </template>
              <template v-else>
                --
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="税费" width="80">
            <template scope="scope">
              <template v-if="scope.row.taxMoney">
                {{scope.row.taxMoney | formateNumber}}元
              </template>
              <template v-else>
                --
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120" :label="(filters.status == 211 || filters.status == 210) ? '收款金额' : '总费用'">
            <template scope="scope">
              <template v-if="scope.row.editStatus">
                <el-input v-model="scope.row.totalMoney" type="Number" @keyup.native="fixTotalMoney(scope.row)">
                </el-input>
              </template>
              <template v-else>
                <template v-if="scope.row.totalMoney">
                  {{scope.row.totalMoney | formateNumber}}元
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单状态" width="120">
            <template scope="scope">
              <template v-if="scope.row.status == '200'">待录入剪版信息</template>
              <template v-if="scope.row.status == '201'">待提交审核</template>
              <template v-if="scope.row.status == '202'">待审核</template>
              <template v-if="scope.row.status == '220'">待发货</template>
              <template v-if="scope.row.status == '221'">待提交支付</template>
              <template v-if="scope.row.status == '222'">待对账</template>
              <template v-if="scope.row.status == '223'">已完成</template>
              <template v-if="scope.row.status == '230'">已取消</template>
              <template v-if="scope.row.status == '210'">待报销</template>
              <template v-if="scope.row.status == '211'">已报销</template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="跟单员" width="80" prop="followerName">
          </el-table-column>
          <el-table-column align="center" label="剪版员" width="200" prop="cutterName">
          </el-table-column>
          <el-table-column inline-template align="center" label="操作" width="220" fixed="right">
            <div class="operate-btn">
              <router-link :to="{name: 'cutDetail', query: { id: row.id}}">
                <el-button class="o-btn" size="small" type="primary">详情</el-button>
              </router-link>
              <!-- <router-link :to="{name: 'inputJb', query: { id: row.id}}" v-if="woodCutCloth && row.status == 200">
                                <el-button class="o-btn" size="small" type="primary" style="width: 88px;">录入剪版信息</el-button>
                            </router-link> -->
              <el-button @click.native="submitPass(row.id)" class="o-btn" size="small" type="primary" style="width: 88px;" v-if="woodCutCloth && row.status == 201">提交审核</el-button>
              <el-button @click.native="passCheck(row)" class="o-btn" size="small" type="primary" style="width: 88px;" v-if="woodFollowLeader && row.status == 202">审核通过</el-button>
              <el-button @click.native="editUnit(row)" class="o-btn" size="small" type="primary" style="width: 88px;" v-if="woodFollowLeader && row.status == 202">{{row.editButtonText}}</el-button>
              <el-button @click.native="cancelEditUnit(row)" class="o-btn" size="small" type="primary" style="width: 88px;" v-if="row.editStatus && row.status == 202">放弃编辑</el-button>
              <el-button @click.native="passNoCheck(row.id)" class="o-btn" size="small" type="primary" style="width: 88px;" v-if="woodFollowLeader && row.status == 202">审核失败</el-button>
              <el-button @click.native="uploadImg(row.id)" v-if="woodFollowLeader && row.status == 220" class="o-btn" size="small" type="primary" style="width: 88px;">发货</el-button>
              <!-- <el-button @click.native="confirmPay(row.id)" class="o-btn" size="small" type="primary" style="width: 88px;" v-if="woodCutCloth && row.status == 210">确认收款</el-button> -->
              <el-button @click.native="cancelOrder(row.id)" class="o-btn" size="small" type="primary" style="width: 88px;" v-if="woodFollowLeader && (row.status == 200 || row.status == 202)">取消订单</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div style="border:1px solid #999;text-align:center;height:200px; line-height:200px;" v-else>
          暂无数据
        </div>
      </div>
      <div class="bottom">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
      </div>
    </div>
    <!-- 审核不通过弹窗 -->
    <el-dialog title="提示" v-model="passNoCheckStatus" size="tiny">
      <div>
        <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="denyRemark"></textarea>
        <span>
                    <b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/50字</span>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="clearTemData">取 消</el-button>
                <el-button type="primary" :disabled="!denyRemark" @click="confirmPassNoCheck">确 定</el-button>
            </span>
    </el-dialog>
    <!-- 发货凭证 -->
    <el-dialog v-model="sendVisible" size="small" custom-class="cutManage-pay-money" :close-on-click-modal="false">
      <div class="pay-content">
        <div class="pay-item">
          <span class="pay-item-l" style="position: absolute; top: 0; left: 0;">
                        <!--<strong style="color: red;">*</strong>-->
                        发货凭据:
                    </span>
          <div style="width: 300px; display: inline-block;margin-left: 110px;">
            <div class="showmadan">
              <a :href="item" :key="item" v-lightbox="sendCredentialUrls" v-for="(item, index) in sendCredentialUrls" class="madan-wrap">
                                <img :src="item" width='40' height="40" />
                                <span @click="del(item)" class="del-arrow">X</span>
                            </a>
            </div>
            <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="display:inline-block; width: auto; margin-bottom: 8px;" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError" v-if="sendCredentialUrls.length < 3">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" @click.native="confirmSend">确 定</el-button>
      </div>
    </el-dialog>
    <lightbox />
  </div>
</template>
<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import allApi from 'api/allApi'
import lrz from 'lrz'
import Lightbox from 'components/lightbox/lightbox'
import {
  getCache,
  newRequest,
  formatTimeString,
}
from 'utils/tool'
import {
  request
} from 'utils/request'
import getCutList from 'api/cut/getCutList'
import getCutCount from 'api/cut/getCutCount'
export default {
  components: {
    Fliter,
    Pagination,
    Lightbox
  },
  data() {
    let listStatus = this.$route.params.listStatus || '-1'
    return {
      imgPath: 'http://www.soouya.com',
      passNoCheckStatus: false,
      sendVisible: false,
      denyRemark: '',
      sendCredentialUrls: [],
      temId: '',
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      num1: '',
      num2: '',
      tabIndex: listStatus,
      filters: {
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        status: listStatus,
        category: ''
      },
      height: 600,
      result: [],
      cancelgoodShow: false, // 取消申请状态
      cancelgoodData: {}, // 取消申请数据
      confirmtakegood: false, // 确认收货
      confirmtakegoodData: {}, // 确认收货
      sendgoodData: {}, // 通知出仓单
      sendgoodShow: false,
      initSendGoodData: {
        type: '1', // 发货类型 0 车队 1 物流
        sendCompany: '',
        sendTel: '',
        carNumber: '',
        contactName: '',
        contactTel: '',
      },
      // 这一块是通知出仓单全选
      checkboxData: [],
      clothLoneIdList: [],
      checked: false,
      _time: 0,
      multipleSelection: [],
      woodCutCloth: false,
      woodFollowLeader: false,
      cutCount: {
        220: 0,
        202: 0,
        221: 0,
        222: 0,
        223: 0,
        200: 0,
        230: 0,
        201: 0
      },
      tempPriceUnit: [],
      tempRow: {},
      // 服务费单位
      priceUnitList: [
        '元/米',
        '元/码',
        '元/千克'
      ],
      hasEdit: false
    }
  },
  mounted() {
    const loginInfo = getCache({ key: 'currentUser' }).loginInfo
    this.woodCutCloth = loginInfo.woodCutCloth
    this.woodFollowLeader = loginInfo.woodFollowLeader
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList()
    getCutCount().then((response) => {
      if (response.success === '1') {
        Object.assign(this.cutCount, response.obj)
      }
    })
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleTableClick(table) {
      if (this.filters.status != table.name) {
        this.filters = Object.assign({}, this.filters, {
          type: '',
          status: table.name,
          keyword: '',
          pageNumber: 1,
          createTimeBegin: '',
          createTimeEnd: '',
          category: ''
        })
        const listStatus = table.name == '-1' ? undefined : table.name
        this.$router.replace({
          name: 'cutManage',
          params: {
            listStatus: listStatus
          }
        })
        this.reqList()
      }
    },
    print() {
      let printData = this.multipleSelection.map((item) => {
        let productArr = [];
        item.productNumbers.forEach((product) => {
          product.colors.forEach((color) => {
            productArr.push({
              color: color.color,
              number: product.number,
              cutterQuantity: color.cutterQuantity + color.cutterQuantityUnit
            })
          })
        })
        return {
          number: item.number,
          product: productArr,
          customerCompany: item.customerCompany,
          createTime: item.createTime,
          totalMoney: Number(item.totalMoney).toFixed(2)
        }
      })
      localStorage.setItem('printData', JSON.stringify(printData))
      this.$router.push({ name: 'outWarehouseOrder' })
    },
    exportExcel() {
      this.filters.export = 1
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || '';
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || '';
      this.reqList()
    },
    search() {
      this.filters.pageNumber = '1'
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || '';
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || '';
      this.reqList()
    },
    reqList(req = {}) {
      this.$store.dispatch('changeload', true)
      this.hasEdit = false
      let filters = this.filters
      let reqs = {}
      console.log(this.filters)
      for (const key of Object.keys(filters)) {
        if (String(filters[key]) && key !== 'status' || (key === 'status' && filters[key] != -1)) {
          reqs[key] = filters[key]
        }
      }
      getCutList(reqs).then((res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          if (res.page) {
            this.convertData(res.page)
          } else if (res.obj) {
            window.open(res.obj)
            this.filters.export = 0
          } else {
            this.result = []
            this.num1 = ''
            this.num2 = ''
            this.num3 = ''
            const currentNumber = 'num' + this.tabIndex
            this[currentNumber] = '0'
          }
        }
      })
    },
    waitSubmitExport() {
         newRequest({
           url: '/redwood/cut/exportDebt',
          method: 'get',
          }).then(data => {
           if (data.success === '1') {
             window.open(data.obj)
            } else {
              this.$alert(data.msg, '', {
                callback: action => {
                  return true
                }
              });
            }
          })
    },
    convertData(page) {
      this.pagation.pageNumber = page.pageNumber
      this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      this.filters.pageSize = page.pageSize
      this.filters.pageNumber = page.pageNumber
      this.num1 = ''
      this.num2 = ''
      this.num3 = ''
      const currentNumber = 'num' + this.tabIndex
      this[currentNumber] = page.totalCount
      page.result.forEach((item) => {
        item.fullAddress = item.addressProvince + item.addressCity + item.addressArea + item.shopAddr
        item.editButtonText = '编辑'
        item.editStatus = false
        if (item.productNumbers) {
          item.productNumbers.forEach((product) => {
            if (!product.priceUnit || product.priceUnit == '') {
              product.priceUnit = product.colors[0].cutterPriceUnit
            }
            product.colors.forEach((color) => {
              color.quantityAlert = {
                'alert-red': color.followerQuantity != color.cutterQuantity || color.followerQuantityUnit != color.cutterQuantityUnit // 数量
              }
              color.priceAlert = {
                'alert-red': color.followerPriceMoney != color.cutterPriceMoney || color.followerPriceUnit != color.cutterPriceUnit // 成本
              }
            })
          })
        }
      })
      this.result = page.result
    },
    // 公共请求
    sameConfirm(id, done, instance, text) {
      this.$store.dispatch('changeload', true)
      let url = ''
      let obj = {}
      let method = 'get'
      // 取消订单
      if (text == 'cancelOrder') {
        url = `${allApi.cut.cut}/${id}?_function=cancel`
        method = 'put'
      } else if (text == 'submitPass') {
        // 提交审核
        url = `${allApi.cut.cut}/${id}?_function=submit`
        method = 'put'
      } else if (text == 'passCheck') {
        // 审核通过
        url = `${allApi.cut.cut}/${id}?_function=agree`
        method = 'put'
      } else if (text == 'passNoCheck') {
        // 审核不通过
        url = `${allApi.cut.cut}/${id}?_function=disagree`
        method = 'put'
        obj = { denyRemark: this.denyRemark }
      } else if (text == 'confirmPay') {
        // 审核不通过
        url = `${allApi.cut.cut}/${id}?_function=confirm`
        method = 'put'
      } else if (text == 'send') {
        // 发货凭证
        url = `${allApi.cut.cut}/${id}?_function=send`
        method = 'put'
        obj = {
          sendCredentialUrls: this.sendCredentialUrls.map((item) => {
            item = item.replace(this.imgPath, '')
            return item
          })
        }
      } else if (text == 'saveUnit') {
        // 修改服务
        url = `${allApi.cut.cut}/${id}?_function=updateUnit`
        method = 'put'
        let row = {}
        this.result.forEach((item) => {
          if (item.id == id) {
            row = item
            return false
          }
        })
        obj = {
          productNumbers: row.productNumbers,
          serviceMoney: row.serviceMoney,
          taxMoney: row.taxMoney,
          totalMoney: Number(row.totalMoney).toFixed(2)
        }
      }
      request(url, {
        method,
        headers: {
          'Content-Type': method === 'put' ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        data: obj
      }).then((res) => {
        this.$store.dispatch('changeload', false)
        if (instance) {
          instance.confirmButtonLoading = false
        }
        if (res.success == 1) {
          done && done()
          this.clearTemData()
          getCutCount().then((response) => {
            if (response.success == 1) {
              Object.assign(this.cutCount, {
                220: 0,
                202: 0,
                221: 0,
                222: 0,
                223: 0,
                200: 0,
                230: 0,
                201: 0
              })
              Object.assign(this.cutCount, response.obj)
            }
          })
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
          })
          this.reqList()
          if (text == 'saveUnit') {
            this.hasEdit = false
            this.tempRow = {}
            this.tempPriceUnit = []
          }
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    // 取消订单提醒
    cancelOrder(id) {
      this.$msgbox({
        title: '提示',
        message: '是否确认取消订单？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(id, done, instance, 'cancelOrder')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    // 提交审核提醒
    allSubmitPass(index) {
      let ids = []
      this.multipleSelection.forEach((item) => {
        ids.push(item.id)
      })
      if (index == 1) {
        this.submitPass(ids.join(','))
      }
      if (index == 2) {
        this.passCheck(ids.join(','))
      }
      if (index == 3) {
        this.uploadImg(ids.join(','))
      }
      if (index == 4) {
        this.confirmPay(ids.join(','))
      }
    },
    // 提交审核提醒
    submitPass(id) {
      this.$msgbox({
        title: '提示',
        message: '是否确认提交审核?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(id, done, instance, 'submitPass')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    // 确认审核通过
    passCheck(row) {
      let flag = true
      row.productNumbers.forEach((product) => {
        product.colors.forEach((color) => {
          let unit = product.priceUnit.split('/')[1];
          if (color.cutterQuantityUnit != unit && product.category == 1) {
            this.$msgbox({
              title: '警告',
              message: '服务费单位与采购单位不相同,不能提交审核',
              showCancelButton: false,
              confirmButtonText: '确定'
            }).then(action => {})
            flag = false
            return false
          }
        })
      })

      if (!flag) {
        return
      }

      console.log(row.editStatus)
      if (row.editStatus) {
        this.$msgbox({
          title: '警告',
          message: '正在编辑,不能提交审核',
          showCancelButton: false,
          confirmButtonText: '确定'
        }).then(action => {})
        return
      }

      this.$msgbox({
        title: '提示',
        message: '是否确认审核通过?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(row.id, done, instance, 'passCheck')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    clearTemData() {
      this.passNoCheckStatus = false
      this.denyRemark = ''
      this.temId = ''
      this.sendVisible = false
      this.sendCredentialUrls = []
    },
    // 确认审核不通过
    passNoCheck(id) {
      this.passNoCheckStatus = true
      this.temId = id
    },
    confirmPassNoCheck() {
      this.sameConfirm(this.temId, '', '', 'passNoCheck')
    },
    // 编辑
    editUnit(row) {
      if (!this.hasEdit) {
        this.tempRow = Object.assign({}, row)
        row.productNumbers.forEach((product) => {
          this.tempPriceUnit.push({
            price: product.price,
            priceUnit: product.priceUnit
          })
        })
        this.hasEdit = true
        row.editButtonText = '保存'
        row.editStatus = true
      } else {
        if (row.editStatus) {
          let flag = true
          row.productNumbers.forEach((product) => {
            let unit = product.priceUnit.split('/')[1]
            product.colors.forEach((color) => {
              if (color.cutterQuantityUnit != unit && product.category == 1) { // 是面料的时候才判断
                this.$msgbox({
                  title: '提示',
                  message: '服务费单价单位和采购单价单位不统一，请更正',
                  showCancelButton: false,
                  confirmButtonText: '确定'
                }).then(action => {});
                flag = false
                return false
              }
            })
          })
          if (!flag) {
            return
          }
          // 提交数据
          this.$msgbox({
            title: '提示',
            message: '是否确认保存修改?',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...'
                this.sameConfirm(row.id, done, instance, 'saveUnit')
              } else {
                done()
              }
            }
          }).then(action => {});
        } else {
          this.$msgbox({
            title: '警告',
            message: '正在编辑，请先保存',
            showCancelButton: false,
            confirmButtonText: '确定'
          }).then(action => {});
        }
      }
    },
    cancelEditUnit(row) {
      if (this.hasEdit && row.editStatus) {
        this.hasEdit = false
        row.editStatus = this.tempRow.editStatus
        row.editButtonText = this.tempRow.editButtonText
        row.serviceMoney = this.tempRow.serviceMoney
        row.taxMoney = this.tempRow.taxMoney
        row.totalMoney = this.tempRow.totalMoney
        if (this.tempPriceUnit.length > 0) {
          row.productNumbers.forEach((product, index) => {
            product.price = this.tempPriceUnit[index].price
            product.priceUnit = this.tempPriceUnit[index].priceUnit
          })
        }
        this.tempRow = {}
        this.tempPriceUnit = []
      }
    },
    // 总费用小数点处理
    fixTotalMoney(row) {
      if (row.totalMoney) {
        let split = row.totalMoney.split('.');
        if (split.length > 1 && split[1].length > 2) row.totalMoney = Number(row.totalMoney).toFixed(2)
      }
    },
    // 确认收款
    confirmPay(id) {
      this.$msgbox({
        title: '提示',
        message: '是否确认收款?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(id, done, instance, 'confirmPay')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    // 单个发货
    confirmSend() {
      this.sameConfirm(this.temId, '', '', 'send')
    },
    uploadImg(id) {
      this.temId = id
      this.sendVisible = true
    },
    // 上传图片组件
    beforeUpload(file) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
          quality: 1
        })
        .then(function(rst) {
          // 处理成功会执行
          rst.formData.append('field', 'imgUrl')
          request('/redwood/sys/Common/uploadFile.do?type=4', {
            method: 'POST',
            data: rst.formData,
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
      if (this.sendCredentialUrls.length < 3) {
        this.sendCredentialUrls.push(this.imgPath + file.imgUrl)
      }
    },
    handleError(file, fileList) {
      this.$store.dispatch('changeload', false)
    },
    del(url) {
      this.sendCredentialUrls = this.sendCredentialUrls.filter((item, key) => item != url)
    },
    countH() {
      this.height = String(document.documentElement.clientHeight - 230)
    },
    resetSubmit() {
      Object.assign(this.filters, {
        key: '',
        category: '',
        createTimeBegin: '',
        createTimeEnd: '',
      })
    },
    title(h, { column, $index }) {
      // return (
      //     <div class="product-wrap">
      //         <div class="product-item">
      //             <div>品类 </div>
      //             <div style="border-left:0;bordquedinger-right:0"> 货号/品名 </div>
      //             <div style="border-left:0;border-right:0">服务费单价</div>
      //             <div>
      //                 <div class="color-item">
      //                     <span> 色号/颜色 </span>
      //                     <span> 数量 </span>
      //                     <span> 采购数量 </span>
      //                     <span> 单价 </span>
      //                     <span> 成本单价 </span>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // )
      let createElementObj = function(el, props, subEl) {
        return { el, props, subEl }
      }
      let renderElement = function(obj) {
        return h(obj.el, obj.props, typeof obj.subEl === 'object' ? obj.subEl.map(item => { return renderElement(item) }) : obj.subEl)
      }
      const productWrapProps = { 'class': { 'product-wrap': true } }
      const productItemProps = { 'class': { 'product-item': true } }
      const colorItemProps = { 'class': { 'color-item': true } }
      const renderTree = createElementObj('div', productWrapProps, [
        createElementObj('div', productItemProps, [
          createElementObj('div', null, '品类'),
          createElementObj('div', null, '货号/品名'),
          createElementObj('div', null, '服务费单价'),
          createElementObj('div', null, [
            createElementObj('div', colorItemProps, [
              createElementObj('span', null, '色号'),
              createElementObj('span', null, '数量'),
              createElementObj('span', null, '采购数量'),
              createElementObj('span', null, '单价'),
              createElementObj('span', null, '成本单价')
            ])
          ])
        ])
      ])
      return renderElement(renderTree)
    },
    // 新加重新计算价格
    rePrice(row) {
      let allServicePrice = 0;
      let faxPrice = 0;
      row.productNumbers.forEach((item) => {
        item.colors.forEach((color) => {
          if (item.price && item.price > 0) {
            let split = item.price.split('.')
            if (split.length > 1 && split[1].length > 2) item.price = Number(item.price).toFixed(2)
          }
          allServicePrice += item.price * color.cutterQuantity
        })
      })
      faxPrice = (row.estimatedCostMoney + row.freightMoney + allServicePrice) * row.taxPoint / 100
      row.serviceMoney = allServicePrice
      row.taxMoney = Number(faxPrice).toFixed(2)
      row.totalMoney = Number(row.estimatedCostMoney + row.freightMoney + allServicePrice + faxPrice).toFixed(2)
    },
  },
  computed: {
    tableLabel() {
      let cutCount = this.cutCount

      function getNumber(number) {
        return number >= 0 ? `(${number})` : ''
      }
      return {
        200: `待录入剪版信息 ${getNumber(cutCount[200])} `,
        201: `待提交审核 ${getNumber(cutCount[201])} `,
        202: `待审核 ${getNumber(cutCount[202])} `,
        220: `待发货 ${getNumber(cutCount[220])} `,
        221: `待提交支付 ${getNumber(cutCount[221])} `,
        222: `待对账 ${getNumber(cutCount[222])} `,
        223: `已完成 ${getNumber(cutCount[223])} `,
        230: `已取消 ${getNumber(cutCount[230])} `,
      }
    },
    leftnumber() {
      return 50 - Number(this.denyRemark.length)
    },
    isNeedselection() {
      return (this.woodCutCloth && this.filters.status == 210) || (this.woodCutCloth && this.filters.status == 201) || (this.woodFollowLeader && this.filters.status == 202) || (this.woodFollowLeader && this.filters.status == 220) || this.filters.status == 223
    },
    canDownExcel() {
      return !(this.filters.createTimeBegin && this.filters.createTimeEnd)
    }
  },
  watch: {
    denyRemark(val) {
      if (val.length >= 50) {
        this.denyRemark = val.slice(0, 50)
      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.countH)
  },
}

</script>
<style lang="scss">
.y_table_wrap .el-table td .cell {
  padding: 0;
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid #bfbfbf;
  }
  >div {
    display: table-cell;
    &:nth-child(1) {
      width: 50px;
      vertical-align: middle;
      border-left: 0;
    }
    &:nth-child(2) {
      width: 70px;
      vertical-align: middle;
      border-left: 1px solid #bfbfbf;
      border-right: 1px solid #bfbfbf;
    }
    &:nth-child(3) {
      width: 65px;
      vertical-align: middle;
      border-right: 1px solid #bfbfbf;
    }
    &:nth-child(4) {
      width: 195px;
      vertical-align: middle;
      border-right: 0;
    }
  }
  .price-input {
    width: 60px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
  }
  select {
    width: 30px;
  }
}

.product-column {
  .cell {
    height: 100%;
    padding: 0;
    padding-left: 0;
    padding-right: 0;
  }
}

.product-wrap {
  display: table;
  border: 0;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

td {
  .color-item {
    span {
      border-left: 1px solid #bfbfbf;
      &:first-child {
        border-left: 0;
      }
    }
  }
}

.color-item {
  display: flex;
  flex: 1;
  min-height: 30px;
  &:not(:first-child) {
    border-top: 1px solid #bfbfbf;
  }
  span {
    width: 25%;
    text-align: center;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .alert-red {
    color: red;
  }
}

.list-import {
  background: #20a0ff;
  color: #fff;
}

.cutMange-list {
  .y_table {
    clear: both;
  }

  .y_table_wrap {
    td.is-center {
      text-align: center;
      border-right: 1px solid #ddd;
    }
    th.is-center {
      text-align: center;
    }
    .combine {
      .cell {
        padding: 0;
        .t-title {
          width: 300px;
          float: left;
          .t-item {
            float: left;
            width: 75px;
          }
          .t-item1 {
            width: 60px;
          }
          .t-item2 {
            width: 80px;
          }
          .t-item3 {
            width: 80px;
          }
          .t-item3 {
            width: 80px;
          }
        }
      }
    }
    .el-upload-list {
      display: none;
    }
  }
  .bottom {
    text-align: right;
    background: #fff;
    padding: 10px;
  }
  .operate-btn {
    text-align: left;
    padding-left: 10px;
    .o-btn {
      width: 80px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .line {
    border-bottom: 1px solid #ddd;
  }
}

.common-pop {
  min-width: 500px;
}

.take-good {
  max-height: 450px;
  min-width: 460px;
  overflow-y: auto;
  .t-item {
    position: relative;
    margin-bottom: 8px;
  }
  .t-item-l {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .t-item-r {
    display: inline-block;
    min-width: 320px;
    .r-line {
      padding-bottom: 5px;
    }
  }
}

.send-good {
  max-height: 450px;
  overflow-y: auto;
}

.unnormal {
  .un-line {
    margin-bottom: 5px;
    position: relative;
    .un-l-left {
      display: inline-block;
      width: 70px;
      padding-right: 5px;
      text-align: right;
    }
    .un-l-r {
      width: 150px;
      display: inline-block;
    }
  }
}

.cutManage-pay-money {
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

.el-table td,
.el-table th {
  min-height: 40px;
  height: auto;
}

</style>
