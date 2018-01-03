<template>
  <div class="changeHead-area detail product-detail">
    <div class="detail-title">
      <span @click="back"></span>
      <p>详情</p>
    </div>
    <div class="detail-group" v-if="orderInfo != null && needInfo != null">
      <div class="detail-item w100p p20">
        <h6>订单信息</h6>
        <dl class="info-item green" @click="show=!show">
          <dt style="min-width:10px;">订单号：</dt>
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
          <dt style="min-width:10px;">发布时间：</dt>
          <dd>
            {{needInfo.createTime | formatTime}}
          </dd>
        </dl>
        <dl class="info-item">
          <dt style="min-width:10px;">审核时间：</dt>
          <dd>
            {{orderInfo.createTime | formatTime}}
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-if="orderInfo != null && orderInfo.colorCardList && orderInfo.colorCardList.length > 0">
      <div class="detail-item w100p p20" style="overflow-x:auto;">
        <h6>色卡信息</h6>
        <div class="card-add-btn">
          <el-button type="primary" @click="addColor()" icon="plus">新增色卡</el-button>
        </div>
        <div class="d-line"></div>
        <div class="colors-wrap">
          <div v-for="(color, index) in orderInfo.colorCardList" class="item" :class="{'odd': index%2 == 0 }">
            <div class="h4">色卡{{index + 1}}
              <div class="op">
                <span v-if="color.editFlag" @click="editColor(color)" style="color: #FA9D3B;">保存</span>
                <span v-if="color.editFlag" @click="color.editFlag=false">取消</span>
                <span v-if="!color.editFlag" @click="editColor(color)">编辑</span>
                <span @click="deleteColor(color,item)">删除</span>
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
                <img :src="`http://www.soouya.com` + currentImage" alt="原色卡图片" width="100%">
              </template>
              <template v-if="!currentImage&&orderInfo.colorCardList[currentIndex].imgUrls.length>0">
                <img :src="`http://www.soouya.com` + orderInfo.colorCardList[currentIndex].imgUrls[0]" alt="原色卡图片" width="100%">
              </template>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p p20">
        <h6>换卡头信息</h6>
        <div class="d-line"></div>
        <div class="card-add-btn">
          <el-button type="primary" @click.native="newCard()" icon="plus">新增卡头</el-button>
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
    <el-dialog title="增加色卡图片" :visible.sync="addImgVisible">
      <ul class="color-img">
        <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="showImgs" v-for="(item, index) in showImgs" v-bind:data="`商品` + cindex">
              <span class="del" @click="delImg(index)">X</span>                      
              <img :src="`http://www.soouya.com` + item" alt="找版图片" width="100" height="100">
                    </a>
        <el-upload action="/redwood/sys/Common/uploadFile.do?type=6" width="60" :show-file-list="false" class="upload upload-icon" :on-success="handleuploadImg" :before-upload="beforeUploadImgs" v-if="showImgs.length < 9" select>
          <i class="el-icon-plus"></i>
        </el-upload>
        </el-upload>
      </ul>
    </el-dialog>
    <el-dialog title="搜索档口" :visible.sync="checkShopVisible">
      <div class="oms-content">
        <div class="search-content p0 m0">
          <div class="row">
            <div class="item w360 ml0">
              <el-input placeholder="请输入档口名称" icon="search" v-model="shop" :maxlength="50" @keydown.enter.native="search" :on-icon-click="search">
              </el-input>
            </div>
            <el-button type="primary" @click="handleNewShop()" v-if="noShop">对搜索结果不满意</el-button>
          </div>
        </div>
      </div>
      <div class="main-wrap pl0 m0 bsn pb0">
        <div class="main-content">
          <div class="table-wrap">
            <table class="table" v-if="shopList.length">
              <colgroup>
                <col width="12%">
                <col width="23%">
                <col width="15%">
                <col width="20%">
                <col width="15%">
              </colgroup>
              <thead>
                <tr>
                  <th>供应商ID</th>
                  <th>档口名称</th>
                  <th>档口所在地区</th>
                  <th>档口详细地址</th>
                  <th>档口电话</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in shopList" :key="index">
                  <td>{{item.sellerNumber}}</td>
                  <td class="ta-l">{{item.company}}</td>
                  <td class="ta-l">{{item.province}}{{item.city}}{{item.area}}</td>
                  <td class="ta-l">{{item.addr}}</td>
                  <td>{{item.tel}}</td>
                  <td>
                    <el-button class="table-btn" @click.natove="selectShop(item)">选择</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="新增供应商" size="tiny" v-model="addnewShopVisible">
      <div style="margin-left:50px;">
        <el-form label-width="80px" label-position="right" :rules="shopRules" :model="reqShopParams" ref="reqShopParams">
          <el-form-item label="档口名" prop="company">
            <el-input style="width:220px" v-model="reqShopParams.company" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="电话类型">
            <el-radio-group label="电话类型" v-model="reqShopParams.telType">
              <el-radio :label="1">手机</el-radio>
              <el-radio :label="2">固话</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="reqShopParams.telType == 2" class="clearfix">
            <label for="addr" class="el-form-item__label" style="width: 80px;margin-left:-80px"><span style="color: #ff4949;margin-right: 4px;">*</span>档口电话</label>
            <el-form-item prop="areaCode" style="width: 100px;float:left">
              <el-input style="width:80px" v-model="reqShopParams.areaCode" :maxlength="4"></el-input>
            </el-form-item>
            <el-form-item prop="phone" style="float:left">
              <el-input style="width:150px" v-model="reqShopParams.phone" :maxlength="8"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="手机号" prop="tel" v-if="reqShopParams.telType == 1" required>
            <el-input style="width:220px" v-model="reqShopParams.tel" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="省市区" required>
            <y-address :province="reqShopParams.province " :city="reqShopParams.city " :area="reqShopParams.area" @change="handleNewShopSelection" />
          </el-form-item>
          <el-form-item label="详细地址" prop="addr">
            <el-input v-model="reqShopParams.addr" style="width:220px" :maxlength="50"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <footer style="padding-left:25%;margin-top:20px;">
        <el-button type="primary" size="small" @click.native="handleSaveNewShop('reqShopParams')" :disabled="checkOutInput()">保存</el-button>
      </footer>
    </el-dialog>
    <lightbox />
    <head-card v-if="$store.state.b.popLoad" :title="cardMenuTitle" :orderInfo="orderInfo" :cardInfo="cardMenuData" :orderNumber="orderNumber" @saveHeadChange="saveHeadChange"></head-card>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import YAddress from 'components/y-address/index'
import headCard from './headCardInput'
import {
  request
} from 'utils/request'
import {
  getOffset,
  formatTimeString,
  newRequest
} from 'utils/tool'
export default {
  components: {
    Lightbox,
    'head-card': headCard,
    'y-address': YAddress
  },
  data() {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'));
      } else {
        setTimeout(() => {
          var reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        }, 300);
      }
    }
    var checkAreaCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('区号不能为空'));
      } else {
        setTimeout(() => {
          var reg = /^0\d{2,3}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的区号'));
          } else {
            callback();
          }
        }, 300);
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('电话不能为空'));
      } else {
        setTimeout(() => {
          var reg = /^\d{7,8}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的电话号码'));
          } else {
            callback();
          }
        }, 300);
      }
    }
    return {
      show: false,
      dialogVisible: false,
      currentImage: '',
      orderNumber: '',
      orderInfo: null,
      needInfo: null,
      originalColorList: {},
      cardMenuTitle: '',
      cardMenuData: {},
      currentColor: null,
      editCurrentCard: {},
      productType: [{ name: '面料', value: 1 }, { name: '辅料', value: 2 }],
      loading: false,
      btnClass: '',
      imgPopStyle: '',
      currentImageList: [],
      currentIndex: 0,
      editRowIndex: -1,
      dom: null,
      checkAll: false,
      addImgVisible: false,
      showImgs: [],
      addNewIndex: null,
      addNew: false,
      checkShopVisible: false,
      addnewShopVisible: false,
      shop: null,
      shopIndex: null,
      shopList: [],
      noShop: false,
      reqShopParams: { // 新增供应商
        company: '',
        telType: 1,
        tel: '',
        areaCode: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        addr: '',
        check: 1
      },
      shopRules: {
        company: [{
          required: true,
          trigger: 'blur',
          message: '档口名不能为空'
        }],
        areaCode: [
          { validator: checkAreaCode, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        tel: [
          { validator: checkTel, trigger: 'blur' }
        ],
        addr: [{
            required: true,
            trigger: 'blur',
            message: '详细地址不能为空'
          },
          {
            min: 5,
            max: 50,
            trigger: 'blur',
            message: '请至少输入五字数详细地址'
          }
        ]
      },
      // isEdit: false
    }
  },
  mounted() {
    this.orderNumber = this.$route.query.id
    this.getData()
  },
  filters: {
    formatTime(val) {
      return formatTimeString(val)
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
    getData() {
      this.originalColorList = {}
      this.$store.dispatch('changeload', true)
      //
      request('/redwood/find/getDetail', {
        method: 'GET',
        data: {
          orderNumber: this.orderNumber,
          time: +new Date()
        }
      }).then(response => {
        this.$store.dispatch('changeload', false)
        if (response.success == '1') {
          // 判断订单是否可以换卡头
          if (response.obj.changeCard != 1) {
            this.$msgbox({
              title: '提示',
              message: '对不起，该订单设置为不换卡，不能进行编辑',
              confirmButtonText: '确定',
              beforeClose: (action, instance, done) => {
                if (action == 'confirm') {
                  this.$router.back()
                  done && done()
                }
              }
            }).then(action => {})
            return false
          }
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
      let findTypeList = ['找相同', '找类似', '找定做']
      let worthList = { 1: '普通', 8: '中', 16: '高' }
      let findTypeDescList = []
      // if (this.orderInfo.changeColorCardList && this.orderInfo.changeColorCardList.length > 0) {
      //   this.isEdit = true
      // }
      delete this.orderInfo.need
      if (this.orderInfo && this.orderInfo.id != undefined) {
        this.orderInfo.productTypeDesc = this.orderInfo.productType == 1 ? '面料' : '辅料'
        this.orderInfo.changeCardDesc = this.orderInfo.changeCard == 1 ? '是' : '否'
        this.orderInfo.haveRealVersionDesc = this.orderInfo.haveRealVersion > 0 && this.orderInfo.haveRealVersion == 1 ? '有实版' : '无实版'
        this.orderInfo.worthDesc = worthList[this.orderInfo.worth]
        for (let i = 0; i < 3; i++) {
          if ((Number(this.orderInfo.findType) & Math.pow(2, i)) === Math.pow(2, i)) {
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
          this.originalColorList[color.id] = color;
          this.originalColorList[color.id]['originalProductNumber'] = color.productNumber // 原货号
          this.originalColorList[color.id]['originalColorNumber'] = '色卡' + String(index + 1)
          this.originalColorList[color.id]['originalShopCompany'] = color.shopCompany
          this.originalColorList[color.id]['originalSourceId'] = color.sourceId
          color.productTypeDesc = color.productType == 1 ? '面料' : '辅料'
          color.productSourceDesc = color.productSource == 0 ? '现货' : '订货'
          color.price = color.price && !Number.isInteger(color.price) ? Number(color.price).toFixed(2) : color.price
          if (!color.replyWidthUnit) {
            color.replyWidthUnit = 'cm'
          }
          if (!color.replyWeigthUnit) {
            color.replyWeigthUnit = 'g/m²'
          }
          color.metrePerKilo = color.metrePerKilo && !Number.isInteger(color.metrePerKilo) ? parseFloat(color.metrePerKilo).toFixed(2) : color.metrePerKilo
          if (color.imgUrls.length > 0) {
            for (let i = 0; i < color.imgUrls.length; i++) {
              color.imgUrls[i] = color.imgUrls[i].replace(/\[\]/ig, '').replace(/"/ig, '');
              // color.imgUrls[i] = JSON.parse(color.imgUrls[i]);
              // if (color.imgUrls[i].length > 0) {
              //   color.imgUrls[i] = color.imgUrls[i][0].replace('"', '')
              // } else {
              //   color.imgUrls[i] = color.imgUrls[i].replace('"', '')
              // }
            }
          }
          this.$set(color, 'editFlag', false);
          this.$set(color, 'editTxt', '编辑');
          color.imgPop = false
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
            let imgArr = JSON.parse(JSON.stringify(color.imgUrls))
            color.imgUrls = []
            color.imgUrls = imgArr.map((item) => {
              return item + '?' + (+new Date())
            })
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
      } else {
        this.btnClass = 'is-disabled'
      }
    },
    addImg_v1(index, val) {
      this.currentIndex = index;
      this.dialogVisible = true;
    },
    addImg(index, val) {
      this.addNewIndex = index;
      this.addNew = val;
      if (index) {
        this.showImgs = JSON.parse(JSON.stringify(this.orderInfo.colorCardList[index].imgUrls))
      } else {
        this.showImgs = JSON.parse(JSON.stringify(this.orderInfo.colorCardList[this.editRowIndex].imgUrls))
      }
      this.addImgVisible = true;
    },
    delImg(index) {
      this.showImgs.splice(index, 1)
      if (this.addNew) {
        this.orderInfo.colorCardList[this.addNewIndex].imgUrls.splice(index, 1)
      } else {
        this.orderInfo.colorCardList[this.editRowIndex].imgUrls.splice(index, 1)
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
        this.showImgs.push(response.imgUrl)
        if (this.addNew) {
          this.orderInfo.colorCardList[this.addNewIndex].imgUrls.push(response.imgUrl)
        } else {
          this.orderInfo.colorCardList[this.editRowIndex].imgUrls.push(response.imgUrl)
        }
      }
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
    addColor() {
      var obj = {
        shopCompany: null,
        shopTel: null,
        shopFullAddress: null,
        imgUrls: [],
        editFlag: true,
        productTypeDesc: '面料',
        subProductType: null,
        productNumber: null,
        title: null,
        replyWidth: null,
        replyWidthUnit: 'cm',
        replyWeigth: null,
        replyWeigthUnit: 'g/m²',
        kongCha: null,
        zhiTong: null,
        metrePerKilo: null,
        productSourceDesc: '现货',
        price: null,
        priceUnit: '元/米',
        sellerMessage: null,
        editTxt: '保存'
      }
      this.orderInfo.colorCardList.push(obj)
    },
    checkShop(index) {
      this.checkShopVisible = true;
      this.shopIndex = index
    },
    search() {
      newRequest({
        url: '/soouya/v1/shop',
        method: 'get',
        data: {
          key: this.shop
        }
      }).then((res) => {
        if (res.success == 1) {
          this.shopList = res.page.result
          this.noShop = true
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    handleNewShop() {
      this.addnewShopVisible = true;
      this.reqShopParams.company = '';
      this.reqShopParams.telType = 1;
      this.reqShopParams.tel = '';
      this.reqShopParams.areaCode = '';
      this.reqShopParams.phone = '';
      this.reqShopParams.addr = '';
      this.reqShopParams.province = '';
      this.reqShopParams.city = '';
      this.reqShopParams.area = '';
      this.checkShopVisible = false;
    },
    // 选择省市区的处理 新增
    handleNewShopSelection(val) {
      this.reqShopParams.province = val.province
      this.reqShopParams.city = val.city
      this.reqShopParams.area = val.area
    },
    // 点击新增/编辑保存按钮
    handleSaveNewShop(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.reqShopParams.telType == 1) {
          newRequest({
            url: '/soouya/ziying/shop',
            contentType: 'application/json',
            data: this.reqShopParams,
            method: 'post',
          }).then((res) => {
            if (res.success == 1) {
              this.shop = ''
              this.noShop = false
              this.shopList = []
              this.$message.success(res.msg)
              this.addShopId = res.obj.id
              this.addnewShopVisible = false;
              this.shopIndex
            } else {
              this.$message.error(res.msg)
            }
          })
        }
        if (valid && this.reqShopParams.telType == 2) {
          this.reqShopParams.tel = this.reqShopParams.areaCode + '-' + this.reqShopParams.phone
          newRequest({
            url: '/soouya/ziying/shop',
            contentType: 'application/json',
            data: this.reqShopParams,
            method: 'post',
          }).then((res) => {
            if (res.success == 1) {
              this.$message.success(res.msg)
              this.addShopId = res.obj.id
              this.shop = ''
              this.noShop = false
              this.shopList = []
              this.addnewShopVisible = false;
              this.orderInfo.colorCardList[this.shopIndex].shopId = res.obj.id
              this.orderInfo.colorCardList[this.shopIndex].shopCompany = res.obj.company
              this.orderInfo.colorCardList[this.shopIndex].shopFullAddress = res.obj.province + res.obj.city + res.obj.area + res.obj.addr
              this.orderInfo.colorCardList[this.shopIndex].shopTel = res.obj.tel
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    checkOutInput() {
      let flag = true
      if (this.reqShopParams.province &&
        this.reqShopParams.city &&
        this.reqShopParams.city != '请选择') {
        flag = false
      } else {
        flag = true
      }
      return flag
    },
    selectShop(row) {
      this.orderInfo.colorCardList[this.shopIndex].shopId = row.id
      this.orderInfo.colorCardList[this.shopIndex].shopCompany = row.company
      this.orderInfo.colorCardList[this.shopIndex].shopFullAddress = row.province + row.city + row.area + row.addr
      this.orderInfo.colorCardList[this.shopIndex].shopTel = row.tel
      this.checkShopVisible = false
      this.shop = ''
      this.noShop = false
      this.shopList = []
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
        data: { colorCardList: this.orderInfo.changeColorCardList, createOrUpdate: 1, orderNumber: this.orderInfo.orderNumber },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        that.loading = false
        this.$message({
          type: response.success == '1' ? 'success' : 'error',
          message: response.msg,
          duration: 1500,
          onClose: function() {
            if (response.success == '1') {
              that.$router.push({ name: 'cardManage' })
            }
          }
        })
      })
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
        // 对数据进行处理
        // for (let a in row) {
        //   if (!isNaN(Number(row[a])) && Number(row[a]) < 0) {
        //     row[a] = Number(row[a])
        //   }
        // }
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
    newCard() {
      var flag = true
      this.orderInfo.colorCardList.forEach((item, index) => {
        if (item.subProductType == null) {
          this.$message({
            type: 'error',
            message: `请填写色卡${index + 1}的品类`,
            duration: 1500
          })
          flag = false
        }
        if (item.productNumber == null) {
          this.$messag.error('请填写货号')
          flag = false
        }
        //  if (item.subProductType != null && item.productNumber != null) {
        //      this.$store.dispatch('changePopLoad', true)
        //   }
      })
      if (!flag) {
        return false
      }
      this.cardMenuData = {}
      this.cardMenuTitle = '换卡头'
      this.editCurrentCard = {}
      this.$store.dispatch('changePopLoad', true)
    },
    editCard(row) {
      console.log(row)
      this.cardMenuData = row
      this.cardMenuTitle = '编辑'
      this.editCurrentCard = row
      this.$store.dispatch('changePopLoad', true)
    },
    back() {
      this.$router.back()
    },
    openBox(img, index) {
      this.addNew = false;
      this.dialogVisible = true;
      if (this.editRowIndex == -1) {
        this.editRowIndex = index
        this.orderInfo.colorCardList.forEach((color) => { color.imgPop = false })
        let pos = getOffset(this.$refs['imgBox_' + index][0])
        this.currentImageList = img
        this.orderInfo.colorCardList[index].imgPop = true
        this.imgPopStyle = 'left:' + (pos.left - 300) + 'px; top: ' + (pos.top - 450) + 'px;'

        this.$refs.imgPopBox.addEventListener('scroll', this.scrollDiv)
        // 鼠标移动
        window.addEventListener('mousemove', this.mouseEvent)
        this.$refs.imgPopBox.addEventListener('mousedown', this.mouseEvent)
        this.$refs.imgPopBox.addEventListener('mouseup', this.mouseEvent)
      } else {
        this.orderInfo.colorCardList[index].imgPop = false
        this.currentImageList = []
        this.currentIndex = 0
        this.editRowIndex = -1
        this.dom = null
      }
      // console.log(img)
    },
    prev() {
      if (this.currentIndex == 0) {
        return false
      }
      this.currentIndex -= 1
    },
    next() {
      if (this.currentIndex == (this.currentImageList.length - 1)) {
        return false
      }
      this.currentIndex += 1
    },
    scrollDiv() {
      if (this.$refs.buttonDiv) {
        let left = this.$refs.imgPopBox.scrollLeft
        this.$refs.buttonDiv.style.left = left + 'px'
      }
    },
    closeDiv() {
      this.orderInfo.colorCardList[this.editRowIndex].imgPop = false
      this.currentImageList = []
      this.currentIndex = 0
      this.editRowIndex = -1
      this.dom = null
    },
    mouseEvent(event) {
      switch (event.type) {
        case 'mousedown':
          if (!this.dom) {
            this.dom = this.$refs.imgPopBox
          }
          break;
        case 'mousemove':
          if (this.dom) {
            const width = window.scrollX + window.screen.width
            const height = window.scrollTop + window.screen.height

            this.dom.style.left = event.clientX + 'px'
            this.dom.style.top = event.clientY + 'px'
            let top = Number(this.dom.style.top.replace('px', ''))
            let left = Number(this.dom.style.left.replace('px', ''))
            console.log(left)
            if (top < 0) {
              this.dom.style.top = '0px'
            }
            if (left < 0) {
              this.dom.style.left = '0px'
            }
            if (left > width - this.dom.offsetWidth - 30) {
              this.dom.style.left = (width - this.dom.offsetWidth - 10) + 'px'
            }
            if (top > height - this.dom.offsetHeight) {
              this.dom.style.top = (height - this.dom.offsetHeight - 10) + 'px'
            }
          }
          break;
        case 'mouseup':
          if (this.dom) {
            this.dom.style.left = (event.clientX - this.dom.style.offsetLeft - this.dom.style.offsetWidth / 2) + 'px'
            this.dom.style.top = (event.clientY - this.dom.style.offsetTop - this.dom.style.offsetHeight / 2) + 'px'
            this.dom = null
          }
          break;
      }
    },
    saveHeadChange(formData, isEdit) {
      // delete formData.originalColorNumber
      // delete formData.imgUrlsList
      // if (isEdit) {
      //   this.editCurrentCard = Object.assign(this.editCurrentCard, formData)
      // } else {
      //   let original = this.originalColorList[formData.sourceId]
      //   let data = Object.assign({}, original, formData)
      //   if (!isEdit) {
      //     delete data['id']
      //   }
      //   this.btnClass = ''
      //   this.orderInfo.changeColorCardList.push(data)
      // }
      this.getData()
      this.$store.dispatch('changePopLoad', false)
    },
    alert(msg, type) {
      this.$message({
        type: type || 'error',
        message: msg,
        duration: 1500
      })
    }
  }
}

</script>
<style lang="scss">
.el-textarea textarea {
  width: 100% !important;
}

.sellerMessage {
  width: 80px;
  textarea {
    width: 80px !important;
  }
}

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

      .main {
        position: relative;

        .label-title {
          display: inline-block;
          margin-right: 10px;
          vertical-align: top;
        }

        .label-content {
          // display: inline-block;
        }
      }

      .image-pop-dialog {
        position: absolute;
        z-index: 1000;
        width: 600px;
        height: 450px;
        overflow: scroll;
        border: 1px solid #ccc;
        background-color: #fff;

        .image-button {
          position: relative;
          text-align: center;
        }
      }

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
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
}

.color-img {
  height: 100px;
  a {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    position: relative;
    float: left;
    margin-bottom: 10px;
    .del {
      position: absolute;
      display: inline-block;
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 15px;
      border-radius: 50%;
      background: #ddd;
      font-size: 12px;
      color: white;
      top: -5px;
      right: -5px;
    }
  }
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
