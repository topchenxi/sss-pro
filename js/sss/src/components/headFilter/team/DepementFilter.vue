<template>
  <div>
    <el-cascader
      :options="options"
      v-model="department"
      @change="search">
  </el-cascader>
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
//        department: []
      }, this.param)
//      if (params.department) {
//        params.departmentId = params.department.id
//        delete params.department
//      }
      return {
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
        param: {
          handler: function (newValue, oldVal) {
            console.log('newValue.department', newValue.department)
            this.department = newValue.department
          },
          deep: true
        }
    },
    mounted() {
      console.log('this.department', this.params.department)
      this.department = this.params.department
      const deptmentOptionsList = getCache({ key: 'deptmentOptionsList' })
      if (deptmentOptionsList) {
        this.options = deptmentOptionsList
      } else {
        this.getList(); // 获取部门树
      }
//      this.getList();
    },
    methods: {
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
      search: function (event) {
          console.log(this.department[this.department.length - 1])
        const params = {
          departmentId: this.department[this.department.length - 1]
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
