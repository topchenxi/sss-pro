<template>
  <div class="search-wrap">
    <div class="item" v-if="currentTab != 2">
      <span>创建时间：</span>
      <el-date-picker v-model="params.createTimeBegin" type="datetime" placeholder="开始时间">
      </el-date-picker>
      至
      <el-date-picker v-model="params.createTimeEnd" type="datetime" placeholder="结束时间">
      </el-date-picker>
    </div>
    <div class="item">
      <el-input class="w300" placeholder="人员姓名/手机号/登录账号" v-model="params.keyword">
      </el-input>
    </div>
    <div class="item">
      <span>部门：</span>
      <el-cascader :options="options" v-model="department" @change="handleChange">
      </el-cascader>
    </div>
    <el-button class="btn-search" @click.native="search">搜索</el-button>
    <!--     <span v-if="currentTab != 2">
      <span class="demonstration">创建时间：</span>
    <el-date-picker v-model="params.createTimeBegin" type="datetime" placeholder="开始时间">
    </el-date-picker>
    至
    <el-date-picker v-model="params.createTimeEnd" type="datetime" placeholder="结束时间">
    </el-date-picker>
    </span>
    <span class="demonstration" style="margin-left: 10px">部门：</span>
    <span class="team-head">
    <el-cascader
      :options="options"
      v-model="department"
      @change="handleChange">
  </el-cascader>
  </span> -->
  </div>
</template>
<style lang="sass">
/*.team-head{*/


/*}*/

</style>
<script>
import {
  request,
  //    formatTimeString,
  getCache,
  setCache
} from 'common/utils'
import UserApi from 'api/user'
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
      createTimeBegin: '',
      createTimeEnd: '',
      keyword: '',
      department: []
    }, this.param)
    if (params.createTimeBegin) {
      params.createTimeBegin = new Date(params.createTimeBegin)
    }
    if (params.createTimeEnd) {
      params.createTimeEnd = new Date(params.createTimeEnd)
    }
    //      if (params.department) {
    //        params.departmentId = params.department.id
    //        delete params.department
    //      }
    return {
      createTimeBegin: '',
      createTimeEnd: '',
      keyword: '',
      department: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }],
      currentTab: '',
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
          this.department = []
        }
      }
    }
  },
  mounted() {
    const deptmentOptionsList = getCache({ key: 'deptmentOptionsList' })
    if (deptmentOptionsList) {
      this.options = deptmentOptionsList
    } else {
      this.getList(); // 获取部门树
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
    replace(data) {
      data.forEach((value) => {
        value.value = value.id
        delete value.id
        delete value.level
        if (value.children) {
          this.replace(value.children)
        }
      })
    },
    /**
     * 获取部门树
     * @params this.filters
     */
    getList() {
      this.fullscreenLoading = true;
      request({
        url: UserApi.User.departmentTree,
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.replace(data.list)
          setCache({
            key: 'deptmentOptionsList',
            value: data.list
          })
          this.options = data.list;
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    search: function(event) {
      //        if (this.timeRange) {
      //          this.params.createTimeBegin = this.timeRange[0]
      //          this.params.createTimeEnd = this.timeRange[1]
      //        }
      const params = {
        keyword: this.params.keyword,
        departmentId: this.department[this.department.length - 1],
        createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
        createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
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
