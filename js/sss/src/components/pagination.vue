<template>
	<div>
	<el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-size="pagesize"
    layout="->,total, sizes, prev, pager, next"
    :total="total">
  </el-pagination>
</div>
</template>

<style lang="scss">
</style>

<script type="text/javascript">
export default {
  props: ['page', 'total', 'render', 'options', 'pagesize'],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
   handleSizeChange (val) {
				 console.log('val', val)
					console.log('options', this.options)
    	this.options.pageSize = val
     this.options.pageNumber = '1'
    	this.render()
  	},
  	handleCurrentChange (val) {
  		this.options.pageNumber = val
    	this.render()
  	}
  }
}
</script>
