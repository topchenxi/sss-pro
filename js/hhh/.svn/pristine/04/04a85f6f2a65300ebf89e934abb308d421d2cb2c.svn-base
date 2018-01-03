<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input v-model="requestData.key" name="keyword" placeholder="订单号/采购商/供应商" @keydown.enter.native="requestListAllOrder" v-if="type == 'all'"></el-input>
            <el-input v-model="requestData.key" name="keyword" placeholder="采购商名称/供应商名称/销售员/订单号" @keydown.enter.native="requestListAllOrder" v-if="type == 'toLading' || type == 'toSubmitPay'"></el-input>
          </div>
          <el-button type="primary" @click.native="search">搜索</el-button>
        </div>
        <div class="row">
          <div class="item" v-if="type == 'all'">
            <el-select v-model="requestData.status" placeholder="全部订单状态" @change="requestListAllOrder">
              <el-option label="全部订单状态" value=""></el-option>
              <el-option label="等待报价" value="304"></el-option>
              <el-option label="等待收付订金" value="326"></el-option>
              <el-option label="等待收付款" value="328"></el-option>
              <el-option label="等待录入尾款信息" value="335"></el-option>
              <el-option label="等待收付尾款" value="346"></el-option>
              <el-option label="等待通知提货" value="347"></el-option>
              <el-option label="等待确认提货时间" value="351"></el-option>
              <el-option label="等待确认供应商送货时间" value="352"></el-option>
              <el-option label="等待销售入仓" value="310"></el-option>
              <el-option label="履约中" value="388"></el-option>
              <el-option label="订单已经取消" value="100"></el-option>
              <el-option label="已完成" value="10"></el-option>
            </el-select>
          </div>
          <div class="item" v-if="type == 'all'">
            <el-select v-model="requestData.salerId" placeholder="全部订单状态" @change="requestListAllOrder">
              <el-option label="全部销售员" value=""></el-option>
              <el-option :label="item.realName" :value="item.id" v-for="item in sales"></el-option>
            </el-select>
          </div>
          <div class="item">
            <el-date-picker v-model="requestData.createTimeBegin" type="date" placeholder="开始时间" :picker-options="pickerOptions0"></el-date-picker>
          </div>
          <div class="item">
            <el-date-picker v-model="requestData.createTimeEnd" type="date" placeholder="结束时间" :picker-options="pickerOptions1"></el-date-picker>
          </div>
          <el-button type="primary" size="small" @click.native="exportExcel" v-if="type == 'all'">导出Excel</el-button>
        </div>
      </div>
    </div>
    <div class="table-warp">
      <div class="table-content">
        <el-table :data="result" :resizable="false" :height="height" header-align="left" border>
          <el-table-column label="订单号" prop="number" align="left" width="175px">
          </el-table-column>
          <el-table-column label="订单时间" align="left" width="180px">
            <template scope="scope">
              <div>{{scope.row.createTime | formatTime}}</div>
            </template>
          </el-table-column>
          <el-table-column label="采购商" align="left" width="220px" show-overflow-tooltip>
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.customerCompany + '/' + scope.row.customerNumber" placement="top">
                <p class="ellipsis">
                  <span class="icon" :class="scope.row.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                  <span class="icon" :class="scope.row.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{scope.row.customerCompany + '/' + scope.row.customerNumber}}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="供应商" prop="showShopCompany" align="center" width="160px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="采购数量" align="center" width="120px" show-overflow-tooltip>
            <template scope="scope">
              {{scope.row.quantity + scope.row.quantityUnit}}/{{scope.row.colorNumber || 0}}色
            </template>
          </el-table-column>
          <el-table-column label="订单总金额" align="center" width="120px">
            <template scope="scope">
              {{scope.row.saleMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="是否验货" align="center" width="100px">
            <template scope="scope">
              {{scope.row.checkCloth == '1' ? '验货' : '不验货'}}
            </template>
          </el-table-column>
          <el-table-column label="配送方式" align="center" width="120px">
            <template scope="scope">
              <span>{{scope.row.sendType | sendTypeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="提货方式" align="center" width="120px">
            <template scope="scope">
              <span>{{scope.row.sendInneed | sendInneedFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前状态" prop="statusDesc" align="center" width="150px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="销售员" prop="salerName" align="center" width="100px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="left" width="230px">
            <template scope="scope">
              <el-button class="table-btn" v-if="[304, 335, 347].indexOf(scope.row.status) > -1" @click="showCancelDialog(scope.row, scope.row.status)">取消订单</el-button>
              <el-button class="table-btn" @click="offer('', scope.row.id,scope.row.customerId)" v-if="scope.row.status ==  304" idx="quoteAndEdit">报价</el-button>
              <el-button class="table-btn" @click="offer('editRetainage', scope.row.id,scope.row.customerId)" v-if="scope.row.status == 335"> 编辑尾款</el-button>
              <el-button class="table-btn" @click="assign(scope.row)" v-if="scope.row.status == 347">通知提货</el-button>
              <!-- canSubmitPay这个判断状态只使用全部订单的情况 -->
              <el-button class="table-btn" @click="submitForPay(scope.row)" v-if="scope.row.canSubmitPay == 1 && type == 'all'">提交支付</el-button>
              <!-- 再做一个判断适用提交客户支付这个tab支付 -->
              <el-button class="table-btn" @click="submitForPay(scope.row)" v-if="type == 'toSubmitPay'">提交支付</el-button>
              <!-- 全部订单的申请退换货 -->
              <el-button class="table-btn" @click="applyReturn(scope.row)" v-if="scope.row.canSubmitPay == 1 && scope.row.sendInneed != 2 && scope.row.checkCloth == 1">申请退换货</el-button>
              <!-- 提交支付页面的的申请退换货 -->
              <el-button class="table-btn" @click="applyReturn(scope.row)" v-if="type == 'toSubmitPay' && scope.row.sendInneed != 2 && scope.row.checkCloth == 1">申请退换货</el-button>
              <el-tooltip v-if="[366, 368, 100].indexOf(scope.row.status) > -1" class="item" effect="dark" :content="scope.row.cancelReason" placement="top">
                <span class="font-reason">取消原因</span>
              </el-tooltip>
              <el-tooltip v-if="scope.row.exceptionMsg" class="item" effect="dark" :content="scope.row.exceptionMsg" placement="top">
                <span class="font-reason">异常原因</span>
              </el-tooltip>
              <!-- <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all', customerId: scope.row.customerId, reqNumber: scope.row.id, hasInRepsoity: true} }"
                v-if="[304, 326, 328,  368, 335, 346, 347, 351, 352, 310, 100, 10, 388].indexOf(scope.row.status) > -1 && scope.row.checkCloth ==1">
                <el-button class="table-btn">详情</el-button>
              </router-link>
              <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all', reqNumber: scope.row.id, customerId: scope.row.customerId} }" v-if="[304, 326, 328,  368, 335, 346, 347, 351, 352, 310, 100, 10, 388].indexOf(scope.row.status) > -1 && scope.row.checkCloth ==0">
                <el-button class="table-btn">详情</el-button>
              </router-link> -->
              <router-link :to="{name: 'allAllDetail', query: {id: scope.row.id}}" target="_blank">
                <el-button class="table-btn">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footer class="pagation">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="requestListAllOrder" :options="requestData" />
      </footer>
    </div>
    <el-dialog v-model="cancelDialogConfig.isShow" title="取消订单" size="tiny">
      <el-form label-width="120px" :model="cancelForm" ref="cancelForm" :rules="cancelFormRule" v-if="cancelDialogConfig.data">
        <el-form-item label="订单号">
          {{cancelDialogConfig.data.number}}
        </el-form-item>
        <el-form-item label="采购商">
          {{cancelDialogConfig.data.customerCompany}}
        </el-form-item>
        <el-form-item label="供应商">
          {{cancelDialogConfig.data.shopCompany}}
        </el-form-item>
        <el-form-item label="采购数量">
          {{cancelDialogConfig.data.quantity}}{{cancelDialogConfig.data.quantityUnit}}/{{cancelDialogConfig.data.colorNumber || 0}}色
        </el-form-item>
        <el-form-item label="订单总金额">
          <strong style="color:red">{{cancelDialogConfig.data.saleMoney | formatMoney}}</strong>
        </el-form-item>
        <el-form-item label="当前状态">
          <strong>
            {{cancelDialogConfig.data.statusDesc}}
          </strong>
        </el-form-item>
        <el-form-item label="取消原因" prop="reason">
          <el-input v-model="cancelForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmCancel('cancelForm')" :disabled="confirmCancelFlag">确认取消</el-button>
        <el-button @click="cancelDialogConfig.isShow = false">暂不取消</el-button>
      </div>
    </el-dialog>
    <!-- 提交支付选择颜色的dialog -->
    <el-dialog v-model="showColors" title="提交支付">
      <div class="checkbox-group clearfix">
        <el-checkbox v-model="allChecked" @change="changeAll()">全选</el-checkbox>
        <el-checkbox v-for="item in newColors" v-model="item.show" @change="changeColor(item)">{{item.name}}</el-checkbox>
      </div>
      <div v-for="(item, index) in newColors" :key="index" class="mt20" v-if="item.show">
        <p class="mb10">{{item.name}}</p>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <el-checkbox v-model="item.checked" @change="change(item)"></el-checkbox>
                </th>
                <th>匹号</th>
                <th>销售单价</th>
                <th>成本单价</th>
                <th>入仓单号</th>
                <th>入仓时间</th>
                <th>入仓实数</th>
                <th>实际布长</th>
                <th>验布结果</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(colorItem,colorIndex) in item.colorArray" :key="colorIndex">
                <td>
                  <el-checkbox v-model="colorItem.checked"></el-checkbox>
                </td>
                <!-- 匹号 -->
                <td>{{colorItem.number}}</td>
                <!-- 销售单价 -->
                <td>{{colorItem.salePrice}}{{colorItem.salePriceUnit}}</td>
                <!-- 成本单价 -->
                <td>{{colorItem.costPrice}}{{colorItem.costPriceUnit}}</td>
                <!-- 入仓单号 -->
                <td>{{colorItem.inNumber}}</td>
                <!-- 入仓时间 -->
                <td>{{colorItem.inTime | formatTime}}</td>
                <!-- 入仓实数 -->
                <td>{{colorItem.quantity}}{{colorItem.quantityUnit}}</td>
                <!-- 实际布长 -->
                <td>{{colorItem.buchang | buchangFilter}}</td>
                <!-- 验布结果 -->
                <td>{{colorItem.rank | rankFilter}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </el-dialog>
    <!-- 申请退换货的dialog -->
    <el-dialog v-model="returnShow" title="申请退换货">
      <div class="table-wrap">
        <el-radio-group v-model="returnId">
          <table class="table">
            <thead>
              <tr>
                <th>入仓单号</th>
                <th>入仓时间</th>
                <th>色号</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item ,index) in returnResult" :key="index">
                <!-- 入仓单号 -->
                <td>
                  <el-radio :label="item.id">{{item.number}}</el-radio>
                </td>
                <!-- 入仓时间 -->
                <td>{{item.createTime | formatTime}}</td>
                <!-- 色号 -->
                <td>
                  <ul>
                    <li v-for="color in item.colorList">{{color}}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmReturn" :disabled="!canConfirmReturn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 提交支付的dialog -->
    <el-dialog v-model="submitData.isShow" title="提交支付" class="el-dialog-pay">
      <el-form label-width="90px" :model="submitData" ref="submitData" :rules="submitDataRule">
        <div class="d-top">
          <div class="f-buyer">采购商 : {{informShowData.customerCompany}}</div>
          <div class="f-account">
            <dl>
              <dt>账户金额</dt>
              <dd>
                <p>可用余额 :
                  <span class="red">&yen;{{informShowData.availableBalance  | formatNumber}}</span>
                </p>
                <p>可用白条额度 :
                  <span class="red">&yen;{{informShowData.baitiaoRemainLine  | formatNumber}}</span>
                  <i>( 白条额度：&yen;{{informShowData.baitiaoCreditLine  | formatNumber}} 预扣金额：&yen;{{informShowData.baitiaoHoldMoney  | formatNumber}} )</i>
                </p>
                <p>可用信贷额度 :
                  <span class="red">&yen;{{informShowData.yanzhenRemainLine | formatNumber}}</span>
                  <i>( 信贷额度：&yen;{{informShowData.yanzhenCreditLine | formatNumber}} 预扣金额：&yen;{{informShowData.yanzhenHoldMoney | formatNumber}} )</i>
                </p>
                <p>可用垫付额度 :
                  <span class="red">&yen;{{informShowData.remainLine | formatNumber}}</span>
                  <i>( 垫付额度：&yen;{{informShowData.creditLine | formatNumber}} 预扣金额：&yen;{{informShowData.holdMoney | formatNumber}} )</i>
                </p>
              </dd>
            </dl>
          </div>
        </div>
        <h5>出仓内容</h5>
        <div class="table-wrap">
          <table class="table">
            <!-- 颜色 -->
            <col width="6%">
            <!-- 匹号 -->
            <col width="10%">
            <!-- 销售单价 -->
            <col width="10%">
            <!-- 成本单价 -->
            <col width="10%">
            <!-- 入仓单号 -->
            <col width="13%">
            <!-- 入仓时间 -->
            <col width="12%">
            <!-- 入仓实数 -->
            <col width="10%">
            <!-- 实际布长 -->
            <col width="10%">
            <!-- 验布结果 -->
            <col width="10%">
            <tbody>
              <tr>
                <td>色号</td>
                <td>匹号</td>
                <td>销售单价</td>
                <td>成本单价</td>
                <td>入仓单号</td>
                <td>入仓时间</td>
                <td>入仓实数</td>
                <td>实际布长</td>
                <td>验布结果</td>
                <td>小计</td>
              </tr>
              <tr v-for="(colorItem,colorIndex) in selectColorList" :key="colorIndex">
                <!-- 颜色 -->
                <td v-if="colorItem.flag" :rowspan="colorItem.row">{{colorItem.color}}</td>
                <!-- 匹号 -->
                <td>{{colorItem.number}}</td>
                <!-- 销售单价 -->
                <td>{{colorItem.salePrice | formatNumber}}{{colorItem.salePriceUnit}}</td>
                <!-- 成本单价 -->
                <td>{{colorItem.costPrice | formatNumber}}{{colorItem.costPriceUnit}}</td>
                <!-- 入仓单号 -->
                <td>{{colorItem.inNumber}}</td>
                <!-- 入仓时间 -->
                <td>{{colorItem.inTime | formatTime}}</td>
                <!-- 入仓实数 -->
                <td>{{colorItem.quantity | formatNumber}}{{colorItem.quantityUnit}}</td>
                <!-- 实际布长 -->
                <td>{{colorItem.buchang | buchangFilter}}</td>
                <!-- 验布结果 -->
                <td>{{colorItem.rank | rankFilter}}</td>
                <!-- 小计 -->
                <td>{{colorItem.salePrice * colorItem.quantity | formatNumber}}元</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5>出仓销售货款 :
          <span class="red">{{submitData.saleMoney | formatNumber}}</span>元 </h5>
        <div class="line"></div>
        <div class="pay-form">
          <div class="left">
            <h5>结算信息</h5>
            <el-form-item label="运费" prop="freightMoney">
              <el-input idx="freightMoney" v-model="submitData.freightMoney"></el-input>
            </el-form-item>
            <el-form-item label="应收出仓销售货款" prop="needSaleMoney" required>
              <el-input v-model="submitData.needSaleMoney"></el-input>
              <div v-if="informShowData.payMoney" class="total">
                支付金额 :
                <span class="red" v-if="informShowData.payMoney">{{informShowData.payMoney}}元</span>
              </div>
            </el-form-item>
            <el-form-item label="支付方式" required>
              <el-radio-group v-model.number="submitData.creditType">
                <el-radio :label="3" :disabled="!canYuePay">余额支付</el-radio>
                <el-radio :label="2" :disabled="!canBaitiaoPay">白条支付</el-radio>
                <el-radio :label="4" :disabled="!canYanzhenPay">信贷支付</el-radio>
                <el-radio :label="1" :disabled="!canDianfuPay">垫付支付</el-radio>
              </el-radio-group>
              <p v-if="submitData.creditType == 3" style="font-size: 12px;color:red;margin: -10px 0">提醒：使用余额前请先跟销售或财务确认！</p>
            </el-form-item>
            <el-form-item label="回款日期" v-if="submitData.creditType == 1" required>
              <el-date-picker v-model="submitData.returnDate" type="date" size="small" placeholder="选择时间" :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="mb0" label="垫付凭据" v-if="submitData.creditType == 1" required>
              <div class="upload-img">
                <a :href="'http://www.soouya.com' + item" :key="item" v-lightbox="submitData.prepayCredentialUrls" v-for="(item, index) in submitData.prepayCredentialUrls" class="img-wrap">
                  <img :src="'http://www.soouya.com' + item" width='86' height="86" />
                  <span @click="delPrepayCredentialUrl(index)" class="del-arrow">X</span>
                </a>
              </div>
              <el-upload idx="prepayCredentialUrls" class="avatar-uploader" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-file-list="false" :on-success="handlePrepayUrlSuccess" :on-error="handleError" v-if="submitData.prepayCredentialUrls.length < 9">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <span class="icon-upload"></span>
              </el-upload>
            </el-form-item>
            <el-form-item label="付款凭据" class="mb0">
              <div class="upload-img">
                <a :href="'http://www.soouya.com' + item" :key="item" v-lightbox="submitData.payCredentialUrls" v-for="(item, index) in submitData.payCredentialUrls" class="img-wrap">
                  <img :src="'http://www.soouya.com' + item" width='86' height="86" />
                  <span @click="delPayCredentialUrl(index)" class="del-arrow">X</span>
                </a>
              </div>
              <el-upload idx="payCredentialUrls" class="avatar-uploader" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-file-list="false" :on-success="handlePayUrlSuccess" :on-error="handleError" v-if="submitData.payCredentialUrls.length < 9">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <span class="icon-upload"></span>
              </el-upload>
            </el-form-item>
            <el-form-item label="结算备注" class="mb0">
              <div class="textarea-wrap">
                <textarea idx="payRemark" placeholder="请输入内容" maxlength="100" v-model="submitData.payRemark"></textarea>
                <span class="count">{{submitData.payRemark.length}}/100</span>
              </div>
            </el-form-item>
          </div>
          <div class="right">
            <h5 v-if="pickType ==0">
              <span class="red">*</span>收货信息</h5>
            <div class="address-wrap" v-if="pickType ==0">
              <p>{{submitData.addressName}} {{submitData.addressTel}}</p>
              <p>{{submitData.addressProvince}} {{submitData.addressCity}}{{submitData.addressArea}}{{submitData.addressAddr}}</p>
            </div>
            <el-button v-if="pickType ==0" class="mb20" type="primary" @click="changeAddress">修改收货地址</el-button>
            <el-form-item label="物流公司" v-if="pickType ==0">
              <el-input style="width: 100px;margin-right: 5px" v-model="submitData.sendCompany" :maxlength="30"></el-input>
            </el-form-item>
            <el-form-item prop="sendTel" label="联系电话" v-if="pickType ==0">
              <el-input style="width: 100px;margin-right: 5px" v-model="submitData.sendTel" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="出仓备注">
              <div class="textarea-wrap">
                <textarea idx="remark" placeholder="请输入内容" maxlength="100" v-model="submitData.remark"></textarea>
                <span class="count">{{submitData.remark.length}}/100</span>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="line mb0"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="prev()">上一步</el-button>
        <el-button type="primary" @click="informSubmitPay('submitData', 1)" :disabled="!canInformPay1">采购确认支付</el-button>
        <el-button type="primary" @click="informSubmitPay('submitData', 0)" :disabled="!canSubmitPay1">提交客户支付</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="changeAddrVisable" size="small" title="收货人管理" class="addr-dlg">
      <div class="table-wrap m10">
        <table class="table">
          <colgroup>
            <col width="10%">
            <col width="70%">
            <col width="20%">
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>姓名/地址/联系方式</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in addrList">
              <td>
                <el-radio :label="item.id" v-model="submitData.addressId"></el-radio>
              </td>
              <td class="ta-l">
                <p>{{item.name}} | {{item.tel}}</p>
                <p>{{item.province}}&nbsp{{item.city}}&nbsp{{item.area}}&nbsp{{item.addr}}</p>
              </td>
              <td>
                <span class="icon-notify mr10" @click="handleEditAddr(item)"></span>
                <span class="icon-del" @click="handleDeleteAddr(item)"></span>
              </td>
            </tr>
          </tbody>
        </table>
        <el-button class="mt10" type="primary" @click.native="handleNewAddr">+ 新增收货地址</el-button>
      </div>
      <footer class="clearfix">
        <el-button type="primary" class='fr mr10' @click.native="confirmSelectAddr">选好了</el-button>
      </footer>
    </el-dialog>
    <!-- 新增修改地址的dialog -->
    <el-dialog title="新增/修改收货人" size="tiny" v-model="newEditAddr">
      <div style="margin-left:50px;">
        <el-form label-width="80px" label-position="right" ref="reqAddrParams" :rules="infoRules" :model="reqAddrParams">
          <el-form-item label="姓名" prop="name">
            <el-input style="width:220px" v-model="reqAddrParams.name" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input style="width:220px" v-model="reqAddrParams.tel" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="省市区" class="province" required>
            <y-address :province="reqAddrParams.province " :city="reqAddrParams.city " :area="reqAddrParams.area" @change="handleNewAddrSelection" />
          </el-form-item>
          <el-form-item label="收货地址" prop="addr">
            <el-input v-model="reqAddrParams.addr" style="width:220px" :maxlength="30"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <footer style="padding-left:25%;margin-top:20px;">
        <el-button type="primary" size="small" @click.native="handleSaveNewEditAddr('reqAddrParams')" :disabled="checkOutInput()">保存</el-button>
        <el-button size="small" @click.native="newEditAddr = false">取消</el-button>
      </footer>
    </el-dialog>
    <!-- 通知提货的dialog -->
    <el-dialog v-model="pickData.isShow" title="通知提货" size="small" class="el-dialog-pay">
      <el-form label-width="90px" :model="pickData" ref="pickData" :rules="pickDataRule">
        <el-form-item label="提货方式" required>
          <el-select v-model="pickData.sendInneed" placeholder="请选择">
            <el-option v-for="item in sendInneeds" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="pickData.sendInneed == 2">
          <div class="d-top mt20">
            <div class="f-buyer">采购商 : {{informShowData.customerCompany}}</div>
            <div class="f-account">
              <dl>
                <dt>账户金额</dt>
                <dd>
                  <p>可用余额 :
                    <span class="red">&yen;{{informShowData.availableBalance | formatNumber}}</span>
                  </p>
                  <p>可用白条额度 :
                    <span class="red">&yen;{{informShowData.baitiaoRemainLine | formatNumber}}</span>
                    <i>( 白条额度：&yen;{{informShowData.baitiaoCreditLine | formatNumber}} 预扣金额：&yen;{{informShowData.baitiaoHoldMoney | formatNumber}} )</i>
                  </p>
                  <p>可用信贷额度 :
                    <span class="red">&yen;{{informShowData.yanzhenRemainLine | formatNumber}}</span>
                    <i>( 信贷额度：&yen;{{informShowData.yanzhenCreditLine | formatNumber}} 预扣金额：&yen;{{informShowData.yanzhenHoldMoney | formatNumber}} )</i>
                  </p>
                  <p>可用垫付额度 :
                    <span class="red">&yen;{{informShowData.remainLine | formatNumber}}</span>
                    <i>( 垫付额度：&yen;{{informShowData.creditLine | formatNumber}} 预扣金额：&yen;{{informShowData.holdMoney | formatNumber}} )</i>
                  </p>
                </dd>
              </dl>
            </div>
          </div>
          <h5>
            <span class="red">*</span> 出仓内容</h5>
          <div class="table-wrap" v-if="pickData.colors.length > 0">
            <table class="table">
              <thead>
                <tr>
                  <th>色号</th>
                  <th>销售单价</th>
                  <th>成本单价</th>
                  <th>采购数量</th>
                  <th>小计</th>
                  <th>销售货款</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(colorItem,colorIndex) in pickData.colors" :key="colorIndex">
                  <!-- 颜色 -->
                  <td>{{colorItem.color}}</td>
                  <!-- 销售单价 -->
                  <td>{{colorItem.salePrice | formatNumber}}{{colorItem.salePriceUnit}}</td>
                  <!-- 成本单价 -->
                  <td>{{colorItem.price | formatNumber}}{{colorItem.priceUnit}}</td>
                  <!-- 采购数量 -->
                  <td>{{colorItem.quantity | formatNumber}}{{colorItem.quantityUnit}}</td>
                  <!-- 小计 -->
                  <td>{{ colorItem.quantity * colorItem.salePrice | formatNumber}} {{colorItem.salePriceUnit}}</td>
                  <!-- 销售货款 -->
                  <td :rowspan="pickData.colors.length" v-if="colorIndex == 0">{{pickData.saleMoney | formatNumber}}元</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="line"></div>
          <div class="pay-form">
            <div class="left">
              <h5>结算信息</h5>
              <el-form-item label="运费" prop="freightMoney">
                <el-input idx="freightMoney" v-model="pickData.freightMoney"></el-input>
              </el-form-item>
              <el-form-item label="应收出仓销售货款" prop="needSaleMoney" required>
                <el-input v-model="pickData.needSaleMoney"></el-input>
                <div v-if="informShowData.payMoney" class="total">
                  支付金额 :
                  <span class="red" v-if="informShowData.payMoney">{{informShowData.payMoney}}元</span>
                </div>
              </el-form-item>
              <el-form-item label="支付方式" required>
                <el-radio-group v-model.number="pickData.creditType">
                  <el-radio :label="3" :disabled="!canYuePay">余额支付</el-radio>
                  <el-radio :label="2" :disabled="!canBaitiaoPay">白条支付</el-radio>
                  <el-radio :label="4" :disabled="!canYanzhenPay">信贷支付</el-radio>
                  <el-radio :label="1" :disabled="!canDianfuPay">垫付支付</el-radio>
                </el-radio-group>
                <p v-if="pickData.creditType == 3" style="font-size: 12px;color:red;margin: -10px 0">提醒：使用余额前请先跟销售或财务确认！</p>
              </el-form-item>
              <el-form-item label="回款日期" required v-if="pickData.creditType == 1">
                <el-date-picker v-model="pickData.returnDate" type="date" size="small" placeholder="选择时间" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="垫付凭据" required v-if="pickData.creditType == 1">
                <div class="upload-img">
                  <a :href="'http://www.soouya.com' + item" :key="item" v-lightbox="pickData.prepayCredentialUrls" v-for="(item, index) in pickData.prepayCredentialUrls" class="img-wrap">
                    <img :src="'http://www.soouya.com' + item" width='90' height="90" />
                    <span @click="delPrepayCredentialUrl(index)" class="del-arrow">X</span>
                  </a>
                </div>
                <el-upload idx="prepayCredentialUrls" class="avatar-uploader" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-file-list="false" :on-success="handlePrepayUrlSuccess" :on-error="handleError" v-if="pickData.prepayCredentialUrls.length < 9">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <span class="icon-upload"></span>
                </el-upload>
              </el-form-item>
              <el-form-item label="付款凭据" v-if="pickData.sendInneed == 2">
                <div class="upload-img">
                  <a :href="'http://www.soouya.com' + item" :key="item" v-lightbox="pickData.payCredentialUrls" v-for="(item, index) in pickData.payCredentialUrls" class="img-wrap">
                    <img :src="'http://www.soouya.com' + item" width='86' height="86" />
                    <span @click="delPayCredentialUrl(index)" class="del-arrow">X</span>
                  </a>
                </div>
                <el-upload idx="payCredentialUrls" class="avatar-uploader" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-file-list="false" :on-success="handlePayUrlSuccess" :on-error="handleError" v-if="pickData.payCredentialUrls.length < 9">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <span class="icon-upload"></span>
                </el-upload>
              </el-form-item>
              <el-form-item label="结算备注" v-if="pickData.sendInneed == 2">
                <div class="textarea-wrap">
                  <textarea idx="payRemark" placeholder="请输入内容" maxlength="100" v-model="pickData.payRemark"></textarea>
                  <span class="count">{{pickData.payRemark.length}}/100</span>
                </div>
              </el-form-item>
            </div>
            <div class="right">
              <h5>结算信息</h5>
              <el-form-item label="出仓备注" v-if="pickData.sendInneed == 2">
                <div class="textarea-wrap">
                  <textarea idx="remark" placeholder="请输入内容" maxlength="100" v-model="pickData.remark"></textarea>
                  <span class="count">{{pickData.remark.length}}/100</span>
                </div>
              </el-form-item>
              <el-form-item label="提货备注" v-if="pickData.sendInneed == 2">
                <div class="textarea-wrap">
                  <textarea idx="zhifaRemark" placeholder="请输入内容" maxlength="100" v-model="pickData.zhifaRemark"></textarea>
                  <span class="count">{{pickData.zhifaRemark.length}}/100</span>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="line mb0"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAssign()" v-if="pickData.sendInneed != 2">确认通知</el-button>
        <el-button type="primary" @click="informPay('pickData', 1)" :disabled="!canInformPay" v-if="pickData.sendInneed == 2">采购确认支付</el-button>
        <el-button type="primary" @click="informPay('pickData', 0)" :disabled="!canSubmitPay" v-if="pickData.sendInneed == 2">提交客户支付</el-button>
        <el-button @click="pickData.isShow = false">取消</el-button>
      </div>
    </el-dialog>
    <lightbox></lightbox>
  </section>
</template>
<script>
import Pagination from 'components/pagination'
import bus from '../eventBus';
import YAddress from 'components/y-address/index'
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
  formatTimeString
} from 'utils/tool'
import {
  request
} from 'utils/request'
import Tab from '../index.vue'
export default {
  components: {
    Tab,
    Pagination,
    Lightbox,
    'y-address': YAddress
  },
  data() {
    const validateStr = (rule, value, callback) => {
      if (value.length > 500 || value.length < 5) {
        callback(new Error('请输入5-500字数内取消原因'));
      } else {
        callback();
      }
    };
    const validateFreightMoney = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        setTimeout(() => {
          var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
          if (!reg.test(value)) {
            callback(new Error('请输入大于的数字,小数点后最多两位'));
          } else {
            if (value > 100000) {
              callback(new Error('最多输入5位数字,小数点后最多两位'));
            } else {
              callback();
            }
          }
        }, 300);
      }
    };
    const validateNeedSaleMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error('应收出仓销售货款不能为空'));
      } else {
        setTimeout(() => {
          var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
          if (!reg.test(value)) {
            callback(new Error('请输入大于的数字,小数点后最多两位'));
          } else {
            if (value == 0) {
              callback(new Error('请输入大于的数字,小数点后最多两位'));
            } else {
              callback();
            }
          }
        }, 300);
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback();
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
    var that = this
    return {
      pickerOptions0: {
        disabledDate(time) {
          if (that.requestData.createTimeEnd) {
            if (time.getTime() > +new Date(that.requestData.createTimeEnd)) {
              return true
            }
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          if (that.requestData.createTimeBegin) {
            if (time.getTime() > Date.now()) {
              return true
            }
            return +new Date(that.requestData.createTimeBegin) > time.getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      selectColorList: [],
      imageUrl: '',
      type: '', // 用来切换上面的筛选条件
      requestData: {
        _function: '',
        pageSize: 20,
        pageNumber: 1,
        createTimeBegin: '',
        createTimeEnd: '',
        export: '',
        key: '',
        status: '',
        salerId: ''
      },
      result: [],
      sales: [],
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      checked: false,
      cancelDialogConfig: {
        isShow: false,
        data: null
      },
      cancelForm: {
        orderNumber: '',
        reason: '',
        type: 1
      },
      confirmCancelFlag: false, // 取消订单弹框的确定取消按钮点击一次以后让按钮置灰防止二次点击
      assignForm: {
        serviceNumber: '',
        buyerCompany: '',
        shopCompany: '',
        quantity: '',
        colorCount: '',
        quantityUnit: '',
        sendInneed: null,
        zhifaRemark: ''
      },
      contentLength: null,
      informShowData: {
        colors: [],
        priceUnit: '',
        customerCompany: '',
        availableBalance: '',
        baitiaoRemainLine: '',
        baitiaoCreditLine: '',
        baitiaoHoldMoney: '',
        yanzhenRemainLine: '',
        yanzhenCreditLine: '',
        yanzhenHoldMoney: '',
        remainLine: '',
        creditLine: '',
        holdMoney: '',
        payMoney: '',
        mobliePhone: '',
        hasOverdueDebt: null, // 判断是否逾期
        hasOpenedBaitiao: '', // 判断是否开通白条
        hasOpenedYanzhen: '', // 判断是否开通雁阵
      },
      sendInneeds: [{
          value: 0,
          label: '提货员提货'
        },
        {
          value: 1,
          label: '供应商送货'
        },
        {
          value: 2,
          label: '档口直发'
        }
      ],
      pickData: {
        isShow: false,
        sendInneed: null,
        payer: '',
        orderNumber: '',
        colors: [],
        saleMoney: 0,
        needSaleMoney: 0,
        payRemark: '',
        customerId: '',
        remark: '',
        zhifaRemark: '',
        freightMoney: '',
        creditType: null,
        returnDate: null,
        prepayCredentialUrls: [],
        payCredentialUrls: [],
        bulk: { // 接口变动单独增加两个二级字段
          customerId: '',
          sendDirectRemark: ''
        }
      },
      allChecked: false,
      newColors: [],
      pickType: null,
      submitData: {
        isShow: false,
        customerId: '',
        clothLoneIds: [],
        orderNumber: '',
        quantity: '',
        quantityUnit: '',
        addressId: '',
        addressProvince: '',
        addressCity: '',
        addressArea: '',
        addressAddr: '',
        addressName: '',
        addressTel: '',
        sendCompany: '',
        sendTel: '',
        payer: '',
        saleMoney: 0,
        needSaleMoney: 0,
        payRemark: '',
        remark: '',
        freightMoney: '',
        creditType: null,
        returnDate: null,
        prepayCredentialUrls: [],
        payCredentialUrls: [],
        bulk: { // 接口变动单独增加三个个二级字段
          customerId: '',
          defaultSendCompany: '',
          defaultSendTel: ''
        }
      },
      customerId: null,
      customerCompany: null,
      changeAddrVisable: false,
      addrList: [],
      showColors: false,
      newEditAddr: false,
      reqAddrParams: {
        id: '',
        userId: null,
        name: '',
        tel: '',
        province: '',
        city: '',
        area: '',
        addr: '',
        haveSendCompany: 0,
        sendCompany: '',
        sendTel: '',
      },
      returnShow: false,
      returnResult: [],
      returnId: null,
      height: 600,
      pickDataRule: {
        freightMoney: [{
          validator: validateFreightMoney,
          trigger: 'blur'
        }],
        needSaleMoney: [{
          validator: validateNeedSaleMoney,
          trigger: 'blur',
          required: true
        }]
      },
      submitDataRule: {
        freightMoney: [{
          validator: validateFreightMoney,
          trigger: 'blur'
        }],
        needSaleMoney: [{
          validator: validateNeedSaleMoney,
          trigger: 'blur',
          required: true
        }],
        sendTel: [{
          validator: checkPhone,
          trigger: 'blur'
        }]
      },
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
        tel: [{
          validator: checkPhone,
          trigger: 'blur',
          required: true
        }],
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
      cancelFormRule: {
        reason: [{
          validator: validateStr,
          trigger: 'blur',
          required: true
        }]
      },
      assignFormRule: {
        sendInneed: [{
          required: true,
          message: '选择提货方式',
          trigger: 'change'
        }]
      },
      refundForm: {
        orderNumber: '',
        reason: '',
      },
      refundFormRule: {
        reason: [{
          validator: validateStr,
          trigger: 'blur',
          required: true
        }]
      },
      asking: false
    }
  },
  filters: {
    formatTime(val) {
      return Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formatMoney(val) {
      return Number(val) >= 0 ? '￥' + val.toFixed(2) : '--'
    },
    formatNumber(val) {
      if (val !== '') {
        return val.toFixed(2)
      }
    },
    rankFilter(value) {
      switch (value) {
        case 1:
          return 'A';
        case 2:
          return 'B';
        case 3:
          return 'C';
        case 4:
          return 'D';
        default:
          return '--';
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
    sendInneedFilter(value) {
      switch (value) {
        case 0:
          return '提货员提货';
        case 1:
          return '供应商送货';
        case 2:
          return '档口直发';
        default:
          return '--';
      }
    },
    buchangFilter(val) {
      return val != -1 ? val : '--'
    },
  },
  watch: {
    // 解决路由相同参数不同请求无反应的问题
    '$route' (to, from) {
      this.type = this.$route.query.type
      this.requestData.status = ''
      this.requestData['_function'] = this.$route.query.type
      this.requestListAllOrder()
    },
    assignForm: {
      handler: function(val) {
        this.contentLength = val.zhifaRemark.length;
      },
      deep: true
    },
    submitData: {
      handler: function(val) {
        if (isNaN(Number(val.freightMoney)) || isNaN(Number(val.needSaleMoney))) {
          this.informShowData.payMoney = ''
        } else {
          this.informShowData.payMoney = Number(val.needSaleMoney) + Number(val.freightMoney)
          this.informShowData.payMoney = this.informShowData.payMoney.toFixed(2)
        }
      },
      deep: true
    },
    pickData: {
      handler: function(val) {
        if (isNaN(Number(val.freightMoney)) || isNaN(Number(val.needSaleMoney))) {
          this.informShowData.payMoney = ''
        } else {
          this.informShowData.payMoney = Number(val.needSaleMoney) + Number(val.freightMoney)
          this.informShowData.payMoney = this.informShowData.payMoney.toFixed(2)
        }
      },
      deep: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.countHeight)
    this.countHeight()
    this.type = this.$route.query.type // 用来切换上面的筛选条件
    this.requestData['_function'] = this.$route.query.type // 防止刷新页面的时候请求参数拿不到的问题
    this.requestData.status = ''
    this.requestListAllOrder()
    this.getSales()
    if (!localStorage.getItem('bankList')) {
      this.getBank()
    }
  },
  methods: {
    // 获取销售员
    getSales() {
      newRequest({
        url: '/crm/user/User/getSales',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.sales = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取上面所有的统计数
    getCount() {
      newRequest({
        url: '/redwood/count/bulk',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          bus.$emit('count', res.obj);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 处理请求参数
    preRequestData() {
      this.requestData.key = this.requestData.key == undefined ? '' : this.requestData.key
      this.requestData.createTimeBegin = this.requestData.createTimeBegin ? new Date(this.requestData.createTimeBegin)
        .getTime() : ''
      this.requestData.createTimeEnd = this.requestData.createTimeEnd ? new Date(this.requestData.createTimeEnd).getTime() +
        86399000 : ''
      if (this.requestData.createTimeBegin && this.requestData.createTimeEnd && this.requestData.createTimeBegin >
        this.requestData.createTimeEnd) {
        this.$message.error('订单开始时间不能大于结束时间')
        return false
      }
    },
    // 请求所有数据
    requestListAllOrder() {
      this.$store.dispatch('changeload', true)
      this.preRequestData() // 处理请求数据
      this.getCount() // 请求数据的同时获取tab上面的统计数
      this.requestData.export = ''
      newRequest({
        url: '/redwood/bulk',
        method: 'get',
        data: this.requestData
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.pagation.pageNumber = res.page.pageNumber
          this.pagation.pageSize = res.page.pageSize
          this.pagation.totalCount = res.page.totalCount
          this.requestData.pageSize = res.page.pageSize
          this.requestData.pageNumber = res.page.pageNumber
          this.result = res.page.result
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 点击搜索按钮进行搜索
    search() {
      Object.assign(this.requestData, {
        pageNumber: 1
      })
      this.requestListAllOrder()
    },
    // 导出数据
    exportExcel() {
      this.preRequestData()
      this.requestData.export = 1
      newRequest({
        url: '/redwood/bulk',
        method: 'get',
        data: this.requestData
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          window.open(res.obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 点击报价或者编辑尾款按钮
    offer(editType, reqNumber, customerId) {
      var obj = {}
      obj.editType = editType // 编辑尾款和报价共用一个页面只是传入的状态不同进行区分
      obj.reqNumber = reqNumber
      obj.customerId = customerId
      localStorage.removeItem('guiderOfferMsg');
      localStorage.setItem('guiderOfferMsg', JSON.stringify(obj));
      const host = location.host
      let webUrl = ''
      if (host == 'hspc.soouya.com' || host.indexOf('local') != -1) {
        webUrl = 'http://localhongshan.soouya.com'
      } else if (host.indexOf('test') != -1) {
        webUrl = 'http://testhongshan.soouya.com'
      } else {
        webUrl = 'http://hongshan.soouya.com'
      }
      window.open(webUrl + '/index/guider/bulk/quoteAndEdit')
    },
    // 取消订单
    showCancelDialog(data, status) {
      Object.assign(this.cancelDialogConfig, {
        data,
        isShow: true
      })
      Object.assign(this.cancelForm, {
        orderNumber: data.id
      })
    },
    // 确定取消订单
    confirmCancel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmCancelFlag = true // 防止二次提交
          request('/redwood/returnReplaceOnlyRefund/apply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: this.cancelForm
          }).then((response) => {
            this.confirmCancelFlag = false
            if (response.success === '1') {
              this.requestListAllOrder()
              Object.assign(this.cancelDialogConfig, {
                data: null,
                isShow: false
              })
            } else {
              this.$message.error(response.msg)
            }
          })
        }
      })
    },
    // 通知提货
    assign(row) {
      // 清空之前的数据
      this.pickData.sendInneed = null
      this.pickData.freightMoney = ''
      this.pickData.creditType = ''
      this.pickData.returnDate = null
      this.pickData.prepayCredentialUrls = []
      this.pickData.payCredentialUrls = []
      this.pickData.payRemark = ''
      this.pickData.zhifaRemark = ''
      this.pickData.remark = ''
      this.pickData.orderNumber = row.id
      this.pickData.customerId = row.customerId
      newRequest({
        url: '/redwood/bulk/' + row.id,
        method: 'get',
      }).then(res => {
        if (res.success == '1') {
          this.pickData.colors = res.obj.colors.filter(item => item.category == 2) // 出仓内容过滤一下只有是2的情况才能显示
          this.pickData.saleMoney = this.pickData.colors.reduce(function(prev, current, index, array) {
            return prev + (current.quantity * current.salePrice)
          }, 0)
          this.pickData.needSaleMoney = this.pickData.saleMoney.toFixed(2) // 计算应收出仓销售货款
        } else {
          this.$message.error(res.msg)
        }
      })
      var that = this;
      this.hasOverdueDebt(this.pickData) // 判断是否逾期
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: {
          id: this.pickData.customerId
        }
      }).then(data => {
        that.$store.dispatch('changeload', false)
        if (data.success === '1') {
          this.informShowData.customerCompany = row.customerCompany
          this.informShowData.availableBalance = data.obj.availableBalance
          this.informShowData.baitiaoRemainLine = data.obj.baitiaoRemainLine
          this.informShowData.baitiaoCreditLine = data.obj.baitiaoCreditLine
          this.informShowData.baitiaoHoldMoney = data.obj.baitiaoHoldMoney
          this.informShowData.yanzhenRemainLine = data.obj.yanzhenRemainLine
          this.informShowData.yanzhenCreditLine = data.obj.yanzhenCreditLine
          this.informShowData.yanzhenHoldMoney = data.obj.yanzhenHoldMoney
          this.informShowData.remainLine = data.obj.remainLine
          this.informShowData.creditLine = data.obj.creditLine
          this.informShowData.holdMoney = data.obj.holdMoney
          this.informShowData.mobliePhone = data.obj.mobliePhone
          this.informShowData.hasOpenedBaitiao = data.obj.hasOpenedBaitiao
          this.informShowData.hasOpenedYanzhen = data.obj.hasOpenedYanzhen
          this.pickData.isShow = true;
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 确认通知提货
    confirmAssign() {
      if (this.pickData.sendInneed == null) {
        this.$message.error('请选择提货方式')
        return false
      }
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/bulk/assignDeliver',
        method: 'post',
        contentType: 'application/json',
        data: {
          sendInneed: this.pickData.sendInneed,
          orderNumber: this.pickData.orderNumber
        }
      }).then((res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.pickData.isShow = false
          this.pickData.sendInneed == null
          this.$message.success(res.msg)
          this.requestListAllOrder();
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 通知提货的采购确认支付按钮和提交客户支付按钮的共用方法
    informPay(formName, val) {
      this.pickData.payer = Number(val)
      // 点击支付的时候实时请求上面的金额数据防止后台修改数据变动了，但是没反应
      this.hasOverdueDebt(this.pickData) // 判断是否逾期
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: {
          id: this.pickData.customerId
        }
      }).then(data => {
        if (data.success === '1') {
          this.informShowData.availableBalance = data.obj.availableBalance
          this.informShowData.baitiaoRemainLine = data.obj.baitiaoRemainLine
          this.informShowData.baitiaoCreditLine = data.obj.baitiaoCreditLine
          this.informShowData.baitiaoHoldMoney = data.obj.baitiaoHoldMoney
          this.informShowData.yanzhenRemainLine = data.obj.yanzhenRemainLine
          this.informShowData.yanzhenCreditLine = data.obj.yanzhenCreditLine
          this.informShowData.yanzhenHoldMoney = data.obj.yanzhenHoldMoney
          this.informShowData.remainLine = data.obj.remainLine
          this.informShowData.creditLine = data.obj.creditLine
          this.informShowData.holdMoney = data.obj.holdMoney
          this.informShowData.mobliePhone = data.obj.mobliePhone
          this.informShowData.hasOpenedBaitiao = data.obj.hasOpenedBaitiao
          this.informShowData.hasOpenedYanzhen = data.obj.hasOpenedYanzhen
          this.$refs[formName].validate((valid) => {
            if (!valid) {
              return false;
            }
            if (valid && this.pickData.creditType == 4) {
              if (this.informShowData.payMoney > this.informShowData.yanzhenRemainLine) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
            }
            if (valid && this.pickData.creditType == 3) {
              if (this.informShowData.payMoney > this.informShowData.availableBalance) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
            }
            if (valid && this.pickData.creditType == 2) {
              if (this.informShowData.payMoney > this.informShowData.baitiaoRemainLine) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
            }
            if (valid && this.pickData.creditType == 1) {
              if (this.informShowData.payMoney > this.informShowData.remainLine) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
              if (!this.pickData.returnDate) {
                this.$message.error('回款时间必须选择')
                return false
              }
              if (this.pickData.prepayCredentialUrls.length == 0) {
                this.$message.error('必须上传垫付凭据')
                return false
              }
            }
            var obj = JSON.parse(JSON.stringify(this.pickData))
            obj.needSaleMoney = Number(obj.needSaleMoney)
            if (obj.freightMoney) {
              obj.freightMoney = Number(obj.freightMoney)
            } else {
              obj.freightMoney = -1
            }
            if (obj.returnDate) {
              obj.returnDate = +new Date(obj.returnDate) + 86399000
            }
            obj.bulk.sendDirectRemark = obj.zhifaRemark // 接口变动调整两个字段
            delete obj.zhifaRemark
            obj.bulk.customerId = obj.customerId
            delete obj.customerId
            this.$store.dispatch('changeload', true)
            newRequest({
              url: '/redwood/repo/out?_function=pay',
              method: 'post',
              contentType: 'application/json',
              data: obj
            }).then(data => {
              this.$store.dispatch('changeload', false)
              if (data.success === '1') {
                this.pickData.isShow = false
                this.$message.success(data.msg)
                this.requestListAllOrder()
              } else {
                this.$message.error(data.msg)
              }
            })
          })
        }
      })
    },
    // 对提交支付请求回来的颜色信息进行处理
    resetColor(result) {
      this.newColors = [];
      if (!result.length) return;
      class Color {
        constructor(name) {
          this.name = name;
          this.checked = false;
          this.show = false;
          this.colorArray = [];
        }
      }
      let unique = (vaule) => {
        if (!this.newColors.length) return true;
        for (let i = 0, len = this.newColors.length; i < len; i++) {
          let item = this.newColors[i];
          if (item.name == vaule) return false;
        }
        return true;
      }
      result.forEach(item => {
        if (unique(item.color.toString())) {
          this.newColors.push(new Color(item.color));
        }
      })
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < this.newColors.length; j++) {
          if (result[i].color == this.newColors[j].name) {
            this.$set(result[i], 'checked', false);
            this.newColors[j].colorArray.push(result[i]);
          }
        }
      }
    },
    // 点击提交支付
    submitForPay(row) {
      this.allChecked = false;
      newRequest({
        url: `/redwood/bulk/toPayColor?orderNumber=${row.id}&needCheck=${row.checkCloth}`,
        method: 'get',
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == '1') {
          this.resetColor(res.result);
        } else {
          this.$message.error(res.msg)
        }
      })
      this.submitData.orderNumber = row.id
      this.submitData.addressProvince = row.addressProvince
      this.submitData.addressCity = row.addressCity
      this.submitData.addressArea = row.addressArea
      this.submitData.addressAddr = row.addressAddr
      this.submitData.addressName = row.addressName
      this.submitData.addressTel = row.addressTel
      this.submitData.addressId = Number(row.addressId)
      this.pickType = row.sendType
      this.submitData.customerId = row.customerId
      this.informShowData.customerCompany = row.customerCompany
      this.showColors = true;
    },
    // 处理提交支付颜色全选的切换
    changeAll() {
      this.newColors.forEach(item => {
        item.show = !!this.allChecked;
      })
    },
    // 处理提交支付颜色列表显示的勾选
    changeColor(item) {
      if (item.show) return;
      item.checked = false;
      item.colorArray.forEach(colorItem => {
        colorItem.checked = false;
      })
    },
    // 处理提交支付某一个颜色下面的信息的勾选
    change(item) {
      for (let i = 0; i < this.newColors.length; i++) {
        if (this.newColors[i].name == item.name) {
          this.newColors[i].colorArray.forEach(colorItem => {
            colorItem.checked = !!item.checked
          })
          return;
        }
      }
    },
    // 提交支付的采购确认支付和提交客户支付共用方法
    informSubmitPay(formName, val) {
      this.submitData.payer = Number(val)
      // 点击支付的时候实时请求上面的金额数据防止后台修改数据变动了，但是没反应
      this.hasOverdueDebt(this.submitData) // 判断是否逾期
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: {
          id: this.submitData.customerId
        }
      }).then(data => {
        if (data.success === '1') {
          this.informShowData.availableBalance = data.obj.availableBalance
          this.informShowData.baitiaoRemainLine = data.obj.baitiaoRemainLine
          this.informShowData.baitiaoCreditLine = data.obj.baitiaoCreditLine
          this.informShowData.baitiaoHoldMoney = data.obj.baitiaoHoldMoney
          this.informShowData.yanzhenRemainLine = data.obj.yanzhenRemainLine
          this.informShowData.yanzhenCreditLine = data.obj.yanzhenCreditLine
          this.informShowData.yanzhenHoldMoney = data.obj.yanzhenHoldMoney
          this.informShowData.remainLine = data.obj.remainLine
          this.informShowData.creditLine = data.obj.creditLine
          this.informShowData.holdMoney = data.obj.holdMoney
          this.informShowData.mobliePhone = data.obj.mobliePhone
          this.informShowData.hasOpenedBaitiao = data.obj.hasOpenedBaitiao
          this.informShowData.hasOpenedYanzhen = data.obj.hasOpenedYanzhen
          this.$refs[formName].validate((valid) => {
            if (!valid) {
              return false;
            }
            if (valid && this.submitData.creditType == 4) {
              if (this.informShowData.payMoney > this.informShowData.yanzhenRemainLine) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
            }
            if (valid && this.submitData.creditType == 3) {
              if (this.informShowData.payMoney > this.informShowData.availableBalance) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
            }
            if (valid && this.submitData.creditType == 2) {
              if (this.informShowData.payMoney > this.informShowData.baitiaoRemainLine) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
            }
            if (valid && this.submitData.creditType == 1) {
              if (this.informShowData.payMoney > this.informShowData.remainLine) {
                this.$message.error('金额不足，请保证账户资金充足')
                return false
              }
              if (!this.submitData.returnDate) {
                this.$message.error('回款时间必须选择')
                return false
              }
              if (this.submitData.prepayCredentialUrls.length == 0) {
                this.$message.error('必须上传垫付凭据')
                return false
              }
            }
            var obj = JSON.parse(JSON.stringify(this.submitData))
            obj.needSaleMoney = Number(obj.needSaleMoney)
            if (obj.freightMoney) {
              obj.freightMoney = Number(obj.freightMoney)
            } else {
              obj.freightMoney = -1
            }
            if (obj.returnDate) {
              obj.returnDate = +new Date(obj.returnDate) + 86399000
            }
            obj.bulk.defaultSendCompany = obj.sendCompany // 接口变动调整三个字段
            delete obj.sendCompany
            obj.bulk.defaultSendTel = obj.sendTel
            delete obj.sendTel
            obj.bulk.customerId = obj.customerId
            delete obj.customerId
            this.$store.dispatch('changeload', true)
            newRequest({
              url: '/redwood/repo/out?_function=pay',
              method: 'post',
              contentType: 'application/json',
              data: obj
            }).then(data => {
              this.$store.dispatch('changeload', false)
              if (data.success === '1') {
                this.submitData.isShow = false
                this.$message.success(data.msg)
                this.requestListAllOrder()
              } else {
                this.$message.error(data.msg)
              }
            })
          })
        }
      })
    },
    // 判断是否逾期
    hasOverdueDebt(submit) {
      newRequest({
        url: '/redwood/count/overDue',
        method: 'get',
        data: {
          customerId: submit.customerId,
          category: 'bulk'
        }
      }).then(res => {
        if (res.success == '1') {
          this.informShowData.hasOverdueDebt = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 选完颜色以后点击下一步
    next() {
      // 清空之前的数据
      this.submitData.freightMoney = ''
      this.submitData.creditType = ''
      this.submitData.returnDate = null
      this.submitData.prepayCredentialUrls = []
      this.submitData.payCredentialUrls = []
      this.submitData.payRemark = ''
      this.submitData.sendCompany = ''
      this.submitData.sendTel = ''
      this.submitData.remark = ''
      this.selectColorList = [];
      this.newColors.forEach(item => {
        item.colorArray.forEach(colorItem => {
          if (colorItem.checked) {
            let tmp = Object.create(colorItem);
            delete tmp.checked;
            this.selectColorList.push(tmp);
          }
        })
      })
      if (this.selectColorList.length == 0) {
        this.$message.error('未选择商品，请选择')
        return false
      }
      let sign = {};
      this.selectColorList.forEach(item => {
        if (sign[item.color]) {
          sign[item.color]++;
          this.$set(item, 'flag', false);
        } else {
          this.$set(item, 'flag', true);
          sign[item.color] = 1;
        }
      })
      this.selectColorList.forEach(item => {
        this.$set(item, 'row', sign[item.color]);
      })
      this.submitData.saleMoney = this.selectColorList.reduce(function(prev, current, index, array) {
        return prev + (current.quantity * current.salePrice)
      }, 0)
      this.submitData.needSaleMoney = this.submitData.saleMoney.toFixed(2) // 计算应收出仓货款
      this.submitData.clothLoneIds = [];
      this.submitData.clothLoneIds = this.selectColorList.map(item => {
        return item.id
      }) // 保存选中的所有布匹的id
      this.submitData.quantity = this.selectColorList.reduce(function(prev, current, index, array) {
        return prev + current.quantity
      }, 0) // 计算数量的总和
      this.submitData.quantityUnit = this.selectColorList[0].quantityUnit
      this.hasOverdueDebt(this.submitData) // 判断是否逾期
      newRequest({ // 重新请求财务那边的账户信息防止修改数据但是不刷新但是有变动
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: {
          id: this.submitData.customerId
        }
      }).then(data => {
        this.$store.dispatch('changeload', false)
        if (data.success === '1') {
          this.informShowData.availableBalance = data.obj.availableBalance
          this.informShowData.baitiaoRemainLine = data.obj.baitiaoRemainLine
          this.informShowData.baitiaoCreditLine = data.obj.baitiaoCreditLine
          this.informShowData.baitiaoHoldMoney = data.obj.baitiaoHoldMoney
          this.informShowData.yanzhenRemainLine = data.obj.yanzhenRemainLine
          this.informShowData.yanzhenCreditLine = data.obj.yanzhenCreditLine
          this.informShowData.yanzhenHoldMoney = data.obj.yanzhenHoldMoney
          this.informShowData.remainLine = data.obj.remainLine
          this.informShowData.creditLine = data.obj.creditLine
          this.informShowData.holdMoney = data.obj.holdMoney
          this.informShowData.mobliePhone = data.obj.mobliePhone
          this.informShowData.hasOpenedBaitiao = data.obj.hasOpenedBaitiao
          this.informShowData.hasOpenedYanzhen = data.obj.hasOpenedYanzhen
          this.showColors = false
          this.submitData.isShow = true
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 回到上一步的操作让用户可以重新增加或者减少选中布匹的信息
    prev() {
      this.showColors = true
      this.submitData.isShow = false
    },
    // 获取地址列表
    changeAddress() {
      let obj = {}
      obj.userId = this.submitData.customerId
      newRequest({
        url: '/redwood/buyfollow/Address/list',
        data: obj,
        method: 'post',
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.addrList = res.result
          this.changeAddrVisable = true
        } else {
          this.$message.error('获取收货地址失败')
        }
      })
    },
    // 点击编辑地址操作进行信息回显
    handleEditAddr(item) {
      this.reqAddrParams = item
      this.newEditAddr = true
    },
    // 点击新增地址按钮，清空弹框里面的数据
    handleNewAddr() {
      this.reqAddrParams.id = ''
      this.reqAddrParams.name = ''
      this.reqAddrParams.tel = ''
      this.reqAddrParams.province = ''
      this.reqAddrParams.city = ''
      this.reqAddrParams.area = ''
      this.reqAddrParams.addr = ''
      this.newEditAddr = true
    },
    handleDeleteAddr(item) {
      let obj = {
        id: item.id
      }
      newRequest({
        url: '/redwood/buyfollow/Address/delete',
        data: obj,
        method: 'post',
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          if (this.addrList.length > 1 && item.id === this.submitData.addressId) {
            this.submitData.addressId = this.addrList[1].id
          }
          this.changeAddress() // 删除以后刷新地址列表
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 监控修改地址的时候输入框没有值不让点击保存按钮
    checkOutInput() {
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
    // 选完省市区的时候把信息存下来
    handleNewAddrSelection(val) {
      this.reqAddrParams.province = val.province
      this.reqAddrParams.city = val.city
      this.reqAddrParams.area = val.area
    },
    // 点击新增/编辑保存按钮
    handleSaveNewEditAddr(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.reqAddrParams.id) { // 确定修改信息
          this.reqAddrParams.userId = this.submitData.customerId
          this.reqAddrParams.haveSendCompany = 0
          newRequest({
            url: '/redwood/buyfollow/Address/update',
            data: this.reqAddrParams,
            method: 'post',
            contentType: 'application/json',
          }).then((res) => {
            if (res.success == 1) {
              this.$message.success(res.msg)
              this.newEditAddr = false
              this.changeAddress()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
        if (valid && !this.reqAddrParams.id) { // 确定新增信息
          this.reqAddrParams.userId = this.submitData.customerId
          newRequest({
            url: '/redwood/buyfollow/Address/add',
            data: this.reqAddrParams,
            method: 'post',
            contentType: 'application/json',
          }).then((res) => {
            if (res.success == 1) {
              this.$message.success(res.msg)
              this.newEditAddr = false
              this.changeAddress()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 点击选好了修改提交支付弹框里面的地址信息
    confirmSelectAddr() {
      this.addrList.forEach(item => {
        if (item.id == this.submitData.addressId) {
          this.submitData.addressName = item.name
          this.submitData.addressTel = item.tel
          this.submitData.addressProvince = item.province
          this.submitData.addressCity = item.city
          this.submitData.addressArea = item.area
          this.submitData.addressAddr = item.addr
          this.changeAddrVisable = false
        }
      })
    },
    // 上传垫付凭据成功以后增加垫付凭据图片
    handlePrepayUrlSuccess(file, fileList) {
      if (this.pickData.prepayCredentialUrls.length < 9 && this.pickData.isShow) {
        this.pickData.prepayCredentialUrls.push(file.imgUrl)
      }
      if (this.submitData.prepayCredentialUrls.length < 9 && this.submitData.isShow) {
        this.submitData.prepayCredentialUrls.push(file.imgUrl)
      }
    },
    // 删除垫付凭据
    delPrepayCredentialUrl(index) {
      if (this.pickData.isShow) {
        this.pickData.prepayCredentialUrls.splice(index, 1)
      }
      if (this.submitData.isShow) {
        this.submitData.prepayCredentialUrls.splice(index, 1)
      }
    },
    // 上传付款凭据成功以后增加付款凭据图片
    handlePayUrlSuccess(file, fileList) {
      if (this.pickData.payCredentialUrls.length < 9 && this.pickData.isShow) {
        this.pickData.payCredentialUrls.push(file.imgUrl)
      }
      if (this.submitData.payCredentialUrls.length < 9 && this.submitData.isShow) {
        this.submitData.payCredentialUrls.push(file.imgUrl)
      }
    },
    // 删除付款凭据
    delPayCredentialUrl(index) {
      if (this.pickData.isShow) {
        this.pickData.payCredentialUrls.splice(index, 1)
      }
      if (this.submitData.isShow) {
        this.submitData.payCredentialUrls.splice(index, 1)
      }
    },
    // 上传失败的时候取消loding状态
    handleError(file, fileList) {
      this.$store.dispatch('changeload', false)
    },
    // 申请退换货
    applyReturn(row) {
      newRequest({
        url: '/redwood/reposity/InReposity/listForReturnReplace',
        method: 'get',
        data: {
          orderNumber: row.id
        }
      }).then(res => {
        if (res.success == 1) {
          if (res.result.length == 0) {
            this.$message.error('暂无符合退换货条件的商品')
          }
          if (res.result.length == 1) {
            this.$router.push({
              name: 'guiderRrApply',
              query: {
                id: res.result[0].id
              }
            })
          }
          if (res.result.length > 1) {
            this.returnResult = res.result
            this.returnShow = true
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 确定退换货
    confirmReturn() {
      if (!this.returnId) {
        this.$message.error('请选择入仓单号')
        return false
      }
      this.$router.push({
        name: 'guiderRrApply',
        query: {
          id: this.returnId
        }
      })
    },
    // 提前获取银行的列表，在报价页面添加供应商收款方式的时候用到
    getBank() {
      newRequest({
        url: '/redwood/sys/BankAccount/bankTree.do',
        method: 'post',
      }).then((res) => {
        if (res.success == 1) {
          var str = JSON.stringify(res.result)
          localStorage.setItem('bankList', str);
        }
      })
    },
    // 调整table的高度随着页面窗口变动高度
    countHeight() {
      this.height = String(document.documentElement.clientHeight - 320)
    }
  },
  computed: {
    // 通知提货的采购确认支付允许提交条件
    canInformPay() {
      if (this.pickData.creditType == 2 || this.pickData.creditType == 4 || !this.pickData.creditType) {
        return false
      }
      if (this.pickData.creditType == 1 && this.informShowData.hasOpenedBaitiao == 1) {
        return false
      }
      if (this.pickData.creditType == 1 && this.informShowData.hasOpenedYanzhen == 1) {
        return false
      }
      return true
    },
    // 通知提货的提交客户支付允许点击条件
    canSubmitPay() {
      if (this.pickData.creditType == 3 || !this.pickData.creditType) {
        return false
      }
      if (!this.informShowData.mobliePhone) {
        return false
      }
      return true
    },
    // 提交支付的采购确认支付允许提交条件
    canInformPay1() {
      if (this.submitData.creditType == 2 || this.submitData.creditType == 4 || !this.submitData.creditType) {
        return false
      }
      if (this.submitData.creditType == 1 && this.informShowData.hasOpenedBaitiao == 1) {
        return false
      }
      if (this.submitData.creditType == 1 && this.informShowData.hasOpenedYanzhen == 1) {
        return false
      }
      return true
    },
    // 提交支付的提交客户支付允许提交条件
    canSubmitPay1() {
      if (this.submitData.creditType == 3 || !this.submitData.creditType) {
        return false
      }
      if (!this.informShowData.mobliePhone) {
        return false
      }
      return true
    },
    // 可以点余额支付选项的条件
    canYuePay() {
      if (this.informShowData.payMoney > this.informShowData.availableBalance) {
        return false
      }
      return true
    },
    // 可以点击白条支付选项的条件
    canBaitiaoPay() {
      if (this.informShowData.hasOverdueDebt == 1 || this.informShowData.hasOpenedBaitiao == 0) {
        return false
      }
      if (this.informShowData.payMoney > this.informShowData.baitiaoRemainLine) {
        return false
      }
      return true
    },
    // 可以点击信贷支付选项的条件
    canYanzhenPay() {
      if (this.informShowData.hasOverdueDebt == 1 || this.informShowData.hasOpenedYanzhen == 0) {
        return false
      }
      if (this.informShowData.payMoney > this.informShowData.yanzhenRemainLine) {
        return false
      }
      return true
    },
    // 可以点击垫付支付选项的条件
    canDianfuPay() {
      if (this.informShowData.hasOverdueDebt == 1) {
        return false
      }
      if (this.informShowData.payMoney > this.informShowData.remainLine) {
        return false
      }
      return true
    },
    // 允许确定申请退换货的按钮点击
    canConfirmReturn() {
      if (this.returnId == null) {
        return false
      }
      return true
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.countHeight)
  }
}

</script>
<style lang="scss">
.addr-dlg .el-radio__label {
  display: none;
}

</style>
