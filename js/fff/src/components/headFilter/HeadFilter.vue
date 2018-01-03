<template>
  <div class='c-header'>
    <el-row :gutter="10">
      <el-col :span="4" v-if="['dsf', 'ysf'].indexOf(pathFrom) > -1">
        <p>单号</p>
        <el-input @keyup.enter.native="search" placeholder="单号" v-model="params.returnReplaceNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['dhr', 'jbr','ddz'].indexOf(pathFrom) < 0">
        <p>订单号</p>
        <el-input @keyup.enter.native="search" placeholder="订单号" v-model="params.orderNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['ddz'].indexOf(pathFrom) > -1">
          <p>对账单号</p>
          <el-input @keyup.enter.native="search" placeholder="对账单号" v-model="params.numberLike" class='fl'>
          </el-input>
        </el-col>
      <el-col :span="4" v-if="['ydz'].indexOf(pathFrom) > -1">
          <p>账单号/批次号</p>
          <el-input @keyup.enter.native="search" placeholder="对账单号" v-model="params.billNumber" class='fl'>
          </el-input>
        </el-col>
      <el-col :span="4" v-if="['khzf','hkd', 'hky', 'fkd', 'fky', 'yfd', 'yfy', 'ksd', 'ksy', 'khqk', 'ydz', 'djs', 'dsqk', 'ysqk'].indexOf(pathFrom) > -1">
        <p>出仓单号</p>
        <el-input @keyup.enter.native="search" placeholder="出仓单号" v-model="params.outReposityNumber" class='fl'>
        </el-input>
      </el-col>
      </el-col>
      <el-col :span="4" v-if="['待定'].indexOf(pathFrom) > -1">
        <p>入仓单号</p>
        <el-input @keyup.enter.native="search" placeholder="入仓单号" v-model="params.inReposityNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['thhdd','tbkd', 'tbky'].indexOf(pathFrom) > -1">
        <p>退换货单号</p>
        <el-input @keyup.enter.native="search" placeholder="退换货单号" v-model="params.number" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['dsqk', 'ysqk'].indexOf(pathFrom) > -1">
        <p>欠款用户</p>
        <el-input @keyup.enter.native="search" placeholder="欠款用户" v-model="params.user" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['dsqk', 'ysqk'].indexOf(pathFrom) > -1 || (pathFrom == 'khqk' || pathFrom == 'ydz') && currentTab == 2">
        <P>用户ID</P <el-input @keyup.enter.native="search" placeholder="用户ID" v-model="params.userNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['tck1', 'ytk'].indexOf(pathFrom) > -1">
        <p>单号</p>
        <el-input @keyup.enter.native="search" placeholder="单号" v-model="params.number" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['ksd', 'ksy'].indexOf(pathFrom) > -1">
        <p>扣数单号</p>
        <el-input @keyup.enter.native="search" placeholder="扣数单号" v-model="params.number" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['thhdd','khzf', 'qbdd','lxjs', 'syfk', 'yfd', 'yfy', 'jbd', 'jby', 'tckl', 'ytk', 'dsf', 'ysf', 'djs'].indexOf(pathFrom) > -1">
        <p>采购商</p>
        <el-input @keyup.enter.native="search" placeholder="采购商" v-model="params.buyerCompany">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['hkd', 'hky', 'fkd', 'fky', 'tbkd', 'tbky','dfz', 'ksd', 'ksy','yfz'].indexOf(pathFrom) > -1 || (pathFrom == 'ydz' && currentTab != 2) || (pathFrom == 'khqk' && currentTab != 2)">
        <p>采购商/ID</p>
        <el-input @keyup.enter.native="search" placeholder="采购商/ID" v-model="params.customerCompany">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['ddz'].indexOf(pathFrom) > -1">
          <p>采购商/ID</p>
          <el-input @keyup.enter.native="search" placeholder="采购商/ID" v-model="params.customerLike">
          </el-input>
        </el-col>
      <el-col :span="4" v-if="['jbd', 'jby'].indexOf(pathFrom) > -1">
        <p>剪版员</p>
        <el-input @keyup.enter.native="search" placeholder="剪版员" v-model="params.cutterName">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['dsf', 'ysf', 'djs'].indexOf(pathFrom) > -1">
        <p>采购商ID</p>
        <el-input @keyup.enter.native="search" placeholder="采购商ID" v-model="params.buyerNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['thhdd','khzf', 'qbdd','lxjs','syfk','yfd', 'yfy', 'jbd', 'jby', 'ksd', 'ksy', 'tkcl', 'ytk', 'dsf', 'ysf'].indexOf(pathFrom) > -1">
        <p>供应商</p>
        <el-input @keyup.enter.native="search" placeholder="供应商" v-model="params.shopName" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['tbkd', 'tbky','dfz', 'yfz'].indexOf(pathFrom) > -1">
        <p>供应商/ID</p>
        <el-input @keyup.enter.native="search" placeholder="供应商/ID" v-model="params.shopCompany" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['yfd', 'yfy'].indexOf(pathFrom) > -1">
        <p>仓库员</p>
        <el-input @keyup.enter.native="search" placeholder="仓库员" v-model="params.reposityName" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['tkcl', 'ytk', 'dsf', 'ysf'].indexOf(pathFrom) > -1">
        <p>供应商ID</p>
        <el-input @keyup.enter.native="search" placeholder="供应商ID" v-model="params.sellerNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="pathFrom == 'ysf' && currentTab == 2">
        <p>批次号</p>
        <el-input @keyup.enter.native="search" placeholder="批次号" v-model="params.batchNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['khqk', 'ydz', 'djs', 'dsqk'].indexOf(pathFrom) > -1">
        <p>订单类型</p>
        <el-select v-model="params.category" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in categoryOption" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['syfk'].indexOf(pathFrom) > -1">
        <p>状态</p>
        <el-select v-model="params.repaymentLoanSoouyaLoanStatus" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in soouyaLoanOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="[''].indexOf(pathFrom) > -1">
        <p>对账状态</p>
        <el-select v-model="params.status" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in checkAccountStatus" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['khzf', 'khqk', 'ydz', 'dfz', 'yfz'].indexOf(pathFrom) > -1">
        <p>金融客户</p>
        <el-select v-model="params.customerType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in isBaitiaoAccount" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['khqk', 'ydz'].indexOf(pathFrom) > -1">
        <p>是否还款给徙木/雁阵</p>
        <el-select v-model="params.repaymentStatus" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in repaymentStatusOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['khzf', 'ydz'].indexOf(pathFrom) > -1">
        <p>支付方式</p>
        <el-select v-model="params.creditType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in creditTypeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['khqk'].indexOf(pathFrom) > -1">
        <p>支付方式</p>
        <el-select v-model="params.creditType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in creditTypeOptions2" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['fkd', 'fky'].indexOf(pathFrom) > -1">
        <p>放款来源</p>
        <el-select v-model="params.creditType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in creditTypeOptions3" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['hkd', 'hky'].indexOf(pathFrom) > -1">
        <p>还款对象</p>
        <el-select v-model="params.creditType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in creditTypeOptions3" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['khzf'].indexOf(pathFrom) > -1">
        <p>支付来源</p>
        <el-select v-model="params.paySource" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in paySourceOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['tbkd', 'tbky'].indexOf(pathFrom) > -1">
        <p>款项类型</p>
        <el-select v-model="params.moneyType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in moneyTypeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['dfz', 'yfz', 'ytk'].indexOf(pathFrom) > -1">
        <p>款项类型</p>
        <el-select v-model="params.fundType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in fundTypeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['dfz'].indexOf(pathFrom) > -1">
        <p>分账类型</p>
        <el-select v-model="params.needToPaySeller" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in needToPaySellerOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['thhdd','tbkd', 'tbky'].indexOf(pathFrom) > -1">
        <p>退换类型</p>
        <el-select v-model="params.type" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in typeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['待定'].indexOf(pathFrom) > -1">
        <p>退换货状态</p>
        <el-select v-model="params.status" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in thStatusOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['fklb', 'ytk', 'tkjl'].indexOf(pathFrom) > -1">
        <p>流水号</p>
        <el-input @keyup.enter.native="search" placeholder="流水号" v-model="params.transactionNo" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['yfz', 'fklb', 'ytk', 'tkjl'].indexOf(pathFrom) > -1">
        <p>易付宝订单号</p>
        <el-input @keyup.enter.native="search" placeholder="易付宝订单号" v-model="params.yfbOrderNumber" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['jbd', 'jby'].indexOf(pathFrom) > -1 || (pathFrom == 'ysf' && currentTab == 2)">
        <p>码单编号</p>
        <el-input @keyup.enter.native="search" placeholder="码单编号" v-model="params.madan" class='fl'>
        </el-input>
      </el-col>

      <el-col :span="4" v-if="['待定'].indexOf(pathFrom) > -1">
        <p>跟单员</p>
        <el-input @keyup.enter.native="search" placeholder="姓名/手机号" v-model="params.follower" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['待定'].indexOf(pathFrom) > -1">
        <p>买货员</p>
        <el-input @keyup.enter.native="search" placeholder="姓名/手机号" v-model="params.purchaser" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['thhdd','khzf', 'ksd', 'ksy', 'tbkd', 'tbky', 'dfz', 'yfz', 'khqk', 'ydz'].indexOf(pathFrom) > -1">
        <p>采购员</p>
        <el-input @keyup.enter.native="search" placeholder="姓名/手机号" v-model="params.guiderName" class="fl">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['ddz'].indexOf(pathFrom) > -1">
          <p>采购员</p>
          <el-input @keyup.enter.native="search" placeholder="姓名/手机号" v-model="params.guiderLike" class="fl">
          </el-input>
        </el-col>
      <el-col :span="4" v-if="['hkd', 'hky','fky','fkd','thhdd','khzf', 'tbkd', 'tbky', 'dfz', 'yfz', 'khqk', 'ydz'].indexOf(pathFrom) > -1">
        <p>销售员</p>
        <el-input @keyup.enter.native="search" placeholder="姓名/手机号" v-model="params.salerName" class="fl">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['ddz'].indexOf(pathFrom) > -1">
          <p>销售员</p>
          <el-input @keyup.enter.native="search" placeholder="姓名/手机号" v-model="params.salerLike" class="fl">
          </el-input>
        </el-col>
        <el-col :span="4" v-if="['ddz'].indexOf(pathFrom) > -1">
            <p>单号</p>
            <el-input @keyup.enter.native="search" placeholder="出仓单/订单/扣数单" v-model="params.subNumberLike" class="fl">
            </el-input>
          </el-col>
      <el-col :span="4" v-if="['ksd', 'ksy'].indexOf(pathFrom) > -1">
        <p>扣数金额</p>
        <el-input @keyup.enter.native="search" placeholder="扣数金额" v-model="params.kouShuMoney" class="fl">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['khzf'].indexOf(pathFrom) > -1">
        <p>支付金额</p>
        <el-input @keyup.enter.native="search" placeholder="支付金额" v-model="params.usedMoney" class="fl">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['yfd', 'yfy', 'jbd', 'jby'].indexOf(pathFrom) > -1">
        <p>报销金额</p>
        <el-input @keyup.enter.native="search" placeholder="报销金额" v-model="params.baoxiaoMoney" class="fl">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['lxjs','syfk','fkd', 'fky'].indexOf(pathFrom) > -1">
        <p>放款金额</p>
        <el-input @keyup.enter.native="search" placeholder="放款金额" v-model="params.loanMoney" class="fl">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['tbkd', 'tbky'].indexOf(pathFrom) > -1">
        <p>实收实付款</p>
        <el-input @keyup.enter.native="search" placeholder="实收实付款" v-model="params.realMoney" class="fl">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="(pathFrom == 'ysf' && currentTab != 3) || (pathFrom == 'dsf' && currentTab != 3)">
        <p>销账人员</p>
        <el-input @keyup.enter.native="search" placeholder="姓名/手机号" v-model="params.purchaserName" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="(pathFrom == 'dsf' || pathFrom == 'ysf') && currentTab == 1">
        <p>到账金额</p>
        <el-input @keyup.enter.native="search" placeholder="到账金额" v-model="params.incomeMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['hkd'].indexOf(pathFrom) > -1">
        <p>应还款金额</p>
        <el-input @keyup.enter.native="search" placeholder="应还款金额" v-model="params.needRepaymentMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['hky'].indexOf(pathFrom) > -1">
        <p>已还款金额</p>
        <el-input @keyup.enter.native="search" placeholder="已还款金额" v-model="params.hadRepaymentMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="(pathFrom == 'dsf' || pathFrom == 'ysf') && currentTab == 2">
        <p>销账金额</p>
        <el-input @keyup.enter.native="search" placeholder="销账金额" v-model="params.xiaozhangMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="(pathFrom == 'dsf' || pathFrom == 'ysf') && currentTab == 3">
        <p>退款金额</p>
        <el-input @keyup.enter.native="search" placeholder="退款金额" v-model="params.refundMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['qbdd'].indexOf(pathFrom) > -1">
        <p>申请金额</p>
        <el-input @keyup.enter.native="search" placeholder="申请金额" v-model="params.totalMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['ksd', 'ksy'].indexOf(pathFrom) > -1">
        <p>退款金额</p>
        <el-input @keyup.enter.native="search" placeholder="退款金额" v-model="params.tuiKuanMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['ksd', 'ksy'].indexOf(pathFrom) > -1">
        <p>扣数类型</p>
        <el-select v-model="params.type" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in koushuTypeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['ksy'].indexOf(pathFrom) > -1">
          <p>处理方式</p>
          <el-select v-model="params.handleWay" class='c-select funtype-select'>
            <el-option :key="option.value" v-for="option in koushuHandleOptions" :label="option.label" :value="option.value">
            </el-option>
          </el-select>
        </el-col>
      <el-col :span="4" v-if="(pathFrom == 'ydz' && currentTab == 2)">
        <p>欠款用户</p>
        <el-input @keyup.enter.native="search" placeholder="欠款用户" v-model="params.user" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['lxjs','syfk','hkd', 'hky'].indexOf(pathFrom) > -1">
        <p>徙木/雁阵放款</p>
        <el-select v-model="params.loanStatus" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in loanStatusOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['qbdd'].indexOf(pathFrom) > -1">
        <p>状态</p>
        <el-select v-model="params._function" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in functionOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['hkd', 'hky'].indexOf(pathFrom) > -1">
        <p>收回客户欠款</p>
        <el-select v-model="params.payStatus" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in loanStatusOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="pathFrom == 'ydz' && currentTab == 2 ">
        <p>欠款用户类型</p>
        <el-select v-model="params.userType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in userTypeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-show="(pathFrom == 'dsf' && currentTab == 1) || (pathFrom == 'ysf' && currentTab == 1) || pathFrom == 'dsqk'">
        <p>财务收款账户</p>
        <el-select v-model="params.financeAccount" class='c-select'>
          <el-option :key="list.bankName" v-for="list in financeAccountList" :label="list.bankName" :value="list.bankNumber">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="(pathFrom == 'dsf' && currentTab == 1) || (pathFrom == 'ysf' && currentTab == 1)">
        <p>销账类型</p>
        <el-select v-model="params.returnReplaceType" class='c-select'>
          <el-option :key="list.value" v-for="list in returnReplaceTypeList" :label="list.label" :value="list.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="(pathFrom == 'dsf' && currentTab == 2) || (pathFrom == 'ysf' && currentTab == 2)">
        <p>销账类型</p>
        <el-select v-model="params.returnReplaceType" class='c-select'>
          <el-option :key="list.value" v-for="list in returnReplaceTypeList2" :label="list.label" :value="list.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="(pathFrom == 'dsf' && currentTab == 3) || (pathFrom == 'ysf' && currentTab == 3)">
        <p>销账类型</p>
        <el-select v-model="params.returnReplaceType" class='c-select'>
          <el-option :key="list.value" v-for="list in returnReplaceTypeList3" :label="list.label" :value="list.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['dfz'].indexOf(pathFrom) > -1">
        <p>{{toPayMoneyString(pathFrom)}}</p>
        <el-input @keyup.enter.native="search" :placeholder="toPayMoneyString(pathFrom)" v-model="params.toPayMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['khqk', 'ydz', 'djs', 'dsqk'].indexOf(pathFrom) > -1">
        <p>{{totalMoneyString()}}</p>
        <el-input @keyup.enter.native="search" :placeholder="totalMoneyString()" v-model="params.totalMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['yfz'].indexOf(pathFrom) > -1">
        <p>已付款金额</P>
        <el-input @keyup.enter.native="search" placeholder="已付款金额" v-model="params.toPayMoney" class='fl'>
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['dsqk', 'ysqk'].indexOf(pathFrom) > -1">
        <p>采购商结算周期</p>
        <el-select v-model="params.billingCycle" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in periodOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['fklb','tkjl'].indexOf(pathFrom) > -1">
        <p>收款方姓名</P>
        <el-input @keyup.enter.native="search" placeholder="收款方姓名" v-model="params.accountName">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['fklb', 'tkjl'].indexOf(pathFrom) > -1">
        <p>收款方银行账号</P>
        <el-input @keyup.enter.native="search" placeholder="收款方银行账号" v-model="params.accountNumber">
        </el-input>
      </el-col>
      <el-col :span="4" v-if="['fklb'].indexOf(pathFrom) > -1">
        <p>支付状态</p>
        <el-select v-model="params.payStatus" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in payStatusOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="['fklb', 'tkjl'].indexOf(pathFrom) > -1">
        <p>收款方账号类型</p>
        <el-select v-model="params.accountType" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in accountTypeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class='time-col' v-if="['djs', 'dhr'].indexOf(pathFrom) < 0">
        <p v-if="pathFrom == 'dfz'">进入待分账日期</p>
        <p v-if="pathFrom == 'yfz'">分账时间</p>
        <p v-if="pathFrom == 'ddz'">提交日期</p>
        <p v-if="pathFrom == 'khqk'">进入待收欠款日期</p>
        <p v-if="pathFrom == 'dsqk'">进入待收欠款日期</p>
        <p v-if="pathFrom == 'ysqk'">收欠款时间</p>
        <p v-if="pathFrom == 'ydz'">对账日期</p>
        <p v-if="pathFrom == 'fklb'">完成时间</p>
        <p v-if="pathFrom == 'dsf'">{{ currentTab == 1 ? '进入待收款日期' : (currentTab == 2 ? '进入待销账日期' : '进入待退款日期')}}</p>
        <p v-if="pathFrom == 'ysf'">{{ currentTab == 1 ? '收款日期' : (currentTab == 2 ? '销账日期' : '退款日期')}}</p>
        <p v-if="pathFrom == 'tbkd'">进入待处理时间</p>
        <p v-if="pathFrom == 'tbky'">处理时间</p>
        <p v-if="pathFrom == 'ksd'">提交时间</p>
        <p v-if="pathFrom == 'ksy'">处理时间</p>
        <p v-if="['jbd', 'jby'].indexOf(pathFrom) > -1">报销时间</p>
        <p v-if="pathFrom == 'yfd'">进入待报销时间</p>
        <p v-if="pathFrom == 'yfy'">报销时间</p>
        <p v-if="pathFrom == 'fkd'">进入待放款时间</p>
        <p v-if="pathFrom == 'fky'">放款时间</p>
        <p v-if="pathFrom == 'hkd'">进入待还款时间</p>
        <p v-if="pathFrom == 'hky'">操作时间</p>
        <p v-if="pathFrom == 'syfk'">白条支付成功时间</p>
        <p v-if="pathFrom == 'lxjs'">放款日期</p>
        <p v-if="pathFrom == 'qbdd'">申请时间</p>
        <p v-if="pathFrom == 'khzf'">支付时间</p>
        <p v-if="pathFrom == 'thhdd'">申请时间</p>
        <el-date-picker class='c-date-start' :default-value="defaultBegin" :editable="false" v-model="params.createTimeBegin" type="datetime" disabledDate='disabledStartDate' placeholder="选择开始时间">
        </el-date-picker>
        <span class='split-text'>至</span>
        <el-date-picker class='c-date-end' :default-value="defaultEnd" :editable="false" v-model="params.createTimeEnd" type="datetime" disabledDate='disabledEndDate' placeholder="选择结束时间">
        </el-date-picker>
      </el-col>
      <template v-if="pathFrom == 'yfz' || (pathFrom == 'ysf' && currentTab == 2)">
        <el-col :span="6">
          <p>&nbsp</p>
          <el-button type="primary" @click.prevent="search">搜索</el-button>
          <el-button type="primary" @click.native="exportHandle" v-if="pathFrom == 'yfz'" :disabled='(!params.createTimeBegin || !params.createTimeEnd)'>导出明细</el-button>
          <el-button type="primary" @click.native="exportEmail" v-if="pathFrom == 'yfz'" :disabled='(!params.createTimeBegin || !params.createTimeEnd)'>导出订单</el-button>
          <el-button type="primary" @click.native="exportHandle2" v-if="(pathFrom == 'ysf' && currentTab == 2)">导出</el-button>
        </el-col>
      </template>
      <template v-else>
        <el-col :span="2" style="text-align: right">
          <p>&nbsp</p>
          <el-button type="primary" @click.prevent="search">搜索</el-button>
        </el-col>
      </template>
      <slot name="headFilterSlot" :scope="params"></slot>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.fl {
  float: left;
  margin-right: 40px;
}

.button {
  vertical-align: middle;
}

.clear-time {
  vertical-align: middle;
  margin-left: 0px;
  padding: 10px;
  margin-top: -1px;
  border-radius: 0 4px 4px 0;
  &:hover {
    border-color: #C0CCDA;
  }
}
</style>
<style lang="scss">
.c-header {
  padding: 10px 10px;
  margin-bottom: 10px;
  background-color: #fff;
  .el-col {
    .el-input {
      min-width: 100px;
      max-width: 250px;
    }
    .el-select {
      min-width: 100px;
      max-width: 250px;
      width: inherit;
    }
    margin-bottom: 15px;
    p {
      margin-bottom: 5px;
      width: 250px;
      color: #aaa;
      font-size: 12px;
    }
  }
}

p {
  font-size: 14px;
}

.time-col {
  min-width: 450px;
}

.funtype-select {
  .el-input {
    min-width: 100px;
    max-width: 250px;
  }
}

.c-select {
  display: table-cell;
  .el-input {
    min-width: 100px;
    max-width: 250px;
  }
  .el-input__inner {
    border-radius: 0 4px 4px 0 !important;
  }
}

.front-label {
  margin-right: -5px;
  background-color: #f9fafc;
  color: #99a9bf;
  vertical-align: middle;
  display: inline-block;
  position: relative;
  border: 1px solid #C0CCDA;
  border-radius: 4px;
  padding: 0 12px;
  line-height: 34px;
  white-space: nowrap;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.split-text {
  line-height: 35px;
}

.c-date-start {
  min-width: 150px;
  max-width: 250px;
  display: inline-block;
  vertical-align: middle;
  .el-date-editor__editor {
    border-radius: 0 4px 4px 0 !important;
  }
}

.c-date-end {
  min-width: 150px;
  max-width: 250px;
  width: inherit;
  vertical-align: middle;
  .el-date-editor__editor {
    border-radius: 4px 0 0 4px !important;
  }
}
</style>
<script>
const pathFromObj = {
  '/finance/newCheckAccount': 'ddz', // 待对账
  '/finance/checkAccount': 'ddz', // 待对账
  '/finance/checkAccount/WaitingAccount': 'djs', // 待结算
  '/finance/pendingAccount': 'dfz', // 待分账
  '/finance/splitAccount': 'yfz', // 已分账
  '/finance/splitAccount/list': 'fklb', // 已分账
  '/finance/newReconciliation': 'ydz', // 已对账
  '/finance/reconciliation': 'ydz', // 已对账
  '/refund/refundment': 'tkcl', // 退款处理
  '/refund/refunded': 'ytk', // 已退款
  '/refund/refunded/records': 'tkjl', // 退款记录
  '/exchange/hasGetAndPay': 'ysf', // 已收付
  '/exchange/unGetAndPay': 'dsf', // 待收付
  '/finance/oldCheckAccount': 'ddz',
  '/finance/debt/undone': 'dsqk',
  '/finance/debt/done': 'ysqk',
  '/finance/exchange/undone': 'tbkd', // 退补款处理待处理
  '/finance/exchange/done': 'tbky', // 退补款已处理
  '/finance/deduction/undone': 'ksd', // 扣数待处理
  '/finance/deduction/done': 'ksy', // 扣数已处理
  '/reimburse/cut/undone': 'jbd', // 剪版待报销
  '/reimburse/cut/done': 'jby', // 剪版已报销
  '/reimburse/freight/undone': 'yfd', // 运费待报销
  '/reimburse/freight/done': 'yfy', // 运费已报销
  '/baitiao/loan/loanexportto': 'fkd', // 待放款
  '/baitiao/loan/loanexportdone': 'fky', // 已放款
  '/baitiao/repayment/repaymentlistto': 'hkd', // 待还款
  '/baitiao/repayment/repaymentlistdone': 'hky', // 已还款
  '/baitiao/shop/shopLoan': 'syfk', // 搜芽放款
  '/baitiao/shop/shopInterest': 'lxjs', // 利息结算
  '/baitiao/shop/shopAll': 'qbdd', // shop全部订单
  '/orderManage/customerPay': 'khzf', // 客户支付列表
  '/orderManage/debtOrder': 'khqk', // 客户欠款订单
  '/orderManage/exchangeOrder': 'thhdd', // 退换货订单
  '/orderManage/newBulkReport': 'dhr', // 大货report
  '/orderManage/jianbanReports': 'jbr', // 剪版report
}
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
import {
  request,
  setCache,
  getCache
} from 'src/common/utils.js'
export default {
  props: {
    param: {
      type: Object,
      required: false,
      default: function(a) {
        return {}
      },
    }
  },
  // 采购商、采购商ID、供应商ID、跟单员、应付款金额
  mounted() {
    const moneyAccountList = getCache({ key: 'moneyAccountList' })
    if (moneyAccountList) {
      this.financeAccountList = moneyAccountList
    } else {
      this.getList(); // 获取财务收款账户列表
    }
  },
  updated() {
  },
  watch: {
    currentTab(val) {
    },
    param: {
      handler: function(newValue, oldValue) {
       for (let val in newValue) {
         if (newValue[val] != undefined) {
          this.params[val] = newValue[val] // 回显搜索的值用的,同时把undefined的值过滤
         }
       }
        if (newValue.currentTab !== oldValue.currentTab) {
        setCache({
          key: 'currentTabForFilter',
          value: newValue.currentTab
        })
      }
      this.currentTab = getCache({
        key: 'currentTabForFilter'
      }) || 1
      },
      deep: true
    }
  },
  data() {
    // const that = this
    const fullPath = this.$route.fullPath
    const params = Object.assign({
      billNumber: '', // 对账单号
      customerType: '', // 是否金融客户
      hadRepaymentMoney: '', // 已还款金额
      inReposityNumber: '', // 入仓单号
      paySource: '', // 支付来源
      usedMoney: '', // 支付金额
      repaymentStatus: '', // 是否还款给徙木
      creditType: '', // 支付方式
      shopCompany: '', // 供应商/ID
      customerCompany: '', // 采购商/ID
      _function: '', // 全部订单状态
      repaymentLoanSoouyaLoanStatus: '', // 搜芽放款状态
      needRepaymentMoney: '', // 应还款金额
      loanStatus: '', // 徙木放款
      loanMoney: '', // 放款金额
      reposityName: '', // 仓库员
      baoxiaoMoney: '', // 报销金额
      cutterName: '', // 剪版员
      tuiKuanMoney: '', // 扣数退款金额
      kouShuMoney: '', // 口述金额
      realMoney: '', // 实收实付款
      type: '', // 退换类型
      handleWay: '', // 扣数处理方式
      moneyType: '', // 退换货款里中的款项类型
      orderNumber: '',
      returnReplaceNumber: '', // 退货单号
      number: '',
      outReposityNumber: '', // 出仓单号
      transactionNo: '',
      yfbOrderNumber: '',
      madan: '',
      shopName: '',
      status: '',
      sellerNumber: '',
      follower: '', // 跟单员
      toPayMoney: '', // 应付/已付款金额
      user: '',
      userNumber: '',
      userType: '',
      fundType: '',
      needToPaySeller: '',
      billingCycle: '',
      buyerCompany: '',
      buyerNumber: '',
      financeAccount: '',
      accountName: '', // 收款方姓名
      accountNumber: '', // 收款方银行账号
      payWay: '',
      payStatus: '', // 支付状态
      accountType: '', // 账户类型
      payType: '',
      createTimeBegin: '',
      createTimeEnd: '',
      returnReplaceType: '', // 销账类型
      purchaserName: '', // 销账人员
      incomeMoney: '', // 到账金额
      xiaozhangMoney: '', // 销账金额
      refundMoney: '', // 退款金额
      category: '', // 订单类型
      batchNumber: '', // 批次号
      purchaser: '',
      buyerHasOpenedBaitiao: '', // 是否白条客户
      // 参数名待定
      guiderName: '', // 采购员
      salesName: '', // 销售员
      numberLike: '', // 待对账单独对账单号
      customerLike: '', // 待对账单独采购商
      salerLike: '', // 待对账单独对销售员
      guiderLike: '', // 待对账单独采购员
      subNumberLike: '', // 待对账单独单号
      // 付款列表特有字段
    }, this.param)
    if (params.createTimeBegin) {
      params.createTimeBegin = new Date(params.createTimeBegin)
    }
    if (params.createTimeEnd) {
      params.createTimeEnd = new Date(params.createTimeEnd)
    }
    return {
      financeAccountList: [], // 收款账户列表
      thStatusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '3310',
          label: '等待退货出仓'
        }, {
          value: '3460',
          label: '等待换货出仓'
        }, {
          value: '3600',
          label: '等待退货入仓'
        }, {
          value: '3510',
          label: '等待完成发货'
        }, {
          value: '3210',
          label: '等待上传验货报告'
        },
      ],
      paySourceOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '客户支付'
        }, {
          value: '2',
          label: '采购代付'
        }, {
          value: '3',
          label: '财务代付'
        }
      ],
      repaymentStatusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }
      ],
      creditTypeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '搜芽额度'
        }, {
          value: '2',
          label: '徙木额度'
        },
        {
          value: '3',
          label: '余额'
        }, {
          value: '4',
          label: '雁阵额度'
        }
      ],
      creditTypeOptions2: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '搜芽额度'
        }, {
          value: '2',
          label: '徙木额度'
        },
        {
          value: '4',
          label: '雁阵额度'
        }
      ],
      creditTypeOptions3: [
        {
          value: '',
          label: '全部'
        }, {
          value: '2',
          label: '徙木金融'
        },
        {
          value: '4',
          label: '雁阵金融'
        }
      ],
      koushuTypeOptions: [ // 扣数类型的选择列表
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '损耗'
        },
        {
          value: '2',
          label: '运费'
        },
        {
          value: '3',
          label: '售后退换货'
        }
      ],
      koushuHandleOptions: [ // 扣数处理方式的选择列表
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '退回账户余额'
        },
        {
          value: '2',
          label: '扣减账户余额'
        },
        {
          value: '3',
          label: '不退/减'
        }
      ],
      functionOptions: [
        {
          value: 'all',
          label: '全部'
        }, {
          value: 'done',
          label: '已完成'
        }, {
          value: 'cancel',
          label: '已取消'
        }, {
          value: 'soouyaLoan',
          label: '搜芽放款'
        }, {
          value: 'soouyaRepayment',
          label: '搜芽放款'
        }, {
          value: 'loan',
          label: '徙木放款'
        }, {
          value: 'customerRepayment',
          label: '客户还款'
        }
      ],
      soouyaLoanOptions: [
        {
          value: '210',
          label: '全部',
        }, {
          value: '0',
          label: '待搜芽放款',
        }, {
          value: '21',
          label: '搜芽已放款'
        }
      ],
      loanStatusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }
      ],
      typeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '售前退货'
        }, {
          value: '2',
          label: '售前换货'
        }, {
          value: '3',
          label: '售后退货'
        }, {
          value: '4',
          label: '售后换货'
        }, {
          value: '5',
          label: '仅退款'
        }
      ],
      moneyTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '供应商退款'
      }, {
        value: '2',
        label: '搜芽补款'
      }, {
        value: '3',
        label: '搜芽退款'
      }],
      categoryOption: [{
        value: '',
        label: '全部'
      }, {
        value: 'bulk',
        label: '大货'
      }, {
        value: 'cut',
        label: '剪版'
      }, {
        value: 'shopBulk',
        label: '第三方订单'
      }],
      fundTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '5',
        label: '全款'
      }, {
        value: '2',
        label: '定金'
      }, {
        value: '3',
        label: '尾款'
      }],
      needToPaySellerOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '需分账'
      }, {
        value: '0',
        label: '无需分账'
      }],
      refundStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '5',
        label: '受理中'
      }, {
        value: '2',
        label: '退款成功'
      }, {
        value: '3',
        label: '退款失败'
      }],
      userTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '采购商'
      }, {
        value: '2',
        label: '供应商'
      }],
      exchangeTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '退货'
      }, {
        value: '2',
        label: '换货'
      }],
      periodOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '月结'
      }, {
        value: '2',
        label: '半月结'
      }, {
        value: '3',
        label: '周结'
      }, {
        value: '4',
        label: '5万结'
      }, {
        value: '5',
        label: '10万结'
      }, {
        value: '6',
        label: '其他'
      }],
      payWayOptions: [{
        value: '',
        label: '全部'
      }, {
        value: 'alipay',
        label: '支付宝'
      }, {
        value: 'tecent_wx',
        label: '微信'
      }, {
        value: 'offline',
        label: '线下支付'
      }],
      payStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '2',
        label: '受理中'
      }, {
        value: '3',
        label: '支付成功'
      }, {
        value: '-1',
        label: '受理失败'
      }, {
        value: '-2',
        label: '支付失败'
      }],
      accountTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '2',
        label: '个人'
      }, {
        value: '1',
        label: '企业'
      }],
      payTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '垫付'
      }, {
        value: '1',
        label: '实付'
      }],
      returnReplaceTypeList: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '售前退货'
      }, {
        value: '2',
        label: '售前换货'
      }, {
        value: '3',
        label: '售后退货'
      }, {
        value: '4',
        label: '售后换货'
      }],
      returnReplaceTypeList2: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '售前退货'
      }, {
        value: '2',
        label: '售前换货'
      }, {
        value: '3',
        label: '售后退货'
      }, {
        value: '4',
        label: '售后换货'
      }, {
        value: '5',
        label: '运费'
      }, {
        value: '6',
        label: '剪版'
      }],
      returnReplaceTypeList3: [{
        value: '',
        label: '全部'
      }, {
        value: '3',
        label: '售后退货'
      }, {
        value: '4',
        label: '售后换货'
      }],
      checkAccountStatus: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '待对账'
        },
        {
          value: -1,
          label: '未提交'
        },
        {
          value: 3,
          label: '待支付'
        },
      ],
      isBaitiaoAccount: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      pathFrom: pathFromObj[fullPath],
      params: params,
      currentTab: '',
      defaultBegin: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate())),
      defaultEnd: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + ' ' + 23 + ':' + 59 + ':' + 59)
    }
  },
  methods: {
    getList() {
      request({
        url: AccountApi.FinanceAccount.list,
        method: 'post',
        data: ''
      }).then(data => {
        if (data.success === '1') {
          data.result.unshift({
            bankName: '全部',
            id: '',
            bankNumber: ''
          })
          this.financeAccountList = data.result
          setCache({
            key: 'moneyAccountList',
            value: data.result
          })
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    clearTime: function(event) {
      this.params.createTimeBegin = '';
      this.params.createTimeEnd = '';
    },
    totalMoneyString: function() {
      let str = ''
      switch (this.pathFrom) {
        case 'khqk':
          str = '应收欠款金额'
          break;
        case 'ydz':
          str = this.currentTab == 2 ? '应收欠款金额' : '实收款'
          break;
        case 'djs':
          str = '应收款金额'
          break;
        case 'dsqk':
          str = '应收欠款金额'
          break;
      }
      return str
    },
    toPayMoneyString: function(type) {
      let str = ''
      switch (type) {
        case 'dfz':
          str = '应付款金额'
          break;
      }
      return str
    },
    disabledStartDate: function() {
      return (new Date(this.params.createTimeBegin).getTime() < new Date(this.params.createTimeEnd).getTime())
    },
    disabledEndDate: function() {
      return (new Date(this.params.createTimeBegin).getTime() > new Date(this.params.createTimeEnd).getTime())
    },
    search: function(event) {
      if (this.timeRange) {
        this.params.createTimeBegin = this.timeRange[0]
        this.params.createTimeEnd = this.timeRange[1]
      }
      const params = {
        billNumber: this.params.billNumber,
        customerType: this.params.customerType,
        hadRepaymentMoney: this.params.hadRepaymentMoney,
        inReposityNumber: this.params.inReposityNumber,
        paySource: this.params.paySource,
        usedMoney: this.params.usedMoney,
        repaymentStatus: this.params.repaymentStatus,
        creditType: this.params.creditType,
        shopCompany: this.params.shopCompany,
        customerCompany: this.params.customerCompany,
        _function: this.params._function,
        repaymentLoanSoouyaLoanStatus: this.params.repaymentLoanSoouyaLoanStatus,
        needRepaymentMoney: this.params.needRepaymentMoney,
        loanStatus: this.params.loanStatus,
        loanMoney: this.params.loanMoney,
        reposityName: this.params.reposityName,
        baoxiaoMoney: this.params.baoxiaoMoney,
        cutterName: this.params.cutterName,
        tuiKuanMoney: this.params.tuiKuanMoney,
        kouShuMoney: this.params.kouShuMoney,
        realMoney: this.params.realMoney,
        type: this.params.type,
        handleWay: this.params.handleWay,
        moneyType: this.params.moneyType,
        orderNumber: this.params.orderNumber,
        returnReplaceNumber: this.params.returnReplaceNumber,
        number: this.params.number,
        outReposityNumber: this.params.outReposityNumber,
        transactionNo: this.params.transactionNo,
        yfbOrderNumber: this.params.yfbOrderNumber,
        madan: this.params.madan,
        shopName: this.params.shopName,
        sellerNumber: this.params.sellerNumber,
        follower: this.params.follower,
        batchNumber: this.params.batchNumber,
        purchaserName: this.params.purchaserName, // 销账人员
        purchaser: this.params.purchaser,
        toPayMoney: this.params.toPayMoney,
        totalMoney: this.params.totalMoney,
        xiaozhangMoney: this.params.xiaozhangMoney,
        returnReplaceType: this.params.returnReplaceType,
        incomeMoney: this.params.incomeMoney,
        refundMoney: this.params.refundMoney,
        user: this.params.user,
        userNumber: this.params.userNumber,
        userType: this.params.userType,
        category: this.params.category,
        fundType: this.params.fundType == '' ? '' : this.params.fundType,
        needToPaySeller: this.params.needToPaySeller == '' ? '' : this.params.needToPaySeller,
        billingCycle: '',
        buyerNumber: this.params.buyerNumber,
        buyerCompany: this.params.buyerCompany,
        financeAccount: this.params.financeAccount == '' ? '' : this.params.financeAccount,
        accountName: this.params.accountName,
        accountNumber: this.params.accountNumber,
        payWay: this.params.payWay == '' ? '' : this.params.payWay,
        payStatus: this.params.payStatus,
        accountType: this.params.accountType,
        payType: this.params.payType == '' ? '' : this.params.payType,
        createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
        createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
        status: this.params.status == '' ? '' : this.params.status,
        buyerHasOpenedBaitiao: this.params.buyerHasOpenedBaitiao,
        salesName: this.params.salesName,
        guiderName: this.params.guiderName,
        numberLike: this.params.numberLike, // 待对账单独对账单号
        customerLike: this.params.customerLike, // 待对账单独采购商
        salerLike: this.params.salerLike, // 待对账单独对销售员
        guiderLike: this.params.guiderLike, // 待对账单独采购员
        subNumberLike: this.params.subNumberLike, // 待对账单独单号
      }
      for (const i in params) {
        if (params[i] === '') {
          delete params[i]
        }
      }
      if (pathFromObj[this.$route.fullPath] == 'fklb') { // 付款列表特殊一些
        const params2 = {
          customerType: this.params.customerType,
          orderNumber: this.params.orderNumber,
          payStatus: this.params.payStatus == '' ? '' : this.params.payStatus,
          accountName: this.params.accountName,
          accountNumber: this.params.accountNumber,
          accountType: this.params.accountType == '' ? '' : this.params.accountType,
          yfbOrderNumber: this.params.yfbOrderNumber == '' ? '' : this.params.yfbOrderNumber,
          transactionNo: this.params.transactionNo == '' ? '' : this.params.transactionNo,
          createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
          createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
        }
        for (const i in params2) {
          if (!params2[i]) {
            delete params2[i]
          }
        }
        this.$emit('getParams', params2)
      } else {
        this.$emit('getParams', params)
      }
    },
    exportHandle: function() {
      this.$emit('exporHandle', {
        confirmPayTimeBegin: new Date(this.params.createTimeBegin).getTime(),
        confirmPayTimeEnd: new Date(this.params.createTimeEnd).getTime()
      })
    },
    exportHandle2: function() {
      if (this.pathFrom === 'ydz') {
        this.$emit('exporHandle', {
          orderNumber: this.params.orderNumber,
          returnReplaceNumber: this.params.returnReplaceNumber,
          number: this.params.number,
          outReposityNumber: this.params.outReposityNumber,
          transactionNo: this.params.transactionNo,
          yfbOrderNumber: this.params.yfbOrderNumber,
          madan: this.params.madan,
          shopName: this.params.shopName,
          sellerNumber: this.params.sellerNumber,
          follower: this.params.follower,
          batchNumber: this.params.batchNumber,
          purchaserName: this.params.purchaserName, // 销账人员
          purchaser: this.params.purchaser,
          toPayMoney: this.params.toPayMoney,
          totalMoney: this.params.totalMoney,
          xiaozhangMoney: this.params.xiaozhangMoney,
          returnReplaceType: this.params.returnReplaceType,
          incomeMoney: this.params.incomeMoney,
          refundMoney: this.params.refundMoney,
          user: this.params.user,
          userNumber: this.params.userNumber,
          userType: this.params.userType,
          category: this.params.category,
          fundType: this.params.fundType == '' ? '' : this.params.fundType,
          billingCycle: '',
          buyerNumber: this.params.buyerNumber,
          buyerCompany: this.params.buyerCompany,
          financeAccount: this.params.financeAccount == '' ? '' : this.params.financeAccount,
          accountName: this.params.accountName,
          accountNumber: this.params.accountNumber,
          payWay: this.params.payWay == '' ? '' : this.params.payWay,
          payStatus: this.params.payStatus,
          accountType: this.params.accountType,
          payType: this.params.payType == '' ? '' : this.params.payType,
          createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
          createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
          status: this.params.status == '' ? '' : this.params.status,
          guiderName: this.params.guiderName,
          salesName: this.params.salesName,
        })
      } else {
        this.$emit('exporHandle', {
          customerType: this.params.customerType,
          orderNumber: this.params.orderNumber,
          returnReplaceNumber: this.params.returnReplaceNumber,
          sellerName: this.params.shopName,
          sellerNumber: this.params.sellerNumber,
          buyerNumber: this.params.buyerNumber,
          buyerCompany: this.params.buyerCompany,
          purchaserName: this.params.purchaserName, // 销账人员
          financeAccount: this.params.financeAccount == '' ? '' : this.params.financeAccount,
          returnReplaceType: this.params.returnReplaceType,
          xiaozhangMoney: this.params.xiaozhangMoney,
          createTimeBegin: new Date(this.params.createTimeBegin).getTime(),
          createTimeEnd: new Date(this.params.createTimeEnd).getTime(),
          purchaser: this.params.purchaser,
          madan: this.params.madan,
          status: this.params.status == '' ? '' : this.params.status,
          buyerHasOpenedBaitiao: this.params.buyerHasOpenedBaitiao,
        })
      }
    },
    exportEmail: function() {
      this.$emit('exporEmail', {
        confirmPayTimeBegin: new Date(this.params.createTimeBegin).getTime(),
        confirmPayTimeEnd: new Date(this.params.createTimeEnd).getTime()
      })
    }
  }
}
</script>
