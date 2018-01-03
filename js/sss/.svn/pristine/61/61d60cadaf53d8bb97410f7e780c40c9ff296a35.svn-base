<template>
  <div class="page-wrap">
    <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :current-page="params.pageNumber" :page-sizes="pageSizeArray" :page-size="params.pageSize" :layout="layout" :total="total"> </el-pagination>
  </div>
</template>
<script>
const defaultParams = {
  'pageNumber': 1,
  'pageSize': 10
};
export default {
  props: {
    params: {
      'type': Object,
      'required': false,
      'default': () => defaultParams
    },
    pageSizeArray: {
      'type': Array,
      'default': () => [10, 20, 30, 50, 100],
      'required': false
    },
    total: {
      'type': Number,
      'required': false,
      'default': 0
    },
    layout: {
      'type': String,
      'default': 'total, sizes, prev, pager, next, jumper',
      'required': false
    }
  },
  data() {
    return {}
  },
  methods: {
    getList() {
      this.$emit('toSearch');
    },
    handleChangePagesize(size) {
      this.params.pageNumber = 1;
      this.params.pageSize = size;
      this.getList();
    },
    handleCurrentPageChange(currentPage) {
      this.params.pageNumber = currentPage;
      this.getList();
    }
  }
}

</script>
