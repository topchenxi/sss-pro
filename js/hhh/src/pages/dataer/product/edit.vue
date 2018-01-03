<template>
  <div class="detail product-detail" v-loading="loading" element-loading-text="提交中">
    <div class="detail-title">
      <span @click="back"></span>
      <p>{{update?'编辑':'新增商品'}}</p>
    </div>
    <div class="find-detail">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <div class="detail-group" v-if="update">
          <div class="detail-item w100p">
            <h5 class="title">换卡头供应商：{{company}}</h5>
          </div>
        </div>
        <div class="detail-group" v-if="!update">
          <div class="detail-item w100p">
            <h5 class="title">换卡头供应商：</h5>
            <div class="p20">
              <el-button type="primary" icon="check" :class="item.check ?'check':''" v-for="(item,index) in companyOptions" @click="changeCompany(index)">{{item.company}}
                <span class="round"></span>
              </el-button>
            </div>
          </div>
        </div>
        <div class="detail-group">
          <div class="detail-item w100p p20">
            <h6>供应商信息</h6>
            <div class="d-line"></div>
            <dl class="info-item" v-if="soouya == 1">
              <dt><span class="red">*</span> 供应商名称：</dt>
              <dd>
                <el-form-item prop="sellerServiceNumber">
                  <span class="mr30">{{form.shopCompany}}</span>
                  <el-button @click="openSearch()" type="primary" v-if="form.shopCompany">更换供应商</el-button>
                  <el-button @click="openSearch()" type="primary" v-else>请选择</el-button>
                </el-form-item>
                <ul class="product-seller-info" v-if="form.sellerNumber">
                  <li>供应商ID : <span>{{form.sellerNumber || '--'}}</span></li>
                  <li>供应商编号 : <span>{{form.sellerServiceNumber || '--'}}</span></li>
                  <li>供应商电话 : <span>{{form.shopTel || '--'}}</span></li>
                  <li>供应商地址 : <span>{{form.shopProvince}}{{form.shopCity}}{{form.shopArea}}{{form.shopAddr}}</span></li>
                </ul>
              </dd>
            </dl>
            <dl class="info-item">
              <dt><span class="red">*</span>原货号：</dt>
              <dd>
                <el-form-item prop="shopOriginalNumber" class="w200">
                  <el-input v-model="form.shopOriginalNumber"></el-input>
                </el-form-item>
              </dd>
            </dl>
            <dl class="info-item">
              <dt>原商品图片：</dt>
              <dd>
                <div class="imge-array">
                  <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls">
                  <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" />
                  <span class="round" @click="delShopImgUrls(index)" v-if="!update">X</span>
                </a>
                </div>
                <upload :img-urls="shopOriginalImgUrls" :img-array="imgArray" v-if="shopOriginalImgUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
              </dd>
            </dl>
            <dl class="info-item">
              <dt>原色卡图片：</dt>
              <dd>
                <div class="imge-array">
                  <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls">
                  <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" />
                  <span class="round" @click="delShopColorImgUrls(index)" v-if="!update">X</span>
                </a>
                </div>
                <upload :img-urls="shopOriginalColorUrls" :img-array="imgArray" v-if="shopOriginalColorUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
              </dd>
            </dl>
          </div>
        </div>
        <!-- <div class="company-msg">
          <div class="row">
            <h4 class="title">供应商信息</h4>
          </div>
          <div class="row" v-if="soouya == 1">
            <div class="row-left">
              <h5 class="side-left-label">
                <span>*</span>供应商名称: </h5>
            </div>
            <div class="row-right">
              <el-form-item prop="sellerServiceNumber">
                <span>{{form.shopCompany}}</span>
                <el-button @click="openSearch()" type="text" v-if="form.shopCompany">更换供应商</el-button>
                <el-button @click="openSearch()" type="text" v-else>请选择</el-button>
              </el-form-item>
            </div>
          </div>
          <div class="row shop" v-if="form.sellerNumber">
            <span>供应商ID：{{form.sellerNumber}}</span>
            <span>供应商编号：{{form.sellerServiceNumber}}</span>
            <span>档口地址：{{form.shopProvince}}{{form.shopCity}}{{form.shopArea}}{{form.shopAddr}}</span>
            <span>档口电话：{{form.shopTel}}</span>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">
                <span>*</span>供应商原货号: </h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="3">
                  <el-form-item prop="shopOriginalNumber">
                    <el-input v-model="form.shopOriginalNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-img-label">供应商原商品图片: </h5>
            </div>
            <div class="row-right" style="margin-bottom:15px;">
              <div class="imge-array">
                <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls">
                  <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" />
                  <span class="round" @click="delShopImgUrls(index)" v-if="!update">X</span>
                </a>
              </div>
              <upload :img-urls="shopOriginalImgUrls" :img-array="imgArray" v-if="shopOriginalImgUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-img-label">供应商原色卡图片: </h5>
            </div>
            <div class="row-right">
              <div class="imge-array">
                <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls">
                  <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" />
                  <span class="round" @click="delShopColorImgUrls(index)" v-if="!update">X</span>
                </a>
              </div>
              <upload :img-urls="shopOriginalColorUrls" :img-array="imgArray" v-if="shopOriginalColorUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
            </div>
          </div>
        </div> -->
        <div class="detail-group">
          <div class="detail-item w100p p20">
            <h6>基本信息</h6>
            <div class="d-line"></div>
            <dl class="info-item">
              <dt>商品编码：</dt>
              <dd>
                <el-form-item> <span>{{code}}</span> </el-form-item>
              </dd>
            </dl>
            <dl class="info-item">
              <dt>品名：</dt>
              <dd>
                <el-form-item prop="title" class="w200">
                  <el-input v-model="form.title"></el-input>
                </el-form-item>
              </dd>
            </dl>
            <dl class="info-item">
              <dt><span class="red">*</span>品类：</dt>
              <dd>
                <el-button class="single-button" type="primary" icon="check" :class="item.check ?'check':''" v-for="(item,index) in type" @click="changeType(index)" v-if="!update">{{item.value}} <span class="round"></span> <span class="del" v-if="item.type == 1" @click.stop="delType(index)">X</span> </el-button>
                <el-button type="primary" icon="plus" class="custom" @click="addCustom('type')" v-if="!update">自定义输入</el-button> <span v-if="update">{{form.type}}</span> </dd>
            </dl>
            <dl class="info-item">
              <dt><span class="red">*</span>货号：</dt>
              <dd>
                <el-form-item prop="number" class="w200">
                  <el-input v-model="form.number"></el-input>
                </el-form-item>
              </dd>
            </dl>
            <dl class="info-item">
              <dt>商品图片：</dt>
              <dd>
                <div class="imge-array"> <a :href="imageDomain +item.imgUrl" v-lightbox="imgUrls" v-for="(item, index) in imgUrls"> <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" /> <span class="round" @click="delImgUrls(index)" v-if="!update">X</span> </a> </div>
                <upload :img-urls="imgUrls" :img-array="imgArray" v-if="imgUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
              </dd>
            </dl>
            <dl class="info-item">
              <dt><span class="red" v-if="soouya == 1">*</span>色卡图片：</dt>
              <dd>
                <div class="imge-array"> <a :href="imageDomain +item.imgUrl" v-lightbox="colorUrls" v-for="(item, index) in colorUrls"> <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" /> <span class="round" @click="delColorUrls(index)" v-if="!update">X</span> </a> </div>
                <upload :img-urls="colorUrls" :img-array="imgArray" v-if="colorUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
              </dd>
            </dl>
          </div>
        </div>
        <div class="detail-group">
          <div class="detail-item w100p p20">
            <h6>属性参数</h6>
            <div class="d-line"></div>
            <div class="property">
              <div class="row">
                <div class="row-left">
                  <h5 v-if="soouya != 1" class="side-left-tip-label"> <span>*</span>织法：</h5>
                  <h5 v-else class="side-left-tip-label">织法：</h5> </div>
                <div class="row-right"> <span :class="['btn-tip', item.check ? 'check' : '']" v-for="(item, index) in structures" @click="structuresCheck(index)">{{item.value}} <small class="round" v-if="item.type == 1" @click.stop="delStructure(index)">X</small> <span v-show="item.check" @click.stop="cancelStructuresCheck(index)"> <a href="javascript:;"> <i class="el-icon-check"></i> </a> </span> </span>
                  <el-button type="primary" icon="plus" class="custom" @click="addCustom('structure')">自定义输入</el-button> <img src="~assets/goods-up.png" alt="" style="margin-left:20px" v-if="form.ownStatus == 1 && !update"> </div>
              </div>
              <div class="row" v-if="structuresError && soouya == 0">
                <div class="row-left">
                  <h5> </h5> </div>
                <div class="row-right"> <span style="color: #ff4949;font-size: 12px;">织法必选</span> </div>
              </div>
              <div class="row">
                <div class="row-left">
                  <h5 class="side-left-tip-label">用途：</h5> </div>
                <div class="row-right"> <span :class="['btn-tip', item.check ? 'check' : '']" v-for="(item, index) in usages" @click="usagesCheck(index)">{{item.value}} <small class="round" v-if="item.type == 1" @click.stop="delUsage(index)">X</small> <span v-show="item.check" @click.stop="item.check = false"> <a href="javascript:;"> <i class="el-icon-check"></i> </a> </span> </span>
                  <el-button type="primary" icon="plus" class="custom" @click="addCustom('usage')">自定义输入</el-button>
                </div>
              </div>
              <div class="row">
                <div class="row-left">
                  <h5 class="side-left-label">成分：</h5> </div>
                <div class="row-right">
                  <el-row>
                    <el-col :span="3">
                      <el-form-item prop="composition">
                        <el-input v-model="form.composition"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="row">
                <div class="row-left">
                  <h5 class="side-left-label">幅宽：</h5> </div>
                <div class="row-right">
                  <div class="unit">
                    <el-row>
                      <el-col :span="3">
                        <el-form-item prop="width">
                          <el-input v-model="form.width" style="float:left" :maxlength="50"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2" class="ml10">
                        <el-form-item prop="widthUnit">
                          <el-select v-model="form.widthUnit">
                            <el-option label="cm" value="cm"></el-option>
                            <el-option label="〃" value="〃"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="row-left">
                  <h5 class="side-left-label">克重：</h5> </div>
                <div class="row-right">
                  <div class="unit">
                    <el-row>
                      <el-col :span="3">
                        <el-form-item prop="weight">
                          <el-input v-model="form.weight" style="float:left" :maxlength="50"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2" class="ml10">
                        <el-form-item prop="weightUnit">
                          <el-select v-model="form.weightUnit">
                            <el-option label="g/㎡" value="g/㎡"></el-option>
                            <el-option label="安" value="安"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="row-left">
                  <h5 class="side-left-label">空差：</h5> </div>
                <div class="row-right">
                  <el-row>
                    <el-col :span="3">
                      <el-form-item prop="shortWeight">
                        <el-input v-model="form.shortWeight"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="row">
                <div class="row-left">
                  <h5 class="side-left-label">纸筒：</h5> </div>
                <div class="row-right">
                  <el-row>
                    <el-col :span="3">
                      <el-form-item prop="paperTube">
                        <el-input v-model="form.paperTube"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="row">
                <div class="row-left">
                  <h5 class="side-left-label">公斤出米数：</h5> </div>
                <div class="row-right">
                  <el-row>
                    <el-col :span="3">
                      <el-form-item prop="metrePerKilo">
                        <el-input v-model="form.metrePerKilo"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2"> <span style="display:inline-block;margin-left:4px;line-height: 36px;">米/公斤</span> </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="basic-msg">
          <div class="row">
            <h4 class="title" style="padding-top:15px;margin-top:0">基本信息</h4>
          </div>
          <div class="row" v-if="update">
            <div class="row-left">
              <h5>商&nbsp;品&nbsp;编&nbsp;码：</h5>
            </div>
            <div class="row-right">
              <el-form-item>
                <span>{{code}}</span>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">
                <span></span>品
                名：</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="3">
                  <el-form-item prop="title">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-tip-label">
                <span>*</span>品
                类：</h5>
            </div>
            <div class="row-right">
              <el-button class="single-button" type="primary" icon="check" :class="item.check ?'check':''" v-for="(item,index) in type" @click="changeType(index)" v-if="!update">{{item.value}}
                <span class="round"></span>
                <span class="del" v-if="item.type == 1" @click.stop="delType(index)">X</span>
              </el-button>
              <el-button type="primary" icon="plus" class="custom" @click="addCustom('type')" v-if="!update">自定义输入</el-button>
              <span v-if="update" style="line-height: 36px;font-size: 14px;">{{form.type}}</span>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">
                <span>*</span>货
                号：</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="3">
                  <el-form-item prop="number">
                    <el-input v-model="form.number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-img-label">商&nbsp;品&nbsp;图&nbsp;片：</h5>
            </div>
            <div class="row-right" style="margin-bottom:15px;">
              <div class="imge-array">
                <a :href="imageDomain +item.imgUrl" v-lightbox="imgUrls" v-for="(item, index) in imgUrls">
                  <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" />
                  <span class="round" @click="delImgUrls(index)" v-if="!update">X</span>
                </a>
              </div>
              <upload :img-urls="imgUrls" :img-array="imgArray" v-if="imgUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 v-if="soouya == 1" class="side-left-img-label">色&nbsp;卡&nbsp;图&nbsp;片：</h5>
              <h5 v-else style="letter-spacing:1px" class="side-left-img-label">
                <span>*</span>色卡图片：</h5>
            </div>
            <div class="row-right">
              <div class="imge-array">
                <a :href="imageDomain +item.imgUrl" v-lightbox="colorUrls" v-for="(item, index) in colorUrls">
                  <img :src="imageDomain + item.imgUrl + '@70w_70h_90Q'" width="70px" height="70px" style="cursor:pointer" />
                  <span class="round" @click="delColorUrls(index)" v-if="!update">X</span>
                </a>
              </div>
              <upload :img-urls="colorUrls" :img-array="imgArray" v-if="colorUrls.length < 9 && !update" @click.native="clearImgArray"> </upload>
            </div>
          </div>
        </div> -->
        <!-- <div class="property">
          <div class="row">
            <h4 class="title">属性参数</h4>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 v-if="soouya != 1" class="side-left-tip-label">
                <span>*</span>织
                法：</h5>
              <h5 v-else class="side-left-tip-label">织
                法：</h5>
            </div>
            <div class="row-right">
              <span :class="['btn-tip', item.check ? 'check' : '']" v-for="(item, index) in structures" @click="structuresCheck(index)">{{item.value}}
                <small class="round" v-if="item.type == 1" @click.stop="delStructure(index)">X</small>
                <span v-show="item.check" @click.stop="cancelStructuresCheck(index)">
                  <a href="javascript:;">
                    <i class="el-icon-check"></i>
                  </a>
                </span>
              </span>
              <el-button type="primary" icon="plus" class="custom" @click="addCustom('structure')">自定义输入</el-button>
              <img src="~assets/goods-up.png" alt="" style="margin-left:20px" v-if="form.ownStatus == 1 && !update">
            </div>
          </div>
          <div class="row" v-if="structuresError && soouya == 0">
            <div class="row-left">
              <h5>
                
              </h5>
            </div>
            <div class="row-right">
              <span style="color: #ff4949;font-size: 12px;">织法必选</span>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-tip-label">用
                途：</h5>
            </div>
            <div class="row-right">
              <span :class="['btn-tip', item.check ? 'check' : '']" v-for="(item, index) in usages" @click="usagesCheck(index)">{{item.value}}
                <small class="round" v-if="item.type == 1" @click.stop="delUsage(index)">X</small>
                <span v-show="item.check" @click.stop="item.check = false">
                  <a href="javascript:;">
                    <i class="el-icon-check"></i>
                  </a>
                </span>
              </span>
              <el-button type="primary" icon="plus" class="custom" @click="addCustom('usage')">自定义输入</el-button>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">成
                分：</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="3">
                  <el-form-item prop="composition">
                    <el-input v-model="form.composition"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">幅
                宽：</h5>
            </div>
            <div class="row-right">
              <div class="unit">
                <el-row>
                  <el-col :span="3">
                    <el-form-item prop="width">
                      <el-input v-model="form.width" style="float:left" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-select v-model="form.widthUnit" class="select-number">
                      <el-option label="cm" value="cm"></el-option>
                      <el-option label="〃" value="〃"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">克
                重：</h5>
            </div>
            <div class="row-right">
              <div class="unit">
                <el-row>
                  <el-col :span="3">
                    <el-form-item prop="weight">
                      <el-input v-model="form.weight" style="float:left" :maxlength="50"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-select v-model="form.weightUnit" class="select-number">
                      <el-option label="g/㎡" value="g/㎡"></el-option>
                      <el-option label="安" value="安"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">空
                差：</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="3">
                  <el-form-item prop="shortWeight">
                    <el-input v-model="form.shortWeight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">纸
                筒：</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="3">
                  <el-form-item prop="paperTube">
                    <el-input v-model="form.paperTube"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-label">公斤出米数：</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="3">
                  <el-form-item prop="metrePerKilo">
                    <el-input v-model="form.metrePerKilo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span style="display:inline-block;margin-left:4px;line-height: 36px;">米/公斤</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div> -->
        <div class="detail-group">
          <div class="detail-item w100p p20">
            <h6>商品价格</h6>
            <div class="d-line"></div>
            <div class="goods-price">
              <div class="row">
                <span :class="['btn-tip', priceVisible.cutPrice ? 'check' : '']" @click="priceVisible.cutPrice = true">剪版
              <span v-show="priceVisible.cutPrice" @click.stop="priceVisible.cutPrice = false">
                <a href="javascript:;">
                  <i class="el-icon-check"></i>
                </a>
              </span>
                </span>
                <span :class="['btn-tip', priceVisible.price ? 'check' : '']" @click="priceVisible.price = true">大货
              <span v-show="priceVisible.price" @click.stop="priceVisible.price = false">
                <a href="javascript:;">
                  <i class="el-icon-check"></i>
                </a>
              </span>
                </span>
              </div>
              <div class="row" v-if="priceVisible.cutPrice">
                <div class="row-left">
                  <h5 class="side-left-tip-label">剪版</h5>
                </div>
                <div class="row-right">
                  <el-row>
                    <el-col :span="2">
                      <span class="find-price-label">价格单位： </span>
                    </el-col>
                    <el-col :span="2">
                      <el-select v-model="form.cutPriceUnit" placeholder="请选择" class="price-unit">
                        <el-option label="元/米" value="元/米"></el-option>
                        <el-option label="元/码" value="元/码"></el-option>
                        <el-option label="元/千克" value="元/千克"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2">
                      <span class="find-price-label">成&nbsp;本&nbsp;价：</span>
                    </el-col>
                    <el-col :span="2">
                      <el-form-item prop="cutCostPrice" class="short-item">
                        <el-input v-model="form.cutCostPrice"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2" class="ml10">
                      <span class="find-price-label">{{form.cutPriceUnit}}</span>
                    </el-col>
                    <el-col :span="2">
                      <span class="find-price-label"> 销&nbsp;售&nbsp;价：</span>
                    </el-col>
                    <el-col :span="2">
                      <el-form-item prop="cutPrice" class="short-item">
                        <el-input v-model="form.cutPrice"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2" class="ml10">
                      <span class="find-price-label">{{form.cutPriceUnit}}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="row" v-if="priceVisible.price">
                <div class="row-left">
                  <h5 class="side-left-tip-label">大货</h5>
                </div>
                <div class="row-right">
                  <el-row>
                    <el-col :span="2">
                      <span class="find-price-label">价格单位： </span>
                    </el-col>
                    <el-col :span="2">
                      <el-select v-model="form.priceUnit" placeholder="请选择" class="price-unit">
                        <el-option label="元/米" value="元/米"></el-option>
                        <el-option label="元/码" value="元/码"></el-option>
                        <el-option label="元/千克" value="元/千克"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2">
                      <span class="find-price-label">成&nbsp;本&nbsp;价：</span>
                    </el-col>
                    <el-col :span="2">
                      <el-form-item prop="costPrice" class="short-item">
                        <el-input v-model="form.costPrice"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2" class="ml10">
                      <span class="find-price-label">{{form.priceUnit}}</span>
                    </el-col>
                    <el-col :span="2">
                      <span class="find-price-label"> 销&nbsp;售&nbsp;价：</span>
                    </el-col>
                    <el-col :span="2">
                      <el-form-item prop="price" class="short-item">
                        <el-input v-model="form.price"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2" class="ml10">
                      <span class="find-price-label">{{form.priceUnit}}</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  <div class="goods-price">
          <div class="row">
            <h4 class="title">商品价格 </h4>
          </div>
          <div class="row">
            <span :class="['btn-tip', priceVisible.cutPrice ? 'check' : '']" @click="priceVisible.cutPrice = true">剪版
              <span v-show="priceVisible.cutPrice" @click.stop="priceVisible.cutPrice = false">
                <a href="javascript:;">
                  <i class="el-icon-check"></i>
                </a>
              </span>
            </span>
            <span :class="['btn-tip', priceVisible.price ? 'check' : '']" @click="priceVisible.price = true">大货
              <span v-show="priceVisible.price" @click.stop="priceVisible.price = false">
                <a href="javascript:;">
                  <i class="el-icon-check"></i>
                </a>
              </span>
            </span>
          </div>
          <div class="row" v-if="priceVisible.cutPrice">
            <div class="row-left">
              <h5 class="side-left-tip-label">剪版</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="2">
                  <span class="find-price-label">价格单位： </span>
                </el-col>
                <el-col :span="2">
                  <el-select v-model="form.cutPriceUnit" placeholder="请选择" class="price-unit">
                    <el-option label="元/米" value="元/米"></el-option>
                    <el-option label="元/码" value="元/码"></el-option>
                    <el-option label="元/千克" value="元/千克"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" :offset="1">
                  <span class="find-price-label">成&nbsp;本&nbsp;价：</span>
                </el-col>
                <el-col :span="2">
                  <el-form-item prop="cutCostPrice" class="short-item">
                    <el-input v-model="form.cutCostPrice"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span class="find-price-label">{{form.cutPriceUnit}}</span>
                </el-col>
                <el-col :span="3" :push="1">
                  <span class="find-price-label"> 销&nbsp;售&nbsp;价：</span>
                </el-col>
                <el-col :span="2">
                  <el-form-item prop="cutPrice" class="short-item">
                    <el-input v-model="form.cutPrice"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span class="find-price-label">{{form.cutPriceUnit}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row" v-if="priceVisible.price">
            <div class="row-left">
              <h5 class="side-left-tip-label">大货</h5>
            </div>
            <div class="row-right">
              <el-row>
                <el-col :span="2">
                  <span class="find-price-label">价格单位： </span>
                </el-col>
                <el-col :span="2">
                  <el-select v-model="form.priceUnit" placeholder="请选择" class="price-unit">
                    <el-option label="元/米" value="元/米"></el-option>
                    <el-option label="元/码" value="元/码"></el-option>
                    <el-option label="元/千克" value="元/千克"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" :offset="1">
                  <span class="find-price-label">成&nbsp;本&nbsp;价：</span>
                </el-col>
                <el-col :span="2">
                  <el-form-item prop="costPrice" class="short-item">
                    <el-input v-model="form.costPrice"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span class="find-price-label">{{form.priceUnit}}</span>
                </el-col>
                <el-col :span="3" :push="1">
                  <span class="find-price-label"> 销&nbsp;售&nbsp;价：</span>
                </el-col>
                <el-col :span="2">
                  <el-form-item prop="price" class="short-item">
                    <el-input v-model="form.price"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <span class="find-price-label">{{form.priceUnit}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div> -->
        <!-- <div class="other">
          <div class="row">
            <h4 class="title">其他</h4>
          </div>
          <div class="row">
            <div class="row-left">
              <h5 class="side-left-tip-label">备<span style="display:inline-block;width: 30px;"></span>注:</h5>
            </div>
            <div class="right">
              <el-row>
                <el-col :span="20">
                  <el-form-item prop="mark">
                    <el-input type="textarea" placeholder="请留下更具体的描述" @keyup.native="countWord" v-model="form.mark">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div> -->
        <div class="detail-group">
          <div class="detail-item w100p p20">
            <h6>其它</h6>
            <div class="d-line"></div>
            <dl class="info-item pl0">
              <dt style="min-width:10px;">备注：</dt>
              <dd>
                <el-form-item prop="mark">
                  <el-input type="textarea" placeholder="请留下更具体的描述" @keyup.native="countWord" v-model="form.mark">
                  </el-input>
                </el-form-item>
              </dd>
            </dl>
            <div class="row page-bottom ta-c mt20">
              <el-button type="default" @click="back">取消</el-button>
              <el-button type="primary" @click="saveAll('ruleForm')" v-if="update">保存</el-button>
              <el-button type="primary" @click="saveAll('ruleForm')" :disabled="isSave" v-else>保存</el-button>
            </div>
          </div>
        </div>
      </el-form>
      <el-dialog title="添加自定义内容" :visible.sync="customVisible" class="custom-dialog">
        <el-form :model="customData" :rules="rules" ref="customData">
          <el-form-item :label="customData.title" prop="name">
            <el-input v-model="customData.name" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveCustom('customData')">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择供应商" :visible.sync="checkCompanyVisable" class="search-dialog">
        <div class="search-header">
          <div class="el-input">
            <input type="text" placeholder="请输入档口名称" v-model="searchName" @keyup.enter="search">
            <span class="round" v-if="searchName" @click="clearSearch">X</span>
          </div>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <div class="search-area">
          <ul v-for="item in searchArr" @click="checkShop(item)">
            <li>供应商名称：{{item.company}}</li>
            <li>供应商电话：{{item.tel}}</li>
            <li>供应商地址：{{item.province}}{{item.city}}{{item.area}}{{item.addr}}</li>
          </ul>
        </div>
        <el-pagination @current-change="handleCurrentChange" :current-page="page.pageNumber" :page-size="10" layout="total, prev, pager, next, jumper" :total="page.totalCount" v-if="searchArr.length > 0">
        </el-pagination>
      </el-dialog>
    </div>
    <lightbox />
  </div>
</template>
<script>
import { newRequest } from 'utils/tool'
import Lightbox from 'components/lightbox/lightbox'
import upload from 'components/upload'
export default {
  components: {
    Lightbox,
    upload
  },
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value || value == -1) {
        callback();
      } else {
        var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的数字值,小数点后只能两位'));
        } else {
          if (value > 9999999999) {
            callback(new Error('整数部分最大为十位'));
          } else {
            callback();
          }
        }
      }
    }
    var checkCutPrice = (rule, value, callback) => {
      if (!value || value == -1) {
        callback();
      } else {
        var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的数字值,小数点后只能两位'));
        } else {
          if (value > 10000) {
            callback(new Error('整数部分最大为四位'));
          } else if (value < this.form.cutCostPrice && reg.test(this.form.cutCostPrice) && this.form.cutCostPrice) {
            callback(new Error('剪版销售价不能低于剪版成本价'));
          } else {
            callback();
          }
        }
      }
    }
    var checkCutCostPrice = (rule, value, callback) => {
      if (!value || value == -1) {
        callback();
      } else {
        var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的数字值,小数点后只能两位'));
        } else {
          if (value > 10000) {
            callback(new Error('整数部分最大为四位'));
          } else if (this.form.cutPrice && reg.test(this.form.cutPrice) && value > this.form.cutPrice) {
            callback(new Error('剪版成本价不能高于剪版销售价'));
          } else {
            callback();
          }
        }
      }
    }
    var checkPrice = (rule, value, callback) => {
      if (!value || value == -1) {
        callback();
      } else {
        var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的数字值,小数点后只能两位'));
        } else {
          if (value > 9999999999) {
            callback(new Error('整数部分最大为十位'));
          } else if (value < this.form.costPrice && reg.test(this.form.costPrice) && this.form.costPrice) {
            callback(new Error('大货销售价不能低于大货成本价'));
          } else {
            callback();
          }
        }
      }
    }
    var checkCostPrice = (rule, value, callback) => {
      if (!value || value == -1) {
        callback();
      } else {
        var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的数字值,小数点后只能两位'));
        } else {
          if (value > 9999999999) {
            callback(new Error('整数部分最大为十位'));
          } else if (this.form.price && reg.test(this.form.price) && value > this.form.price) {
            callback(new Error('大货成本价不能高于大货销售价'));
          } else {
            callback();
          }
        }
      }
    }
    return {
      loading: false,
      update: false,
      customVisible: false,
      checkCompanyVisable: false,
      isSave: false,
      id: '',
      uploadType: '',
      imageDomain: 'http://www.soouya.com',
      code: '',
      imgArray: [],
      imgUrls: [],
      colorUrls: [],
      shopOriginalImgUrls: [],
      shopOriginalColorUrls: [],
      shopOriginalNumber: '',
      searchName: '',
      searchArr: [],
      FullAddress: [],
      company: null,
      companyOptions: [],
      type: [],
      structures: [],
      structuresCopy: [],
      usages: [],
      usagesCopy: [],
      form: {
        sellerId: '',
        type: '针织',
        title: '',
        number: '',
        onDate: '',
        speciality: '',
        composition: '',
        width: null,
        widthUnit: 'cm',
        weight: null,
        weightUnit: 'g/㎡',
        shortWeight: '',
        paperTube: '',
        metrePerKilo: null,
        cutCostPrice: null,
        cutPrice: null,
        cutPriceUnit: '',
        costPrice: null,
        price: null,
        priceUnit: '',
        shopId: '',
        shopOriginalNumber: '',
        shopCompany: '',
        sellerNumber: '',
        sellerServiceNumber: '',
        shopAddr: '',
        shopTel: '',
        mark: ''
      },
      customData: {
        name: '',
        type: '',
        title: ''
      },
      priceVisible: {
        cutPrice: false,
        price: false,
      },
      setStock: {
        setVisible: false,
        setTitle: '',
        flag: ''
      },
      wordNumber: 0,
      page: {
        pageNumber: 1,
        totalCount: null
      },
      rules: {
        title: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        title1: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '货号不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        sellerNumber: [
          { required: true, message: '必须选择原供应商', trigger: '' }
        ],
        onDate: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        speciality: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        composition: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        width: [
          { min: 1, max: 100, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        weight: [
          { min: 1, max: 100, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        shortWeight: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        paperTube: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        metrePerKilo: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        cutCostPrice: [
          { validator: checkCutCostPrice, trigger: 'blur' }
        ],
        cutPrice: [
          { validator: checkCutPrice, trigger: 'blur' }
        ],
        costPrice: [
          { validator: checkCostPrice, trigger: 'blur' }
        ],
        price: [
          { validator: checkPrice, trigger: 'blur' }
        ],
        mark: [
          { min: 1, max: 500, message: '备注最多500个字符', trigger: 'blur' }
        ],
        shopOriginalNumber: [
          { required: true, message: '供应商原货号不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },

        ]
      }
    }
  },
  mounted() {
    this.soouya = 1;
    if (this.$route.query.id) {
      this.update = true
      this.id = this.$route.query.id
      this.getCompany()
    } else {
      this.getCompany()
    }
    this.$store.dispatch('changeload', false)
  },
  watch: {
    checkCompanyVisable(val) {
      if (!val) {
        this.searchArr = [];
        this.searchName = '';
        this.page.pageNumber = 1;
      }
    },
    shopOriginalImgUrls(array) {
      console.log(array)
    }
  },
  methods: {
    getCompany() {
      newRequest({
        url: '/soouya/ziying/shop',
        method: 'get',
        data: {
          sellerSoouya: 1
        }
      }).then((res) => {
        this.companyOptions = res.page.result
        this.companyOptions.forEach((item, index) => {
          this.$set(item, 'check', false)
          if (index == 0 && !this.update) {
            item.check = true
            this.form.sellerId = item.sellerId
          }
        })
        if (!this.update) {
          this.getTag();
        } else {
          this.getData()
        }
      })
    },
    getData() {
      newRequest({
        url: '/soouya/ziying/cloth/' + this.$route.query.id,
        method: 'get',
      }).then((res) => {
        if (res.success == '1') {
          let message = res.obj;
          this.form.ownStatus = message.ownStatus;
          this.code = message.code;
          this.id = message.id;
          console.log(this.companyOptions)
          this.companyOptions.forEach((item) => {
            if (item.sellerId == message.sellerId) {
              this.form.sellerId = message.sellerId
              this.getTag()
              this.company = item.company
            }
          })
          this.form.title = message.title
          this.form.number = message.number
          this.form.onDate = message.onDate
          this.form.speciality = message.speciality
          this.form.shopCompany = message.shopCompany
          message.imgUrls.forEach((item) => {
            let obj = { imgUrl: item }
            this.imgUrls.push(obj)
          })
          message.colorUrls.forEach((item) => {
            let obj = { imgUrl: item }
            this.colorUrls.push(obj)
          })
          this.structuresCopy = message.structures.slice()
          this.usagesCopy = message.usages.slice()
          this.form.type = message.type
          this.form.width = message.width
          this.form.widthUnit = message.widthUnit
          this.form.weight = message.weight
          this.form.weightUnit = message.weightUnit
          this.form.shortWeight = message.shortWeight
          this.form.paperTube = message.paperTube
          this.processData(message, 'metrePerKilo')
          this.form.priceUnit = message.priceUnit
          this.processData(message, 'cutCostPrice')
          this.processData(message, 'cutPrice')
          if (this.form.cutPriceUnit || this.form.cutCostPrice || this.form.cutPrice) {
            this.priceVisible.cutPrice = true;
          }
          this.form.cutPriceUnit = message.cutPriceUnit
          this.processData(message, 'costPrice')
          this.processData(message, 'price')
          if (this.form.priceUnit || this.form.costPrice || this.form.price) {
            this.priceVisible.price = true;
          }
          this.form.shopId = message.shopId
          this.form.sellerNumber = message.sellerNumber
          this.form.sellerServiceNumber = message.sellerServiceNumber
          this.form.shopAddr = message.shopAddr
          this.form.shopTel = message.shopTel
          message.shopOriginalImgUrls.forEach((item) => {
            let obj = { imgUrl: item }
            this.shopOriginalImgUrls.push(obj)
          })
          message.shopOriginalColorUrls.forEach((item) => {
            let obj = { imgUrl: item }
            this.shopOriginalColorUrls.push(obj)
          })
          this.form.shopOriginalNumber = message.shopOriginalNumber
          this.form.composition = message.composition
          this.form.mark = message.mark
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    processData(msg, val) {
      this.form[val] = (msg[val] == 0 || msg[val] == -1) ? null : msg[val];
    },
    getTag() {
      newRequest({
        url: '/soouya/ziying/tag/my?',
        method: 'get',
        data: {
          sellerId: this.form.sellerId
        }
      }).then((res) => {
        if (res.success == '1') {
          this.type = res.obj.type;
          this.structures = res.obj.structure;
          this.usages = res.obj.usage;
          this.type.forEach((item) => {
            this.$set(item, 'check', false);
          })
          if (!this.update) {
            this.type[0].check = true;
          }
          this.structures.forEach((item) => {
            this.$set(item, 'check', false);
          })
          this.usages.forEach((item) => {
            this.$set(item, 'check', false);
          })
          this.structuresCopy.forEach((item) => {
            this.structures.forEach((val) => {
              if (item == val.value) {
                val.check = true
              }
            })
          })
          this.usagesCopy.forEach((item) => {
            this.usages.forEach((val) => {
              if (val.value == item) {
                val.check = true
              }
            })
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    collectCheck(arr) {
      return arr.filter((item) => {
        if (item.check) {
          return item;
        }
      })
    },
    structuresCheck(i) {
      var checkStructures = this.collectCheck(this.structures)
      if (checkStructures.length == 20) {
        this.$message.warning('最多只能选二十种')
        return;
      }
      this.structures[i].check = true;
      var checkStructuresNow = this.collectCheck(this.structures)
      this.structuresError = (checkStructuresNow.length < 1) ? 1 : 0;
    },
    cancelStructuresCheck(i) {
      this.structures[i].check = false;
      var checkStructures = this.collectCheck(this.structures)
      this.structuresError = (checkStructures.length < 1) ? 1 : 0;
    },
    usagesCheck(i) {
      var checkUsages = this.collectCheck(this.usages)
      if (checkUsages.length == 20) {
        this.$message.warning('最多只能选二十种')
        return;
      }
      this.usages[i].check = true;
    },
    changeCompany(index) {
      this.companyOptions.forEach((item) => {
        item.check = false;
      })
      this.companyOptions[index].check = true;
      this.form.sellerId = this.companyOptions[index].sellerId
      this.getTag()
    },
    changeType(index) {
      this.type.forEach((item) => {
        item.check = false;
      })
      this.type[index].check = true;
      this.form.type = this.type[index].value
    },
    delTag(tag, index) {
      let id = tag[index].id
      tag.splice(index, 1);
      newRequest({
        url: '/soouya/ziying/tag/' + encodeURI(id) + '?sellerId=' + this.form.sellerId,
        method: 'delete'
      }).then((res) => {
        if (res.success == '1') {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    delType(index) {
      this.delTag(this.type, index)
    },
    delStructure(index) {
      this.delTag(this.structures, index)
    },
    delUsage(index) {
      this.delTag(this.usages, index)
    },
    beforeUploadImgUrls(file) {
      let type = file.type.split('/')
      if (['jpg', 'png', 'gif', 'jpeg'].indexOf(type[1]) == -1) {
        this.$message({
          type: 'error',
          message: '请上传图片',
          duration: 1500
        })
        return false
      }
      this.imgArray.push(file)
      if (this.imgUrls.length + this.imgArray.length > 9) {
        this.$message.error('最多只能上传9张')
        return false
      }
    },
    uploadImgUrls(file, fileList) {
      this.imgUrls.push(file)
    },
    delImgUrls(i) {
      this.imgUrls.splice(i, 1)
    },
    beforeUploadColorUrls(file) {
      let type = file.type.split('/')
      if (['jpg', 'png', 'gif', 'jpeg'].indexOf(type[1]) == -1) {
        this.$message({
          type: 'error',
          message: '请上传图片',
          duration: 1500
        })
        return false
      }
      this.imgArray.push(file)
      if (this.colorUrls.length + this.imgArray.length > 9) {
        this.$message.error('最多只能上传9张')
        return false
      }
    },
    uploadColorUrls(file, fileList) {
      this.colorUrls.push(file)
    },
    delColorUrls(i) {
      this.colorUrls.splice(i, 1)
    },
    beforeUploadShopOriginalImgUrls(file) {
      let type = file.type.split('/')
      if (['jpg', 'png', 'gif', 'jpeg'].indexOf(type[1]) == -1) {
        this.$message({
          type: 'error',
          message: '请上传图片',
          duration: 1500
        })
        return false
      }
      this.imgArray.push(file)
      if (this.shopOriginalImgUrls.length + this.imgArray.length > 9) {
        this.$message.error('最多只能上传9张')
        return false
      }
    },
    uploadShopOriginalImgUrls(file, fileList) {
      this.shopOriginalImgUrls.push(file)
    },
    delShopImgUrls(i) {
      this.shopOriginalImgUrls.splice(i, 1)
    },
    beforeUploadShopOriginalColorUrls(file) {
      let type = file.type.split('/')
      if (['jpg', 'png', 'gif', 'jpeg'].indexOf(type[1]) == -1) {
        this.$message({
          type: 'error',
          message: '请上传图片',
          duration: 1500
        })
        return false
      }
      this.imgArray.push(file)
      if (this.shopOriginalColorUrls.length + this.imgArray.length > 9) {
        this.$message.error('最多只能上传9张')
        return false
      }
    },
    uploadShopOriginalColorUrls(file, fileList) {
      this.shopOriginalColorUrls.push(file)
    },
    clearImgArray() {
      this.imgArray = []
    },
    delShopColorImgUrls(i) {
      this.shopOriginalColorUrls.splice(i, 1)
    },
    openSearch() {
      this.checkCompanyVisable = true;
    },
    search() {
      let params = Object.assign({}, { key: this.searchName }, this.page)
      newRequest({
        url: '/soouya/v1/shop',
        method: 'get',
        data: params
      }).then((res) => {
        if (res.success == '1') {
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
          this.searchArr = res.page.result;
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    clearSearch() {
      this.searchName = '';
      this.searchArr = [];
    },
    checkShop(val) {
      this.checkCompanyVisable = false;
      this.form.shopId = val.id;
      this.form.shopAddr = val.addr;
      this.form.shopArea = val.area;
      this.form.shopCity = val.city;
      this.form.shopCompany = val.company;
      this.form.shopProvince = val.province;
      this.form.sellerNumber = val.sellerNumber
      this.form.sellerServiceNumber = val.sellerServiceNumber
      this.form.shopTel = val.tel
      this.searchArr = [];
      this.searchName = '';
    },
    handleCurrentChange(val) {
      this.page.pageNumber = val
      this.search()
    },
    addCustom(val) {
      this.customData.type = val;
      if (this.customData.type == 'type' && this.type.length >= 50) {
        this.$message.warning('品类最多只能添加五十种')
        return;
      }
      if (this.customData.type == 'structure' && this.structures.length >= 50) {
        this.$message.warning('织法最多只能添加五十种')
        return;
      }
      if (this.customData.type == 'usage' && this.usages.length >= 50) {
        this.$message.warning('用途最多只能添加五十种')
        return;
      }
      switch (val) {
        case 'type':
          this.customData.title = '品类';
          break;
        case 'structure':
          this.customData.title = '织法';
          break;
        case 'usage':
          this.customData.title = '用途';
          break;
      }
      this.customVisible = true;
    },
    countWord() {
      this.wordNumber = this.form.mark.length;
    },
    saveAll: function(formName) {
      this.form.imgUrls = this.imgUrls.map((item) => {
        return item.imgUrl
      })
      this.form.colorUrls = this.colorUrls.map((item) => {
        return item.imgUrl
      })
      if (!this.update) {
        this.type.forEach((item) => {
          if (item.check == true) {
            this.form.type = item.value
          }
        })
      }
      this.form.structures = [];
      this.structures.forEach((item) => {
        if (item.check) {
          this.form.structures.push(item.value)
        }
      })
      this.form.usages = [];
      this.usages.forEach((item) => {
        if (item.check) {
          this.form.usages.push(item.value)
        }
      })
      this.form.shopOriginalImgUrls = this.shopOriginalImgUrls.map((item) => {
        return item.imgUrl
      })
      this.form.shopOriginalColorUrls = this.shopOriginalColorUrls.map((item) => {
        return item.imgUrl
      })
      if (!this.priceVisible.cutPrice) {
        this.form.cutPriceUnit = null
        this.form.cutCostPrice = -1
        this.form.cutPrice = -1
      }
      if (!this.priceVisible.price) {
        this.form.priceUnit = ''
        this.form.costPrice = -1
        this.form.price = -1
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.form.shopCompany) {
            this.$message.error('必须选择供应商')
            return false
          }
          let obj = JSON.parse(JSON.stringify(this.form))
          if (!obj.metrePerKilo) {
            obj.metrePerKilo = -1
          }
          if (!obj.cutCostPrice) {
            obj.cutCostPrice = -1
          }
          if (!obj.cutPrice) {
            obj.cutPrice = -1
          }
          if (!obj.costPrice) {
            obj.costPrice = -1
          }
          if (!obj.price) {
            obj.price = -1
          }
          if (this.update) {
            obj.id = this.id
            this.loading = true;
            newRequest({
              url: '/soouya/ziying/cloth/' + this.id + '?_function=updateInfo',
              method: 'put',
              contentType: 'application/json',
              data: obj
            }).then((res) => {
              this.loading = false;
              if (res.success == '1') {
                this.$message.success(res.msg)
                this.$router.push({ path: '/index/product/detail', query: { id: this.$route.query.id, type: this.form.ownStatus } })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
          if (!this.update) {
            this.loading = true;
            this.isSave = true;
            obj.ownStatus = 0
            newRequest({
              url: '/soouya/ziying/cloth/' + this.id,
              method: 'post',
              contentType: 'application/json',
              data: obj
            }).then((res) => {
              this.loading = false;
              if (res.success == '1') {
                this.$message.success(res.msg)
                this.$router.push({ path: '/index/product/detail', query: { id: res.obj.id, type: 0 } })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    back() {
      history.go(-1)
    },
    saveCustom(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.customVisible = false;
          var parent = null;
          switch (this.customData.type) {
            case 'type':
              parent = 'type';
              break;
            case 'structure':
              parent = 'structure';
              break;
            case 'usage':
              parent = 'usage';
              break;
          }
          newRequest({
            url: '/soouya/ziying/tag',
            method: 'post',
            contentType: 'application/json',
            data: {
              parent: parent,
              value: this.customData.name,
              sellerId: this.form.sellerId
            }
          }).then((res) => {
            if (this.customData.type == 'type') {
              let index = null;
              this.type.forEach((item, i) => {
                if (item.check) {
                  index = i;
                }
              })
              this.type = res.obj.type
              this.type.forEach((item) => {
                this.$set(item, 'check', false);
              })
              this.type[index].check = true;
            }
            if (this.customData.type == 'structure') {
              let arr = res.obj.structure;
              for (let i = 0; i < arr.length; i++) {
                if (i == arr.length - 1) {
                  this.$set(arr[i], 'check', false);
                  this.structures.push(arr[i])
                }
              }
            }
            if (this.customData.type == 'usage') {
              let arr = res.obj.usage;
              for (let i = 0; i < arr.length; i++) {
                if (i == arr.length - 1) {
                  this.$set(arr[i], 'check', false);
                  this.usages.push(arr[i])
                }
              }
            }
          })
          this.customData.name = ''
        } else {
          return false;
        }
      });
    }
  }
}

</script>
<style lang="scss">

.el-form-item{
  margin-bottom: 15px;
  .el-form-item__content{
    line-height: 24px;
  }
}
.custom-dialog {
  .el-dialog--small {
    width: 400px;
  }
}

.search-dialog {
  .el-dialog--small {
    width: 500px;
  }
}

.find-detail {
  .el-button {
    position: relative;
    .check {
      color: #fff;
      background: #2fb468;
      border-color: #2fb468;
      padding-left: 15px;
      padding-right: 15px;
    }
    .el-icon-check {
      display: none;
    }
    &.check {
      .el-icon-check {
        display: inline-block;
      }
    }
    &:hover {
      .del {
        display: block;
      }
    }
    .del {
      width: 15px;
      height: 15px;
      background: #666;
      opacity: .5;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 15px;
      position: absolute;
      right: -5px;
      top: -5px;
      display: none;
    }
  }
  .row {
    clear: both;
    margin-top: 10px;
    min-height: 40px;
    &.shop {
      padding-left: 120px;
      span {
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
      }
    }
  }
  .row-left {
    display: inline-block;
    float: left;
    width: 120px;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
    h5 {
      line-height: 36px;
      font-weight: normal;
    }
  }
  .single-button {
    margin: 10px !important;
  }
  .row-right {
    margin-left: 123px;
    .find-price-label {
      line-height: 36px;
    }
    .single-button {
      border-radius: 0;
      background: #fff;
      color: #666;
      border: 1px solid #ddd;
      cursor: pointer;
      margin: 10px !important;
      &.check {
        background: #2FB468;
      }
    }
  }
  .goods-price {
    .btn-tip {
      float: left;
      &.check {
        border: 1px solid #2fb468;
        height: 32px;
      }
    }
  }
  .imge-array {
    display: inline-block;
    float: left;
    a {
      display: inline-block;
      width: 70px;
      height: 70px;
      margin-right: 10px;
      position: relative;
      &:hover {
        .round {
          display: block;
        }
      }
      .round {
        width: 15px;
        height: 15px;
        font-size: 12px;
        background: #999;
        border-radius: 50%;
        position: absolute;
        right: -5px;
        top: -5px;
        text-align: center;
        line-height: 15px;
        cursor: pointer;
        color: #fff;
        display: none;
      }
    }
  }
}

.btn-tip {
  outline: none;
  border-radius: 0;
  color: #666;
  background: #fff;
  border: 1px solid #ddd;
  height: 32px;
  min-width: 80px;
  text-align: right;
  padding: 5px 15px;
  position: relative;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 10px 10px 0;
  cursor: pointer;
  float: left;
  .round {
    width: 15px;
    height: 15px;
    background: #666;
    opacity: .5;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 15px;
    right: -5px;
    top: -5px;
    z-index: 10;
    display: none;
    position: absolute;
  }
  &:hover {
    .round {
      display: block
    }
  }
  span {
    display: inline-block;
    border: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    a {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-bottom: 24px solid #2FB468;
      border-left: 24px solid transparent;
      i {
        position: absolute;
        z-index: 10;
        right: 15px;
        bottom: -25px;
        width: 0;
        font-size: 12px;
        font-weight: 100;
        color: #fff;
      }
    }
  }
}

.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #2FB468;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}

.avatar {
  width: 70px;
  height: 70px;
  display: block;
}

</style>
<style lang="scss" scoped>
.search-area {
  ul {
    cursor: pointer;
  }
  ul:nth-of-type(odd) {
    background: #fff;
  }
  ul:nth-of-type(2n) {
    background: #fafafa;
  }
}

.requied-two-word {
  display: inline-block;
  width: 32px;
}

.two-word {
  display: inline-block;
  width: 38px;
}

.code {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  color: #2FB468;
  font-size: 14px;
}

.add-color {
  color: #2FB468;
  display: inline-block;
  float: left;
  font-size: 14px;
  line-height: 28px;
  height: 28px;
  float: left;
  text-decoration: none;
}

.add-color-border {
  width: 2px;
  height: 12px;
  margin: 8px 15px;
  background: #2FB468;
}

.add-color-tip {
  width: 600px;
  height: 60px;
  position: absolute;
  z-index: 10;
  top: 40px;
  left: -90px;
  &.add-color-tip1 {
    position: absolute;
    z-index: 10;
    top: 40px;
    left: 0px;
  }
  .two {
    display: inline-block;
    width: 250px;
    margin-right: 20px;
    height: 60px;
    display: inline-block;
    background: white;
    float: left;
    box-sizing: border-box;
    box-shadow: 0 0 10px #CFCFCF;
    &.second {
      padding-left: 15px;
      .add {
        margin-left: 12px;
      }
    }
    .add {
      width: 56px;
      height: 26px;
      background: #2FB468;
      border-radius: 4px;
      padding: 0;
      text-align: center;
      &.add-first {
        margin-left: 16px;
        margin-right: 7px;
        color: white;
      }
    }
    .cancel {
      width: 56px;
      height: 26px;
      background: white;
      border-radius: 4px;
      padding: 0;
      text-align: center;
      color: #2FB468;
      border: 1px solid #2FB468;
    }
    input {
      width: 70px;
      height: 26px;
      border-radius: 4px;
      outline: none;
      border: 1px solid #ddd;
      padding-left: 10px;
      margin-left: 20px;
      margin-top: 20px;
      box-sizing: border-box;
      &.num {
        margin-left: 0;
        width: 56px;
      }
    }
  }
}

.detail {
  .basic-msg {
    .color-block {
      clear: both;
    }
  }
}

.el-cascader {
  .el-input__inner {
    border-radius: 0;
  }
}

.shop-company {
  display: inline-block;
  margin-right: 37px;
  width: 190px;
  .el-input {
    width: 190px;
    .el-input__inner {
      width: 190px;
    }
  }
}

.full-address {
  display: inline-block;
  margin-left: -8px;
  .el-input__inner {
    border-radius: 0;
  }
}

.el-cascader {
  .el-input__inner {
    border-radius: 0;
  }
}

.shop-company {
  display: inline-block;
  margin-right: 37px;
  width: 190px;
  .el-input__inner {
    width: 190px;
  }
}

.full-address {
  display: inline-block;
  margin-left: -8px;
  .el-input__inner {
    border-radius: 0;
  }
}


.el-checkbox__input.is-checked {
  .el-checkbox__inner {
    background: #34C773;
  }
}

.el-checkbox__inner {
  border: 1px solid #ddd;
  &:hover {
    border-color: #34C773;
  }
}

table {
  font-size: 12px;
  border-collapse: collapse;
  min-height: 40px !important;
  input {
    width: 100px;
    box-sizing: border-box;
  }
  thead {
    tr {
      background: #fafafa;
      height: 30px;
    }
  }
  tbody {
    tr {
      height: 30px;
      input {
        border-radius: 4px;
        height: 20px;
        border: 1px solid #ddd;
        outline: none;
        padding-left: 15px;
      }
    }
    tr:nth-of-type(even) {
      background: #fafafa;
    }
  }
}

.search-header {
  .el-input {
    width: 250px;
    height: 40px;
    input {
      width: 226px;
      height: 32px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      box-sizing: border-box;
      color: #1f2d3d;
      font-size: inherit;
      height: 36px;
      line-height: 1;
      outline: 0;
      padding: 3px 10px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }
    .round {
      display: block;
      width: 15px;
      height: 15px;
      font-size: 12px;
      background: #999;
      border-radius: 50%;
      text-align: center;
      line-height: 15px;
      cursor: pointer;
      color: #fff;
      position: absolute;
      right: 30px;
      top: 10px;
    }
  }
}

</style>
