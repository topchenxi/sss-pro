<template>
  <div class="buyerSeller-list">
    <el-dialog :title="`选择${sendinfo.name == 0 ? '采购商': '供应商'}`" v-model="$store.state.b.popLoad" custom-class="pop-table-wrap" :lock-scroll="true" :close-on-click-modal="false" @close="close">
      <div class="y_table">
        <fliter :category="{name: 'buyerAndSeller', index: sendinfo.name }" :params="filters" @getParams="search" />
        <div>
          <div class="y_table_wrap">
            <!-- 采购商 -->
            <el-table :data="result" :resizable="false" width="800" height="500" v-if="sendinfo.name == 0">
              <el-table-column prop="number" align="center" label="采购商ID">
              </el-table-column>
              <el-table-column align="center" label="用户名" width="120">
                <template scope="scope">
                  {{scope.row.userName}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" label="注册手机号">
                <template scope="scope">
                  {{scope.row.mobilePhone}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="120" label="联系电话">
                <template scope="scope">
                  {{scope.row.tel}}
                </template>
              </el-table-column>
              <el-table-column align="center" width="120" label="公司名称">
                <template scope="scope">
                  {{scope.row.company}}
                </template>
              </el-table-column>
              <el-table-column inline-template align="center" label="操作">
                <div class="operate-btn">
                  <el-button class="o-btn" size="small" type="primary" @click.native="goDetail(row)">选择</el-button>
                </div>
              </el-table-column>
            </el-table>
            <!-- 供应商 -->
            <el-table :data="result" :resizable="false" width="800" height="500" v-if="sendinfo.name == 1">
              <el-table-column align="center" label="供应商ID">
                <template scope="scope">
                  <!-- <span class="certify" style="margin-right: 5px;">(认证)</span><span>{{scope.row.sellerNumber}}</span> -->
                  <i class="el-icon-circle-check green"></i>{{scope.row.sellerNumber}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="店铺名称" width="120">
                <template scope="scope">
                  {{scope.row.sellerCompany}}
                </template>
              </el-table-column>
              <el-table-column prop="shopCompany" align="center" width="120" label="档口名称">
                <template scope="scope">
                  {{scope.row.company}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="店铺电话" width="120">
                <template scope="scope">
                  {{scope.row.tel}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="所在地区" width="120">
                <template scope="scope">
                  {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="详细地址" width="120">
                <template scope="scope">
                  {{scope.row.addr}}
                </template>
              </el-table-column>
  
              <el-table-column inline-template align="center" label="操作">
                <div class="operate-btn">
                  <el-button class="o-btn" size="small" type="primary" @click.native="goDetail(row)">选择</el-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div class="bottom">
            <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import {
  request,
  // setCache,
  formatTimeString
} from 'utils/tool'
import Api from 'api/allApi'
export default {
  props: {
    sendinfo: {
      type: Object,
      required: false,
      randKey: 0,
      default: function (a) {
        return {}
      },
    }
  },
  components: {
    Fliter,
    Pagination
  },
  data() {
    return {
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      dialogTableVisible: false,
      filters: {
        pageSize: 20,
        pageNumber: 1
      },
      height: 500,
      result: []
    }
  },
  updated() {
  },
  mounted() {
    this.reqList()
  },
  methods: {
    close() {
      this.$store.dispatch('changePopLoad', false)
    },
    search(params) {
      this.filters.pageNumber = '1'
      this.filters = Object.assign(this.filters, params)
      this.reqList()
    },
    reqList(req = {}) {
      this.$store.dispatch('changeload', true)
      this.filters = Object.assign({}, this.filters, req)
      const reqs = {}
      for (const key of Object.keys(this.filters)) {
        if (this.filters[key]) {
          reqs[key] = this.filters[key]
        }
      }
      console.log(reqs)
      request({
        url: this.sendinfo.name == 0 ? Api.Sys.Buyer_select : Api.Sys.Shop_list,
        data: this.sendinfo.name == 0 ? { param: JSON.stringify(reqs) } : JSON.stringify(reqs),
        // data: JSON.stringify(reqs),
        contentType: this.sendinfo.name == 0 ? 'application/x-www-form-urlencoded' : 'application/json',
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          console.log('res', res)
          if (res.page) {
            this.convertData(res.page)
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
    convertData(page) {
      this.pagation.pageNumber = page.pageNumber
      this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      this.filters.pageSize = page.pageSize
      this.filters.pageNumber = page.pageNumber
      page.result.map((item) => {
        item.createTime = formatTimeString(item.createTime)
      })
      this.result = page.result
    },
    goDetail(row) {
      this.$store.dispatch('changePopLoad', false)
      console.log('dddd', row);
      this.$emit('getInfo', row)
    }
  }
}
</script>
<style lang="scss">
.pop-table-wrap {
  min-width: 800px;
  z-index: 999;
  .y_table {
    clear: both;
    min-width: 640px;

    .green {
      color: green;
    }
  }
  .y_table_wrap {
    td.is-center {
      text-align: center;
      border-right: 1px solid #ddd;
    }
    th.is-center {
      text-align: center;
    }
    .el-table td .cell {
      padding: 5px 0 0;
      line-height: 1.5;
      display: inline-block;
    }
    position: relative;
  }
  .bottom {
    text-align: right;
    background: #fff;
    padding: 10px;
  }
  .operate-btn {
    text-align: center;
    .o-btn {
      width: 60px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
