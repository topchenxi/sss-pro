<template>
  <div>
      <section>
            <el-row :gutter="20" style="margin-bottom:20px">
          <el-col style="width:320px;">
            <el-input placeholder="订单号，采购商名称，销售员，找版员，剪版员" size="small" v-model="filters.keyword">
            </el-input>
          </el-col>
          <el-col style="width:400px;">
            <el-row>
              <el-button type="primary" size="small" @click.native="reqList" class="btn-search">
                搜索(enter)
              </el-button>
            </el-row>
          </el-col>
        </el-row>
          </section>
    <div v-if="result.length > 0" class="data">
      <el-radio-group>
        <div v-for="(customer, index) in result">
          <p class="notify-title">
            <div>
              <label style="padding-left: 5px">采购商：{{customer.customerCompany}}</label>
            </div>
          </p>
          <div class="y_table_wrap mb">
            <el-table stripe :data="customer.orderList" border style="width: 100%" :max-height="300">
              <el-table-column align="center" min-width="120" label="订单编号">
                <template scope="scope">
                  {{scope.row.serviceNumber}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="160" label="订单时间">
                <template scope="scope">
                  {{scope.row.createTime | formatTime}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="160" label="收货人信息">
                <template scope="scope">
                  {{scope.row.addressName}} {{scope.row.addressTel}}
                  <br/> {{scope.row.addressProvince}}{{scope.row.addressCity}}{{scope.row.addressArea}}{{scope.row.addressAddr}}
                </template>
              </el-table-column>
              <el-table-column prop="salesName" label="销售员" min-width="80"></el-table-column>
              <el-table-column prop="guiderName" label="采购员" min-width="80"></el-table-column>
              <el-table-column prop="userName" label="剪版员/找版员" min-width="120"></el-table-column>
              <el-table-column align="center" width="100" label="订单类型">
                <template scope="scope">
                  <span v-if="scope.row.category == 'zb-zy'">找版</span>
                  <span v-if="scope.row.category == 'jb-zy'">剪版</span>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" min-width="100">
                <template scope="scope">
                  <span v-if="scope.row.status == '101'">待通知找版</span>
                  <span v-if="scope.row.status == '103'">待指派组长</span>
                  <span v-if="scope.row.status == '105'">待分配任务</span>
                  <span v-if="scope.row.status == '111'">待录入色卡信息</span>
                  <span v-if="scope.row.status == '115'">待提交审核</span>
                  <span v-if="scope.row.status == '121'">待审核</span>
                  <span v-if="scope.row.status == '500'">待录入剪版信息</span>
                  <span v-if="scope.row.status == '501'">待通知提货</span>
                  <span v-if="scope.row.status == '502'">待提货</span>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </div>
    </el-radio-group>
    </div>
    <div style="border:1px solid #999;text-align:center;height:200px; line-height:200px;" v-else>
      暂无数据
    </div>
    <div class="bottom">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" :page-sizes="20" layout="total, prev, pager, next"/>
    </div>

  </div>
</template>
<script>
import Pagination from 'components/pagination'
import {
  formatTimeString,
  newRequest
}
  from 'utils/tool'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      filters: {
        pageSize: 20,
        pageNumber: 1,
        keyword: ''
      },
      result: []
    }
  },
  mounted() {
    this.reqList()
  },
  filters: {
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  methods: {
    reqList() {
      this.$store.dispatch('changeload', false)
      newRequest({
        url: '/redwood/onWay/list',
        method: 'get',
        data: this.filters
      }).then(response => {
        if (response.success !== '1') {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        }
        var page = response.page
        this.count = response.count
        this.pagation.pageNumber = page.pageNumber
        this.pagation.pageSize = page.pageSize
        this.pagation.totalCount = page.totalCount
        this.filters.pageSize = page.pageSize
        this.filters.pageNumber = page.pageNumber
        this.result = page.result
      })
    }
  }
}
</script>

<style lang="scss">
.input-lg {
  width: 200px;
  height: 30px;
}

.input-md {
  width: 150px;
  input {
    height: 30px;
  }
}

.input-sm {
  width: 80px;
  height: 30px;
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

.el-radio-group {
  display: block;
  font-size: 14px;
}
.data {
  min-height: 800px;
}
</style>
