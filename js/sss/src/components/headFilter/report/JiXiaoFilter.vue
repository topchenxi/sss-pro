<template>
  <div class="search-wrap">
    <div class="item">
      <span class="demonstration">出仓单时间：</span>
      <el-date-picker v-model="params.createTimeBegin" type="datetime" size="small" placeholder="开始时间">
      </el-date-picker>
      至
      <el-date-picker v-model="params.createTimeEnd" type="datetime" size="small" placeholder="结束时间">
      </el-date-picker>
    </div>
    <div class="item" v-if="!param.currentTab || param.currentTab == 1">
      <el-select v-model="params.followerId" placeholder="请选择跟单员">
        <el-option lable="全部跟单员" value="全部跟单员"></el-option>
        <el-option v-for="seed in allGenDanYuan" :label="seed.realName" :value="seed.id"></el-option>
      </el-select>
    </div>
    <div class="item">
      <el-select v-model="params.purchaserId" placeholder="请选择买货员">
        <el-option lable="全部买货员" value="全部买货员">全部买货员</el-option>
        <el-option v-for="seed in allCaiGouYuan" :label="seed.realName" :value="seed.id"></el-option>
      </el-select>
    </div>
    <div class="item" v-if="!param.currentTab || param.currentTab == 1">
      <el-select v-model="params.xiaoShouId" placeholder="请选择销售员">
        <el-option v-for="seed in allXiaoShou" :label="seed.realName" :value="seed.id"></el-option>
      </el-select>
    </div>
    <div class="item" v-if="!param.currentTab || param.currentTab == 1">
      <el-select v-model="params.sortColumns" placeholder="请选择排序方式">
        <el-option label="按采购数量大小倒序" value="outReposityQuantity"></el-option>
        <el-option label="按成本货款大小倒序" value="outReposityCostMoney"></el-option>
      </el-select>
    </div>
    <div class="item" v-if="!param.currentTab || param.currentTab == 1">
      <el-input placeholder="订单号/采购商/供应商" v-model="params.keyword">
      </el-input>
    </div>
    <el-button class="btn-search" @click.prevent="search">搜索</el-button>
  </div>
</template>
<style lang="sass">


</style>
<script>
import {
  request,
  getCache,
  setCache
} from 'common/utils'
import ReportApi from 'api/report'
import { Message } from 'element-ui'
export default {
  props: {
    param: {
      type: Object,
      required: false,
      default: function(a) {
        return {}
      },
    }
  },
  data() {
    const params = Object.assign({
      keyword: '',
      allGenDanYuan: [],
      allCaiGouYuan: [],
      followerId: '',
      purchaserId: '',
      xiaoShouId: '',
      status: '',
      sortColumns: ''
    }, this.param)
    if (params.createTimeBegin) {
      params.createTimeBegin = new Date(params.createTimeBegin)
    }
    if (params.createTimeEnd) {
      params.createTimeEnd = new Date(params.createTimeEnd)
    }
    if (params.department) {
      params.departmentId = params.department.id
      delete params.department
    }
    return {
      allGenDanYuan: [],
      allCaiGouYuan: [],
      allXiaoShou: [],
      fullscreenLoading: false,
      params: params
    };
  },
  watch: {
    currentTab(val) {},
    param(newValue, oldValue) {
      console.log(newValue.currentTab, oldValue.currentTab)
      if (newValue.currentTab) {
        if (newValue.currentTab !== oldValue.currentTab) {
          this.params.keyword = ''
          this.params.createTimeBegin = ''
          this.params.createTimeEnd = ''
          this.params.followerId = ''
          this.params.purchaserId = ''
          this.params.status = ''
          this.params.sortColumns = ''
        }
      }
    }
  },
  mounted() {
    this.getAllXiaoShou()
    const allGenDanYuan = getCache({ key: 'allGenDanYuan' })
    if (allGenDanYuan) {
      this.allGenDanYuan = allGenDanYuan
    } else {
      this.getFollowerList()
    }
    const allCaiGouYuan = getCache({ key: 'allCaiGouYuan' })
    if (allCaiGouYuan) {
      this.allCaiGouYuan = allCaiGouYuan
    } else {
      this.getCaiGouYuanList()
    }
    this.keyCodeBind()
  },
  methods: {
    keyCodeBind() {
      const that = this
      document.addEventListener('keydown', (event) => {
        if (event.keyCode == '13') {
          that.search()
        }
      })
    },
    handleChange(value) {
      console.log(value);
    },
    getFollowerList() {
      this.fullscreenLoading = true;
      request({
        url: ReportApi.JiXiao.listFollower4OMS,
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          setCache({
            key: 'allGenDanYuan',
            value: data.result
          })
          this.allGenDanYuan = data.result;
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getCaiGouYuanList() {
      this.fullscreenLoading = true;
      request({
        url: ReportApi.JiXiao.listPurchaser4OMS,
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          setCache({
            key: 'allCaiGouYuan',
            value: data.result
          })
          this.allCaiGouYuan = data.result;
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getAllXiaoShou() {
      this.fullscreenLoading = true;
      request({
        url: ReportApi.JiXiao.listXiaoShou4OMS,
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.allXiaoShou = data.result;
          this.allXiaoShou.unshift({ id: '-1', realName: '全部销售员' })
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    search: function(event) {
      let followerIdList = []
      let followerId = this.params.followerId;
      if (followerId) {
        followerIdList.push(followerId)
      }
      if (followerId === '全部跟单员') {
        for (const i in this.allGenDanYuan) {
          followerIdList.push(this.allGenDanYuan[i].id)
        }
      }
      let purchaserIdList = []
      let purchaserId = this.params.purchaserId;
      if (purchaserId) {
        purchaserIdList.push(purchaserId)
      }
      if (purchaserId === '全部买货员') {
        for (const i in this.allCaiGouYuan) {
          purchaserIdList.push(this.allCaiGouYuan[i].id)
        }
      }
      let xiaoShouIdList = []
      let salesId = this.params.xiaoShouId;
      if (salesId) {
        xiaoShouIdList.push(salesId)
      }
      if (salesId === '-1') {
        for (const i in this.allXiaoShou) {
          xiaoShouIdList.push(this.allXiaoShou[i].id)
        }
      }
      const params = {
        keyword: this.params.keyword,
        departmentId: this.params.departmentId,
        createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
        createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
        //          followerId: followerId,
        //          purchaserId: purchaserId,
        //          salesId: salesId,
        status: '',
        sortColumns: this.params.sortColumns,
        currentTab: this.param.currentTab,
        followerIdList: followerIdList,
        purchaserIdList: purchaserIdList,
        xiaoShouIdList: xiaoShouIdList
      }
      for (const i in params) {
        if (!params[i]) {
          delete params[i]
        }
      }
      this.$emit('getParams', params)
    }
  }
};

</script>
