<template>
  <div class="oms-content">
    <el-dialog :title="'选择采购商'" v-model="status" custom-class="pop-table-wrap" :lock-scroll="true" :close-on-click-modal="false" @close="closeDialog" :size="tiny">
      <div class="search-content p0 m0 mb20">
        <div class="row">
          <div class="item w360 ml0">
            <el-input placeholder="采购商公司名称" v-model="filters.key"></el-input>
          </div>
          <el-button @click.native="search">搜索</el-button>
        </div>
      </div>
      <div class="main-wrap p0 m0 bsn mb20">
        <div class="main-content">
          <div class="table-wrap">
            <table class="table">
              <colgroup>
                <col width="50%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th>采购商</th>
                  <th>联系方式</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in result" :key="index" v-if="item">
                  <td class="ta-l">{{item.company}} </td>
                  <td class="ta-l">{{item.tel}}</td>
                  <td>
                    <el-button class="table-btn" @click.native="goDetail(item)">选择</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  request
} from 'utils/tool'
export default {
  props: {
    salerId: {
      type: String,
      required: true,
      default: function(a) {
        return ''
      }
    },
    showFlag: false,
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
        salerId: this.salerId,
        key: ''
      },
      height: 500,
      result: [],
      status: this.showFlag
    }
  },
  watch: {
    showFlag(val) {
      this.status = val
    }
  },
  updated() {},
  mounted() {
    this.reqList()
  },
  methods: {
    closeDialog() {
      this.$emit('closeMember');
    },
    search() {
      this.reqList();
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
      request({
        url: '/soouya/ziying/customer',
        data: reqs,
        contentType: 'application/x-www-form-urlencoded',
        method: 'get'
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
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
      this.result = page.result
    },
    goDetail(row) {
      this.$emit('getInfo', row)
    }
  }
}

</script>
<style lang="scss" scoped>
.table>tbody>tr>td {
  padding: 5px 10px;
}

</style>
