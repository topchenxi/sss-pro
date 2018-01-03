<template>
  <div class="user-manage" v-loading.body="fullscreenLoading">
    <div class="oms-title-wrap">
      <h2>创建用户</h2>
      <div class="right">
        <div class="btn-add" @click="addUser">
          <span class="icon-add"></span> 创建新用户
        </div>
      </div>
    </div>
    <div class="containter">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tabs-containter">
        <el-tab-pane label="正常用户" name="1"></el-tab-pane>
        <el-tab-pane label="已禁用" name="-1"></el-tab-pane>
      </el-tabs>
      <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
      <div class="table-wrap">
        <div class="table-content" :style="{ height : windowHeight - 410 + 'px'}">
          <table class="table" v-if="activeName==1">
            <thead>
              <tr>
                <th>所属部门</th>
                <th>手机号</th>
                <th>人员姓名</th>
                <th>性别</th>
                <th>创建时间</th>
                <th>登录账号</th>
                <th>当前角色</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in userListData.result" :key="index">
                <!-- 所属部门 -->
                <td class="ta-l">{{item.department}}</td>
                <!-- 手机号 -->
                <td>{{item.mobile}}</td>
                <!-- 人员姓名 -->
                <td class="ta-l">{{item.realName}}</td>
                <!-- 性别 -->
                <td>{{item.gender == 1 ? '男' : '女'}}</td>
                <!-- 创建时间 -->
                <td>{{item.createTime | date}}</td>
                <!-- 登录账号 -->
                <td class="ta-l">{{item.userName}}</td>
                <!-- 当前角色 -->
                <td class="ta-l">{{item.redRoleList | roleFilter}}</td>
                <!-- 操作 -->
                <td>
                  <span @click='edit(item.id)' class="icon icon-editor mr10" title="编辑"></span>
                  <span @click='modifyPwd(item.id)' class="icon icon-pwd mr10" title="重设密码"></span>
                  <span @click='disable(item.id)' class="icon icon-jinyong " title="禁用"></span>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table" v-if="activeName==-1">
            <thead>
              <tr>
                <th>所属部门</th>
                <th>手机号</th>
                <th>人员姓名</th>
                <th>性别</th>
                <th>禁用时间</th>
                <th>创建时间</th>
                <th>登录账号</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in userListData.result" :key="index">
                <!-- 所属部门 -->
                <td>{{item.department}}</td>
                <!-- 手机号 -->
                <td>{{item.mobile}}</td>
                <!-- 人员姓名 -->
                <td>{{item.realName}}</td>
                <!-- 性别 -->
                <td>{{item.gender == 1 ? '男' : '女'}}</td>
                <!-- 禁用时间 -->
                <td>
                  <p v-if="item.disableTime">{{item.disableTime | date}}</p>
                </td>
                <!-- 创建时间 -->
                <td>{{item.createTime | date}}</td>
                <!-- 登录账号 -->
                <td>{{item.userName}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="page-wrap">
          <pagination :pagesize="userListData.pageSize" :page="userListData.pageNumber" :total="userListData.totalCount" :render="pageChange" :options="filters"></pagination>
        </div>
      </div>
    </div>
    <!--增加员工弹出框-->
    <el-dialog title="新增/编辑人员" v-model="dialogFormVisible" @close="cancel">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
        <el-form-item label="所属部门" :label-width="formLabelWidth" prop="deptId">
          <DepementFilter v-on:getParams="getDepartment" :param="ruleForm" style="float: left"></DepementFilter>
        </el-form-item>
        <el-form-item label="配置角色" :label-width="formLabelWidth" prop="roleIds">
          <el-checkbox-group class="role-group" v-model="ruleForm.roleIds" style="float: left" @change="change">
            <el-checkbox v-for="role in ruleForm.allRedRole" :label="role.id" :disabled="role.isAct" v-bind:class="{bold: role.isJiaChu}">{{role.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="人员姓名" prop="realName" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.realName" size="small" style="width: inherit;float: left"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
          <span style="float: left">
            <el-radio v-model="ruleForm.gender" :label="1">男</el-radio>
            <el-radio v-model="ruleForm.gender" :label="2">女</el-radio>
          </span>
        </el-form-item>
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="ruleForm.userName" size="small" style="width: inherit;float: left"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="ruleForm.mobile" size="small" style="width: inherit;float: left"></el-input>
        </el-form-item>
        <el-form-item label="跟单员编号" :label-width="formLabelWidth" prop="serialName" v-if="isGenDan">
          <el-input v-model="ruleForm.serialName" size="small" style="width: inherit;float: left"></el-input>
        </el-form-item>
        <el-form-item label="销售员编号" :label-width="formLabelWidth" prop="serialName" v-if="isXiaoShou">
          <el-input v-model="ruleForm.serialName" size="small" style="width: inherit;float: left"></el-input>
        </el-form-item>
        <el-form-item label="绑定采购员" :label-width="formLabelWidth" prop="bindDaoGouId" v-if="isXiaoShou">
          <el-select v-model="ruleForm.bindDaoGouId" placeholder="请选择导购" style="float: left">
            <el-option v-for="seed in ruleForm.allDaoGou" :label="seed.realName" :value="seed.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定跟单组长" :label-width="formLabelWidth" prop="bindCaiGouYuanId" v-if="isGenDan">
          <el-select v-model="ruleForm.bindGenDanZuZhangId" placeholder="请选择跟单组长" style="float: left">
            <el-option v-for="seed in ruleForm.allGenDanZuZhang" :label="seed.realName" :value="seed.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定销售组长" :label-width="formLabelWidth" prop="bindXiaoShouZuZhangId" v-if="isXiaoShou">
          <el-select v-model="ruleForm.bindXiaoShouZuZhangId" placeholder="请选择销售组长" style="float: left">
            <el-option v-for="seed in ruleForm.allXiaoShouZuZhang" :label="seed.realName" :value="seed.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定采购组长" :label-width="formLabelWidth" prop="bindDaoGouZuZhangId" v-if="isDaoGouYuan">
          <el-select v-model="ruleForm.bindDaoGouZuZhangId" placeholder="请选择采购组长" style="float: left">
            <el-option v-for="seed in ruleForm.allDaoGouZuZhang" :label="seed.realName" :value="seed.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定买货员" :label-width="formLabelWidth" prop="bindCaiGouYuanId" v-if="isGenDan">
          <el-select v-model="ruleForm.bindCaiGouYuanId" placeholder="请选择买货员" style="float: left">
            <el-option v-for="seed in ruleForm.allCaiGouYuan" :label="seed.realName" :value="seed.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定剪版员" :label-width="formLabelWidth" prop="bindJianBanYuanId" v-if="isGenDan || isGuide">
          <el-select v-model="ruleForm.bindJianBanYuanId" placeholder="请选择剪版员" style="float: left">
            <el-option v-for="seed in ruleForm.allJianBanYuan" :label="seed.realName" :value="seed.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定仓库地点" prop="bindCangKu" v-if="isGenDan || isGuide">
          <el-select v-model="ruleForm.bindCangKu" placeholder="请选择仓库地点" :label-width="formLabelWidth" style="float: left;padding-left: 9px;">
            <el-option label="银岭4楼" value="银岭4楼"></el-option>
            <el-option label="银岭6楼" value="银岭6楼"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消 </el-button>
        <el-button type="primary" @click="save('ruleForm')" :disabled="isDisForSaveBut">确定</el-button>
      </div>
    </el-dialog>
    <!--增加员工弹出框-->
  </div>
</template>
<script>
import HeadFilter from 'components/headFilter/team/HeadFilter.vue'
import DepementFilter from 'components/headFilter/team/DepementFilter.vue'
import Pagination from 'components/pagination'
import {
  request,
  //    getCache,
  setCache,
  formatTimeString,
  copy
} from 'common/utils'
import UserApi from 'api/user'
import MD5 from 'md5'
export default {
  components: {
    HeadFilter,
    Pagination,
    DepementFilter
  },
  data() {
    return {
      activeName: '1',
      currentTab: '1',
      fullscreenLoading: false,
      needJiaChuRoleId: [],
      isDisForSaveBut: true,
      userListData: {},
      tableData: [{}],
      searchVal: '',
      dialogFormVisible: false,
      ruleForm: {
        id: '',
        realName: '',
        deptId: '',
        department: [],
        roleIds: [],
        gender: '',
        userName: '',
        mobile: '',
        serialName: '',
        bindCaiGouYuanId: '',
        bindXiaoShouZuZhangId: '',
        allCaiGouYuan: [],
        bindJianBanYuanId: '',
        allJianBanYuan: [],
        bindCangKu: '',
        allRedRole: [],
        bindGenDanZuZhangId: '',
        allGenDanZuZhang: [],
        bindDaoGouId: '',
        bindDaoGouZuZhangId: '',
        allDaoGou: [],
        allXiaoShouZuZhang: [],
        allDaoGouZuZhang: []
      },
      rules: {
        //          realName: [
        //            { required: true, message: '请输入真实姓名', trigger: 'blur' },
        //            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        //          ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        //          gender: [
        //            { required: true, message: '请选择性别', trigger: 'change' }
        //          ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        roleIds: [
          { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ],
        bindCaiGouYuanId: [
          { required: true, message: '请选择买货员', trigger: 'change' }
        ],
        bindXiaoShouZuZhangId: [
          { required: true, message: '请选择销售组长', trigger: 'change' }
        ],
        bindDaoGouZuZhangId: [
          { required: true, message: '请选择采购组长', trigger: 'change' }
        ],
        bindJianBanYuanId: [
          { required: true, message: '请选择剪版员', trigger: 'change' }
        ],
        bindDaoGouId: [
          { required: true, message: '请选择导购', trigger: 'change' }
        ],
        bindCangKu: [
          { required: true, message: '请选择仓库', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
      height: '600',
      filters: {}
    };
  },
  filters: {
    roleFilter(value) {
      if (!value) return '';
      return value.split(',').filter(val => val != '').join(',');
    }
  },
  mounted() {
    //      this.height = String(document.documentElement.clientHeight - 850);
    this.getList(1);
    this.currentTab = '1'
    this.getCaiGouYuanList('woodCutCloth')
    this.getCaiGouYuanList('woodPurchaser')
    this.getCaiGouYuanList('woodFollowTeamLeader')
    this.getCaiGouYuanList('woodSalesLeader')
    this.getDaoGouList('woodGuider')
    this.getCaiGouYuanList('woodGuiderLeader')
    this.getAllRoleList();
  },
  watch: {
    ruleForm: {
      handler: function(newValue, oldVal) {
        //          console.log(111, this.$refs['ruleForm'], this.ruleForm)
        let flag = true
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].validate((valid) => {
            if (!valid) {
              flag = false
            }
          });
          if (flag) {
            this.isDisForSaveBut = !flag
          }
        }
      },
      deep: true
    }
  },
  computed: {
    isGenDan() {
      let on = false
      this.ruleForm.roleIds.forEach((value) => {
        if (value === '1070') {
          on = true
        }
      })
      return on
    },
    isDaoGouYuan() {
      let on = false
      this.ruleForm.roleIds.forEach((value) => {
        if (value === '2020') {
          on = true
        }
      })
      return on
    },
    isXiaoShou() {
      let on = false
      this.ruleForm.roleIds.forEach((value) => {
        if (value === '1046' || value === '1047') {
          on = true
        }
      })
      return on
    },
    isGuide() {
      let on = false
      this.ruleForm.roleIds.forEach((value) => {
        if (value === '2020' || value === '2021') {
          on = true
        }
      })
      return on
    }
  },
  methods: {
    handleClick(tab, event) {
      this.filters = {
        pageNumber: 1,
        currentTab: this.activeName,
        pageSize: 10
      }
      setCache({
        key: 'checkAccountTabType',
        value: 1
      })
      this.getList(this.activeName)
    },
    change(event) {
      //          console.log(event)
      let flag = false
      let currte = []
      event.forEach((id) => {
        if (this.needJiaChuRoleId.indexOf(id) != -1) {
          flag = true
          currte.push(id)
        }
      })
      console.log(currte)
      // 判断选择的角色是否包含 不能同时选的角色
      // 如果包含，其他不能同时选的角色 设置为不可选
      // 如果不包含，将其他不能同时选的角色设置为可选
      if (flag) {
        this.ruleForm.allRedRole.forEach((role) => {
          if (this.needJiaChuRoleId.indexOf(role.id) != -1 && currte.indexOf(role.id) == -1) {
            role.isAct = true
          }
        })
      } else {
        this.ruleForm.allRedRole.forEach((role) => {
          if (this.needJiaChuRoleId.indexOf(role.id) != -1) {
            role.isAct = false
          }
        })
      }
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.createTime)
    },
    switchTab(index) {
      // this.currentTab = index;
      // this.filters = {
      //   pageNumber: 1,
      //   currentTab: this.currentTab,
      //   pageSize: 20
      // }
      // setCache({
      //   key: 'checkAccountTabType',
      //   value: 1
      // })
    },
    judgeGenDan() {
      let on = false
      this.ruleForm.roleIds.forEach((value) => {
        if (value === '1070') {
          on = true
        }
      })
      return on
    },
    getDepartment(params) {
      console.log(params.departmentId)
      this.ruleForm.deptId = params.departmentId
    },
    /**
     * 获取筛选参数
     */
    getFilter(params) {
      this.filters = params;
      if (params.createTimeBegin) {
        this.filters.createTimeBegin = new Date(params.createTimeBegin).getTime()
        delete params.createTimeBegin
      }
      if (params.createTimeEnd) {
        this.filters.createTimeEnd = new Date(params.createTimeEnd).getTime()
        delete params.createTimeEnd
      }
      this.filters = Object.assign({
        pageNumber: 1,
        pageSize: 10,
      }, this.filters)
      this.getList()
    },
    pageChange() {
      this.filters = Object.assign({
        pageNumber: 1,
        pageSize: 10,
      }, this.filters)
      this.getList()
    },
    getList(status) {
      const param = Object.assign({
          status: status,
          pageNumber: 1,
          pageSize: 10,
        },
        this.filters)
      this.fullscreenLoading = true;
      setCache({
        key: 'userListFilters',
        value: this.filters,
      });
      request({
        url: UserApi.User.userList,
        method: 'post',
        data: {
          param: JSON.stringify(param)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.userListData = data.page;
          this.userListData.total = data.total;
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    isJiaChu(name) {
      let flag = false
      const jiachuRoles = ['找版大组长', '采购组长', '验货组长', '仓储组长', '剪版组长']
      jiachuRoles.forEach((value) => {
        if (name == value) {
          flag = true
          return
        }
      })
      return flag
    },
    getAllRoleList() {
      this.fullscreenLoading = true;
      request({
        url: UserApi.User.allRedRole,
        method: 'post',
        data: {
          param: JSON.stringify('')
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          data.list.forEach((role) => {
            if (this.isJiaChu(role.name)) {
              role.isJiaChu = true
              role.isAct = false
              this.needJiaChuRoleId.push(role.id)
            }
          })
          setCache({
            key: 'allRedRoleOptionsList',
            value: data.list
          })
          this.ruleForm.allRedRole = data.list;
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getCaiGouYuanList(code) {
      const params = {
        code: code
      }
      this.fullscreenLoading = true;
      request({
        url: UserApi.User.listRedSeedByCodes,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          if (code === 'woodPurchaser') {
            this.ruleForm.allCaiGouYuan = data.list;
          } else if (code === 'woodCutCloth') {
            this.ruleForm.allJianBanYuan = data.list;
          } else if (code === 'woodFollowTeamLeader') {
            this.ruleForm.allGenDanZuZhang = data.list;
          } else if (code === 'woodSalesLeader') {
            this.ruleForm.allXiaoShouZuZhang = data.list;
          } else if (code === 'woodGuiderLeader') {
            this.ruleForm.allDaoGouZuZhang = data.list;
          }
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getDaoGouList(code) {
      const params = {
        code: code
      }
      this.fullscreenLoading = true;
      request({
        url: UserApi.User.listRedSeedByCodes,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.ruleForm.allDaoGou = data.list;
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    disable(id) {
      const that = this
      const _time = new Date().getTime()
      that.$confirm('确定禁用该用户?', '禁用人员', {
        confirmButtonText: '立即禁用',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.fullscreenLoading = true;
        request({
          url: UserApi.User.disableUser,
          method: 'post',
          data: {
            param: JSON.stringify({
              id,
              _time
            })
          }
        }).then(data => {
          that.fullscreenLoading = false;
          if (data.success === '1') {
            //              that.$router.push(`/team/userManage`)
            //              this.activeName = 'second'
            const tabs = document.getElementsByClassName('el-tabs__item')
            tabs[1].click()
          } else {
            this.$message({
              type: 'success',
              message: data.msg
            })
          }
        })
      }).catch(() => {

      })
    },
    getUserDetail(id) {
      const params = {
        id: id
      }
      this.fullscreenLoading = true;
      request({
        url: UserApi.User.getUserDetail,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          copy(data, this.ruleForm)
          //            this.ruleForm.userName = data.userName
          this.ruleForm.roleIds = []
          data.roles.forEach((value) => {
            this.ruleForm.roleIds.push(value.id)
          })
          // 回显部门
          const split = data.deptId.split(',')
          this.ruleForm.department = split
          //            console.log('split', split)
          //            split.forEach((value) => {
          //              this.ruleForm.department.push(value)
          //            })
          //            console.log('this.ruleForm.department', this.ruleForm.department)
          //            delete this.ruleForm.bindCaiGouYuanId
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    edit(id) {
      this.dialogFormVisible = true;
      this.getUserDetail(id)
    },
    save(formName) {
      console.log(1)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitForSave();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForSave() {
      const params = {}
      copy(this.ruleForm, params)
      delete params.allCaiGouYuan
      delete params.allJianBanYuan
      delete params.allRedRole
      var url = UserApi.User.editUser
      console.log('id', this.ruleForm.id)
      if (this.ruleForm.id === '' || this.ruleForm.id === undefined) {
        url = UserApi.User.addUser
        params.pwd = '9aaf23c2e2077de877f1597ac352eb40'
      }
      this.fullscreenLoading = true;
      request({
        url: url,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.dialogFormVisible = false
          // 重新拉取数据
          if (!this.currentTab || this.currentTab === 1) {
            this.getList(1)
          } else if (this.currentTab === 2) {
            this.getList(-1)
          }
          this.getCaiGouYuanList('woodCutCloth')
          this.getCaiGouYuanList('woodPurchaser')
          this.getCaiGouYuanList('woodFollowTeamLeader')
          this.getCaiGouYuanList('woodSalesLeader')
          this.getDaoGouList('woodGuider')
          this.getCaiGouYuanList('woodGuiderLeader')
          this.$message({
            message: '操作成功！',
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    addUser() {
      this.dialogFormVisible = true
      const ruleForm = {
        id: '',
        realName: '',
        deptId: '',
        department: [],
        roleIds: [],
        gender: '',
        userName: '',
        mobile: '',
        serialName: '',
        bindCaiGouYuanId: '',
        bindXiaoShouZuZhangId: '',
        bindDaoGouZuZhangId: '',
        allCaiGouYuan: [],
        bindJianBanYuanId: '',
        allJianBanYuan: [],
        bindCangKu: '',
        allRedRole: []
      }
      this.ruleForm.id = ruleForm.id
      this.ruleForm.realName = ruleForm.realName
      this.ruleForm.department = ruleForm.department
      this.ruleForm.gender = ruleForm.gender
      this.ruleForm.userName = ruleForm.userName
      this.ruleForm.roleIds = ruleForm.roleIds
      this.ruleForm.mobile = ruleForm.mobile
      this.ruleForm.serialName = ruleForm.serialName
      this.ruleForm.bindCaiGouYuanId = ruleForm.bindCaiGouYuanId
      this.ruleForm.bindJianBanYuanId = ruleForm.bindJianBanYuanId
      this.ruleForm.bindCangKu = ruleForm.bindCangKu
      this.ruleForm.bindGenDanZuZhangId = ruleForm.bindGenDanZuZhangId
      this.ruleForm.bindXiaoShouZuZhangId = ruleForm.bindXiaoShouZuZhangId
      this.ruleForm.bindDaoGouZuZhangId = ruleForm.bindDaoGouZuZhangId
    },
    modifyPwd(id) {
      this.$prompt('请输入新密码', '重设密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const params = {
          id: id,
          newPwd: MD5(value)
        }
        this.fullscreenLoading = true;
        request({
          url: UserApi.User.modifyPwd,
          method: 'post',
          data: {
            param: JSON.stringify(params)
          }
        }).then(data => {
          this.fullscreenLoading = false;
          if (data.success === '1') {
            this.$message({
              type: 'success',
              message: '重设密码成功！'
            });
          } else {
            this.$message({
              message: '重设密码失败！',
              type: 'error',
              duration: 1000
            })
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    },
    cancel() {
      this.dialogFormVisible = false
      this.isDisForSaveBut = true
      const ruleForm = {
        id: '',
        realName: '',
        deptId: '',
        department: [],
        roleIds: [],
        gender: '',
        userName: '',
        mobile: '',
        bindCaiGouYuanId: '',
        allCaiGouYuan: [],
        bindJianBanYuanId: '',
        allJianBanYuan: [],
        bindCangKu: '',
        allRedRole: [],
        allDaoGou: [],
        bindDaoGou: '',
        bindXiaoShouZuZhangId: '',
        allXiaoShouZuZhang: [],
        allDaoGouZuZhang: [],
        bindDaoGouZuZhangId: ''
      }
      this.ruleForm.id = ruleForm.id
      this.ruleForm.realName = ruleForm.realName
      this.ruleForm.department = ruleForm.department
      this.ruleForm.gender = ruleForm.gender
      this.ruleForm.userName = ruleForm.userName
      this.ruleForm.roleIds = ruleForm.roleIds
      this.ruleForm.mobile = ruleForm.mobile
      this.ruleForm.bindCaiGouYuanId = ruleForm.bindCaiGouYuanId
      this.ruleForm.bindJianBanYuanId = ruleForm.bindJianBanYuanId
      this.ruleForm.bindCangKu = ruleForm.bindCangKu
      this.ruleForm.bindDaoGou = ruleForm.bindDaoGou
      this.ruleForm.bindXiaoShouZuZhangId = ruleForm.bindXiaoShouZuZhangId
      this.ruleForm.bindDaoGouZuZhangId = ruleForm.bindDaoGouZuZhangId
    }
  }
};

</script>
<style lang="scss" scoped>
.role-group {
  margin-left: -10px;
  .el-checkbox {
    float: left;
    min-width: 120px;
    margin: 0px 10px;
    .el-checkbox__label {
      font-size: 16px;
      color: #333333;
    }
  }
}

</style>
