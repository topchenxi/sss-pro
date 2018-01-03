<template>
  <section class="detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item order-left">
        <h6>订单详情</h6>
        <dl class="info-item">
          <dt>订单号</dt>
          <dd>{{obj.order.serviceNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>下单时间</dt>
          <dd>{{obj.order.createTime | formatTime}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商</dt>
          <dd>{{obj.order.customerCompany}}</dd>
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
                <td>可用余额</td>
                <td colspan="2" class="money">{{obj.order.customerAccount.availableBalance | formatMoney}}</td>
                <td class="c999 ta-r">单位：元</td>
              </tr>
              <tr>
                <td>搜芽额度</td>
                <td>可用搜芽额度</td>
                <td>白条额度</td>
                <td>可用白条额度</td>
              </tr>
              <tr>
                <td>{{obj.order.customerAccount.creditLine | formatMoney}}</td>
                <td>{{obj.order.customerAccount.remainLine | formatMoney}}</td>
                <td>{{obj.order.customerAccount.baitiaoCreditLine | formatMoney}}</td>
                <td>{{obj.order.customerAccount.baitiaoRemainLine | formatMoney}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <dl class="info-item" v-if="obj.order.leaveMessage">
          <dt>订单备注</dt>
          <dd>{{obj.order.leaveMessage}}</dd>
        </dl>
      </div>
      <div class="detail-item fr ticket-wrap order-right">
        <div class="ticket">
          <dl class="info-item">
            <dt>发票</dt>
            <dd>
              <span v-if="obj.order.invoiceStatus">要</span>
              <span v-else>不要</span>
            </dd>
          </dl>
          <dl class="info-item">
            <dt>单位</dt>
            <dd>{{obj.order.unit}}</dd>
          </dl>
          <dl class="info-item">
            <dt>配送方式</dt>
            <dd>
              <span v-if="obj.order.sendType == 1">采购商自提</span>
              <span v-else>搜芽配送</span>
            </dd>
          </dl>
          <dl class="info-item" v-if="obj.order.sendType == 0">
            <dt>收货人信息</dt>
            <dd>
              <p v-if="obj.order.address.name">{{obj.order.address.name}}</p>
              <p>{{obj.order.address.province}}&nbsp{{obj.order.address.city}}&nbsp{{obj.order.address.area}}&nbsp{{obj.order.address.addr}}</p>
              <p v-if="obj.order.address.tel">{{obj.order.address.tel}}</p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!-- <div>
      <span style="font-weight:700">订单信息</span>
      <el-button type="primary" size="mini" style="width:50px;margin-left:10px;" @click.native="toback">返回</el-button>
    </div> -->
    <!-- <div class="orderMsg">
      <el-form label-width="120px" label-position="right">
        <el-form-item label="订单号">
          <span>{{obj.order.serviceNumber}}</span>
        </el-form-item>
        <el-form-item label="下单时间">{{obj.order.createTime | formatTime}}</el-form-item>
        <el-form-item label="采购商">
          <span>{{obj.order.customerCompany}}</span>
          <table style="border-collapse:collapse; border: 1px solid #ccc" border="1" border-spacing="0">
            <tr>
              <th style="text-align:center; width:150px;">可用余额(元)</th>
              <th style="text-align:center; width:130px; background:#f5f5f5;">搜芽额度(元)</th>
              <th style="text-align:center; width:130px; background:#f5f5f5;">可用搜芽额度(元)</th>
              <th style="text-align:center; width:130px; background:#f5f5f5;">白条额度(元)</th>
              <th style="text-align:center; width:130px; background:#f5f5f5;">可用白条额度(元)</th>
            </tr>
            <tr>
              <td style="text-align:center;">
                <span>{{obj.order.customerAccount.availableBalance | formatMoney}}</span>
              </td>
              <td style="text-align:center; background:#f5f5f5;">
                <span>{{obj.order.customerAccount.creditLine | formatMoney}}</span>
              </td>
              <td style="text-align:center; background:#f5f5f5;">
                <span>{{obj.order.customerAccount.remainLine | formatMoney}}</span>
              </td>
              <td style="text-align:center; background:#f5f5f5;">
                <span>{{obj.order.customerAccount.baitiaoCreditLine | formatMoney}}</span>
              </td>
              <td style="text-align:center; background:#f5f5f5;">
                <span>{{obj.order.customerAccount.baitiaoRemainLine | formatMoney}}</span>
              </td>
            </tr>
          </table>
        </el-form-item>
        <template v-if="obj.order.leaveMessage">
          <el-form-item label="订单备注">
            <span>{{obj.order.leaveMessage}}</span>
          </el-form-item>
        </template>
        <div style="border-bottom:1px dashed #ddd"></div>
        <el-form-item label="发票">
          <template v-if="obj.order.invoiceStatus">
            <span>要</span>
          </template>
          <template v-else>
            <span>不要</span>
          </template>
        </el-form-item>
        <el-form-item label="单位">
          <span>{{obj.order.unit}}</span>
        </el-form-item>
        <el-form-item label="配送方式">
          <template v-if="obj.order.sendType == 1">
            <span>采购商自提</span>
          </template>
          <template v-else>
            <span>搜芽配送</span>
          </template>
        </el-form-item>
        <template v-if="obj.order.sendType == 0">
          <el-form-item label="收货人信息">
            <p style="font-weight:700;height:20px;">{{obj.order.address.name}}</p>
            <p style="height:20px;">{{obj.order.address.province}}&nbsp{{obj.order.address.city}}&nbsp{{obj.order.address.area}}&nbsp{{obj.order.address.addr}}</p>
            <p style="height:20px;">{{obj.order.address.tel}}</p>
          </el-form-item>
        </template>
      </el-form>
    </div> -->
    <div class="detail-group" v-if="obj.product.shopCompany">
      <div class="detail-item order-product pb20">
        <h6>产品信息</h6>
        <dl class="info-item">
          <dt>原供应商</dt>
          <dd>
            <p class="bold">{{obj.product.shopCompany}} ( ID : {{obj.product.sellerNumber}}) </p>
            <p class="c151515">{{obj.product.shopTel}}</p>
            <p class="c151515">{{obj.product.shopProvince}}{{obj.product.shopCity}}{{obj.product.shopArea}}{{obj.product.shopAddr}}</p>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>原供应商货号</dt>
          <dd>{{obj.product.shopOriginalNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>原供应商图片</dt>
          <dd>
            <div class="image-list">
              <div class="show-image">
                <el-col class="card" :href="item" :key="item" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                    <div style="padding: 0;">
                      <p>商品图片
                        <span>({{shopOriginalImgUrls.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </div>
              <div class="show-image">
                <el-col class="card" :href="item" :key="item" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
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
                <td>{{obj.product.title}}</td>
                <td>成分</td>
                <td colspan="2" class="ta-l">{{obj.product.composition}}</td>
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
                  <span v-if="!obj.product.width || obj.product.width == -1">--</span>
                  <span v-else> {{obj.product.width}}{{obj.product.widthUnit}}</span>
                </td>
                <td>
                  <span v-if="!obj.product.weight || obj.product.weight == -1">--</span>
                  <span v-else> {{obj.product.weight}}{{obj.product.weightUnit}}</span>
                </td>
                <td>{{obj.product.shortWeight}}</td>
                <td>{{obj.product.paperTube}}</td>
                <td>
                  <span v-if="!obj.product.metrePerKilo || obj.product.metrePerKilo == -1"></span>
                  <span v-else> {{obj.product.metrePerKilo}}米/公斤</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <template v-if="obj.product.shopCompany">
      <div>
        <span style="font-weight:700">产品信息</span>
      </div>
      <div class="orderMsg">
        <el-form label-width="120px" label-position="right">
          <el-form-item label="原供应商">
            <p style="font-weight:700;height:20px;">{{obj.product.shopCompany}}({{obj.product.sellerNumber}})</p>
            <p style="height:20px;">{{obj.product.shopTel}}</p>
            <p style="height:20px;">{{obj.product.shopProvince}}&nbsp{{obj.product.shopCity}}&nbsp{{obj.product.shopArea}}&nbsp{{obj.product.shopAddr}}</p>
          </el-form-item>
          <el-form-item label="原供应商货号" style="margin-top:7px;">
            <span>{{obj.product.shopOriginalNumber}}</span>
          </el-form-item>
          <el-form-item label="原供应商图片">
            <div class="show-image">
              <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-show="index == 0">
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="item" class="image">
                  <div style="padding: 0;">
                    <p>商品图片
                      <span>({{shopOriginalImgUrls.length}}张)</span>
                    </p>
                  </div>
                </el-card>
              </el-col>
            </div>
            <div class="show-image">
              <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-show="index == 0">
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="item" class="image">
                  <div style="padding: 0;">
                    <p>色卡图片
                      <span>({{shopOriginalColorUrls.length}}张)</span>
                    </p>
                  </div>
                </el-card>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="商品信息" style="margin-top:12px;  ">
            <table style="border-collapse:collapse; border: 1px solid #ccc" border="1" border-spacing="0">
              <tr>
                <th style="width:100px;">品名</th>
                <th style="width:100px;">成分</th>
                <th style="width:100px;">幅宽</th>
                <th style="width:100px;">克重</th>
                <th style="width:100px;">空差</th>
                <th style="width:100px;">纸筒</th>
                <th style="width:120px;">公斤出米数</th>
              </tr>
              <tr>
                <td style="text-align:center;">
                  <span>{{obj.product.title}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.composition}}</span>
                </td>
                <td style="text-align:center;">
                  <span v-if="!obj.product.width || obj.product.width == -1">--</span>
                  <span v-else> {{obj.product.width}}{{obj.product.widthUnit}}</span>
                </td>
                <td style="text-align:center;">
                  <span v-if="!obj.product.weight || obj.product.weight == -1">--</span>
                  <span v-else> {{obj.product.weight}}{{obj.product.weightUnit}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.shortWeight}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.paperTube}}</span>
                </td>
                <td style="text-align:center;">
                  <span v-if="!obj.product.metrePerKilo || obj.product.metrePerKilo == -1"></span>
                  <span v-else> {{obj.product.metrePerKilo}}米/公斤</span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
      </div>
    </template> -->
    <div class="detail-group detail-return" v-if="obj.type == 1">
      <div class="detail-item return-left">
        <h6>退换货信息</h6>
        <dl class="info-item">
          <dt>退换货申请时间</dt>
          <dd>{{obj.createTime | formatTime}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退换货单号</dt>
          <dd>{{obj.number}}</dd>
        </dl>
        <dl class="info-item">
          <dt>入仓单号</dt>
          <dd>{{obj.inReposityNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退换货类型</dt>
          <dd>售前退货</dd>
        </dl>
        <dl class="info-item">
          <dt>当前状态</dt>
          <dd class="green">{{obj.statusDescr}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退货原数</dt>
          <dd>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退货实数</dt>
          <dd>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</dd>
        </dl>
        <dl class="info-item" v-if="obj.guiderRemark">
          <dt>导购换货备注</dt>
          <dd>{{obj.guiderRemark}}</dd>
        </dl>
      </div>
      <div class="detail-item return-right">
        <h6>换货明细</h6>
        <div class="table-warp p14">
          <table class="table-normal table-center">
            <tbody>
              <tr>
                <td></td>
                <td>色号</td>
                <td>退货实数</td>
                <td>匹号</td>
                <td>入仓实数</td>
                <td>实际布长</td>
                <td>验布结果</td>
              </tr>
              <template v-for="(item1, index1) in obj.beforeList">
                <tr>
                  <td :rowspan="item1.clothLoneList.length + 2" class="green-warp">退前</td>
                  <td :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.color}}</span>
                  </td>
                  <td :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.realQuantity | formatMoney}}{{item1.realQuantityUnit}}</span>
                  </td>
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td>{{item2.number}}</td>
                    <td>{{item2.quantity}}{{item2.quantityUnit}}</td>
                    <td>{{item2.buchang}}{{item2.buchangUnit}}</td>
                    <td>
                      <template v-if="item2.checkFlaws">
                        <a class="green" :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws}}</a>
                      </template>
                      <template v-else>
                        <span>--</span>
                      </template>
                    </td>
                  </tr>
                  <tr>
                    <td>{{item1.totalCount}}匹</td>
                    <td>{{item1.totalQuantity}}{{item1.totalQuantityUnit}}</td>
                    <td>{{item1.totalBuchang}}{{item1.totalBuchangUnit}}</td>
                    <td></td>
                  </tr>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group detail-return" v-if="obj.type == 2">
      <div class="detail-item return-left">
        <h6>退换货信息</h6>
        <dl class="info-item">
          <dt>退换货申请时间</dt>
          <dd>{{obj.createTime | formatTime}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退换货单号</dt>
          <dd>{{obj.number}}</dd>
        </dl>
        <dl class="info-item">
          <dt>入仓单号</dt>
          <dd>{{obj.inReposityNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退换货类型</dt>
          <dd>售前退货</dd>
        </dl>
        <dl class="info-item">
          <dt>当前状态</dt>
          <dd class="green">{{obj.statusDescr}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退货原数</dt>
          <dd>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</dd>
        </dl>
        <dl class="info-item">
          <dt>退货实数</dt>
          <dd>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</dd>
        </dl>
        <dl class="info-item">
          <dt>现采购数</dt>
          <dd>{{obj.needBuyQuantity | formatMoney}}{{obj.needBuyQuantityUnit}}</dd>
        </dl>
        <dl class="info-item" v-if="obj.guiderRemark">
          <dt>采货员换货备注</dt>
          <dd>{{obj.guiderRemark}}</dd>
        </dl>
        <div class="line"></div>
        <dl class="info-item">
          <dt>换货码单</dt>
          <dd>
            <div class="image-list mb20">
              <div class="show-image fr m0">
                <div class="card" v-if="rrMadanList.length" :span="2" :href="item" :key="item" v-lightbox="rrMadanList" v-for="(item, index) in rrMadanList" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                    <div style="padding: 0;">
                      <p>码单
                        <span>({{rrMadanList.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
          </dd>
        </dl>
      </div>
      <div class="detail-item return-right">
        <h6>换货明细</h6>
        <div class="table-warp p14">
          <table class="table-normal table-center">
            <colgroup>
              <col width="12%">
              <col width="12%">
              <col width="12%">
              <col width="12%">
              <col width="12%">
              <col width="12%">
              <col width="12%">
              <col width="12%">
            </colgroup>
            <tbody>
              <tr>
                <td></td>
                <td>色号</td>
                <td>换货实数</td>
                <td>现采购数</td>
                <td>匹号</td>
                <td>入仓实数</td>
                <td>实际布长</td>
                <td>验布结果</td>
              </tr>
              <template v-for="(item1, index1) in obj.beforeList">
                <tr>
                  <td :rowspan="item1.clothLoneList.length + 2" class="green-warp">换前</td>
                  <td :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.color}}</span>
                  </td>
                  <td :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.realQuantity | formatMoney}}{{item1.realQuantityUnit}}</span>
                  </td>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.needBuyQuantity | formatMoney}}{{item1.needBuyQuantityUnit}}</span>
                  </td>
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td>{{item2.number}}</td>
                    <td>{{item2.quantity}}{{item2.quantityUnit}}</td>
                    <td>{{item2.buchang}}{{item2.buchangUnit}}</td>
                    <td>
                      <template v-if="item2.checkFlaws">
                        <a class="green" :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws}}</a>
                      </template>
                      <template v-else>
                        <span>--</span>
                      </template>
                    </td>
                  </tr>
                  <tr>
                    <td>{{item1.totalCount}}匹</td>
                    <td>{{item1.totalQuantity}}{{item1.totalQuantityUnit}}</td>
                    <td>{{item1.totalBuchang}}{{item1.totalBuchangUnit}}</td>
                    <td></td>
                  </tr>
                </tr>
              </template>
            </tbody>
          </table>
          <template v-if="obj.afterList.length">
            <table class="table-normal table-center">
              <colgroup>
                <col width="12%">
                <col width="12%">
                <col width="12%">
                <col width="12%">
                <col width="12%">
                <col width="12%">
                <col width="12%">
                <col width="12%">
              </colgroup>
              <tbody>
                <template v-for="(item1, index1) in obj.afterList">
                  <tr :class="{'tr-bdn':index1==0}">
                    <td :rowspan="item1.clothLoneList.length + 2" class="back-warp">换后</td>
                    <td :rowspan="item1.clothLoneList.length + 2">
                      <span>{{item1.color}}</span>
                    </td>
                    <td :rowspan="item1.clothLoneList.length + 2">
                      <span>{{item1.realQuantity | formatMoney}}{{item1.realQuantityUnit}}</span>
                    </td>
                    <td :rowspan="item1.clothLoneList.length + 2">
                      <span>{{item1.needBuyQuantity | formatMoney}}{{item1.needBuyQuantityUnit}}</span>
                    </td>
                    <tr :class="{'tr-bdn':index1==0}" v-for="(item2, index2) in item1.clothLoneList">
                      <td>{{item2.number}}</td>
                      <td>{{item2.quantity}}{{item2.quantityUnit}}</td>
                      <td>{{item2.buchang}}{{item2.buchangUnit}}</td>
                      <td>
                        <template v-if="item2.checkFlaws">
                          <a class="green" :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws}}</a>
                        </template>
                        <template v-else>
                          <span>--</span>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td>{{item1.totalCount}}匹</td>
                      <td>{{item1.totalQuantity}}{{item1.totalQuantityUnit}}</td>
                      <td>{{item1.totalBuchang}}{{item1.totalBuchangUnit}}</td>
                      <td></td>
                    </tr>
                  </tr>
                </template>
              </tbody>
            </table>
          </template>
        </div>
      </div>
    </div>
   <!--  <div>
      <span style="font-weight:700">退换货信息</span>
    </div> -->
   <!--  <div class="orderMsg">
      <template v-if="obj.type == 1">
        <el-form label-width="120px" label-position="right">
          <el-form-item label="退换货申请时间">
            <span>{{obj.createTime | formatTime}}</span>
          </el-form-item>
          <el-form-item label="退换货单号">
            <span>{{obj.number}}</span>
          </el-form-item>
          <el-form-item label="入仓单号">
            <span>{{obj.inReposityNumber}}</span>
          </el-form-item>
          <el-form-item label="退换货类型">
            <span>售前退货</span>
          </el-form-item>
          <el-form-item label="当前状态">
            <span>{{obj.statusDescr}}</span>
          </el-form-item>
          <el-form-item label="退货明细">
            <table style="border-collapse:collapse; border: 1px solid #3399FF;margin-top:12px;" border="1" border-spacing="0">
              <tr>
                <th style="text-align:center; width:60px; background-color:#3399ff;" :rowspan="obj.blen">退前</th>
                <th style="text-align:center; width:100px;">色号</th>
                <th style="text-align:center; width:120px;">退货实数</th>
                <th style="text-align:center; width:100px;">匹号</th>
                <th style="text-align:center; width:150px;">入仓实数</th>
                <th style="text-align:center; width:150px;">实际布长</th>
                <th style="text-align:center; width:120px;">验布结果</th>
              </tr>
              <template v-for="(item1, index1) in obj.beforeList">
                <tr>
                  <td style="text-align:center" :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.color}}</span>
                  </td>
                  <td style="text-align:center; overflow:hidden" :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.realQuantity | formatMoney}}{{item1.realQuantityUnit}}</span>
                  </td>
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td style="text-align:center">{{item2.number}}</td>
                    <td style="text-align:center">{{item2.quantity}}{{item2.quantityUnit}}</td>
                    <td style="text-align:center">{{item2.buchang}}{{item2.buchangUnit}}</td>
                    <td style="text-align:center">
                      <template v-if="item2.checkFlaws">
                        <a style=" text-decoration:none;" :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws}}</a>
                      </template>
                      <template v-else>
                        <span>--</span>
                      </template>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center">{{item1.totalCount}}匹</td>
                    <td style="text-align:center">{{item1.totalQuantity}}{{item1.totalQuantityUnit}}</td>
                    <td style="text-align:center">{{item1.totalBuchang}}{{item1.totalBuchangUnit}}</td>
                    <td></td>
                  </tr>
                </tr>
              </template>
            </table>
          </el-form-item>
          <el-form-item label="退货原数">
            <span>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</span>
          </el-form-item>
          <el-form-item label="退货实数">
            <span>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</span>
          </el-form-item>
          <template v-if="$route.query.status == 2">
            <template v-if="obj.moneyType == 1">
              <el-form-item label="供应商退款">{{obj.money | formatMoney}}元</el-form-item>
            </template>
            <template v-else>
              <el-form-item label="搜芽补款">{{obj.money | formatMoney}}元</el-form-item>
            </template>
          </template>
          <template v-if="obj.guiderRemark">
            <el-form-item label="采货员退货备注">
              <span>{{obj.guiderRemark}}</span>
            </el-form-item>
          </template>
        </el-form>
      </template>
      <template v-if="obj.type == 2">
        <el-form label-width="120px" label-position="right">
          <el-form-item label="退换货申请时间">
            <span>{{obj.createTime | formatTime}}</span>
          </el-form-item>
          <el-form-item label="退换货单号">
            <span>{{obj.number}}</span>
          </el-form-item>
          <el-form-item label="入仓单号">
            <span>{{obj.inReposityNumber}}</span>
          </el-form-item>
          <el-form-item label="退换货类型">
            <span>售前退货</span>
          </el-form-item>
          <el-form-item label="当前状态">
            <span>{{obj.statusDescr}}</span>
          </el-form-item>
          <el-form-item label="换货明细">
            <table style="border-collapse:collapse; border: 1px solid #3399FF;margin-top:12px;" border="1" border-spacing="0">
              <tr>
                <th style="text-align:center; width:60px; background-color:#3399ff;" :rowspan="obj.blen">换前</th>
                <th style="text-align:center; width:100px;">色号</th>
                <th style="text-align:center; width:120px;">换货实数</th>
                <th style="text-align:center; width:120px;">现采购数</th>
                <th style="text-align:center; width:100px;">匹号</th>
                <th style="text-align:center; width:150px;">入仓实数</th>
                <th style="text-align:center; width:150px;">实际布长</th>
                <th style="text-align:center; width:120px;">验布结果</th>
              </tr>
              <template v-for="(item1, index1) in obj.beforeList">
                <tr>
                  <td style="text-align:center" :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.color}}</span>
                  </td>
                  <td style="text-align:center" :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.realQuantity | formatMoney}}{{item1.realQuantityUnit}}</span>
                  </td>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <span>{{item1.needBuyQuantity | formatMoney}}{{item1.needBuyQuantityUnit}}</span>
                  </td>
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td style="text-align:center">{{item2.number}}</td>
                    <td style="text-align:center">{{item2.quantity}}{{item2.quantityUnit}}</td>
                    <td style="text-align:center">{{item2.buchang}}{{item2.buchangUnit}}</td>
                    <td style="text-align:center">
                      <template v-if="item2.checkFlaws">
                        <a style=" text-decoration:none;" :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws}}</a>
                      </template>
                      <template v-else>
                        <span>--</span>
                      </template>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center">{{item1.totalCount}}匹</td>
                    <td style="text-align:center">{{item1.totalQuantity}}{{item1.totalQuantityUnit}}</td>
                    <td style="text-align:center">{{item1.totalBuchang}}{{item1.totalBuchangUnit}}</td>
                    <td></td>
                  </tr>
                </tr>
              </template>
            </table>
            <template v-if="obj.afterList.length">
              <table style="border-collapse:collapse; border: 1px solid #ff9900;margin-top:12px;" border="1" border-spacing="0">
                <tr>
                  <th style="text-align:center; width:60px; background-color:#ff9900;" :rowspan="obj.alen">换后</th>
                  <th style="text-align:center; width:100px;">色号</th>
                  <th style="text-align:center; width:120px;">换货实数</th>
                  <th style="text-align:center; width:120px;">现采购数</th>
                  <th style="text-align:center; width:100px;">匹号</th>
                  <th style="text-align:center; width:150px;">入仓实数</th>
                  <th style="text-align:center; width:150px;">实际布长</th>
                  <th style="text-align:center; width:120px;">验布结果</th>
                </tr>
                <template v-for="(item1, index1) in obj.afterList">
                  <tr>
                    <td style="text-align:center" :rowspan="item1.clothLoneList.length + 2">
                      <span>{{item1.color}}</span>
                    </td>
                    <td style="text-align:center" :rowspan="item1.clothLoneList.length + 2">
                      <span>{{item1.realQuantity | formatMoney}}{{item1.realQuantityUnit}}</span>
                    </td>
                    <td style="text-align:center" :rowspan="item1.clothLoneList.length + 2">
                      <span>{{item1.needBuyQuantity | formatMoney}}{{item1.needBuyQuantityUnit}}</span>
                    </td>
                    <tr v-for="(item2, index2) in item1.clothLoneList">
                      <td style="text-align:center">{{item2.number}}</td>
                      <td style="text-align:center">{{item2.quantity}}{{item2.quantityUnit}}</td>
                      <td style="text-align:center">{{item2.buchang}}{{item2.buchangUnit}}</td>
                      <td style="text-align:center">
                        <template v-if="item2.checkFlaws">
                          <a style=" text-decoration:none;" :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws}}</a>
                        </template>
                        <template v-else>
                          <span>--</span>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align:center">{{item1.totalCount}}匹</td>
                      <td style="text-align:center">{{item1.totalQuantity}}{{item1.totalQuantityUnit}}</td>
                      <td style="text-align:center">{{item1.totalBuchang}}{{item1.totalBuchangUnit}}</td>
                      <td></td>
                    </tr>
                  </tr>
                </template>
              </table>
            </template>
          </el-form-item>
          <el-form-item label="换货原数">
            <span>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</span>
          </el-form-item>
          <el-form-item label="换货实数">
            <span>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</span>
          </el-form-item>
          <el-form-item label="现采购数">
            <span>{{obj.needBuyQuantity | formatMoney}}{{obj.needBuyQuantityUnit}}</span>
          </el-form-item>
          <template v-if="$route.query.status == 2">
            <template v-if="obj.moneyType == 1">
              <el-form-item label="供应商退款">{{obj.money | formatMoney}}元</el-form-item>
            </template>
            <template v-else>
              <el-form-item label="搜芽补款">{{obj.money | formatMoney}}元</el-form-item>
            </template>
          </template>
          <template v-if="rrMadanList.length">
            <el-form-item label="换货码单">
              <el-row>
                <el-col style="min-width:130px;margin-top:12px;" :span="2" :href="item" :key="item" v-lightbox="rrMadanList" v-for="(item, index) in rrMadanList" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px 10px 0px 22px' }">
                    <img :src="item" style="width:80px; height:80px;cursor:pointer">
                    <div style="padding: 0;">
                      <p>码单
                        <span>({{rrMadanList.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>
          </template>
          <template v-if="obj.guiderRemark">
            <el-form-item label="采货员换货备注">
              <span>{{obj.guiderRemark}}</span>
            </el-form-item>
          </template>
        </el-form>
      </template>
    </div> -->
    <Lightbox></Lightbox>
  </section>
</template>
<script>
// import config from './data.json'
import { newRequest } from 'utils/tool'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    Lightbox,
  },
  data() {
    return {
      imgPath: 'http://www.soouya.com',
      webUrl: '',
      shopOriginalColorUrls: [],
      shopOriginalImgUrls: [],
      rrMadanList: [],
      obj: {
        order: {
          customerAccount: {},
          address: {},
        },
        product: {},
        beforeList: [],
        afterList: [],
        blen: 0,
        alen: 0,
      }
    }
  },
  mounted() {
    this.getData()
    const host = location.host
    if (host == 'hspc.soouya.com' || host.indexOf('local') != -1) {
      this.webUrl = 'http://testmhongshan.soouya.com/'
    } else if (host.indexOf('test') != -1) {
      this.webUrl = 'http://testmhongshan.soouya.com/'
    } else {
      this.webUrl = 'http://mhongshan.soouya.com/'
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('changeload', true)
      // let res = config.editOrder
      newRequest({
        url: '/redwood/returnreplace/getByIdForGuider',
        data: {
          id: this.$route.query.id
        },
        method: 'get',
        contentType: 'application/json',
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
          if (!res.obj.product) {
            this.obj.product = {}
          }
          this.shopOriginalColorUrls = this.formateImgList(this.obj.product.shopOriginalColorUrls)
          this.shopOriginalImgUrls = this.formateImgList(this.obj.product.shopOriginalImgUrls)
          this.rrMadanList = this.formateImgList(this.obj.madanImgUrls)
          if (this.obj.beforeList) {
            let len = 1
            for (let i = 0; i < this.obj.beforeList.length; i++) {
              len += this.obj.beforeList[i].clothLoneList.length
              len += 2
              this.obj.beforeList[i].totalCount = 0
              this.obj.beforeList[i].totalCount += this.obj.beforeList[i].clothLoneList.length
              this.obj.beforeList[i].totalQuantity = 0
              this.obj.beforeList[i].totalQuantityUnit = this.obj.beforeList[i].clothLoneList[0].quantityUnit
              this.obj.beforeList[i].totalBuchang = 0
              this.obj.beforeList[i].totalBuchangUnit = this.obj.beforeList[i].clothLoneList[0].buchangUnit
              for (let j = 0; j < this.obj.beforeList[i].clothLoneList.length; j++) {
                this.obj.beforeList[i].totalQuantity += this.obj.beforeList[i].clothLoneList[j].quantity
                this.obj.beforeList[i].totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
              }
            }
            this.obj.blen = len
          }
          if (!this.obj.afterList) {
            this.obj.afterList = []
          }
          if (this.obj.afterList) {
            let len = 1
            for (let i = 0; i < this.obj.afterList.length; i++) {
              len += this.obj.afterList[i].clothLoneList.length
              len += 2
              this.obj.afterList[i].totalCount = this.obj.afterList[i].clothLoneList.length
              this.obj.afterList[i].totalQuantity = 0
              this.obj.afterList[i].totalQuantityUnit = this.obj.afterList[i].clothLoneList[0].quantityUnit
              this.obj.afterList[i].totalBuchang = 0
              this.obj.afterList[i].totalBuchangUnit = this.obj.afterList[i].totalQuantityUnit
              for (let j = 0; j < this.obj.afterList[i].clothLoneList.length; j++) {
                this.obj.afterList[i].totalQuantity += this.obj.afterList[i].clothLoneList[j].quantity
                this.obj.afterList[i].totalBuchang += this.obj.afterList[i].clothLoneList[j].buchang
              }
            }
            this.obj.alen = len
          }
          this.$store.dispatch('changeload', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    toback() {
      window.history.go(-1)
    },
    formateImgList(list) {
      let arr = []
      if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
          arr.push(this.imgPath + list[i])
        }
      }
      return arr
    },
  }
}

</script>
<style lang="scss">
.orderMsg {
  padding-top: 5px;
  padding-bottom: 20px;
  margin-top: 7.5px;
  padding-left: 10px;
  padding-right: 10px;
  border: 0.5px solid #ccc;
  .el-form {
    // margin: 0px;
    .el-form-item {
      padding: 0px;
      margin: 0px;
    }
  }
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

.price-show-image {
  font-size: 14px;
  .card {
    width: 140px;
  }
  .image {
    width: 100%;
    height: 120px;
    cursor: pointer;
  }
}

</style>
