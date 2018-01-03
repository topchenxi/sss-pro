<template lang="html">
  <div>
    <el-dialog :title="title" v-model="status" size="small" :close-on-click-modal="false" @close="cancelDialog()">
      <el-form v-if="info">
        <div class="mb10">
          需求号： <strong class="mr20">{{info.number}}</strong> 发布时间 {{info.createTime | formatTime}}
        </div>
        <div class="mb10">
          采购商： {{info.customerCompany}}
          <el-button type="primary" class="ml20" @click.native="buyerSelect()">选择</el-button>
        </div>
        <div class="mb10">
          <span class="red">*</span>收货地址：<span v-if="info.addressId">{{info.addressName}} {{info.addressTel}} {{info.addressDetail}}</span>
          <el-button class="ml20" type="primary" @click.native="addressSelect()">选择</el-button>
        </div>
        <div class="d-line"></div>
        <el-form-item label="品类：" class="need">
          <el-radio-group v-model="info.productType">
            <el-radio :label="1">面料</el-radio>
            <!-- <el-radio :label="2">辅料</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提案：" class="need">
          <el-radio-group v-model="info.motion">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="换卡头：" class="need">
          <el-radio-group v-model="info.changeCard">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="寻样要求：" class="need">
          <el-checkbox-group v-model="findList">
            <el-checkbox :label="1">找相同</el-checkbox>
            <el-checkbox :label="2">找类似</el-checkbox>
            <el-checkbox :label="4">找定做</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="档次：" class="need">
          <el-radio-group v-model="info.worth">
            <el-radio :label="16">高</el-radio>
            <el-radio :label="8">中</el-radio>
            <el-radio :label="1">普通</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="实版：" class="need">
          <el-radio-group v-model="info.haveRealVersion">
            <el-radio :label="1">有实版</el-radio>
            <el-radio :label="0">无实版</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否收到实版：" class="need" v-if="info.haveRealVersion == '1'">
          <el-radio-group v-model="info.hasReceive">
            <el-radio :label="1">收到</el-radio>
            <el-radio :label="0">未收到</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="找版图片：">
          <div class="imgs" v-if="info && info.colorUrls.length > 0">
            <div style="position:relative; float:left;" v-for="(url, urlIndex) in info.colorUrls">
              <img :src="'http://www.soouya.com' + url" alt="urlIndex" width="86" height="86">
              <i class="remove el-icon-circle-close" @click="removeColorImg(urlIndex)"></i>
            </div>
          </div>
          <el-upload action="/redwood/sys/Common/uploadFile.do?type=6" width="60" :show-file-list="false" class="upload" :on-success="handleColorUpload" :before-upload="beforeUploadImgs" v-if="info.colorUrls.length < 9" multiple select>
            <i class="icon-upload"></i>
          </el-upload>
          <div class="clear"></div>
        </el-form-item>
        <el-form-item label="颜色要求：">
          <el-input placeholder="选填" v-model="info.color" :maxlength="100" style="width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="成分/织法/工艺：">
          <el-input placeholder="选填" v-model="info.title" :maxlength="100" style="width: 360px;"></el-input>
        </el-form-item>
        <div class="d-line"></div>
        <el-form-item label="快递单：">
          <div class="imgs" v-if="info && info.expressUrls.length > 0">
            <div style="position:relative; float:left;" v-for="(url, urlIndex) in info.expressUrls">
              <img :src="'http://www.soouya.com' + url" alt="urlIndex" width="86" height="86">
              <i class="remove el-icon-circle-close" @click="removeColorImg(urlIndex)"></i>
            </div>
          </div>
          <el-upload action="/redwood/sys/Common/uploadFile.do?type=6" width="60" :show-file-list="false" :on-success="handleExpressUpload" :before-upload="beforeUploadExpressImgs" v-if="!info.expressUrls || info.expressUrls.length < 9" multiple select>
            <i class="icon-upload"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="需求量：">
          <el-input placeholder="选填" v-model="info.quantity" type="number" :maxlength="50" style="width: 220px;"></el-input>
          <el-select v-model="info.quantityUnit" style="width: 100px;">
            <el-option v-for="item in quantityUnitList" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="(type == 'order' ? '订单备注' : '需求备注') + '：'">
          <el-input type="textarea" placeholder="备注" v-model="info.remark" :rows="3" :maxlength="500" style="width: 80%; margin-top: 10px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="ta-c">
        <el-button type="default" @click="cancelDialog()">取消</el-button>
        <el-button type="primary" @click="commit()">确定</el-button>
      </div>
    </el-dialog>
    <simple-buyer v-if="buyerFlag" :showFlag="buyerFlag" :salerId="info.salesId" @getInfo="changeCustomer" @closeMember="closeMember"></simple-buyer>
    <simple-address v-if="addressFlag" :showFlag="addressFlag" :customerId="info.customerId" @getInfo="changeAddress" @closeAddress="closeAddress"></simple-address>
    <lightbox />
  </div>
</template>
<script>
// import buyerSeller from 'pages/common/buyerAndSeller'
import Lightbox from 'src/components/lightbox/lightbox'
import simpleBuyer from './simpleBuyer'
import simpleAddress from './simpleAddress'
import api from 'src/api/allApi'
import {
  // alertMessage,
  newRequest,
  removeArrayItem,
  formatTimeString
} from 'utils/tool'
export default {
  props: {
    title: '',
    dialogStatus: {
      type: Boolean,
      required: true,
      default: function(a) {
        return false
      }
    },
    type: '',
    info: {
      type: Object,
      required: true,
      default: function(a) {
        return {}
      }
    }
  },
  components: {
    // 'buyer-saller': buyerSeller,
    'simple-buyer': simpleBuyer,
    'simple-address': simpleAddress,
    Lightbox
  },
  data() {
    return {
      sendinfo: {
        name: 0
      },
      selectBuyer: false,
      findList: [],
      quantityUnitList: ['米', '码', '公斤'], // , '其他'
      status: this.dialogStatus,
      changeBuyer: false,
      buyerFlag: false, // 这个是打开选择采购商的
      addressFlag: false, // 这个是打开选择地址的
      buyerData: {},
      isEdit: true,
      // uploadFlag: true
    }
  },
  mounted() {
    if (this.info && this.info.findType != undefined) {
      for (let i = 0; i < 3; i++) {
        let number = Math.pow(2, i);
        if ((this.info.findType & number) == number) {
          this.findList.push(number)
        }
      }
      // if (this.type == 'order') {
      this.info.remark = this.info.leaveMessage
      // }
    }
    this.status = this.dialogStatus
    if (this.info.id == undefined) {
      this.isEdit = false
    }
    // this.info.salesId = 'cccdd2f9d0cb486bab20c344dfefda1e'
  },
  filters: {
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  methods: {
    getAddressList() {
      this.addressId = ''
      newRequest({
        url: api.Address.list,
        contentType: 'application/json',
        data: {
          userId: this.customerId
        }
      }, (res) => {
        if (res.success == 1) {
          this.addressList = res.result
        }
      })
    },
    commit() {
      this.info.findType = 0
      if (this.findList && this.findList.length > 0) {
        this.findList.forEach((i) => {
          this.info.findType += i
        })
      }
      if (this.info.customerId == '') {
        this.alert('请选择采购商', 'error')
        return false;
      }
      if (this.info.addressId == 0 || this.info.addressId == '') {
        this.alert('请选择收货地址', 'error')
        return false;
      }
      if (this.info.productType == '') {
        this.alert('请选择品类', 'error')
        return false;
      }
      if (Number(this.info.motion) != 0 && Number(this.info.motion) != 1) {
        this.alert('请选择提案', 'error')
        return false;
      }
      if (Number(this.info.changeCard) != 0 && Number(this.info.changeCard) != 1) {
        this.alert('请选择是否换卡头', 'error')
        return false;
      }
      if (this.info.findType == 0) {
        this.alert('请选择寻样要求', 'error', 'error')
        return false
      }
      // if (this.info.title == '') {
      //   this.alert('请输入成分/织法/工艺', 'error')
      //   return false
      // }
      if (this.info.worth == '' || this.info.worth == 0) {
        this.alert('请选择档次', 'error')
        return false
      }
      if (Number(this.info.haveRealVersion) != 0 && Number(this.info.haveRealVersion) != 1) {
        this.alert('请选择是否有实版', 'error')
        return false
      }
      if (Number(this.info.haveRealVersion) == 1) {
        if (this.info.hasReceive == null) {
          this.alert('请选择是否收到实版', 'error')
          return false
        }
      }
      this.$emit('formSummit', this.info)
    },
    chooseCustomerCompay() {},
    cancelDialog() {
      this.$emit('cancelDialog', this.type);
      // this.dialogStatus = false
      // this.$store.dispatch('changePopLoad', false)
    },
    changeCustomer(params) {
      this.info.customerId = params.id
      this.info.customerCompany = params.company
      this.info.customerTel = params.tel
      this.info.customerNumber = params.number
      // 获取默认地址
      newRequest({
        url: '/redwood/buyfollow/Address/getDefault',
        data: {
          userId: params.id
        },
        contentType: 'application/json'
      }, (response) => {
        this.buyerFlag = false
        if (response.success == '1') {
          let obj = response.obj

          this.info.addressProvince = obj.province
          this.info.addressCity = obj.city
          this.info.addressArea = obj.area
          this.info.addressId = obj.id
          this.info.addressAddr = obj.addr
          this.info.addressName = obj.name
          this.info.addressTel = obj.tel
        } else {
          //
          this.$message({
            type: 'error',
            message: '获取默认地址出错',
            duration: 1500
          })

          this.info.addressProvince = ''
          this.info.addressCity = ''
          this.info.addressArea = ''
          this.info.addressId = 0
          this.info.addressAddr = ''
          this.info.addressName = ''
          this.info.addressTel = ''
        }
      })
      // this.addressInfo = ""
      // this.addressJson = {}
      // request(url, {});
    },
    changeAddress(params) {
      this.addressFlag = false
      this.info.addressAddr = params.addr
      this.info.addressArea = params.area ? params.area : ''
      this.info.addressCity = params.city ? params.city : ''
      this.info.addressProvince = params.province ? params.province : ''
      this.info.addressId = params.id
      this.info.addressName = params.name
      this.info.addressTel = params.tel
      this.info.addressDetail = this.info.addressProvince + this.info.addressCity + this.info.addressArea + this.info.addressAddr
      // this.info.addressJson = ""
      // this.info.addressInfo = {}
    },
    closeMember() {
      this.buyerFlag = false
      // this.$emit('closeMember')
    },
    closeAddress() {
      this.addressFlag = false
    },
    removeColorImg(index) {
      this.info.colorUrls = removeArrayItem(this.info.colorUrls, index)
    },
    removeExpressImg(index) {
      this.info.expressUrls = removeArrayItem(this.info.expressUrls, index)
    },
    // 上传前判断是否多于9张图片
    // colorUploadChnage(file, fileList) {
    //   if (this.info.colorUrls.length + fileList.length > 9) {
    //     alertMessage('你上传的找版图片多于9张了，不能上传')
    //     this.uploadFlag = false
    //   } else {
    //     this.uploadFlag = true
    //   }
    // },
    // expressUploadChnage(file, fileList) {
    //   if (this.info.expressUrls.length + fileList.length > 9) {
    //     alertMessage('你上传的快递单图片多于9张了，不能上传')
    //     this.uploadFlag = false
    //   } else {
    //     this.uploadFlag = true
    //   }
    // },
    // 上传前判断文件是否合格
    beforeUploadImgs(file) {
      // if (!this.uploadFlag) {
      //   return false
      // }
      // 只判断格式
      let type = file.type.split('/')
      // let suffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      // if (suffix != 'jpg' || suffix != 'png' || suffix != 'gif' || type != 'image/jpeg' || type != 'image/png' || type != 'image/gif') {
      if (['jpg', 'png', 'gif', 'jpeg'].indexOf(type[1]) == -1) {
        this.$message({
          type: 'error',
          message: '请上传图片',
          duration: 1500
        })
        return false
      }
      return true
    },
    beforeUploadExpressImgs(file) {
      // 只判断格式
      let type = file.type.split('/')
      // let suffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      // if (suffix != 'jpg' || suffix != 'png' || suffix != 'gif' || type != 'image/jpeg' || type != 'image/png' || type != 'image/gif') {
      if (['jpg', 'png', 'gif', 'jpeg'].indexOf(type[1]) == -1) {
        this.$message({
          type: 'error',
          message: '请上传图片',
          duration: 1500
        })
        return false
      }
      return true
    },
    // 上传成功了
    handleColorUpload(response, file, fileList) {
      if (response.code == 1) {
        if (this.info.colorUrls.length < 9) {
          this.info.colorUrls.push(response.imgUrl)
        }
      }
    },
    handleExpressUpload(response, file, fileList) {
      if (response.code == 1) {
        if (this.info.expressUrls.length < 9) {
          this.info.expressUrls.push(response.imgUrl)
        }
      }
    },
    buyerSelect() {
      this.buyerFlag = true
    },
    addressSelect() {
      this.addressFlag = true
    },
    alert(msg, type) {
      this.$message({
        type: type || 'success',
        message: msg,
        duration: 1500
      })
    }
  }
}

</script>
<style lang="scss">
.el-form-item__label {
  width: 14.5%;
  text-align: right;
}

.el-form-item__content {
  .el-radio,
  .el-checkbox {
    display: inline-block;
    min-width: 90px;
    margin: 0;
  }
  .el-checkbox {
    min-width: 86px;
  }
}

.need .el-form-item__label:before {
  color: red;
  content: '*';
}

.upload {
  margin-left: 10px;
}

.imgs {
  float: left;
  img {
    margin-right: 10px;
  }
  .remove {
    position: absolute;
    top: -8px;
    right: 0px;
    cursor: pointer;
    color: #999;
    font-size: 16px;
    background-color: #fff;
    border-radius: 50%;
  }
}

.d-line {
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 20px 0;
  width: 100%;
}

</style>
