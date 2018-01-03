<template>
  <div class="detail-container">
    <div class="crumbs">
      <span>采购商</span>
      <span class="arrow"></span>
      <span class="current">新增采购商</span>
    </div>
    <div class="detail-content">
      <el-form class="o-form" :inline="true" :rules="customerRules" ref="customerObj" :model="customerObj">
        <div class="title">
          <h5>基本信息</h5>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册手机号" prop="mobilePhone">
              <el-input v-model="customerObj.mobilePhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="customerObj.largeBox">大客户</el-checkbox>
          </el-col>
        </el-row>
        <div class="title">
          <h5>公司信息</h5>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称" prop="company">
              <el-input v-model="customerObj.company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照号码" prop="license">
              <el-input v-model="customerObj.license"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业固话/手机" prop="tel">
              <el-input v-model="customerObj.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区" prop="fullAddress">
              <el-cascader :options="proCity" v-model="customerObj.fullAddress">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司地址" prop="addr">
              <el-input v-model="customerObj.addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <h5>绑定关系</h5>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="跟单员" prop="followerId">
              <el-select v-model="customerObj.followerId" placeholder="请选择跟单员">
                <el-option label="请选择跟单员" value=""></el-option>
                <el-option v-for="follower in followerList" :value="follower.id" :label="follower.realName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售员" prop="salerId">
              <el-select v-model="customerObj.salerId" placeholder="请选择销售员">
                <el-option label="请选择销售员" value=""></el-option>
                <el-option v-for="saler in salerList" :value="saler.id" :label="saler.realName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="btn-groups">
            <el-button  @click.native="saveCustomer">保存</el-button>
            <el-button class="btn-white" @click.native="$router.push('/customer/list')">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div class="detail-container">
</template>
<script>
import {
  request,
  formatTimeString,
  newRequest
} from 'common/utils'
import { proCity } from 'common/proCityArea'
export default {
  data() {
    var checkMobilePhone = (rule, value, callback) => {
      if (value == '') {
        callback()
        return;
      }
      (/^1\d{10}$/g).test(value) ? callback() : callback(new Error('请输入正确手机号'))
    };
    return {
      proCity,
      customerObj: {
        mobilePhone: '',
        largeBox: false,
        company: '',
        tel: '',
        license: '',
        fullAddress: [],
        addr: '',
        followerId: '',
        salerId: '',
        account: {}
      },
      followerList: [],
      salerList: [],
      customerRules: {
        mobilePhone: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        license: [
          { min: 15, max: 20, message: '长度在 15 到 20 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入企业固话/手机', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        fullAddress: [
          { type: 'array', required: true, message: '请选择省市', trigger: 'change' }
        ],
        addr: [
          { required: true, message: '请输入公司地址', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        followerId: [
          { required: true, message: '请选择跟单员', trigger: 'change' }
        ],
        salerId: [
          { required: true, message: '请选择销售员', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getFollowerAndSellerList()
  },
  methods: {
    formatTime(row, column) {
      return formatTimeString(row.createTime)
    },
    saveCustomer() {
      this.customerObj.account.mobilePhone = this.customerObj.mobilePhone
      this.customerObj.large = this.customerObj.largeBox ? 1 : 0
      this.customerObj.province = this.customerObj.fullAddress[0] || ''
      this.customerObj.city = this.customerObj.fullAddress[1] || ''
      this.customerObj.area = this.customerObj.fullAddress[2] || ''
      var validPass = true
      this.$refs['customerObj'].validate((valid) => {
        if (!valid) {
          validPass = false
          return false;
        }
      });
      if (!validPass) {
        return;
      }

      newRequest({
        url: '/soouya/oms/customer',
        method: 'post',
        contentType: 'application/json',
        data: this.customerObj
      }).then((response) => {
        if (response.success === '1') {
          this.$message({
            type: 'success',
            message: response.msg,
            duration: 1500
          })
          this.$router.push('/customer/detail?id=' + response.obj.id)
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1500
          })
        }
      })
    },
    getFollowerAndSellerList() {
      request({
        url: '/crm/cm/Seed/getfollowList.do',
      }).then((response) => {
        if (response.success === '1') {
          this.followerList = response.followList;
          this.salerList = response.sellerList;
        }
      })
    }
  }
}

</script>
<style scoped lang="scss">
.top-line {
  border-top: 2px solid #20a0ff;
  display: block;
  div:first-child {
    background: #20a0ff none repeat scroll 0 0;
    color: #fff;
    float: left;
    padding: 5px 0;
    text-align: center;
    width: 150px;
    font-size: 18px;
    padding: 10px 0;
  }
  div:nth-child(2) {
    position: absolute;
    float: right;
  }
  button {
    float: right;
  }
}

.customer-info-row {
  // height: 40px;
  line-height: 40px;
  padding-left: 40px;
}

.input-lg {
  width: 200px;
}

.input-md {
  width: 150px;
}

.input-sm {
  width: 100px;
}

.corporationImg {
  width: 100px;
  height: 100px;
  vertical-align: top;
  display: inline-block;
}

.uploadTxt {
  position: absolute;
  left: 35px;
  top: 28px;
  color: #20A0FF;
  cursor: pointer;
  font-size: 40px;
  font-weight: bold;
}

</style>
