<template>
  <section v-loading.body="fullScreenLoading">
    <el-row :gutter="10" class="search-content">
      <el-col :span="4">
        <el-select class="same-height width251" v-model="reqParams.status" placeholder="全部" @change="getData">
          <el-option label="全部" value="">
          </el-option>
          <el-option label="待通知找版" :value="101" size="small">
          </el-option>
          <el-option label="待指派组长" :value="103" size="small">
          </el-option>
          <el-option label="待分配任务" :value="105" size="small">
          </el-option>
          <el-option label="待录入色卡信息" :value="111" size="small">
          </el-option>
          <el-option label="待提交审核" :value="115" size="small">
          </el-option>
          <el-option label="待审核" :value="121" size="small">
          </el-option>
          <el-option label="待收色卡" :value="125" size="small">
          </el-option>
          <el-option label="待寄色卡" :value="131" size="small">
          </el-option>
          <el-option label="等待确认收货" :value="3" size="small">
          </el-option>
          <el-option label="已完成" :value="10" size="small">
          </el-option>
          <el-option label="已取消" :value="100" size="small">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input @keyup.enter.native="getData" class="same-height" placeholder="订单号/采购商名称/销售员/跟单员/审核员/找版员" v-model="reqParams.keyword">
        </el-input>
      </el-col>
      <el-col :span="8" class="time-minWidth">
        <el-date-picker v-model="reqParams.createTimeBegin" type="date" placeholder="选择日期时间">
        </el-date-picker>
        -
        <el-date-picker v-model="reqParams.createTimeEnd" type="date" placeholder="选择日期时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5" class="small-btn-group">
        <el-button type="primary" size="small" @click.native="getData">搜索</el-button>
        <el-button type="" size="small" @click.native="reset">重置</el-button>
        <el-button type="primary" size="small" @click.native="exportExcel">导出excel</el-button>
      </el-col>
    </el-row>
    <Tab></Tab>
    <div class="fy-table-content" :style="{'height': tableHeight + 'px'}">
      <table class="fy-table-body"  border="1">
          <colgroup>
          <!-- 需求号 -->
          <col width="120px"></col>
          <!-- 发布时间 -->
          <col width="160px"></col>
          <!-- 采购商名称 -->
          <col width="180px"></col>
          <!-- 订单时间 -->
          <col width="160px"></col>
          <!-- 订单编号 -->
          <col width="180px"></col>
          <!-- 订单状态 -->
          <col width="140px"></col>
          <!-- 品类 -->
          <col width="80px"></col>
          <!-- 寻样要求 -->
          <col width="120px"></col>
          <!-- 提案 -->
          <col width="60px"></col>
          <!-- 换卡头 -->
          <col width="80px"></col>
          <!-- 成分织法 -->
          <col width="120px"></col>
          <!-- 档次 -->
          <col width="60px"></col>
          <!-- 是否有实版 -->
          <col width="120px"></col>
          <!-- 是否收到实版 -->
          <col width="120px"></col>
          <!-- 颜色要求 -->
          <col width="100px"></col>
          <!-- 需求数量 -->
          <col width="120px"></col>
          <!-- 货号 -->
          <col width="120px"></col>
          <!-- 自营档口 -->
          <col width="120px"></col>
          <!-- 档口名称 -->
          <col width="120px"></col>
          <!-- 档口电话 -->
          <col width="140px"></col>
          <!-- 档口地址 -->
          <col width="200px"></col>
          <!-- 审核打分 -->
          <col width="80px"></col>
          <!-- 审核备注 -->
          <col width="120px"></col>
          <!-- 审核时间 -->
          <col width="160px"></col>
          <!-- 销售员 -->
          <col width="100px"></col>
          <!-- 跟单员 -->
          <col width="100px"></col>
          <!-- 审核员 -->
          <col width="100px"></col>
          <!-- 找版员 -->
          <col width="100px"></col>
          <!-- 订单来源 -->
          <col width="100px"></col>
          </colgroup>
        <thead>
          <th>需求号</th>
          <th>发布时间</th>
          <th>采购商名称</th>
          <th>订单时间</th>
          <th>订单编号</th>
          <th>订单状态</th>
          <th>品类</th>
          <th>寻样要求</th>
          <th>提案</th>
          <th>换卡头</th>
          <th>成分织法</th>
          <th>档次</th>
          <th>是否有实版</th>
          <th>是否收到实版</th>
          <th>颜色要求</th>
          <th>需求数量</th>
          <th>货号</th>
          <th>自营档口</th>
          <th>档口名称</th>
          <th>档口电话</th>
          <th>档口地址</th>
          <th>审核打分</th>
          <th>审核备注</th>
          <th>审核时间</th>
          <th>销售员</th>
          <th>跟单员</th>
          <th>审核员</th>
          <th>找版员</th>
          <th>订单来源</th>
        </thead>
        <tbody>
          <!-- 第一层循环 -->
          <template v-for="(item, itemIndex) in tableData">
            <template v-for="(orderItem, orderIndex) in item.orderList">
              <!-- 需求号 -->
              <td style="text-align:left" :rowspan="item.rowLen" v-if="orderIndex === 0" :key="item.needNumber">{{item.needNumber}}</td>
              <!-- 发布时间 -->
              <td style="text-align:left" :rowspan="item.rowLen" v-if="orderIndex === 0">{{item.needCreateTime}}</td>
              <!-- 采购商名称 -->
              <td style="text-align:left" align="left" :rowspan="item.rowLen" v-if="orderIndex === 0">{{item.customerCompany}}</td>
              <!-- 订单时间 -->
              <td style="text-align:left" :rowspan="orderItem.colorList.length + 1">{{orderItem.createTime}}</td>
              <!-- 订单编号 -->
              <td style="text-align:left" :rowspan="orderItem.colorList.length + 1">{{orderItem.serviceNumber}}</td>
              <!-- 订单状态 -->
              <td style="text-align:left" :rowspan="orderItem.colorList.length + 1">{{orderItem.status}}</td>
              <!-- 品类 -->
              <td :rowspan="orderItem.colorList.length + 1">{{orderItem.productType}}</td>
              <!-- 寻样要求 -->
              <td style="text-align:left" :rowspan="orderItem.colorList.length + 1">{{orderItem.findType}}</td>
              <!-- 提案 -->
              <td :rowspan="orderItem.colorList.length + 1">{{orderItem.motion}}</td>
              <!-- 换卡头 -->
              <td :rowspan="orderItem.colorList.length + 1">{{orderItem.changeCard}}</td>
              <!-- 成分织法 -->
              <td style="text-align:left" :rowspan="orderItem.colorList.length + 1">{{orderItem.title}}</td>
              <!-- 档次 -->
              <td :rowspan="orderItem.colorList.length + 1">{{orderItem.worth}}</td>
              <!-- 是否有实版 -->
              <td :rowspan="orderItem.colorList.length + 1">{{orderItem.haveRealVersion}}</td>
              <!-- 是否收到实版 -->
              <td :rowspan="orderItem.colorList.length + 1">{{orderItem.hasReceive}}</td>
              <!-- 颜色要求 -->
              <td style="text-align:left" :rowspan="orderItem.colorList.length + 1">{{orderItem.color}}</td>
              <!-- 需求数量 -->
              <td style="text-align:right" :rowspan="orderItem.colorList.length + 1">{{orderItem.quantity}}</td>
              <tr v-for="(colorItem,colorIndex) in orderItem.colorList" :key="orderItem.productNumber">
                <!-- 货号 -->
                <td style="text-align:left">{{colorItem.productNumber}}</td>
                <!-- 自营档口 -->
                <td style="text-align:left">{{colorItem.zyShopCompany}}</td>
                <!-- 档口名称 -->
                <td style="text-align:left">{{colorItem.shopCompany}}</td>
                <!-- 档口电话 -->
                <td style="text-align:left">{{colorItem.shopTel}}</td>
                <!-- 档口地址 -->
                <td style="text-align:left">{{colorItem.shopFullAddr}}</td>
                <!-- 审核打分 -->
                <td :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.score}}</td>
                <!-- 审核备注 -->
                <td style="text-align:left" :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.scoreRemark}}</td>
                <!-- 审核时间 -->
                <td style="text-align:left" :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.scoreTime}}</td>
                <!-- 销售员 -->
                <td style="text-align:left" :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.salesName}}</td>
                <!-- 跟单员 -->
                <td style="text-align:left" :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.followerName}}</td>
                <!-- 审核员 -->
                <td style="text-align:left" :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.auditorName}}</td>
                <!-- 找版员 -->
                <td style="text-align:left" :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.clothHunterName}}</td>
                <!-- 订单来源 -->
                <td style="text-align:left" :rowspan="orderItem.colorList.length + 1" v-if="colorIndex === 0">{{orderItem.category}}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
    <div class="page-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="reqParams"></pagination>
    </div>
  </section>
</template>

<script>
import Tab from '../tab.vue'
import pagination from '@/components/pagination'
import request from '@/utils/request'
export default {
  components: {
    Tab,
    pagination
  },
  data() {
    return {
      fullScreenLoading: true,
      tableHeight: 600,
      tableData: [
        {
          orderList: [],
        }
      ],
      reqParams: {
        status: '',
        keyword: '',
        createTimeBegin: new Date().getTime() - 90 * 24 * 3600 * 1000,
        createTimeEnd: new Date().getTime(),
        pageSize: 20,
        pageNumber: 1,
        tag: 11,
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20,
      }
    }
  },
  mounted() {
    this.tableHeight = document.body.clientHeight - 238
    this.getData()
  },
  methods: {
    getData() {
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
      request('/redwood/report/findColorCard/list', {
        data: this.reqParams,
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          this.tableData = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
          this.tableData.map(item => {
            this.$set(item, 'rowLen', 0)
            if (item.orderList) {
              item.orderList.map(orderItem => {
                if (orderItem.colorList) {
                  item.rowLen += orderItem.colorList.length + 1
                }
              })
            }
          })
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    reset() {
      this.reqParams.createTimeBegin = new Date().getTime() - 90 * 24 * 3600 * 1000
      this.reqParams.createTimeEnd = new Date().getTime()
      this.reqParams.tag = 11
      this.reqParams.keyword = ''
      this.reqParams.pageNumber = 1
      this.reqParams.pageSize = 20
      this.reqParams.status = ''
      this.getData()
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
      request('/redwood/report/findColorCard/export', {
        data: this.reqParams,
        method: 'GET',
      }).then(res => {
        if (res.success == 1) {
          window.open(`http://www.soouya.com${res.obj}`)
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.small-btn-group {
  .el-button--small {
    height: 36px;
  }
}
</style>
