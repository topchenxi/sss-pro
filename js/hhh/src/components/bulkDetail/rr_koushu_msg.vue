<template>
  <section>
    <ul class="allDetail-tab">
      <li @click="changeTab('退换货信息')" :class="activeName == '退换货信息' ? 'isActive' : ''">退换货信息</li>
      <li @click="changeTab('扣数信息')" :class="activeName == '扣数信息' ? 'isActive' : ''">扣数信息</li>
    </ul>
    <div v-if="activeName == '退换货信息'" class="shareClass rr-msg">
      <el-table :data="rrData" border>
        <el-table-column type="expand">
          <template scope="scope">
            <table>
              <colgroup>
                <col width="6%">
                <col width="15%">
                <col v-if="scope.row.type == 2 || scope.row.type == 4" width="15%">
                <col width="16%">
                <col width="16%">
                <col width="16%">
                <col width="16%">
                <col width="13%">
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>色号</th>
                  <th v-if="scope.row.type == 1 || scope.row.type == 3">退货实数</th>
                  <th v-if="scope.row.type == 2 || scope.row.type == 4">换货实数</th>
                  <th v-if="scope.row.type == 2 || scope.row.type == 4">现采购数</th>
                  <th>匹号</th>
                  <th>入仓实数</th>
                  <th>实际布长</th>
                  <th>验货报告</th>
                </tr>
              </thead>
              <tbody v-if="scope.row.rrDetail && scope.row.rrDetail.beforeList && scope.row.rrDetail.beforeList.length">
                <template v-for="(list, listIndex) in scope.row.rrDetail.beforeList">
                  <tr>
                    <td v-if="listIndex == 0" :rowspan="scope.row.rrDetail.len1" class="forgive-color">{{(scope.row.type == 1 || scope.row.type == 3) ? '退前' : '换前'}}</td>
                    <td :rowspan="list.clothLoneList.length + 2">{{list.color}}</td>
                    <td :rowspan="list.clothLoneList.length + 2">{{list.realQuantity | formatNumber}}{{list.realQuantityUnit}}</td>
                    <td :rowspan="list.clothLoneList.length + 2" v-if="scope.row.type == 2 || scope.row.type == 4">{{list.needBuyQuantity | formatNumber}}{{list.needBuyQuantityUnit}}</td>
                    <tr v-for="(cloth,clothIndex) in list.clothLoneList">
                      <td>{{cloth.number}}</td>
                      <td>{{cloth.quantity | formatNumber}}{{cloth.quantityUnit}}</td>
                      <td>{{cloth.buchang | formatNumber}}{{cloth.buchangUnit}}</td>
                      <td>
                        <template v-if="cloth.clothCheckReportId">
                          <a :href="`${host}?clothLoneId=${cloth.id}`" class="forgive-color" style="cursor:pointer" target="_blank">
                            <span v-if="cloth.rank == 1">A</span>
                            <span v-if="cloth.rank == 2">B</span>
                            <span v-if="cloth.rank == 3">C</span>
                            <span v-if="cloth.rank == 4">D</span>
                             / {{cloth.average}}
                          </a>
                        </template>
                        <template v-else>
                          -- / --
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td class="bold-text">共{{list.totalPi}}匹</td>
                      <td class="bold-text">{{list.totalQuantity | formatNumber}}{{list.totalQuantityUnit}}</td>
                      <td class="bold-text">{{list.totalBuchang | formatNumber}}{{list.totalBuchangUnit}}</td>
                      <td class="bold-text"></td>
                    </tr>
                  </tr>
                </template>
              </tbody>
              <tbody v-if="scope.row.rrDetail.afterList && scope.row.rrDetail.afterList.length">
                <!-- <template v-for="(colorItem, colorIndex) in scope.row.rrDetail.afterList">
                  <tr v-for="(clothItem,clothIndex) in colorItem.clothLoneList">
                    <td v-if="colorIndex == 0 && clothIndex == 0" :rowspan="scope.row.rrDetail.len2" class="colorfa">
                      {{(scope.row.type == 1 || scope.row.type == 3) ? '退后' : '换后'}}
                    </td>
                    <td>{{colorItem.color}}</td>
                    <td>{{colorItem.realQuantity | formatNumber}}{{colorItem.realQuantityUnit}}</td>
                    <td v-if="scope.row.type == 2 || scope.row.type == 4">{{colorItem.needBuyQuantity | formatNumber}}{{colorItem.needBuyQuantityUnit}}</td>
                    <td>{{clothItem.number}}</td>
                    <td>{{clothItem.quantity | formatNumber}}{{clothItem.quantityUnit}}</td>
                    <td>{{clothItem.buchang | formatNumber}}{{clothItem.buchangUnit}}</td>
                    <td>
                      <div v-if="scope.row.type == 1 || scope.row.type == 3">
                        --
                      </div>
                      <div v-else>
                        <template v-if="clothItem.clothCheckReportId">
                          <a :href="`${host}?clothLoneId=${clothItem.id}`" class="forgive-color" style="cursor:pointer" target="_blank">
                            <span v-if="clothItem.rank == 1">A</span>
                            <span v-if="clothItem.rank == 2">B</span>
                            <span v-if="clothItem.rank == 3">C</span>
                            <span v-if="clothItem.rank == 4">D</span>
                            /{{clothItem.average}}
                          </a>
                        </template>
                        <template v-else>
                          -- / --
                        </template>
                      </div>
                    </td>
                  </tr>
                </template> -->
                <template v-for="(list, listIndex) in scope.row.rrDetail.afterList">
                  <tr>
                    <td v-if="listIndex == 0" :rowspan="scope.row.rrDetail.len2" class="colorfa">{{(scope.row.type == 1 || scope.row.type == 3) ? '退后' : '换后'}}</td>
                    <td :rowspan="list.clothLoneList.length + 2">{{list.color}}</td>
                    <td :rowspan="list.clothLoneList.length + 2">{{list.realQuantity | formatNumber}}{{list.realQuantityUnit}}</td>
                    <td :rowspan="list.clothLoneList.length + 2" v-if="scope.row.type == 2 || scope.row.type == 4">{{list.needBuyQuantity | formatNumber}}{{list.needBuyQuantityUnit}}</td>
                    <tr v-for="(cloth,clothIndex) in list.clothLoneList">
                      <td>{{cloth.number}}</td>
                      <td>{{cloth.quantity | formatNumber}}{{cloth.quantityUnit}}</td>
                      <td>{{cloth.buchang | formatNumber}}{{cloth.buchangUnit}}</td>
                      <td>
                        <template v-if="cloth.clothCheckReportId">
                          <a v-if="cloth.rank&&cloth.average" :href="`${host}?clothLoneId=${cloth.id}`" class="forgive-color" style="cursor:pointer" target="_blank">
                            <span v-if="cloth.rank == 1">A</span>
                            <span v-if="cloth.rank == 2">B</span>
                            <span v-if="cloth.rank == 3">C</span>
                            <span v-if="cloth.rank == 4">D</span>
                            /{{cloth.average}}
                          </a>
                            <a v-else :href="`${host}?clothLoneId=${cloth.id}`" class="forgive-color" style="cursor:pointer" target="_blank">查看</a>
                        </template>
                        <template v-else>
                          -- / --
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td class="bold-text">共{{list.totalPi}}匹</td>
                      <td class="bold-text">{{list.totalQuantity | formatNumber}}{{list.totalQuantityUnit}}</td>
                      <td class="bold-text">{{list.totalBuchang | formatNumber}}{{list.totalBuchangUnit}}</td>
                      <td class="bold-text"></td>
                    </tr>
                  </tr>
                </template>
              </tbody>
            </table>
            <p class="ta-l"><span>备注 : </span> {{scope.row.rrDetail.guiderRemark || '--'}} </p>
          </template>
        </el-table-column>
        <el-table-column label="退换货申请时间" width="200">
          <template scope="scope">
            <span>{{scope.row.createTime | date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="退换货单号" prop="number"></el-table-column>
        <el-table-column label="入仓单号" prop="inNumber"></el-table-column>
        <el-table-column label="退换货类型">
          <template scope="scope">
            <span v-if="scope.row.type == 1">售前退货</span>
            <span v-if="scope.row.type == 2">售前换货</span>
            <span v-if="scope.row.type == 3">售后退货</span>
            <span v-if="scope.row.type == 4">售后换货</span>
          </template>
        </el-table-column>
        <el-table-column label="退/换货原数">
          <template scope="scope">
            <span>{{scope.row.quantity | formatNumber}}{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="退/换货实数">
          <template scope="scope">
            <span>{{scope.row.realQuantity | formatNumber}}{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="现采购数">
          <template scope="scope">
            <span>{{scope.row.needBuyQuantity | formatNumber}}{{scope.row.unit}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="activeName == '扣数信息'" class="shareClass koushu-msg">
      <table border="1">
        <colgroup>
          <col width="10%">
          <col width="10%">
          <col width="10%">
          <col width="8%">
          <col width="8%">
          <col width="8%">
          <col width="10%">
          <col width="10%">
          <col width="8%">
          <col width="8%">
        </colgroup>
        <thead>
          <th>开单时间</th>
          <th>扣数单号</th>
          <th>出仓单号</th>
          <th>扣数类型</th>
          <th>货号</th>
          <th>色号</th>
          <th>采购商扣数</th>
          <th>供应商扣数</th>
          <th>采购商扣数金额</th>
          <th>供应商扣数金额</th>
          <th>状态</th>
        </thead>
        <template v-if="!koushuData.length">
          <tr>
            <td colspan="11" style="height:250px;text-align:center">
              <div class="empty"></div>
            </td>
          </tr>
        </template>
        <template v-if="koushuData.length" v-for="kouItem in koushuData">
          <tr v-for="list in kouItem.detailList">
            <td>
              <p style="line-height:20px;">{{kouItem.createTime | date('yyyy-MM-dd')}}</p>
              <p style="line-height:20px;">{{kouItem.createTime | date('hh:mm:ss')}}</p>
            </td>
            <td>{{kouItem.number}}</td>
            <td>{{kouItem.outReposityNumber}}</td>
            <td>
              <span v-if="kouItem.type == 0">其他</span>
              <span v-if="kouItem.type == 1">损耗</span>
              <span v-if="kouItem.type == 2">运费</span>
              <span v-if="kouItem.type == 3">售后退换货</span>
            </td>
            <td>{{list.productNumber}}</td>
            <td>{{list.color}}</td>
            <td style="text-align:right">{{list.buyerKouShu | formatNumber}}&nbsp;{{list.quantityUnit}}</td>
            <td style="text-align:right">{{list.sellerKouShu | formatNumber}}&nbsp;{{list.quantityUnit}}</td>
            <td class="money" style="text-align:right">{{kouItem.kouShuMoney | formatNumber}}</td>
            <td class="money" style="text-align:right">{{kouItem.tuiKuanMoney | formatNumber}}</td>
            <td>
              <span class="forgive-color" v-if="kouItem.status == -1">已取消</span>
              <span class="forgive-color" v-if="kouItem.status == 1">待处理</span>
              <span class="forgive-color" v-if="kouItem.status == 2">已处理</span>
            </td>
          </tr>
        </template>
      </table>
    </div>
  </section>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
  setCache,
  getCache,
} from 'utils/tool'
export default {
  name: 'rr_koushu_msg',
  props: ['id'],
  components: {
    Lightbox,
  },
  data() {
    return {
      activeName: '退换货信息',
      koushuData: [],
      rrData: [],
      host: '',
    }
  },
  watch: {
    id() {
      this.getData()
    }
  },
  mounted() {
    const host = window.location.host
    if (host.indexOf('local') > -1 || host.indexOf('test') > -1 || host.indexOf('hspc') > -1) {
      this.host = 'http://testmhongshan.soouya.com/reportDetail.html'
    } else {
      this.host = 'http://mhongshan.soouya.com/reportDetail.html'
    }
    let tab = getCache({
      key: 'rrKoushuMsgTab',
    })
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    getData() {
      newRequest({
        url: '/redwood/buttonNumber/list',
        data: {
          orderNumber: this.id
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.koushuData = res.page.result
        }
      })
      newRequest({
        url: '/redwood/returnReplaceBulkDetail',
        data: {
          orderNumber: this.id
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.rrData = res.result
          this.rrData.forEach(item => {
            this.getDetail(item)
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getDetail(item) {
      newRequest({
        url: '/redwood/returnreplace/getById',
        data: { id: item.id },
        method: 'get',
      }).then(res => {
        if (res.success == 1) {
          this.$set(item, 'rrDetail', {})
          let len1 = 1
          let len2 = 1
          res.obj.beforeList.forEach(item1 => {
            len1 += item1.clothLoneList.length + 2
            item1.totalPi = 0
            item1.totalQuantity = 0
            item1.totalBuchang = 0
            item1.totalQuantityUnit = ''
            item1.totalBuchangUnit = ''
            item1.clothLoneList.forEach(item2 => {
              item1.totalPi += 1
              item1.totalQuantity += item2.quantity
              item1.totalBuchang += item2.buchang
              item1.totalQuantityUnit = item2.quantityUnit
              item1.totalBuchangUnit = item2.buchangUnit
            })
          })
          console.log(res.obj.afterList.length)
          res.obj.afterList.forEach(item1 => {
            console.log(item1.color, item1);
            len2 += item1.clothLoneList.length + 2
            item1.totalPi = 0
            item1.totalQuantity = 0
            item1.totalBuchang = 0
            item1.totalQuantityUnit = ''
            item1.totalBuchangUnit = ''
            item1.clothLoneList.forEach(item2 => {
              item1.totalPi += 1
              item1.totalQuantity += item2.quantity
              item1.totalBuchang += item2.buchang
              item1.totalQuantityUnit = item2.quantityUnit
              item1.totalBuchangUnit = item2.buchangUnit
            })
          })
          res.obj.len1 = len1
          res.obj.len2 = len2
          item.rrDetail = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeTab(tab) {
      this.activeName = tab
      setCache({
        key: 'rrKoushuMsgTab',
        value: this.activeName
      })
    },
  },
  filters: {
    formatNumber(val) {
      return val ? Number(val).toFixed(2) : '--';
    }
  }
}

</script>
<style>


</style>
