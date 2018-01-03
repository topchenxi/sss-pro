<template>
	<el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-sizes="[20, 50, 100]"
    :page-size="20"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<style lang="scss">
	.el-pagination {
		margin-top: 15px;
    float: right;
		.number {
			border-radius: initial;
		}
	}
</style>

<script type="text/javascript">
export default {
  props: ['page', 'total', 'render', 'options'],
  data () {
    return {
    }
  },
  created () {
    // console.log(1)
  },
		mounted () {
				console.log('pageNumber', this.page)
		},
		update () {
				console.log('pageNumber222', this.page)
		},
  methods: {
    handleSizeChange (val) {
    	this.options.pageSize = val
    	this.render()
  	},
  	handleCurrentChange (val) {
  		 this.options.pageNumber = val
					console.log('当前页触发', this.options)
    	this.render()
					console.log('page', this.page)
  	}
  }
}
</script>
