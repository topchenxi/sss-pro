<template>
  <div class="money-manage-detail" v-loading.body="fullscreenLoading">
    <i class="el-icon-arrow-left goback-icon" @click="$router.go(-1)">返回</i>
    <el-row :gutter="20">
      <el-col :span="6" class="money-msg">
        <!-- <span style="font-weight:600;font-size:16px">采购商资金信息：</span> -->
        <span style="font-size:16px;">{{costomerInfo.buyerCompanyId}}</span>
        </br>
        <el-form label-position="left" style="text-align:left;margin-top:15px">
          <el-form-item label="可用总额：">
            <span style="color:#f00">{{costomerInfo.available | formateNumber}}元</span>
          </el-form-item>
          <el-form-item label="欠款总额：">
            <span style="color:#f00">{{costomerInfo.debt | formateNumber}}元</span>
          </el-form-item>
          <el-form-item label="预扣总额：">
            <span style="color:#f00">{{costomerInfo.totalHold | formateNumber}}元</span>
          </el-form-item>
          <el-form-item label="采购商可用额度：">
            <span style="color:#f00">{{costomerInfo.customerRemainLine | formateNumber}}元</span>
          </el-form-item>
          <el-form-item>
            <el-popover ref="popover1" placement="top-start" title="说明" trigger="hover">
              <li style="list-style:none; color:#696969">
                <ul style="font-size:0.8rem;line-height:22px;">1、可用总额是指可用于支付的资金，为可用余额、可用搜芽额度、可用徙木额度和可用雁阵额度总计。</ul>
                <ul style="font-size: 0.8rem;line-height:22px;">2、欠款总额是指采购商欠款，为已用搜芽额度、已用徙木额度和已用雁阵额度总计。</ul>
                <ul style="font-size:0.8rem;line-height:22px;">3、已用搜芽额度/已用徙木额度/已用雁阵额度是指客户用于支付订单的金额，反映的是客户当前欠款。</ul>
                <ul style="font-size:0.8rem;line-height:22px;">4、不可用余额/不可用搜芽额度/不可用徙木额度/不可用雁阵额度是指预扣金额。</ul>
                <ul style="font-size:0.8rem;line-height:22px;">5、余额是可用余额和不可用余额的总计。</ul>
                <ul style="font-size:0.8rem;line-height:22px;">6、搜芽额度/徙木额度/雁阵额度为搜芽给采购商可透支的资金额度，只能用于支付订单，不能提现。</ul>
              </li>
            </el-popover>
            <i v-popover:popover1 class="el-icon-information" style="color:#2fb468;cursor:pointer">&nbsp说明</i>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="17" class="money-msg" style="padding:0px 10px;">
        <el-row style="border-bottom:1px solid #ddd">
          <el-col :span="12">
            <el-form label-position="left" style="text-align:left;margin-top:15px">
              <el-form-item label="余额：">
                <span style="color:#f00">{{costomerInfo.balance | formateNumber}}元</span>
                <span style="color:#3f3f3f">&nbsp(含不可用余额：{{costomerInfo.unavailableBalance | formateNumber}}元)</span>
              </el-form-item>
              <el-form-item label="可用余额：">
                <span style="color:#f00">{{costomerInfo.availableBalance | formateMoney}}元</span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-button style="margin:25px 10px;" type="primary" @click.native="temCurrentRow=costomerInfo;dialogVisible=true;handlefore();">充值</el-button>
            <el-button style="margin:25px 10px;" type="primary" @click.native="temCurrentRow=costomerInfo;drawCashDialogVisible=true">提现</el-button>
            <el-button style="margin:25px 10px;" type="primary" @click.native="showTransDialog()">转移</el-button>
          </el-col>
        </el-row>
        <el-row style="margin:15px 0px;">
          <el-col :span="8" class="edu-content">
            <span style="font-weight:600">搜芽额度:
              <span style="color:#f00">{{costomerInfo.creditLine | formateNumber}}元</span>
              <el-tooltip v-if="costomerInfo.temporaryTips" class="item" effect="light" :content="costomerInfo.temporaryTips" placement="top-start">
                <i class="el-icon-information" style="color:#2fb468;cursor:pointer"></i>
              </el-tooltip>
            </span>
            <el-button size="mini" type="primary" class="media-margin2" @click.native="adjustShow(1)">临调</el-button>
            <el-button size="mini" type="primary" @click.native="adjustShow(2)">额度调整</el-button>
            <el-row class="eduDetail-content">
              <el-col :span="24" class="noused">
                <span>可用额度：
                  <span class="number">{{costomerInfo.remainLine | formateNumber}}元</span>
                </span>
              </el-col>
              <el-col :span="12">
                <p>{{costomerInfo.usedMoney | formateNumber}}元</p>
                <p class="text">已用额度</p>
              </el-col>
              <el-col :span="12">
                <p>{{costomerInfo.holdMoney | formateNumber}}元</p>
                <p class="text">不可用额度</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" class="edu-content">
            <span style="font-weight:600">徙木额度:
              <span v-if="costomerInfo.hasOpenedBaitiao" style="color:#f00">{{costomerInfo.baitiaoCreditLine | formateNumber}}元</span>
              <span v-else>--</span>
            </span>
            <template v-if="costomerInfo.hasOpenedBaitiao">
              <el-button size="mini" type="primary" @click.native="adjustXimuMoneyVisible=true">额度调整</el-button>
            </template>
            <el-row class="eduDetail-content">
              <el-col :span="24" class="noused">
                <span v-if="costomerInfo.hasOpenedBaitiao">可用额度：
                  <span class="number">{{costomerInfo.baitiaoRemainLine | formateNumber}}元</span>
                </span>
                <span v-else>可用额度：
                  <span class="number">--</span>
                </span>
              </el-col>
              <el-col :span="12">
                <p v-if="costomerInfo.hasOpenedBaitiao">{{costomerInfo.baitiaoUsedMoney | formateNumber}}元</p>
                <p v-else>--</p>
                <p class="text">已用额度</p>
              </el-col>
              <el-col :span="12">
                <p v-if="costomerInfo.hasOpenedBaitiao">{{costomerInfo.baitiaoHoldMoney | formateNumber}}元</p>
                <p v-else>--</p>
                <p class="text">不可用额度</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" class="edu-content">
            <span style="font-weight:600">雁阵额度:
              <span v-if="costomerInfo.hasOpenedYanzhen" style="color:#f00">{{costomerInfo.yanzhenCreditLine | formateNumber}}元</span>
              <span v-else>--</span>
            </span>
            <template v-if="costomerInfo.hasOpenedYanzhen">
              <el-button size="mini" type="primary" @click.native="yanzhenAdjustDialogVisible=true">额度调整</el-button>
            </template>
            <el-row class="eduDetail-content">
              <el-col :span="24" class="noused">
                <span v-if="costomerInfo.hasOpenedYanzhen">可用额度：
                  <span class="number">{{costomerInfo.yanzhenRemainLine | formateNumber}}元</span>
                </span>
                <span v-else>可用额度：
                  <span class="number">--</span>
                </span>
              </el-col>
              <el-col :span="12">
                <p v-if="costomerInfo.hasOpenedYanzhen">{{costomerInfo.yanzhenUsedMoney | formateNumber}}元</p>
                <p v-else>--</p>
                <p class="text">已用额度</p>
              </el-col>
              <el-col :span="12">
                <p v-if="costomerInfo.hasOpenedYanzhen">{{costomerInfo.yanzhenHoldMoney | formateNumber}}元</p>
                <p v-else>--</p>
                <p class="text">不可用额度</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="condition">
      <div class="c-section">
        <span class="c-title">费用类型:</span>
        <div class="c-r-content">
          <el-select style="width: 120px;" v-model="conditionFilter.type" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="充值" :value="1"></el-option>
            <el-option label="提现" :value="2"></el-option>
            <el-option label="支出" :value="3"></el-option>
            <el-option label="额度调整" :value="4"></el-option>
            <el-option label="还款" :value="5"></el-option>
            <el-option label="退款" :value="6"></el-option>
            <el-option label="预扣" :value="7"></el-option>
            <el-option label="预扣解除" :value="8"></el-option>
            <el-option label="转入" :value="9"></el-option>
            <el-option label="转出" :value="10"></el-option>
          </el-select>
        </div>
        <span style="margin-left:10px;">金额：</span>
        <el-input style="width:150px;" v-model="conditionFilter.deltaMoney" @keyup.enter.native="search"></el-input>
      </div>
      <div class="c-section">
        <span class="c-title">时间:</span>
        <div class="c-r-content">
          <el-date-picker :default-value="defaultBegin" v-model="conditionFilter.createTimeBegin" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <span class="c-title" style="margin-left: 10px;">-</span>
        <div class="c-r-content">
          <el-date-picker :default-value="defaultEnd" v-model="conditionFilter.createTimeEnd" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" size="small" style="margin-left: 20px;" @click.native="search">搜索</el-button>
      <el-button type="primary" size="small" style="margin-left: 20px;" @click.native="resetSearch">重置</el-button>
      <el-button style="margin-left: 20px;" size="small" class="forgive-color" @click.native="exportHandle">导出</el-button>
    </div>

    <div class="fixed-table">
      <el-table :data="result" border :resizable="false" style="width: 100%" :height="tableHeight">
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column label="时间" min-width="160">
          <template scope="scope">
            {{Number(scope.row.createTime) | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="费用类型" min-width="120">
          <template scope="scope">
            <template v-if="scope.row.type == 0">全部</template>
            <template v-if="scope.row.type == 1">充值</template>
            <template v-if="scope.row.type == 2">提现</template>
            <template v-if="scope.row.type == 3">支出</template>
            <template v-if="scope.row.type == 4">额度调整</template>
            <template v-if="scope.row.type == 5">还款</template>
            <template v-if="scope.row.type == 6">退款</template>
            <template v-if="scope.row.type == 7">预扣</template>
            <template v-if="scope.row.type == 8">预扣解除</template>
            <template v-if="scope.row.type == 9">转入</template>
            <template v-if="scope.row.type == 10">转出</template>
          </template>
        </el-table-column>
        <el-table-column label="交易信息" min-width="180">
          <template scope="scope">
            <span>{{scope.row.tradeInfo}}</span>
            <!-- <p v-if="scope.row.type == 1">{{scope.row.payTime | splitTime}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="金额/元" min-width="120">
          <template scope="scope">
            <span :style="{color: Number(scope.row.deltaMoney) < 0 ? 'red' : ''}">
              <span></span>{{Number(scope.row.deltaMoney) | formateMoney}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="可用余额/元" min-width="120">
          <template scope="scope">
            {{Number(scope.row.availableBalance) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="可用搜芽额度/元" min-width="120">
          <template scope="scope">
            {{Number(scope.row.remainLine) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="可用徙木额度/元" min-width="120">
          <template scope="scope">
            {{Number(scope.row.baitiaoRemainLine) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column label="可用雁阵额度/元" min-width="120">
          <template scope="scope">
            {{Number(scope.row.yanzhenRemainLine) | formateMoney}}
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="经办人" min-width="120"></el-table-column>
        <el-table-column label="账户" min-width="120">
          <template scope="scope">
            <template v-if="scope.row.moneyType == 1">余额</template>
            <template v-if="scope.row.moneyType == 2">搜芽额度</template>
            <template v-if="scope.row.moneyType == 3">徙木额度</template>
            <template v-if="scope.row.moneyType == 4">雁阵额度</template>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="120">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top-start">
              <p style="white-space: nowrap;">{{scope.row.remark}}</p>
            </el-tooltip>
            <el-button type="primary" size="mini" @click.native="editRemark(scope.row)">修改备注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-content">
        <pagination :page="page.pageNumber" :total="page.totalCount" :render="requestList" :options="filters"></pagination>
      </div>
    </div>

    <!-- 充值 -->
    <el-dialog v-model="dialogVisible" size="tiny" title="充值">
      <el-form label-width="140" label-position="right" style="text-align:left">
        <el-form-item label="充值金额：" required>
          <el-input v-model="foreStoreMoney.deltaMoney" type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="采购商付款名称：" required>
          <el-input v-model="foreStoreMoney.customerPaymentName" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="收款账号：" required>
          <el-select style="width: 250px;" v-model="foreStoreMoney.collectMoneyAccount" placeholder="请选择收款账号">
            <el-option v-for="item in accountList" :label="`${item.bankName}(尾号${item.bankNumber.substring(item.bankNumber.length - 4, item.bankNumber.length)})`" :key="item.id" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到账日期：" required>
          <el-date-picker style="width: 250px;" v-model="foreStoreMoney.collectMoneyDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="foreStoreMoney.remark" type="textarea" :autosize="{minRows:6,maxRows:6}" resize="none"></el-input>
          <p v-if="foreStoreMoney.remark" class="remark-font">{{foreStoreMoney.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="clearForeStoreMoney">取 消</el-button>
        <el-button type="primary" :disabled="foreStoreMoneyStatus" @click.native="confirmPrestore">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 提现 -->
    <el-dialog v-model="drawCashDialogVisible" size="tiny" title="提现">
      <el-form label-width="100" label-position="right" style="text-align:left">
        <el-form-item label="提现金额：" required>
          <el-input v-model="drawCashMoney.deltaMoney" type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="转账日期：" required>
          <el-date-picker style="width: 250px;" v-model="drawCashMoney.transferDate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="drawCashMoney.remark" type="textarea" :autosize="{minRows:6,maxRows:6}" resize="none"></el-input>
          <p v-if="drawCashMoney.remark" class="remark-font">{{drawCashMoney.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="clearForeStoreMoney">取 消</el-button>
        <el-button type="primary" :disabled="drawCashStatus" @click.native="confirmDrawCashMoney">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 调整额度 -->
    <el-dialog v-model="adjustMoneyVisible" size="tiny" :title="adjustMoneyType == 1 ? '搜芽额度临时调整' : '搜芽额度调整'">
      <el-form label-position="right" label-width="120" style="text-align:left">
        <el-form-item label="原额度：">
          <span style="red-color">{{Number(costomerInfo.creditLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item label="修改后额度：" required>
          <el-input v-model="deltaMoney" type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <!-- 为了防止自动提交表单具体解释请自己百度，哈哈哈哈哈···· -->
        <el-form-item label="" style="display:none">
          <el-input type="number" style="width: 250px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="clearForeStoreMoney">取 消</el-button>
        <el-button type="primary" :disabled="moneyStatus" @click.native="lineAdjust">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 调整徙木额度 -->
    <el-dialog v-model="adjustXimuMoneyVisible" size="tiny" title="徙木额度调整">
      <el-form label-width="120" label-position="right" style="text-align:left">
        <el-form-item label="原额度：">
          <span class="red-color">{{Number(costomerInfo.baitiaoCreditLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item label="修改后额度：" required>
          <el-input v-model="adjustXimuMoney" type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <!-- 为了防止自动提交表单具体解释请自己百度，哈哈哈哈哈···· -->
        <el-form-item label="" style="display:none">
          <el-input type="number" style="width: 250px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="cancelAdjustXimuMoney">取 消</el-button>
        <el-button type="primary" :disabled="adjustXimuMoneyStatus" @click.native="confirmAajustXimuMoney">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 雁阵额度调整 -->
    <el-dialog v-model="yanzhenAdjustDialogVisible" size="tiny" title="雁阵额度调整">
      <el-form label-width="120" label-position="right" style="text-align:left">
        <el-form-item label="原额度：">
          <span class="red-color">{{Number(costomerInfo.yanzhenCreditLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item label="修改后额度：" required>
          <el-input v-model="adjustYanzhenMoney" type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <!-- 为了防止自动提交表单具体解释请自己百度，哈哈哈哈哈···· -->
        <el-form-item label="" style="display:none">
          <el-input type="number" style="width: 250px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="adjustYanzhenMoneyVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="confirmAdjustYanzhenMoney">确定 </el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改备注" v-model="editStatus" :close-on-click-modal="false" size="tiny">
      <div>
        <p style="float:left">备注</p>
        <el-input type="textarea" :autosize="{minRows: 6,maxRows:6}" resize="none" placeholder="请输入内容" v-model="temRemark">
        </el-input>
        <p v-if="temRemark" class="remark-font">{{temRemark.length}}/500</p>
        <p v-else class="remark-font">0/500</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="clearForeStoreMoney">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmEdit" :disabled="temRemark.length>500">确 定</el-button>
      </div>
    </el-dialog>
    <!--转账-->
    <el-dialog v-model="transDialogVisible" title="余额转移" size="tiny">
      <el-form class="confirmDialog" label-width="120" label-position="right">
        <el-form-item label="采购商/ID：">
          <span>{{confirmTrans.buyerCompanyId}}</span>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{confirmTrans.availableBalance}}元</span>
        </el-form-item>
        <el-form-item label="转移金额：" required>
          <el-input v-model="confirmTrans.money" style="width:250;"></el-input>
        </el-form-item>
        <!-- 为了防止自动提交表单具体解释请自己百度，哈哈哈哈哈···· -->
        <el-form-item label="" style="display:none">
          <el-input type="number" style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="选择采购商：" required>
          <template v-if="confirmTrans.getMoneyCompany != ''">
            <span>{{confirmTrans.getMoneyCompany}}</span>
            <el-button type="primary" @click="showCompanySelectDialog()" size="mini">选择采购商</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="showCompanySelectDialog()" size="small">选择采购商</el-button>
          </template>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="confirmTrans.transferRemark" :autosize="{minRows:6,maxRows:6}" resize="none" placeholder="请输入内容" @input="updateVal"></el-input>
          <p v-if="confirmTrans.transferRemark" class="remark-font">{{confirmTrans.transferRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click="transDialogVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="congfirmTransferEvent()" :disabled="unableConfirm">确认</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="选择采购商" v-model="selectDialogVisible">
      <el-input v-model="list.keyword" type="text" style="width:250;float:left" placeholder="采购商/Id" @keydown.enter.native="searchCompany()"></el-input>
      <!-- <el-button @click="selectDialogVisible=false" style="float:left;margin-left:25%">取消</el-button> -->
      <el-button @click="searchCompany()" stylr="float:right;margin-right:25%;" type="primary">搜索(Enter)</el-button>
      <div style="margin-top:20px">
        <el-table :data="buyerCompanyList" :height="400" border>
          <el-table-column prop="company" label="采购商名称" align="center" min-width="120">
          </el-table-column>
          <el-table-column prop="number" label="采购商Id" align="center" min-width="120">
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template scope="scope">
              <el-button @click.native="handleSelect(scope.row)" type="primary" :disabled="scope.row.id == confirmTrans.srcCustomerAccountId">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :page="dialogPage.pageNumber" :total="dialogPage.totalCount" :pageSize="dialogPage.pageSize" :render="changePage" :options="list"></pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from 'components/pagination'
import {
  request,
  formatTimeString,
  getCache,
  setCache,
  newRequest
} from 'common/utils'
import allApi from 'api/account'
export default {
  data() {
    return {
      adjustYanzhenMoney: '',
      yanzhenAdjustDialogVisible: false,
      tableHeight: 500,
      keyword: '',
      dialogVisible: false,
      drawCashDialogVisible: false,
      adjustMoneyVisible: false,
      adjustMoneyType: null,
      temRemark: '',
      editStatus: false,
      temRow: {},
      foreStoreMoney: {
        remark: '',
        deltaMoney: '',
        customerPaymentName: '',
        collectMoneyDate: '',
        collectMoneyAccount: ''
      },
      drawCashMoney: {
        deltaMoney: '',
        transferDate: '',
        remark: ''
      },
      deltaMoney: '', // 额度调整
      adjustXimuMoneyVisible: false,
      adjustXimuMoney: '', // 额度调整
      adjustXimuMoneyStatus: true,
      adjustYanzhenMoneyVisible: false,
      moneyStatus: true,
      conditionFilter: {
        deltaMoney: '',
        type: '',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      foreStoreMoneyStatus: true,
      foreStoreMoneyShow: false,
      drawCashStatus: true,
      drawCashShow: false,
      temCurrentRow: {},
      accountList: [],
      result: [],
      page: {
        pageNumber: 1,
        totalCount: 0
      },
      obj: {},
      costomerInfo: {},
      filters: {
        pageNumber: 1,
        pageSize: 20
      },
      fullscreenLoading: true,
      confirmTrans: {
        buyerCompanyId: '',
        availableBalance: 0,
        money: 0,
        transferRemark: '',
        srcCustomerAccountId: '',
        destCustomerAccountId: '',
        getMoneyCompany: '',
      },
      transDialogVisible: false,
      selectDialogVisible: false,
      list: {
        pageSize: 20,
        pageNumber: 1,
        keyword: '',
      },
      buyerCompanyList: [],
      dialogPage: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 0,
      },
      textDialogVisible: false,
      remarkLength: 0,
      remarkTotalLength: 500,
      unableConfirm: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      defaultBegin: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate())),
      defaultEnd: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + ' ' + 23 + ':' + 59 + ':' + 59)
    };
  },
  components: {
    pagination
  },
  computed: {
  },
  mounted() {
    this.tableHeight = String(document.body.clientHeight - 485);
    this._time = (new Date()).getTime()
    this.requestList()
    const accountList = getCache({ key: 'y-result' })
    if (accountList) {
      this.accountList = accountList
    } else {
      this.getAccountList()
    }
  },
  filters: {
    formateMoney(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return val > 0 && val !== null ? formatTimeString(val) : '--'
    },
    splitTime(val) {
      return val > 0 && val !== null ? formatTimeString(val) : '--'
    }
  },
  watch: {
    foreStoreMoney: {
      handler: function (val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key != 'remark') {
            if (!val[key]) {
              on = true
            }
          }
          if (key == 'remark') {
            if (String(val[key]).length >= 500) {
              this.foreStoreMoneyShow = true
              on = true
              // this.foreStoreMoney.remark = String(val[key]).slice(0, 500)
            } else {
              this.foreStoreMoneyShow = false
            }
          }
        }
        this.foreStoreMoneyStatus = on
      },
      deep: true
    },
    drawCashMoney: {
      handler: function (val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key == 'deltaMoney' || key == 'transferDate') {
            if (!val[key]) {
              on = true
            }
          }
          if (key == 'remark') {
            if (String(val[key]).length >= 500) {
              on = true
              this.drawCashShow = true
              // this.drawCashMoney.remark = String(val[key]).slice(0, 500)
            }
          } else {
            this.drawCashShow = false
          }
        }
        this.drawCashStatus = on
      },
      deep: true
    },
    deltaMoney: {
      handler: function (val, oldVal) {
        let on = true
        if (Number(val) >= 0 && String(val) != '') {
          on = false
        }
        this.moneyStatus = on
      },
      deep: true
    },
    adjustXimuMoney: {
      handler: function (val, oldVal) {
        let on = true
        if (Number(val) >= 0 && String(val) != '') {
          on = false
        }
        this.adjustXimuMoneyStatus = on
      },
      deep: true
    }
  },
  methods: {
    // 待定
    confirmAdjustYanzhenMoney() {
      newRequest({
        url: '/redwood/account/CustomerAccount/yanzhenLineAdjust',
        data: {
          money: this.adjustYanzhenMoney,
          customerId: this.$route.query.id
        },
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.yanzhenAdjustDialogVisible = false
          this.requestList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateVal() {
      this.remarkLength = this.confirmTrans.transferRemark.length
      if (this.remarkLength > this.remarkTotalLength) {
        this.$message('备注过长')
        this.unableConfirm = true
      } else {
        this.unableConfirm = false
      }
    },
    handlefore() {
      var nameId = this.costomerInfo.buyerCompanyId;
      var name = nameId.split('/')
      this.foreStoreMoney.customerPaymentName = name[0]
    },
    setVisibleFalse() {
      this.textDialogVisible = false
    },
    enter(e) {
    },
    editRemark(row) {
      this.temRemark = row.remark ? row.remark : ''
      this.temRow = row
      this.editStatus = true
    },
    confirmEdit() {
      const obj = {
        remark: this.temRemark,
        id: this.temRow.id
      }
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/transactionrecord/updateRemark',
        data: obj,
        method: 'post',
        contentType: 'application/json'
      }, res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.clearForeStoreMoney()
              self.requestList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            duration: 1000,
            message: res.msg
          })
        }
      })
    },
    // 获取采购商信息
    getCostomerInfo() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        data: ({ id: this.$route.query.id }),
        method: 'get'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.costomerInfo = res.obj
          // console.log(this.costomerInfo)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    requestList(req) {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time, keyword: this.keyword, customerId: this.$route.query.id }, this.conditionFilter, this.filters, req)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          if (key == 'createTimeBegin' || key == 'createTimeEnd') {
            obj[key] = (new Date(option[key])).getTime()
          } else {
            obj[key] = option[key]
          }
        }
      }
      newRequest({
        url: '/redwood/transactionrecord/list',
        method: 'get',
        data: obj
      }).then(res => {
        // console.log(res)
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.getCostomerInfo()
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
          this.filters.pageNumber = res.page.pageNumber
          this.filters.pageSize = res.page.pageSize
          this.result = res.page.result
          this.obj = res
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    search() {
      this.requestList()
      // this.getCostomerInfo()
    },
    resetSearch() {
      for (const key of Object.keys(this.conditionFilter)) {
        this.conditionFilter[key] = ''
      }
      this.page.pageNumber = 1
      this.filters.pageNumber = 1
      this.filters.pageSize = 20
      this.requestList(this.filters)
    },
    // 获取账号信息
    getAccountList() {
      request({
        url: allApi.FinanceAccount.list,
        data: {},
        method: 'post'
      }).then(res => {
        if (res.success == 1) {
          this.accountList = []
          for (let i = 0; i < res.result.length; i++) {
            if (res.result[i].id !== '688666470776' && res.result[i].id !== '44051801040003666' && res.result[i].id !== '44050143004600000009') {
              this.accountList.push(res.result[i])
            }
          }
          setCache({
            key: 'y-result',
            value: this.accountList
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    clearForeStoreMoney() {
      for (const key of Object.keys(this.foreStoreMoney)) {
        this.foreStoreMoney[key] = ''
      }
      for (const key of Object.keys(this.drawCashMoney)) {
        this.drawCashMoney[key] = ''
      }
      this.dialogVisible = false
      this.drawCashDialogVisible = false
      this.adjustMoneyVisible = false
      this.editStatus = false
      this.temRemark = ''
      this.temCurrentRow = {}
      this.temRow = {}
    },
    // 提交充值
    confirmPrestore() {
      this.fullscreenLoading = true
      const obj = {
        remark: this.foreStoreMoney.remark,
        money: this.foreStoreMoney.deltaMoney,
        customerPaymentName: this.foreStoreMoney.customerPaymentName,
        collectMoneyDate: (new Date(this.foreStoreMoney.collectMoneyDate)).getTime(),
        collectMoneyAccount: this.foreStoreMoney.collectMoneyAccount,
        customerId: this.$route.query.id,
        _time: this._time
      }
      request({
        url: allApi.Account.prestore,
        data: {
          param: JSON.stringify(obj)
        },
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              // self.getCostomerInfo()
              self.requestList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    // 提交提现
    confirmDrawCashMoney() {
      this.fullscreenLoading = true
      const obj = {
        remark: this.drawCashMoney.remark,
        money: this.drawCashMoney.deltaMoney,
        transferDate: (new Date(this.drawCashMoney.transferDate)).getTime(),
        customerId: this.$route.query.id,
        _time: this._time
      }
      newRequest({
        url: allApi.Account.drawCash,
        contentType: 'application/json',
        data: obj,
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1 || res.success == 24000) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              // self.getCostomerInfo()
              self.requestList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    cancelAdjustXimuMoney() {
      this.adjustXimuMoney = null
      this.adjustXimuMoneyVisible = false
    },
    // 调整徙木额度
    confirmAajustXimuMoney() {
      this.fullscreenLoading = true
      const obj = {
        money: this.adjustXimuMoney,
        customerId: this.$route.query.id,
      }
      newRequest({
        url: allApi.Account.baiTiaoLineAdjust,
        contentType: 'application/json',
        data: obj,
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.cancelAdjustXimuMoney()
          // this.getCostomerInfo()
          this.requestList()
          this.$message.success(res.msg)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    adjustShow(data) { // 搜芽额度的额度调整和临时调额公用一个弹框
      this.adjustMoneyType = data
      this.temCurrentRow = this.costomerInfo;
      this.adjustMoneyVisible = true
      this.deltaMoney = null // 打开弹框的时候清空调整额度的值
    },
    // 调整搜芽额度
    lineAdjust() {
      this.fullscreenLoading = true
      var obj = {}
      var url = null
      if (this.adjustMoneyType == 1) {
        obj = {
          tempCreditLine: this.deltaMoney,
          id: this.$route.query.id,
        }
        url = allApi.Account.CustomerAccount_tempAdjust
      } else {
        obj = {
          money: this.deltaMoney,
          customerId: this.$route.query.id,
          _time: this._time
        }
        url = allApi.Account.CustomerAccount_lineAdjust
      }
      newRequest({
        url: url,
        data: obj,
        contentType: 'application/json',
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.requestList()
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    back() {
      if (window.history.length != 1) {
        console.log(window.history)
        window.history.go(-1)
      } else {
        console.log('null')
        this.$router.push({ name: 'moneyManage' })
      }
    },
    exportHandle() {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time, keyword: this.keyword, customerId: this.$route.query.id }, this.conditionFilter, this.filters)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          if (key == 'createTimeBegin' || key == 'createTimeEnd') {
            obj[key] = (new Date(option[key])).getTime()
          } else {
            obj[key] = option[key]
          }
        }
      }
      newRequest({
        url: '/redwood/transactionrecord/export',
        method: 'get',
        data: obj
      }).then((res) => {
        this.fullscreenLoading = false
        if (res.success == '1') {
          window.open('http://www.soouya.com/' + res.obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 转移系列操作
    showTransDialog() {
      this.confirmTrans.getMoneyCompany = ''
      this.confirmTrans.money = 0
      this.confirmTrans.transferRemark = ''
      this.confirmTrans.srcCustomerAccountId = this.$route.query.id
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: { id: this.$route.query.id }
      }).then((res) => {
        // console.log(res)
        if (res.success == '1') {
          this.confirmTrans.buyerCompanyId = res.obj.buyerCompanyId
          this.confirmTrans.availableBalance = res.obj.availableBalance
          this.transDialogVisible = true
        } else {
          this.$message.error('加载转移模块失败')
        }
      })
      newRequest({
        url: '/redwood/sys/Buyer/list',
        method: 'get',
        data: this.list,
      }).then((response) => {
        this.buyerCompanyList = response.page.result
        this.buyerCompanyList.forEach((item) => {
          if (item.company) {
            item.value = item.company + '/' + item.number
          } else {
            item.value = item.number
          }
        })
      })
    },
    showCompanySelectDialog() {
      this.searchCompany()
      this.selectDialogVisible = true
    },
    changePage() {
      this.searchCompany()
    },
    searchCompany() {
      newRequest({
        url: '/redwood//sys/Buyer/list',
        method: 'get',
        data: this.list,
      }).then((res) => {
        if (res.success == '1') {
          this.dialogPage.pageSize = res.page.pageSize
          this.dialogPage.pageNumber = res.page.pageNumber
          this.dialogPage.totalCount = res.page.totalCount
          this.buyerCompanyList = res.page.result
        } else {
          this.$message.error('导出选择采购商模块失败')
        }
      })
    },
    handleSelect(data) {
      this.confirmTrans.destCustomerAccountId = data.id
      this.confirmTrans.getMoneyCompany = data.company + '/' + data.number
      // console.log(this.confirmTrans)
      this.selectDialogVisible = false
    },
    congfirmTransferEvent() {
      if (this.confirmTrans.destCustomerAccountId == '') {
        this.$message('请选择转移目标采购商')
      } else {
        if (!this.confirmTrans.money) {
          this.$message('请输入正确的转移金额')
        } else if (this.confirmTrans.money < 0.01) {
          this.$message('输入金额不得小于0.01')
        } else if (this.confirmTrans.money > this.confirmTrans.availableBalance) {
          this.$message('输入金额不得大于可用余额')
        } else {
          newRequest({
            url: '/redwood/account/CustomerAccount/transferAvailableBalance',
            method: 'post',
            contentType: 'application/json',
            data: this.confirmTrans
          }).then((res) => {
            if (res.success == '1') {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.transDialogVisible = false
              this._time = (new Date()).getTime()
              this.requestList()
              // this.getCostomerInfo()
              const accountList = getCache({ key: 'y-result' })
              if (accountList) {
                this.accountList = accountList
              } else {
                this.getAccountList()
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
  },
};
</script>

<style lang="scss">
.money-msg {
  padding: 10px;
  background-color: #fff;
  margin-left: 12px;
  padding-bottom: 15px;
}

.money-manage-detail {
  // min-width: 1400px;
  .condition {
    // border-top: 2px solid #ccc;
    margin-top: 10px;
    padding-top: 10px;
    .c-section {
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      .c-title {
        height: 40px;
        float: left;
        line-height: 40px;
        margin-right: 10px;
      }
      .c-r-content {
        float: left;
      }
    }
  }
}

.textBox {
  text-align: left;
  border: 1px #ccc solid;
  max-width: 500px;
  width: auto;
  min-width: 300;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #fff;
  opacity: 1;
  cursor: text;
  z-index: 100;
  height: 150px;
  padding-left: 5px;
}

.bill-pay-money-detail {
  min-width: 400px;
  .pay-content {
    min-width: 400px;
    text-align: left;
    .pay-item {
      position: relative;
      padding-bottom: 10px;
      .pay-item-l {
        width: 112px;
        display: inline-block;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}

.star {
  color: red;
}

span > strong {
  color: #f00;
}

.confirmDialog {
  text-align: left;
}

.toLeft {
  text-align: left;
  float: left;
  margin: 10, 0;
}
.edu-content {
  // border-right: 1px dashed #ddd;
  padding-right: 10px;
  padding-left: 10px;
  &:first-child {
    padding-left: 0px;
  }
  &:last-child {
    border-right: none;
    padding-right: 0px;
  }
  .eduDetail-content {
    border: 1px solid #ddd;
    text-align: center;
    margin-top: 10px;
    padding: 10px;
    .text {
      font-size: 12px;
      color: #999;
    }
    .noused {
      color: #666;
      border-bottom: 1px dashed #ddd;
      margin-bottom: 10px;
      padding-bottom: 10px;
      text-align: center;
      .number {
        color: #000;
      }
    }
  }
  .el-button {
    float: right;
    margin-top: -5px;
    // clear: both;
  }
}
@media screen and (max-width: 1920px) {
  .media-margin2 {
    margin-left: 10px;
  }
}
@media screen and (max-width: 1600px) {
  .media-margin2 {
    margin-left: 5px;
  }
}
@media screen and (max-width: 1400px) {
  .media-margin2 {
    margin-left: 3px;
  }
}
</style>
