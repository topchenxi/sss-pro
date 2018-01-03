<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="back"></span>
      <p>详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item detail-right order-left pb20">
        <h6>基本信息</h6>
        <dl class="info-item" v-if="viewType == 1">
          <dt>商品编码：</dt>
          <dd>{{code}}</dd>
        </dl>
        <dl class="info-item">
          <dt>品类：</dt>
          <dd> {{ type ? type : '--' }} </dd>
        </dl>
        <dl class="info-item">
          <dt>品名：</dt>
          <dd> {{ title ? title : '--' }} </dd>
        </dl>
        <dl class="info-item">
          <dt>货号：</dt>
          <dd>{{ number ? number : '--' }}
          </dd>
        </dl>
        <dl class="info-item" v-if="viewType == 1">
          <dt>货期：</dt>
          <dd>{{ onDate ? onDate : '--' }}</dd>
        </dl>
        <dl class="info-item" v-if="viewType == 1">
          <dt>特色：</dt>
          <dd>
            {{ speciality ? speciality : '--' }}
          </dd>
        </dl>
        <dl class="info-item mb20">
          <dt>商品图片：</dt>
          <dd>
            <div class="image-list">
              <a class="show-image" :href="imageDomain +item.imgUrl" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" v-if="imgUrls.length > 0">
                <img class="image-s" :src="imageDomain + item.imgUrl"  />
              </a>
              <img class="image-s" src="~assets/default_pic_detail.png" width="86" height="86" v-if="imgUrls.length == 0">
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>色卡图片：</dt>
          <dd>
            <div class="image-list">
              <a :href="imageDomain +item.imgUrl" v-lightbox="colorUrls" v-for="(item, index) in colorUrls" v-if="colorUrls.length > 0" class="show-image">
                <img class="image-s" :src="imageDomain + item.imgUrl" />
              </a>
              <img class="image-s" src="~assets/default_pic_detail.png" width="86" height="86" alt="" v-if="colorUrls.length == 0">
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>颜色个数：</dt>
          <dd>
            {{colors.length ? colors.length : '--'}}
          </dd>
        </dl>
        <div class="color-wrap m14 ml40" v-if="colors.length">
          <span class="item" v-for="(item, index) in colors">{{item}}</span>
        </div>
      </div>
      <div class="detail-item detail-right order-right fr">
        <h6>属性参数</h6>
        <dl class="info-item">
          <dt>织法：</dt>
          <dd><span v-if="structures">{{structures}}</span>
            <span v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>用途：</dt>
          <dd><span class="msg" v-if="usages">{{usages}}</span>
            <span class="msg" v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>成分：</dt>
          <dd> <span class="msg" v-if="composition">{{composition}}</span>
            <span class="msg" v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>幅宽：</dt>
          <dd><span class="msg" v-if="width">{{width}}{{widthUnit}}</span>
            <span class="msg" v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>克重：</dt>
          <dd><span class="msg" v-if="weight">{{weight}}{{weightUnit}}</span>
            <span class="msg" v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>空差：</dt>
          <dd><span class="msg" v-if="shortWeight">{{shortWeight}}</span>
            <span class="msg" v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>纸筒：</dt>
          <dd><span class="msg" v-if="paperTube">{{paperTube}}</span>
            <span class="msg" v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>公斤出米数：</dt>
          <dd><span class="msg" v-if="metrePerKilo != -1">{{metrePerKilo}} 米/公斤</span>
            <span class="msg" v-else>--</span></dd>
        </dl>
      </div>
    </div>
    <!-- <div class="basic-msg">
      <div class="row" style="margin-top:15px;">
        <div class="row-left">
          <h5 style="margin-right: 10px">换卡头供应商11:</h5>
        </div>
        <div class="row-right" style="line-height:28px;">
          <span>{{company}}</span>
        </div>
      </div>
      <div class="company-msg">
        <div class="row">
          <h4 class="title">供应商信息</h4>
        </div>
        <div class="row">
          <div class="row-left">
            <h5 class="msg-label">供应商名称: </h5>
          </div>
          <div class="row-right">
            <span class="msg" v-if="shopCompany">{{shopCompany}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <h5 class="msg-label">供应商ID: </h5>
          </div>
          <div class="row-right">
            <span class="msg" v-if="sellerNumber">{{sellerNumber}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <h5 class="msg-label">供应商编号: </h5>
          </div>
          <div class="row-right">
            <span class="msg" v-if="sellerServiceNumber">{{sellerServiceNumber}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
        <div class="row" v-if="soouya == 0">
          <div class="row-left">
            <h5 class="msg-label">供应商电话: </h5>
          </div>
          <div class="row-right">
            <span class="msg" v-if="shopTel">{{shopTel}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
        <div class="row" v-if="soouya == 0">
          <div class="row-left">
            <h5 class="msg-label">供应商地址: </h5>
          </div>
          <div class="row-right">
            <span class="msg" v-if="shopAddr">{{shopProvince}}{{shopCity}}{{shopArea}}{{shopAddr}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
        <div class="row shop" v-if="soouya == 1">
          <span class="msg" v-if="sellerNumber">供应商ID：{{sellerNumber}}</span>
          <span class="msg" v-else>供应商ID：--</span>
          <span class="msg" v-if="sellerServiceNumber">供应商编号：{{sellerServiceNumber}}</span>
          <span class="msg" v-else>供应商编号：--</span>
          <span class="msg" v-if="shopAddr">供应商地址：{{shopAddr}}</span>
          <span class="msg" v-else>供应商地址：--</span>
          <span class="msg" v-if="shopTel">供应商电话：{{shopTel}}</span>
          <span class="msg" v-else>供应商电话：--</span>
        </div>
        <div class="row">
          <div class="row-left">
            <h5 class="msg-label">供应商原货号: </h5>
          </div>
          <div class="row-right">
            <span class="msg" v-if="shopOriginalNumber">{{shopOriginalNumber}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <h5 class="msg-label msg-img-label">供应商原商品图片: </h5>
          </div>
          <div class="row-right" style="width:auto">
            <div class="imge-array">
              <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-if="shopOriginalImgUrls.length > 0">
                <img :src="imageDomain + item.imgUrl" width="70px" height="70px" />
              </a>
              <img src="~assets/default_pic_detail.png" alt="" width="70px" height="70px" v-if="shopOriginalImgUrls.length == 0">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <h5 class="msg-label msg-img-label">供应商原色卡图片: </h5>
          </div>
          <div class="row-right" style="width:auto">
            <div class="imge-array">
              <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-if="shopOriginalColorUrls.length > 0">
                <img :src="imageDomain + item.imgUrl" width="70px" height="70px" />
              </a>
              <img src="~assets/default_pic_detail.png" alt="" width="70px" height="70px" v-if="shopOriginalColorUrls.length == 0">
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:0">
        <h4 class="title" style="margin-top:0">基本信息</h4>
      </div>
      <div class="row" v-if="viewType == 1">
        <div class="row-left">
          <h5>商&nbsp;品&nbsp;编&nbsp;码：</h5>
        </div>
        <div class="row-right">
          <span class="msg">{{code}}</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>品
              <span class="two-word"></span>类：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="type">{{type}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>品
              <span class="two-word"></span>名：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="title">{{title}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>货
              <span class="two-word"></span>号：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="number">{{number}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row" v-if="viewType == 1">
        <div class="row-left">
          <h5>颜&nbsp;色&nbsp;个&nbsp;数：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="colors.length">{{colors.length}}色</span>
          <span class="msg" v-else>--</span>
          <div class="color-block" v-show="colors.length > 0">
            <span v-for="(item, index) in colors">{{item}}</span>
          </div>
        </div>
      </div>
      <div class="row" v-if="viewType == 1">
        <div class="row-left">
          <h5>货
              <span class="two-word"></span>期：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="onDate">{{onDate}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row" v-if="viewType == 1">
        <div class="row-left">
          <h5>特
              <span class="two-word"></span>色：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="speciality">{{speciality}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5 class="msg-img-label">商&nbsp;品&nbsp;图&nbsp;片：</h5>
        </div>
        <div class="row-right">
          <div class="imge-array">
            <a :href="imageDomain +item.imgUrl" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" v-if="imgUrls.length > 0">
                <img :src="imageDomain + item.imgUrl" width="70px" height="70px" />
              </a>
            <img src="~assets/default_pic_detail.png" alt="" width="70px" height="70px" v-if="imgUrls.length == 0">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5 class="msg-img-label">色&nbsp;卡&nbsp;图&nbsp;片：</h5>
        </div>
        <div class="row-right">
          <div class="imge-array">
            <a :href="imageDomain +item.imgUrl" v-lightbox="colorUrls" v-for="(item, index) in colorUrls" v-if="colorUrls.length > 0">
                <img :src="imageDomain + item.imgUrl" width="70px" height="70px" />
              </a>
            <img src="~assets/default_pic_detail.png" alt="" width="70px" height="70px" v-if="colorUrls.length == 0">
          </div>
        </div>
      </div>
    </div>
    <div class="basic-msg">
      <div class="row">
        <h4 class="title">属性参数</h4>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>织
              <span class="two-word"></span>法：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="structures">{{structures}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>用
              <span class="two-word"></span>途：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="usages">{{usages}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>成
              <span class="two-word"></span>分：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="composition">{{composition}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>幅
              <span class="two-word"></span>宽：</h5>
        </div>
        <div class="row-right">
          <div class="unit">
            <span class="msg" v-if="width">{{width}}{{widthUnit}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>克
              <span class="two-word"></span>重：</h5>
        </div>
        <div class="row-right">
          <div class="unit">
            <span class="msg" v-if="weight">{{weight}}{{weightUnit}}</span>
            <span class="msg" v-else>--</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>空
              <span class="two-word"></span>差：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="shortWeight">{{shortWeight}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>纸
              <span class="two-word"></span>筒：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="paperTube">{{paperTube}}</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>公斤出米数：</h5>
        </div>
        <div class="row-right">
          <span class="msg" v-if="metrePerKilo != -1">{{metrePerKilo}} 米/公斤</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
    </div> -->
    <div class="detail-group ">
      <div class="detail-item detail-product" style="width:100%">
        <h6>商品价格</h6>
        <dl class="info-item" v-if="priceVisible.seka">
          <dt>色卡:</dt>
          <dd>
            <span>销售价 ：</span>
            <span v-if="colorPrice != -1">{{colorPrice}}元/本</span>
            <span v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>剪版:</dt>
          <dd>
            <span>成本价 ：</span>
            <span v-if="cutCostPrice != -1">{{cutCostPrice}}{{cutPriceUnit}}</span>
            <span v-else>--</span>
            <dd> <span>销售价 ：</span>
              <span v-if="cutPrice != -1">{{cutPrice}}{{cutPriceUnit}}</span>
              <span v-else>--</span></dd>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>大货:</dt>
          <dd>
            <span>成本价 ：</span>
            <span v-if="costPrice != -1">{{costPrice}}{{priceUnit}}</span>
            <span v-else>--</span>
            <dd><span>销售价 ：</span>
              <span v-if="price != -1">{{price}}{{priceUnit}}</span>
              <span v-else>--</span></dd>
          </dd>
        </dl>
        <div class="table-warp p14" style="width:60%" v-if="colorPrices.length > 0">
          <h5>特殊色号价格</h5>
          <table class="table-normal">
            <thead>
              <tr>
                <th>色号</th>
                <th>成本价</th>
                <th>销售价</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in colorPrices" :key="index">
                <td>{{item.color}}</td>
                <td>{{item.costPrice}}{{priceUnit}}</td>
                <td>{{item.price}}{{priceUnit}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group mb0">
      <div class="detail-item product-item-left detail-product" v-if="viewType == 1">
        <h6>库存</h6>
        <dl class="info-item">
          <dt>色卡:</dt>
          <dd>
            <span>库存 ：</span>
            <span v-if="colorStock != -1">{{colorStock}}本</span>
            <span v-else>--</span></dd>
        </dl>
        <dl class="info-item">
          <dt>剪版:</dt>
          <dd>
            <span>库存 ：</span>
            <span v-if="cutStock != -1">{{cutStock}}{{cutStockUnit}}</span>
            <span v-else>--</span>
          </dd>
        </dl>
        <div class="table-warp" v-if="cutStockColors.length > 0">
          <h5 class="mb10">特殊色号价格</h5>
          <table class="table-normal table-center">
            <tbody>
              <tr>
                <td>色号</td>
                <td>库存</td>
              </tr>
              <tr v-for="(item,index) in cutStockColors" :key="index">
                <td class="ta-l">{{item.color}}</td>
                <td class="ta-r">{{item.stock}}{{cutStockUnit}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <dl class="info-item">
          <dt>大货:</dt>
          <dd>
            <span>库存 ：</span>
            <span v-if="stock != -1">{{stock}}{{stockUnit}}</span>
            <span v-else>--</span>
          </dd>
        </dl>
        <div class="table-warp" v-if="stockColors.length > 0">
          <h5 class="mb10">特殊色号价格</h5>
          <table class="table-normal table-center">
            <tbody>
              <tr>
                <td>色号</td>
                <td>库存</td>
              </tr>
              <tr v-for="(item,index) in stockColors" :key="index">
                <td class="ta-l">{{item.color}}</td>
                <td class="ta-r">{{item.stock}}{{cutStockUnit}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="detail-item detail-right product-item-right" :class="{'w100p':viewType != 1}">
        <div class="product-top">
          <h6>供应商信息</h6>
          <dl class="info-item">
            <dt>供应商名称:</dt>
            <dd><span class="msg" v-if="shopCompany">{{shopCompany}}</span>
              <span class="msg" v-else>--</span></dd>
          </dl>
          <dl class="info-item">
            <dt>供应商ID:</dt>
            <dd><span class="msg" v-if="sellerNumber">{{sellerNumber}}</span>
              <span class="msg" v-else>--</span></dd>
          </dl>
          <dl class="info-item">
            <dt>供应商编号:</dt>
            <dd><span class="msg" v-if="sellerServiceNumber">{{sellerServiceNumber}}</span>
              <span class="msg" v-else>--</span></dd>
          </dl>
          <dl class="info-item" v-if="soouya == 0">
            <dt>供应商电话:</dt>
            <dd><span class="msg" v-if="shopTel">{{shopTel}}</span>
              <span class="msg" v-else>--</span></dd>
          </dl>
          <dl class="info-item" v-if="soouya == 0">
            <dt>供应商地址:</dt>
            <dd><span class="msg" v-if="shopAddr">{{shopProvince}}{{shopCity}}{{shopArea}}{{shopAddr}}</span>
              <span class="msg" v-else>--</span></dd>
          </dl>
          <dl class="info-item" v-if="soouya == 1">
            <dt></dt>
            <dd>
              <span v-if="sellerNumber">供应商ID：{{sellerNumber}}</span>
              <span v-else>供应商ID：--</span>
              <span v-if="sellerServiceNumber">供应商编号：{{sellerServiceNumber}}</span>
              <span v-else>供应商编号：--</span>
              <span v-if="shopAddr">供应商地址：{{shopAddr}}</span>
              <span v-else>供应商地址：--</span>
              <span v-if="shopTel">供应商电话：{{shopTel}}</span>
              <span v-else>供应商电话：--</span></dd>
          </dl>
          <dl class="info-item">
            <dt>供应商原货号:</dt>
            <dd>
              <span class="msg" v-if="shopOriginalNumber">{{shopOriginalNumber}}</span>
              <span class="msg" v-else>--</span>
            </dd>
          </dl>
          <dl class="info-item">
            <dt>供应商原商品图片:</dt>
            <dd>
              <div class="image-list">
                <a class="show-image" :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-if="shopOriginalImgUrls.length > 0">
                <img class="image-s" :src="imageDomain + item.imgUrl" />
              </a>
                <img class="image-s" src="~assets/default_pic_detail.png" width="86" height="86" v-if="shopOriginalImgUrls.length == 0">
              </div>
            </dd>
          </dl>
          <dl class="info-item">
            <dt>供应商原色卡图片:</dt>
            <dd>
              <div class="image-list">
                <a class="show-image" :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-if="shopOriginalColorUrls.length > 0">
                <img class="image-s" :src="imageDomain + item.imgUrl" />
              </a>
                <img class="image-s" src="~assets/default_pic_detail.png" width="86" height="86" v-if="shopOriginalColorUrls.length == 0">
              </div>
            </dd>
          </dl>
        </div>
        <div class="product-bottom" v-if="mark">
          <h6>其他</h6>
          <dl class="info-item mark">
            <dt>备注：</dt>
            <dd>{{mark}}</dd>
          </dl>
        </div>
      </div>
    </div>
    <!-- <div class="goods-price">
      <div class="row">
        <h4 class="title" style="margin-top:0">商品价格</h4>
      </div>
      <div class="row" v-if="priceVisible.seka">
        <div class="row-left">
          <h5>色卡:</h5>
        </div>
        <div class="row-right">
          <span class="label">销&nbsp;售&nbsp;价&nbsp;:&nbsp;</span>
          <span class="msg" v-if="colorPrice != -1">{{colorPrice}}元/本</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>剪版:</h5>
        </div>
        <div class="row-right">
          <span class="label">成&nbsp;本&nbsp;价&nbsp;:&nbsp;</span>
          <span class="msg" v-if="cutCostPrice != -1" style="margin-right:20px">{{cutCostPrice}}{{cutPriceUnit}}</span>
          <span class="msg" v-else style="margin-right:20px">--</span>
          <span class="label"> 销&nbsp;售&nbsp;价&nbsp;:&nbsp;</span>
          <span class="msg" v-if="cutPrice != -1" style="margin-right:20px">{{cutPrice}}{{cutPriceUnit}}</span>
          <span class="msg" v-else style="margin-right:20px">--</span>
        </div>
      </div>
      <div class="row">
        <div class="row-left">
          <h5>大货:</h5>
        </div>
        <div class="row-right">
          <div style="height36px;margin-bottom: 10px;">
            <span class="label">成&nbsp;本&nbsp;价&nbsp;:&nbsp;</span>
            <span class="msg" v-if="costPrice != -1" style="margin-right:20px">{{costPrice}}{{priceUnit}}</span>
            <span class="msg" v-else style="margin-right:20px">--</span>
            <span class="label">销&nbsp;售&nbsp;价&nbsp;:&nbsp;</span>
            <span class="msg" v-if="price != -1" style="margin-right:20px">{{price}}{{priceUnit}}</span>
            <span class="msg" v-else style="margin-right:20px">--</span>
          </div>
          <div style="clear:both;padding-left: 10px; padding-top: 15px;">
            <p class="speciality" v-if="colorPrices.length > 0">特殊色号价格</p>
            <table class="colorPrices-table" v-if="colorPrices.length > 0">
              <thead>
                <tr>
                  <th width="200px" style="text-align:center">色号</th>
                  <th width="200px" style="text-align:center">成本价</th>
                  <th width="200px" style="text-align:center">销售价</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in colorPrices">
                  <td width="200px" style="text-align:center;word-break: break-word;">{{item.color}}</td>
                  <td width="200px" style="text-align:center;word-break: break-word;">{{item.costPrice}}{{priceUnit}}</td>
                  <td width="200px" style="text-align:center;word-break: break-word;">{{item.price}}{{priceUnit}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="goods-price" v-if="viewType == 1">
      <div class="row">
        <h4 class="title">库存</h4>
      </div>
      <div class="row" v-if="stockVisible.seka">
        <div class="row-left">
          <h5>色卡:</h5>
        </div>
        <div class="row-right">
          <span class="label">库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存&nbsp;:&nbsp;</span>
          <span class="msg" v-if="colorStock != -1">{{colorStock}}本</span>
          <span class="msg" v-else>--</span>
        </div>
      </div>
      <div class="row" v-if="stockVisible.jianban">
        <div class="row-left">
          <h5>剪版:</h5>
        </div>
        <div class="row-right">
          <span class="label">库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存&nbsp;:&nbsp;</span>
          <div class="unit">
            <span class="msg" v-if="cutStock != -1">{{cutStock}}{{cutStockUnit}}</span>
            <span class="msg" v-else>--</span>
          </div>
          <div>
            <div style="clear:both;padding-left: 10px; padding-top: 15px;">
              <p class="speciality" v-if="cutStockColors.length > 0">特殊色号库存</p>
              <table v-if="cutStockColors.length > 0" class="stock-table">
                <thead>
                  <tr>
                    <th style="text-align:center;width:50%">色号</th>
                    <th style="text-align:center;width:50%">库存</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cutStockColors">
                    <td style="text-align:center;width:50%;word-break: break-word;">{{item.color}}</td>
                    <td style="text-align:center;width:50%;word-break: break-word;">{{item.stock}}{{cutStockUnit}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="stockVisible.dahuo">
        <div class="row-left">
          <h5>大货:</h5>
        </div>
        <div class="row-right">
          <span class="label">库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存&nbsp;:&nbsp;</span>
          <div class="unit">
            <span class="msg" v-if="stock != -1">{{stock}}{{stockUnit}}</span>
            <span class="msg" v-else>--</span>
          </div>
          <div>
            <div style="clear:both;padding-left: 10px; padding-top: 15px;">
              <p class="speciality" v-if="stockColors.length > 0">特殊色号库存</p>
              <table v-if="stockColors.length > 0" class="stock-table">
                <thead>
                  <tr>
                    <th style="text-align:center;width:50%">色号</th>
                    <th style="text-align:center;width:50%">库存</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in stockColors">
                    <td style="text-align:center;width:50%;word-break: break-word;">{{item.color}}</td>
                    <td style="text-align:center;width:50%;word-break: break-word;">{{item.stock}}{{stockUnit}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!--    <div class="company-msg">
      <div class="row">
        <h4 class="title">其它</h4>
      </div>
      <div class="row">
        <div class="row-left">
          <h5 style="margin-right: 5px;">备
              <span class="two-word"></span>注：</h5>
        </div>
        <div class="row-right">
          <p style="word-break:break-all;letter-spacing: 1px;line-height:28px;" v-if="mark">{{mark}}</p>
          <p v-else>--</p>
        </div>
      </div>
    </div> -->
    <!-- <div class="row page-bottom">
      <el-button @click="back" class="back">返回</el-button>
    </div> -->
    <lightbox />
  </div>
</template>
<script>
import {
  newRequest
} from 'utils/tool'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      soouya: '',
      ownStatus: '',
      code: '',
      imageDomain: 'http://www.soouya.com',
      customVisible: false,
      singleColorVisible: false,
      colorsVisible: false,
      checkCompanyVisable: false,
      checkImgUploadVisible: false,
      checkImg: {
        visable: false,
        type: ''
      },
      searchImgArr: [],
      checkeAllImg: false,
      title: '',
      number: '',
      onDate: '',
      speciality: '',
      imgUrls: [],
      colorUrls: [],
      shopOriginalImgUrls: [],
      shopOriginalColorUrls: [],
      composition: '',
      width: '',
      widthUnit: 'cm',
      weight: '',
      weightUnit: 'g/㎡',
      shortWeight: '',
      paperTube: '',
      metrePerKilo: '',
      colorPrice: '',
      cutPriceUnit: '',
      cutCostPrice: '',
      cutPrice: '',
      priceUnit: '',
      costPrice: '',
      price: '',
      cutStock: '',
      cutStockUnit: '米',
      stock: '',
      stockUnit: '米',
      colorPrices: [],
      colorStock: '',
      copyColorPrices: [],
      copyStock: [],
      cutStockColors: [],
      stockColors: [],
      shopOriginalNumber: '',
      multipleSelection: [],
      searchName: '',
      searchArr: [],
      shopId: '',
      sellerNumber: null,
      sellerServiceNumber: null,
      shopAddr: '',
      shopProvince: '',
      shopCity: '',
      shopArea: '',
      shopTel: '',
      flag: '',
      shopCompany: '',
      sellerFullAddress: [],
      customData: {
        name: '',
        type: '',
        title: ''
      },
      colorData: {
        name: ''
      },
      priceVisible: {
        seka: false,
        jianban: false,
        dahuo: false,
      },
      stockVisible: {
        seka: false,
        jianban: false,
        dahuo: false,
      },
      company: null,
      companyOptions: [],
      colors: [],
      type: '',
      form: {},
      structures: [],
      setStock: {
        setVisible: false,
        setTitle: '',
        flag: ''
      },
      setColor: {
        setVisible: false,
        setTitle: ''
      },
      wordNumber: 0,
      mark: null,
      usages: [],
      viewType: null
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false)
    this.viewType = this.$route.query.type
    this.getCompany()
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
        this.getData()
      })
    },
    getData() {
      newRequest({
        url: '/soouya/ziying/cloth/' + this.$route.query.id,
        method: 'get',
      }).then((res) => {
        if (res.success == '1') {
          let message = res.obj;
          this.code = message.code
          this.type = message.type
          this.title = message.title
          this.number = message.number
          this.colors = message.colors
          this.onDate = message.onDate
          this.speciality = message.speciality
          this.companyOptions.forEach((item) => {
            if (item.sellerId == message.sellerId) {
              this.company = item.company
            }
          })
          message.imgUrls.forEach((item) => {
            var obj = {}
            obj.imgUrl = item
            this.imgUrls.push(obj)
          })
          message.colorUrls.forEach((item) => {
            var obj = {}
            obj.imgUrl = item
            this.colorUrls.push(obj)
          })
          this.structures = message.structures.join('、')
          this.usages = message.usages.join('、')
          this.composition = message.composition
          this.width = message.width
          this.widthUnit = message.widthUnit
          this.weight = message.weight
          this.weightUnit = message.weightUnit
          this.shortWeight = message.shortWeight
          this.paperTube = message.paperTube
          this.metrePerKilo = message.metrePerKilo
          this.colorPrice = message.colorPrice
          if (this.colorPrice > 0) {
            this.priceVisible.seka = true;
            this.colorPrice = this.colorPrice.toFixed(2);
          }
          this.cutPriceUnit = message.cutPriceUnit
          this.cutCostPrice = message.cutCostPrice
          this.cutPrice = message.cutPrice
          this.priceUnit = message.priceUnit
          if (this.cutCostPrice > 0 || this.cutPrice > 0) {
            this.priceVisible.jianban = true;
            if (this.cutCostPrice) {
              this.cutCostPrice = this.cutCostPrice.toFixed(2);
            }
            if (this.cutPrice) {
              this.cutPrice = this.cutPrice.toFixed(2);
            }
          }
          this.costPrice = message.costPrice
          this.price = message.price
          this.colorPrices = message.colorPrices
          if (this.costPrice > 0 || this.price > 0 || this.colorPrices.length > 0) {
            this.priceVisible.dahuo = true;
            if (this.costPrice) {
              this.costPrice = this.costPrice.toFixed(2);
            }
            if (this.price) {
              this.price = this.price.toFixed(2);
            }
            if (this.colorPrices.length) {
              this.colorPrices.forEach((item) => {
                item.price = item.price.toFixed(2);
                item.costPrice = item.costPrice.toFixed(2);
              })
            }
          }
          this.colorStock = message.colorStock
          if (this.colorStock > 0) {
            this.stockVisible.seka = true;
            this.colorStock = this.colorStock.toFixed(2);
          }
          this.cutStock = message.cutStock
          this.cutStockUnit = message.cutStockUnit
          this.cutStockColors = message.cutStockColors
          if (this.cutStock > 0 || this.cutStockColors.length > 0) {
            this.stockVisible.jianban = true;
            if (this.cutStock) {
              this.cutStock = this.cutStock.toFixed(2)
            }
            if (this.cutStockColors.length) {
              this.cutStockColors.forEach((item) => {
                item.stock = item.stock.toFixed(2);
              })
            }
          }
          this.stock = message.stock
          this.stockUnit = message.stockUnit
          this.ownStatus = message.ownStatus
          this.stockColors = message.stockColors
          if (this.stock > 0 || this.stockColors.length > 0) {
            this.stockVisible.dahuo = true;
            if (this.stock) {
              this.stock = this.stock.toFixed(2)
            }
            if (this.stockColors.length) {
              this.stockColors.forEach((item) => {
                item.stock = item.stock.toFixed(2);
              })
            }
          }
          this.shopCompany = message.shopCompany
          this.shopId = message.shopId
          this.sellerNumber = message.sellerNumber
          this.sellerServiceNumber = message.sellerServiceNumber
          this.shopProvince = message.shopProvince
          this.shopCity = message.shopCity
          this.shopArea = message.shopArea
          this.shopAddr = message.shopAddr
          this.shopTel = message.shopTel
          this.shopOriginalNumber = message.shopOriginalNumber
          message.shopOriginalImgUrls.forEach((item) => {
            var obj = {}
            obj.imgUrl = item
            this.shopOriginalImgUrls.push(obj)
          })
          message.shopOriginalColorUrls.forEach((item) => {
            var obj = {}
            obj.imgUrl = item
            this.shopOriginalColorUrls.push(obj)
          })
          this.mark = message.mark
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    back() {
      var str = sessionStorage.getItem('guiderList')
      var obj = JSON.parse(str)
      obj.back = true
      sessionStorage.setItem('guiderList', JSON.stringify(obj))
      this.$router.push({ path: '/index/guider/cloth/guiderClothList' })
    }
  }
}

</script>
<style lang="scss" scoped>
.order-left,
.order-right {
  min-height: 500px;
}

.product-item-left,
.product-item-right {
  min-height: 427px;
}

</style>
