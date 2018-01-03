<template>
  <div class="detail-container">
    <div class="crumbs">
      <span>供应商</span>
      <span class="arrow"></span>
      <span class="current">新增供应商</span>
    </div>
    <div class="detail-content">
      <el-form class="o-form" :inline="true" :rules="infoRules" ref="sellerObj" :model="sellerObj">
        <div class="title">
          <h5>基本信息</h5>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册手机号" prop="mobilePhone">
              <el-input v-model="sellerObj.mobilePhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商编号" prop="serviceNumber">
              <el-input v-model="sellerObj.serviceNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-checkbox v-model="sellerObj.soouyaBox">搜芽自营</el-checkbox>
          </el-col>
        </el-row>
        <div class="title">
          <h5>线上店铺</h5>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="店铺名称" prop="company">
              <el-input v-model="sellerObj.company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺电话" prop="tel">
              <el-input v-model="sellerObj.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺介绍" prop="descr">
              <el-input v-model="sellerObj.descr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区" prop="fullAddress">
              <el-cascader :options="proCity" v-model="sellerObj.fullAddress">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺地址" prop="addr">
              <el-input v-model="sellerObj.addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商家联系人" prop="contact">
              <el-input v-model="sellerObj.contact" class="input-sm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商家联系电话" prop="contactTel">
              <el-input v-model="sellerObj.contactTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          <h5>绑定关系</h5>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="买货员">
              <el-select v-model="sellerObj.buyerId" placeholder="请选择买货员">
                <el-option label="请选择买货员" value=""></el-option>
                <el-option v-for="buyer in buyerList" :value="buyer.id" :label="buyer.realName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="btn-groups">
          <el-col :span="24">
            <el-button @click.native="saveSeller">保存</el-button>
            <el-button class="btn-white" @click.native="$router.push('/seller/list')">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  request,
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
      sellerObj: {
        mobilePhone: '',
        serviceNumber: '',
        soouyaBox: false,
        company: '',
        tel: '',
        descr: '',
        contact: '',
        contactTel: '',
        fullAddress: [],
        addr: '',
        buyerId: '',
        account: {}
      },
      buyerList: [],
      infoRules: {
        mobilePhone: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        serviceNumber: [
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        fullAddress: [
          { type: 'array', required: true, message: '请选择省市', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        contact: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        contactTel: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.getBuyerList()
  },
  methods: {
    saveSeller() {
      this.sellerObj.account.mobilePhone = this.sellerObj.mobilePhone == '' ? null : this.sellerObj.mobilePhone
      this.sellerObj.soouya = this.sellerObj.soouyaBox ? 1 : 0
      this.sellerObj.province = this.sellerObj.fullAddress[0] || ''
      this.sellerObj.city = this.sellerObj.fullAddress[1] || ''
      this.sellerObj.area = this.sellerObj.fullAddress[2] || ''
      var validPass = true
      this.$refs['sellerObj'].validate((valid) => {
        if (!valid) {
          validPass = false
          return false;
        }
      });
      if (!validPass) {
        return;
      }
      newRequest({
        url: '/soouya/oms/seller',
        method: 'post',
        contentType: 'application/json',
        data: this.sellerObj
      }).then((response) => {
        if (response.success === '1') {
          this.$message({
            type: 'success',
            message: response.msg,
            duration: 1500
          })
          this.$router.push('/seller/detail?id=' + response.obj.id)
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1500
          })
        }
      })
    },
    getBuyerList() {
      request({
        url: '/crm/cm/Seed/getMaihuoList.do',
      }).then((response) => {
        if (response.success === '1') {
          this.buyerList = response.purchaserList;
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
  }
  div:nth-child(2) {
    position: absolute;
    float: right;
  }
  button {
    float: right;
  }
}

.seller-info-row {
  line-height: 30px;
  padding-left: 10px;
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

.el-col {
  overflow: hidden;
  display: block;
}

</style>
