<template>
  <section>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filters.keyword" name="keyword" placeholder="订单号/采购商"></el-input>
      </el-form-item>
      <el-button type="primary" @click="requestData">搜索</el-button>
    </el-form>
    <el-row>
      <el-col :span="12" class="follow-warp">
        <el-card class="box-card ongoing-card">
          <header>等我处理（{{taskList.length}}）</header>
          <ul class="sy-order-list" :style="{'max-height':`${height -40}px`}">
            <li v-for="(order,orderIdx) in taskList">
              <p>
                <span>订单号：{{order.serviceNumber}}</span>
                <span>下单时间：{{order.createTime | formatTime}}</span>
                <span>采购数量：{{order.colorQuantity}}色{{order.quantity + order.quantityUnit}}</span>
                <template v-if="userInfo.woodPurchaser">
                  <span>采购商：{{order.buyerCompany}}</span>
                  <span>供应商：{{order.shopCompany}}</span>
                </template>
                <template v-else-if="userInfo.woodFollowLeader">
                  <span>采购商：{{order.buyerCompany}}</span>
                </template>
                <el-button type="primary" size="mini" @click="offEnd(order.orderNumber)">不显示此订单</el-button>
              </p>
              <ul class="sy-order-process-list">
                <template v-if="order.dataType === 1">
                  <li>
                    <span>当前状态：{{order.statusDesc}}</span>
                    <span>上一责任人：{{renderHandlerRoleName(order.handlerRoleName,order.handlerName)}}</span>
                  </li>
                </template>
                <template v-else>
                  <li v-for="(task,taskIdx) in order.clothLoneTaskList">
                    <template v-if="String(task.status).length == 4">
                      <el-tooltip class="has-pihao" effect="dark" placement="top-start">
                        <div slot="content">
                          {{getPHDetails(task.clothLoneList)}}
                        </div>
                        <span>当前状态：{{task.statusDesc}}</span>
                      </el-tooltip>
                    </template>
                    <template v-else>
                      <span>当前状态：{{task.statusDesc}}</span>
                    </template>
                    <span>上一责任人：{{renderHandlerRoleName(task.handlerRoleName,task.handlerName)}}</span>
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="11" :push="1" class="not-end-wrap">
        <el-card class="box-card not-end-card" ref="notEnd">
          <header>未结束（{{notEndTask.totalCount}}）</header>
          <ul class="sy-order-list" :style="{'max-height':`${height - 40}px`}">
            <li v-for="(order,orderIdx) in notEndTask.result">
              <p>
                <span>订单号：{{order.serviceNumber}}</span>
                <template v-if="userInfo.woodPurchaser">
                  <span>供应商：{{order.shopCompany}}</span>
                </template>
                <template v-else-if="userInfo.woodFollowLeader">
                  <span>采购商：{{order.buyerCompany}}</span>
                </template>
              </p>
              <ul class="sy-order-process-list">
                <template v-if="order.dataType === 1">
                  <li>
                    <span>当前状态：{{order.statusDesc}}</span>
                    <span>当前责任人：{{renderHandlerRoleName(order.handlerRoleName,order.handlerName)}}</span>
                  </li>
                </template>
                <template v-else>
                  <li v-for="(task,taskIdx) in order.clothLoneTaskList">
                    <template v-if="String(task.status).length == 4">
                      <el-tooltip class="has-pihao" effect="dark" placement="top-end">
                        <div slot="content">
                          {{getPHDetails(task.clothLoneList)}}
                        </div>
                        <span>当前状态：{{task.statusDesc}}</span>
                      </el-tooltip>
                    </template>
                    <template v-else>
                      <span>当前状态：{{task.statusDesc}}</span>
                    </template>
                    <span>当前责任人：{{renderHandlerRoleName(task.handlerRoleName,task.handlerName)}}</span>
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { request } from 'utils/request'
export default {
  data() {
    let routeQuery = this.$route.query
    return {
      filters: {
        pageSize: 20,
        pageNumber: 1,
        keyword: routeQuery.keyword,
      },
      height: 600,
      taskList: [],
      notEndTask: {
        result: [],
        totalCount: 0
      },
      scrollData: {
        height: 0,
        scrollTop: 0,
        canNext: true,
        isLoad: false
      },
      userInfo: null
    }
  },
  mounted() {
    window.addEventListener('resize', this.countHeight)
    let currentInfo = JSON.parse(sessionStorage.getItem('currentUser'))
    this.userInfo = currentInfo ? currentInfo.loginInfo : null
    this.countHeight()
    this.requestData()
    this.handleScroll()
  },
  methods: {
    countHeight() {
      this.height = String(document.documentElement.clientHeight - 190)
    },
    handleScroll() {
      let targetDom = this.$refs.notEnd.$el.querySelector('.sy-order-list')
      targetDom.addEventListener('scroll', (e) => {
        if (this.scrollData.canNext) {
          this.scrollData.canNext = false
          if (this.scrollData.height - targetDom.scrollTop < (parseFloat(this.height) + 600) && this.scrollData.canLoad) {
            if (this.filters.pageNumber < Math.ceil(this.notEndTask.totalCount / this.filters.pageSize)) {
              this.filters.pageNumber++
              this.requestNotEndTask(true)
            }
          }
          setTimeout(() => {
            this.scrollData.canNext = true
          }, 100)
        }
      })
    },
    requestData() {
      Object.assign(this.filters, { pageSize: 20, pageNumber: 1 })
      request('/redwood/buyfollow/Order/listMyTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          keyword: this.filters.keyword
        }
      }).then(response => {
        this.$store.dispatch('changeload', false)
        if (response.success === '1') {
          this.taskList = response.result
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
      this.requestNotEndTask()
    },
    requestNotEndTask(add) {
      this.scrollData.canLoad = false
      request('/redwood/buyfollow/Order/listHandledTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.filters
      }).then(response => {
        this.scrollData.canLoad = true
        if (response.success === '1') {
          Object.assign(this.notEndTask, {
            totalCount: response.page.totalCount,
            result: add ? this.notEndTask.result.concat(response.page.result) : response.page.result
          })
          this.$nextTick(function () {
            this.scrollData.height = this.$refs.notEnd.$el.querySelector('.sy-order-list').scrollHeight
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
    },
    getPHDetails(clothLoneTaskList) {
      return clothLoneTaskList.map(item => {
        return `${item.color}/${item.number.substr(-2)}/${item.quantity + item.quantityUnit}`
      }).sort().join('、')
    },
    renderHandlerRoleName(handlerRoleName = '', handlerName = '') {
      return (handlerRoleName !== null ? handlerRoleName : '') + ' ' + ((handlerName !== null) ? handlerName : '')
    },
    offEnd(orderNumber) {
      let _time = +new Date()
      request('/redwood/buyfollow/Order/offEnd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
            orderNumber: orderNumber,
            _time
        }
      }).then(response => {
        this.requestData()
      })
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.countHeight)
  }
}
</script>
<style lang="scss">
.box-card {
  .el-card__body {
    padding: 0;
  }
  header {
    padding: 10px 20px;
    font-weight: bold;
    background: #fff;
    margin: 1px;
  }
}

.sy-order-list {
  font-size: 14px;
  overflow-y: auto;
  padding: 0 20px;
  >li {
    margin-bottom: 15px;
  }
  span {
    border-right: 1px solid #999;
    padding-right: 5px;
    margin-right: 5px;
    &:last-child {
      border-right: 0;
    }
  }
  .sy-order-process-list {
    margin-top: 10px;
  }
}

.ongoing-card {
  .sy-order-process-list {
    border: 1px solid #999;
    border-radius: 5px;
    padding: 10px;
  }
}

.sy-order-process-list {
  li {
    margin: 10px 0;
  }
}

.not-end-card {
  background: #fafafa;
  .sy-order-list {
    >li {
      border-bottom: 1px dotted #999;
    }
  }
}

.has-pihao {
  color: #0849e2;
  cursor: pointer;
}

.follow-warp {
  position: relative;
}
</style>
