<template>
  <el-dialog v-model="config.isShow" title="选择供应商">
    <el-row type="flex" style="margin-bottom:30px;">
      <el-col :span="10">
        <el-input v-model="filters.keyword"></el-input>
      </el-col>
      <el-col style="text-align:left" :push="1">
        <el-button type="primary" @click="getShopAddress">搜索</el-button>
        <el-button @click="filters.keyword = ''">重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="addressList" border>
      <el-table-column label="供应商ID" prop="sellerNumber">
        <template scope="scope">
          <i class="el-icon-circle-check" style="color:green;"></i>{{scope.row.sellerNumber}}
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="sellerCompany"></el-table-column>
      <el-table-column label="档口名称" prop="company"></el-table-column>
      <el-table-column label="店铺电话" prop="tel"></el-table-column>
      <el-table-column label="所在地区">
        <template scope="scope">
          {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}
        </template>
      </el-table-column>
      <el-table-column label="详细地址" prop="addr"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="mini" @click="setShopAddress(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px" @current-change="handleCurrentChange" :current-page="pagination.pageNumber" :page-size="pagination.pageSize" layout="->,total,prev, pager, next, jumper" :total="pagination.totalCount">
    </el-pagination>
  </el-dialog>
</template>

<script>
import { request } from 'src/common/utils.js'

export default {
  props: ['config'],
  data() {
    return {
      addressList: [],
      filters: {
        keyword: ''
      },
      pagination: {
        pageNumber: 1,
        pageSize: 5,
        totalCount: 0
      }
    }
  },
  mounted() {
    this.getShopAddress()
  },
  methods: {
    getShopAddress() {
      request({
        url: '/redwood/sys/Shop/list',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
          pageSize: this.pagination.pageSize,
          pageNumber: this.pagination.pageNumber,
          keyword: this.filters.keyword
        })
      }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.addressList = response.page.result
          Object.assign(this.pagination, {
            pageNumber: response.page.pageNumber,
            pageSize: response.page.pageSize,
            totalCount: response.page.totalCount,
          })
        }
      })
    },
    handleCurrentChange(page) {
      this.pagination.pageNumber = page;
      this.getShopAddress()
    },
    setShopAddress(data) {
      this.$emit('selectedAddress', data)
      this.config.isShow = false
    },
    getParam(obj) {
      let result = {}
      for (let key of Object.keys(obj)) {
        if (obj[key] !== '') {
          result[key] = obj[key]
        }
      }
      return result
    }
  }
}
</script>

<style>

</style>
