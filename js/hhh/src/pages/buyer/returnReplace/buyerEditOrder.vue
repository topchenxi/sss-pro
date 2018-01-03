<template>
  <section min-width="1300">
    <div class="title-box">
      <span style="font-weight:600;">基本信息</span>
      <el-button type="primary" size="small" style="margin-left:50px;" @click.native="toBack">返回</el-button>
    </div>
    <div class="form-box" style="padding-top:40px">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="订单号">
          <span>{{obj.order.serviceNumber}}</span>
        </el-form-item>
        <el-form-item label="采购商">
          <el-popover placement="bottom-start" title="" trigger="click" width="300">
            <el-form label-position="right" label-width="120px">
              <el-form-item label="采购商ID:" height="25">
                <span>{{obj.order.customerNumber}}</span>
              </el-form-item>
              <el-form-item label="联系手机:">
                <span>{{obj.order.customerMobile}}</span>
              </el-form-item>
              <el-form-item label="联系电话:">
                <span>{{obj.order.customerTel}}</span>
              </el-form-item>
              <el-form-item label="下单总数:">
                <span>{{obj.order.orderTotalCount}}单</span>
              </el-form-item>
              <el-form-item label="下单总金额:">
                <span>￥{{obj.order.totalOrderSaleMoney | formatMoney}}</span>
              </el-form-item>
              <el-form-item label="有效出仓总金额:">
                <span>￥{{obj.order.tatalOutRepositySaleMoney | formatMoney}}</span>
              </el-form-item>
              <!-- <el-form-item label="结算周期:">
                                                                                                                  <span>{{5555}}</span>
                                                                                                                </el-form-item> -->
            </el-form>
            <el-button slot="reference" type="text" style="font-size: 15px;">{{obj.order.customerCompany}}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="供应商">
          <el-popover placement="bottom-start" title="" trigger="click">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="联系电话:">
                <span>{{obj.order.shopTel}}</span>
              </el-form-item>
              <el-form-item label="联系地址:">
                <span>{{obj.order.shopFullAddr}}</span>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="text" style="font-size: 15px;">{{obj.order.shopCompany}}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="订单类型">
          <template v-if="obj.order.type == 1">
            <span>服务单</span>
          </template>
          <template v-if="obj.order.type == 2">
            <span>贸易单</span>
          </template>
        </el-form-item>
        <el-form-item label="下单时间">
          <span>{{obj.order.createTime | formatTime}}</span>
        </el-form-item>
        <template v-if="obj.order.expectedTime">
          <el-form-item label="期望货期">
            <span>{{formatDate(obj.order.expectedTime)}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.leaveMessage">
          <el-form-item label="跟单员备注">
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.leaveMessage}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.sellerMessage">
          <el-form-item label="买货员备注">
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.sellerMessage}}</span>
          </el-form-item>
        </template>
        <el-form-item label="采购明细">
          <table style="border-collapse:collapse; border: 1px solid #969696" border="1" border-spacing="0" class="table-box">
            <tr>
              <th style="width:120px;">货号</th>
              <th style="width:120px" colspan="1">色号</th>
              <th style="width:100px" colspan="1">采购数量</th>
              <th style="width:100px" colspan="1">销售单价</th>
              <th style="width:100px" colspan="1">采购单价</th>
              <th style="width:100px" colspan="1">成本单价</th>
            </tr>
            <tr ref="rightTd">
              <td :rowspan="obj.order.colorList.length + 1" class="rightTd" style="text-align:center">{{obj.order.productNumber}}</td>
              <tr v-for="(item,index) in obj.order.colorList">
                <td style="text-align:center">{{item.color}}</td>
                <td style="text-align:center">{{item.quantity | formatMoney}}{{item.quantityUnit}}</td>
                <td style="text-align:center">{{item.salePrice | formatMoney}}{{item.salePriceUnit}}</td>
                <td style="text-align:center">{{item.buyPrice | formatMoney}}{{item.buyPriceUnit}}</td>
                <td style="text-align:center">{{item.price | formatMoney}}{{item.priceUnit}}</td>
              </tr>
            </tr>
            <tr>
              <td colspan="6" style="text-align: right;padding-right: 8px;">
                <template v-if="obj.order.productSource">
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">销售货款:
                    <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">已付订金:
                    <strong style="color: #f00">￥{{obj.order.earnestMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">已付尾款:
                    <strong style="color: #f00">￥{{obj.order.finalMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购商税款:
                    <strong style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}({{obj.order.taxPoint}}%)</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="padding-right:8px; padding-left:8px;display: inline-block">成本货款:
                    <strong style="color:#f00">￥{{obj.order.costMoney | formatMoney}}</strong>
                  </label>
                </template>
                <template v-else>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">销售货款:
                    <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购货款:
                    <strong style="color: #f00">￥{{obj.order.buyMoney | formatMoney}}</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购商税款:
                    <strong style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}({{obj.order.taxPoint}}%)</strong>
                  </label>
                  <span style="border-right: 1px solid #3b3b3b;"></span>
                  <label style="padding-right:8px;padding-left:8px; display: inline-block">成本货款:
                    <strong style="color:#f00">￥{{obj.order.costMoney | formatMoney}}</strong>
                  </label>
                </template>
                <!--缺图片  -->
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item label="码单及凭据">
          <el-row>
            <el-col style="min-width:130px;" :span="2" :href="item" :key="item" v-lightbox="madanList" v-for="(item, index) in madanList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px 10px 0px 22px' }">
                <img :src="item" style="width:80px; height:80px;cursor:pointer">
                <div style="padding: 0;">
                  <p>码单
                    <span>({{madanList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
            <el-col style="min-width:130px;" :span="2" :href="item" :key="item" v-lightbox="wuliuList" v-for="(item, index) in wuliuList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px 10px 0px 22px' }">
                <img :src="item" style="width:80px; height:80px;cursor:pointer">
                <div style="padding: 0;">
                  <p>物流凭据
                    <span>({{wuliuList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="title-box">
      <span style="font-weight:600;">退换货内容</span>
    </div>
    <div class="form-box">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="退换货申请时间">
          <span>{{obj.createTime | formatTime}}</span>
        </el-form-item>
        <el-form-item label="退换货单号">
          <span>{{obj.number}}</span>
        </el-form-item>
        <template v-if="obj.type < 3">
          <el-form-item label="入仓单号">
            <span>{{obj.inReposityNumber}}</span>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="出仓单号">
            <span>{{obj.outReposityNumber}}</span>
          </el-form-item>
        </template>
        <el-form-item label="退换货类型">
          <template v-if="obj.type == 1">
            <span>售前退货</span>
          </template>
          <template v-if="obj.type == 2">
            <span>售前换货</span>
          </template>
          <template v-if="obj.type == 3">
            <span>售后退货</span>
          </template>
          <template v-if="obj.type == 4">
            <span>售后换货</span>
          </template>
          <template v-if="obj.type == 5">
            <span>仅退款</span>
          </template>
        </el-form-item>
        <template v-if="obj.followerRemark">
          <el-form-item label="跟单员退货备注">
            <span>{{obj.followerRemark}}</span>
          </el-form-item>
        </template>
        <el-form-item label="当前状态">
          <span>{{obj.statusDescr}}</span>
        </el-form-item>
        <template v-if="obj.type == 2 || obj.type == 4">
          <el-form-item label="换货明细" ref="returnReplace">
            <table style="border-collapse:collapse; border: 1px solid #3399FF; width:880px;" border="1" border-spacing="0" class="table-box">
              <tr>
                <th :rowspan="obj.blen" style="background-color:#3399FF; text-align:center;width:120px">
                  <template v-if="obj.type == 1 || obj.type == 3">
                    <span>退前</span>
                  </template>
                  <template v-if="obj.type == 2 || obj.type == 4">
                    <span>换前</span>
                  </template>
                </th>
                <th style="text-align:center; width:120px" colspan="1">色号</th>
                <template v-if="obj.type == 4 || obj.type == 2">
                  <th style="text-align:center; width:120px" colspan="1">*换货实数</th>
                </template>
                <template v-if="obj.type == 3 || obj.type == 1">
                  <th style="text-align:center; width:120px" colspan="1">*退货实数</th>
                </template>
                <!-- <template v-if="obj.type ==  4 || obj.type == 2">
                                                <th style="text-align:center; width:120px">现采购数</th>
                                              </template> -->
                <th style="text-align:center; width:120px" colspan="1">匹号</th>
                <th style="text-align:center; width:120px" colspan="1">入仓实数</th>
                <th style="text-align:center; width:120px" colspan="1">实际布长</th>
                <th style="text-align:center; width:120px" colspan="1">验布结果</th>
                <!--验布报告可能很长很长  -->
              </tr>
              <template v-for="(item1,index1) in obj.beforeList">
                <tr>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.color}}</td>
                  <!-- <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.realQuantity| formatMoney}}{{item1.realQuantityUnit}}</td> -->
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <el-input v-model="item1.inputQuantity" style="width:100px" @change="calQuantity"></el-input>
                  </td>
                  <!-- <template v-if="obj.type == 2 || obj.type == 4">
                                                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.needBuyQuantity| formatMoney}}{{item1.needBuyQuantityUnit}}</td>
                                                </template> -->
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td style="text-align:center;">{{item2.number}}</td>
                    <td style="text-align:center;">{{item2.quantity | formatMoney}}{{item2.quantityUnit}}</td>
                    <td style="text-align:center;">{{item2.buchang | formatMoney}}{{item2.buchangUnit}}</td>
                    <td style="text-align:center;">
                      <template v-if="item2.checkFlaws">
                        <a :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws | formatCheckBu}}</a>
                      </template>
                      <template v-else>{{item2.checkFlaws | formatCheckBu}}</template>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center;">{{item1.totalNumber}}匹</td>
                    <td style="text-align:center;">{{item1.totalQuantity | formatMoney}}{{item1.totalQuantityUnit}}</td>
                    <td style="text-align:center;">{{item1.totalBuchang | formatMoney}}{{item1.totalBuchangUnit}}</td>
                    <td style="text-align:center;"></td>
                  </tr>
                </tr>
              </template>
            </table>
            <template v-if="this.obj.afterList.length">
              <table style="border-collapse:collapse; border: 1px solid #FF9900; width:880px; margin-top:20px;" border="1" border-spacing="0" class="table-box">
                <tr>
                  <th :rowspan="obj.alen" style="background-color:#FF9900; text-align:center;width:120px">
                    <template v-if="obj.type == 1 || obj.type == 3">
                      <span>退后</span>
                    </template>
                    <template v-if="obj.type == 2 || obj.type ==4">
                      <span>换后</span>
                    </template>
                  </th>
                  <th style="text-align:center; width:120px" colspan="1">色号</th>
                  <template v-if="obj.type == 4 || obj.type == 2">
                    <th style="text-align:center; width:120px" colspan="1">换货实数</th>
                  </template>
                  <template v-if="obj.type == 3 || obj.type == 1">
                    <th style="text-align:center; width:120px" colspan="1">退货实数</th>
                  </template>
                  <!-- <template v-if="obj.type ==  4 || obj.type == 2">
                                                  <th style="text-align:center; width:120px">现采购数</th>
                                                </template> -->
                  <th style="text-align:center; width:120px" colspan="1">匹号</th>
                  <th style="text-align:center; width:120px" colspan="1">入仓实数</th>
                  <th style="text-align:center; width:120px" colspan="1">实际布长</th>
                  <th style="text-align:center; width:120px" colspan="1">验布结果</th>
                  <!--验布报告可能很长很长  -->
                </tr>
                <template v-for="(item1,index1) in obj.afterList">
                  <tr>
                    <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.color}}</td>
                    <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.realQuantity| formatMoney}}{{item1.realQuantityUnit}}</td>
                    <!-- <template v-if="obj.type == 2 || obj.type == 4">
                                                    <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.needBuyQuantity| formatMoney}}{{item1.needBuyQuantityUnit}}</td>
                                                  </template> -->
                    <tr v-for="(item2, index2) in item1.clothLoneList">
                      <td style="text-align:center;">{{item2.number}}</td>
                      <td style="text-align:center;">{{item2.quantity | formatMoney}}{{item2.quantityUnit}}</td>
                      <td style="text-align:center;">{{item2.buchang | formatMoney}}{{item2.buchangUnit}}</td>
                      <td style="text-align:center;">
                        <template v-if="item2.checkFlaws">
                          <a :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws | formatCheckBu}}</a>
                        </template>
                        <template v-else>{{item2.checkFlaws | formatCheckBu}}</template>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align:center;">{{item1.totalNumber}}匹</td>
                      <td style="text-align:center;">{{item1.totalQuantity | formatMoney}}{{item1.totalQuantityUnit}}</td>
                      <td style="text-align:center;">{{item1.totalBuchang | formatMoney}}{{item1.totalBuchangUnit}}</td>
                      <td style="text-align:center;"></td>
                    </tr>
                  </tr>
                </template>
              </table>
            </template>
          </el-form-item>
        </template>
        <template v-if="obj.type == 1 || obj.type == 3">
          <el-form-item label="退货明细" ref="returnReplace">
            <table style="border-collapse:collapse; border: 1px solid #3399FF; width:880px;" border="1" border-spacing="0" class="table-box">
              <tr>
                <th :rowspan="obj.blen" style="background-color:#3399FF; text-align:center;width:120px">
                  <template v-if="obj.type == 1 || obj.type == 3">
                    <span>退前</span>
                  </template>
                  <template v-if="obj.type == 2 || obj.type == 4">
                    <span>换前</span>
                  </template>
                </th>
                <th style="text-align:center; width:120px" colspan="1">色号</th>
                <template v-if="obj.type == 4 || obj.type == 2">
                  <th style="text-align:center; width:120px" colspan="1">换货实数</th>
                </template>
                <template v-if="obj.type == 3 || obj.type == 1">
                  <th style="text-align:center; width:120px" colspan="1">*退货实数</th>
                </template>
                <!-- <template v-if="obj.type ==  4 || obj.type == 2">
                                                <th style="text-align:center; width:120px">现采购数</th>
                                              </template> -->
                <th style="text-align:center; width:120px" colspan="1">匹号</th>
                <th style="text-align:center; width:120px" colspan="1">入仓实数</th>
                <th style="text-align:center; width:120px" colspan="1">实际布长</th>
                <th style="text-align:center; width:120px" colspan="1">验布结果</th>
                <!--验布报告可能很长很长  -->
              </tr>
              <template v-for="(item1,index1) in obj.beforeList">
                <tr>
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.color}}</td>
                  <!-- <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.realQuantity| formatMoney}}{{item1.realQuantityUnit}}</td> -->
                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">
                    <el-input v-model="item1.inputQuantity" style="width:100px" @change="calQuantity()"></el-input>
                  </td>
                  <!-- <template v-if="obj.type == 2 || obj.type == 4">
                                                  <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.needBuyQuantity| formatMoney}}{{item1.needBuyQuantityUnit}}</td>
                                                </template> -->
                  <tr v-for="(item2, index2) in item1.clothLoneList">
                    <td style="text-align:center;">{{item2.number}}</td>
                    <td style="text-align:center;">{{item2.quantity | formatMoney}}{{item2.quantityUnit}}</td>
                    <td style="text-align:center;">{{item2.buchang | formatMoney}}{{item2.buchangUnit}}</td>
                    <td style="text-align:center;">
                      <template v-if="item2.checkFlaws">
                        <a :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws | formatCheckBu}}</a>
                      </template>
                      <template v-else>{{item2.checkFlaws | formatCheckBu}}</template>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center;">{{item1.totalNumber}}匹</td>
                    <td style="text-align:center;">{{item1.totalQuantity | formatMoney}}{{item1.totalQuantityUnit}}</td>
                    <td style="text-align:center;">{{item1.totalBuchang | formatMoney}}{{item1.totalBuchangUnit}}</td>
                    <td style="text-align:center;"></td>
                  </tr>
                </tr>
              </template>
            </table>
            <template v-if="this.obj.afterList.length">
              <table style="border-collapse:collapse; border: 1px solid #FF9900; width:880px; margin-top:20px;" border="1" border-spacing="0" class="table-box">
                <tr>
                  <th :rowspan="obj.alen" style="background-color:#FF9900; text-align:center;width:120px">
                    <template v-if="obj.type == 1 || obj.type == 3">
                      <span>退后</span>
                    </template>
                    <template v-if="obj.type == 2 || obj.type ==4">
                      <span>换后</span>
                    </template>
                  </th>
                  <th style="text-align:center; width:120px" colspan="1">色号</th>
                  <template v-if="obj.type == 4 || obj.type == 2">
                    <th style="text-align:center; width:120px" colspan="1">换货实数</th>
                  </template>
                  <template v-if="obj.type == 3 || obj.type == 1">
                    <th style="text-align:center; width:120px" colspan="1">退货实数</th>
                  </template>
                  <!-- <template v-if="obj.type ==  4 || obj.type == 2">
                                                  <th style="text-align:center; width:120px">现采购数</th>
                                                </template> -->
                  <th style="text-align:center; width:120px" colspan="1">匹号</th>
                  <th style="text-align:center; width:120px" colspan="1">入仓实数</th>
                  <th style="text-align:center; width:120px" colspan="1">实际布长</th>
                  <th style="text-align:center; width:120px" colspan="1">验布结果</th>
                  <!--验布报告可能很长很长  -->
                </tr>
                <template v-for="(item1,index1) in obj.afterList">
                  <tr>
                    <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.color}}</td>
                    <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.realQuantity| formatMoney}}{{item1.realQuantityUnit}}</td>
                    <!-- <template v-if="obj.type == 2 || obj.type == 4">
                                                    <td style="text-align:center;" :rowspan="item1.clothLoneList.length + 2">{{item1.needBuyQuantity| formatMoney}}{{item1.needBuyQuantityUnit}}</td>
                                                  </template> -->
                    <tr v-for="(item2, index2) in item1.clothLoneList">
                      <td style="text-align:center;">{{item2.number}}</td>
                      <td style="text-align:center;">{{item2.quantity | formatMoney}}{{item2.quantityUnit}}</td>
                      <td style="text-align:center;">{{item2.buchang | formatMoney}}{{item2.buchangUnit}}</td>
                      <td style="text-align:center;">
                        <template v-if="item2.checkFlaws">
                          <a :href="webUrl + 'reportDetail.html?clothLoneId=' + item2.id" target="_blank">{{item2.checkFlaws | formatCheckBu}}</a>
                        </template>
                        <template v-else>{{item2.checkFlaws | formatCheckBu}}</template>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align:center;">{{item1.totalNumber}}匹</td>
                      <td style="text-align:center;">{{item1.totalQuantity | formatMoney}}{{item1.totalQuantityUnit}}</td>
                      <td style="text-align:center;">{{item1.totalBuchang | formatMoney}}{{item1.totalBuchangUnit}}</td>
                      <td style="text-align:center;"></td>
                    </tr>
                  </tr>
                </template>
              </table>
            </template>
          </el-form-item>
        </template>
        <el-form-item label="买货员审核时间" style="margin-top: 6px;">
          <span>{{obj.purcahserReviewTime | formatTime}}</span>
        </el-form-item>
        <!-- <template v-if="obj.type > 2">
                                          <el-form-item label="已出仓销售货款">
                                            <span>{{obj.needSaleMoney | formatMoney}}元</span>
                                          </el-form-item>
                                        </template> -->
        <template v-if="obj.type == 1 || obj.type == 3">
          <el-form-item label="*退货原数">
            <span>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.type == 2 || obj.type == 4">
          <el-form-item label="换货原数">
            <span>{{obj.quantity | formatMoney}}{{obj.quantityUnit}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.type == 1 || obj.type == 3">
          <el-form-item label="退货实数">
            <span>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.type == 2 || obj.type == 4">
          <el-form-item label="换货实数">
            <span>{{obj.realQuantity | formatMoney}}{{obj.realQuantityUnit}}</span>
          </el-form-item>
        </template>
        <!-- <template v-if="obj.purchaserRemark"> -->
        <el-form-item label="买货员换货备注">
          <!-- <span>{{obj.purchaserRemark}}</span> -->
          <el-input type="textarea" style="width:250px; margin-top:12px;" @change="calWordCount" v-model="requestParams.purchaserRemark"></el-input>
          </br>
          <span style="color:#f00;margin-left:220px">{{wordCount}}/500</span>
        </el-form-item>
        <el-form-item>
          <div style="margin-top:25px;">
            <el-button :disabled="confirmBtn" type="primary" size="small" @click.native="confirmSubmit">确定</el-button>
            <el-button size="small" @click.native="toBack">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <lightbox></lightbox>
    <div style="height:250px;"></div>
  </section>
</template>

<script>
import { newRequest } from 'utils/tool'
import Lightbox from 'components/lightbox/lightbox'
// import config from '../data.json' // 模拟数据
export default {
  components: {
    Lightbox,
  },
  data() {
    return {
      webUrl: '',
      imgPath: 'http://www.soouya.com',
      wuliuList: [],
      madanList: [],
      wordCount: 0,
      confirmBtn: false,
      requestParams: {
        purchaserRemark: '',
        id: '',
        realQuantityList: [],
      },
      obj: {
        blen: 0,
        alen: 0,
        order: {
          colorList: []
        },
        beforeList: [
          {
            totalNumber: 0,
            totalQuantity: 0,
            totalQuantityUnit: '',
            totalBuchang: 0,
            totalBuchangUnit: '',
            iputQuantity: 0,
            clothLoneList: [],
          }
        ],
        afterList: [
          {
            totalNumber: 0,
            totalQuantity: 0,
            totalQuantityUnit: '',
            totalBuchang: 0,
            totalBuchangUnit: '',
            clothLoneList: [],
          }
        ],
      },
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false)
    this.requestParams.id = this.$route.query.id
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
      // let res = config.detail
      // this.obj = res.obj
      newRequest({
        url: '/redwood/returnreplace/getById',
        data: this.requestParams,
        method: 'get',
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.obj = res.obj
          console.log(this.obj)
          this.obj.blen = 1
          for (let i = 0; i < this.obj.beforeList.length; i++) {
            // console.log(this.obj.beforeList[i].clothLoneList.length)
            this.obj.blen += this.obj.beforeList[i].clothLoneList.length
            this.obj.blen += 2
          }
          this.obj.alen = 1
          for (let i = 0; i < this.obj.afterList.length; i++) {
            console.log(this.obj.afterList[i].clothLoneList.length)
            this.obj.alen += this.obj.afterList[i].clothLoneList.length
            this.obj.alen += 2
          }
          for (let i = 0; i < this.obj.beforeList.length; i++) {
            this.obj.beforeList[i].totalNumber = this.obj.beforeList[i].clothLoneList.length
            this.obj.beforeList[i].totalBuchang = 0
            this.obj.beforeList[i].totalQuantity = 0
            this.obj.beforeList[i].totalBuchangUnit = this.obj.beforeList[i].clothLoneList[0].buchangUnit
            this.obj.beforeList[i].totalQuantityUnit = this.obj.beforeList[i].clothLoneList[0].quantityUnit
            this.obj.beforeList[i].inputQuantity = this.obj.beforeList[i].realQuantity
            for (let j = 0; j < this.obj.beforeList[i].clothLoneList.length; j++) {
              this.obj.beforeList[i].totalBuchang += this.obj.beforeList[i].clothLoneList[j].buchang
              this.obj.beforeList[i].totalQuantity += this.obj.beforeList[i].clothLoneList[j].quantity
              console.log('55')
            }
            console.log(this.obj.beforeList[i])
          }
          this.calQuantity()
          if (this.obj.afterList) {
            for (let i = 0; i < this.obj.afterList.length; i++) {
              this.obj.afterList[i].totalNumber = this.obj.afterList[i].clothLoneList.length
              this.obj.afterList[i].totalBuchang = 0
              this.obj.afterList[i].totalQuantity = 0
              this.obj.afterList[i].totalBuchangUnit = this.obj.afterList[i].clothLoneList[0].buchangUnit
              this.obj.afterList[i].totalQuantityUnit = this.obj.afterList[i].clothLoneList[0].quantityUnit
              for (let j = 0; j < this.obj.afterList[i].clothLoneList.length; j++) {
                this.obj.afterList[i].totalBuchang += this.obj.afterList[i].clothLoneList[j].buchang
                this.obj.afterList[i].totalQuantity += this.obj.afterList[i].clothLoneList[j].quantity
                console.log('55')
              }
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
      // if (this.obj.type == 1 || this.obj.type == 3) {
      //   this.$refs.returnReplace.label = '退货明细'
      // }
    },
    confirmSubmit() {
      for (let i = 0; i < this.obj.beforeList.length; i++) {
        let list = {
          color: '',
          quantity: 0
        }
        if (this.obj.beforeList[i].inputQuantity) {
          list.color = this.obj.beforeList[i].color
          list.quantity = this.obj.beforeList[i].inputQuantity
          this.requestParams.realQuantityList.push(list)
        }
      }
      newRequest({
        url: '/redwood/replace/editForPurchaser',
        methods: 'post',
        contentType: 'application/json',
        data: this.requestParams
      }).then((res) => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.toBack()
        } else {
          this.$message.error(res.msg)
        }
      })
      console.log(this.requestParams)
    },
    calQuantity() {
      console.log('s')
      let num = 0
      for (let i = 0; i < this.obj.beforeList.length; i++) {
        if (this.obj.beforeList[i].inputQuantity) {
          if (this.obj.afterList.length) {
            this.obj.afterList[i].realQuantity = this.obj.beforeList[i].inputQuantity
          }
          num += parseFloat(this.obj.beforeList[i].inputQuantity)
        } else {
          this.obj.beforeList[i].realQuantity = 0
        }
      }
      this.obj.realQuantity = num
    },
    calWordCount() {
      this.wordCount = this.requestParams.purchaserRemark.length
      if (this.wordCount > 500) {
        this.$message('备注长度不得超过500')
        this.confirmBtn = true
      } else {
        this.confirmBtn = false
      }
    },
    toBack() {
      window.history.go(-1)
    },
    formatDate(val) {
      let date = new Date(val)
      // console.log(date)
      if (val) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
      } else {
        return '--'
      }
      return y + '-' + m + '-' + d
    },
    formateImgList(list) {
      let arr = []
      list.map((item) => {
        arr = arr.concat(item.imgList)
      })
      arr = arr.map((item) => {
        return this.imgPath + item
      })
      return arr
    },
  }
}
</script>

<style scoped>
.title-box {
  padding-bottom: 8px;
  border-bottom: 1px dashed #3b3b3b;
  width: 100%;
}

.form-box {
  padding-left: 20px;
}

.form-box .el-form-item {
  margin: 0px;
  padding: 0px;
  padding-left: 20px;
}

.el-popover {
  margin: 0px;
  padding-right: 50px;
}

.el-popover .el-form-item {
  margin: 0px;
  padding: 0px;
}

.table-box {
  margin-top: 12px;
  width: 740px;
}
</style>
