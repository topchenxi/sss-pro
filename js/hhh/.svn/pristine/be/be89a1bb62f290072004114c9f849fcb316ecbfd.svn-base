<template>
  <section>
    <el-row>
      <el-col>
        <el-input placeholder="采购商ID，公司名称" size="small" style="width:250px;" v-model="key" @keyup.enter.native="getData"></el-input>
      </el-col>
    </el-row>
    <el-table :data="result">
      <el-table-column prop="number" label="采购商ID"></el-table-column>
      <el-table-column prop="company" label="公司名称"></el-table-column>
      <el-table-column prop="hasOpenedBaitiao" label="是否开通白条">
        <template scope="scope">
          <template v-if="scope.row.hasOpenedBaitiao == 1">已开通</template>
          <template v-else>未开通</template>
        </template>
      </el-table-column>
      <el-table-column prop="availableBalance" label="可用余额">
        <template scope="scope">
          <template v-if="scope.row.availableBalance >= 0">{{scope.row.availableBalance}}元</template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column prop="baitiaoRemainLine" label="可用徙木额度">
        <template scope="scope">
          <template v-if="scope.row.hasOpenedBaitiao == 1">{{scope.row.baitiaoRemainLine}}元</template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column prop="remainLine" label="可用搜芽额度">
        <template scope="scope">
          <template v-if="scope.row.remainLine >= 0">{{scope.row.remainLine}}元</template>
          <template v-else>--</template>
        </template>
      </el-table-column>

    </el-table>
    <div class="sy-pagination-wrap" ref="paginationWrap">
      <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :current-page="pagation.pageNumber" :page-sizes="[20]" :page-size="pagation.pageSize" layout="sizes, prev, pager, next, jumper" :total="pagation.totalCount">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { request } from 'utils/tool'
export default {
  data() {
    return {
      key: '',
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1
      },
      result: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleChangePagesize(size) {
      this.pagation.pageSize = size
      this.getData()
    },
    handleCurrentPageChange(currentPage) {
      this.pagation.pageNumber = currentPage
      this.getData()
    },
    getData() {
      request({
        url: '/redwood/follower/customerAccount',
        method: 'get',
        data: Object.assign(this.pagation, {key: this.key})
      }).then(response => {
        this.$store.dispatch('changeload', false)
        if (this.requestIsSuccess(response)) {
          this.result = response.page.result
          this.pagation.pageNumber = response.page.pageNumber
          this.pagation.pageSize = response.page.pageSize
          this.pagation.totalCount = response.page.totalCount
        }
      })
    }
  }
}
</script>

