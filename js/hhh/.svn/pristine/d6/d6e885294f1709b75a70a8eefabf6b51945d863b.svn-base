<template>
  <div class="changeHead-area detail product-detail">
    <div class="detail-title">
      <span @click="back"></span>
      <p>详情</p>
    </div>
    <div class="detail-group" v-if="orderInfo != null">
      <div class="detail-item w100p p20">
        <h6>订单信息</h6>
        <dl class="info-item green" @click="show=!show">
          <dt>订单号：</dt>
          <dd>
            {{orderInfo.serviceNumber}}
            <i class="el-icon-arrow-down" v-if="show"></i>
            <i class="el-icon-arrow-up" v-if="!show"></i>
          </dd>
        </dl>
        <div class="more-info" v-if="show">
          <div class="img">
            <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="orderInfo.colorUrls" v-for="(item, index) in orderInfo.colorUrls">
                <img :src="`http://www.soouya.com` + item" alt="找版图片" v-show="index == 0" class="img">
              </a>
          </div>
          <div class="content">
            <div class="item">
              <div class="col">
                <p><span>品类：</span><span>{{orderInfo.productTypeDesc}}</span></p>
              </div>
              <div class="col">
                <p><span>换卡头：</span><span>{{orderInfo.changeCardDesc}}</span></p>
              </div>
            </div>
            <div class="item">
              <div class="col">
                <p><span>寻样要求：</span><span>{{orderInfo.findTypeDesc}}</span></p>
              </div>
              <div class="col">
                <p><span>档次：</span><span>{{orderInfo.worthDesc}}</span></p>
              </div>
            </div>
            <div class="item">
              <div class="col">
                <p><span>颜色要求：</span><span>{{orderInfo.color}}</span></p>
              </div>
              <div class="col">
                <p><span>实版：</span><span>{{orderInfo.haveRealVersionDesc}}</span></p>
              </div>
            </div>
            <div class="item">
              <div class="col">
                <p><span>成分/织法/工艺：</span><span>{{orderInfo.title}}</span></p>
              </div>
            </div>
            <div class="item">
              <div class="col">
                <p><span>需求量：</span><span>{{orderInfo.quantity}}{{orderInfo.quantityUnit}}</span></p>
              </div>
            </div>
            <div class="item">
              <div class="col">
                <p><span>备注：</span><span>{{needInfo.remark}}</span></p>
              </div>
            </div>
          </div>
        </div>
        <dl class="info-item">
          <dt>发布时间：</dt>
          <dd>
            {{needInfo.createTime | formatTime}}
          </dd>
        </dl>
        <dl class="info-item">
          <dt>审核时间：</dt>
          <dd>
            {{orderInfo.createTime | formatTime}}
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-if="orderInfo != null && orderInfo.colorCardList && orderInfo.colorCardList.length > 0">
      <div class="detail-item w100p p20">
        <h6>色卡信息</h6>
        <div class="d-line"></div>
        <div class="colors-wrap">
          <div v-for="(color, index) in orderInfo.colorCardList" class="item" :class="{'odd': index%2 == 0 }">
            <div class="h4">色卡{{index + 1}}
              <div class="op">
                <span v-if="color.editFlag" @click="editColor(color)" style="color: #FA9D3B;">保存</span>
                <span v-if="color.editFlag" @click="color.editFlag=false">取消</span>
                <span v-if="!color.editFlag && canEdit" @click="editColor(color)">编辑</span>
                <span @click="deleteColor(color,item)" v-if="canEdit">删除</span>
              </div>
            </div>
            <div class="color-content">
              <div class="left">
                <h5 v-if="color.shopCompany">原供应商：{{color.shopCompany}}</h5>
                <h5 v-if="!color.shopCompany&&color.editFlag">原供应商：<span class="green pointer" style="font-weight: normal;" @click="checkShop(index)">选择供应商</span></h5>
                <p v-if="color.shopCompany"> <span>电话：{{color.shopTel}}</span><span class="ml40">地址：{{color.shopFullAddress}}</span></p>
                <div class="detail-info-wrap">
                  <div class="detail-info-img">
                    <div v-if="!color.editFlag">
                      <div class="image-wrap">
                        <a :name="index" :data="'color'+index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="color.imgUrls" v-for="(item, imgIndex) in color.imgUrls">
                        <img :src="`http://www.soouya.com` + item" alt="原色卡图片" v-show="imgIndex == 0" class="img" width="140" height="140">
                      </a>
                        <p class="font">共{{color.imgUrls.length}}张</p>
                        <p class="shadow"></p>
                      </div>
                    </div>
                    <template v-if="color.editFlag">
                      <span @click="addImg_v1(index, true)" class="icon-upload2"></span>
                    </template>
                  </div>
                  <div class="detail-info-content">
                    <div class="row">
                      <p v-if="!color.editFlag" class="bold">货号：{{color.productNumber}}</p>
                      <p v-else>货号：
                        <el-input v-model="color.productNumber" style="width:252px;" :maxlength="30"></el-input>
                      </p>
                    </div>
                    <div class="row">
                      <div class="col">
                        <span class="col-title"><span class="red">*</span>品类：</span>
                        <span v-if="color.editFlag">{{color.productTypeDesc}} / </span>
                        <el-input v-if="color.editFlag" v-model="color.subProductType" style="width: 100px" :maxlength="10"></el-input>
                        <span v-if="!color.editFlag"> {{color.productTypeDesc}}/{{color.subProductType}}</span>
                        <!-- <el-select class="w100" v-if="color.editFlag" v-model="color.productSourceDesc">
                          <el-option label="现货" value="现货"></el-option>
                          <el-option label="订货" value="订货"></el-option>
                        </el-select> -->
                        <span class="sign">{{color.productSourceDesc}}</span>
                      </div>
                      <div class="col">
                        <span class="col-title">成分/织法/工艺：</span>
                        <template v-if="color.editFlag">
                          <el-input v-model="color.title" style="width:160px" :maxlength="100"></el-input>
                        </template>
                        <template v-else>
                          {{color.title}}
                        </template>
                      </div>
                      <div class="col">
                        <span class="col-title">幅宽：</span>
                        <template v-if="color.editFlag">
                          <el-input v-model="color.replyWidth" style="width: 100px" type="text"></el-input>
                          <el-select class="w100" v-model="color.replyWidthUnit">
                            <el-option label="〃" value="〃"></el-option>
                            <el-option label="cm" value="cm"></el-option>
                          </el-select>
                        </template>
                        <template v-else>
                          <template v-if="color.replyWidth">
                            {{color.replyWidth}}{{color.replyWidthUnit}}
                          </template>
                        </template>
                      </div>
                      <div class="col">
                        <span class="col-title">克重：</span>
                        <template v-if="color.editFlag">
                          <el-input v-model="color.replyWeigth" style="width: 142px" type="text"></el-input>
                          <el-select class="w100" v-model="color.replyWeigthUnit">
                            <el-option label="g/m²" value="g/m²"></el-option>
                            <el-option label="安" value="安"></el-option>
                          </el-select>
                        </template>
                        <template v-else>
                          <template v-if="color.replyWeigth">
                            {{color.replyWeigth}}{{color.replyWeigthUnit}}
                          </template>
                        </template>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <span class="col-title">空差：</span>
                        <template v-if="color.editFlag">
                          <el-input v-model="color.kongCha" style="width: 252px"></el-input>
                        </template>
                        <template v-else>
                          {{color.kongCha}}
                        </template>
                      </div>
                      <div class="col">
                        <span class="col-title">纸筒：</span>
                        <template v-if="color.editFlag">
                          <el-input v-model="color.zhiTong" style="width: 228px"></el-input>
                        </template>
                        <template v-else>
                          {{color.zhiTong}}
                        </template>
                      </div>
                      <div class="col">
                        <span class="col-title">公斤出米数：</span>
                        <template v-if="color.editFlag">
                          <el-input v-model="color.metrePerKilo" style="width: 162px" type="number"></el-input>
                        </template>
                        <template v-else>
                          {{color.metrePerKilo}}
                        </template>
                      </div>
                      <div class="col">
                        <span class="col-title">大货成本价：</span>
                        <template v-if="color.editFlag">
                          <el-input v-model="color.price" style="width: 100px"></el-input>
                          <el-select class="w100" v-model="color.priceUnit">
                            <el-option label="元/米" value="元/米"></el-option>
                            <el-option label="元/码" value="元/码"></el-option>
                            <el-option label="元/千克" value="元/千克"></el-option>
                            <el-option label="元/公斤" value="元/公斤"></el-option>
                          </el-select>
                        </template>
                        <template v-else>
                          <span v-if="color.price">{{color.price}}{{color.priceUnit}}</span>
                        </template>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <span class="col-title">找版员备注：</span>
                       <!-- <template v-if="color.editFlag">
                          <el-input type="textarea" autosize v-model="color.sellerMessage" style="width:82%;" :maxlength="500"></el-input>
                        </template> -->
                        <!-- <template v-else> -->
                            <span class="remark-area" :title="color.sellerMessage">{{color.sellerMessage}}</span>
                            <!-- </template> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-content">
          <div v-show="editRowIndex > -1" :style="imgPopStyle" class="image-pop-dialog" ref="imgPopBox">
            <div style="position:relative;">
              <div class="image-button" ref="buttonDiv">
                <el-button type="default" @click="prev" size="small" v-if="currentImageList.length > 1">上一张</el-button>
                <el-button type="default" @click="next" size="small" v-if="currentImageList.length > 1">下一张</el-button>
                <el-button type="default" @click.stop="closeDiv" size="small" style="float:right; margin-right: 20px;">关闭</el-button>
                <el-button type="default" @click.stop="addImg(null, false)" size="small" style="float:right; margin-right: 5px;">添加图片</el-button>
                <el-button type="default" @click.stop="delImg(currentIndex)" size="small" style="float:right; margin-right: 5px;">删除图片</el-button>
              </div>
              <a href="javascript:void(0)" :key="item" v-for="(item, urlImg) in currentImageList">
              <img :src="`http://www.soouya.com` + item" alt="原色卡图片" v-show="urlImg == currentIndex">
            </a>
            </div>
          </div>
          <el-dialog title="上传图片" :visible.sync="dialogVisible">
            <div class="card-image-list clearfix">
              <ul>
                <li v-for="(item, index) in orderInfo.colorCardList[currentIndex].imgUrls" :class="{'border' : currentImage == item || index==0&&!currentImage }">
                  <img @click="selectImg_v1(index)" :src="`http://www.soouya.com` + item" alt="原色卡图片" width="86" height="86">
                  <span class="del el-icon-circle-cross" @click="delImg_v1(index)"></span>
                </li>
                <li>
                  <el-upload action="/redwood/sys/Common/uploadFile.do?type=6" width="60" :show-file-list="false" :on-success="handleuploadImg_v1" :before-upload="beforeUploadImgs" v-if="orderInfo.colorCardList[currentIndex].imgUrls.length < 9" select>
                    <i class="icon-upload"></i>
                  </el-upload>
                </li>
              </ul>
            </div>
            <div class="img-show ta-l">
              <template v-if="currentImage">
                <img :src="`http://www.soouya.com` + currentImage" alt="原色卡图片" width="850" height="850">
              </template>
              <template v-if="!currentImage&&orderInfo.colorCardList[currentIndex].imgUrls.length>0">
                <img :src="`http://www.soouya.com` + orderInfo.colorCardList[currentIndex].imgUrls[0]" alt="原色卡图片" width="100%">
              </template>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="detail-group" v-if="orderInfo && orderInfo.changeCard == 1 && orderInfo.changeColorCardList && orderInfo.changeColorCardList.length > 0">
      <div class="detail-item w100p p20">
        <h6>换卡头信息</h6>
        <div class="d-line"></div>
        <div class="card-add-btn">
          <el-button v-if="orderInfo && orderInfo.changeCard == 1" type="primary" @click.native="newCard()" icon="plus">新增卡头</el-button>
          <el-button type="primary" @click.native="batchPrint">批量打印</el-button>
        </div>
        <div v-if="orderInfo && orderInfo.changeColorCardList && orderInfo.changeColorCardList.length">
          <div class="mb10">
            <el-checkbox v-model="checkAll" style="margin-right:2px;"></el-checkbox>全选
          </div>
          <div class="colors-wrap" v-for="(change, cindex) in orderInfo.changeColorCardList">
            <div class="item">
              <div class="h4">
                <el-checkbox v-model="change.check"></el-checkbox> 商品{{cindex + 1}}
              </div>
              <div class="color-content whole">
                <div class="left">
                  <h5>货号：{{change.productNumber}}</h5>
                  <div class="clearfix">
                    <span class="fl mr5">色卡图片</span>
                    <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="change.imgUrls" v-for="(item, index) in change.imgUrls" v-bind:data="`商品` + cindex">
                      <img :src="`http://www.soouya.com` + item + '@60w_60h_90Q'" alt="找版图片" v-show="index == 0" class="imgs" width="86" height="86">
                    </a>
                  </div>
                </div>
                <div class="right">
                  <div class="op">
                    <span @click="editCard(change)">修改</span>
                    <span @click="printCard(change,cindex)">打印贴纸</span>
                    <span @click="removeCard(change)">删除</span>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="col-title">自营供应商：</div>{{change.shopCompany}}
                    </div>
                    <div class="col">
                      <div class="col-title">原货号：</div>{{change.originalProductNumber}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="col-title">剪版销售价：
                      </div>
                      <template v-if="change.cutPrice">
                        {{change.cutPrice}}{{change.cutPriceUnit}}
                      </template>
                    </div>
                    <div class="col">
                      <div class="col-title">原色卡：</div>{{change.originalColorNumber}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="col-title">大货销售价：
                      </div>
                      <template v-if="change.bulkPrice">
                        {{change.bulkPrice}}{{change.bulkPriceUnit}}
                      </template>
                    </div>
                    <div class="col">
                      <div class="col-title">原供应商：</div>{{change.sourceShopCompany}}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="col-title">备注：</div>{{change.sellerMessage}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <lightbox />
    <head-card v-if="$store.state.b.popLoad" :title="cardMenuTitle" :orderInfo="orderInfo" :cardInfo="cardMenuData" :orderNumber="orderNumber" @saveHeadChange="saveHeadChange"></head-card>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import headCard from './headCardInput'
import {
  request
} from 'utils/request'
import {
  formatTimeString,
  newRequest
} from 'utils/tool'
export default {
  components: {
    Lightbox,
    'head-card': headCard
  },
  data() {
    return {
      dialogVisible: false,
      currentImage: '',
      currentIndex: 0,
      editRowIndex: -1,
      show: false,
      orderNumber: '',
      orderInfo: {
        colorCardList: []
      },
      needInfo: {},
      originalColorList: {},
      cardMenuTitle: '',
      cardMenuData: {},
      currentColor: null,
      editCurrentCard: {},
      currentImageList: [],
      showImgs: [],
      productType: [{ name: '面料', value: 1 }, { name: '辅料', value: 2 }],
      loading: false,
      checkAll: false,
      canEdit: null
    }
  },
  mounted() {
    this.orderNumber = this.$route.query.id
    this.canEdit = this.$route.query.canEdit
    this.getData()
  },
  filters: {
    formatTime(value) {
      return formatTimeString(value)
    }
  },
  watch: {
    checkAll(val) {
      if (val) {
        this.orderInfo.changeColorCardList.forEach((item) => {
          item.check = true
        })
      } else {
        this.orderInfo.changeColorCardList.forEach((item) => {
          item.check = false
        })
      }
    }
  },
  methods: {
    addImg_v1(index, val) {
      this.currentIndex = index;
      this.dialogVisible = true;
    },
    handleuploadImg_v1(response, file, fileList) {
      if (response.code == '1') {
        this.orderInfo.colorCardList[this.currentIndex].imgUrls.push(response.imgUrl)
      }
    },
    delImg_v1(index) {
      if (this.currentImage == this.orderInfo.colorCardList[this.currentIndex].imgUrls[index]) {
        this.currentImage = '';
      }
      this.orderInfo.colorCardList[this.currentIndex].imgUrls.splice(index, 1);
    },
    selectImg_v1(index) {
      this.currentImage = this.orderInfo.colorCardList[this.currentIndex].imgUrls[index];
    },
    getData() {
      this.originalColorList = {}
      this.$store.dispatch('changeload', true)
      // /redwood/find/getDetail
      request('/redwood/find/getDetail', {
        method: 'GET',
        data: { orderNumber: this.orderNumber }
      }).then(response => {
        this.$store.dispatch('changeload', false)
        if (response.success == '1') {
          this.needInfo = Object.assign({}, response.obj.need)
          this.orderInfo = Object.assign({}, response.obj)
          this.orderInfo.changeColorCardList.forEach((item) => {
            this.$set(item, 'check', false);
          })
          this.convertData()
        } else {
          this.orderInfo = null
          this.needInfo = null
        }
      });
    },
    convertData() {
      console.log(this.orderInfo.changeCard)
      let findTypeList = ['找相同', '找类似', '找定做']
      let worthList = { 1: '普通', 8: '中', 16: '高' }
      let findTypeDescList = []
      delete this.orderInfo.need
      if (this.orderInfo && this.orderInfo.id != undefined) {
        this.orderInfo.productTypeDesc = this.orderInfo.productType == 1 ? '面料' : '辅料'
        this.orderInfo.changeCardDesc = this.orderInfo.changeCard == 1 ? '是' : '否'
        this.orderInfo.haveRealVersionDesc = this.orderInfo.haveRealVersion > 0 && this.orderInfo.haveRealVersion == 1 ? '有实版' : '无实版'
        this.orderInfo.worthDesc = worthList[this.orderInfo.worth]
        for (let i = 0; i < 3; i++) {
          if ((Number(this.orderInfo.findType) & Math.pow(2, i)) == Math.pow(2, i)) {
            findTypeDescList.push(findTypeList[i]);
          }
        }
        if (findTypeDescList.length > 0) {
          this.orderInfo.findTypeDesc = findTypeDescList.join('/')
        } else {
          this.orderInfo.findTypeDesc = ''
        }
      }
      if (this.orderInfo && this.orderInfo.colorCardList.length > 0) {
        this.orderInfo.colorCardList.forEach((color, index) => {
          if (!this.originalColorList[color.id]) this.originalColorList[color.id] = {}
          this.originalColorList[color.id] = color
          this.originalColorList[color.id]['originalProductNumber'] = color.productNumber // 原货号
          this.originalColorList[color.id]['originalColorNumber'] = '色卡' + String(index + 1)
          this.originalColorList[color.id]['originalShopCompany'] = color.shopCompany
          this.originalColorList[color.id]['originalSourceId'] = color.id
          color.productTypeDesc = color.productType == 1 ? '面料' : '辅料'
          color.productSourceDesc = color.productSource == 0 ? '现货' : '订货'
          if (color.imgUrls && color.imgUrls.length > 0) {
            for (let i = 0; i < color.imgUrls.length; i++) {
              color.imgUrls[i] = color.imgUrls[i].replace(/"/ig, '').replace(/\[|\]/ig, '')
            }
          }
          this.$set(color, 'editFlag', false);
          this.$set(color, 'editTxt', '编辑');
          // color.editTxt = '编辑'
          // color.editFlag = false
        })
      }
      if (this.orderInfo && this.orderInfo.changeColorCardList && this.orderInfo.changeColorCardList.length > 0) {
        this.orderInfo.changeColorCardList.forEach((color, index) => {
          if (this.originalColorList[color.sourceId]) {
            var obj = JSON.parse(JSON.stringify(this.originalColorList[color.sourceId]))
            console.log(this.originalColorList[color.sourceId])
            delete obj.shopCompany // 把字段名相同的几条数据删除了，不然合并的时候后面的数据直接把前面的数据覆盖了
            delete obj.sourceShopCompany
            delete obj.productNumber
            delete obj.sourceId
            delete obj.cutPrice
            delete obj.bulkPrice
            delete obj.bulkPriceUnit
            delete obj.cutPriceUnit
            delete obj.sellerMessage
            delete obj.shopId
            delete obj.id
            this.$set(obj, 'originalImgurls', obj.imgUrls);
            delete obj.imgUrls
            color = Object.assign(color, obj)
            color.cutPrice = color.cutPrice ? Number(color.cutPrice).toFixed(2) : color.cutPrice
            color.bulkPrice = color.bulkPrice ? parseFloat(color.bulkPrice).toFixed(2) : color.bulkPrice
            if (!color.replyWidthUnit) {
              color.replyWidthUnit = 'cm'
            }
            if (!color.replyWeigthUnit) {
              color.replyWeigthUnit = 'g/m²'
            }
            color.metrePerKilo = color.metrePerKilo ? parseFloat(color.metrePerKilo).toFixed(2) : ''
          }
        })
      }
    },
    editColor(row) {
      if (!row.editFlag) { // 没有进行编辑的
        row.editFlag = true
        if (!this.currentColor) { // 没有其他编辑的数据
          row.editTxt = '保存'
          this.currentColor = row
        } else {
          this.currentColor.editFlag = false
          this.currentColor.editTxt = '编辑'
          this.currentColor = row
          this.currentColor.editFlag = true
          this.currentColor.editTxt = '保存'
        }
      } else { // 保存
        if (row.id) {
          if (!row.subProductType || row.subProductType == '') {
            this.alert('请输入品类', 'error')
            return false
          }
          if (!row.productNumber) {
            this.alert('请输入货号', 'error')
            return false
          }
          row.price = row.price && !Number.isInteger(Number(row.price)) ? parseFloat(row.price).toFixed(2) : row.price
          row.metrePerKilo = row.metrePerKilo && !Number.isInteger(Number(row.metrePerKilo)) ? parseFloat(row.metrePerKilo).toFixed(2) : row.metrePerKilo
          console.log(row);
          this.$msgbox({
            title: '提示',
            message: '是否保存',
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            beforeClose: (action, instance, done) => {
              if (action == 'confirm') {
                instance.confirmButtonText = '保存中...'
                instance.confirmButtonLoading = true

                request('/redwood/colorCard/edit', {
                  method: 'POST',
                  data: row,
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(response => {
                  instance.confirmButtonText = '确定'
                  instance.confirmButtonLoading = false
                  if (response.success == '1') {
                    row.editFlag = false
                    row.editTxt = '编辑'
                    this.currentColor.editFlag = false
                    this.currentColor.editTxt = '编辑'
                    // 更新originalColorList
                    this.originalColorList[row.id]['originalProductNumber'] = row.productNumber // 原货号
                    this.orderInfo.changeColorCardList.forEach((color) => {
                      color.originalProductNumber = row.productNumber
                    })
                    this.currentColor = null
                  }
                  this.$message({
                    type: response.success == '1' ? 'success' : 'error',
                    message: response.msg,
                    duration: 1500
                  })

                  done && done()
                })
              } else {
                done()
              }
            }
          }).then(action => {})
        } else {
          if (!row.shopCompany) {
            this.alert('必须选择供应商', 'error')
            return false
          }
          if (row.imgUrls.length < 1) {
            this.alert('必须添加色卡图片', 'error')
            return false
          }
          if (!row.subProductType || row.subProductType == '') {
            this.alert('请输入品类', 'error')
            return false
          }
          if (!row.productNumber) {
            this.alert('请输入货号', 'error')
            return false
          }
          let obj = Object.assign({}, row, {
            orderNumber: this.$route.query.id,
          })
          newRequest({
            url: '/redwood/colorCard/add',
            contentType: 'application/json',
            data: obj,
            method: 'post',
          }).then((res) => {
            if (res.success == 1) {
              row.editFlag = false
              row.editTxt = '编辑'
              row.id = res.obj.id
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
    deleteColor(row, index) {
      if (this.orderInfo.colorCardList.length == 1) {
        this.$message.error('只有一张色卡不能删除')
        return false
      }
      if (row.id) {
        newRequest({
          url: '/redwood/colorCard/deleteSource',
          method: 'post',
          contentType: 'application/json',
          data: {
            id: row.id
          }
        }).then((res) => {
          if (res.success == 1) {
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1000
            })
            this.orderInfo.colorCardList.splice(index, 1)
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      } else {
        this.orderInfo.colorCardList.splice(index, 1)
      }
    },
    batchPrint() {
      var indexArr = []
      this.orderInfo.changeColorCardList.forEach((item, index) => {
        if (item.check) {
          indexArr.push(index)
        }
      })
      if (indexArr.length < 1) {
        this.$message.error('请选中需要批量打印的数据')
        return false
      }
      window.open('/print/printFind?orderNumber=' + this.$route.query.id + '&index=' + indexArr.join(','))
    },
    printCard(row, index) {
      window.open('/print/printFind?orderNumber=' + row.orderNumber + '&index=' + index)
    },
    removeCard(row) {
      this.$msgbox({
        title: '提示',
        message: '确认删除，且商品库已生成的商品信息将一并被删除，需要删除吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action == 'confirm') {
            this.$store.dispatch('changeload', true)
            newRequest({
              url: '/redwood/colorCard/deleteChange',
              method: 'post',
              contentType: 'application/json',
              data: {
                id: row.id
              }
            }).then((res) => {
              if (res.success == 1) {
                this.$message.success(res.msg)
                this.$store.dispatch('changeload', false)
                this.getData()
              } else {
                this.$store.dispatch('changeload', false)
                this.$message({
                  type: 'error',
                  message: res.msg,
                  duration: 1000
                })
              }
            })
            // this.orderInfo.changeColorCardList = removeArrayItem(this.orderInfo.changeColorCardList, index)
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1500
            })
            done && done()
          } else {
            done()
          }
        }
      }).then((action) => {})
    },
    save() {
      let that = this
      this.loading = true
      request('/redwood/colorCard/saveChangeList', {
        method: 'POST',
        data: { colorCardList: this.orderInfo.changeColorCardList, createOrUpdate: 2, orderNumber: this.orderInfo.orderNumber },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.$message({
          type: response.success == '1' ? 'success' : 'error',
          message: response.msg,
          duration: 1500,
          onClose: function() {
            that.loading = false
            if (response.success == '1') {
              that.$router.go(0)
              // that.$router.push({name: 'cardManage'})
            }
          }
        })
      })
    },
    newCard() {
      this.cardMenuData = {}
      this.cardMenuTitle = '换卡头'
      this.editCurrentCard = {}
      this.$store.dispatch('changePopLoad', true)
    },
    editCard(row) {
      this.cardMenuData = row
      this.cardMenuTitle = '编辑'
      this.editCurrentCard = row
      this.$store.dispatch('changePopLoad', true)
    },
    back() {
      this.$router.back()
    },
    saveHeadChange(formData, isEdit) {
      this.$store.dispatch('changePopLoad', false)
      this.getData()
    }
  }
}

</script>
<style lang="scss">
.tar {
  text-align: right !important;
}

.tal {
  text-align: left !important;
}

.changeHead-area {
  .wrap-body {
    padding: 10px 0;
    .title {
      line-height: 36px;
      margin-top: 20px;
      font-weight: 900;
    }
    .wrap-content {
      border: 1px solid #ccc;
      padding: 20px;
      margin-bottom: 10px;

      .order-info {
        .info-item {
          line-height: 32px;
          margin-top: 5px;

          .info-label {
            width: 90px;
            text-align: right;
            float: left;
          }
          .info-data {
            float: left;
          }
        }
      }

      .imgs {
        width: 60px;
        height: 60px;
      }
    }
  }

  .bottom {
    margin-top: 20px;

    .add-btn {
      line-height: 32px;
    }
    .submit-btn {
      margin-top: 10px;
    }
  }
}

.order-detail {
  padding: 10px;
  p {
    line-height: 32px;
  }
}

.el-input__inner {
  padding: 0 0 0 10px;
  line-height: 28px;
}

.footer {
  text-align: center;
  margin-top: 20px;
}

.order-detail {
  font-size: 14px;
  .img {
    width: 60px;
    height: 60px;
    margin: 10px 0 0 10px;
  }
}

.remark-area {
  width: 90px;
  overflow: hidden;
  word-wrap: break-word;
  word-spacing: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.el-table .cell {
  text-overflow: clip;
}

.image-wrap {
  display: inline-block;
  position: relative;
  p {
    margin: 0 !important;
  }
  .font {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 32px;
    line-height: 32px;
    z-index: 999;
    text-align: center;
    font-size: 12px;
    color: #FFFFFF !important;
  }
  .shadow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 32px;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.card-image-list {
  ul {
    margin-left: -10px;
    li {
      &.border {
        border: 1px solid #2fb468
      }
      border: 1px solid #fff;
      float: left;
      margin: 10px;
      position: relative;
      img {
        cursor: pointer;
      }
      .del {
        position: absolute;
        font-size: 20px;
        color: #333;
        right: -10px;
        top: -10px;
        display: none;
        cursor: pointer;
        background-color: #fff;
        border-radius: 50%;
      }
      &:hover {
        .del {
          display: block;
        }
      }
    }
  }
  .el-upload--text {
    float: left;
    padding: 0;
    border: none;
    border-radius: 0;
  }
}

</style>
