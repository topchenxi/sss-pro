<template>
  <section class="sy-page-wrap" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中">
    <div class="cutMange-list">
      <el-tabs v-model="tabIndex" @tab-click="handleTableClick">
        <el-tab-pane :label="label" :name="index + ''" v-for="(label,index) in tabLabel" :key="index">
          <el-row :gutter="20" style="margin-bottom:20px">
            <el-col style="width:250px;">
              <el-input placeholder="订单号/采购商/供应商/跟单员/剪版员" size="small" v-model="filters.key">
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-select v-model="filters.salerId" size="small" style="width: 120px; display: inline-block;" placeholder="全部销售">
                <el-option label="全部销售" value=""></el-option>
                <el-option v-for="(item,idx) in salers" :label="item.realName || item.userName" :value="item.id" :key="idx">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" v-if="isWoodGuiderAdmin || isWoodFinance || isWoodCutClothLeader">
              <el-select v-model="filters.guiderAdminId" size="small" style="width: 130px; display: inline-block;" placeholder="全部采购组">
                <el-option label="全部采购组" value=""></el-option>
                <el-option v-for="(item,idx) in guiderLeaders" :label="item.realName || item.userName" :value="item.id" :key="idx">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-select v-model="filters.guiderId" size="small" style="width: 120px; display: inline-block;" placeholder="全部采购">
                <el-option label="全部采购" value=""></el-option>
                <el-option v-for="(item,idx) in guiders" :label="item.realName || item.userName" :value="item.id" :key="idx">
                </el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="2">
                                    <el-select v-model="filters.statuses" size="small" style="width: 120px; display: inline-block;" placeholder="全部状态">
                                      <el-option v-if="tabIndex == 0" label="全部状态" :value="status50x"></el-option>
                                      <el-option v-if="tabIndex == 1" label="全部状态" :value="status51x"></el-option>
                                      <el-option v-if="tabIndex == 2" label="全部状态" :value="status54x"></el-option>
                                      <el-option v-if="tabIndex == 0 && (!isWoodCutClothLeader || isWoodAdmin)" :label="statusDesc[500]" :value="500" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0 && (!isWoodCutClothLeader || isWoodAdmin)" :label="statusDesc[501]" :value="501" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0" :label="statusDesc[502]" :value="502" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0" :label="statusDesc[503]" :value="503" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0 && (!isWoodCutClothLeader || isWoodAdmin)" :label="statusDesc[520]" :value="520" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0 && (!isWoodCutClothLeader || isWoodAdmin)" :label="statusDesc[521]" :value="521" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0 && (!isWoodCutClothLeader || isWoodAdmin)" :label="statusDesc[522]" :value="522" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0 && (!isWoodCutClothLeader || isWoodAdmin)" :label="statusDesc[523]" :value="523" size="small"></el-option>
                                      <el-option v-if="tabIndex == 0 && (!isWoodCutClothLeader || isWoodAdmin)" :label="statusDesc[530]" :value="530" size="small"></el-option>
                                      <el-option v-if="tabIndex == 1" :label="statusDesc[510]" :value="510" size="small"></el-option>
                                      <el-option v-if="tabIndex == 1" :label="statusDesc[511]" :value="511" size="small"></el-option>
                                      <el-option v-if="tabIndex == 2" :label="statusDesc[540]" :value="540" size="small"></el-option>
                                      <el-option v-if="tabIndex == 2" :label="statusDesc[541]" :value="541" size="small"></el-option>
                                    </el-select>
                                  </el-col>-->
            <el-col style="width:450px;">
              <el-row type="flex" align='middle' justify='start'>
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
                <el-button type="primary" size="small" :disabled="canDownExcel" @click.native="exportExcel">导出excel</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div class="y_table">
        <div class="y_table_wrap">
          <el-table stripe :data="result" :resizable="false" :height="height" v-if="result.length>0">
            <el-table-column align="center" min-width="140" label="订单编号">
              <template scope="scope">
                {{scope.row.number}}
                <br/>
                <span v-if="scope.row.delayTime > 0" style="color:red;">
                  {{scope.row.delayTime | formatDate}}发货
                </span>
              </template>
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

            <el-table-column align="center" :render-header="title" width="960" class="product-td" class-name="product-column">
              <template scope="scope">
                <ul class="product-wrap">
                  <li v-for='(product, index) in scope.row.productNumbers' class="product-item">
                    <div style="border-right: 1px solid #bfbfbf;">
                      {{(product.category == 1 || scope.row.ziying)? '面料' : '辅料'}}
                    </div>
                    <div style="border-right: 1px solid #bfbfbf;">
                      {{product.number ? product.number : '-'}}/{{product.title ? product.title : '-'}}
                    </div>
                    <div style="border-right: 1px solid #bfbfbf;">
                      {{!scope.ziying && product.price > 0 ? product.price.toFixed(2) + product.priceUnit : '--'}}
                    </div>
                    <div>
                      <ul class="item-table">
                        <li v-for='(color, key_2) in product.colors' class="color-item">
                          <span>
                            {{color.color}}
                            <label v-if="color.status == 0" style="color:red;">
                              (无货)
                            </label>
                          </span>
                          <span>
                            {{color.followerQuantity > 0 ? color.followerQuantity.toFixed(2) + color.followerQuantityUnit : '--'}}
                          </span>
                          <span>
                            {{color.cutterQuantity > 0 ? color.cutterQuantity.toFixed(2) + color.cutterQuantityUnit: '--'}}
                          </span>
                          <span v-if="scope.row.ziying">
                            {{color.salePriceMoney > 0 ? color.salePriceMoney + color.salePriceUnit : '--'}}
                          </span>
                          <span v-else>
                            {{color.followerPriceMoney > 0 ? color.followerPriceMoney + color.followerPriceUnit : '--' }}
                          </span>
                          <span v-if="scope.row.ziying">
                            {{color.followerPriceMoney > 0 ? color.followerPriceMoney + color.followerPriceUnit : '--' }}
                          </span>
                          <span v-else>
                            {{color.cutterPriceMoney > 0 ? color.cutterPriceMoney + color.cutterPriceUnit : '--'}}
                          </span>
                          <span v-if="scope.row.ziying">
                            {{color.cutterPriceMoney > 0 ? color.cutterPriceMoney + color.cutterPriceUnit : '--'}}
                          </span>
                          <span v-else>
                            {{color.cutterPriceMoney > 0 ? color.cutterPriceMoney + color.cutterPriceUnit : '--'}}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column align="center" label="录入剪版时间" width="110">
              <template scope="scope">
                <template v-if="scope.row.inputTime > 0">
                  {{scope.row.inputTime | formatTime }}
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="税率">
              <template scope="scope">
                <template v-if="scope.row.taxPoint > 0">
                  {{scope.row.taxPoint | formatNumber }}%
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="成本货款" width="80">
              <template scope="scope">
                <template v-if="scope.row.costMoney && scope.row.costMoney > 0">
                  {{scope.row.costMoney | formatNumber}}元
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="服务费" width="80">
              <template scope="scope">
                <template v-if="scope.row.serviceMoney && scope.row.serviceMoney > 0">
                  {{scope.row.serviceMoney | formatNumber}}元
                </template>
                <template v-else>
                  --
                </template>

              </template>
            </el-table-column>
            <el-table-column align="center" label="运费" width="80">
              <template scope="scope">
                <template v-if="scope.row.freightMoney && scope.row.freightMoney > 0">
                  {{scope.row.freightMoney | formatNumber}}元
                </template>
                <template v-else>
                  --
                </template>

              </template>
            </el-table-column>
            <el-table-column align="center" label="税费" width="80">
              <template scope="scope">
                <template v-if="scope.row.taxMoney && scope.row.taxMoney > 0">
                  {{scope.row.taxMoney | formatNumber}}元
                </template>
                <template v-else>
                  --
                </template>

              </template>
            </el-table-column>
            <el-table-column align="center" label="总费用" width="80">
              <template scope="scope">
                <template v-if="scope.row.totalMoney && scope.row.totalMoney > 0">
                  {{scope.row.totalMoney | formatNumber}}元
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="回款日期" width="160">
                <template scope="scope">
                    <template v-if="scope.row.returnDate > 0">
                      {{scope.row.returnDate | formatTime }}
                    </template>
                    <template v-else>
                      --
                    </template>
                  </template>
              </el-table-column>
            <el-table-column align="center" label="销售员" width="80">
              <template scope="scope">
                <template v-if="scope.row.salerName">
                  {{scope.row.salerName}}
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="跟单员" width="80">
              <template scope="scope">
                <template v-if="scope.row.followerName">
                  {{scope.row.followerName}}
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="采购员" width="80">
              <template scope="scope">
                <template v-if="scope.row.guiderName">
                  {{scope.row.guiderName}}
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="剪版员" width="80">
              <template scope="scope">
                <template v-if="scope.row.cutterChanges != ''">
                  <el-popover ref="cutterChangePopover" placement="top" trigger="hover">
                    <ul class="sy-cutter-change">
                      <li v-for="item in scope.row.cutterChanges" v-html="item.replace(/\(/g,'<span>').replace(/\)/g,'</span>')"></li>
                    </ul>
                  </el-popover>
                  <strong class="sy-current-cutter" v-popover:cutterChangePopover>{{scope.row.cutterName}}</strong>
                </template>
                <template v-else>{{scope.row.cutterName}}</template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单来源" width="80" fixed="right">
              <template scope="scope">
                {{scope.row.ziying ? '销售订单' : '代采订单'}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态" width="120" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.status == '200'">{{statusDesc[200]}}</template>
                <template v-if="scope.row.status == '201'">{{statusDesc[201]}}</template>
                <template v-if="scope.row.status == '202'">{{statusDesc[202]}}</template>
                <template v-if="scope.row.status == '220'">{{statusDesc[220]}}</template>
                <template v-if="scope.row.status == '221'">{{statusDesc[221]}}</template>
                <template v-if="scope.row.status == '222'">{{statusDesc[222]}}</template>
                <template v-if="scope.row.status == '223'">{{statusDesc[223]}}</template>
                <template v-if="scope.row.status == '230'">{{statusDesc[230]}}</template>
                <template v-if="scope.row.status == '210'">{{statusDesc[210]}}</template>
                <template v-if="scope.row.status == '211'">{{statusDesc[211]}}</template>
                <template v-if="scope.row.status == '240'">{{statusDesc[240]}}</template>
                <template v-if="scope.row.status == '241'">{{statusDesc[241]}}</template>
                <template v-if="scope.row.status == '500'">{{statusDesc[500]}}</template>
                <template v-if="scope.row.status == '501'">{{statusDesc[501]}}</template>
                <template v-if="scope.row.status == '502'">{{statusDesc[502]}}</template>
                <template v-if="scope.row.status == '503'">{{statusDesc[503]}}</template>
                <template v-if="scope.row.status == '520'">{{statusDesc[520]}}</template>
                <template v-if="scope.row.status == '521'">{{statusDesc[521]}}</template>
                <template v-if="scope.row.status == '522'">{{statusDesc[522]}}</template>
                <template v-if="scope.row.status == '523'">{{statusDesc[523]}}</template>
                <template v-if="scope.row.status == '530'">{{statusDesc[530]}}</template>
                <template v-if="scope.row.status == '510'">{{statusDesc[510]}}</template>
                <template v-if="scope.row.status == '511'">{{statusDesc[511]}}</template>
                <template v-if="scope.row.status == '540'">{{statusDesc[540]}}</template>
                <template v-if="scope.row.status == '541'">{{statusDesc[541]}}</template>
              </template>
            </el-table-column>
            <el-table-column inline-template align="center" label="操作" width="250" fixed="right">
              <div class="operate-btn">
                <router-link :to="{name: 'cutOrderDetails', query: { id: row.id}}" v-if="row.status < 500">
                  <el-button class="o-btn" size="small" type="primary">
                    详情
                  </el-button>
                </router-link>
                <router-link :to="{name: 'ziyingCutDetail', query: { id: row.id}}" v-else>
                  <el-button class="o-btn" style="width: 56px;" size="small" type="primary">详情</el-button>
                </router-link>
                <el-button v-if="isWoodCutClothLeader && (row.status == '200' || row.status == '502')" class="o-btn" size="small" type="primary" @click="showUpdateCutterDialog(row)">
                  指派剪版员
                </el-button>
                <el-button v-if="isWoodAdmin && row.status == '500'" class="o-btn" size="small" type="primary" @click="showUpdateGuiderDialog(row)">
                  指派采购员
                </el-button>
                <router-link :to="{name: 'ziyingCutEdit', query: {id: row.id}}" v-if="[200,201,202,221,222,223,230,210,211,240,241,500,501,502,521,530].indexOf(row.status) != -1">
                  <el-button v-if="isWoodAdmin" class="o-btn" size="small" type="primary">
                    编辑
                  </el-button>
                </router-link>
                  <router-link :to="{name: 'ziyingCutEdit', query: {id: row.id, special: true}}" v-if="[510,522].indexOf(row.status) != -1">
                  <el-button v-if="isWoodAdmin" class="o-btn" size="small" type="primary">
                    编辑
                  </el-button>
                </router-link>
              </div>
            </el-table-column>
          </el-table>
          <div style="border:1px solid #999;text-align:center;height:200px; line-height:200px;" v-else>
            暂无数据
          </div>
        </div>
        <div class="bottom">
          <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :page="pagation.pageNumber" :total="pagation.totalCount" :page-size="pagation.pageSize" :render="reqList" :options="filters" />

          </el-pagination>

        </div>

      </div>
      <el-dialog title="指派剪版员" v-model="assignCutterVisible" :modal="false" size="tiny">
        <el-select v-model="cutterId" size="small" style="width: 120px; display: inline-block;" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="(item,idx) in cutters" :label="item.realName || item.userName" :value="`${JSON.stringify({cutterId:item.id,cutterName:item.realName})}`" :key="idx">
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button @click.native="clearTemData">取 消</el-button>
          <el-button type="primary" @click.native="submitUpdateCutter" :disabled="cutterId == ''">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="指派采购员" v-model="assignGuiderVisible" :modal="false" size="tiny">
        <el-select v-model="guiderId" size="small" style="width: 120px; display: inline-block;" placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="(item,idx) in guiders" :label="item.realName || item.userName" :value="`${JSON.stringify({guiderId:item.id,guiderName:item.realName})}`" :key="idx">
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button @click.native="clearTemData">取 消</el-button>
          <el-button type="primary" @click.native="submitUpdateGuider" :disabled="guiderId == ''">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>
<script>
import getCache from '@/utils/getCache'
import mixinFilters from '@/mixin/filters'
import request from '@/utils/request'
import editCut from '@/api/cut/editCut'
export default {
  data() {
    let createTimeEnd = '' // new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
    let createTimeBegin = '' // new Date(new Date().toLocaleDateString()).getTime()
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      statusAll: '200,201,202,220,221,222,223,230' + ',500,501,502,503,520,521,522,523,530',
      statusCut: '200,201,202,500,501,502',
      statusSend: '220,503,520',
      statusCheck: '221,222,521,522',
      status51x: '210,211,510,511',
      status54x: '240,241,540,541',
      fullscreenLoading: false,
      isWoodAdmin: auth.woodAdmin,
      isWoodCutClothLeader: auth.woodCutClothLeader,
      isWoodFinance: auth.woodFinance,
      isWoodGuiderAdmin: auth.woodGuiderAdmin,
      isWoodGuiderLeader: auth.woodGuiderLeader,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      imgPath: 'http://www.soouya.com',
      assignCutterVisible: false,
      assignGuiderVisible: false,
      temId: '',
      cutterId: '',
      cutterName: '',
      guiderId: '',
      guiderName: '',
      cutters: [],
      guiders: [],
      guiderLeaders: [],
      salers: [], // 包括销售员和销售组长
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1
      },
      statusDesc: {
        200: '待录入剪版信息',
        201: '待提交审核',
        202: '待审核',
        220: '待发货',
        221: '待提交支付',
        222: '待对账',
        223: '已完成',
        230: '已取消',
        210: '待报销',
        211: '已报销',
        500: '待录入剪版信息',
        501: '待通知提货',
        502: '待提货',
        503: '待收版',
        520: '待发货',
        521: '待提交支付',
        522: '待对账',
        523: '已完成',
        530: '已取消',
        510: '待报销',
        511: '已报销',
        540: '未结清',
        541: '已结清'
      },
      num1: '',
      num2: '',
      tabIndex: 0,
      filters: {
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: createTimeBegin,
        createTimeEnd: createTimeEnd,
        statuses: '',
        cutterId: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      },
      height: 600,
      result: [],
      tabLabel: []
    }
  },
  mixins: [mixinFilters],
  mounted() {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList()
    this.getSeedList('woodCutCloth')
    this.getSeedList('woodGuider,woodGuiderLeader')
    this.getSeedList('woodGuiderLeader')
    this.getSeedList('woodSales,woodSalesLeader')
  },
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    },
    shortUnit(val) {
      if (val === undefined) {
        return ''
      }
      var index = val.indexOf('/')
      if (index < 0) {
        return val
      }
      return val.substring(index + 1)
    }
  },
  methods: {
    showUpdateCutterDialog(orderData) {
      this.temId = orderData.id
      this.assignCutterVisible = true
      // this.cutterId = orderData.cutterId
    },
    submitUpdateCutter() {
      editCut(this.temId, 'updateCutter', JSON.parse(this.cutterId))
        .then(response => {
          if (response.success === '1') {
            this.assignCutterVisible = false
            this.reqList()
          }
        })
    },
    showUpdateGuiderDialog(orderData) {
      this.temId = orderData.id
      this.assignGuiderVisible = true
    },
    submitUpdateGuider() {
      editCut(this.temId, 'updateGuider', JSON.parse(this.guiderId))
        .then(response => {
          if (response.success === '1') {
            this.assignGuiderVisible = false
            this.reqList()
          }
        })
    },
    getSeedList(code) {
      this.fullscreenLoading = true
      request('/crm/user/User/listRedSeedByCodes', {
        method: 'post',
        data: {
          param: JSON.stringify({ code: code })
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          if (code === 'woodCutCloth') {
            this.cutters = data.list
          } else if (code === 'woodGuider,woodGuiderLeader') {
            this.guiders = data.list
          } else if (code === 'woodGuiderLeader') {
            this.guiderLeaders = data.list
          } else if (code === 'woodSales,woodSalesLeader') {
            this.salers = data.list
          }
        } else {
          this.$message.error('系统异常')
        }
      })
    },
    handleTableClick(table) {
      this.filters = Object.assign({}, this.filters, {
        statuses: '',
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        cutterId: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      })
      this.reqList()
    },
    exportExcel() {
      this.filters.export = 1
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || ''
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || ''
      this.reqList()
    },
    search() {
      this.filters.pageNumber = '1'
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || ''
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || ''
      this.reqList()
    },
    reqList(req = {}) {
      this.fullscreenLoading = true
      this.hasEdit = false
      var statuses = this.statusAll
      if (this.tabIndex === '0') {
      } else if (this.tabIndex === '1') {
        statuses = this.statusCut
      } else if (this.tabIndex === '2') {
        statuses = this.statusSend
      } else if (this.tabIndex === '3') {
        statuses = this.statusCheck
      } else if (this.tabIndex === '4') {
        statuses = this.status51x
      } else {
        statuses = this.status54x
      }
      if (this.filters.statuses === undefined || this.filters.statuses === '') {
        this.filters.statuses = statuses
      }
      if (this.filters.createTimeBegin === undefined) {
        this.filters.createTimeBegin = ''
      }
      if (this.filters.createTimeEnd === undefined) {
        this.filters.createTimeEnd = ''
      }
      request('/redwood/ziying/cut', {
        method: 'GET',
        data: this.filters
      }).then((res) => {
        this.fullscreenLoading = false
        if (res.success === '1') {
          if (res.page) {
            var all = 0 // 全部
            var cut = 0 // 剪版中
            var send = 0 // 快递中
            var check = 0 // 对账中
            var c51x = 0 // 报销动态
            var c54x = 0 // 欠款动态
            for (var key in res['group']) {
              var c = (res['group'][key] ? res['group'][key] : 0)
              if ((',' + this.statusAll + ',').indexOf(',' + key + ',') >= 0) {
                all += c
              }
              if ((',' + this.status51x + ',').indexOf(',' + key + ',') >= 0) {
                c51x += c
              }
              if ((',' + this.status54x + ',').indexOf(',' + key + ',') >= 0) {
                c54x += c
              }
              if ((',' + this.statusCut + ',').indexOf(',' + key + ',') >= 0) {
                cut += c
              }
              if ((',' + this.statusSend + ',').indexOf(',' + key + ',') >= 0) {
                send += c
              }
              if ((',' + this.statusCheck + ',').indexOf(',' + key + ',') >= 0) {
                check += c
              }
            }
            this.tabLabel[0] = '全部（' + all + '）'
            this.tabLabel[1] = '剪版中（' + cut + '）'
            this.tabLabel[2] = '快递中（' + send + '）'
            this.tabLabel[3] = '对账中（' + check + '）'
            this.tabLabel[4] = '报销动态（' + c51x + '）'
            if (this.isWoodAdmin || !this.isWoodCutClothLeader) {
              this.tabLabel[5] = '采购商欠款动态（' + c54x + '）'
            }
            this.convertData(res.page)
          } else if (res.obj) {
            window.open(res.obj)
          } else {
            this.result = []
            this.num1 = ''
            this.num2 = ''
            this.num3 = ''
            const currentNumber = 'num' + this.tabIndex
            this[currentNumber] = '0'
          }
          this.filters.export = 0
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
      this.result = page.result
      this.result.forEach((item) => {
        var ziying = (item.salerId !== '')
        item.ziying = ziying
      })
    },
    clearTemData() {
      this.temId = ''
      this.cutterId = ''
      this.cutterName = ''
      this.assignCutterVisible = false
    },
    countH() {
      this.height = String(document.documentElement.clientHeight - 230)
    },
    handleChangePagesize(size) {
      this.filters.pageSize = size
      this.reqList()
    },
    handleCurrentPageChange(currentPage) {
      this.filters.pageNumber = currentPage
      this.reqList()
    },
    resetSubmit() {
      Object.assign(this.filters, {
        statuses: '',
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        cutterId: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      })
    },
    title(h, { column, $index }) {
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
              createElementObj('span', null, '色号/颜色'),
              createElementObj('span', null, '数量'),
              createElementObj('span', null, '采购数量'),
              createElementObj('span', null, '单价/销售价'),
              createElementObj('span', null, '成本单价'),
              createElementObj('span', null, '采购单价')
            ])
          ])
        ])
      ])
      return renderElement(renderTree)
      function createElementObj(el, props, subEl) {
        return { el, props, subEl }
      }
      function renderElement(obj) {
        return h(obj.el, obj.props, typeof obj.subEl === 'object' ? obj.subEl.map(item => { return renderElement(item) }) : obj.subEl)
      }
    }
  },
  computed: {
    // guiderLeaderRole() {
    //   return new AuthSub().guiderLeaderRole()
    // },
    // guiderAdminRole() {
    //   return new AuthSub().guiderAdminRole()
    // },
    canDownExcel() {
      return false
    }
  },
  watch: {
  },
  destroyed() {
    window.removeEventListener('resize', this.countH)
  }
}
</script>

<style lang="scss">
.sy-current-cutter {
  color: #f00;
}

.sy-cutter-change {
  li {
    white-space: nowrap;
    margin: 10px 0;
    span {
      color: #20a0ff;
    }
  }
}

.y_table_wrap .el-table td .cell {
  padding: 0 !important;
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid #bfbfbf;
  }
  >div {
    display: table-cell;
    &:nth-child(1) {
      width: 60px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 0;
    }
    &:nth-child(2) {
      width: 215px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 0;
    }
    &:nth-child(3) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 1px solid #bfbfbf;
      // border-right: 1px solid #bfbfbf;
    }
    &:nth-child(4) {
      width: 600px;
      vertical-align: middle; // border-right: 1px solid #bfbfbf;
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

.product-td {
  height: 100%;
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
  span:nth-child(1) {
    width: 200px;
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
      border-right: 1px solid #e0e6ed;
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
    margin-left: 10px;
    .o-btn {
      // width: 80px;
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
  .line {
    border-bottom: 1px solid #e0e6ed;
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
    display: inline-block; // min-width: 320px;
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

.input-product {
  .el-col-24 {
    height: 30px;
    color: blue;
    font-size: 16px;
  }
  .el-col-4 {
    height: 30px;
  }
}

.line-item {
  min-height: 40px;
  margin-bottom: 10px;
  .line-item-l {
    float: left;
    font-size: 14px;
    width: 85px;
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

.showmadan {
  float: left;
  .madan-wrap {
    position: relative;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px; // border: 1px solid #ccc;
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

.el-upload-list {
  display: none;
}

.el-table td,
.el-table th {
  min-height: 40px;
  height: auto;
}

.input-dialog {
  min-width: 1200px;
  input {
    height: 26px;
  }
}

.input-number {
  width: 55px;
}

.input-select {
  width: 90px;
}

.upImg {
  float: left;
  width: 40px;
  height: 40px;
  line-height: 36px;
  background: #ccc;
  text-align: center;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  &:active {
    background: #999;
  }
}
</style>
