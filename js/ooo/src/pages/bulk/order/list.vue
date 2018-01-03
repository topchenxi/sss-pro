<template>
  <section class="sy-page-wrap" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中">
    <Menu></Menu>
    <el-form :inline="true" ref="bulkOrderSearch" :model="filters">
      <el-form-item>
        <el-input placeholder="订单号、采购商名称、供应商名称" size="small" v-model="filters.key" class="sy-bulk-search">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click.native="getBulkOrderList" class="btn-search">搜索</el-button>
        <el-button type="primariy" size="small" @click.native="resetForm('bulkOrderSearch')" class="btn-search">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="sy-table-wrap" ref="tableWrap">
      <template v-if="orderList && filters._function == 'send'">
        <div v-for="(item,index) in orderList" style="padding-left: 15px;padding-bottom: 10px;" :key="index">
          <el-row style="min-height: 28px;">
            <a @click="getClothLoneList(item)" class="order-a">
              大货单&nbsp;&nbsp;|&nbsp;&nbsp;订单号：{{item.number}}&nbsp;&nbsp;|&nbsp;&nbsp;采购商：{{item.customerCompany}}&nbsp;&nbsp;|&nbsp;&nbsp;供应商：{{item.showShopCompany}}&nbsp;&nbsp;|&nbsp;&nbsp; 订单总金额：￥{{item.saleMoney == undefined?0:item.saleMoney}}&nbsp;&nbsp;|&nbsp;&nbsp;订单发布时间：{{item.createTime | formatTime}}&nbsp;&nbsp;|&nbsp;&nbsp;跟单员：{{item.followerName}}&nbsp;&nbsp;|&nbsp;&nbsp;买货员：{{item.buyerName}}&nbsp;&nbsp;|&nbsp;&nbsp;销售员：{{item.salerName}}&nbsp;&nbsp;|&nbsp;&nbsp;采购员：{{item.guiderName}}
            </a>
          </el-row>
          <el-table v-if="item.clothLones != null" :data="item.clothLones" style="width: 600px;">
            <el-table-column :show-overflow-tooltip="true" prop="number" label="出仓单号" align="left" min-width="140"></el-table-column>
            <!-- <el-table-column :show-overflow-tooltip="true" align="left" min-width="150" label="入仓时间">
                  <template scope="scope">{{scope.row.createTime | formatTime}}</template>
                </el-table-column> -->
            <el-table-column :show-overflow-tooltip="true" prop="num" label="待发货数量" align="left" min-width="150"></el-table-column>
          </el-table>
        </div>
      </template>
      <template v-if="orderList && filters._function == 'returnReplace'">
        <div v-for="(item,index) in orderList" style="padding-left: 15px;padding-bottom: 10px;" :key="index">
          <el-row style="min-height: 28px;">
            <a @click="getClothLoneList(item)" class="order-a">
              订单号：{{item.number}}&nbsp;&nbsp;|&nbsp;&nbsp;订单总金额：￥{{item.saleMoney == undefined?0:item.saleMoney}}&nbsp;&nbsp;|&nbsp;&nbsp; 采购数量：{{item.quantity}}{{item.quantityUnit}}&nbsp;&nbsp;|&nbsp;&nbsp; 采购商：{{item.customerCompany}}&nbsp;&nbsp;|&nbsp;&nbsp;供应商：{{item.showShopCompany}}&nbsp;&nbsp;|&nbsp;&nbsp; 跟单员：{{item.followerName}}&nbsp;&nbsp;|&nbsp;&nbsp;买货员：{{item.buyerName}}&nbsp;&nbsp;|&nbsp;&nbsp;销售员：{{item.salerName}}&nbsp;&nbsp;|&nbsp;&nbsp;采购员：{{item.guiderName}}
            </a>
          </el-row>
          <template v-if="item.clothLones != null">
            <div style="width: 100%;padding: 10px;border:1px solid #8492A6;" v-for="(cl,index) in item.clothLones" :key="index">
              <el-row>当前状态：{{cl.statusDesc}}</el-row>
              <el-row style="color:#8492A6;">&nbsp;&nbsp;{{cl.num}}</el-row>
            </div>
          </template>
        </div>
      </template>
      <el-table v-if="orderList && filters._function != 'send' && filters._function != 'returnReplace'&& filters._function != 'toPay'&& filters._function != 'toSubmitPay'&& filters._function != 'debt0' && filters._function != 'debt1'" style="width: 100%" :height="height" border :resizable="false" :data="orderList" @selection-change="handleTableSelectionChange">
        <el-table-column :show-overflow-tooltip="true" prop="number" label="入仓单号" align="left" min-width="130" v-if="filters._function=='check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="160" label="入仓时间" v-if="filters._function=='check'">
          <template scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" label="大货类型" min-width="80" v-if="filters._function!='check'">
          <template scope="scope">
            {{scope.row.type === 1?'服务单':scope.row.type === 2?'贸易单':'采购单'}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" aligh="left" label="大货类型" min-width="80" v-if="filters._function=='check'">
          <template scope="scope">
            {{scope.row.bulk.type === 1?'服务单':scope.row.bulk.type === 2?'贸易单':'采购单'}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="number" label="订单号" align="left" min-width="220" v-if="filters._function!='check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="bulk.number" label="订单号" align="left" min-width="220" v-if="filters._function=='check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="reposityName" label="验货地点" align="left" min-width="100" v-if="filters._function=='check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="160" label="发布时间" v-if="filters._function=='order' || filters._function=='pay' || filters._function=='lading' || filters._function=='all'">
          <template scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <!-- 订单总金额取值销售货款 -->
        <el-table-column :show-overflow-tooltip="true" align="right" label="订单总金额" min-width="100" v-if="filters._function == 'order' || filters._function == 'pay' || filters._function == 'lading' || filters._function == 'refund' || filters._function == 'all'">
          <template scope="scope">￥{{scope.row.saleMoney==undefined?0:scope.row.saleMoney}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="150" label="申请退款时间" v-if="filters._function=='refund'">
          <template scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="160" label="申请退款时间" v-if="filters._function=='returnReplace'">
          <template scope="scope">{{scope.row.refundTime | formatTime}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="" align="left" label="采购商名称" min-width="240" v-if="filters._function!='check'">
          <template scope="scope">
            <span class="icon-baitiao" v-if="scope.row.customerHasOpenedBaitiao == 1"></span>
            <span class="icon-feibaitiao" v-if="scope.row.customerHasOpenedBaitiao == 0"></span>
            <span class="icon-yanzhen" v-if="scope.row.customerHasOpenedYanzhen == 1"></span>
            <span class="icon-feiyanzhen" v-if="scope.row.customerHasOpenedYanzhen == 0"></span>
            {{scope.row.customerCompany}}
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="" align="left" label="采购商名称" min-width="240" v-if="filters._function=='check'">
          <template scope="scope">
            <span class="icon-baitiao" v-if="scope.row.bulk.customerHasOpenedBaitiao == 1"></span>
            <span class="icon-feibaitiao" v-if="scope.row.bulk.customerHasOpenedBaitiao == 0"></span>
            <span class="icon-yanzhen" v-if="scope.row.bulk.customerHasOpenedYanzhen == 1"></span>
            <span class="icon-feiyanzhen" v-if="scope.row.bulk.customerHasOpenedYanzhen == 0"></span>
            {{scope.row.bulk.customerCompany}}
          </template>
        </el-table-column>
        <!--更换字段 -->
        <el-table-column :show-overflow-tooltip="true" prop="showShopCompany" align="left" min-width="150" label="供应商名称" v-if="filters._function!='check'">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="150" label="供应商名称" v-if="filters._function=='check'">
          <template scope="scope">
            {{scope.row.bulk.showShopCompany}}
          </template>
        </el-table-column>
        <!-- 待定 -->
        <el-table-column :show-overflow-tooltip="true" align="center" min-width="80" label="品类" v-if="filters._function == 'order' || filters._function == 'pay' || filters._function == 'lading' || filters._function == 'check' || filters._function == 'refund'">
          <template scope="scope">{{scope.row.category == 1 ? '面料' : '辅料'}}</template>
        </el-table-column>
        <!-- 验货取值是否需要验货 -->
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="80" label="验货" v-if="filters._function == 'order' || filters._function == 'pay' || filters._function == 'lading' || filters._function == 'all'">
          <template scope="scope">{{scope.row.checkCloth == 0 ? '不验货' : '验货'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="60" label="货源" v-if="filters._function == 'pay' || filters._function == 'refund'">
          <template scope="scope">{{scope.row.productSource == 0 ? '现货' : '订货'}}</template>
        </el-table-column>
        <!-- 配送方式增加档口直发方式 -->
        <el-table-column :show-overflow-tooltip="true" align="left" min-width="100" label="配送方式" v-if="filters._function == 'order' || filters._function == 'lading'">
          <template scope="scope">{{scope.row.sendType == 0 ? '搜芽配送' : scope.row.sendType == 1 ? '采购商自提' : '档口直发'}}</template>
        </el-table-column>
        <!-- 采购数量更换字段 -->
        <el-table-column :show-overflow-tooltip="true" align="right" label="采购数量" min-width="130" v-if="filters._function != 'check'">
          <template scope="scope">{{scope.row.quantity}}{{scope.row.quantityUnit}}/{{scope.row.colorNumber}}色</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="right" label="采购数量" min-width="130" v-if="filters._function == 'check'">
          <template scope="scope">{{scope.row.bulk.quantity}}{{scope.row.bulk.quantityUnit}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="right" label="供应商退款金额" min-width="140" v-if="filters._function == 'refund'">
          <template scope="scope">￥{{scope.row.refundMoney==undefined?0:scope.row.refundMoney}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="当前状态" min-width="150" prop="statusDesc" v-if="filters._function == 'order' || filters._function == 'pay' || filters._function == 'lading' || filters._function == 'all'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="right" label="待验货数量" min-width="110" prop="num" v-if="filters._function == 'check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="跟单员" min-width="120" v-if="filters._function != 'check'">
          <template scope="scope">{{scope.row.type
            < 3 ? scope.row.followerName : '--'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="跟单员" min-width="120" v-if="filters._function == 'check'">
          <template scope="scope">{{scope.row.bulk.type
            < 3 ? scope.row.bulk.followerName : '--'}}</template>
        </el-table-column>
        <!-- 买货员更换字段 -->
        <el-table-column :show-overflow-tooltip="true" align="left" label="买货员" min-width="120" prop="purchaserName" v-if="filters._function != 'check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="买货员" min-width="120" prop="bulk.purchaserName" v-if="filters._function == 'check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="销售员" min-width="120" prop="salerName" v-if="filters._function != 'check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="销售员" min-width="120" prop="bulk.salerName" v-if="filters._function == 'check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="采购员" min-width="120" prop="guiderName" v-if="filters._function != 'check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="采购员" min-width="120" prop="bulk.guiderName" v-if="filters._function == 'check'"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="left" label="操作" min-width="150" fixed="right">
          <template scope="scope">
            <div class="operate-btn">
              <el-button v-if="scope.row.type < 3" class="o-btn" size="mini" type="primary" @click="showDetail(scope.row.id)">详情</el-button>
              <router-link :to="{name: 'bulkOrderDetail', query: { detailType: 'all', customerId: scope.row.customerId, orderNumber: scope.row.id}}" v-if="scope.row.type === 3 && filters._function !== 'check'">
                <el-button class="o-btn" size="mini" type="primary">
                  详情
                </el-button>
              </router-link>
              <el-tooltip class="item" effect="dark" :content="scope.row.refundRemark" placement="top-end">
                <el-button class="o-btn" size="mini" type="primary" v-if="filters._function == 'refund'">查看原因</el-button>
              </el-tooltip>
              <el-button v-if="(scope.row.status == 305 || scope.row.status == 304) &&  (!woodFinance || woodAdmin)" class="o-btn" size="mini" type="primary" @click="showAssignAskPriceDialog(scope.row)">指派询价</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="filters._function == 'toSubmitPay'" :data="orderList" :resizable="false" :height="height" header-align="left" border>
        <el-table-column label="订单号" prop="number" align="left" width="200">
        </el-table-column>
        <el-table-column label="采购商" min-width="240;" align="left">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.customerCompany" placement="top">
              <p class="ellipsis">
                <span class="icon-baitiao mr5" v-if="scope.row.customerHasOpenedBaitiao==1"></span>
                <span class="icon-feibaitiao mr5" v-if="scope.row.customerHasOpenedBaitiao==0"></span>
                <span class="icon-yanzhen mr5" v-if="scope.row.customerHasOpenedYanzhen==1"></span>
                <span class="icon-feiyanzhen mr5" v-if="scope.row.customerHasOpenedYanzhen==0"></span>
                {{scope.row.customerCompany}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="供应商" prop="showShopCompany" min-width="160px;" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="销售员" min-width="120" prop="salerName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="采购员" min-width="120" prop="guiderName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="当前状态" prop="statusDesc" align="left" min-width="160px" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="是否验货" align="left" min-width="100px">
          <template scope="scope">
            {{scope.row.checkCloth == '1' ? '验货' : '不验货'}}
          </template>
        </el-table-column>
        <el-table-column label="配送方式" align="left" min-width="120px;">
          <template scope="scope">
            <span v-if="scope.row.sendType == 0">搜芽配送</span>
            <span v-if="scope.row.sendType == 1">采购商自提</span>
            <span v-if="scope.row.sendType == 2">档口直发</span>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" min-width="130px" prop="" show-overflow-tooltip>
          <template scope="scope">{{scope.row.quantity + scope.row.quantityUnit}}/{{scope.row.colorNumber || 0}}色</template>
        </el-table-column>
        <el-table-column label="订单发布时间" align="left" width="180">
          <template scope="scope">
            <div>{{scope.row.createTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="订单总金额" align="center" min-width="120px">
          <template scope="scope">
            <span v-if="scope.row.saleMoney > 0">&yen; {{scope.row.saleMoney}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="提货方式" align="left" min-width="120px">
          <template scope="scope">
            <span v-if="scope.row.sendInneed == 0">提货员提货</span>
            <span v-if="scope.row.sendInneed == 1">供应商送货</span>
            <span v-if="scope.row.sendInneed == 2">档口直发</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="80">
          <template scope="scope">
            <router-link :to="{name: 'bulkOrderDetail', query: { detailType: 'all', customerId: scope.row.customerId, orderNumber: scope.row.id}}">
              <el-button size="mini" type="primary" class="table-btn">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="['toPay', 'debt0', 'debt1'].indexOf(filters._function) > -1" :data="orderList" :resizable="false" :height="height" header-align="left" border>
        <el-table-column label="出仓单号" prop="number" align="left" width="140">
        </el-table-column>
        <el-table-column label="订单号" prop="bulk.number" align="left" width="220">
        </el-table-column>
        <el-table-column label="订单日期" align="left" width="180">
          <template scope="scope">
            <div>{{scope.row.createTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="采购商" min-width="240;" align="left">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.bulk.customerCompany" placement="top">
              <p class="ellipsis">
                <span class="icon-baitiao mr5" v-if="scope.row.bulk.customerHasOpenedBaitiao==1"></span>
                <span class="icon-feibaitiao mr5" v-if="scope.row.bulk.customerHasOpenedBaitiao==0"></span>
                <span class="icon-yanzhen mr5" v-if="scope.row.bulk.customerHasOpenedYanzhen==1"></span>
                <span class="icon-feiyanzhen mr5" v-if="scope.row.bulk.customerHasOpenedYanzhen==0"></span>
                {{scope.row.bulk.customerCompany}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="供应商" prop="bulk.showShopCompany" min-width="160px;" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="货号" min-width="120" prop="bulk.productNumber" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="色号匹号数量" min-width="130" prop="num" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="总入仓实数" min-width="120" prop="" show-overflow-tooltip>
          <template scope="scope">
            {{scope.row.quantity}}{{scope.row.quantityUnit}}
          </template>
        </el-table-column>
        <el-table-column label="支付时间" align="left" width="180">
          <template scope="scope">
            <div>{{scope.row.payTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" align="center" width="120">
          <template scope="scope">
            <span v-if="scope.row.creditType == 3">余额支付</span>
            <span v-if="scope.row.creditType == 1">垫付支付</span>
            <span v-if="scope.row.creditType == 2">白条支付</span>
            <span v-if="scope.row.creditType == 4">雁阵支付</span>
          </template>
        </el-table-column>
        <el-table-column label="付款人" align="center" width="120">
          <template scope="scope">
            <!-- <span v-if="scope.row.payer < 0">--</span> -->
            <span v-if="scope.row.payer == 0">客户支付</span>
            <span v-if="scope.row.payer == 1">采购支付</span>
          </template>
        </el-table-column>
        <el-table-column label="对账时间" align="left" width="180" v-if="filters._function == 'debt1'">
          <template scope="scope">
            <div>{{scope.row.reconciliationTime | formatTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" align="center" width="120" v-if="filters._function == 'toPay'">
          <template scope="scope">
            <span v-if="scope.row.customerPayStatus == 0">未支付</span>
            <span v-if="scope.row.customerPayStatus == 1">已支付</span>
            <span v-if="scope.row.customerPayStatus == 2" style="color: red">白条申请失败</span>
          </template>
        </el-table-column>
        <el-table-column label="对账状态" align="center" width="120" v-if="filters._function != 'toPay'">
          <template scope="scope">
            <span v-if="scope.row.reconciliationStatus == 0">待对账</span>
            <span v-if="scope.row.reconciliationStatus == 1">已对账</span>
          </template>
        </el-table-column>
        <el-table-column label="是否已发货" align="center" width="120">
          <template scope="scope">
            <span v-if="scope.row.status == 0">待发货</span>
            <span v-if="scope.row.status >= 1">已发货</span>
          </template>
        </el-table-column>
        <el-table-column label="销售员" min-width="120" prop="bulk.salerName" align="center">
        </el-table-column>
        <el-table-column label="采购员" min-width="120" prop="bulk.guiderName" align="center">
        </el-table-column>
        <el-table-column label="支付金额" min-width="120" v-if="filters._function == 'toPay'">
          <template scope="scope">
            <span v-if="scope.row.bulk.saleMoney">{{scope.row.bulk.saleMoney}}元</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="对账金额" min-width="120" v-if="filters._function != 'toPay'">
          <template scope="scope">
            <span v-if="scope.row.totalMoney">{{scope.row.totalMoney}}元</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="80">
          <template scope="scope">
            <router-link :to="{name: 'bulkOrderDetail', query: { detailType: 'all', customerId: scope.row.bulk.customerId, orderNumber: scope.row.bulk.id}}">
              <el-button size="mini" type="primary" class="table-btn">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sy-pagination-wrap" ref="paginationWrap">
      <el-pagination @size-change="handleChangePagesize" @current-change="handleCurrentPageChange" :current-page="pagation.pageNumber" :page-sizes="[20]" :page-size="pagation.pageSize" layout="total,sizes, prev, pager, next, jumper" :total="pagation.totalCount">
      </el-pagination>
    </div>
    <el-dialog title="指派询价" v-model="assignAskPriceDialog.isShow" :modal="false" size="tiny">
      <div class="sy-update-buyer-wrap" style="padding:20px;">
        <div v-if="assignAskPriceDialog.waitUpdateData" style="width:100%;padding-left:40px;">
          <el-row>
            <el-col :span="5">订单号</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.number}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">采购商</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.customerCompany}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">供应商</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.showShopCompany}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">采购数量</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.quantity}}{{assignAskPriceDialog.waitUpdateData.quantityUnit}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">订单总金额</el-col>
            <el-col :span="10" style="color:red;">￥{{assignAskPriceDialog.waitUpdateData.saleMoney == undefined?0:assignAskPriceDialog.waitUpdateData.saleMoney}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">当前状态</el-col>
            <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.statusDesc}}</el-col>
          </el-row>
          <el-row v-if="assignAskPriceDialog.waitUpdateData.status == 305">
            <el-col :span="5">
              <font color="red">*</font>选择买货员</el-col>
            <el-select size="small" v-model="assignAskPriceDialog.currentId" placeholder="请选择">
              <el-option v-for="item in allBuyer" :label="item.realName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-row>
          <el-row v-if="assignAskPriceDialog.waitUpdateData.status == 304">
            <el-col :span="5">
              <font color="red">*</font>选择采购员</el-col>
            <el-select size="small" v-model="assignAskPriceDialog.currentId" placeholder="请选择">
              <el-option v-for="item in allGuider" :label="item.realName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-row>
        </div>
        <footer slot="footer">
          <el-button @click="assignAskPriceDialog.isShow = false">取 消</el-button>
          <el-button type="primary" @click="submitAssignAskPrice">确 定</el-button>
        </footer>
      </div>
    </el-dialog>
  </section>
  </template>
  <script>
import Menu from './menu.vue'
import getCache from '@/utils/getCache'
import request from '@/utils/request'
import { Message } from 'element-ui'
import getBulkList from '@/api/bulk/getBulkList'
import getClothLoneList from '@/api/bulk/getClothLoneList'
import assignAskPrice from '@/api/bulk/assignAskPrice'
import ReportApi from '@/api/report'
import mixinFilters from '@/mixin/filters'
export default {
  name: 'bulkOrderList',
  components: {
    Menu
  },
  data() {
    let _function = this.$route.query._function || 'order'
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      isTest: location.href.indexOf('test') > 0 || location.href.indexOf('local') > 0,
      orderList: null,
      access: null,
      activeStatus: 0,
      filters: {
        pageNumber: 1,
        pageSize: 20,
        key: '',
        _function: _function
      },
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1
      },
      height: 100,
      fullscreenLoading: false,
      selectionOrder: [],
      woodAdmin: auth.woodAdmin,
      woodFinance: auth.woodFinance,
      dom: {
        tabsHeight: 0,
        paginationHeight: 0
      },
      allBuyer: [],
      allGuider: [],
      assignAskPriceDialog: {
        isShow: false,
        waitUpdateData: null,
        currentId: ''
      },
      clothLoneData: {}
    }
  },
  mixins: [mixinFilters],
  mounted() {
    this.getBulkOrderList()
    if (!this.woodFinance) { }
    this.getAllBuyer()
    this.getAllGuider()
    window.addEventListener('resize', this.countHeight)
  },
  computed: {},
  watch: {
    'filters._function': function (newVal, oldVal) {
      // 重置请求参数
      Object.assign(this.filters, {
        pageNumber: 1,
        pageSize: 20,
        key: ''
      })
      // 重置tab高度
      Object.assign(this.dom, {
        tabsHeight: 0
      })
      this.$router.replace({
        name: 'bulkOrderList',
        query: {
          _function: newVal === 'order' ? undefined : newVal
        }
      })
      this.getBulkOrderList()
    }
  },
  methods: {
    countHeight() {
      let windowHeiht = document.body.clientHeight
      let dom = this.dom
      dom.tabsHeight = this.dom.tabsHeight || 60
      dom.paginationHeight = dom.paginationHeight || parseFloat(getComputedStyle(this.$refs.paginationWrap, null).height)
      this.height = parseFloat(windowHeiht - dom.tabsHeight - dom.paginationHeight - 161) // 61=头部高度 + 10
    },
    getBulkOrderList() {
      this.fullscreenLoading = false
      console.log(this.filters, 'filters');
      let params = this.getbulkListParams()
      if (['toPay', 'debt0', 'debt1'].indexOf(this.filters._function) > -1) {
        params.listAll = 1;
        params = Object.assign(params, this.filters)
        if (['debt0', 'debt1'].indexOf(this.filters._function) > -1) {
          params._function = 'debt'
          params.reconciliationStatus = this.$route.query.reconciliationStatus
        }
        request('/redwood/repo/out', {
          method: 'GET',
          data: params
        }).then(res => {
          if (res.success === '1') {
            if (res.page) {
              convertData.call(this, res.page)
              this.$nextTick(() => {
                this.countHeight()
              })
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        return;
      }
      if (this.filters._function == 'check') {
        params.listAll = 1;
        params = Object.assign(params, this.filters)
        request('/redwood/repo/in', {
          method: 'GET',
          data: params
        }).then(res => {
          if (res.success === '1') {
            if (res.page) {
              convertData.call(this, res.page)
              this.$nextTick(() => {
                this.countHeight()
              })
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        return;
      }
      // this.fullscreenLoading = true
      getBulkList(params).then((response) => {
        // this.fullscreenLoading = false
        if (response.success === '1') {
          if (response.page) {
            convertData.call(this, response.page)
            this.$nextTick(() => {
              this.countHeight()
            })
          }
        }
      })

      function convertData(page) {
        this.pagation.pageNumber = page.pageNumber
        this.pagation.pageSize = page.pageSize
        this.pagation.totalCount = page.totalCount
        this.filters.pageSize = page.pageSize
        this.filters.pageNumber = page.pageNumber
        page.result.forEach((item) => {
          item.fullAddress = item.addressProvince + item.addressCity + item.addressArea + item.shopAddr
          item.clothLones = null
        })
        this.orderList = page.result
      }
    },
    getClothLoneList(item) {
      if (item.clothLones != null) {
        item.clothLones = null
        return
      }
      getClothLoneList({ orderNumber: item.id, _function: this.filters._function }).then(response => {
        if (response.success === '1') {
          item.clothLones = response.result
          if (item.clothLones.length === 0) {
            this.$message.info('暂无数据')
          }
        }
      })
    },
    getAllGuider() {
      var code = 'woodGuider,woodGuiderLeader'
      this.fullscreenLoading = true
      request('/crm/user/User/listRedSeedByCodes', {
        method: 'post',
        data: {
          param: JSON.stringify({ code: code })
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          this.allGuider = data.list
        } else {
          this.$message.error('系统异常')
        }
      })
    },
    getAllBuyer() {
      this.fullscreenLoading = true
      const param = {
        status: 1
      }
      request(ReportApi.JiXiao.listPurchaser4OMS, {
        method: 'post',
        data: {
          param: JSON.stringify(param)
        }
      }).then(data => {
        this.fullscreenLoading = false
        if (data.success === '1') {
          this.allBuyer = data.result
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    handleChangePagesize(size) {
      this.filters.pageSize = size
      this.getBulkOrderList()
    },
    handleCurrentPageChange(currentPage) {
      this.filters.pageNumber = currentPage
      this.getBulkOrderList()
    },
    handleTableSelectionChange(selection) {
      this.selectionOrder = selection
    },
    resetForm(formName) {
      Object.assign(this.filters, {
        key: ''
      })
      this.getBulkOrderList()
    },
    getbulkListParams() {
      let filters = this.filters
      let params = {}
      for (const key of Object.keys(filters)) {
        params[key] = filters[key]
      }
      return params
    },
    showDetail(id) {
      if (id.indexOf('RC') >= 0) {
        id = id.replace('RC', '')
        id = id.substring(0, id.length - 2)
      }
      let domain = 'http://hongshan.soouya.com'
      if (this.isTest) {
        domain = 'http://testhongshan.soouya.com'
      }
      window.open(domain + '/index/orderDetail?noBar=1&orderNumber=' + id, '_blank')
    },
    showAssignAskPriceDialog(orderData) {
      console.log(orderData)
      this.assignAskPriceDialog.waitUpdateData = orderData
      this.assignAskPriceDialog.isShow = true
      if (orderData.status === 304) {
        this.assignAskPriceDialog.currentId = orderData.guiderId
      } else {
        this.assignAskPriceDialog.currentId = orderData.buyerId
      }
    },
    submitAssignAskPrice() {
      let od = this.assignAskPriceDialog.waitUpdateData
      let param = {}
      param.orderNumber = od.id
      console.log('status:' + od.status)
      console.log('status:' + od.status === 304)
      if (od.status === 304) {
        param.guiderId = this.assignAskPriceDialog.currentId
      } else {
        param.id = this.assignAskPriceDialog.currentId
      }
      param._time = new Date().getTime()
      assignAskPrice(param)
        .then(response => {
          if (response.success === '1') {
            this.$message.success(response.msg)
            this.assignAskPriceDialog.isShow = false
            this.getBulkOrderList()
          }
        })
    }
  }
}

</script>
  <style lang="scss" scoped>
.o-btn {
  margin-left: 10px;
  &:first-child {
    margin-left: 0px;
  }
}
.product-wrap {
  display: table;
  border: 0;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}

th.product-column {
  .color-item {
    border-top: 0;
  }
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.exception {
  color: #f00;
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid #dfe6ec;
  }
  > div {
    display: table-cell;
    &:nth-child(1) {
      width: 60px;
      vertical-align: middle;
      border-left: 0;
    }
    &:nth-child(2) {
      width: 80px;
      vertical-align: middle;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
    }
    &:nth-child(3) {
      width: 60px;
      vertical-align: middle;
      border-left: 1px solid #dfe6ec;
      border-right: 1px solid #dfe6ec;
    }
    &:nth-child(4) {
      width: 250px;
      vertical-align: middle;
      border-right: 0;
    }
  }
}

.color-item {
  display: flex;
  &:not(:first-child) {
    border-top: 1px solid #dfe6ec;
  }
  span {
    width: 20%;
    text-align: center;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
  }
}

.sy-buyer-change {
  li {
    white-space: nowrap;
    margin: 10px 0;
    span {
      color: #20a0ff;
    }
  }
}
</style>
  <style lang="scss" scoped>
.sy-bulk-search {
  width: 380px;
}

.sy-page-wrap {
  font-size: 14px;
}

.el-table {
  .cell {
    padding: 0 5px;
  }
}

.sy-page-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sy-table-wrap {
  flex: 1;
  white-space: nowrap;
}

.sy-pagination-wrap {
  flex: 0 0 50px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}

.btn-export {
  position: absolute;
  right: 0;
  top: 0.3em;
}

.sy-update-buyer-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  footer {
    margin-top: 20px;
  }
}

.sy-current-buyer {
  color: #f00;
}

.el-col-5 {
  text-align: right;
  height: 30px;
  margin-right: 20px;
}

.order-a {
  cursor: pointer;
  font-size: 16px;
}

.order-a:hover {
  color: #20a0ff;
}

.operate-btn button {
  float: left;
}
</style>
