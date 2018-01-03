<template>
  <div v-loading.body="fullscreenLoading">
     <div class="oms-title-wrap">
      <h2>角色管理</h2>
    </div>
  <div class="containter p20" :style="{ height : windowHeight - 160 + 'px'}">
    <el-tree :data="data2" :props="defaultProps" :render-content="renderContent" node-key="id"
             default-expand-all></el-tree>
  </div>

  </div>
</template>
<style lang="scss">
  .el-tree {
    padding: 10px;
  }
</style>
<script>
  import {
    request,
    getCache,
    setCache
  } from 'common/utils'
  import UserApi from 'api/user'
  import { Message } from 'element-ui'
  export default {
    data() {
      return {
        fullscreenLoading: false,
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
      const deptmentOptionsListForRole = getCache({ key: 'deptmentOptionsListForRole' })
      if (deptmentOptionsListForRole) {
        // this.data2 = deptmentOptionsListForRole;
        // console.log(this.data2);
        this.getList()
      } else {
        this.getList()
      }
    },
    methods: {
      append (node, store, data) {
        if (node.level === 3) {
          return Message({
            message: '3级部门不能再新增下级部门！',
            type: 'error',
            duration: 1000
          })
        }
        this.$prompt('请输入新增部门名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.addDepartment(data.id, value, node.level + 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
//        if (!data.children) {
//          data.children = []
//        }
//        const newNode = {}
//        data.children.push({ id: id++, label: 'testtest', children: null })
      },
      remove (node, store, data) {
        if (node.level === 1) {
          return Message({
            message: '一级部门不能删除！',
            type: 'error',
            duration: 1000
          })
        }
        if (data.children) {
          return Message({
            message: '该部门有下级部门，不能删除！',
            type: 'error',
            duration: 1000
          })
        }
        this.$confirm('请确认是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.deleteDepartment(data.id)
        }).catch(() => {

        });
      },
      update (node, store, data) {
        console.log(node, data, store)
          if (node.level === 1) {
            return Message({
              message: '一级部门不能改名！',
              type: 'error',
              duration: 1000
            })
          }
        this.$prompt('确认修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: data.label
        }).then(({ value }) => {
          if (!!value && !!value.trim()) {
            // 改服务端的数据
            this.updateDepartment(data.id, value, data)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      renderContent (h, { node, data, store }) {
          if (node.level === 3) {
              return (
              <div class="cleafix" style="display:inline-block">
              <span class="mr20 mw200">{node.label}</span>
              <span class="mr10 icon icon-editor" on-click={ () => this.update(node, store, data) } name="update"></span>
              <span class="icon icon-delete" on-click={ () => this.remove(node, store, data) } type="danger" name="delete"></span>
              </div>)
          } else {
            return (
              <span>
              <span>{node.label}</span>
              </span>)
          }
       },
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
            setCache({
              key: 'deptmentOptionsListForRole',
              value: data.list
            })
            this.data2 = data.list;
            console.table(data.list)
          } else {
            Message({
              message: '请求数据失败,请手动刷新！',
              type: 'error',
              duration: 1000
            })
          }
        })
      },
      updateDepartment(id, name, nodeData) {
        const params = {
          id: id,
          name: name
        }
        this.fullscreenLoading = true;
        request({
          url: UserApi.User.updateDepartment,
          method: 'post',
          data: {
            param: JSON.stringify(params)
          }
        }).then(data => {
          this.fullscreenLoading = false;
          if (data.success === '1') {
            this.$message({
              type: 'success',
              message: '修改成功！ '
            });
            nodeData.label = name
          } else {
            this.$message({
            type: 'error',
              message: '修改失败！ '
          });
          }
        })
      },
      addDepartment(id, name, level) {
        const params = {
          pid: id,
          name: name,
          level: level
        }
        this.fullscreenLoading = true;
        request({
          url: UserApi.User.addDepartment,
          method: 'post',
          data: {
            param: JSON.stringify(params)
          }
        }).then(data => {
          this.fullscreenLoading = false;
          if (data.success === '1') {
            this.$message({
              type: 'success',
              message: '添加成功！ '
            });
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败！ '
            });
          }
        })
      },
      deleteDepartment(id) {
        const params = {
          id: id
        }
        this.fullscreenLoading = true;
        request({
          url: UserApi.User.deleteDepartment,
          method: 'post',
          data: {
            param: JSON.stringify(params)
          }
        }).then(data => {
          this.fullscreenLoading = false;
          if (data.success === '1') {
            this.$message({
              type: 'success',
              message: '删除成功！ '
            });
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！ '
            });
          }
        })
      }
    },

  };
</script>
<style>
  .mw200{
    min-width: 200px;
    display: inline-block;
  }
</style>