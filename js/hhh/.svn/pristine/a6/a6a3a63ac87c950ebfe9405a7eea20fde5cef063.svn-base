<template>
  <div class="detail">
    <div class="detail-group">
      <div class="detail-item w100p">
        <h6>订单详情 <el-button type="primary" class="fr m10" @click="editMsg">编辑</el-button></h6>
        <dl class="info-item">
          <dt>订单号</dt>
          <dd>{{order.number}}</dd>
        </dl>
        <dl class="info-item">
          <dt>下单时间</dt>
          <dd>{{order.createTime | formatTime}} | 销售员 | {{order.salerName}} | {{order.salerTel}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商</dt>
          <dd>{{order.customerCompany}} ID : {{order.customerNumber}}</dd>
        </dl>
        <div class="info">
          <h4>帐号余额</h4>
          <p>可用余额： &yen;{{caiwuObj.availableBalance | formatMoney}}</p>
          <p>可用白条额度：
            <span v-if="caiwuObj.baitiaoRemainLine && caiwuObj.hasOpenedBaitiao == 1">
            &yen;{{caiwuObj.baitiaoRemainLine | formatNumber}}
          </span>
            <span v-if="caiwuObj.hasOpenedBaitiao == 0"> -- </span>
            <span v-if="caiwuObj.hasOpenedBaitiao != 0 && !caiwuObj.baitiaoRemainLine"> 0.00 </span>
          </p>
          <div class="child">
            白条总额度：
            <span v-if="caiwuObj.baitiaoCreditLine && caiwuObj.hasOpenedBaitiao == 1">
                      &yen;{{caiwuObj.baitiaoCreditLine | formatNumber}}
                    </span>
            <span v-if="caiwuObj.hasOpenedBaitiao == 0">
                      --
                    </span>
            <span v-if="caiwuObj.hasOpenedBaitiao != 0 && !caiwuObj.baitiaoCreditLine">
                      0.00
                    </span> 预扣金额：{{caiwuObj.baitiaoHoldMoney | formatNumber}}
          </div>
          <p>可用信贷额度：
            <span v-if="caiwuObj.yanzhenRemainLine && caiwuObj.hasOpenedYanzhen == 1"> 
            &yen;{{caiwuObj.yanzhenRemainLine | formatNumber}} 
          </span>
            <span v-if="caiwuObj.hasOpenedYanzhen == 0"> -- </span>
            <span v-if="caiwuObj.hasOpenedYanzhen != 0 && !caiwuObj.yanzhenRemainLine"> 0.00 </span></p>
          <div class="child">
            信贷总额度： <span v-if="caiwuObj.yanzhenCreditLine && caiwuObj.hasOpenedYanzhen == 1">
                      &yen;{{caiwuObj.yanzhenCreditLine | formatNumber}}
                    </span>
            <span v-if="caiwuObj.hasOpenedYanzhen == 0">
                      --
                    </span>
            <span v-if="caiwuObj.hasOpenedYanzhen != 0 && !caiwuObj.yanzhenCreditLine">
                      0.00
                    </span> 预扣金额：{{caiwuObj.yanzhenHoldMoney | formatNumber}}
          </div>
          <p>可用垫付额度： &yen;{{caiwuObj.remainLine | formatMoney}}</p>
          <div class="child">
            垫付额度：&yen;{{caiwuObj.creditLine | formatMoney}} 预扣金额：{{caiwuObj.holdMoney | formatNumber}}
          </div>
        </div>
        <dl class="info-item">
          <dt>期望发货时间</dt>
          <dd>{{order.expectedSendTime | formatData}}</dd>
        </dl>
        <dl class="info-item">
          <dt>验货</dt>
          <dd>
            <span v-if="order.checkCloth == 0">不验货</span>
            <span v-else>验货</span>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>发票</dt>
          <dd>
            <span v-if="order.invoiceStatus">开发票({{order.taxPoint}}%)</span>
            <span v-else>不开发票</span>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>配送方式</dt>
          <dd>
            <span v-if="order.sendType == 0">搜芽配送</span>
            <span v-if="order.sendType == 1">采购商自提 </span>
          </dd>
        </dl>
        <dl class="info-item" v-if="order.sendType == 0">
          <dt>收货人信息</dt>
          <dd>
            <p v-if="order.address.name">{{order.address.name}}</p>
            <p>{{order.address.province}}&nbsp;{{order.address.city}}&nbsp;{{order.address.area}}&nbsp;{{order.address.addr}}</p>
            <p v-if="order.address.tel">{{order.address.tel}}</p>
          </dd>
        </dl>
        <dl class="info-item" v-if="order.remark">
          <dt>订单备注</dt>
          <dd>{{order.remark}}</dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-if="product">
      <div class="detail-item order-product pb20">
        <h6>产品信息</h6>
        <dl class="info-item">
          <dt>原供应商</dt>
          <dd>
            <p class="bold">{{product.shopCompany}} ( ID : {{product.sellerNumber}}) </p>
            <p class="c151515">{{product.shopTel}}</p>
            <p class="c151515">{{product.shopProvince}}{{product.shopCity}}{{product.shopArea}}{{product.shopAddr}}</p>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>原供应商货号</dt>
          <dd>{{product.shopOriginalNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>原供应商图片</dt>
          <dd>
            <div class="image-list">
              <div class="show-image">
                <el-col class="card" :href="imgPath + item" :key="item" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="imgPath + item" class="image">
                    <div style="padding: 0;">
                      <p>商品图片
                        <span>({{shopOriginalImgUrls.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </div>
              <div class="show-image">
                <el-col class="card" :href="imgPath + item" :key="item" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="imgPath + item" class="image">
                    <div style="padding: 0;">
                      <p>色卡图片
                        <span>({{shopOriginalColorUrls.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </div>
            </div>
          </dd>
        </dl>
        <div class="table-warp table-product" style="width:50%">
          <h5>产品信息</h5>
          <table class="table-normal table-center">
            <colgroup>
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
            </colgroup>
            <tbody>
              <tr>
                <td>品名</td>
                <td>{{product.title}}</td>
                <td>成分</td>
                <td colspan="2" class="ta-l">{{product.composition}}</td>
              </tr>
              <tr>
                <td>幅宽</td>
                <td>克重</td>
                <td>空差</td>
                <td>纸筒</td>
                <td>公斤出米数</td>
              </tr>
              <tr>
                <td>
                  <span v-if="!product.width || product.width == -1"></span>
                  <span v-else> {{product.width}}{{product.widthUnit}}</span>
                </td>
                <td>
                  <span v-if="!product.weight || product.weight == -1"></span>
                  <span v-else> {{product.weight}}{{product.weightUnit}}</span>
                </td>
                <td>{{product.shortWeight}}</td>
                <td>{{product.paperTube}}</td>
                <td>
                  <span v-if="!product.metrePerKilo || product.metrePerKilo == -1"></span>
                  <span v-else> {{product.metrePerKilo}}米/公斤</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item" style="width:100%">
        <h6>报价信息</h6>
        <el-form ref="fixedFieldsForm" :model="fixedFileds" :rules="fixedFieldsRules" label-width="200px">
          <div class="quote-edit-table" v-if="editType == 'editRetainage'">
            <el-form-item label="供应商:">
              <el-col :span="18">
                <strong v-if="sellerSoouya">{{fixedFileds.ziyingShopCompany}}</strong>
                <strong v-else>{{fixedFileds.shopCompany}}</strong>
              </el-col>
            </el-form-item>
            <el-form-item label="货号:">
              <el-col :span="18">
                <strong v-if="!editProductNumber">{{fixedFileds.productNumber}}</strong>
              </el-col>
            </el-form-item>
            <el-form-item label="是否开搜芽码单:">
              <el-col :span="18">
                <span v-if="fixedFileds.needSoouyaMadan">是</span>
                <span v-else>否</span>
              </el-col>
            </el-form-item>
            <el-form-item label="货源:">
              <el-col :span="18">
                <span v-if="fixedFileds.productSource == 1">订货</span>
                <span v-else>现货</span>
              </el-col>
            </el-form-item>
            <el-form-item label="是否需要付款供应商:">
              <el-col :span="18">
                <span v-if="fixedFileds.needToPaySeller == 1">需要付款</span>
                <span v-else>无需付款</span>
              </el-col>
            </el-form-item>
            <el-form-item label="供应商收款方式:">
              <el-col :span="18">
                <p class="order-msg" v-if="fixedFileds.type == 1 && fixedFileds.replyAccountCompany">{{fixedFileds.replyAccountCompany}}</p>
                <p class="order-msg" v-if="fixedFileds.type == 2 && fixedFileds.replyAccountUser">{{fixedFileds.replyAccountUser}}</p>
                <p class="order-msg" v-if="fixedFileds.replyAccountNumber">{{fixedFileds.replyAccountNumber}}</p>
                <p class="order-msg" v-if="fixedFileds.replyAccountBank">{{fixedFileds.replyAccountBank}}</p>
                <p class="order-msg" v-if="fixedFileds.type == 1">企业账户</p>
                <p class="order-msg" v-if="fixedFileds.type == 2">个人账户</p>
              </el-col>
            </el-form-item>
            <el-form-item label="供应商发票:">
              <el-col :span="18">
                <span v-if="fixedFileds.sellerInvoiceStatus == 1">有</span>
                <span v-else>没有</span>
              </el-col>
            </el-form-item>
            <el-form-item label="供应商税点:">
              <el-col :span="18">
                <span v-if="fixedFileds.sellerTaxPoint">{{fixedFileds.sellerTaxPoint}}%</span>
                <span v-else>--</span>
              </el-col>
            </el-form-item>
          </div>
          <div class="quote-edit-table" v-else>
            <el-form-item label="供应商:">
              <el-col :span="18">
                <span v-if="sellerSoouya">{{fixedFileds.ziyingShopCompany}}</span>
                <span v-else>{{fixedFileds.shopCompany}}</span>
                <span class="click-link ml20" @click="changeShop">修改</span>
              </el-col>
            </el-form-item>
            <el-form-item label="货号:" prop="productNumber" required>
              <el-col :span="18">
                <span v-if="!editProductNumber">{{fixedFileds.productNumber}}</span>
                <span class="click-link ml20" @click="changeProductNumber" v-if="!editProductNumber">修改</span>
                <el-input v-model="fixedFileds.productNumber" class="tax-point" :maxlength="20" v-if="editProductNumber"></el-input>
                <span class="click-link ml20" @click="saveProductNumber" v-if="editProductNumber">保存</span>
              </el-col>
            </el-form-item>
            <el-form-item label="是否开搜芽码单:" required>
              <el-col :span="18">
                <el-radio-group v-model="fixedFileds.needSoouyaMadan">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="货源:" required>
              <el-col :span="18">
                <el-radio-group v-model="fixedFileds.productSource">
                  <el-radio :label="0">现货</el-radio>
                  <el-radio :label="1">订货</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="是否需要付款供应商:" required>
              <el-col :span="18">
                <el-radio-group v-model="fixedFileds.needToPaySeller">
                  <el-radio :label="0">无需付款</el-radio>
                  <el-radio :label="1">需要付款</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="供应商收款方式:" required>
              <el-col :span="18">
                <span idx="selectBankAccount" class="click-link" @click="selectBankAccount" v-if="!fixedFileds.replyAccountBank">请选择</span>
                <span class="click-link" @click="selectBankAccount" v-if="fixedFileds.replyAccountBank">重新选择</span>
                <p class="order-msg" v-if="fixedFileds.type == 1 && fixedFileds.replyAccountCompany">{{fixedFileds.replyAccountCompany}}</p>
                <p class="order-msg" v-if="fixedFileds.type == 2 && fixedFileds.replyAccountUser">{{fixedFileds.replyAccountUser}}</p>
                <p class="order-msg" v-if="fixedFileds.replyAccountNumber">
                  {{fixedFileds.replyAccountNumber}}
                </p>
                <p class="order-msg" v-if="fixedFileds.replyAccountBank">{{fixedFileds.replyAccountBank}}</p>
                <p class="order-msg" v-if="fixedFileds.type == 1">企业账户</p>
                <p class="order-msg" v-if="fixedFileds.type == 2">个人账户</p>
              </el-col>
            </el-form-item>
            <el-form-item label="供应商发票:" required>
              <el-col :span="18">
                <el-radio-group v-model="fixedFileds.sellerInvoiceStatus">
                  <el-radio :label="1">有</el-radio>
                  <el-radio :label="0">没有</el-radio>
                </el-radio-group>
              </el-col>
            </el-form-item>
            <el-form-item label="供应商税点:" required prop="sellerTaxPoint" v-if="fixedFileds.sellerInvoiceStatus == 1">
              <el-col :span="18">
                <el-input v-model="fixedFileds.sellerTaxPoint" class="tax-point"></el-input>%
              </el-col>
            </el-form-item>
            <el-form-item>
            </el-form-item>
          </div>
          <el-form-item label="开细码单:">
            <el-col :span="24">
              <div class="price-msg-body table-warp">
                <table class="table table-center">
                  <tbody>
                    <tr>
                      <td colspan="8">
                        采 购 报 价 单
                        <el-button class="fr" type="primary" @click="preview">预览销售码单</el-button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="red">*</span>色号</td>
                      <td>
                        <span class="red">*</span>细码数</td>
                      <td>
                        采购数量（{{order.unit}}）</td>
                      <td>
                        <span class="red">*</span>成本价
                        <p>
                          （
                          <el-select v-model="unitFlag" placeholder="请选择单位" class="unit-select">
                            <el-option v-for="item in unitOptions" :key="item.val" :label="item.label" :value="item.val"> </el-option>
                          </el-select>）
                        </p>
                      </td>
                      <td>
                        <span class="red">*</span>采购价
                        <p>
                          （
                          <el-select v-model="unitFlag" placeholder="请选择单位" class="unit-select">
                            <el-option v-for="item in unitOptions" :key="item.val" :label="item.label" :value="item.val"> </el-option>
                          </el-select>）
                        </p>
                      </td>
                      <td>
                        <span class="red">*</span>销售价
                        <p>
                          （
                          <el-select v-model="unitFlag" placeholder="请选择单位" class="unit-select">
                            <el-option v-for="item in unitOptions" :key="item.val" :label="item.label" :value="item.val"> </el-option>
                          </el-select>）
                        </p>
                      </td>
                      <td>客户设计款号</td>
                      <td>操作</td>
                    </tr>
                    <template v-for="(item, index) in productList">
                      <tr :key="index">
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item prop="color">
                              <el-input idx="color" v-model="item.color" :maxlength="20" size="small"></el-input>
                            </el-form-item>
                          </el-form>
                        </td>
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item prop="xiMaShu">
                              <el-input idx="xiMaShu" type="textarea" autosize resize="none" v-model="item.xiMaShu" @keyup.enter.stop.native="splitXiMa(index)" @keyup.stop.native="nan(index)" @change.stop.native="nan(index)"></el-input>
                            </el-form-item>
                          </el-form>
                        </td>
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item>
                              <p style="text-align:center">{{item.quantity}}</p>
                            </el-form-item>
                          </el-form>
                        </td>
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item prop="price">
                              <el-input idx="price" v-model="item.price"></el-input>
                            </el-form-item>
                          </el-form>
                        </td>
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item prop="buyPrice">
                              <el-input idx="buyPrice" v-model="item.buyPrice"></el-input>
                            </el-form-item>
                          </el-form>
                        </td>
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item prop="salePrice">
                              <el-input idx="salePrice" v-model="item.salePrice"></el-input>
                            </el-form-item>
                          </el-form>
                        </td>
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item prop="outMaZhiRemark">
                              <el-input idx="outMaZhiRemark" v-model="item.outMaZhiRemark" :maxlength="20"></el-input>
                            </el-form-item>
                          </el-form>
                        </td>
                        <td>
                          <el-form :ref="`dynamicFieldsForm${index}`" :model="item" :rules="dynamicFieldsRules" class="dynamic-form">
                            <el-form-item>
                              <span class="icon-del" @click="delColor(index)"></span>
                            </el-form-item>
                          </el-form>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <el-button class="ml14" type="primary" @click="addColor" v-if="this.productList.length < 20">添加色号+</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="货款确认:" class="quote-ensure">
            <el-col :span="24">
              <div class="confirm-form">
                <el-form-item class="form-item form-item1">
                  <span style="color:red">*&nbsp;</span>销售货款（元）
                </el-form-item>
                <el-form-item class="form-item form-item1">
                  <span style="color:red">*&nbsp;</span>成本货款不含税（元）
                </el-form-item>
                <el-form-item class="form-item form-item1">
                  <span style="color:red">*&nbsp;</span>采购货款不含税（元）
                </el-form-item>
                <el-form-item class="form-item form-item1 " v-if="order.invoiceStatus">
                  <span style="color:red">*&nbsp;</span>采购商税款（元）
                </el-form-item>
                <el-form-item class="form-item form-item1 " v-if="fixedFileds.sellerInvoiceStatus == 1">
                  <span style="color:red">*&nbsp;</span>供应商税款（元）
                </el-form-item>
                <el-form-item class="form-item form-item1" v-if="fixedFileds.productSource == 1">
                  <span style="color:red" v-if="editType != 'editRetainage'">*&nbsp;</span> 订金（元）
                </el-form-item>
                <el-form-item class="form-item form-item1" v-if="fixedFileds.productSource == 1">
                  <span style="color:red">*&nbsp;</span>销售货款尾款（元）
                </el-form-item>
                <el-form-item class="form-item form-item1" v-if="fixedFileds.productSource == 1">
                  <span style="color:red">*&nbsp;</span>成本货款尾款（元）
                </el-form-item>
              </div>
              <div class="confirm-form">
                <el-form-item prop="saleMoney" class="form-item">
                  <el-input idx="saleMoney" v-model="fixedFileds.saleMoney" @keyup.native="countFinalMoney"></el-input>
                </el-form-item>
                <el-form-item prop="costMoneyOffTax" class="form-item">
                  <el-input idx="costMoneyOffTax" v-model="fixedFileds.costMoneyOffTax"></el-input>
                </el-form-item>
                <el-form-item prop="buyMoneyOffTax" class="form-item">
                  <el-input idx="buyMoneyOffTax" v-model="fixedFileds.buyMoneyOffTax"></el-input>
                </el-form-item>
                <el-form-item prop="taxMoney" class="form-item" v-if="order.invoiceStatus">
                  <el-input idx="taxMoney" v-model="fixedFileds.taxMoney"></el-input>
                </el-form-item>
                <el-form-item prop="" class="form-item" v-if="fixedFileds.sellerInvoiceStatus == 1">
                  <el-input v-model="fixedFileds.sellerTaxMoney"></el-input>
                </el-form-item>
                <el-form-item prop="earnestMoney" class="form-item" v-if="fixedFileds.productSource == 1">
                  <el-input idx="earnestMoney" v-model="fixedFileds.earnestMoney" v-if="editType != 'editRetainage'" @keyup.native="countFinalMoney"></el-input>
                  <p v-else style="text-align: center">{{fixedFileds.earnestMoney}}</p>
                </el-form-item>
                <el-form-item prop="finalMoney" class="form-item" v-if="fixedFileds.productSource == 1">
                  <el-input idx="finalMoney" v-model="fixedFileds.finalMoney" v-if="order.status == 335"></el-input>
                  <span v-else>{{fixedFileds.finalMoney}}</span>
                </el-form-item>
                <el-form-item class="form-item" v-if="fixedFileds.productSource == 1">
                  <span>{{costFinalMoney}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="上传付款凭据:" class="p14">
            <div class="fl">
              <a :href="imgPath + item" :key="item" v-lightbox="buyerCertificateList" v-for="(item, index) in buyerCertificateList" class="madan-wrap">
                  <img :src="imgPath + item" width='86' height="86" />
                  <span @click="delBuyerCertificate(item)" class="del-arrow">X</span>
                </a>
            </div>
            <el-upload idx="buyerCertificateList" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" class="fl" :before-upload="beforeBuyerCertificateUpload" :on-success="buyerCertificateSuccess" :on-error="handleError" v-if="buyerCertificateList.length < 9">
              <div class="icon-upload"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传原供应商码单:" class="p14">
            <div class="fl">
              <a :href="imgPath +item" :key="item" v-lightbox="sellerMadanImgUrls" v-for="(item, index) in sellerMadanImgUrls" class="madan-wrap">
                  <img :src="imgPath + item" width='86' height="86" />
                  <span @click="delSellerMadan(item)" class="del-arrow">X</span>
                </a>
            </div>
            <el-upload idx="sellerMadanImgUrls" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" class="fl" :before-upload="beforeSellerMadanUpload" :on-success="sellerMadanSuccess" :on-error="handleError" v-if="sellerMadanImgUrls.length < 9">
              <div class="icon-upload"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="采购备注:">
            <el-col :span="18">
              <div class="form-warp">
                <textarea idx="guiderRemark" v-model="fixedFileds.guiderRemark" maxlength="500" placeholder="请输入内容"></textarea>
                <span class="font-count" style="bottom:12px;">{{remarkLength}}/500字</span>
              </div>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="detail-group quote-total">
      <div class="detail-item" style="width:100%">
        <h4>合计 : {{allNumber}} 匹 / {{allQuantity}}{{order.unit}}</h4>
        <ul>
          <li>销售货款：
            <span class="red">&yen;{{fixedFileds.saleMoney}}</span>
          </li>
          <li>成本货款（不含税）：
            <span class="red">&yen;{{fixedFileds.costMoneyOffTax}}</span>
          </li>
          <li>采购货款（不含税）：
            <span class="red">&yen;{{fixedFileds.buyMoneyOffTax}}</span>
          </li>
          <li v-if="order.invoiceStatus">
            采购商税款:
            <span class="red">&yen;{{fixedFileds.taxMoney}}</span> ({{order.taxPoint}}%)
          </li>
          <li v-if="fixedFileds.sellerInvoiceStatus == 1">供应商税款:
            <span class="red">&yen;{{fixedFileds.sellerTaxMoney}}</span> ({{fixedFileds.sellerTaxPoint}}%)
          </li>
          <li v-if="fixedFileds.productSource == 1">
            销售订金: &yen;{{fixedFileds.earnestMoney}}
          </li>
          <li v-if="fixedFileds.productSource == 1">
            销售货款尾款: &yen;{{fixedFileds.finalMoney}}
          </li>
          <li v-if="fixedFileds.productSource == 1">
            成本货款尾款: &yen;{{costFinalMoney}}
          </li>
          <li>毛利率:
            <span class="red">{{interestRate}}%</span>
          </li>
        </ul>
        <div class="btns-group">
          <el-button type="primary" @click="saveDraft" :disabled="isSaveDraft">保存草稿</el-button>
          <el-button type="warning" @click="informPay('/redwood/bulk/notifyPay')" v-if="order.status != 335 && fixedFileds.productSource != 1" :disabled="isInformPay">通知付款</el-button>
          <el-button type="warning" @click="informPay('/redwood/bulk/notifyPay')" v-if="order.status != 335 && fixedFileds.productSource == 1" :disabled="isInformPay">通知付订金</el-button>
          <el-button type="warning" @click="informPayFinal('/redwood/bulk/notifyPayFinal')" v-if="order.status == 335" :disabled="isInformPay">通知付尾款</el-button>
        </div>
      </div>
    </div>
    <lightbox />
    <el-dialog title="编辑基本信息" :visible.sync="editMsgVisible" class="edit-basic-msg">
      <el-form :model="basicMsgForm" ref="form" label-width="150px" :rules="basicMsgFormRelues">
        <el-form-item label="验货" required>
          <el-radio-group v-model="basicMsgForm.checkCloth">
            <el-radio :label="1">验货</el-radio>
            <el-radio :label="0">不验货</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票" required>
          <el-radio-group v-model="basicMsgForm.invoiceStatus">
            <el-radio :label="1">要</el-radio>
            <el-radio :label="0">不要</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="税点" prop="taxPoint" required v-if="basicMsgForm.invoiceStatus == 1" style="margin-bottom: 20px;">
          <el-input style="width: 200px;" v-model="basicMsgForm.taxPoint"></el-input> %
        </el-form-item>
        <el-form-item label="配送方式" required>
          <el-radio-group v-model="basicMsgForm.sendType">
            <el-radio :label="0">搜芽配送</el-radio>
            <el-radio :label="1">采购商自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收货人信息" required v-if="basicMsgForm.sendType == 0">
          <h4 class="order-msg">{{basicMsgForm.address.name}}</h4>
          <p class="order-msg">
            {{basicMsgForm.address.province}} {{basicMsgForm.address.city}} {{basicMsgForm.address.area}} {{basicMsgForm.address.addr}}
          </p>
          <p class="order-msg">
            {{basicMsgForm.address.tel}}
          </p>
        </el-form-item>
        <el-form-item label="" v-if="basicMsgForm.sendType == 0">
          <el-button type="text" @click.native="changeAddrMsg()">更改收货地址&nbsp></el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="saveEditMsg('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- dialog3.0 -title:收货人管理 -内容：多个收货地址和新增地址等按钮 -功能：选择、编辑、删除、新增收货地址 -->
    <el-dialog v-model="dialogVisible.changeAddr" size="tiny" title="收货人管理" style="max-height:650px;">
      <div style="max-height:300px;overflow-y: scroll">
        <table class="table-box" border="1" border-spacing="0">
          <tr v-for="(item, index) in dialogData.AddrList">
            <td class="tdLeft">
              <label>
                <el-radio :label="item.id" v-model="basicMsgForm.address.id">{{item.name}}</el-radio>
              </label>
              <template v-if="item.isDefault == 1">
                <span style="margin-left: 40%;">√设为默认</span>
              </template>
              <div style="display:block;padding-left:21px;">
                <span>{{item.province}}&nbsp{{item.city}}&nbsp{{item.area}}&nbsp{{item.addr}}</span>
                </br>
                <span>{{item.tel}}</span>
              </div>
            </td>
            <td class=tdRight>
              <el-button type="text" @click.native="handleEditAddr(item)">编辑</el-button>
              <el-button type="text" @click.stop.native="handleDeleteAddr(item)">删除</el-button>
            </td>
          </tr>
        </table>
      </div>
      <el-button type="text" style="margin-left:30px;" @click.native="handleNewAddr">新增收货地址&nbsp+</el-button>
      <footer style="text-align:center;margin-top:20px;">
        <el-button type="primary" size="small" @click.native="confirmSelectAddr">选好了</el-button>
      </footer>
    </el-dialog>
    <!-- dialog4.0 title:新增/修改收货地址 -内容：收货地址的编辑或新增 -功能：新增或修改收货地址 -->
    <el-dialog title="新增/修改收货人" size="tiny" v-model="dialogVisible.newEditAddr">
      <div style="margin-left:50px;">
        <el-form label-width="80px" label-position="right" :rules="infoRules" :model="reqAddrParams" ref="reqAddrParams">
          <el-form-item label="姓名" prop="name">
            <el-input style="width:220px" v-model="reqAddrParams.name" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input style="width:220px" v-model="reqAddrParams.tel" type="number" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="省市区" required>
            <y-address :province="reqAddrParams.province " :city="reqAddrParams.city " :area="reqAddrParams.area" @change="handleNewAddrSelection" />
          </el-form-item>
          <el-form-item label="收货地址" prop="addr">
            <el-input v-model="reqAddrParams.addr" style="width:220px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <footer style="padding-left:25%;margin-top:20px;">
        <el-button type="primary" size="small" @click.native="handleSaveNewEditAddr('reqAddrParams')" :disabled="checkOutInput2()">保存</el-button>
        <el-button size="small" @click.native="dialogVisible.newEditAddr = false">取消</el-button>
      </footer>
    </el-dialog>
    <!-- dialog5.0 -title:供应商管理选择、新增供应商-->
    <el-dialog v-model="dialogVisible.changeShop" size="tiny" title="请选择供应商" style="max-height:750px;">
      <div class="dlg-search-wrap">
        <div class="item">
          <el-input placeholder="输入关键字" v-model="dialogData.company" @keydown.enter.stop.native="searchShop"></el-input>
        </div>
        <el-button type="primary" @click="searchShop">搜索</el-button>
      </div>
      <div class="adr-wrap" ref="wrap">
        <div class="adr-content">
          <div class="item" v-for="(item, index) in dialogData.shopList" :class="{ 'item-disabled': !item.check && item.id != addShopId}">
            <div class="radio">
              <el-radio :label="item.id" v-model="order.ziyingShopId" :disabled="!item.check && item.id != addShopId">
              </el-radio>
            </div>
            <div class="info">
              <p class="font">{{item.company}}<span v-if="item.sellerSoouya ==1" class="green">(搜芽自营)</span>
              </p>
              <p>档口电话: {{item.tel}}</p>
              <p>档口地址: {{item.province}} {{item.city}}{{item.area}}{{item.addr}}</p>
            </div>
            <div class="status">
              <div v-if="!addShopId">
                <p v-if="item.check == 1 " class="green">已审核</p>
                <p v-else class="error">请联系管理员审核后使用</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="wrap">
        </mugen-scroll>
      </div>
      <div class="dlg-btn-groups">
        <el-button class="fl" type="warning" @click.native="handleNewShop">+ 新增供应商</el-button>
        <el-button class="fr" type="primary" @click.native="confirmSelectShop">选好了</el-button>
      </div>
    </el-dialog>
    <!-- dialog6.0 title:新增供应商 -->
    <el-dialog title="新增供应商" size="tiny" v-model="dialogVisible.newShop">
      <div style="margin-left:50px;">
        <el-form label-width="80px" label-position="right" :rules="shopRules" :model="reqShopParams" ref="reqShopParams">
          <el-form-item label="档口名" prop="company" required>
            <el-input style="width:220px" v-model="reqShopParams.company" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="电话类型">
            <el-radio-group label="电话类型" v-model="reqShopParams.telType">
              <el-radio :label="1">手机</el-radio>
              <el-radio :label="2">固话</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="档口电话" v-if="reqShopParams.telType == 2" required>
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
        <el-button type="primary" size="small" @click.native="handleSaveNewShop('reqShopParams')" :disabled="checkOutInput3()">保存</el-button>
      </footer>
    </el-dialog>
    <!-- dialog7.0 -title:搜索自营的货号-->
    <el-dialog v-model="dialogVisible.changeNumber" size="tiny" title="请选择货号" style="max-height:650px;">
      <el-input placeholder="输入关键字" style="width: 50%" v-model="dialogData.number" @keydown.enter.stop.native="searchNumber"></el-input>
      <el-button type="primary" icon="search" size="small" @click="searchNumber">搜索</el-button>
      <div style="max-height:300px;margin-top: 20px;overflow-y: scroll" ref="wrap">
        <ul class="dialog-list">
          <li v-for="(item, index) in dialogData.numberList">
            <p>
              <el-radio :label="item.number" v-model="fixedFileds.productNumber">
                <strong>{{item.number}}</strong>
              </el-radio>
            </p>
            <p v-if="item.cutPrice == '-1'">剪版：-</p>
            <p v-else>剪版：{{item.cutPrice}}{{item.cutPriceUnit}}</p>
            <p v-if="item.priceMin != -1 && item.priceMax != -1">
              <span>大货：{{item.priceMin}}{{item.priceUnit}} ~ {{item.priceMax}}{{item.priceUnit}}</span>
            </p>
            <p v-if="item.priceMin == -1 && item.priceMax == -1">
              <span>大货：-</span>
            </p>
            <p v-if="item.priceMin == -1 && item.priceMax != -1">
              <span>大货：{{item.priceMax}}{{item.priceUnit}}</span>
            </p>
            <p>
              <span v-if="item.composition">成分：{{item.composition}}</span>
              <span v-else>成分：--</span>
            </p>
            <p>
              <span v-if="!item.width || item.width == -1">幅宽：--</span>
              <span v-else>幅宽：{{item.width}}{{item.widthUnit}}</span>
            </p>
            <p>
              <span v-if="!item.weight || item.weight == -1">克重：--</span>
              <span v-else>克重：{{item.weight}}{{item.weightUnit}}</span>
            </p>
            <p>
              <span v-if="item.shortWeight">空差：{{item.shortWeight}}</span>
              <span v-else>空差：--</span>
            </p>
          </li>
        </ul>
        <mugen-scroll :handler="addNmuber" :should-handle="!loading" scroll-container="wrap">
        </mugen-scroll>
      </div>
      <footer style="text-align:center;margin-top:20px;">
        <el-button type="primary" size="small" @click.native="confirmSelectNumber">选好了</el-button>
      </footer>
    </el-dialog>
    <!-- dialog3.0 -title:供应商收款方式 -->
    <el-dialog v-model="dialogVisible.changeCollection" size="tiny" title="供应商收款方式" style="max-height:650px;">
      <div class="bank-wrap" v-if="dialogData.collectionList.length">
        <div class="bank-content">
          <div class="item" v-for="(item, index) in dialogData.collectionList">
            <div class="radio">
              <el-radio idx="bankAccountId" :label="item.id" v-model="fixedFileds.bankAccountId">
              </el-radio>
            </div>
            <div class="info">
              <p class="font">
                <span v-if="item.type == 1">{{item.replyAccountCompany}}</span>
                <span v-else>{{item.replyAccountUser}}</span>
                <span class="sign">{{item.type==1?'企业':'个人'}}</span>
              </p>
              <p>卡号: {{item.replyAccountNumber}}</p>
              <p>银行: {{item.replyAccountBank}}</p>
            </div>
            <div class="op">
              <div>
                <span class="icon-notify" title="编辑" @click="handleEditCollection(item)"></span>
                <span class="icon-del ml10" title="删除" @click="handleDeleteCollection(item)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dlg-btn-groups">
        <el-button class="fl" type="warning" @click.native="handleNewCollection">+ 新增收款方式</el-button>
        <el-button idx="confirmSelectCollection" class="fr" type="primary" @click.native="confirmSelectCollection">选好了</el-button>
      </div>
    </el-dialog>
    <!-- dialog6.0 title:新增供应商 -->
    <el-dialog title="新增/编辑供应商收款方式" size="tiny" v-model="dialogVisible.newCollection">
      <div style="margin-left:50px;">
        <el-form label-width="80px" label-position="right" :rules="collectioRules" :model="reqCollectionPrams" ref="collection">
          <el-form-item label="账户类型" required>
            <el-radio-group label="账户类型" v-model="reqCollectionPrams.type">
              <el-radio :label="1">企业</el-radio>
              <el-radio :label="2">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开户名" prop="replyAccountCompany" required v-if="reqCollectionPrams.type == 1">
            <el-input style="width:194px" v-model="reqCollectionPrams.replyAccountCompany" :maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="开户名" prop="replyAccountUser" required v-if="reqCollectionPrams.type == 2">
            <el-input style="width:194px" v-model="reqCollectionPrams.replyAccountUser" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" required>
            <el-input style="width:194px" v-model="reqCollectionPrams.replyAccountNumber" :maxlength="25"></el-input>
          </el-form-item>
          <el-form-item label="银行名称" prop="replyAccountBank" required>
            <el-select v-model="reqCollectionPrams.replyAccountBank" placeholder="请选择开户银行" @change="changeBank">
              <el-option v-for="item in bankDisplayList" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户地区" required>
            <el-form-item prop="province" style="display:inline-block;float:left">
              <el-select v-model="reqCollectionPrams.province" placeholder="请选择开户省份" @change="changeProvince">
                <el-option v-for="item in provinceList" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="city" style="display:inline-block;float:left">
              <el-select v-model="reqCollectionPrams.city" placeholder="请选择开户地区">
                <el-option v-for="item in cityList" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <footer style="padding-left:25%;margin-top:20px;">
        <el-button type="primary" size="small" @click.native="handleSaveNewCollection('collection')">保存</el-button>
      </footer>
    </el-dialog>
    <!-- dialog7.0 -title:搜索自营的货号-->
    <el-dialog v-model="dialogVisible.changeColor" size="tiny" title="请选择色号" style="max-height:650px;">
      <div style="max-height:300px;overflow-y: scroll" ref="wrap" v-if="colorsArr">
        <ul class="dialog-list">
          <li v-for="(item, index) in colorsArr" v-if="item.show">
            <p>
              <el-radio :label="item.color" v-model="color">
                <strong>{{item.color}}</strong>
              </el-radio>
            </p>
            <p>
              <span>销售价：&yen;{{item.price}}</span>
            </p>
            <p>
              <span>采购价：&yen;{{item.costPrice}}</span>
            </p>
          </li>
        </ul>
      </div>
      <footer style="text-align:center;margin-top:20px;">
        <el-button type="primary" size="small" @click.native="confirmSelectColor">选好了</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import YAddress from 'components/y-address/index'
import MugenScroll from 'vue-mugen-scroll'
import lrz from 'lrz'
import {
  request,
  newRequest,
  formatTimeString
} from 'utils/tool'
export default {
  components: {
    Lightbox,
    MugenScroll,
    'y-address': YAddress,
  },
  data() {
    var checkxima = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写细码数'));
      } else {
        setTimeout(() => {
          var reg = /^[\d.//]*$/
          if (!reg.test(value)) {
            callback(new Error('细码数只能是数字'));
          } else if (value.indexOf('//') > -1) {
            callback(new Error('不能连续输入多个/'))
          } else {
            var arr = value.split('/')
            let reg1 = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
            arr.map((item) => {
              if (item && !isNaN(Number(item)) && !reg1.test(item)) {
                callback(new Error('细码数小数点后只能两位'));
              }
            })
            if (arr.length > 1000) {
              callback(new Error('不能添加太多细码数'));
            } else {
              callback();
            }
          }
        }, 300);
      }
    }
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写值'));
      } else {
        setTimeout(() => {
          var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
          if (!reg.test(value)) {
            callback(new Error('请输入数字,小数点后最多两位'));
          } else {
            if (value > 1000000) {
              callback(new Error('数值不能大于1000000'));
            } else {
              callback();
            }
          }
        }, 300);
      }
    }
    var checkTaxPoint = (rule, value, callback) => {
      if (value == null) {
        callback(new Error('请填写值'));
      } else {
        setTimeout(() => {
          var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
          if (!reg.test(value)) {
            callback(new Error('请输入数字,小数点后最多两位'));
          } else {
            if (value > 100) {
              callback(new Error('请填写正确的税点'));
            } else {
              callback();
            }
          }
        }, 300);
      }
    }
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
    var checkBank = (rule, value, callback) => {
      if (!value) {
        callback(new Error('银行卡号不能为空'));
      } else {
        setTimeout(() => {
          var reg = /^[\d]{15,25}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的银行卡号'));
          } else {
            callback();
          }
        }, 300);
      }
    }
    return {
      reqNumber: null, // 进来请求详情的number
      customerId: null, // 进来请求财务那边信息的
      caiwuObj: {}, // 保留财务各种金额信息的
      editType: null, // 区分报价和编辑尾款
      addShopId: '',
      order: {}, // 存储订单信息
      oldShopId: null,
      product: {
        shopCompany: '',
      },
      shopOriginalImgUrls: [],
      shopOriginalColorUrls: [],
      imgPath: 'http://www.soouya.com',
      editMsgVisible: false,
      dialogVisible: {
        changeAddr: false, // dialog3.0
        newEditAddr: false, // dialog4.0
        changeShop: false, // dialog5.0
        newShop: false, // dialog6.0
        changeNumber: false, // dialog7.0
        changeCollection: false, // dialog7.0
        newCollection: false, // dialog7.0
        changeColor: false
      },
      dialogData: {
        AddrList: [], // 搜索地址的时候的地址列表
        shopList: [], // 搜索店铺的时候的店铺列表
        numberList: [], // 搜索货号的时候货号的列表
        company: '', // 搜索档口的时候的关键字
        shopPageNumber: 1, // 搜索档口的时候的初始页码
        number: '', // 搜索货号的时候的关键字
        numberPageNumber: 1, // 搜索货号的时候的初始页码
        collectionList: [] // 收款账号列表
      },
      basicMsgForm: {
        checkCloth: '',
        invoiceStatus: '',
        reconciliationType: '',
        sendType: '',
        address: {
          id: '',
          province: '',
          city: '',
          area: '',
          addr: '',
          name: '',
          tel: '',
        },
        addressId: ''
      },
      unitFlag: null, // 临时保存单位的变量只是页面显示最后提交的时候用
      sellerSoouya: '',
      editProductNumber: '',
      saveFlag: false,
      remarkLength: 0,
      fixedFileds: {
        clothId: null,
        saleMoney: '',
        costMoneyOffTax: '',
        needSoouyaMadan: 0,
        buyMoneyOffTax: '',
        earnestMoney: '',
        finalMoney: '',
        taxMoney: '', // 采购商税款
        sellerTaxMoney: '', // 供应商税款
        ziyingShopCompany: '',
        shopCompany: '',
        productNumber: '',
        productSource: '',
        needToPaySeller: '',
        sellerInvoiceStatus: '',
        sellerTaxPoint: '',
        bankAccountId: '',
        type: '',
        replyAccountCompany: '',
        replyAccountUser: '',
        replyAccountBank: '',
        replyAccountNumber: '',
        guiderRemark: null
      },
      costFinalMoney: null, // 成本货款尾款只是前端展示不涉及前后端交互
      buyerCertificateList: [],
      sellerMadanImgUrls: [],
      productList: [{
        color: '',
        xiMaShu: '',
        quantity: '',
        price: '',
        buyPrice: '',
        salePrice: '',
        outMaZhiRemark: '',
      }],
      unitOptions: [
        {label: '元/米', val: '元/米'},
        {label: '元/码', val: '元/码'},
        {label: '元/公斤', val: '元/公斤'},
        {label: '元/匹', val: '元/匹'},
        {label: '元/个', val: '元/个'},
        {label: '元/平方英尺', val: '元/平方英尺'},
        {label: '元/条', val: '元/条'},
        {label: '元/罗', val: '元/罗'},
        {label: '元/对', val: '元/对'},
        {label: '元/件', val: '元/件'},
        {label: '元/厘米', val: '元/厘米'},
      ],
      reqAddrParams: { // 设置地址的参数
        id: '',
        userId: '',
        name: '',
        isDefault: '',
        tel: '',
        province: '',
        city: '',
        area: '',
        addr: '',
      },
      reqShopParams: { // 设置地址的参数
        company: '',
        telType: 1,
        tel: '',
        areaCode: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        addr: '',
      },
      reqCollectionPrams: {
        bankId: '',
        city: '',
        id: '',
        province: '',
        replyAccountBank: '',
        replyAccountCompany: '',
        replyAccountNumber: '',
        replyAccountUser: '',
        shopId: '',
        type: 1,
        _time: '',
      },
      addNewCollection: false,
      buyerCertificateError: false,
      sellerMadanError: false,
      replyAccountBank: null,
      bankDisplayList: [],
      bankList: [],
      branchBankList: [],
      provinceList: [],
      cityList: [],
      bankAllData: null,
      isSaveDraft: false, // 提交后让按钮禁用防止重复提交
      isInformPay: false, // 提交后让按钮禁用防止重复提交
      fixedFieldsRules: {
        productNumber: [
          { required: true, message: '货号不能为空', trigger: 'blur' }
        ],
        sellerTaxPoint: [
          { validator: checkTaxPoint, trigger: 'blur' }
        ],
        saleMoney: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        costMoneyOffTax: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        buyMoneyOffTax: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        earnestMoney: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        finalMoney: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        taxMoney: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        sellerTaxMoney: [
          { validator: checkNumber, trigger: 'blur' }
        ],
      },
      basicMsgFormRelues: {
        taxPoint: [
          { validator: checkTaxPoint, trigger: 'blur' }
        ],
      },
      dynamicFieldsRules: {
        color: [
          { required: true, message: '请填写色号', trigger: 'blur' }
        ],
        xiMaShu: [
          { validator: checkxima, trigger: 'blur' }
        ],
        quantity: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        price: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        buyPrice: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        salePrice: [
          { validator: checkNumber, trigger: 'blur' }
        ]
      },
      item: null,
      allNumber: 0,
      allQuantity: 0,
      interestRate: null,
      companyFinalMoney: null,
      sellerFinalMoney: null,
      colorsArr: [],
      color: '',
      infoRules: {
        name: [{
            required: true,
            trigger: 'blur',
            message: '姓名不能为空'
          },
          {
            min: 2,
            max: 10,
            trigger: 'blur',
            message: '请输入2-10个字符'
          }
        ],
        tel: [
          { validator: checkTel, trigger: 'blur' }
        ],
        addr: [{
            required: true,
            trigger: 'blur',
            message: '收货地址不能为空'
          },
          {
            min: 5,
            max: 30,
            trigger: 'blur',
            message: '请输入5-30个字符'
          }
        ]
      },
      collectioRules: {
        replyAccountUser: [{
            required: true,
            trigger: 'blur',
            message: '开户名不能为空'
          },
          {
            min: 2,
            max: 10,
            trigger: 'blur',
            message: '请输入2-10个字符'
          }
        ],
        replyAccountCompany: [{
            required: true,
            trigger: 'blur',
            message: '开户名不能为空'
          },
          {
            min: 2,
            max: 100,
            trigger: 'blur',
            message: '请输入100个以内的字符'
          }
        ],
        replyAccountNumber: [
          { validator: checkBank, trigger: 'blur' }
        ],
        replyAccountBank: [
          { required: true, message: '请选择开户银行', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择开户省份', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择开户地区', trigger: 'change' }
        ],
        replyAccountBranch: [
          { required: true, message: '请选择开户支行网点', trigger: 'change' }
        ]
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
    }
  },
  filters: {
    formatData(val) {
      return Number(val) != 0 ? formatTimeString(val) : '--'
    },
    formatNumber(val) {
      if (val) {
        return val.toFixed(2)
      } else {
        return '0.00'
      }
    }
  },
  mounted() {
    var obj = JSON.parse(localStorage.getItem('guiderOfferMsg'))
    this.editType = obj.editType
    this.reqNumber = obj.reqNumber
    this.customerId = obj.customerId
    this.getBank();
    this.getData()
  },
  watch: {
    unitFlag(value) {
      if (value.split('/').length > 1) {
        this.order.unit = value.split('/')[1];
      }
    },
    order: {
      handler: function(val) {
        if (this.fixedFileds.saleMoney && !isNaN(Number(this.fixedFileds.saleMoney))) {
          if (!this.order.invoiceStatus) {
            this.fixedFileds.taxMoney = 0;
          } else {
            let taxPercentage = (this.order.taxPoint - 0 + 100) / 100
            let money = this.fixedFileds.saleMoney / taxPercentage
            this.fixedFileds.taxMoney = this.fixedFileds.saleMoney - money
            this.fixedFileds.taxMoney = this.fixedFileds.taxMoney ? this.fixedFileds.taxMoney.toFixed(2) : null
          }
        }
        if (this.fixedFileds.saleMoney && !isNaN(Number(this.fixedFileds.saleMoney)) && !isNaN(Number(this.fixedFileds.taxMoney)) && this.fixedFileds.costMoneyOffTax && !isNaN(Number(this.fixedFileds.costMoneyOffTax))) {
          let interestRate1 = null;
          if (!this.order.invoiceStatus) {
            this.fixedFileds.taxMoney = 0;
          } else {
            if (this.fixedFileds.saleMoney && !isNaN(Number(this.fixedFileds.saleMoney))) {
              let taxPercentage = (this.order.taxPoint - 0 + 100) / 100
              let money = this.fixedFileds.saleMoney / taxPercentage
              this.fixedFileds.taxMoney = this.fixedFileds.saleMoney - money
              this.fixedFileds.taxMoney = this.fixedFileds.taxMoney ? this.fixedFileds.taxMoney.toFixed(2) : null
            }
          }
          interestRate1 = ((this.fixedFileds.saleMoney - this.fixedFileds.taxMoney - this.fixedFileds.costMoneyOffTax) / (this.fixedFileds.saleMoney - this.fixedFileds.taxMoney))
          this.interestRate = (interestRate1 * 100).toFixed(2)
        }
      },
      deep: true
    },
    reqCollectionPrams: {
      handle: function(val) {
        this.changeBankList(this.val)
      },
      deep: true
    },
    fixedFileds: {
      handler: function(val) {
        if (val.costMoneyOffTax && !isNaN(Number(val.costMoneyOffTax))) {
          if (val.sellerTaxPoint && !isNaN(val.sellerTaxPoint)) {
            this.fixedFileds.sellerTaxMoney = (val.costMoneyOffTax * (val.sellerTaxPoint / 100)).toFixed(2)
          }
          if (val.saleMoney && !isNaN(Number(val.saleMoney)) && !isNaN(Number(val.taxMoney))) {
            var interestRate1 = null;
            if (!this.order.invoiceStatus) {
              this.fixedFileds.taxMoney = 0;
            }
            interestRate1 = ((this.fixedFileds.saleMoney - this.fixedFileds.taxMoney - this.fixedFileds.costMoneyOffTax) / (this.fixedFileds.saleMoney - this.fixedFileds.taxMoney))
            this.interestRate = (interestRate1 * 100).toFixed(2)
          }
        }
        if (!val.finalMoney && val.saleMoney && !isNaN(Number(val.saleMoney)) && val.earnestMoney && !isNaN(Number(val.earnestMoney))) {
          this.fixedFileds.finalMoney = (val.saleMoney - val.earnestMoney).toFixed(2)
        }
        if (val.costMoneyOffTax && !isNaN(Number(val.costMoneyOffTax)) && val.earnestMoney && !isNaN(Number(val.earnestMoney))) {
          this.costFinalMoney = (val.costMoneyOffTax - val.earnestMoney).toFixed(2)
        } else {
          this.costFinalMoney = null
        }
        if (val.guiderRemark) {
          this.remarkLength = val.guiderRemark.length
        }
      },
      deep: true
    },
    productList: {
      handler: function(arr) {
        var arr1 = JSON.parse(JSON.stringify(arr))
        var piArr = []
        arr1.forEach((item) => {
          if (item.xiMaShu && item.xiMaShu.indexOf('/')) {
            let arr = item.xiMaShu.split('/')
            arr.forEach((item1) => {
              if (item1) {
                piArr.push(item1)
              }
            })
          }
        })
        arr1.forEach((item, index) => {
          if (item.xiMaShu && item.xiMaShu.indexOf('/')) {
            let arr = item.xiMaShu.split('/')
            let val = null
            arr.forEach((item1) => {
              if (item1 && !isNaN(Number(item1))) {
                val += Number(item1)
              }
            })
            if (val) {
              this.productList[index].quantity = val.toFixed(2)
            } else {
              this.productList[index].quantity = null
            }
          }
        })
        this.allNumber = piArr.length
        this.allQuantity = arr.reduce(function(prev, current, index, array) {
          if (current.quantity && !isNaN(Number(current.quantity))) {
            return prev + (current.quantity - 0)
          }
        }, 0);
        this.fixedFileds.allQuantity = this.fixedFileds.allQuantity ? this.fixedFileds.allQuantity.toFixed(2) : null
        this.fixedFileds.saleMoney = arr.reduce(function(prev, current, index, array) {
          if (current.quantity && !isNaN(Number(current.quantity)) && current.salePrice && !isNaN(Number(current.salePrice))) {
            return prev + (current.quantity * current.salePrice)
          }
        }, 0);
        this.fixedFileds.saleMoney = this.fixedFileds.saleMoney ? this.fixedFileds.saleMoney.toFixed(2) : null
        this.fixedFileds.buyMoneyOffTax = arr.reduce(function(prev, current, index, array) {
          if (current.quantity && !isNaN(Number(current.quantity)) && current.buyPrice && !isNaN(Number(current.buyPrice))) {
            return prev + (current.quantity * current.buyPrice)
          }
        }, 0);
        this.fixedFileds.buyMoneyOffTax = this.fixedFileds.buyMoneyOffTax ? this.fixedFileds.buyMoneyOffTax.toFixed(2) : null
        this.fixedFileds.costMoneyOffTax = arr.reduce(function(prev, current, index, array) {
          if (current.quantity && !isNaN(Number(current.quantity)) && current.price && !isNaN(Number(current.price))) {
            return prev + (current.quantity * current.price)
          }
        }, 0);
        this.fixedFileds.costMoneyOffTax = this.fixedFileds.costMoneyOffTax ? this.fixedFileds.costMoneyOffTax.toFixed(2) : null
        if (this.fixedFileds.sellerTaxPoint && !isNaN(Number(this.fixedFileds.sellerTaxPoint))) {
          var sellerTaxPercentage = this.fixedFileds.sellerTaxPoint / 100
          this.fixedFileds.sellerTaxMoney = this.fixedFileds.costMoneyOffTax * sellerTaxPercentage
          this.fixedFileds.sellerTaxMoney = this.fixedFileds.sellerTaxMoney ? this.fixedFileds.sellerTaxMoney.toFixed(2) : null
        }
        if (this.fixedFileds.saleMoney && !isNaN(Number(this.fixedFileds.saleMoney)) && this.order.taxPoint && !isNaN(Number(this.order.taxPoint))) {
          var taxPercentage = (this.order.taxPoint - 0 + 100) / 100
          let money = this.fixedFileds.saleMoney / taxPercentage
          this.fixedFileds.taxMoney = this.fixedFileds.saleMoney - money
          this.fixedFileds.taxMoney = this.fixedFileds.taxMoney ? this.fixedFileds.taxMoney.toFixed(2) : null
        }
      },
      deep: true
    }
  },
  methods: {
    getCaiwu() {
      return newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: {id: this.customerId}
      }).then((res) => {
        if (res.success !== '1') {
          this.$message.error(res.msg)
        }
        return res;
      })
    },
    async getData() {
      let res = await this.getCaiwu()
      if (res.success !== '1') {
        return false
      }
      this.caiwuObj = res.obj
      this.$store.dispatch('changeload', true)
      newRequest({
            url: '/redwood/bulk/' + this.reqNumber,
            method: 'get',
          }).then((res) => {
            if (res.success == '1') {
              this.order = res.obj // 只是展示的部分
              this.order.invoiceStatus = res.obj.needInvoice
              this.order.unit = res.obj.colors[0].quantityUnit
              this.unitFlag = '元/' + this.order.unit // 调整单位用的
                if (res.obj.addressProvince) {
                  let obj = {
                  name: res.obj.addressName,
                  province: res.obj.addressProvince,
                  city: res.obj.addressCity,
                  area: res.obj.addressArea,
                  addr: res.obj.addressAddr,
                  tel: res.obj.addressTel,
                  id: res.obj.addressId
                }
                  this.$set(this.order, 'address', obj)
                } else {
                  let obj = {
                  name: '',
                  province: '',
                  city: '',
                  area: '',
                  addr: '',
                  tel: '',
                  id: ''
                }
                  this.$set(this.order, 'address', obj)
                }
              this.buyerCertificateList = this.formateImgList(res.obj.customerPayCredentialUrls)
              this.sellerMadanImgUrls = this.formateImgList(res.obj.sellerMadanUrls)
              if (res.obj.ziyingShopId) { // 判断是否有产品信息
                this.product = {}
                this.product.shopCompany = res.obj.shopCompany
                this.product.sellerNumber = res.obj.sellerNumber
                this.product.shopTel = res.obj.shopTel
                this.product.shopProvince = res.obj.shopProvince
                this.product.shopCity = res.obj.shopCity
                this.product.shopArea = res.obj.shopArea
                this.product.shopAddr = res.obj.shopAddr
                this.product.shopOriginalNumber = res.obj.clothShopOriginalNumber
                this.shopOriginalImgUrls = this.formateImgList(res.obj.clothShopOriginalImgUrls)
                this.shopOriginalColorUrls = this.formateImgList(res.obj.clothShopOriginalColorUrls)
                this.product.title = res.obj.clothTitle
                this.product.composition = res.obj.clothComposition
                this.product.width = res.obj.clothWidth
                this.product.widthUnit = res.obj.clothWidthUnit
                this.product.weight = res.obj.clothWeight
                this.product.shortWeight = res.obj.clothShortWeight
                this.product.paperTube = res.obj.clothPaperTube
                this.product.metrePerKilo = res.obj.clothMetrePerKilo
                this.sellerSoouya = 1 // 有产品信息说明是自营的
              } else {
                this.product = null
                this.sellerSoouya = 0 // 没有产品信息说明不是自营的
              }
              // 下面是涉及交互的部分
              this.oldShopId = this.order.ziyingShopId; // 保存下最开始的shopId
              this.fixedFileds.ziyingShopCompany = this.order.ziyingShopCompany
              this.fixedFileds.shopCompany = this.order.shopCompany
              this.fixedFileds.productNumber = this.order.productNumber
              this.fixedFileds.productSource = this.order.productSource
              this.fixedFileds.needToPaySeller = this.order.needToPaySeller
              this.fixedFileds.sellerInvoiceStatus = this.order.sellerNeedInvoice
              this.fixedFileds.sellerTaxPoint = this.order.sellerTaxPoint
              this.fixedFileds.bankAccountId = this.order.bankAccountId
              this.fixedFileds.replyAccountBank = this.order.bankName
              this.fixedFileds.replyAccountCompany = this.order.bankCompany
              this.fixedFileds.replyAccountUser = this.order.bankRealName
              if (this.fixedFileds.replyAccountCompany && this.fixedFileds.bankAccountId) {
                this.fixedFileds.type = 1 // 如果公司名不为空就是公司账户否则是个人账户，公司账户类型是1
              }
              if (this.fixedFileds.replyAccountUser && this.fixedFileds.bankAccountId) {
                this.fixedFileds.type = 2
              }
              if (!this.fixedFileds.bankAccountId) {
                this.fixedFileds.type = null // 如果不存在bankcountid说明没有收款方式这时候type置空
              }
              this.fixedFileds.replyAccountNumber = this.order.bankNumber
              this.fixedFileds.saleMoney = this.order.saleMoney
              this.fixedFileds.earnestMoney = this.order.earnestMoney
              this.fixedFileds.needSoouyaMadan = this.order.needSoouyaMadan
              this.productList = this.order.colors
              this.fixedFileds.guiderRemark = this.order.guiderRemark
              this.$store.dispatch('changeload', false)
            } else {
              this.$message.error(res.msg)
            }
          })
    },
    getBank() {
      var str = localStorage.getItem('bankList');
      var obj = JSON.parse(str || '[]');
      this.bankAllData = obj;
      var bankList = Object.keys(obj)
      var bankDisplayList = [];
      bankDisplayList = bankList.map((item) => {
        var obj = {};
        obj.value = item.split('-')[0]
        obj.label = item.split('-')[0]
        return obj;
      })
      this.bankDisplayList = bankDisplayList
      this.bankList = bankList
    },
    changeBankList(val) {
      var selectBank = null;
      if (val.replyAccountBank) {
        this.bankList.forEach((item) => {
          if (item.indexOf(val.replyAccountBank) != -1) {
            selectBank = item
            this.reqCollectionPrams.bankShort = item.split('-')[1]
          }
        })
      }
      if (selectBank) {
        var provinceObj = this.bankAllData[selectBank];
        var provinceList = Object.keys(provinceObj)
        this.provinceList = provinceList.map((item) => {
          var obj = {};
          obj.value = item
          obj.label = item
          return obj;
        })
      }
      var province = val.province
      if (selectBank && val.province) {
        var cityObj = provinceObj[province]
        var cityList = Object.keys(cityObj)
        this.cityList = cityList.map((item) => {
          var obj = {};
          obj.value = item
          obj.label = item
          return obj;
        })
      }
      var city = val.city;
      if (selectBank && val.city && val.province) {
        var branchBankObj = cityObj[city]
        var branchBankList = Object.keys(branchBankObj)
        this.branchBankList = branchBankList.map((item) => {
          var obj = {};
          obj.value = item
          obj.label = item
          return obj;
        })
        this.reqCollectionPrams.bankId = branchBankObj[val.replyAccountBranch]
      }
    },
    culAdd(arr, type) {
      var val = '';
      val = arr.reduce(function(prev, current, index, array) {
        return prev + current[type]
      }, 0);
      return +val;
    },
    formateImgList(list) {
      let arr = []
      if (list.length > 0) {
        arr = list.map((item) => {
          return item
        })
      } else {
        arr = []
      }
      return arr
    },
    editMsg() {
      this.editMsgVisible = true;
      this.basicMsgForm.orderNumber = this.order.id
      this.basicMsgForm.taxPoint = (this.order.taxPoint < 0) ? null : this.order.taxPoint
      this.basicMsgForm.checkCloth = this.order.checkCloth
      this.basicMsgForm.invoiceStatus = this.order.invoiceStatus
      this.basicMsgForm.reconciliationType = this.order.reconciliationType
      this.basicMsgForm.sendType = this.order.sendType
      if (this.order.address) {
        this.basicMsgForm.address = this.order.address
        this.basicMsgForm.addressId = this.order.address.id
      }
    },
    changeAddrMsg() {
      newRequest({
        url: '/redwood/buyfollow/Address/list',
        data: {userId: this.order.customerId},
        method: 'post',
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.dialogData.AddrList = res.result
          this.dialogVisible.changeAddr = true
          this.editMsgVisible = false;
        } else {
          this.$message.error('获取收货地址失败')
        }
      })
    },
    // 点击删除地址操作
    handleDeleteAddr(item) {
      newRequest({
        url: '/redwood/buyfollow/Address/delete',
        data: {id: item.id},
        method: 'post',
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.changeAddrMsg()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 点击新增收货地址操作
    handleNewAddr() {
        this.reqAddrParams.id = ''
        this.reqAddrParams.province = ''
        this.reqAddrParams.city = ''
        this.reqAddrParams.area = ''
        this.reqAddrParams.addr = ''
        this.reqAddrParams.name = ''
        this.reqAddrParams.tel = ''
        this.reqAddrParams.userId = this.order.customerId
        this.dialogVisible.newEditAddr = true
        this.dialogVisible.changeAddr = false
      },
    // 点击编辑地址操作
    handleEditAddr(item) {
      this.reqAddrParams = item
      this.dialogVisible.newEditAddr = true
    },
    // 选择省市区的处理 新增
    handleNewAddrSelection(val) {
      this.reqAddrParams.province = val.province
      this.reqAddrParams.city = val.city
      this.reqAddrParams.area = val.area
    },
    // 点击新增/编辑保存按钮
    handleSaveNewEditAddr(formName) {
      this.$refs[formName].validate((valid) => {
        var url = ''
        this.reqAddrParams.haveSendCompany = 0 // 处理设置物流偏好的错误
        if (valid) {
          if (this.reqAddrParams.id) {
            url = '/redwood/buyfollow/Address/update' // 有id就更新没id就新增
          } else {
            url = '/redwood/buyfollow/Address/add'
          }
          newRequest({
            url: url,
            data: this.reqAddrParams,
            method: 'post',
            contentType: 'application/json',
          }).then((res) => {
            if (res.success == 1) {
              this.$message.success(res.msg)
              this.dialogVisible.newEditAddr = false
              this.changeAddrMsg()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    checkOutInput2() {
      let flag = true
      if (this.reqAddrParams.name &&
        this.reqAddrParams.tel &&
        this.reqAddrParams.province &&
        this.reqAddrParams.city &&
        this.reqAddrParams.city != '请选择' &&
        this.reqAddrParams.city) {
        flag = false
      } else {
        flag = true
      }
      return flag
    },
    // 点击选好了按钮操作
    confirmSelectAddr() {
      this.dialogData.AddrList.forEach(item => {
        if (item.id == this.basicMsgForm.address.id) {
          this.basicMsgForm.address.name = item.name
          this.basicMsgForm.address.province = item.province
          this.basicMsgForm.address.city = item.city
          this.basicMsgForm.address.area = item.area
          this.basicMsgForm.address.addr = item.addr
          this.basicMsgForm.address.tel = item.tel
          this.basicMsgForm.addressId = item.id
          this.editMsgVisible = true;
          this.dialogVisible.changeAddr = false
        }
      })
    },
    saveEditMsg(formName) {
      this.$refs[formName].validate((valid) => {
        var params = JSON.parse(JSON.stringify(this.basicMsgForm))
        if (params.invoiceStatus == 0) {
          params.taxPoint = -1
        }
        if (valid) {
          newRequest({
            url: '/redwood/bulk/edit',
            method: 'post',
            contentType: 'application/json',
            data: params
          }).then((res) => {
            if (res.success == 1) {
              this.$message.success(res.msg)
              this.editMsgVisible = false;
              this.order.checkCloth = this.basicMsgForm.checkCloth
              this.order.invoiceStatus = this.basicMsgForm.invoiceStatus
              if (this.basicMsgForm.invoiceStatus == 1) {
                this.order.taxPoint = this.basicMsgForm.taxPoint
              } else {
                this.order.taxPoint = null
              }
              this.order.sendType = this.basicMsgForm.sendType
              this.order.address = this.basicMsgForm.address // 把弹窗里面地址信息直接给到order里面的详情信息，不要分开省市区分开赋值，不然会出错
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      });
    },
    searchShop() {
      this.changeShop()
    },
    changeShop() {
      this.dialogData.shopList = [];
      this.dialogData.shopPageNumber = 1
      newRequest({
        url: '/soouya/ziying/shop',
        data: {
          pageNumber: this.dialogData.shopPageNumber,
          key: this.dialogData.company,
        },
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.dialogData.shopList = res.page.result
          this.dialogVisible.changeShop = true;
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    fetchData() {
      this.dialogData.shopPageNumber += 1
      newRequest({
        url: '/soouya/ziying/shop',
        data: {
          pageNumber: this.dialogData.shopPageNumber,
          key: this.dialogData.company
        },
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.dialogData.shopList = this.dialogData.shopList.concat(res.page.result)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleNewShop() {
      this.dialogVisible.newShop = true;
      this.reqShopParams.company = '';
      this.reqShopParams.telType = 1;
      this.reqShopParams.tel = '';
      this.reqShopParams.areaCode = '';
      this.reqShopParams.phone = '';
      this.reqShopParams.addr = '';
      this.reqShopParams.province = '';
      this.reqShopParams.city = '';
      this.reqShopParams.area = '';
      this.dialogVisible.changeShop = false;
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
        if (valid) {
          if (this.reqShopParams.telType == 2) {
            this.reqShopParams.tel = this.reqShopParams.areaCode + '-' + this.reqShopParams.phone
          }
          newRequest({
            url: '/soouya/ziying/shop',
            contentType: 'application/json',
            data: this.reqShopParams,
            method: 'post',
          }).then((res) => {
            if (res.success == 1) {
              this.$message.success(res.msg)
              this.addShopId = res.obj.id
              this.changeShop();
              this.dialogVisible.newShop = false;
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    checkOutInput3() {
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
    confirmSelectShop() {
      this.dialogData.shopList.forEach(item => {
        if (item.id == this.order.ziyingShopId) {
          this.order.shopProvince = item.province;
          this.order.shopCity = item.city;
          this.order.shopArea = item.area;
          this.order.shopAddr = item.addr;
          this.order.shopTel = item.tel;
          if (this.oldShopId == this.order.ziyingShopId) {
            this.dialogVisible.changeShop = false;
            this.dialogData.company = '';
            return
          }
          this.addShopId = '';
          this.dialogVisible.changeShop = false;
          this.fixedFileds.productNumber = '';
          this.fixedFileds.clothId = '';
          this.dialogData.company = '';
          this.product = null;
          this.sellerSoouya = item.sellerSoouya
          if (item.sellerSoouya != 1) {
            this.editProductNumber = true;
            this.fixedFileds.ziyingShopCompany = ''
            this.fixedFileds.shopCompany = item.company
            this.order.shopId = item.id
          } else {
            this.fixedFileds.ziyingShopCompany = item.company
            this.fixedFileds.shopCompany = ''
            this.editProductNumber = false;
            this.order.shopId = ''
            this.oldShopId = item.id
          }
        }
      })
      this.fixedFileds.replyAccountCompany = null;
      this.fixedFileds.replyAccountUser = null;
      this.fixedFileds.replyAccountBank = null;
      this.fixedFileds.replyAccountNumber = '';
      this.fixedFileds.type = null;
    },
    changeProductNumber() {
      if (this.sellerSoouya != 1) {
        this.editProductNumber = true;
      } else {
        this.changeNumer();
      }
    },
    saveProductNumber() {
      if (this.fixedFileds.productNumber) {
        this.editProductNumber = false;
      } else {
        this.$message.error('货号不能为空')
      }
    },
    searchNumber() {
      this.changeNumer()
    },
    changeNumer() {
      this.dialogData.numberList = [];
      this.dialogData.numberPageNumber = 1
      newRequest({
        url: '/soouya/ziying/cloth',
        data: {
          pageNumber: this.dialogData.numberPageNumber,
          key: this.dialogData.number,
          sellerSoouya: 1,
          sellerShopId: this.oldShopId
        },
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.dialogData.numberList = res.page.result
          this.dialogData.numberList.forEach((item) => {
            if (item.cutPrice > 0) {
              item.cutPrice = item.cutPrice.toFixed(2)
            }
            if (item.cutCostPrice > 0) {
              item.cutCostPrice = item.cutCostPrice.toFixed(2)
            }
            if (item.costPrice > 0) {
              item.costPrice = item.costPrice.toFixed(2)
            }
            this.$set(item, 'priceMin', null);
            this.$set(item, 'priceMax', null);
            var numberArr = [];
            var copyNumberArr = [];
            copyNumberArr = item.colorPrices.map((item) => {
              return item.price
            })
            copyNumberArr.push(item.price)
            numberArr = Array.from(new Set(copyNumberArr))
            numberArr.sort((a, b) => {
              return a - b
            })
            if (numberArr.length > 1) {
              item.priceMin = numberArr[0].toFixed(2)
              let value = numberArr[numberArr.length - 1]
              if (value == Infinity) {
                item.priceMax = value
              } else {
                item.priceMax = value.toFixed(2)
              }
            } else {
              if (numberArr.length == 1) {
                item.priceMin = -1
                item.priceMax = numberArr[0].toFixed(2)
              } else {
                item.priceMin = -1
                item.priceMax = -1
              }
            }
          })
          this.dialogVisible.changeNumber = true;
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addNmuber() {
      this.dialogData.numberPageNumber += 1
      newRequest({
        url: '/soouya/ziying/cloth',
        data: {
          pageNumber: this.dialogData.numberPageNumber,
          key: this.dialogData.number,
          number: this.dialogData.number,
          sellerSoouya: 1,
          sellerShopId: this.oldShopId
        },
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          res.page.result.forEach((item) => {
            if (item.cutPrice > 0) {
              item.cutPrice = item.cutPrice.toFixed(2)
            }
            if (item.cutCostPrice > 0) {
              item.cutCostPrice = item.cutCostPrice.toFixed(2)
            }
            if (item.costPrice > 0) {
              item.costPrice = item.costPrice.toFixed(2)
            }
            this.$set(item, 'priceMin', null);
            this.$set(item, 'priceMax', null);
            var numberArr = [];
            var copyNumberArr = [];
            copyNumberArr = item.colorPrices.map((item) => {
              return item.price
            })
            copyNumberArr.push(item.price)
            numberArr = Array.from(new Set(copyNumberArr))
            numberArr.sort((a, b) => {
              return a - b
            })
            if (numberArr.length > 1) {
              item.priceMin = numberArr[0].toFixed(2)
              let value = numberArr[numberArr.length - 1]
              if (value == Infinity) {
                item.priceMax = value
              } else {
                item.priceMax = value.toFixed(2)
              }
            } else {
              if (numberArr.length == 1) {
                item.priceMin = -1
                item.priceMax = numberArr[0].toFixed(2)
              } else {
                item.priceMin = -1
                item.priceMax = -1
              }
            }
          })
          this.dialogData.numberList = this.dialogData.numberList.concat(res.page.result)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmSelectNumber() {
      var arr = [];
      var arr1 = [];
      this.dialogData.numberList.forEach(item => {
        if (item.number == this.fixedFileds.productNumber) {
          arr.push(item)
          arr1 = arr[0].colors.map((item) => {
            let obj = {}
            obj.color = item;
            obj.costPrice = (arr[0].costPrice) ? Number(arr[0].costPrice).toFixed(2) : null
            obj.price = (arr[0].price) ? arr[0].price.toFixed(2) : null
            return obj
          })
          this.colorsArr = JSON.parse(JSON.stringify(arr1.concat(arr[0].colorPrices)))
          this.product = {}
          this.product.shopCompany = arr[0].shopCompany
          this.product.sellerNumber = arr[0].sellerNumber
          this.product.shopTel = arr[0].shopTel
          this.product.shopProvince = arr[0].shopProvince
          this.product.shopCity = arr[0].shopCity
          this.product.shopArea = arr[0].shopArea
          this.product.shopAddr = arr[0].shopAddr
          this.product.shopOriginalNumber = arr[0].shopOriginalNumber
          if (arr[0].shopOriginalImgUrls.length > 0) {
            this.shopOriginalImgUrls = this.formateImgList(arr[0].shopOriginalImgUrls)
          }
          if (arr[0].shopOriginalColorUrls.length > 0) {
            this.shopOriginalColorUrls = this.formateImgList(arr[0].shopOriginalColorUrls)
          }
          this.product.title = arr[0].title
          this.product.composition = arr[0].composition
          this.product.width = arr[0].width
          this.product.widthUnit = arr[0].widthUnit
          this.product.weight = arr[0].weight
          this.product.weightUnit = arr[0].weightUnit
          this.product.shortWeight = arr[0].shortWeight
          this.product.paperTube = arr[0].paperTube
          this.product.metrePerKilo = arr[0].metrePerKilo
          this.fixedFileds.clothId = arr[0].id
          this.order.shopId = arr[0].shopId
          this.dialogVisible.changeNumber = false;
          this.dialogData.number = '';
        }
      })
    },
    selectBankAccount() {
      if (!this.order.shopId && this.sellerSoouya == 1) {
        this.$message.error('请先选择货号')
        return
      }
      this.dialogVisible.changeCollection = true;
      request({
        url: '/redwood/sys/BankAccount/list.do',
        method: 'get',
        data: {
          shopId: this.order.shopId
        }
      }, (res) => {
        if (res.success == 1) {
          this.dialogData.collectionList = res.page.result
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleNewCollectionSelection(val) {
      this.reqCollectionPrams.province = val.province
      this.reqCollectionPrams.city = val.city
      this.reqCollectionPrams.area = val.area
    },
    confirmSelectCollection() {
      this.dialogData.collectionList.forEach(item => {
        if (item.id == this.fixedFileds.bankAccountId) {
          this.fixedFileds.type = item.type
          this.fixedFileds.replyAccountBank = item.replyAccountBank
          this.fixedFileds.replyAccountNumber = item.replyAccountNumber
          if (this.fixedFileds.type == 1) {
            this.fixedFileds.replyAccountCompany = item.replyAccountCompany
          } else {
            this.fixedFileds.replyAccountUser = item.replyAccountUser
          }
          this.dialogVisible.changeCollection = false;
        }
      })
    },
    handleEditCollection(val) {
      this.dialogVisible.newCollection = true
      this.dialogVisible.changeCollection = false
      this.reqCollectionPrams = JSON.parse(JSON.stringify(val))
      const self = this
      setTimeout(function() { // 因为@change事件的双向绑定导致切换修改值的时候变量有问题因此要进行两次赋值
        self.reqCollectionPrams = JSON.parse(JSON.stringify(val))
      }, 50)
      setTimeout(function() {
        self.reqCollectionPrams = JSON.parse(JSON.stringify(val))
      }, 50)
      this.changeBankList(this.reqCollectionPrams)
    },
    changeBank() {
      this.reqCollectionPrams.province = '';
      this.reqCollectionPrams.city = '';
      this.changeBankList(this.reqCollectionPrams)
    },
    changeProvince() {
      this.reqCollectionPrams.city = '';
      this.changeBankList(this.reqCollectionPrams)
    },
    handleNewCollection() {
      this.reqCollectionPrams.type = 1;
      this.reqCollectionPrams.replyAccountCompany = '';
      this.reqCollectionPrams.replyAccountNumber = '';
      this.reqCollectionPrams.replyAccountBank = '';
      this.reqCollectionPrams.changeProvince = '';
      this.reqCollectionPrams.city = '';
      this.reqCollectionPrams.replyAccountBranch = '';
      this.reqCollectionPrams.id = '';
      this.dialogVisible.newCollection = true;
    },
    handleDeleteCollection(item) {
      request({
        url: '/redwood/sys/BankAccount/delete.do',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: {
          id: item.id,
          _time: +new Date()
        }
      }).then((res) => {
        if (res.success == '1') {
          this.$message.success(res.message)
          this.selectBankAccount();
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSaveNewCollection(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && !this.reqCollectionPrams.id) {
          this.reqCollectionPrams['_time'] = +new Date();
          this.reqCollectionPrams.shopId = this.order.shopId
          if (this.reqCollectionPrams.type == 1) {
            this.reqCollectionPrams.replyAccountUser = ''
          } else {
            this.reqCollectionPrams.replyAccountCompany = ''
          }
          request({
            url: '/redwood/sys/BankAccount/add.do',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: this.reqCollectionPrams
          }).then((res) => {
            if (res.success == '1') {
              this.$message.success(res.message)
              this.dialogVisible.newCollection = false;
              this.selectBankAccount();
            } else {
              this.$message.error(res.message)
            }
          })
        }
        if (valid && this.reqCollectionPrams.id) {
          this.reqCollectionPrams['_time'] = +new Date();
          this.reqCollectionPrams.shopId = this.order.shopId // 两个接口不字段不统一，重新对字段赋值
          this.reqCollectionPrams.bank = this.reqCollectionPrams.replyAccountBank
          this.reqCollectionPrams.number = this.reqCollectionPrams.replyAccountNumber
          this.reqCollectionPrams.realName = this.reqCollectionPrams.replyAccountUser
          this.reqCollectionPrams.company = this.reqCollectionPrams.replyAccountCompany
          if (this.reqCollectionPrams.type == 1) {
            this.reqCollectionPrams.realName = ''
          } else {
            this.reqCollectionPrams.company = ''
          }
          newRequest({
            url: '/soouya/oms/bankAccount/' + this.reqCollectionPrams.id,
            method: 'put',
            contentType: 'application/json',
            data: this.reqCollectionPrams
          }).then((res) => {
            if (res.success == '1') {
              this.$message.success(res.msg)
              this.dialogVisible.newCollection = false;
              this.selectBankAccount();
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    preview() {
      var obj = {}
      obj.guiderName = this.order.guiderName
      obj.productNumber = this.fixedFileds.productNumber
      obj.earnestMoney = this.fixedFileds.earnestMoney
      obj.finalMoney = this.fixedFileds.finalMoney
      obj.productSource = this.fixedFileds.productSource
      if (this.fixedFileds.ziyingShopCompany) {
        obj.shopCompany = this.fixedFileds.ziyingShopCompany
      } else {
        obj.shopCompany = this.fixedFileds.shopCompany
      }
      obj.serviceNumber = this.order.number
      obj.customerCompany = this.order.customerCompany
      obj.unit = this.order.unit
      obj.createTime = this.order.createTime
      obj.salesName = this.order.salerName
      obj.product = this.product
      obj.productList = this.productList
      obj.priceUnit = this.unitFlag;
      obj.salePriceUnit = this.productList[0].salePriceUnit
      obj.buyPriceUnit = this.productList[0].buyPriceUnit
      obj.quantityUnit = this.productList[0].quantityUnit
      obj.saleMoney = this.fixedFileds.saleMoney
      obj.needSoouyaMadan = this.fixedFileds.needSoouyaMadan
      obj.shopAddress = this.order.shopProvince + this.order.shopCity + this.order.shopArea + this.order.shopAddr;
      obj.shopProvince = this.order.shopProvince;
      obj.shopCity = this.order.shopCity;
      obj.shopArea = this.order.shopArea;
      obj.shopAddr = this.order.shopAddr;
      obj.shopTel = this.order.shopTel;
      if (this.order.sendType == 0) {
        obj.address = this.order.address.province + this.order.address.city + this.order.address.area + this.order.address.addr
        obj.addressName = this.order.address.name
        obj.addressTel = this.order.address.tel
      } else {
        obj.address = ''
        obj.addressName = ''
        obj.addressTel = ''
      }
      if (this.order.status == 335) {
        obj.finalMoney = this.fixedFileds.finalMoney
      } else {
        obj.finalMoney = null
      }
      sessionStorage.removeItem('guiderSalesTable');
      sessionStorage.setItem('guiderSalesTable', JSON.stringify(obj));
      const host = location.host
      let webUrl = ''
      if (host == 'hspc.soouya.com' || host.indexOf('local') != -1) {
        webUrl = 'http://localhongshan.soouya.com'
      } else if (host.indexOf('test') != -1) {
        webUrl = 'http://testhongshan.soouya.com'
      } else {
        webUrl = 'http://hongshan.soouya.com'
      }
      window.open(webUrl + '/print/guidersalestable')
    },
    splitXiMa(index) {
      var value = this.productList[index].xiMaShu;
      if (value && value.lastIndexOf('/') != value.length - 1) {
        this.productList[index].xiMaShu += '/';
      }
    },
    nan(index) {
      this.productList[index].xiMaShu = this.productList[index].xiMaShu.replace(/[^\d///.]/g, '');
      var arr = this.productList[index].xiMaShu.split('/')
      var val = null;
      arr.map((item) => {
        if (item && !isNaN(Number(item))) {
          val += Number(item)
        }
      })
      this.productList[index].quantity = val
      this.productList[index].quantity = this.productList[index].quantity ? this.productList[index].quantity.toFixed(2) : null
    },
    addColor() {
      let length = this.productList.length
      let value = this.productList[length - 1]
      if (!value.color || !value.xiMaShu || !value.price || !value.buyPrice || !value.salePrice) {
        this.$message.warning('所有必填项不能为空')
        return
      }
      if (this.sellerSoouya == 1) {
        if (this.colorsArr.length == 0) {
          this.dialogData.numberList = [];
          this.dialogData.numberPageNumber = 1
          var arr = [];
          var arr1 = [];
          if (this.fixedFileds.productNumber == '') {
            this.$message.warning('货号不能为空')
            return false
          }
          newRequest({
            url: '/soouya/ziying/cloth',
            data: {
              pageNumber: this.dialogData.numberPageNumber,
              key: this.fixedFileds.productNumber,
              sellerSoouya: 1,
              ellerShopId: this.oldShopId
            },
            method: 'get',
          }).then((res) => {
            if (res.success == 1) {
              this.dialogData.numberList = res.page.result
              this.dialogData.numberList.forEach(item => {
                if (item.number == this.fixedFileds.productNumber) {
                  arr.push(item)
                }
              })
              if (arr[0].colors.length > 0) {
                arr1 = arr[0].colors.map((item) => {
                  let obj = {}
                  obj.color = item;
                  obj.costPrice = (arr[0].costPrice) ? Number(arr[0].costPrice).toFixed(2) : null
                  obj.price = (arr[0].price) ? arr[0].price.toFixed(2) : null
                  return obj
                })
              }
              this.colorsArr = JSON.parse(JSON.stringify(arr1.concat(arr[0].colorPrices)))
              let hasColorArr = []
              if (this.productList.length > 0) {
                hasColorArr = this.productList.map((item) => {
                  return item.color
                })
              }
              if (hasColorArr.length > 0) {
                this.colorsArr.forEach((item) => {
                  if (hasColorArr.indexOf(item.color) != -1) {
                    this.$set(item, 'show', false);
                  } else {
                    this.$set(item, 'show', true);
                  }
                })
              }
              this.dialogVisible.changeColor = true;
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          let hasColorArr = []
          if (this.productList.length > 0) {
            hasColorArr = this.productList.map((item) => {
              return item.color
            })
          }
          if (hasColorArr.length > 0) {
            this.colorsArr.forEach((item) => {
              if (hasColorArr.indexOf(item.color) != -1) {
                this.$set(item, 'show', false);
              } else {
                this.$set(item, 'show', true);
              }
            })
          }
          this.dialogVisible.changeColor = true;
        }
      } else {
        this.productList.push({
          color: '',
          xiMaShu: '',
          quantity: '',
          price: '',
          buyPrice: '',
          salePrice: '',
          outMaZhiRemark: '',
        });
      }
    },
    confirmSelectColor() {
      var selectColorArr = []
      this.colorsArr.forEach((item) => {
        if (item.color == this.color) {
          selectColorArr.push(item)
        }
      })
      this.productList.push({
        color: selectColorArr[0].color,
        xiMaShu: '',
        quantity: '',
        price: '',
        buyPrice: selectColorArr[0].costPrice,
        salePrice: selectColorArr[0].price,
        outMaZhiRemark: '',
      });
      this.dialogVisible.changeColor = false
    },
    delColor(index) {
      if (this.productList.length > 1) {
        this.productList.splice(index, 1)
      }
    },
    beforeBuyerCertificateUpload(file) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
          quality: 1
        })
        .then(function(rst) {
          // 处理成功会执行
          rst.formData.append('field', 'imgUrl')
          request({
            url: '/redwood/sys/Common/uploadFile.do?type=5',
            method: 'post',
            data: rst.formData,
            dataType: 'FormData'
          }).then(data => {
            that.$store.dispatch('changeload', false)
            if (data.success === '1') {
              that.buyerCertificateSuccess(data)
            } else {
              this.$message.error(data.msg)
            }
          })
          return rst
        })
      return false
    },
    buyerCertificateSuccess(file, fileList) {
      this.$store.dispatch('changeload', false)
      this.buyerCertificateList.push(file.imgUrl)
    },
    handleError(file, fileList) {
      this.$store.dispatch('changeload', false)
    },
    delBuyerCertificate(url) {
      this.buyerCertificateList = this.buyerCertificateList.filter((item, key) => item != url)
    },
    beforeSellerMadanUpload(file) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
          quality: 1
        })
        .then(function(rst) {
          // 处理成功会执行
          rst.formData.append('field', 'imgUrl')
          request({
            url: '/redwood/sys/Common/uploadFile.do?type=5',
            method: 'post',
            data: rst.formData,
            dataType: 'FormData'
          }).then(data => {
            that.$store.dispatch('changeload', false)
            if (data.success === '1') {
              that.sellerMadanSuccess(data)
            } else {
              this.$message.error(data.msg)
            }
          })
          return rst
        })
      return false
    },
    sellerMadanSuccess(file, fileList) {
      this.$store.dispatch('changeload', false)
      this.sellerMadanImgUrls.push(file.imgUrl)
    },
    delSellerMadan(url) {
      this.sellerMadanImgUrls = this.sellerMadanImgUrls.filter((item, key) => item != url)
    },
    // 重置obj操作
    setEmpty(resetObj) {
      let keys = Object.keys(resetObj)
      for (let i = 0; i < keys.length; i++) {
        if (typeof resetObj[keys[i]] == 'object' && !Array.isArray(resetObj[keys[i]])) {
          this.setEmpty(resetObj[keys[i]])
        } else if (Array.isArray(resetObj[keys[i]])) {} else if (typeof resetObj[keys[i]] == 'number') {
          resetObj[keys[i]] = 0
        } else if (typeof resetObj[keys[i]] == 'string') {
          resetObj[keys[i]] = ''
        }
      }
      return
    },
    countFinalMoney() {
      if (this.fixedFileds.earnestMoney && !isNaN(Number(this.fixedFileds.earnestMoney)) && this.fixedFileds.saleMoney && !isNaN(Number(this.fixedFileds.saleMoney))) {
        this.fixedFileds.finalMoney = this.fixedFileds.saleMoney - this.fixedFileds.earnestMoney
        this.fixedFileds.finalMoney = this.fixedFileds.finalMoney ? this.fixedFileds.finalMoney.toFixed(2) : null
      } else {
        this.fixedFileds.finalMoney = ''
      }
    },
    saveOrder() { /* 保存草稿和订金的时候把信息重新保存一遍，因为单位分开了所以再保存一遍 */
      var obj = {}
      obj.orderNumber = this.order.id
      obj.taxPoint = (this.order.taxPoint < 0) ? null : this.order.taxPoint
      obj.checkCloth = this.order.checkCloth
      obj.invoiceStatus = this.order.invoiceStatus
      obj.unit = this.unitFlag.split('/')[1]
      obj.reconciliationType = this.order.reconciliationType
      obj.sendType = this.order.sendType
      if (this.order.address) {
        obj.address = this.order.address
        obj.addressId = this.order.address.id
      }
      if (obj.invoiceStatus == 0) {
        obj.taxPoint = -1
      }
      return newRequest({
        url: '/redwood/bulk/edit',
        method: 'post',
        contentType: 'application/json',
        data: obj
      }).then((res) => {
        if (res.success !== '1') {
          this.$message.error(res.msg)
        }
        return res;
      })
    },
    async saveDraft() {
      let res = await this.saveOrder() // 调取借口把编辑按钮弹框内容的信息再保存一遍目的是为了保存单位信息而且要改为同步因为要把单位先保存了
      if (res.success !== '1') {
        return false
      }
      let validCount = 0;
      const formAmount = 5 * this.productList.length + 1;
      this.productList.forEach((item, index) => {
        for (let i = 0; i < 5; i++) {
          this.$refs[`dynamicFieldsForm${index}`][i].validate(valid => {
            if (valid) {
              validCount++;
            }
          });
        }
      });
      this.saveFlag = true
      this.$refs.fixedFieldsForm.validate(valid => {
        if (valid) {
          validCount++;
          if (validCount === formAmount) {
            var obj = {}
            obj.orderNumber = this.order.id
            obj.productNumber = this.fixedFileds.productNumber
            obj.productSource = this.fixedFileds.productSource
            obj.payInvoiceInneed = this.fixedFileds.payInvoiceInneed
            obj.sellerInvoiceStatus = this.fixedFileds.sellerInvoiceStatus
            obj.needToPaySeller = this.fixedFileds.needToPaySeller
            obj.sellerTaxPoint = (obj.sellerInvoiceStatus == 1) ? this.fixedFileds.sellerTaxPoint : null
            obj.earnestMoney = this.fixedFileds.earnestMoney
            obj.finalMoney = this.fixedFileds.finalMoney
            obj.saleMoney = this.fixedFileds.saleMoney
            obj.costMoneyOffTax = this.fixedFileds.costMoneyOffTax
            obj.buyMoneyOffTax = this.fixedFileds.buyMoneyOffTax
            obj.taxMoney = this.fixedFileds.taxMoney
            obj.sellerTaxMoney = this.fixedFileds.sellerTaxMoney // 20171127重构增加的供应商税款字段
            obj.sellerMadanImgUrls = this.sellerMadanImgUrls
            obj.buyerCertificateList = this.buyerCertificateList
            obj.productList = this.productList.map(item => { // 单位改变以后把单位都重新保存一遍
              item.buyPriceUnit = this.unitFlag
              item.priceUnit = this.unitFlag
              item.salePriceUnit = this.unitFlag
              item.quantityUnit = this.unitFlag.split('/')[1]
              return item
            })
            obj.bankAccountId = this.fixedFileds.bankAccountId
            obj.needSoouyaMadan = this.fixedFileds.needSoouyaMadan
            obj.guiderRemark = this.fixedFileds.guiderRemark
            if (this.sellerSoouya == 1) {
              obj.clothId = this.fixedFileds.clothId
              obj.shopId = null
            } else {
              obj.shopId = this.order.shopId
              obj.clothId = null
            }
            if (!obj.bankAccountId) {
              this.$message.warning('供应商收款方式必须选择')
              return;
            }
            this.$store.dispatch('changeload', true)
            newRequest({
              url: '/redwood/bulk/offer',
              method: 'post',
              contentType: 'application/json',
              data: obj
            }).then((res) => {
              if (res.success == 1) {
                this.isInformPay = true
                this.$message.success(res.msg)
                var self = this;
                setTimeout(function() {
                  self.$router.push({ name: 'allAllDetail', query: { id: self.order.id } })
                }, 300)
              } else {
                this.$message.error(res.msg)
              }
              this.$store.dispatch('changeload', false)
            })
          }
        } else {
          this.$store.dispatch('changeload', false);
        }
      });
    },
    async commit(url) {
      let res = await this.saveOrder() // 调取借口把编辑按钮弹框内容的信息再保存一遍目的是为了保存单位信息而且要改为同步因为要把单位先保存了
      if (res.success !== '1') {
        return false
      }
      let validCount = 0;
      const formAmount = 5 * this.productList.length + 1;
      this.productList.forEach((item, index) => {
        for (let i = 0; i < 5; i++) {
          this.$refs[`dynamicFieldsForm${index}`][i].validate(valid => {
            if (valid) {
              validCount++;
            }
          });
        }
      });
      this.saveFlag = true
      this.$refs.fixedFieldsForm.validate(valid => {
        if (valid) {
          validCount++;
          if (this.fixedFileds.earnestMoney > this.fixedFileds.saleMoney && this.editType == 'editRetainage') {
            this.$message.error('销售货款不能小于销售订金')
            return;
          }
          if (validCount == formAmount) {
            var obj = {}
            obj.orderNumber = this.order.id
            obj.productNumber = this.fixedFileds.productNumber
            obj.productSource = this.fixedFileds.productSource
            obj.payInvoiceInneed = this.fixedFileds.payInvoiceInneed
            obj.sellerInvoiceStatus = this.fixedFileds.sellerInvoiceStatus
            obj.needToPaySeller = this.fixedFileds.needToPaySeller
            obj.sellerTaxPoint = (obj.sellerInvoiceStatus == 1) ? this.fixedFileds.sellerTaxPoint : null
            obj.earnestMoney = this.fixedFileds.earnestMoney
            obj.finalMoney = this.fixedFileds.finalMoney
            obj.saleMoney = this.fixedFileds.saleMoney
            obj.costMoneyOffTax = this.fixedFileds.costMoneyOffTax
            obj.buyMoneyOffTax = this.fixedFileds.buyMoneyOffTax
            obj.taxMoney = this.fixedFileds.taxMoney
            obj.sellerTaxMoney = this.fixedFileds.sellerTaxMoney // 20171127重构增加的供应商税款字段
            obj.sellerMadanImgUrls = this.sellerMadanImgUrls
            obj.buyerCertificateList = this.buyerCertificateList
            obj.productList = this.productList.map(item => { // 单位改变以后把单位都重新保存一遍
              item.buyPriceUnit = this.unitFlag
              item.priceUnit = this.unitFlag
              item.salePriceUnit = this.unitFlag
              item.quantityUnit = this.unitFlag.split('/')[1]
              return item
            })
            obj.bankAccountId = this.fixedFileds.bankAccountId
            obj.needSoouyaMadan = this.fixedFileds.needSoouyaMadan
            obj.guiderRemark = this.fixedFileds.guiderRemark
            if (this.sellerSoouya == 1) {
              obj.clothId = this.fixedFileds.clothId
              obj.shopId = null
            } else {
              obj.shopId = this.order.shopId
              obj.clothId = null
            }
            if (!obj.bankAccountId) {
              this.$message.warning('供应商收款方式必须选择')
              return;
            }
            this.$store.dispatch('changeload', true)
            newRequest({
              url: url,
              method: 'post',
              contentType: 'application/json',
              data: obj
            }).then((res) => {
              if (res.success == 1) {
                this.$store.dispatch('changeload', false)
                this.isInformPay = true
                this.$message.success(res.msg)
                var self = this;
                setTimeout(function() {
                  self.$router.push({ name: 'allAllDetail', query: { id: self.order.id } })
                }, 300)
              } else {
                this.$message.error(res.msg);
                this.$store.dispatch('changeload', false)
              }
            })
          }
        } else {
          this.$store.dispatch('changeload', false)
        }
      });
    },
    informPay(url) {
      this.commit(url)
    },
    informPayFinal(url) {
      this.commit(url)
    }
  }
}

</script>
<style lang="scss">
.edit-basic-msg {
  .el-dialog {
    width: 600px
  }
}

</style>
<style lang="scss" scoped>
.unit-select {
  width: 110px;
}

a {
  text-decoration: none;
}

.order-detail {
  border: 1px solid #ddd;
  padding: 10px;
  position: relative;
  margin-bottom: 15px;
  .tip {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 180px;
    .saler {
      color: #999;
    }
    .time {
      color: red;
      font-size: 12px;
      margin-top: 20px;
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
  hr {
    border: none;
    border-top: 1px solid #ddd;
  }
}

.product-msg {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
  .el-form-item {
    margin-bottom: 0;
  }
}

.price-msg {
  border: 1px solid #ddd;
  padding: 15px;
  min-height: 192px;
  margin-bottom: 15px;
}

.split {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: black;
  margin: -1px 8px;
}

table {
  border: 1px solid #ddd;
  border-collapse: collapse;
  &.shop-company-table {
    tr {
      background: #f5f5f5;
    }
    td {
      background: #f5f5f5;
    }
  }
  &.product-msg-table {
    margin-top: 10px;
  }
  th {
    border: 1px solid #ddd;
  }
  td {
    border: 1px solid #ddd;
    word-break: break-all;
    line-height: 20px;
    padding: 20px 10px !important;
  }
}

.order-msg {
  line-height: 20px;
  margin: 8px 0;
  word-break: break-all;
}

.show-image {
  .card {
    width: 200px;
  }
  .image {
    width: 100%;
    height: 200px;
    cursor: pointer;
  }
}

.order-msg {
  line-height: 20px;
  margin: 8px 0;
  word-break: break-all;
}

.edit-basic-msg {
  .el-form-item {
    margin-bottom: 0;
  }
}

.price-msg-header {
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  position: relative;
  .contact {
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 10px;
    p {
      line-height: 25px;
    }
  }
  .title {
    position: absolute;
    top: 40px;
    left: 50%;
    margin-left: -90px;
  }
}

.price-msg-body {
  .header {
    width: 100%;
    tbody {
      td {
        padding: 15px 5px;
      }
    }
  }
}

.dynamic-form {
  width: 100%;
  .form-item {
    width: 100%;
    height: 65px;
    padding: 10px;
    border: 1px solid #ddd;
    float: left;
  }
  .form-item-del {
    width: 100%;
    height: 65px;
    padding: 10px; // border: 1px solid #ddd;
    float: left;
    text-align: center;
  }
}

.confirm-form {
  width: 100%;
  clear: both;
  .form-item {
    width: 12.2%;
    height: 65px;
    padding: 10px;
    border: 1px solid #ddd;
    float: left;
    text-align: center;
  }
  .form-item1 {
    min-height: 45px;
    text-align: center;
  }
}

.tax-point {
  width: 10%;
}

.upImg {
  float: left;
  width: 42px;
  height: 42px;
  line-height: 42px;
  background: #ccc;
  text-align: center;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  &:active {
    background: #999;
  }
}

.madan-wrap {
  position: relative;
  display: inline-block;
  margin-right: 15px;
}

.del-arrow {
  position: absolute;
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  top: -10px;
  right: -10px;
  background-color: #ccc;
  color: #fff;
  border: 1px solid #fff;
}

.table-box {
  border-collapse: collapse;
  border-top: 1px solid #969696;
  border-bottom: 1px dashed #969696;
  border-left: 0px;
  border-right: 0px;
  width: 90%;
  margin-left: 5%;
  font-size: 12px;
  .tdLeft {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 10px;
  }
  .tdRight {
    padding-left: 10px;
  }
}

.footer {
  width: 100%;
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 20px;
}

.dialog-list {
  li {
    border-top: 1px solid #969696;
    padding: 10px 0;
    &.item-disabled {
      color: #bbb;
    }
  }
}

.edit-retainage {
  .el-form-item {
    margin-bottom: 0;
  }
}

.select {
  height: 36px;
  background: white;
  outline: none
}

.history-list {
  padding: 10px;
  max-height: 520px;
  overflow: auto;
  ul {
    li {
      border-left: 1px solid #ccc;
      padding-left: 5px;
      padding-bottom: 10px;
      .circle {
        border: 1px solid #ccc;
        border-radius: 50%;
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        position: relative;
        top: -5px;
        left: -12px;
        background-color: #ccc;
      }

      .history-content {
        width: 100%;
        display: inline-block;
        line-height: 25px;
        position: relative;
        top: -5px;
        padding-left: 15px;
      }
      .history-time {
        margin-left: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}

</style>
