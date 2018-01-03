<template>
  <section class="sy-page-wrap" element-loading-text="拼命加载中">
    <div class="sy-tabs-wrap" ref="tabsWrap">
      <el-tabs v-model="filters.tag" v-if="orderList" @tab-click="getFindOrderList">
        <el-tab-pane label="全部" name="0">
        </el-tab-pane>
        <el-tab-pane :label="`找版中 ${findingNum ? '(' + findingNum + ')' : ''} `" name="11">
        </el-tab-pane>
        <el-tab-pane :label="`快递中 ${expressingNum ? '(' + expressingNum + ')' : ''} `" name="12">
        </el-tab-pane>
      </el-tabs>
      <el-form :inline="true" ref="cutOrderSearch" :model="filters">
        <el-form-item>
          <el-input placeholder="订单号、采购商名称、销售员、跟单员、审核员、找版员" size="small" v-model="filters.keyword" class="sy-cut-search">
          </el-input>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="filters.status" size="small" style="width: 170px; display: inline-block;" placeholder="全部">
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
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker v-model="filters.createTimeBegin" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
          -
          <el-date-picker v-model="filters.createTimeEnd" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click.native="search" class="btn-search">
            搜索
          </el-button>
          <el-button type="primariy" size="small" @click.native="resetForm('cutOrderSearch')" class="btn-search">
            重置
          </el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" size="small" @click.native.stop="exportExcel" class="btn-export">
            导出Excel
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="loading">
      <div class="main-wrap">
        <div class="main-content style-1">
          <div class="table-wrap" :style="{'height':height+'px'}">
            <table class="table">
              <colgroup>
                <!-- 需求号 -->
                <col width="3%">
                <!-- 发布时间 -->
                <col width="3%">
                <!-- 采购商名称 -->
                <col width="6%">
                <!-- 订单时间 -->
                <col width="3%">
                <!-- 订单编号 -->
                <col width="3%">
                <!-- 品类 -->
                <col width="3%">
                <!-- 寻样要求 -->
                <col width="3%">
                <!-- 提案 -->
                <col width="3%">
                <!-- 换卡头 -->
                <col width="3%">
                <!-- 成分织法 -->
                <col width="3%">
                <!-- 档次 -->
                <col width="3%">
                <!-- 是否有实版 -->
                <col width="3%">
                <!-- 是否收到实版 -->
                <col width="3%">
                <!-- 颜色要求 -->
                <col width="3%">
                <!-- 需求数量 -->
                <col width="3%">
                <!-- 货号 -->
                <col width="5%">
                <!-- 自营档口 -->
                <col width="5%">
                <!-- 档口名称 -->
                <col width="5%">
                <!-- 档口电话 -->
                <col width="5%">
                <!-- 档口地址 -->
                <col width="5%">
                <!-- 审核打分 -->
                <col width="3%">
                <!-- 审核备注 -->
                <col width="3%">
                <!-- 审核时间 -->
                <col width="3%">
                <!-- 销售员 -->
                <col width="3%">
                <!-- 跟单员 -->
                <col width="3%">
                <!-- 审核员 -->
                <col width="3%">
                <!-- 找版员 -->
                <col width="3%">
                <!-- 订单来源 -->
                <col width="3%">
                <!-- 订单状态 -->
              </colgroup>
              <thead>
                <tr>
                  <th>需求号</th>
                  <th>发布时间</th>
                  <th>采购商名称</th>
                  <th>订单时间</th>
                  <th>订单编号</th>
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
                  <th>订单状态</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item,index) in orderList">
                  <tr v-for="(orderItem,orderIndex) in item.orderList">
                    <!-- 需求号 -->
                    <td :rowspan="item.orderList.length" v-if="!orderIndex">{{item.needNumber}} </td>
                    <!-- 发布时间 -->
                    <td :rowspan="item.orderList.length" v-if="!orderIndex">{{item.needCreateTime}}</td>
                    <!-- 采购商名称 -->
                    <td :rowspan="item.orderList.length" v-if="!orderIndex" style="text-align:left">{{item.customerCompany}}</td>
                    <!-- 订单时间 -->
                    <td>{{orderItem.createTime}}</td>
                    <!-- 订单编号 -->
                    <td>{{orderItem.serviceNumber}}</td>
                    <!-- 品类 -->
                    <td>{{orderItem.productType}}</td>
                    <!-- 寻样要求 -->
                    <td>{{orderItem.findType}}</td>
                    <!-- 提案 -->
                    <td>{{orderItem.motion}}</td>
                    <!-- 换卡头 -->
                    <td>{{orderItem.changeCard}}</td>
                    <!-- 成分织法 -->
                    <td>{{orderItem.title}}</td>
                    <!-- 档次 -->
                    <td>{{orderItem.worth}}</td>
                    <!-- 是否有实版 -->
                    <td>{{orderItem.haveRealVersion}}</td>
                    <!-- 是否收到实版 -->
                    <td>{{orderItem.hasReceive}}</td>
                    <!-- 颜色要求 -->
                    <td>{{orderItem.color}}</td>
                    <!-- 需求数量 -->
                    <td>{{orderItem.quantity}}</td>
                    <!-- 货号 -->
                    <td colspan="5" class="inner-wrap">
                      <table class="inner-table">
                        <tbody>
                          <tr v-for="(colorItem,colorIndex) in orderItem.colorList">
                            <td>{{colorItem.productNumber}}</td>
                            <td>{{colorItem.zyShopCompany}}</td>
                            <td style="text-align:left">{{colorItem.shopCompany}}</td>
                            <td style="text-align:left">
                              <el-tooltip class="item" effect="dark" :content="colorItem.shopTel" placement="top">
                                <p style="width:100%" class="ellipsis">{{colorItem.shopTel}}</p>
                              </el-tooltip>
                            </td>
                            <td style="text-align:left">
                              <el-tooltip class="item" effect="dark" :content="colorItem.shopFullAddr" placement="top">
                                <p style="width:100%" class="ellipsis">{{colorItem.shopFullAddr}}</p>
                              </el-tooltip>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <!-- 审核打分 -->
                    <td>{{orderItem.score}}</td>
                    <!-- 审核备注 -->
                    <td>{{orderItem.scoreRemark}}</td>
                    <!-- 审核时间 -->
                    <td>{{orderItem.scoreTime}}</td>
                    <!-- 销售员 -->
                    <td>{{orderItem.salesName}}</td>
                    <!-- 跟单员 -->
                    <td>{{orderItem.followerName}}</td>
                    <!-- 审核员 -->
                    <td>{{orderItem.auditorName}}</td>
                    <!-- 找版员 -->
                    <td>{{orderItem.clothHunterName}}</td>
                    <!-- 订单来源 -->
                    <td>{{orderItem.category}}</td>
                    <!-- 订单状态 -->
                    <td>{{orderItem.status}}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="sy-table-wrap" ref="tableWrap" style="display:none;">
        <el-table v-if="orderList" style="width: 100%" :height="height" border :resizable="false" :data="orderList">
          <el-table-column prop="needNumber" label="需求号" align="center" min-width="140">
          </el-table-column>
          <el-table-column prop="needCreateTime" label="发布时间" align="center" min-width="170">
          </el-table-column>
          <el-table-column prop="customerCompany" align="center" label="采购商名称" width="120">
          </el-table-column>
          <el-table-column align="center" :render-header="renderTableTh" width="2500" class="product-td" class-name="product-column">
            <template scope="scope">
              <ul class="product-table-wrap">
                <!-- <li v-for='(product, index) in scope.row.orderList' :class="['product-item',{'exception': product.priceUnit != product.colors[0].cutterPriceUnit}]"> -->
                <li v-for='(product, index) in scope.row.orderList' :class="['product-item',{'exception1': product.colorList[0].productNumber}]">
                  <div>
                    {{product.createTime }}
                  </div>
                  <div>
                    {{product.serviceNumber}}
                  </div>
                  <div>
                    {{product.productType}}
                  </div>
                  <div>
                    {{product.findType}}
                  </div>
                  <div>
                    {{product.motion}}
                  </div>
                  <div>
                    {{product.changeCard}}
                  </div>
                  <div>
                    {{product.title}}
                  </div>
                  <div>
                    {{product.worth}}
                  </div>
                  <div>
                    {{product.haveRealVersion}}
                  </div>
                  <div>
                    {{product.hasReceive}}
                  </div>
                  <div>
                    {{product.color}}
                  </div>
                  <div>
                    {{product.quantity}}
                  </div>
                  <div>
                    <ul>
                      <li v-for='(color, key_2) in product.colorList' class="color-item">
                        <span>{{color.productNumber}}</span>
                        <span>{{color.zyShopCompany}}</span>
                        <!-- <span :title="color.shopCompany">{{color.shopCompany}}</span> -->
                        <el-tooltip class="item" effect="dark" :content="color.shopCompany" placement="top">
                          <span>{{color.shopCompany}}</span>
                        </el-tooltip>
                        <span>{{color.shopTel}}</span>
                        <el-tooltip class="item" effect="dark" :content="color.shopFullAddr" placement="top">
                          <span>{{color.shopFullAddr}}</span>
                        </el-tooltip>
                      </li>
                    </ul>
                  </div>
                  <div>
                    {{product.score}}
                  </div>
                  <div>
                    {{product.scoreRemark}}
                  </div>
                  <div>
                    {{product.scoreTime}}
                  </div>
                  <div>
                    {{product.salesName}}
                  </div>
                  <div>
                    {{product.followerName}}
                  </div>
                  <div>
                    {{product.auditorName}}
                  </div>
                  <div>
                    {{product.clothHunterName}}
                  </div>
                  <div>
                    {{product.category}}
                  </div>
                  <div>
                    {{product.status}}
                  </div>
                  <div>
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="sy-pagination-wrap" ref="paginationWrap">
      <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :current-page="pagation.pageNumber" :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pagation.pageSize" layout="sizes, prev, pager, next, jumper" :total="pagation.totalCount">
      </el-pagination>
    </div>
    <el-dialog title="下载Excel" v-model="downExcel.isShow" size="tiny" :modal="false">
      <a :href="downExcel.path">
        <el-button @click="downExcel.isShow = false">下载</el-button>
      </a>
    </el-dialog>
  </section>
</template>
<script>
import getCache from '@/utils/getCache'
import request from '@/utils/request'
import getFindList from '@/api/find/getFindList'
import getCutClothList from '@/api/cut/getCutClothList'
import mixinFilters from '@/mixin/filters'
export default {
  name: 'findOrderList',
  data() {
    // let listStatus = this.$route.query.status || '-1'
    let timeEnd = new Date().toLocaleString().split(' ')
    let createTimeEnd = new Date(timeEnd[0] + ' 23:59:59')
    let createTimeBegin = new Date(+new Date(timeEnd[0]) - 1000 * 60 * 60 * 24 * 89)
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      loading: true,
      orderList: null,
      access: null,
      activeStatus: 0,
      filters: {
        pageSize: 20,
        pageNumber: 1,
        keyword: '',
        createTimeBegin: createTimeBegin,
        createTimeEnd: createTimeEnd,
        status: '',
        tag: 0,
        searchFlag: false
      },
      allNum: null,
      findingNum: null,
      expressingNum: null,
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1
      },
      height: 200,
      fullscreenLoading: false,
      selectionOrder: [],
      woodFollowAdmin: auth.woodFollowAdmin,
      woodFollowTeamLeader: auth.woodFollowTeamLeader,
      woodCutClothLeader: auth.woodCutClothLeader,
      woodFinance: auth.woodFinance,
      woodAdmin: auth.woodAdmin,
      dom: {
        tabsHeight: 0,
        paginationHeight: 0
      },
      updateCutter: {
        isShow: false,
        cutterList: null,
        currentCutter: '',
        waitUpdateData: null
      },
      downExcel: {
        isShow: false,
        path: ''
      }
    }
  },
  mixins: [mixinFilters],
  mounted() {
    this.getFindOrderList()
    window.addEventListener('resize', this.countHeight)
  },
  computed: {
    hasStatus210() {
      return this.woodFinance || this.woodAdmin || this.woodCutClothLeader
    },
    hasStatus211() {
      return this.woodFinance || this.woodAdmin || this.woodCutClothLeader
    },
    hasStatus220() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus221() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus222() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus223() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    hasStatus230() {
      return this.woodFollowAdmin || this.woodFollowTeamLeader || this.woodFinance || this.woodAdmin
    },
    canDownExcel() {
      return !(this.selectionOrder.length > 0 || (this.filters.createTimeBegin && this.filters.createTimeEnd))
    }
  },
  methods: {
    countHeight() {
      let windowHeiht = document.body.clientHeight
      let dom = this.dom
      dom.tabsHeight = this.dom.tabsHeight || parseFloat(getComputedStyle(this.$refs.tabsWrap, null).height)
      dom.paginationHeight = dom.paginationHeight || parseFloat(getComputedStyle(this.$refs.paginationWrap, null).height)
      this.height = parseFloat(windowHeiht - dom.tabsHeight - dom.paginationHeight - 61) // 61=头部高度 + 10
    },
    search() {
      this.searchFlag = true
      this.getFindOrderList()
    },
    getFindOrderList() {
      let params = JSON.parse(JSON.stringify(this.filters))
      console.log(params.tag);
      if (params.tag === 0) {
        params.tag = ''
      }
      if (params.tag === '') {
        params.createTimeBegin = ''
        params.createTimeEnd = ''
        params.status = ''
      }
      if ((!params.createTimeBegin || !params.createTimeEnd) && this.searchFlag) {
        this.$message.error('时间为必选项')
        return
      }
      if (params.createTimeBegin && params.createTimeBegin) {
        params.createTimeBegin = +new Date(params.createTimeBegin);
        params.createTimeEnd = +new Date(params.createTimeEnd);
        if (params.createTimeEnd - params.createTimeBegin > 1000 * 60 * 60 * 24 * 90) {
          this.$message.error('只能搜索九十天范围内进行搜索')
          return
        }
      }
      this.loading = true
      getFindList(params).then((response) => {
        this.loading = false
        if (response.success === '1') {
          this.allNum = response.count[0]
          this.findingNum = response.count[1]
          this.expressingNum = response.count[2]
          if (response.page) {
            convertData.call(this, response.page)
            this.$nextTick(() => {
              this.countHeight()
            })
          }
        }
      })

      function convertData(page) {
        this.pagation.pageNumber = page.pageNumber
        this.pagation.pageSize = page.pageSize
        this.pagation.totalCount = page.totalCount
        this.filters.pageSize = page.pageSize
        this.filters.pageNumber = page.pageNumber
        this.orderList = page.result
      }
    },
    getCutClothList() {
      if (this.updateCutter.cutterList) {
        return
      }
      getCutClothList().then(response => {
        if (response.success === '1') {
          this.$set(this.updateCutter, 'cutterList', response.page.result || [])
        }
      })
    },
    handleChangePagesize(size) {
      this.filters.pageSize = size
      this.getFindOrderList()
    },
    handleCurrentPageChange(currentPage) {
      this.filters.pageNumber = currentPage
      this.getFindOrderList()
    },
    handleTableSelectionChange(selection) {
      this.selectionOrder = selection
    },
    renderTableTh(h, { column, $index }) {
      const productWrapProps = { 'class': { 'product-table-wrap': true } }
      const productItemProps = { 'class': { 'product-item': true } }
      const colorItemProps = { 'class': { 'color-item': true } }
      const renderTree = createElementObj('div', productWrapProps, [
        createElementObj('div', productItemProps, [
          createElementObj('div', null, '订单时间'),
          createElementObj('div', null, '订单编号'),
          createElementObj('div', null, '品类'),
          createElementObj('div', null, '寻样要求'),
          createElementObj('div', null, '提案'),
          createElementObj('div', null, '换卡头'),
          createElementObj('div', null, '成分织法'),
          createElementObj('div', null, '档次'),
          createElementObj('div', null, '是否有实版'),
          createElementObj('div', null, '是否收到实版'),
          createElementObj('div', null, '颜色要求'),
          createElementObj('div', null, '需求数量'),
          createElementObj('div', null, [
            createElementObj('div', colorItemProps, [
              createElementObj('span', null, '货号'),
              createElementObj('span', null, '自营档口'),
              createElementObj('span', null, '档口名称'),
              createElementObj('span', null, '档口电话'),
              createElementObj('span', null, '档口地址')
            ])
          ]),
          createElementObj('div', null, '审核打分'),
          createElementObj('div', null, '审核备注'),
          createElementObj('div', null, '审核时间'),
          createElementObj('div', null, '销售员'),
          createElementObj('div', null, '跟单员'),
          createElementObj('div', null, '审核员'),
          createElementObj('div', null, '找版员'),
          createElementObj('div', null, '订单来源'),
          createElementObj('div', null, '订单状态')
        ])
      ])
      return renderElement(renderTree)

      function createElementObj(el, props, subEl) {
        return { el, props, subEl }
      }

      function renderElement(obj) {
        return h(obj.el, obj.props, typeof obj.subEl === 'object' ? obj.subEl.map(item => { return renderElement(item) }) : obj.subEl)
      }
    },
    resetForm(formName) {
      Object.assign(this.filters, {
        keyword: '',
        createTimeBegin: '',
        createTimeEnd: '',
        status: ''
      })
    },
    exportExcel() {
      let params = JSON.parse(JSON.stringify(this.filters))
      if (!params.createTimeBegin || !params.createTimeEnd) {
        this.$message.error('时间为必选项和结束时间')
        return
      }
      params.createTimeBegin = +new Date(params.createTimeBegin)
      params.createTimeEnd = +new Date(params.createTimeEnd)
      if (params.createTimeEnd - params.createTimeBegin > 1000 * 60 * 60 * 24 * 90) {
        this.$message.error('请选择90天范围内的数据进行导出')
        return
      }
      if (params.tag === '0') {
        params.tag = ''
      }
      this.loading = true
      request('/redwood/report/findColorCard/export', {
        method: 'GET',
        data: params
      }).then((response) => {
        this.loading = false
        if (response.success === '1') {
          window.open('http://www.soouya.com' + response.obj)
        } else {
          this.$message.error(response.msg)
        }
      })
    }
  }
}

</script>
<style lang="scss">
.product-table-wrap {
  display: table;
  border: 0;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

th.product-column {
  .color-item {
    border-top: 0;
  }
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}



.product-item {
  &:not(:first-child) {
    border-top: 1px solid #dfe6ec;
  }
  >div {
    float: left;
    margin-top: 6px;
    &:nth-child(1) {
      width: 170px;
      margin-left: 20px;
    }
    &:nth-child(2) {
      width: 100px;
    }
    &:nth-child(3) {
      width: 80px;
    }
    &:nth-child(4) {
      width: 120px;
    }
    &:nth-child(5) {
      width: 60px;
    }
    &:nth-child(6) {
      width: 50px;
    }
    &:nth-child(7) {
      width: 80px;
    }
    &:nth-child(8) {
      width: 70px;
    }
    &:nth-child(9) {
      width: 90px;
    }
    &:nth-child(10) {
      width: 100px;
    }
    &:nth-child(11) {
      width: 80px;
    }
    &:nth-child(12) {
      width: 70px;
    }
    &:nth-child(13) {
      width: 500px;
      margin-top: 0;
    }
    &:nth-child(14) {
      width: 80px;
    }
    &:nth-child(15) {
      width: 80px;
    }
    &:nth-child(16) {
      width: 150px;
    }
    &:nth-child(17) {
      width: 90px;
    }
    &:nth-child(18) {
      width: 80px;
    }
    &:nth-child(19) {
      width: 80px;
    }
    &:nth-child(20) {
      width: 80px;
    }
    &:nth-child(21) {
      width: 110px;
    }
    &:nth-child(22) {
      width: 100px;
    }
    &:nth-child(23) {
      width: 80px;
    }
  }
  &.exception1 {
    >div {
      display: inline-block;
      float: none;
      vertical-align: middle;
      &:nth-child(1) {
        width: 150px;
        margin-left: 0;
      }
      &:nth-child(2) {
        width: 100px;
      }
      &:nth-child(3) {
        width: 80px;
      }
      &:nth-child(4) {
        width: 120px;
      }
      &:nth-child(5) {
        width: 50px;
      }
      &:nth-child(6) {
        width: 50px;
      }
      &:nth-child(7) {
        width: 80px;
      }
      &:nth-child(8) {
        width: 70px;
      }
      &:nth-child(9) {
        width: 80px;
      }
      &:nth-child(10) {
        width: 100px;
      }
      &:nth-child(11) {
        width: 70px;
      }
      &:nth-child(12) {
        width: 70px;
      }
      &:nth-child(13) {
        width: 500px;
        margin-bottom: -25px;
      }
      &:nth-child(14) {
        width: 70px;
      }
      &:nth-child(15) {
        width: 80px;
      }
      &:nth-child(16) {
        width: 150px;
      }
      &:nth-child(17) {
        width: 80px;
      }
      &:nth-child(18) {
        width: 80px;
      }
      &:nth-child(19) {
        width: 80px;
      }
      &:nth-child(20) {
        width: 80px;
      }
      &:nth-child(21) {
        width: 100px;
      }
      &:nth-child(22) {
        width: 100px;
      }
      &:nth-child(23) {
        width: 80px;
      }
    }
  }
}

.color-item {
  display: flex;
  &:not(:first-child) {
    border-top: 1px solid #dfe6ec;
  }
  span {
    width: 25%;
    text-align: center;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

</style>
<style lang="scss" scoped>
.sy-cut-search {
  width: 380px;
}

.sy-page-wrap {
  font-size: 14px;
}

.el-table {
  .cell {
    padding: 0 5px;
  }
}

.sy-page-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sy-table-wrap {
  flex: 1;
}

.sy-pagination-wrap {
  flex: 0 0 50px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-export {
  position: absolute;
  right: 0;
  top: .3em;
}

.sy-update-cutter-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  footer {
    margin-top: 20px;
  }
}

.sy-current-cutter {
  color: #f00;
}

.table-wrap {
  overflow-x: auto;
}

.table {
  width: 4000px;
  >thead {
    >tr {
      >th {
        font-size: 14px;
        font-weight: normal;

        padding: 5px 10px;

        text-align: center;
        vertical-align: top;

        color: #333;
        border: 1px solid #ddd;
        border-bottom: none;
        background-color: #f9f9f9;
      }
    }
  }
  >tbody {
    >tr {
      td {
        font-size: 14px;

        padding: 5px 10px;

        text-align: center;

        color: #333;
        border: 1px solid #ddd;
        border-top: none;
        word-break: break-word;
        height: 45px;
      }
      &:hover {
        background-color: #fff;
      }
    }
  }
}

.inner-wrap {
  padding: 0 !important;
  .inner-table {
    width: 100%;
    height: 100%;
    tbody {
      tr {
        td {
          border: 0;
          border-right: 1px solid #ddd;
          &:last-child {
            border-right: none;
          }
        }
        border-bottom:1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

</style>
