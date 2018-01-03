<template>
  <section class="detail-container">
    <div class="crumbs">
      <span>订单审核</span>
      <span class="arrow"></span>
      <span class="current">找版订单编辑</span>
    </div>
    <div class="detail-content" v-if="formData">
      <div class="o-row">
        <dl class="o-item">
          <dt>订单号:</dt>
          <dd>{{formData.number}}</dd>
        </dl>
        <dl class="o-item">
          <dt>发布时间:</dt>
          <dd>{{formData.createTime | formatTime}}</dd>
        </dl>
      </div>
      <div class="status-wrap">
        审核状态 : {{formData.status === 20 ? '待审核' : '审核不通过'}}
      </div>
      <el-form class="edit-form" ref="audit-form" :model="formData" label-width="150px">
        <div class="o-title">采购商供应商信息</div>
        <el-form-item label="采购商" required>
          <el-row>
            <el-col :span="24">
              <p>采购商ID : {{formData.customerNumber}}</p>
              <p>公司名称 : {{formData.customerCompany}}</p>
              <p>联系电话 : {{formData.customerMobilePhone}}</p>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="mb30" label="收货地址" prop="addressId" :rules="[{ required: true, trigger: 'change', message:'请选择收货地址',type:'number' }]">
          <el-select class="w550" v-model="formData.addressId" @change="setAddress">
            <el-option v-for="item in address" :label="`${item.name}   ${item.tel}    ${item.province}${item.city}${item.area}${item.addr}`" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="o-title">货号信息</div>
            <template v-if="true">
              <el-form-item label="找版图片" required>
                <div class="img-list" v-if='formData.imgUrls && formData.imgUrls.length'>
                  <a :href="'http://www.soouya.com'+val" class="image" v-lightbox="formData.imgUrls" v-for="val in formData.imgUrls">
                    <img :src="'http://www.soouya.com'+val+'@200h_200w_1e'" alt="Image" width="86" height="86">
                  </a>
                </div>
                <el-upload action="/redwood/sys/Common/uploadFile.do?type=check" v-if="formData.imgUrls && formData.imgUrls.length < 9" :multiple="true" :show-file-list="false" :on-success="handleSuccess" style="display:inline-block;vertical-align:top;">
                  <div class="icon-upload"></div>
                </el-upload>
              </el-form-item>
              <el-form-item label="样版" prop="haveRealVersion" :rules="[{ required: true, trigger: 'blur', message:'请选择样版',type:'number' }]">
                <el-select class="select" v-model="formData.haveRealVersion">
                  <el-option label="有样版" :value="1"></el-option>
                  <el-option label="无样版" :value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="寻样要求" prop="findType" :rules="[{ required: true, trigger: 'change', message:'请选择寻样要求',type:'array'}]">
                <el-checkbox-group v-model="formData.findType">
                  <el-checkbox :label="1">找相同</el-checkbox>
                  <el-checkbox :label="2">找类似</el-checkbox>
                  <el-checkbox :label="4">找定做</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="颜色要求">
                <el-input class="input" v-model="formData.color"></el-input>
              </el-form-item>
              <el-form-item label="成分/织法/工艺" prop="tags" :rules="[{ required: true, message:'请选择成分/织法/工艺'}]">
                {{formData.tags.split(',').map(item=>item.split('_').pop()).join(',')}}
              </el-form-item>
              <el-form-item label="档次" prop="worth" :rules="[{ required: true, message:'请选择档次',type:'number'}]">
                <el-select class="select" v-model="formData.worth">
                  <el-option label="普通" :value="1"></el-option>
                  <el-option label="中" :value="8"></el-option>
                  <el-option label="高" :value="16"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期望货期">
                <el-date-picker class="input" v-model="formData.estimateDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-row>
                <el-col :span="4">
                  <el-form-item label="需求量">
                    <el-input class="input" v-model="formData.quantity"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="单位" prop="quantityUnit">
                    <template v-if="formData.category === 1">
                      <el-select class="select" v-model="formData.quantityUnit" @change="handleQuantityUnitChange">
                        <el-option label="米" value="米"></el-option>
                        <el-option label="码" value="码"></el-option>
                        <el-option label="千克" value="千克"></el-option>
                      </el-select>
                    </template>
                    <template v-else>
                      <el-input class="input" v-model="formData.quantityUnit" @change="handleQuantityUnitChange"></el-input>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="需求描述/留言">
                <el-input class="textarea" type="textarea" v-model="formData.remark"></el-input>
              </el-form-item>
            </template>
      </el-form>
      <footer class="btns-group">
        <el-button class="btn-large" :disabled="isNext" @click="publish('audit-form')">保存并审核通过</el-button>
        <el-button class="btn-error btn-large" @click="failed">审核不通过</el-button>
      </footer>
    </div>
    <el-dialog v-model="tagListDialogConfig.isShow" title="标签">
      <div class="dialog-main">
        <el-radio-group class="tag-aside" v-model="tagListDialogConfig.categortActiveName">
          <el-collapse v-model="tagListDialogConfig.collapseActiveName" accordion>
            <el-collapse-item :title="item.name" :name="index" v-for="(item,index) in tagListDialogConfig.tagList" v-if="item.type === 0">
              <el-radio-button class="aside-button" :label="val.id" v-for="val in item.value" @click.native="selectCategory(val)">{{val.name}}</el-radio-button>
            </el-collapse-item>
          </el-collapse>
        </el-radio-group>
        <div class="tag-main">
          <dl v-if="tagListDialogConfig.currentCategory.length" v-for="item in tagListDialogConfig.currentCategory">
            <dt>{{item.name}}</dt>
            <dd>
              <span :class="{'current':tag.checked}" v-if="tag.type === 0" v-for="tag in item.value" @click="selctTag(tag)">{{tag.name}}</span>
            </dd>
          </dl>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tagListDialogConfig.isShow = false">取消</el-button>
        <el-button type="primary" @click="setTags">确 定</el-button>
      </div>
    </el-dialog>
    <Lightbox></Lightbox>
  </section>
</template>
<script>
import { request } from 'src/common/utils.js'
import Lightbox from 'components/lightbox/lightbox'
const regFloat = /^\d+(\.\d{1,2})?$/

export default {
  components: {
    Lightbox
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      formData: null,
      address: [],
      tagListDialogConfig: {
        isShow: false,
        tagList: [],
        currentCategory: [],
        tags: [],
        categortActiveName: '',
        collapseActiveName: 1
      }
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    isNext() {
      let on = false
      if (this.formData.tags == '' || this.formData.imgUrls == null || this.formData.imgUrls.length == 0 || this.formData.findType.length == 0 || !regFloat.test(this.formData.category) || !regFloat.test(this.formData.worth)) {
        on = true
      }
      if (!this.formData.addressId || !this.formData.addressProvince || !this.formData.addressCity || !this.formData.addressAddr || !this.formData.addressName || !this.formData.addressTel) {
        on = true
      }
      return on
    }
  },
  methods: {
    handleQuantityUnitChange(value) {
      // this.formData.colors.forEach(item => {
      //   item.priceUnit = value
      // })
    },
    getDifferenceDay(time) {
      return Math.ceil((new Date(time) - new Date()) / (1000 * 60 * 60 * 24)) + '天'
    },
    setAddress(val) {
      let currentAddress = this.address.find((item) => item.id === val);
      Object.assign(this.formData, {
        addressAddr: currentAddress.addr,
        addressArea: currentAddress.area,
        addressCity: currentAddress.city,
        addressName: currentAddress.name,
        addressProvince: currentAddress.province,
        addressTel: currentAddress.tel,
      })
      console.log(this.formData)
    },
    failed() {
      request({
        url: `/redwood/check/find/${this.$route.query.id}?_function=disagree`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({})
      }).then((response) => {
        if (response.success == '1') {
          this.$message.success(response.msg);
          this.$router.go(-1)
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    publish() {
      request({
        url: `/redwood/check/find/${this.$route.query.id}?_function=agree`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(Object.assign({}, this.formData, {
          findType: this.formData.findType.reduce((acc, val) => acc + val, 0),
          estimateDate: this.formData.estimateDate ? +new Date(this.formData.estimateDate) : null
        }))
      }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.$message.success(response.msg);
          this.$router.replace({ name: 'auditFindList' })
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    handleSuccess(response) {
      if (this.requestIsSuccess(response)) {
        this.formData.imgUrls.push(response.imgUrl)
      }
    },
    getData() {
      request({
        url: `/redwood/check/find/${this.$route.query.id}`,
        data: {
          _time: +new Date()
        }
      }).then((response) => {
        if (this.requestIsSuccess(response)) {
          switch (response.obj.findType) {
            case 7:
              response.obj.findType = [1, 2, 4];
              break;
            case 6:
              response.obj.findType = [2, 4];
              break;
            case 5:
              response.obj.findType = [1, 4];
              break;
            case 4:
              response.obj.findType = [4];
              break;
            case 3:
              response.obj.findType = [1, 2];
              break;
            case 2:
              response.obj.findType = [2];
              break;
            default:
              response.obj.findType = [1];
          }
          this.formData = response.obj
          this.getAddress(response.obj.customerId)
        }
      })
    },
    getAddress(buyerId) {
      request({
        url: '/redwood/buyfollow/Address/list',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
          _time: +new Date(),
          userId: buyerId
        })
      }).then((response) => {
        if (this.requestIsSuccess(response) && response.result.length) {
          this.address = response.result
        }
      });
    },
    showComponent() {
      this.getTagList()
    },
    getTagList() {
      if (this.tagListDialogConfig.tagList.length > 0) {
        this.tagListDialogConfig.isShow = true;
        return false;
      }
      return request({
        url: '/redwood/sys/Tag/list.do',
        data: {
          _time: +new Date()
        }
      }).then((response) => {
        if (response.success) {
          let tagList = this.tagListDialogConfig.tagList = this.formData.tags.split(',')
          response.result.forEach((item, index) => {
            if (tagList[0].split('_')[0] === item.id) {
              item.checked = true
              this.tagListDialogConfig.collapseActiveName = index
            } else {
              item.checked = false
            }
            item.value.forEach((category) => {
              if (`${tagList[0].split('_')[0]}_${tagList[0].split('_')[1]}` === category.id) {
                this.tagListDialogConfig.categortActiveName = category.id
                this.tagListDialogConfig.currentCategory = category.value
                category.value.forEach((type) => {
                  type.value.forEach((tag) => {
                    if (tagList.indexOf(tag.id) > -1) {
                      tag.checked = true
                      this.tagListDialogConfig.tags.push(tag)
                    } else {
                      tag.checked = false
                    }
                  })
                })
              } else {
                category.value.forEach((type) => {
                  type.value.forEach((tag) => {
                    tag.checked = false
                  })
                })
              }
            })
          })
          this.tagListDialogConfig.tagList = response.result
          this.tagListDialogConfig.isShow = true
        }
      })
    },
    selectCategory(item) {
      item.checked = !item.checked
      this.tagListDialogConfig.currentCategory = item.value
    },
    setTags() {
      this.formData.tags = this.tagListDialogConfig.tags.map(item => item.id).join(',')
      this.tagListDialogConfig.isShow = false
    },
    selctTag(tag) {
      tag.checked = !tag.checked
      if (tag.checked) {
        if (this.tagListDialogConfig.tags.length) {
          let currentTags = this.tagListDialogConfig.tags[0].id.split('_')
          let nowTags = tag.id.split('_')
          if (!(currentTags[0] === nowTags[0] && currentTags[1] === nowTags[1])) {
            this.tagListDialogConfig.tags = this.tagListDialogConfig.tags.filter((item) => {
              item.checked = false;
              return false;
            })
          }
        }
        this.tagListDialogConfig.tags.push(tag)
      } else {
        this.tagListDialogConfig.tags = this.tagListDialogConfig.tags.filter((item) => item.id !== tag.id)
      }
    },
  }
}

</script>
<style lang="scss">
// .aside-button {
//   >span {
//     display: block;
//     border: 0 !important;
//   }
// }
// .media {
//   display: inline-block;
// }
// .upImg {
//   width: 64px;
//   height: 64px;
//   line-height: 64px;
//   border: 1px solid #ccc;
// }
//

</style>

<style lang="scss" scoped>
// h2 {
//   font-size: 24px;
//   margin: 15px 0;
// }
// .dialog-main {
//   display: flex;
// }
// .form-item-wrap {
//   >dt {
//     margin: 20px 0;
//     border-top: 1px solid #20a0ff;
//     span {
//       font-size: 18px;
//       text-indent: 1em;
//       background: #20a0ff;
//       color: #fff;
//       display: inline-block;
//       width: 200px;
//       height: 40px;
//       line-height: 40px;
//     }
//   }
// }
// .audit-list {
//   list-style: none;
//   font-size: 14px;
//   >li {
//     display: flex;
//     align-items: center;
//     .left-item {
//       box-sizing: border-box;
//       padding: 11px 12px 11px 0;
//       text-align: right;
//       width: 150px;
//       color: #48576a;
//     }
//   }
// }
// .el-input {
//   width: 200px;
//   display: inline-block;
// }
// .tag-aside {
//   flex: 0 0 150px;
//   text-align: left;
//   .el-radio-button {
//     display: block;
//   }
//   dt {
//     background: #ccc;
//     padding: 10px 0;
//     border-bottom: 1px solid #000;
//   }
//   dd {
//     >div {
//       background: #eee;
//       padding: 5px 0;
//       &.current {
//         background: #2fb468;
//         color: #fff;
//       }
//     }
//   }
// }
// .tag-main {
//   text-align: left;
//   margin-left: 20px;
//   dt {
//     padding: 20px 0;
//   }
//   dd {
//     >span {
//       display: inline-block;
//       margin: 5px;
//       padding: 10px;
//       background: #eee;
//       cursor: pointer;
//       &.current {
//         background: #20a0ff;
//         color: #fff;
//       }
//     }
//   }
// }
// .el-textarea {
//   width: 450px;
// }
// footer {
//   margin: 20px 0 50px 150px;
// }

</style>
