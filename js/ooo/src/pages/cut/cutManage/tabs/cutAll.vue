<template>
  <section v-loading.body="fullScreenLoading">
    <div class="search-content">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select v-model="reqParams.salerId" class="width251" @change="getData">
            <el-option label="全部销售" value=""></el-option>
            <el-option v-for="(item,index) in salersList" :value="item.id" :key="index" :label="item.realName || item.uesrName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="reqParams.guiderAdminId" class="width251" @change="getData">
            <el-option label="全部采购组" value=""></el-option>
            <el-option v-for="(item,index) in guiderLeadersList" :value="item.id" :key="index" :label="item.realName || item.uesrName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="reqParams.guiderId" class="width251" @change="getData">
            <el-option label="全部采购" value=""></el-option>
            <el-option v-for="(item,index) in guidersList" :value="item.id" :key="index" :label="item.realName || item.uesrName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="time-minWidth">
          <el-date-picker v-model="reqParams.createTimeBegin" type="date" placeholder="选择日期时间">
          </el-date-picker>
          -
          <el-date-picker v-model="reqParams.createTimeEnd" type="date" placeholder="选择日期时间">
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <el-input @keyup.enter.native="getData" class="same-height max-width" v-model="reqParams.key" placeholder="订单号/采购商/供应商/跟单员/剪版员"></el-input>
        </el-col>
        <el-col :span="8" class="max-width">
          <el-button @click.native="getData" type="primary">搜索</el-button>
          <el-button @click.native="reset">重置</el-button>
          <el-button @click.native="exportExcel" type="primary">导出excel</el-button>
        </el-col>
      </el-row>
    </div>
    <Tab></Tab>
    <div class="el-cutTable-content">
      <el-table :data="tableData" :height="tableHeight" border>
        <el-table-column label="订单编号" prop="" width="200" align="left">
          <template slot-scope="scope">
            <p>{{scope.row.number}}</p>
            <p v-if="Number(scope.row.delayTime) > 0" class="red-color">{{scope.row.delayTime | formatDate}}发货</p>
          </template>
        </el-table-column>
        <el-table-column label="订单时间" prop="createTime" width="160" align="left" :formatter="formatTime"></el-table-column>
        <el-table-column label="采购商名称" prop="customerCompany" width="140" align="left"></el-table-column>
        <el-table-column label="供应商名称" prop="shopCompany" width="140" align="left"></el-table-column>
        <el-table-column label="货号" prop="" width="180" align="left">
          <template slot-scope="scope">
            <el-popover placement="right-start" title="" width="200" trigger="click">
              <div class="productNumber-td" slot="reference">
                <template v-for="(item,index) in scope.row.productNumbers">
                  <span class="forgive-color" :key="index">{{item.number}}</span>
                  </br>
                </template>
                <i class="el-icon-arrow-down" slot="reference"></i>
              </div>
              <!-- 待做成组件 -->
              <template v-for="(item, index) in scope.row.productNumbers">
                <div :key="index" class="popover-div">
                  <p class="forgive-color big-font bottom-border-dashed">货号：{{item.number}}&nbsp;({{(item.category == 1 || scope.row.ziying) ? '面料' : '辅料'}})</p>
                  <p v-if="item.title">品名：{{item.title}}</p>
                  <p v-if="!item.title">品名：--</p>
                  <p>服务费单价：{{!scope.row.ziying && item.price > 0 ? item.price.toFixed(2) + item.priceUnit : '--'}}</p>
                  <table class="popover-table" v-if="item.colors && item.colors.length">
                    <thead>
                      <tr>
                        <th width="100">色号</th>
                        <th width="100">数量</th>
                        <th width="100">采购数量</th>
                        <th width="100">销售价</th>
                        <th width="100">采购单价</th>
                        <th width="100">成本单价</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(colorItem,colorIndex) in item.colors">
                        <tr :key="colorIndex">
                          <td>{{colorItem.color}}
                            <span v-if="colorItem.status == 0">无货</span>
                          </td>
                          <td>{{colorItem.followerQuantity | formatNumber}}{{colorItem.followerQuantityUnit}}</td>
                          <td>{{colorItem.cutterPriceMoney | formatNumber}}{{colorItem.cutterPriceMoneyUnit}}</td>
                          <td>{{colorItem.salePriceMoney | formatNumber}}{{colorItem.salePriceUnit}}</td>
                          <td>{{colorItem.cutterPriceMoney | formatNumber}}{{colorItem.cutterPriceMoneyUnit}}</td>
                          <td>{{colorItem.followerPriceMoney | formatNumber}}{{colorItem.followerPriceMoneyUnit}}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </template>
              <div class="popover-div2">
                <p>税率：￥{{scope.row.taxPoint | formatNumber}}%</p>
                <p>服务费：￥{{scope.row.serviceMoney | formatNumber}}</p>
                <p>运费：￥{{scope.row.freightMoney | formatNumber}}</p>
                <p>税费：￥{{scope.row.taxMoney | formatNumber}}</p>
                <p class="bottom-border-solid">成本货款：￥{{scope.row.costMoney | formatNumber}}</p>
                <p class="big-font">总费用：
                  <span class="red-color">{{scope.row.totalMoney | formatNumber}}</span>
                </p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="成本货款" prop="costMoney" width="100" align="right" :formatter="formatNumber"></el-table-column>
        <el-table-column label="总费用" prop="totalMoney" width="100" align="right" :formatter="formatNumber"></el-table-column>
        <el-table-column label="回款日期" prop="returnDate" width="160" align="left" :formatter="formatTime"></el-table-column>
        <el-table-column label="订单状态" prop="" width="140" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '200'" class="forgive-color">待录入色卡信息</span>
            <span v-if="scope.row.status == '201'" class="forgive-color">待提交审核</span>
            <span v-if="scope.row.status == '202'" class="forgive-color">待审核</span>
            <span v-if="scope.row.status == '220'" class="forgive-color">待发货</span>
            <span v-if="scope.row.status == '221'" class="forgive-color">待提交支付</span>
            <span v-if="scope.row.status == '222'" class="forgive-color">待对账</span>
            <span v-if="scope.row.status == '223'" class="forgive-color">已收款</span>
            <span v-if="scope.row.status == '230'" class="forgive-color">已取消</span>
            <span v-if="scope.row.status == '210'" class="forgive-color">待销账</span>
            <span v-if="scope.row.status == '211'" class="forgive-color">已销账</span>
            <span v-if="scope.row.status == '500'" class="forgive-color">待录入剪版信息</span>
            <span v-if="scope.row.status == '501'" class="forgive-color">待通知提货</span>
            <span v-if="scope.row.status == '502'" class="forgive-color">待提货</span>
            <span v-if="scope.row.status == '503'" class="forgive-color">待收版</span>
            <span v-if="scope.row.status == '520'" class="forgive-color">待发货</span>
            <span v-if="scope.row.status == '521'" class="forgive-color">待提交支付</span>
            <span v-if="scope.row.status == '522'" class="forgive-color">待对账</span>
            <span v-if="scope.row.status == '523'" class="forgive-color">已完成</span>
            <span v-if="scope.row.status == '530'" class="forgive-color">已取消</span>
            <span v-if="scope.row.status == '510'" class="forgive-color">待报销</span>
            <span v-if="scope.row.status == '511'" class="forgive-color">已报销</span>
            <span v-if="scope.row.status == '540'" class="forgive-color">欠款-未结清</span>
            <span v-if="scope.row.status == '541'" class="forgive-color" 欠款-已结清></span>
          </template>
        </el-table-column>
        <el-table-column label="销售员" prop="" width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.salerName">{{scope.row.salerName}}</span>
            <span v-if="!scope.row.salerName">--</span>
          </template>
        </el-table-column>
        <el-table-column label="跟单员" prop="" width="140" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.followerName">{{scope.row.followerName}}</span>
            <span v-if="!scope.row.followerName">--</span>
          </template>
        </el-table-column>
        <el-table-column label="采购员" prop="" width="140" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.guiderName">{{scope.row.guiderName}}</span>
            <span v-if="!scope.row.guiderName">--</span>
          </template>
        </el-table-column>
        <el-table-column label="剪版员" prop="" width="140" align="left">
          <template slot-scope="scope">
            <template v-if="scope.row.cutterChanges != ''">
              <el-popover ref="cutterChangePopover" placement="top" trigger="hover">
                <ul class="sy-cutter-change">
                  <li v-for="(item,index) in scope.row.cutterChanges" :key="index" v-html="item.replace(/\(/g,'<span>').replace(/\)/g,'</span>')"></li>
                </ul>
              </el-popover>
              <strong class="sy-current-cutter" v-popover:cutterChangePopover>{{scope.row.cutterName}}</strong>
            </template>
            <template v-else>{{scope.row.cutterName}}</template>
          </template>
        </el-table-column>
        <el-table-column label="订单来源" prop="" width="120">
          <template slot-scope="scope">
            {{scope.row.ziying ? '销售订单' : '代采订单'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" width="200" fixed="right" align="left">
          <template slot-scope="scope">
            <router-link :to="{name: 'cutDetail', query: {id: scope.row.id}}">
              <el-button class="width50" type="primary" size="mini">详情</el-button>
            </router-link>
            <router-link :to="{name: 'cutEdit', query: {id: scope.row.id}}" v-if="[200,201,202,221,222,223,230,210,211,240,241,503,500,501,502,521].indexOf(scope.row.status) != -1">
              <el-button class="width50" v-if="isWoodAdmin || isWoodGuiderAdmin" size="mini" type="primary">编辑</el-button>
            </router-link>
            <router-link :to="{name: 'cutEdit', query: {id: scope.row.id, noEdit: 1}}" v-if="[510,522].indexOf(scope.row.status) != -1">
              <el-button class="width50" v-if="isWoodAdmin || isWoodGuiderAdmin" size="mini" type="primary">编辑</el-button>
            </router-link>
            <el-button @click.native="showOrderDialog(scope.row, 'cut')" v-if="isWoodCutClothLeader && (scope.row.status == '200' || scope.row.status == '502')" type="warning" size="mini">指派剪版员</el-button>
            <el-button @click.native="showOrderDialog(scope.row, 'guider')" v-if="(isWoodAdmin || isWoodGuiderAdmin) && scope.row.status == '500'" type="warning" size="mini">指派采购员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="reqParams"></pagination>
    </div>
    <!-- 指派剪版dialog -->
    <el-dialog v-model="orderCutDialogVisible" size="tiny" title="指派剪版">
      <el-select style="width:250px;" v-model="reqOrderParams.cutterId" @change="handleCutSelect">
        <el-option label="全部剪版员" value=""></el-option>
        <el-option v-for="(item,index) in cutersList" :value="item.id" :key="index" :label="item.realName || item.uesrName"></el-option>
      </el-select>
      <footer style="margin-top: 45px;">
        <el-button @click.native="orderCutDialogVisible = false" size="small">取消</el-button>
        <el-button @click.native="confirmOrder('updateCutter')" :disabled="!reqOrderParams.cutterId" size="small" type="primary">确定</el-button>
      </footer>
    </el-dialog>
    <!-- 指派采购dialog -->
    <el-dialog v-model="orderGuiderDialogVisible" size="tiny" title="指派采购">
      <el-select style="width:250px;" v-model="reqOrderParams.guiderId" @change="handleGuiderSelect">
        <el-option label="全部采购员" value=""></el-option>
        <el-option v-for="(item,index) in guidersList" :value="item.id" :key="index" :label="item.realName || item.uesrName"></el-option>
      </el-select>
      <footer style="margin-top: 45px;">
        <el-button @click.native="orderGuiderDialogVisible = false" size="small">取消</el-button>
        <el-button @click.native="confirmOrder('updateGuider')" :disabled="!reqOrderParams.guiderId" size="small" type="primary">确定</el-button>
      </footer>
    </el-dialog>
  </section>
</template>

<script>
import getCache from '@/utils/getCache'
import Tab from '../tab.vue'
import pagination from '@/components/pagination'
import request from '@/utils/request'
export default {
  components: {
    Tab,
    pagination,
  },
  data() {
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      orderCutDialogVisible: false,
      orderGuiderDialogVisible: false,
      fullScreenLoading: false,
      salersList: [],
      cutersList: [],
      guiderLeadersList: [],
      guidersList: [],
      tableData: [],
      tableHeight: 600,
      isWoodAdmin: auth.woodAdmin,
      isWoodCutClothLeader: auth.woodCutClothLeader,
      isWoodFinance: auth.woodFinance,
      isWoodGuiderAdmin: auth.woodGuiderAdmin,
      isWoodGuiderLeader: auth.woodGuiderLeader,
      reqOrderParams: {
        guiderId: '',
        guiderName: '',
        cutterId: '',
        cutterName: '',
        id: '',
      },
      reqParams: {
        key: '',
        salerId: '',
        guiderId: '',
        guiderAdminId: '',
        createTimeBegin: '',
        createTimeEnd: '',
        pageSize: 20,
        pageNumber: 1,
        listAll: 1,
        statuses: '200,201,202,220,221,222,223,230,500,501,502,503,520,521,522,523,530',
        export: 0,
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20
      }
    }
  },
  mounted() {
    this.getSeedList('woodCutCloth')
    this.getSeedList('woodGuider,woodGuiderLeader')
    this.getSeedList('woodGuiderLeader')
    this.getSeedList('woodSales,woodSalesLeader')
    this.getData()
    this.tableHeight = document.body.clientHeight - 295
  },
  methods: {
    getData() {
      this.fullScreenLoading = true
      if (this.reqParams.createTimeBegin) {
        const ctb = new Date(this.reqParams.createTimeBegin).getTime()
        const cyb = new Date(ctb).getFullYear()
        const cmb = new Date(ctb).getMonth() + 1
        const cdb = new Date(ctb).getDate()
        const cTimeb = cyb + '/' + cmb + '/' + cdb
        this.reqParams.createTimeBegin = new Date(cTimeb).getTime()
      }
      if (this.reqParams.createTimeEnd) {
        const cte = new Date(this.reqParams.createTimeEnd).getTime()
        const cye = new Date(cte).getFullYear()
        const cme = new Date(cte).getMonth() + 1
        const cde = new Date(cte).getDate()
        const cTime = cye + '/' + cme + '/' + cde
        this.reqParams.createTimeEnd = new Date(cTime).getTime() + (24 * 3600 - 1) * 1000
      }
      this.reqParams.export = 0
      request('/redwood/ziying/cut', {
        method: 'GET',
        data: this.reqParams
      }).then(res => {
        if (res.success == 1) {
          this.tableData = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
          this.tableData.forEach((item) => {
            this.$set(item, 'ziying', false)
            let ziying = (item.salerId !== '')
            item.ziying = ziying
          })
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    showOrderDialog(item, type) {
      this.reqOrderParams.id = item.id
      this.reqOrderParams.guiderId = ''
      this.reqOrderParams.guiderName = ''
      this.reqOrderParams.cutterId = ''
      this.reqOrderParams.cutterName = ''
      if (type == 'cut') {
        this.orderCutDialogVisible = true
      } else if (type == 'guider') {
        this.orderGuiderDialogVisible = true
      }
    },
    confirmOrder(type) {
      let model = 'cut'
      if (type === 'updateGuider') {
        model = 'ziying/cut'
      }
      request(`/redwood/${model}/${this.reqOrderParams.id}?_function=${type}`, {
        method: 'PUT',
        data: this.reqOrderParams,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.orderCutDialogVisible = false
          this.orderGuiderDialogVisible = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCutSelect(val) {
      this.cutersList.map(item => {
        if (item.id == val) {
          this.reqOrderParams.cutterName = item.realName ? item.realName : item.userName
        }
      })
    },
    handleGuiderSelect(val) {
      this.guidersList.map(item => {
        if (item.id == val) {
          this.reqOrderParams.guiderName = item.realName ? item.realName : item.userName
        }
      })
    },
    getSeedList(code) {
      request('/crm/user/User/listRedSeedByCodes', {
        method: 'POST',
        data: {
          param: JSON.stringify({ code: code })
        }
      }).then(res => {
        if (res.success == 1) {
          if (code === 'woodCutCloth') {
            this.cutersList = res.list
          } else if (code === 'woodGuider,woodGuiderLeader') {
            this.guidersList = res.list
          } else if (code === 'woodGuiderLeader') {
            this.guiderLeadersList = res.list
          } else if (code === 'woodSales,woodSalesLeader') {
            this.salersList = res.list
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    exportExcel() {
      this.fullScreenLoading = true
      if (this.reqParams.createTimeBegin) {
        const ctb = new Date(this.reqParams.createTimeBegin).getTime()
        const cyb = new Date(ctb).getFullYear()
        const cmb = new Date(ctb).getMonth() + 1
        const cdb = new Date(ctb).getDate()
        const cTimeb = cyb + '/' + cmb + '/' + cdb
        this.reqParams.createTimeBegin = new Date(cTimeb).getTime()
      }
      if (this.reqParams.createTimeEnd) {
        const cte = new Date(this.reqParams.createTimeEnd).getTime()
        const cye = new Date(cte).getFullYear()
        const cme = new Date(cte).getMonth() + 1
        const cde = new Date(cte).getDate()
        const cTime = cye + '/' + cme + '/' + cde
        this.reqParams.createTimeEnd = new Date(cTime).getTime() + (24 * 3600 - 1) * 1000
      }
      this.reqParams.export = 1
      request('/redwood/ziying/cut', {
        method: 'GET',
        data: this.reqParams
      }).then(res => {
        if (res.success == 1) {
          window.open(`${res.obj}`)
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    }
  }
}
</script>

<style lang="scss">

</style>
