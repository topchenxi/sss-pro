<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>订单详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item order-left">
        <h6>订单详情</h6>
        <dl class="info-item">
          <dt>订单号</dt>
          <dd>{{order.serviceNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>下单时间</dt>
          <dd>{{order.createTime | formatTime}} 销售员 | {{order.salesName}} | {{order.salesTel}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商</dt>
          <dd>{{order.customerCompany}}</dd>
        </dl>
        <div class="table-warp p14" style="width:90%">
          <table class="table-normal">
            <colgroup>
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
            </colgroup>
            <tbody>
              <tr>
                <td>可用余额</td>
                <td colspan="2" class="money">{{order.customerAccount.availableBalance | formatMoney}}</td>
                <td colspan="3" class="c999 ta-r">单位：元</td>
              </tr>
              <tr>
                <td>搜芽额度</td>
                <td>可用搜芽额度</td>
                <td>白条额度</td>
                <td>可用白条额度</td>
                <td>信贷额度</td>
                <td>可用信贷额度</td>
              </tr>
              <tr>
                <td>{{order.customerAccount.creditLine | formatMoney}}</td>
                <td>{{order.customerAccount.remainLine | formatMoney}}</td>
                <td>
                  <span v-if="order.customerAccount.baitiaoCreditLine && order.customerAccount.hasOpenedBaitiao == 1">
                      {{order.customerAccount.baitiaoCreditLine | formatNumber}}
                    </span>
                  <span v-if="order.customerAccount.hasOpenedBaitiao == 0">
                      --
                    </span>
                  <span v-if="order.customerAccount.hasOpenedBaitiao != 0 && !order.customerAccount.baitiaoCreditLine">
                      0.00
                    </span>
                </td>
                <td>
                  <span v-if="order.customerAccount.baitiaoRemainLine && order.customerAccount.hasOpenedBaitiao == 1">
                      {{order.customerAccount.baitiaoRemainLine | formatNumber}}
                    </span>
                  <span v-if="order.customerAccount.hasOpenedBaitiao == 0">
                      --
                    </span>
                  <span v-if="order.customerAccount.hasOpenedBaitiao != 0 && !order.customerAccount.baitiaoRemainLine">
                      0.00
                    </span>
                </td>
                <td>
                  <span v-if="order.customerAccount.yanzhenCreditLine && order.customerAccount.hasOpenedYanzhen == 1">
                        {{order.customerAccount.yanzhenCreditLine | formatNumber}}
                      </span>
                  <span v-if="order.customerAccount.hasOpenedYanzhen == 0">
                        --
                      </span>
                  <span v-if="order.customerAccount.hasOpenedYanzhen != 0 && !order.customerAccount.yanzhenCreditLine">
                        0.00
                      </span>
                </td>
                <td>
                  <span v-if="order.customerAccount.yanzhenRemainLine && order.customerAccount.hasOpenedYanzhen == 1">
                        {{order.customerAccount.yanzhenRemainLine | formatNumber}}
                      </span>
                  <span v-if="order.customerAccount.hasOpenedYanzhen == 0">
                        --
                      </span>
                  <span v-if="order.customerAccount.hasOpenedYanzhen != 0 && !order.customerAccount.yanzhenRemainLine">
                        0.00
                      </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <dl class="info-item">
          <dt>销售员备注</dt>
          <dd>{{order.leaveMessage}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购员备注</dt>
          <dd>{{order.guiderRemark}}</dd>
        </dl>
      </div>
      <div class="detail-item fr ticket-wrap order-right">
        <div class="ticket">
          <dl class="info-item">
            <dt>发票</dt>
            <dd>
              <span>{{order.invoiceStatus ? '要' : '不要'}}</span>
            </dd>
          </dl>
          <dl class="info-item">
            <dt>单位</dt>
            <dd>{{order.unit}}</dd>
            <!-- 还未确定 -->
          </dl>
          <dl class="info-item">
            <dt>配送方式</dt>
            <dd>
              <span>{{order.sendType | sendTypeFilter}}</span>
            </dd>
          </dl>
          <dl class="info-item" v-if="order.sendType == 0">
            <dt>收货人信息</dt>
            <dd>
              <p v-if="order.address.name">{{order.address.name}}</p>
              <p> {{order.address.province}} {{order.address.city}} {{order.address.area}} {{order.address.addr}}</p>
              <p v-if="order.address.tel">{{order.address.tel}}</p>
            </dd>
          </dl>
        </div>
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
          <h5>商品信息</h5>
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
    <div class="detail-group" v-if="hasInRepsoity">
      <div class="detail-item" style="width:100%">
        <h6>验布报告</h6>
        <div class="clearfix" style="margin-bottom: 5px;">
          <div class="clearfix" style="display: inline-block; position: relative;">
            <el-select v-model="checkCloth" placeholder="请选择" style="display: inline-block; width: 130px;" @change="selectPiHao">
              <el-option label="全部匹号" value="3">全部匹号</el-option>
              <el-option label="入仓单号" value="0">入仓单号</el-option>
            </el-select>
            <el-select placeholder="请选择" v-model="subCheckCloth" style="display: inline-block; width: 180px;" v-if="checkCloth != '3' && Object.keys(repsoityList).length" @change="selectSubPiHao">
              <el-option :label="key+'/共'+value.count+'匹'" :value="key" v-for="(value, key) in repsoityList">{{key}}/共{{value.count}}匹</el-option>
            </el-select>
          </div>
        </div>
        <div class="table-warp p14" style="width:100%">
          <table class="table-normal table-center" v-if="resultSort.length > 0">
            <thead>
              <tr>
                <th>匹号信息({{result.length}})</th>
                <th> 销售单价 </th>
                <th> 采购单价 </th>
                <th> 入仓实数 </th>
                <th> 实际布长 </th>
                <th> 入仓时间 </th>
                <th> 入仓类型 </th>
                <th> 操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in resultSort">
                <td>
                  <p><span class="pi-l">匹号：</span>{{item.number}}<span class="y-icon" v-if="item.isInReturn == 1">退</span></p>
                  <p><span class="pi-l">色号：</span>{{item.color}}</p>
                  <p v-if="item.hasCheckReport == 1">
                    <span v-if="item.rank == 0"><span class="pi-l">等级评分：</span>无等级</span>
                    <span v-if="item.rank == 1"><span class="pi-l">等级评分：</span>A</span>
                    <span v-if="item.rank == 2"><span class="pi-l">等级评分：</span>B</span>
                    <span v-if="item.rank == 3"><span class="pi-l">等级评分：</span>C</span>
                    <span v-if="item.rank == 4"><span class="pi-l">等级评分：</span>D</span>/{{Number(item.average).toFixed(2)}}分
                  </p>
                  <p v-if="item.hasCheckReport == 1"><span><span>验布师：{{item.checkerName}}</span></span>
                  </p>
                  </p>
                </td>
                <td>
                  {{item.salePrice | formatNumber}}{{item.salePriceUnit}}
                </td>
                <td>
                  {{item.buyPrice | formatNumber}}{{item.buyPriceUnit}}
                </td>
                <td>
                  {{item.quantity | formatNumber}}{{item.quantityUnit}}
                </td>
                <td>
                  {{item.buchang | formatNumber}}{{item.buchangUnit}}
                </td>
                <td>
                  {{item.inRepsoity.createTime | formatData}}
                </td>
                <td>
                  {{item.inRepsoity.type | formateText}}
                </td>
                <td>
                  <a :href="item.reportDetailUrl" target="_blank">
                    <el-button v-if="item.hasCheckReport == 1" size="small" type="primary">下载验货报告</el-button>
                  </a>
                  <a :href="item.checkReportDetailUrl" target="_blank">
                    <el-button v-if="item.hasCheckReport == 1" size="small">查看验货报告</el-button>
                  </a>
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
        <div class="image-list m14">
          <div class="show-image" v-if="saleMadanImgUrls.length">
            <el-col class="card" :href="item" :key="item" v-lightbox="saleMadanImgUrls" v-for="(item, index) in saleMadanImgUrls" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>销售码单
                    <span>({{saleMadanImgUrls.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <template v-else>
            <router-link class="show-image" :to="{name: 'guiderSalesTable', query: {orderNumber: order.orderNumber, status: 2}}" target="_blank">
              <el-col class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="item" class="image">
                  <div style="padding: 0;">
                    <p>销售码单
                      <span>(1张)</span>
                    </p>
                  </div>
                </el-card>
              </el-col>
            </router-link>
          </template>
          <div class="show-image">
            <el-col class="card" :href="item" :key="item" v-lightbox="buyerCertificateList" v-for="(item, index) in buyerCertificateList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>销售付款凭据
                    <span>({{buyerCertificateList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <div class="show-image">
            <el-col class="card" :href="item" :key="item" v-lightbox="sendCertificateList" v-for="(item, index) in sendCertificateList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>物流凭据
                    <span>({{sendCertificateList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <div class="show-image w20 h150">
          </div>
          <div class="show-image">
            <el-col class="card" :href="item" :key="item" v-lightbox="soouyaCertificateList" v-for="(item, index) in soouyaCertificateList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>搜芽付款凭据
                    <span>({{soouyaCertificateList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <div class="show-image" v-show="!isSaler">
            <el-col class="card" :href="item" :key="item" v-lightbox="sellerMadanImgUrls" v-for="(item, index) in sellerMadanImgUrls" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>原供应商码单
                    <span>({{sellerMadanImgUrls.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <router-link class="show-image" v-show="!isSaler" :to="{name: 'guiderQuoteTable', query: {orderNumber: order.orderNumber}}" target="_blank">
            <el-col class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>采购员报价单
                    <span>(1张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </router-link>
        </div>
      </div>
    </div>
    <div class="detail-group" v-if="payList.length > 0">
      <div class="detail-item" style="width:100%;">
        <h6>支付信息</h6>
        <div class="table-warp p14" style="width:90%">
          <table class="table-normal table-center" v-if="payList.length > 0">
            <thead>
              <tr>
                <th> 提交支付时间 </th>
                <th> 出仓单号 </th>
                <th> 色号/匹号 </th>
                <th> 入仓实数 </th>
                <th> 实际布长 </th>
                <th> 应收出仓销售货款 </th>
                <th> 运费 </th>
                <th> 欠款金额</th>
                <th> 付款凭据</th>
                <th> 垫付凭据</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in payList">
                <td>
                  {{item.createTime | formatData}}
                </td>
                <td>
                  {{item.number}}
                </td>
                <td>
                  {{item.color}}/{{item.clothLoneNumber}}
                </td>
                <td>
                  <span v-if="item.quantity > 0">{{item.quantity}}{{item.quantityUnit}}</span>
                  <span v-else>--</span>
                </td>
                <td>
                  <span v-if="item.buchang > 0">{{item.buchang}}{{item.buchangUnit}}</span>
                  <span v-else>--</span>
                </td>
                <td>
                  {{item.needSaleMoney}}元
                </td>
                <td>
                  <span v-if="item.freightMoney >= 0">{{item.freightMoney}}元</span>
                  <span v-else>--</span>
                </td>
                <td>
                  <span v-if="item.freightMoney >= 0">{{item.freightMoney + item.needSaleMoney}}元</span>
                  <span v-else>{{item.needSaleMoney}}元</span>
                </td>
                <td>
                  <div class="showmadan" v-if="item.payCredentialUrls.length > 0">
                    <a :href="'http://www.soouya.com' + item1" :key="item1" v-lightbox="item.payCredentialUrls" v-for="(item1, index) in item.payCredentialUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item1" width='40' height="40" /></a>
                    <p>{{item.payCredentialUrls.length}}/张</p>
                  </div>
                  <span v-else>--</span>
                </td>
                <td>
                  <div class="showmadan" v-if="item.prepayCredentialUrls.length > 0">
                    <a :href="'http://www.soouya.com' + item1" :key="item1" v-lightbox="item.prepayCredentialUrls" v-for="(item1, index) in item.prepayCredentialUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item1" width='40' height="40" /></a>
                    <p>{{item.prepayCredentialUrls.length}}/张</p>
                  </div>
                  <span v-else>--</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group" v-if="(outreposity && detailType=='waitReceipt') || (outreposity && detailType=='hadReceipt')">
      <div class="detail-item" style="width:100%">
        <h6>出仓信息</h6>
        <div class="table-warp p14" style="width:100%">
          <table class="table-normal table-center" v-if="outreposity">
            <thead>
              <tr>
                <th> 通知出仓时间 </th>
                <th> 出仓时间 </th>
                <th> 出仓单号 </th>
                <th> 出仓地点 </th>
                <th> 出仓收货人 </th>
                <th> 出仓备注 </th>
                <th> 色号/匹号 </th>
                <th> 出仓实数 </th>
                <th> 实际布长 </th>
                <th> 操作 </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in outreposity.clothLoneList">
                <td v-if="index==0" :rowspan="outreposity.clothLoneList.length">
                  {{outreposity.createTime | formatData}}
                </td>
                <td v-if="index==0" :rowspan="outreposity.clothLoneList.length">
                  {{outreposity.outTime | formatData}}
                </td>
                <td v-if="index==0" :rowspan="outreposity.clothLoneList.length">
                  {{outreposity.number}}
                </td>
                <td v-if="index==0" :rowspan="outreposity.clothLoneList.length">
                  <el-tooltip class="item" effect="dark" :content="outreposity.reposityName" placement="right-start">
                    <p class="ellipsis" style="max-width: 200px" v-if="outreposity.reposityName">{{outreposity.reposityName}}</p>
                    <p v-else>--</p>
                  </el-tooltip>
                </td>
                <td v-if="index==0" :rowspan="outreposity.clothLoneList.length">
                  <el-tooltip class="item" effect="dark" :content="outreposity.contactName + ' ,' + outreposity.contactTel + ' ,' + outreposity.province+outreposity.city+outreposity.area+outreposity.addr" placement="right-start" v-if="order.sendType == 0">
                    <p class="ellipsis" style="max-width: 200px" v-if="order.sendType == 0">{{outreposity.contactName}} ,{{outreposity.contactTel}} ,{{outreposity.province}}{{outreposity.city}}{{outreposity.area}}{{outreposity.addr}}</p>
                  </el-tooltip>
                  <p v-else>--</p>
                </td>
                <td v-if="index==0" :rowspan="outreposity.clothLoneList.length">
                  <el-tooltip class="item" effect="dark" :content="outreposity.remark" placement="right-start" v-if="outreposity.remark">
                    <p class="ellipsis" style="max-width: 200px" v-if="outreposity.remark">{{outreposity.remark}}</p>
                  </el-tooltip>
                  <p v-else>--</p>
                </td>
                <td>
                  {{item.color}} {{item.number}}
                </td>
                <td class="ta-r">
                  {{item.quantity}} {{item.quantityUnit}}
                </td>
                <td class="ta-r">
                  {{item.buchang}}{{item.buchangUnit}}
                </td>
                <td>
                  <a class="link" :href="item.checkReportDetailUrl" target="_blank" v-if="item.hasCheckReport"> 验布报告 </a> <span v-else>--</span> </td>
              </tr>
              <tr>
                <td colspan="7"></td>
                <td class="ta-r"> <span class="red" v-if="outreposity.totalQuantity != 0.00"> {{outreposity.totalQuantity}}{{outreposity.quantityUnit}} </span> </td>
                <td class="ta-r"> <span class="red" v-if="outreposity.totalBuchang != 0.00"> {{outreposity.totalBuchang}}{{outreposity.buchangUnit}} </span> </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group" v-if="inreposity && detailType=='waitOutRepo'">
      <div class="detail-item" style="width:100%">
        <h6>入仓信息</h6>
        <div class="table-warp p14" style="width:90%">
          <table class="table-normal table-center">
            <thead>
              <tr>
                <th>入仓时间 </th>
                <th>入仓单号 </th>
                <th>入仓类型 </th>
                <th>入仓地点 </th>
                <th>色号/匹号 </th>
                <th>入仓实数 </th>
                <th>实际布长 </th>
                <th>操作 </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  {{inreposity.createTime | formatData}}
                </td>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  {{inreposity.number}}
                </td>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  <span v-if="inreposity.inType == 1">采购入仓</span>
                  <span v-if="inreposity.inType == 2">换货入仓</span>
                  <span v-if="inreposity.inType == 3">售后入仓</span>
                </td>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  <el-tooltip class="item" effect="dark" :content="inreposity.reposityName" placement="right-start">
                    <p class="ellipsis" style="width: 250px;">{{inreposity.reposityName}}</p>
                  </el-tooltip>
                </td>
              </tr>
              <tr v-for="(item, index) in inreposity.clothLoneList">
                <td>
                  {{item.color}} {{item.number}}
                </td>
                <td class="ta-r">
                  {{item.quantity}} {{item.quantityUnit}}
                </td>
                <td class="ta-r">
                  {{item.buchang}} {{item.buchangUnit}}
                </td>
                <td style="width:180px;text-align:center;line-height:37px;">
                  <a :href="item.checkReportDetailUrl" target="_blank" v-if="item.hasCheckReport"> 验布报告 </a> <span v-else>--</span>
                </td>
              </tr>
              <tr>
                <td colspan="5" class="ta-r"> 合计</td>
                <td class="ta-r">
                  <strong v-if="inreposity.totalQuantity != 0.00"> {{inreposity.totalQuantity}}{{inreposity.quantityUnit}} </strong> </td>
                <td class="ta-r">
                  <strong v-if="inreposity.totalBuchang != 0.00"> {{inreposity.totalBuchang}}{{inreposity.buchangUnit}} </strong> </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group" v-if="inreposity && detailType=='waitInspect'">
      <div class="detail-item" style="width:100%">
        <h6>入仓信息</h6>
        <div class="table-warp p14" style="width:90%">
          <table class="table-normal table-center">
            <thead>
              <tr>
                <th>入仓时间 </th>
                <th>入仓单号 </th>
                <th>入仓类型 </th>
                <th>入仓地点 </th>
                <th>色号/匹号 </th>
                <th>入仓实数 </th>
                <th>实际布长 </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  {{inreposity.createTime | formatData}}
                </td>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  {{inreposity.number}}
                </td>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  <span v-if="inreposity.inType == 1">采购入仓</span>
                  <span v-if="inreposity.inType == 2">换货入仓</span>
                  <span v-if="inreposity.inType == 3">售后入仓</span>
                </td>
                <td :rowspan="inreposity.clothLoneList.length +1">
                  <el-tooltip class="item" effect="dark" :content="inreposity.reposityName" placement="right-start">
                    <p class="ellipsis" style="width: 250px;">{{inreposity.reposityName}}</p>
                  </el-tooltip>
                </td>
              </tr>
              <tr v-for="(item, index) in inreposity.clothLoneList">
                <td>
                  {{item.color}} {{item.number}}
                </td>
                <td class="ta-r">
                  {{item.quantity}} {{item.quantityUnit}}
                </td>
                <td class="ta-r">
                  {{item.buchang}} {{item.buchangUnit}}
                </td>
              </tr>
              <tr>
                <td colspan="5" class="ta-r"> 合计</td>
                <td class="ta-r">
                  <strong v-if="inreposity.totalQuantity != 0.00"> {{inreposity.totalQuantity}}{{inreposity.quantityUnit}} </strong> </td>
                <td class="ta-r">
                  <strong v-if="inreposity.totalBuchang != 0.00"> {{inreposity.totalBuchang}}{{inreposity.buchangUnit}} </strong> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <lightbox />
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import _ from 'lodash'
import {
  newRequest,
  formatTimeString
} from 'utils/tool'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      isSaler: this.$route.query.isSaler, // 如果是销售角色的话进来让其不能看原供应商码单和采购报价单
      saleMadanImgUrls: [],
      detailType: null,
      order: {
        serviceNumber: '',
        customerAccount: {
          availableBalance: null
        },
        address: {},
      },
      product: {},
      shopOriginalImgUrls: [],
      shopOriginalColorUrls: [],
      sellerMadanImgUrls: [],
      buyerCertificateList: [],
      soouyaCertificateList: [],
      sendCertificateList: [],
      inreposity: null,
      outreposity: null,
      imgPath: 'http://www.soouya.com',
      payList: [],
      checkCloth: '3',
      subCheckCloth: '',
      result: [],
      inRepsoityList: {},
      inRepsoityCount: {},
      repsoityList: [],
      tempResult: [],
      hasInRepsoity: null
    }
  },
  filters: {
    formatData(val) {
      return Number(val) != 0 ? formatTimeString(val) : '--'
    },
    formatNumber(val) {
      if (val) {
        val = val.toFixed(2)
        return val;
      } else {
        return '0.00'
      }
    },
    sendTypeFilter(value) {
      switch (value) {
        case 0:
          return '搜芽配送';
        case 1:
          return '采购商自提';
        case 2:
          return '档口直发';
        default:
          return '--';
      }
    },
    formateText(val) {
      if (val == 1) {
        return '采购入仓'
      } else if (val == 2) {
        return '采购换货入仓'
      } else if (val == 3) {
        return '客户发回入仓'
      } else {
        return '售后换货入仓'
      }
    }
  },
  mounted() {
    this.detailType = this.$route.query.detailType
    this.getData()
    this.hasInRepsoity = this.$route.query.hasInRepsoity
    if (this.$route.query.hasInRepsoity) {
      this.getList()
    }
    if (this.$route.query.payType) {
      this.getPay()
    }
  },
  computed: {
    resultSort: function() {
      return _.sortBy(this.result, 'number')
    }
  },
  methods: {
    getData() {
      var url = null;
      var data = {}
      this.$store.dispatch('changeload', true)
      if (this.detailType == 'waitInspect') {
        url = '/redwood/reposity/InReposity/getById'
        data.id = this.$route.query.id
      }
      if (this.detailType == 'waitReceipt' || this.detailType == 'hadReceipt') {
        url = '/redwood/reposity/OutReposity/getById'
        data.id = this.$route.query.id
      }
      if (this.detailType == 'all') { // 接口变动数据结构不一样所有类型的请求单独拉出来
        newRequest({
          url: '/redwood/bulk/' + this.$route.query.reqNumber,
          method: 'get',
        }).then((res) => {
          this.$store.dispatch('changeload', false)
          if (res.success == 1) {
            this.order.orderNumber = res.obj.id // 单独复制没有销售码单的情况跳路由的情况
            this.order.serviceNumber = res.obj.number
            this.order.createTime = res.obj.createTime
            this.order.salesName = res.obj.salerName
            this.order.salesTel = res.obj.salerTel
            this.order.customerCompany = res.obj.customerCompany
            this.order.leaveMessage = res.obj.remark
            this.order.guiderRemark = res.obj.guiderRemark
            this.order.invoiceStatus = res.obj.needInvoice
            this.order.unit = res.obj.colors[0].quantityUnit
            this.order.sendType = res.obj.sendType
            this.order.address.name = res.obj.addressName
            this.order.address.province = res.obj.addressProvince
            this.order.address.city = res.obj.addressCity
            this.order.address.area = res.obj.addressArea
            this.order.address.addr = res.obj.addressAddr
            this.order.address.tel = res.obj.addressTel
            this.saleMadanImgUrls = this.formateImgList(res.obj.madanUrls)
            this.buyerCertificateList = this.formateImgList(res.obj.customerPayCredentialUrls)
            this.sendCertificateList = this.formateImgList(res.obj.sendCredentialUrls)
            this.soouyaCertificateList = this.formateImgList(res.obj.soouyaPayCredentialUrls)
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
            } else {
              this.product = null
            }
          } else {
            this.$message.error(res.msg)
          }
        })
        newRequest({
          url: '/redwood/account/CustomerAccount/getSummary',
          method: 'get',
          data: {
            id: this.$route.query.customerId
          }
        }).then(res => {
          if (res.success == 1) {
            this.order.customerAccount = res.obj
          }
        })
      } else {
        newRequest({
          url: url,
          data: data,
          method: 'get',
        }).then((res) => {
          if (res.success == 1) {
            this.order = res.obj.order;
            this.product = res.obj.product;
            this.price = res.obj.price;
            if (res.obj.inreposity) {
              this.inreposity = res.obj.inreposity;
              this.$set(this.inreposity, 'quantityUnit', this.inreposity.clothLoneList[0].quantityUnit);
              this.$set(this.inreposity, 'buchangUnit', this.inreposity.clothLoneList[0].buchangUnit);
              this.inreposity.totalQuantity = this.culAdd(this.inreposity.clothLoneList, 'quantity')
              this.inreposity.totalBuchang = this.culAdd(this.inreposity.clothLoneList, 'buchang')
              const host = location.host
              let webUrl = ''
              if (host == 'hspc.soouya.com' || host.indexOf('localhongshan') != -1) {
                webUrl = 'http://testmhongshan.soouya.com/'
              } else if (host.indexOf('testhongshan') != -1) {
                webUrl = 'http://testmhongshan.soouya.com/'
              } else {
                webUrl = 'http://mhongshan.soouya.com/'
              }
              this.inreposity.clothLoneList.forEach((item) => {
                let url = null;
                url = `${webUrl}reportDetail.html?clothLoneId=${item.id}`
                this.$set(item, 'checkReportDetailUrl', url);
              })
            }
            if (res.obj.outReposity) {
              this.outreposity = res.obj.outReposity;
              this.$set(this.outreposity, 'quantityUnit', this.outreposity.clothLoneList[0].quantityUnit);
              this.$set(this.outreposity, 'buchangUnit', this.outreposity.clothLoneList[0].buchangUnit);
              this.outreposity.totalQuantity = this.culAdd(this.outreposity.clothLoneList, 'quantity')
              this.outreposity.totalBuchang = this.culAdd(this.outreposity.clothLoneList, 'buchang')
              const host = location.host
              let webUrl = ''
              if (host == 'hspc.soouya.com') {
                webUrl = 'http://testmhongshan.soouya.com/'
              } else if (host.indexOf('test') != -1) {
                webUrl = 'http://testmhongshan.soouya.com/'
              } else {
                webUrl = 'http://mhongshan.soouya.com/'
              }
              this.outreposity.clothLoneList.forEach((item) => {
                let url = null;
                url = `${webUrl}reportDetail.html?clothLoneId=${item.id}`
                this.$set(item, 'checkReportDetailUrl', url);
              })
            }
            if (this.product) {
              this.shopOriginalImgUrls = this.formateImgList(this.product.shopOriginalImgUrls)
              this.shopOriginalColorUrls = this.formateImgList(this.product.shopOriginalColorUrls)
            }
            if (this.price) {
              this.sellerMadanImgUrls = this.formateImgList(this.price.sellerMadanImgUrls)
              this.buyerCertificateList = this.formateImgList(this.price.buyerCertificateList)
              this.soouyaCertificateList = this.formateImgList(this.price.soouyaCertificateList)
              this.sendCertificateList = this.formateImgList(this.price.sendCertificateList)
              this.saleMadanImgUrls = this.formateImgList(this.price.saleMadanImgUrls)
            }
            this.$store.dispatch('changeload', false)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getList() {
      newRequest({
        url: '/redwood/buyfollow/Order/getClothLoneList',
        method: 'post',
        contentType: 'application/json',
        data: {
          orderNumber: this.$route.query.reqNumber
        }
      }).then(data => {
        if (data.success === '1') {
          this.convertData(data)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    convertData(data) {
      let inRepsoityList = []
      let inRepsoityCount = {}
      this.result = data.result.map((item) => {
        const host = location.host
        let webUrl = ''
        if (host == 'hspc.soouya.com') {
          webUrl = 'http://testmhongshan.soouya.com/'
        } else if (host.indexOf('test') != -1) {
          webUrl = 'http://testmhongshan.soouya.com/'
        } else {
          webUrl = 'http://mhongshan.soouya.com/'
        }
        item.checkReportDetailUrl = `${webUrl}reportDetail.html?clothLoneId=${item.id}`
        item.reportDetailUrl = '/redwood/reposity/CheckCloth/exportCheckCloth?param={clothLoneIds:' + JSON.stringify(
          [item.id]) + '}'
        item.checked = false
        if (item.inRepsoity) {
          const inRepsoityNumber = item.inRepsoity.number
          inRepsoityList.push(item)
          if (inRepsoityCount[inRepsoityNumber]) {
            inRepsoityCount[inRepsoityNumber].count++
          } else {
            inRepsoityCount[inRepsoityNumber] = {
              count: 1
            }
          }
        }
        this.tempResult.push(item)
        return item
      })
      this.inRepsoityList = inRepsoityList
      this.inRepsoityCount = inRepsoityCount
    },
    selectPiHao(val) {
      if (val == 0) {
        // 入仓单号
        this.result = this.inRepsoityList.map((item) => item)
        this.repsoityList = this.inRepsoityCount
        this.subCheckCloth = ''
      } else if (val == 3) {
        this.result = this.tempResult.map((item) => item)
      }
    },
    selectSubPiHao(val) {
      if (this.checkCloth == '0' && val) {
        this.result = this.inRepsoityList.filter((item) => {
          return item.inRepsoity.number == val
        })
      }
    },
    getPay() {
      newRequest({
        url: `/redwood/reposity/outReposityPay?id=${this.$route.query.outRepositId}`,
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.payList = res.page.result
        }
      })
    },
    culAdd(arr, type) {
      var val = '';
      if (arr.length > 0) {
        val = arr.reduce(function(prev, current, index, array) {
          return prev + current[type]
        }, 0);
        return val.toFixed(2)
      }
      return '';
    },
    formateImgList(list) {
      let arr = []
      if (Array.isArray(list)) {
        arr = list.map((item) => {
          return this.imgPath + item
        })
      }
      return arr
    }
  }
}

</script>
<style lang="scss">
a {
  text-decoration: none;
}

</style>
