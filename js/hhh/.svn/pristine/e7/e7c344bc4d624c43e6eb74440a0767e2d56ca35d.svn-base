<template>
  <div class="detail product-detail">
    <div class="detail-title">
      <span @click="back"></span>
      <p>详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p">
        <h5 class="title">换卡头供应商：{{company}}</h5>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p p20">
        <h6>供应商信息</h6>
        <div class="d-line"></div>
        <dl class="info-item">
          <dt><span class="red">*</span> 供应商名称：</dt>
          <dd>
            {{shopCompany || '--'}}
            <ul class="product-seller-info">
              <li>供应商ID : <span>{{sellerNumber || '--'}}</span></li>
              <li>供应商编号 : <span>{{sellerServiceNumber || '--'}}</span></li>
              <li>供应商电话 : <span>{{shopTel || '--'}}</span></li>
              <li>供应商地址 : <span>{{shopProvince}}{{shopCity}}{{shopArea}}{{shopAddr}}</span></li>
            </ul>
          </dd>
        </dl>
        <dl class="info-item">
          <dt><span class="red">*</span> 原货号：</dt>
          <dd>
            {{shopOriginalNumber || '--'}}
          </dd>
        </dl>
        <dl class="info-item">
          <dt><span class="red">*</span> 原商品图片：</dt>
          <dd>
            <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-if="shopOriginalImgUrls.length">
                <img :src="imageDomain + item.imgUrl" width="86" height="86" />
              </a>
            <img src="~assets/default_pic_detail.png" alt="" width="86" height="86" v-if="!shopOriginalImgUrls.length">
          </dd>
        </dl>
        <dl class="info-item">
          <dt><span class="red">*</span> 原色卡图片：</dt>
          <dd>
            <a :href="imageDomain +item.imgUrl" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-if="shopOriginalColorUrls.length">
                <img :src="imageDomain + item.imgUrl" width="86" height="86" />
              </a>
            <img src="~assets/default_pic_detail.png" alt="" width="86" height="86" v-if="!shopOriginalColorUrls.length">
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p p20">
        <h6>基本信息</h6>
        <div class="d-line"></div>
        <dl class="info-item" v-if="viewType == 1">
          <dt>商品编码：</dt>
          <dd>
            {{code || '--'}}
          </dd>
        </dl>
        <dl class="info-item">
          <dt>品类：</dt>
          <dd>
            {{type || '--'}}
          </dd>
        </dl>
        <dl class="info-item">
          <dt>品名：</dt>
          <dd>
            {{title || '--'}}
          </dd>
        </dl>
        <dl class="info-item">
          <dt>货号：</dt>
          <dd>
            {{number || '--'}}
          </dd>
        </dl>
        <dl class="info-item" v-if="viewType == 1">
          <dt>颜色个数：</dt>
          <dd>
            <span class="msg" v-if="colors.length">{{colors.length}}色</span>
            <span class="msg" v-else>--</span>
            <div class="color-block" v-show="colors.length > 0">
              <span v-for="(item, index) in colors">{{item}}</span>
            </div>
          </dd>
        </dl>
        <dl class="info-item" v-if="viewType == 1">
          <dt>货期：</dt>
          <dd>
            {{onDate || '--'}}
          </dd>
        </dl>
        <dl class="info-item" v-if="viewType == 1">
          <dt>特色：</dt>
          <dd>
            {{speciality || '--'}}
          </dd>
        </dl>
        <dl class="info-item">
          <dt>商品图片：</dt>
          <dd>
            <div class="imge-array">
              <a :href="imageDomain +item.imgUrl" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" v-if="imgUrls.length > 0">
                <img :src="imageDomain + item.imgUrl" width="86" height="86" />
              </a>
              <img src="~assets/default_pic_detail.png" alt="" width="86" height="86" v-if="imgUrls.length == 0">
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>色卡图片：</dt>
          <dd>
            <div class="imge-array">
              <a :href="imageDomain +item.imgUrl" v-lightbox="colorUrls" v-for="(item, index) in colorUrls" v-if="colorUrls.length > 0">
                <img :src="imageDomain + item.imgUrl" width="86" height="86" />
              </a>
              <img src="~assets/default_pic_detail.png" alt="" width="86" height="86" v-if="colorUrls.length == 0">
            </div>
          </dd>
        </dl>
        <div class="table-warp p14" style="width:90%">
          <table class="table-normal">
            <colgroup>
              <col width="25%">
              <col width="25%">
              <col width="25%">
              <col width="25%">
            </colgroup>
            <tbody>
              <tr>
                <td colspan="4"> <strong>属性参数</strong> </td>
              </tr>
              <tr>
                <td colspan="2">织法：{{structures || '--'}}</td>
                <td colspan="2">用途：{{usages || '--'}}</td>
              </tr>
              <tr>
                <td colspan="2">成分：{{composition || '--'}}</td>
                <td colspan="2">公斤出米数： <span v-if="metrePerKilo != -1">{{metrePerKilo}} 米/公斤</span> <span v-else>--</span></td>
              </tr>
              <tr>
                <td>幅宽：<span v-if="width">{{width}}{{widthUnit}}</span><span v-else>--</span></td>
                <td>克重：<span v-if="weight">{{weight}}{{weightUnit}}</span> <span v-else>--</span></td>
                <td>空差：{{shortWeight || '--'}}</td>
                <td>纸筒：{{paperTube || '--'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p p20">
        <h6>商品价格</h6>
        <div class="d-line"></div>
        <dl class="info-item pl0" v-if="priceVisible.seka">
          <dt style="min-width:10px;">色卡：</dt>
          <dd>
            <span>销售价:</span>
            <span v-if="colorPrice != -1">{{colorPrice}}元/本</span>
            <span v-else>--</span>
          </dd>
        </dl>
        <dl class="info-item pl0">
          <dt style="min-width:10px;">剪版：</dt>
          <dd>
            <span>成本价:</span>
            <span v-if="cutCostPrice != -1">{{cutCostPrice}}{{cutPriceUnit}}</span>
            <span v-else>--</span>
            <span class="ml20">销售价:</span>
            <span v-if="cutPrice != -1">{{cutPrice}}{{cutPriceUnit}}</span>
            <span v-else>--</span>
          </dd>
        </dl>
        <dl class="info-item pl0">
          <dt style="min-width:10px;">大货：</dt>
          <dd>
            <span>成本价:</span>
            <span v-if="costPrice != -1">{{costPrice}}{{priceUnit}}</span>
            <span v-else>--</span>
            <span class="ml20">销售价:</span>
            <span v-if="price != -1">{{price}}{{priceUnit}}</span>
            <span v-else>--</span>
          </dd>
        </dl>
        <div class="table-warp p14" style="width:90%" v-if="colorPrices.length > 0">
          <table class="table-normal">
            <colgroup>
              <col width="30%">
              <col width="30%">
              <col width="30%">
            </colgroup>
            <thead>
              <tr>
                <th>色号</th>
                <th>成本价</th>
                <th>销售价</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in colorPrices">
                <td>{{item.color}}</td>
                <td>{{item.costPrice}}{{priceUnit}}</td>
                <td>{{item.price}}{{priceUnit}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <div class="basic-msg">
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
    </div> -->
    <!-- <div class="basic-msg">
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
    <div class="detail-group" v-if="viewType == 1">
      <div class="detail-item w100p p20">
        <h6>库存</h6>
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
      </div>
    </div>
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
    <div class="detail-group">
      <div class="detail-item w100p p20">
        <h6>其它</h6>
        <dl class="info-item pl0">
          <dt style="min-width:10px;">备注：</dt>
          <dd>
            {{mark || '--'}}
          </dd>
        </dl>
      </div>
    </div>
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
      this.$router.go(-1)
    }
  }
}

</script>
<style lang="scss" scoped>
table {
  font-size: 12px;
  border-collapse: collapse;
  min-height: 40px !important;
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

.two-word {
  display: inline-block;
  width: 37px;
}

.detail {
  img {
    margin-right: 10px;
  }
  .row {
    clear: both;
    h4 {
      border-bottom: 1px solid #ddd;
      margin: 20px 0;
    }
    .row-right {
      font-size: 14px;
      display: inline-block;
      float: left;
      width: 86%;
      .msg {
        display: inline-block;
        float: left;
        height: 28px;
        line-height: 28px;
      }
      .label {
        height: 28px;
        line-height: 28px;
        float: left
      }
    }
    .row-left {
      margin-right: 8px;
      display: inline-block;
      float: left;
      width: 13%;
      text-align: right;
      padding-right: 10px;
      box-sizing: border-box;
      line-height: 28px;
    }
    .msg {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      float: left;
    }
  }
  .detail-header {
    .row-left {
      margin-right: -8px;
    }
  }
  .basic-msg {
    h5 {
      color: #999;
    }
    .msg-img-label {
      line-height: 40px;
    }
    .color-block {
      clear: both;
      width: 724px;
      min-height: 110px;
      border: 1px solid #ddd;
      margin-top: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
      padding: 0 0 15px 15px;
      box-sizing: border-box;
      span {
        display: inline-block;
        min-width: 35px;
        box-sizing: border-box;
        padding: 0 8px;
        min-height: 20px;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
        margin: 15px 15px 0 0;
        font-size: 12px;
      }
    }
  }
  .detail {
    .property {
      h5 {
        color: #999;
      }
    }
  }
  .stock-table {
    margin-left: 0;
    width: 30%;
  }
  .btn-tip {
    outline: none;
    border-radius: 0;
    color: #666;
    background: #fff;
    border: 1px solid #2fb468;
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
        border-bottom: 24px solid #2fb468;
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
}

.speciality {
  margin: 0;
  margin-bottom: 20px;
  font-weight: 700;
}

.company-msg {
  .imge-array {
    margin-top: 10px;
  }
  .msg-label {
    color: #999;
    margin-right: 10px;
  }
  .msg-img-label {
    line-height: 40px;
  }
}

.goods-price {
  .row-left {
    h5 {
      margin-right: 10px;
      color: #999;
    }
  }
}

.company-msg {
  .row {
    .row-left {
      color: #999;
      p {
        margin-top: 0;
        text-align: left;
      }
    }
  }
}

</style>
