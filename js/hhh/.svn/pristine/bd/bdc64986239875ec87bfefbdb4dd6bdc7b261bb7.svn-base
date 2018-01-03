<template lang="html">
<div class="head-card">
  <el-dialog :title="title" v-model="$store.state.b.popLoad" size="large" :lock-scroll="true" :close-on-click-modal="false" @close="close">
    <el-form label-width="110px">
      <el-form-item label="原色卡：" class="need">
          <!-- 编辑卡头信息 -->
          <template v-if="isEdit">
            {{formData.originalColorNumber}}
          </template>
          <template v-else>
            <el-select v-model="formData.sourceId" placeholder="请选择" @change="changeImgs()">
                <el-option v-for="item in colorList" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </template>
      </el-form-item>
      <el-form-item label="自营供应商：" class="need">
        <template v-if="isEdit">
          {{formData.shopCompany}}
        </template>
        <template v-else>
          <el-select v-model="formData.shopId" placeholder="请选择">
              <el-option v-for="item in zyShopList" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="合成图片：" class="need">
        <div class="imgList" v-if="formData.imgUrlsList && formData.imgUrlsList.length > 0">
          <div class="imgs" v-for="(item, urlIndex) in formData.imgUrlsList">
            <a :href="`http://www.soouya.com` + item.url" :key="item.url" v-lightbox="formData.imgUrls" style="position:relative; float:left;">
              <img :src="'http://www.soouya.com' + item.url + '@60w_60h_90Q'" alt="urlIndex">
            </a>
            <span class="remove" @click="removeImg(urlIndex)" href="javascript:void(0);">X</span>
          </div>
        </div>
        <!-- <div>
          <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="cardInfo.imgUrls" v-for="(item, index) in cardInfo.imgUrls" v-if="isEdit">
            <img :src="'http://www.soouya.com' + item" alt="合成图片">
          </a>
        </div> -->
       
        <el-upload
            action="/redwood/sys/Common/uploadFile.do?type=6" width="60" :show-file-list="false" class="upload"
            :on-success="handleuploadImg" :before-upload="beforeUploadImgs" v-if="formData.imgUrlsList.length < 9" multiple select>
            <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="货号：" class="need">
        {{abbr}}
        <el-input v-model="formData.productNumber" style="width:200px;"></el-input>{{originalNumber}}
      </el-form-item>
      <el-form-item label="价格：">
        <div style="display:inline-block; margin-right: 10px;">
          剪版销售价&nbsp;&nbsp;<el-input v-model="formData.cutPrice" style="width: 80px" type="number"></el-input>
          <el-select v-model="formData.cutPriceUnit" style="width:100px;">
             <el-option
                    :label="'请选择'"
                    :value="''">
                    </el-option>
              <el-option
                  v-for="item in priceUnitList"
                  :label="item"
                  :value="item">
              </el-option>
          </el-select>
        </div>
        <div style="display:inline-block;">
            大货销售价&nbsp;&nbsp;<el-input v-model="formData.bulkPrice" style="width: 80px" type="number"></el-input>
            <el-select v-model="formData.bulkPriceUnit" style="width:100px;">
              <el-option
                    :label="'请选择'"
                    :value="''">
                    </el-option>
                <el-option
                    v-for="item in priceUnitList"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
        </div>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="formData.sellerMessage" :rows="5" style="width: 30%;"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer ta-c">
      <el-button type="default" @click="close()">返回</el-button>
      <el-button type="primary" @click="save()">确定</el-button>
      <el-button type="primary" @click="getCompoundPic()" >合成图片</el-button>
    </div>
    <div class="dialog-color-image" v-show="imgShow" ref="imgBox" :style="{ width: (dialogWidth - 780) + 'px'}">
      <div style="position:relative;">
        <div class="image-button"  ref="buttonDiv">
          <el-button class="default" size="small" style="height:27px;margin-top:1px;padding-top:3px" @click="Dprev()" v-if="originImgUrls.length > 1">上一张</el-button>
          <el-button class="default" size="small" style="height:27px;margin-top:1px;padding-top:3px" @click="Dnext()" v-if="originImgUrls.length > 1">下一张</el-button>
        </div>
        <a href="javascript:void(0);" v-for="(img, colorImgIndex) in originImgUrls" >
          <img :src="`http://www.soouya.com/` + img" v-show="colorImgIndex == currentIndex" :style="{ width: (dialogWidth - 780) + 'px'}" height="545" @click.stop="addPoint($event)"/>
        </a>
      </div>
        <li v-for="(item, index) in points" class="point" :style="{ top: (item.top - 4) + 'px', left: (item.left - 4) + 'px' }" @click.stop="removePoint(index)"></li>
    </div>
  </el-dialog>
  <lightbox />
</div>
</template>

<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest
} from 'utils/tool'
import {
  request
} from 'utils/request'
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: function(a) {
        return ''
      }
    },
    // openStatus: false,
    cardInfo: {
      type: Object,
      required: false,
      default: function(a) {
        return {}
      }
    },
    orderInfo: {
      type: Object,
      required: false,
      default: function(a) {
        return {}
      }
    },
    orderNumber: {
      type: String,
      required: false,
      default: function(a) {
        return ''
      }
    },
  },
  components: {
    Lightbox
  },
  data() {
    return {
      status: this.openStatus,
      isEdit: this.cardInfo && this.cardInfo.orderNumber != undefined,
      colorList: [],
      zyShopList: [],
      formData: {
        sourceId: '',
        originalColorNumber: '',
        shopId: '',
        shopCompany: '',
        imgUrls: [],
        imgUrlsList: [],
        productNumber: '',
        cutPrice: '',
        cutPriceUnit: '',
        bulkPrice: '',
        bulkPriceUnit: '',
        sellerMessage: ''
      },
      abbr: null,
      originalNumber: null,
      priceUnitList: ['元/米', '元/码', '元/千克'],
      currentIndex: 0,
      originImgUrls: [],
      imgShow: false,
      box: null,
      points: [],
      dialogWidth: ''
    }
  },
  watch: {
    // openStatus(val) {
    //   this.status = val
    // },
    formData: {
      handler: function(val) {
      this.zyShopList.forEach((item) => {
        if (val.shopId == item.value) {
            switch (item.name) {
          case '搜芽':
            this.abbr = 'LG';
            break;
          case '万象纺织':
            this.abbr = 'WX';
            break;
          case '巨冠纺织':
            this.abbr = 'JG';
            break;
          case '宏业纺织':
            this.abbr = 'HY';
            break;
        }
        }
      })
      },
      deep: true
    },
    cardInfo(val) {
      this.isEdit = val && val.orderNumber != undefined
    }
  },
  mounted() {
    // this.zyShopList = getCache({keyjs: 'zy_shop'});】
    console.log(this.cardInfo)
    if (this.cardInfo && this.isEdit && this.cardInfo.originalImgurls.length > 0) {
      this.originImgUrls = this.cardInfo.originalImgurls.slice()
      this.imgShow = true
    }
    console.log(this.originImgUrls)
    this.getData()
    this.dialogWidth = document.body.clientWidth * 0.9
  },
  methods: {
    addPoint(e) {
      var top = e.clientY - (document.body.clientHeight * 0.15) - (722 * 0.08) - 1
      top = +top.toFixed(0)
      var left = e.clientX - (document.body.clientWidth * 0.05) - 750 - 1
      left = +left.toFixed(0)
      var obj = {}
      obj.top = top
      obj.left = left
      if (this.points.length < 4) {
        this.points.push(obj)
      } else {
        return
      }
    },
    removePoint(index) {
      this.points.splice(index, 1)
    },
    close() {
      this.$store.dispatch('changePopLoad', false)
    },
    getData() {
      if (this.isEdit) {
        this.convertData()
      } else {
        this.$store.dispatch('changeload', true)
        request('/soouya/ziying/shop', {
          method: 'GET',
          data: { sellerSoouya: 1 }
        }).then(response => {
          this.$store.dispatch('changeload', false)
          if (response.success == '1') {
            let data = response.page
            if (data && data.result.length > 0) {
              data.result.forEach((r) => {
                this.zyShopList.push({
                  name: r.company,
                  value: r.id
                })
              })
            }
            this.convertData()
          } else {
            this.$message({
              type: 'error',
              message: response.msg,
              duration: 1500
            })
          }
        })
      }
    },
    convertData() {
      if (!this.isEdit) {
        this.orderInfo.colorCardList.forEach((color, index) => {
          this.colorList.push({
            name: '色卡' + (index + 1),
            value: color.id
          })
        })
      } else {
        this.formData = Object.assign(this.formData, this.cardInfo)
        this.formData.bulkPrice = (!this.formData.bulkPrice) ? null : this.formData.bulkPrice
        this.formData.cutPrice = (!this.formData.cutPrice) ? null : this.formData.cutPrice
        this.abbr = this.formData.productNumber.slice(0, 2);
        this.originalNumber = this.cardInfo.originalProductNumber
        var str = this.formData.productNumber.slice(2)
        var reg = new RegExp(this.cardInfo.originalProductNumber, 'g');
        this.formData.productNumber = str.replace(reg, '');
        if (this.formData.imgUrls.length > 0) {
          this.formData.imgUrls.forEach((img) => {
            this.formData.imgUrlsList.push({
              url: img + '?' + Math.random(),
              isCompound: true
            })
          })
        }
      }
    },
    beforeUploadImgs(file) {
      // 只判断格式
      let type = file.type.split('/')
      // let suffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      // console.log(type, suffix)
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
    handleuploadImg(response, file, fileList) {
      if (response.code == '1') {
        this.formData.imgUrls.push(response.imgUrl)
        this.formData.imgUrlsList.push({
          url: response.imgUrl,
          isCompound: false
        })
      }
    },
    getCompoundPic() {
      console.log(this.formData)
      if (!this.formData.sourceId) {
        this.alert('请选择色卡', 'error')
        return false
      }
      if (!this.formData.shopId) {
        this.alert('请选择自营供应商', 'error')
        return false
      }
      if (!this.formData.productNumber) {
        this.alert('请输往货号', 'error')
        return false
      }
      if (this.points.length >= 1 && this.points.length < 4) {
        this.alert('必须选中四个点', 'error')
        return false
      }
      if (this.formData.bulkPrice && !this.formData.bulkPriceUnit) {
          this.alert('请选择大货价格单位', 'error')
            return false
      }
      if (this.formData.bulkPriceUnit && !this.formData.bulkPrice) {
          this.alert('请填写大货价格', 'error')
            return false
      }
        if (this.formData.cutPrice && !this.formData.cutPriceUnit) {
          this.alert('请选择剪版价格单位', 'error')
            return false
      }
      if (this.formData.cutPriceUnit && !this.formData.cutPrice) {
          this.alert('请填写剪版价格', 'error')
            return false
      }
      var img = new Image();
      img.src = 'http://www.soouya.com/' + this.originImgUrls[this.currentIndex];
      var x = img.width / (this.dialogWidth - 778)
      var y = img.height / 545
      var pointsArr = []
      this.points.forEach((item) => {
        if (item.left) {
          pointsArr.push((item.left) * x)
        }
        if (item.top) {
          pointsArr.push((item.top - 28) * y)
        }
      })
      var pointsArr1 = [];
      pointsArr1 = pointsArr.map((item) => {
        return item.toFixed(0) - 0
      })
      var points = null
      var imgUrl = null
      if (this.points.length > 1 && this.points.length <= 4) {
        points = pointsArr1.join(',')
        imgUrl = this.originImgUrls[this.currentIndex];
      } else {
        points = null
        imgUrl = null
      }
      // if (Number(this.formData.bulkPrice) <= 0 || this.formData.bulkPriceUnit == '') {
      //   this.alert('请输入大货价', 'error')
      //   return false
      // }
      if (this.formData.sourceId && this.formData.shopId) {
        this.$store.dispatch('changeload', true)
        request('/redwood/colorCard/changeCardHead', {
          method: 'POST',
          data: {
            sourceId: this.formData.sourceId,
            shopId: this.formData.shopId,
            productNumber: this.abbr + this.formData.productNumber + this.originalNumber,
            bulkPrice: this.formData.bulkPrice,
            bulkPriceUnit: this.formData.bulkPriceUnit,
            points: points,
            imgUrl: imgUrl
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.$store.dispatch('changeload', false)
          this.points = [];
          if (response.success == '1') {
            let has = false
            // 直接去除比较好
            if (this.formData.imgUrlsList && this.formData.imgUrlsList.length > 0 && !imgUrl) {
              var list = []
              for (let i = 0; i < this.formData.imgUrlsList.length; i++) {
                if (this.formData.imgUrlsList[i].isCompound == false) {
                  if (!has) has = true
                  // this.formData.imgUrlsList = removeArrayItem(this.formData.imgUrlsList, i)
                  list.push({ url: this.formData.imgUrlsList[i].url, isCompound: false });
                }
              }
              // 如果没有的话直接给空，这样会容易看
              if (list.length == 0) {
                this.formData.imgUrlsList = []
              } else {
                this.formData.imgUrlsList = list
              }
              if (this.formData.imgUrlsList.length > 0) this.formData.imgUrlsList.reverse()
              console.log(list, this.formData.imgUrlsList)
            }
            if (imgUrl) {
              this.formData.imgUrlsList.push({
                url: response.obj.imgUrls[0] + '?' + Math.random(),
                isCompound: true
              })
            } else {
              imgUrl = null;
              response.obj.imgUrls.forEach((img) => {
                this.formData.imgUrlsList.push({
                  url: img + '?' + Math.random(),
                  isCompound: true
                })
              })
            }
            if (has) {
              this.formData.imgUrlsList.reverse()
            }
            this.formData.imgUrls = []
            this.formData.imgUrlsList.forEach((a) => {
              this.formData.imgUrls.push(a.url)
            })
            this.$message({
              type: 'success',
              message: '成功',
              duration: 1500
            })
          } else {
            this.$message({
              type: 'error',
              message: response.msg,
              duration: 1500
            })
          }
        })
      }
    },
    changeImgs() {
      // 新增才显示
      if (!this.isEdit) {
        this.orderInfo.colorCardList.forEach((color) => {
          if (color.id == this.formData.sourceId) {
            this.originImgUrls = color.imgUrls
            this.originalNumber = color.productNumber
            return false
          }
        })
        this.imgShow = true
        this.currentIndex = 0
        this.box = this.$refs.imgBox
        this.box.addEventListener('scroll', this.scrollDiv)
      }
    },
    Dprev() {
      if (this.currentIndex == 0) {
        return false;
      }
      this.currentIndex -= 1
    },
    Dnext() {
      console.log(this.currentIndex)
      if (this.currentIndex == (this.originImgUrls.length - 1)) {
        return false
      }
      this.currentIndex += 1
    },
    scrollDiv() {
      let left = this.box.scrollLeft
      this.$refs.buttonDiv.style.left = left + 'px'
    },
    removeImg(index) {
      // this.formData.imgUrlsList = removeArrayItem(this.formData.imgUrlsList, index)
      this.formData.imgUrlsList.splice(index, 1)
      this.formData.imgUrls.splice(index, 1)
    },
    save() {
      if (!this.isEdit) { // 如果不是编辑，需要检查色卡与自营供应商
        if (Number(this.formData.sourceId) <= 0) {
          this.alert('请选择原色卡', 'error')
          return false
        }
        if (Number(this.formData.shopId) <= 0) {
          this.alert('请选择自营供应商', 'error')
          return false
        }
      }
      if (!this.formData.imgUrlsList || this.formData.imgUrlsList.length == 0) {
        this.alert('请上传合成图片', 'error')
        return false
      }
      if (this.formData.productNumber == '') {
        this.alert('请输入货号', 'error')
        return false
      }
       if (this.formData.bulkPrice && !this.formData.bulkPriceUnit) {
          this.alert('请选择大货价格单位', 'error')
            return false
      }
      if (this.formData.bulkPriceUnit && !this.formData.bulkPrice) {
          this.alert('请填写大货价格', 'error')
            return false
      }
        if (this.formData.cutPrice && !this.formData.cutPriceUnit) {
          this.alert('请选择剪版价格单位', 'error')
            return false
      }
      if (this.formData.cutPriceUnit && !this.formData.cutPrice) {
          this.alert('请填写剪版价格', 'error')
            return false
      }
      if (this.formData.cutPrice != '') {
        this.formData.cutPrice = !Number.isInteger(Number(this.formData.cutPrice)) ? Number(this.formData.cutPrice).toFixed(2) : Number(this.formData.cutPrice)
      }
      if (this.formData.bulkPrice != '') {
        this.formData.bulkPrice = !Number.isInteger(Number(this.formData.bulkPrice)) ? Number(this.formData.bulkPrice).toFixed(2) : Number(this.formData.bulkPrice)
      }
      this.formData.imgUrls = []
      this.formData.imgUrlsList.forEach((img) => {
        if (img.url.indexOf('?') > -1) {
          this.formData.imgUrls.push(img.url.split('?')[0])
        } else {
          this.formData.imgUrls.push(img.url)
        }
      })
      // this.formData.imgUrlsList = []
      // if (!this.isEdit) {
      //   this.zyShopList.forEach((s) => {
      //     if (s.value == this.formData.shopId) {
      //       this.formData.shopCompany = s.name
      //       return false
      //     }
      //   })
      // }
      var obj = JSON.parse(JSON.stringify(this.formData))
      console.log(obj)
      obj.productNumber = this.abbr + obj.productNumber + this.originalNumber
      obj.orderNumber = this.orderNumber
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/colorCard/saveChange',
        method: 'post',
        contentType: 'application/json',
        data: obj
      }).then((res) => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.$store.dispatch('changeload', false)
          this.$emit('saveHeadChange', this.isEdit)
        } else {
          this.$store.dispatch('changeload', false)
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
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
.imgList {
  float: left;
}

.remove {
  position: absolute;
  top: -8px;
  left: 51px;
  background: rgba(0, 0, 0, 0.2);
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 10px;
  color: #666;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}

.need .el-form-item__label:before {
  content: '*';
  color: red;
}

.el-upload--text {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.imgs {
  position: relative;
  margin-right: 10px;
  float: left;
  img {
    width: 60px;
    height: 60px;
    border: 1px solid #efefef;
  }
}

.el-textarea {
  textarea {
    height: 250px;
    width: 600px;
  }
}

.dialog-color-image {
  width: 720px;
  height: 575px;
  position: absolute;
  top: 8%;
  left: 750px;
  border: 1px solid #ccc;
  color: #000;
  background-color: #fff;
  a {
    cursor: default;
  }
  .image-button {
    position: relative;
    text-align: center;
    height: 28px;
  }
  .point {
    position: absolute;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
  }
}
</style>
