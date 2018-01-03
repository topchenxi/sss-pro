 <template>
  <div v-loading.body="fullscreenLoading">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px">对账列表</h1> -->
    <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
    <checkTabs></checkTabs>
    <div>
      待对账总金额：
      <span style="color: red">{{payGroupList.total ? Number(payGroupList.total).toFixed(2) : ''}}</span>元
      <!-- 方法待修改 -->
      <el-button type="primary" style="margin-left:30px" :disabled='!waitCheckData.ids.length' @click.prevent="batchDuiZhangHandle">批量对账</el-button>
      <!--<a target="_blank" href="checkAccount/WaitingAccount" style="margin-left:30px">
                                                                                  <el-button type="text">待结算订单</el-button>
                                                                                </a>-->
    </div>
    <br/>
    <el-table class="fixed-table" :data="payGroupList.page.result.length > 0 ? payGroupList.page.result : []" :height="height" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" min-width="50" fixed="left" :selectable="canSelect"></el-table-column>
      <el-table-column label="操作" width='180' fixed='right'>
        <template scope="scope">
          <!-- <el-button size="mini" :disabled="scope.row.status != 1" @click="PayGroupConfirmIncome(scope.row)">对账</el-button> -->
          <el-button size="mini" :disabled="scope.row.status != 1" @click="handleCheckBtn(scope.row)">对账</el-button>
          <template v-if="scope.row.type == 3">
            <el-button size="mini" :disabled="scope.row.status != 1" @click="PayGroupSendbackIncome(scope.row.id)">打回采购</el-button>
          </template>
          <template v-else>
            <el-button size="mini" :disabled="scope.row.status != 1" @click="PayGroupSendbackIncome(scope.row.id)">打回跟单</el-button>
          </template>
          <el-button size="mini" :disabled="scope.row.status != 4" @click="handleCheckAgainBtn(scope.row)">重新对账</el-button>
          <el-button size="mini" @click="jumpToPayDetail(scope.row.id, scope.row.status, scope.row.category, scope.row.serviceNumberList, scope.row.outReposityNumberList)">明细</el-button>
        </template>
      </el-table-column>
      <el-table-column label="进入待对账日期" min-width='170'>
        <template scope="scope">
          {{scope.row.createTimeString}}
        </template>
      </el-table-column>
      <el-table-column label="对账状态" min-width='100'>
        <template scope="scope">
          <template v-if="scope.row.status == 1">待对账</template>
          <template v-if="scope.row.status == 3 || scope.row.status == 4">待支付</template>
          <template v-if="scope.row.status == '-1' || !scope.row.status">未提交</template>
        </template>
      </el-table-column>
      <el-table-column inline-template label="订单号" min-width="230">
        <div>
          <el-dropdown v-if="row.serviceNumberList && row.serviceNumberList.length > 1" trigger="hover">
            <span class="el-dropdown-link">
              {{seleted(row.serviceNumberList)}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in row.serviceNumberList">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-else>
            <span v-for="item in row.serviceNumberList">{{item}}{{ row.a }}</span>
          </div>
        </div>
      </el-table-column>
      <el-table-column inline-template label="出仓单/码单" min-width="170">
        <div>
          <el-dropdown v-if="row.outReposityNumberList && row.outReposityNumberList.length > 1" trigger="hover">
            <span class="el-dropdown-link">
              {{seleted(row.outReposityNumberList)}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in row.outReposityNumberList">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-else>
            <span v-for="item in row.outReposityNumberList">{{item}}{{ row.a }}</span>
          </div>
        </div>
      </el-table-column>
      <el-table-column label="原订单销售货款/元" min-width='130'>
        <template scope="scope">
          <template v-if="scope.row.category === 'all-all' || scope.row.category == 'dh-zy'">
            <p>{{scope.row.totalOrderSaleMoney | formateNumber}}</p>
          </template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column inline-template label="采购商税款/元" min-width='130'>
        <p>{{row.totalTaxMoney | formateNumber}}</p>
      </el-table-column>
      <el-table-column inline-template label="服务费/元" min-width='120'>
        <p>{{row.totalServiceMoney | formateNumber}}</p>
      </el-table-column>
      <el-table-column inline-template label="出仓销售货款/元" min-width='120'>
        <p>{{row.totalSaleMoney | formateNumber}}</p>
      </el-table-column>
      <el-table-column inline-template label="应收出仓销售货款/元" min-width='140'>
        <p>{{row.totalNeedSaleMoney | formateNumber}}</p>
      </el-table-column>
      <el-table-column inline-template label="运费/元" min-width='120'>
        <p>{{row.totalFreightMoney | formateNumber}}</p>
      </el-table-column>
      <el-table-column label="仓库运费/元" min-width='120'>
        <template scope="scope">
          <template v-if="scope.row.category === 'all-all' || scope.row.category == 'dh-zy'">
            <p>{{scope.row.totalFreightMoneyNoTax | formateNumber}}</p>
          </template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column inline-template label="应收款/元" min-width='100'>
        <p>{{row.totalMoney | formateNumber}}</p>
      </el-table-column>
      <el-table-column property="category" label="订单类型" min-width="100" :formatter="getCategoryStr"></el-table-column>
      <el-table-column prop="buyerCompany" label="采购商" min-width='120'>
      </el-table-column>
      <el-table-column prop="buyerNumber" label="采购商ID" min-width='120'>
      </el-table-column>
      <el-table-column label="白条客户" min-width='120'>
        <template scope="scope">
          <template v-if="scope.row.hasOpenedBaitiao == '0'">
            <p>否</p>
          </template>
          <template v-else>是</template>
        </template>
      </el-table-column>
      <el-table-column inline-template width='130' label="跟单员">
        <p>{{row.follower}}/{{row.followerTel}}</p>
      </el-table-column>
      <el-table-column inline-template width='130' label="买货员">
        <p>{{row.purchaser}}/{{row.purchaserTel}}</p>
      </el-table-column>
      <el-table-column inline-template width='130' label="采购员">
        <p>{{row.guiderName}}/{{row.guiderTel}}</p>
      </el-table-column>
      <el-table-column inline-template width='130' label="销售员">
        <p>{{row.salesName}}/{{row.salesTel}}</p>
      </el-table-column>
      <el-table-column label="对账方式">
        <template scope="scope">
          <template v-if="scope.row.creditType == 3">余额</template>
          <template v-if="scope.row.creditType == 1">搜芽额度</template>
          <template v-if="scope.row.creditType == 2">徙木额度</template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-content">
      <pagination :page="payGroupList.page.pageNumber" :total="payGroupList.page.totalCount" :render="listPayGroup" :options="filters"></pagination>
    </div>
    <!-- 若销账类型不一致 -->
    <el-dialog title="提示" v-model="cannotduizhang.visible" :close-on-click-modal="true">
      <span style='padding: 20px 0; font-size: 20px'>{{cannotduizhang.tips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="cannotduizhang.visible = false">取 消</el-button>
        <el-button type="primary" @click.native="cannotduizhang.visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 检测可用余额是否够用 --大货 -->
    <el-dialog title="提示" v-model="checkYuerDialogVisible" size="tiny">
      <span style='padding: 10px 0; font-size: 16px'>客户可用总额不足！请确认是否需要预存或调整授信额度。</span>
      <div style='font-size: 16px; text-align: left; padding-left: 20px'>
        <div style='margin-top: 20px;'>可用总额：{{customerAccount.available | formateNumber}} 元</div>
        <div style='margin-top: 20px; border-top: 1px dashed #999; padding-top: 20px'>采购商付款金额：
          <strong class='red'>{{buyerPayedMoney && Number(buyerPayedMoney).toFixed(2)}} </strong>元</div>
        <div style='margin-top: 20px;'>
          采购商付款凭据:
          <article class="media" v-if='buyerCertificateList && buyerCertificateList.length'>
            <a :href="'http://test.soouya.com'+val.imgUrl" class="image media-left is-64x64" v-lightbox="buyerCertificateList" v-for="val in buyerCertificateList">
              <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
            </a>
          </article>
        </div>
        <div style='margin-top: 20px; font-size: 16px;'>
          结算备注: {{content}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkYuerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAdjust">去调整</el-button>
      </span>
    </el-dialog>
    <!-- 实款对账 --大货 -->
    <el-dialog title="提示" v-model="shikuanDialogVisible" size="tiny">
      <span style='padding: 10px 0; font-size: 16px'>一旦确认提交，将不可修改。</span>
      <template v-if='customerAccount.totalMoney <= customerAccount.available && customerAccount.availableBalance < customerAccount.totalMoney'>
        <div style='margin-top: 20px; font-size: 16px; '>应收款：
          <strong class='red'>{{customerAccount.totalMoney | formateNumber}} 元</strong>
        </div>
        <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{customerAccount.availableBalance | formateNumber}} 元</div>
        <div style='margin-top: 20px; font-size: 16px'>可用信用额度抵扣：{{Number(customerAccount.totalMoney - customerAccount.availableBalance).toFixed(2)}}元</div>
      </template>
      <template v-if='customerAccount.availableBalance >= customerAccount.totalMoney'>
        <div style='margin-top: 20px; font-size: 16px;'>应收款：{{customerAccount.totalMoney | formateNumber}} 元</div>
        <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{customerAccount.totalMoney | formateNumber}} 元</div>
        <div style='margin-top: 20px; font-size: 16px'>可用信用额度抵扣：0.00 元</div>
      </template>
      <template v-if='customerAccount.totalMoney > customerAccount.available'>
        <div style='margin-top: 20px; font-size: 16px;'>可用总额：{{customerAccount.available | formateNumber}} 元</div>
      </template>
      <div style='margin-top: 20px; font-size: 16px;'>
        <span style='color: red'>*</span>到账日期：
        <el-date-picker v-model="daozhangriqi" type="date" placeholder="选择日期" :picker-options="pickerOptions0"> </el-date-picker>
      </div>
      <div class="line"></div>
      <div style='margin-top: 20px; font-size: 16px;'>采购商付款金额：
        <span class='red'>{{buyerPayedMoney | formateNumber}}</span> 元</div>
      <div style='margin-top: 20px;' v-if='buyerCertificateList && buyerCertificateList.length'>
        采购商付款凭据:
        <article class="media" v-if='buyerCertificateList && buyerCertificateList.length'>
          <a :href="'http://test.soouya.com'+val.imgUrl" class="image media-left is-64x64" v-lightbox="buyerCertificateList" v-for="val in buyerCertificateList">
            <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
          </a>
        </article>
      </div>
      <div style='margin-top: 20px; font-size: 16px;' v-if='content'>
        结算备注: {{content}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shikuanDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doPayGroup" :disabled='!daozhangriqi'>确定</el-button>
      </span>
    </el-dialog>
    <!-- 检测可用余额是否够用 --剪版 -->
    <el-dialog title="提示" v-model="checkYuerDialogJianban" size="tiny">
      <span style='padding: 10px 0; font-size: 16px'>客户可用余额不足！请确认是否需要预存或调整授信额度。</span>
      <div style='font-size: 16px; text-align: left; padding-left: 20px'>
        <div style='margin-top: 20px;'>可用余额：{{customerAccount.availableBalance | formateNumber}} 元</div>
        <div style='margin-top: 20px; border-top: 1px dashed #999; padding-top: 20px'>采购商付款金额：
          <strong class='red'>{{buyerPayedMoney | formateNumber}} </strong>元</div>
        <div style='margin-top: 20px;'>
          <span class="fl">采购商付款凭据:</span>
          <article class="media" v-if='buyerCertificateList && buyerCertificateList.length'>
            <a :href="'http://test.soouya.com'+val.imgUrl" class="image media-left is-64x64" v-lightbox="buyerCertificateList" v-for="val in buyerCertificateList">
              <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
            </a>
          </article>
        </div>
        <div style='margin-top: 20px; font-size: 16px;'>
          结算备注: {{content}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkYuerDialogJianban = false">取 消</el-button>
        <el-button type="primary" @click="toAdjust">去调整</el-button>
      </span>
    </el-dialog>
    <!-- 实款对账 --剪版 -->
    <el-dialog title="提示" v-model="shikuanDialogJianban" size="tiny">
      <span style='padding: 10px 0; font-size: 16px'>一旦确认提交，将不可修改。</span>
      <div style='margin-top: 20px; font-size: 16px; color: red'>应收款：
        <strong class='red'>{{customerAccount.totalMoney | formateNumber}} 元</strong>
      </div>
      <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{customerAccount.totalMoney | formateNumber}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用信用额度抵扣：0.00 元</div>
      <div style='margin-top: 20px; font-size: 16px;'>
        <span style='color: red'>*</span>到账日期：
        <el-date-picker v-model="daozhangriqi" type="date" placeholder="选择日期" :picker-options="pickerOptions0"> </el-date-picker>
      </div>
      <div class="line"></div>
      <div style='margin-top: 20px; font-size: 16px; color: red'>采购商付款金额：
        <strong class='red'>{{buyerPayedMoney | formateNumber}}</strong> 元</div>
      <div style='margin-top: 20px;' v-if='buyerCertificateList && buyerCertificateList.length'>
        采购商付款凭据:
        <article class="media" v-if='buyerCertificateList && buyerCertificateList.length'>
          <a :href="'http://test.soouya.com'+val.imgUrl" class="image media-left is-64x64" v-lightbox="buyerCertificateList" v-for="val in buyerCertificateList">
            <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
          </a>
        </article>
      </div>
      <div style='margin-top: 20px; font-size: 16px;' v-if='content'>
        结算备注: {{content}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shikuanDialogJianban = false">取 消</el-button>
        <el-button type="primary" @click="doPayGroup" :disabled='!daozhangriqi'>确定</el-button>
      </span>
    </el-dialog>
    <!-- 欠款对账 -->
    <el-dialog title="提示" v-model="qiankuanDialogVisible" size="tiny">
      <span style='padding: 10px 0; font-size: 16px'>一旦确认提交，将不可修改。</span>
      <div style='margin-top: 20px; font-size: 16px; color: red'>应收欠款：{{customerAccount.totalMoney | formateNumber}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>可用余额抵扣：{{customerAccount.keYongYueDikou | formateNumber}} 元</div>
      <div class="line"></div>
      <div style='margin-top: 20px; font-size: 16px; color: red'>实际应收：{{Number(customerAccount.totalMoney - customerAccount.keYongYueDikou).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; font-size: 16px'>
        <span class='red'>*</span>到账日期：
        <el-date-picker v-model="daozhangriqi" type="date" placeholder="选择日期" :picker-options="pickerOptions0"> </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qiankuanDialogVisible = false">取 消</el-button>
        <template v-if='customerAccount.availableBalance >= customerAccount.totalMoney'>
          <el-button type="primary" @click="doPayDebt" :disabled='!receivedTime'>确定</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="toAdjust">预存</el-button>
        </template>
      </span>
    </el-dialog>
    <!--  新增对账的弹框 -->
    <el-dialog :title="singleCheckTitle" v-model="CheckVisible" size="tiny" v-if="singleCheckData">
      <div>{{singleCheckData.templateDescr}}</div>
      <el-form ref="form" :model="form" label-width="200px" :rules="rules">
        <el-form-item label="应收款:">
          <el-col :span="11">
            <strong class="red">{{singleCheckData.totalMoney}}</strong>元 </el-col>
        </el-form-item>
        <el-form-item label="可用余额:" v-if="singleCheckData.templateId == '1' || singleCheckData.templateId == '5' || singleCheckData.templateId == '7' || singleCheckData.templateId == '10'">
          <el-col :span="11">{{singleCheckData.availableBalance}}元</el-col>
        </el-form-item>
        <el-form-item label="可用徙木额度:" v-if="singleCheckData.templateId == '1'">
          <el-col :span="11">{{singleCheckData.baitiaoRemainLine}}元</el-col>
        </el-form-item>
        <el-form-item label="可用搜芽额度:" v-if="singleCheckData.templateId == '1' || singleCheckData.templateId == '7'">
          <el-col :span="11">{{singleCheckData.remainLine}}元</el-col>
        </el-form-item>
        <el-form-item label="可用余额抵扣:" v-if="singleCheckData.templateId == '2' || singleCheckData.templateId == '6' || singleCheckData.templateId == '8' || singleCheckData.templateId == '11'">
          <el-col :span="11">{{singleCheckData.totalMoney}}元</el-col>
        </el-form-item>
        <el-form-item label="可用徙木额度抵扣:" v-if="singleCheckData.templateId == '3'">
          <el-col :span="11">{{singleCheckData.totalMoney}}元</el-col>
        </el-form-item>
        <el-form-item label="可用搜芽额度抵扣:" v-if="singleCheckData.templateId == '4' || singleCheckData.templateId == '9'">
          <el-col :span="11">{{singleCheckData.totalMoney}}元</el-col>
        </el-form-item>

        <div v-if="singleCheckData.templateId != '10' && singleCheckData.templateId != '1' && singleCheckData.templateId != '7'">
          <div v-if="singleCheckData.templateId != '5'">
            <el-form-item label="到账日期:" required prop="date">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="对账备注:" style="margin-bottom: 40px; " prop="remark">
              <limitInput :maxLength="500" :model="form.remark" type="textarea" v-on:update="updateRemark"></limitInput>
            </el-form-item>
          </div>
          <div v-if='!multipleCheckFlag'>
            <el-form-item label="采购商付款金额:" style="border-top: 1px dashed #999; padding-top: 20px">
              <el-col :span="11">
                <span class="red">{{singleCheckData.buyerPayedMoney}}</span>元</el-col>
            </el-form-item>
            <el-form-item label="采购商付款凭据:">
              <article class="media" v-if='singleCheckData.buyerCertificateList && singleCheckData.buyerCertificateList.length'>
                <a href="javascript:;" class="image media-left is-64x64" v-lightbox="buyerCertificateList" v-for="val in singleCheckData.buyerCertificateList">
                  <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
                </a>
              </article>
            </el-form-item>
            <el-form-item label="结算备注:">
              <el-col :span="11">{{singleCheckData.followerRemark}}</el-col>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button @click=" CheckVisible = false">取消</el-button>
          <el-button type="primary" v-if="singleCheckData.templateId == '1' || singleCheckData.templateId == '5' || singleCheckData.templateId == '7' || singleCheckData.templateId == '10'" @click="toAdjust(singleCheckData.customerId)">去调整</el-button>
          <el-button type="primary" v-if="singleCheckData.templateId == '2' || singleCheckData.templateId == '6' || singleCheckData.templateId == '8' || singleCheckData.templateId == '9' || singleCheckData.templateId == '11'" @click="saveCheck('form')">确定</el-button>
          <el-button type="primary" v-if="singleCheckData.templateId == '3' || singleCheckData.templateId == '4'" @click="saveCheck('form')">提交客户支付</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--  新增重新对账弹框 -->
    <el-dialog :title="checkAgainTitle" v-model="checkAgainVisible" size="tiny" v-if="checkAgainData">
      <div>{{checkAgainData.templateDescr}}</div>
      <el-form ref="form" :model="form" label-width="200px" :rules="rules">
        <el-form-item label="应收款:">
          <el-col :span="11">
            <strong class="red">{{checkAgainData.totalMoney}}</strong>元 </el-col>
        </el-form-item>
        <el-form-item label="可用余额:" v-if="checkAgainData.templateId == '7'">
          <el-col :span="11">{{checkAgainData.availableBalance}}元</el-col>
        </el-form-item>
        <el-form-item label="可用搜芽额度:" v-if="checkAgainData.templateId == '7'">
          <el-col :span="11">{{checkAgainData.remainLine}}元</el-col>
        </el-form-item>
        <el-form-item label="可用余额抵扣:" v-if="checkAgainData.templateId == '8' ">
          <el-col :span="11">{{checkAgainData.totalMoney}}元</el-col>
        </el-form-item>
        <el-form-item label="可用搜芽额度抵扣:" v-if="checkAgainData.templateId == '9'">
          <el-col :span="11">{{checkAgainData.totalMoney}}</el-col>
        </el-form-item>
        <div v-if="checkAgainData.templateId != '7' ">
          <el-form-item label="到账日期:" required>
            <el-col :span="11">
              <el-date-picker placeholder="选择日期" v-model="form.date" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="对账备注:" style="margin-bottom: 40px; " prop="remark">
            <limitInput :maxLength="500" :model="form.remark" type="textarea" v-on:update="updateRemark"></limitInput>
          </el-form-item>
          <el-form-item label="采购商付款金额:" style="border-top: 1px dashed #999; padding-top: 20px">
            <el-col :span="11">
              <span class="red">{{checkAgainData.buyerPayedMoney}}</span>元</el-col>
          </el-form-item>
          <el-form-item label="采购商付款凭据:">
            <article class="media" v-if='checkAgainData.buyerCertificateList && checkAgainData.buyerCertificateList.length'>
              <a href="javascript:;" class="image media-left is-64x64" v-lightbox="buyerCertificateList" v-for="val in checkAgainData.buyerCertificateList">
                <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
              </a>
            </article>
          </el-form-item>
          <el-form-item label="结算备注:">
            <el-col :span="11">{{checkAgainData.followerRemark}}元</el-col>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click=" checkAgainVisible = false">取消</el-button>
          <el-button type="primary" v-if="checkAgainData.templateId == '7'" @click="toAdjust(checkAgainData.customerId)">去调整</el-button>
          <el-button type="primary" :disabled="hadClick || !form.date" v-if="checkAgainData.templateId == '8' || checkAgainData.templateId == '9'" @click="saveCheckAgain('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 自营版本更新对账dialog,前一版本的可以删除 -->
    <!-- dialog1.0 -内容：当额度不足时展示的内容 -功能：切换结算方式 -->
    <el-dialog title="提示" v-model="checkNoMoneyDialog" size="tiny">
      <template v-if="dialogData.templateId == 1">
        <span>
          <i class="el-icon-warning" style="color:#f00"></i>&nbsp客户可用余额不足!请确认是否预存,或选择其他付款方式。
        </span>
      </template>
      <template v-if="dialogData.templateId == 3">
        <span>
          <i class="el-icon-warning" style="color:#f00"></i>&nbsp客户可用搜芽额度不足!请确认调整额度,或选择其他结算方式。
        </span>
      </template>
      <template v-if="dialogData.templateId == 2">
        <span>
          <i class="el-icon-warning" style="color:#f00"></i>&nbsp客户可用徙木额度不足!请确认调整额度,或选择其他结算方式。
        </span>
      </template>
      <el-form label-width="100px" label-position="right" style="margin-top:20px;margin-left:12.5%;;">
        <el-form-item label="结算方式：">
          <el-radio-group v-model="reqCheckParams.creditType" style="margin-top:10px;" @change="handleTypeChange">
            <el-radio :label="3">余额</el-radio>
            <el-radio :label="1">搜芽额度</el-radio>
            <template v-if="rowData.hasOpenedBaitiao">
              <el-radio :label="2">徙木额度</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="应收款：">
          <span style="color:#f00">{{dialogData.totalMoney}}</span>
        </el-form-item>
        <template v-if="dialogData.templateId == 1">
          <el-form-item label="可用余额：">
            <span>{{dialogData.availableBalance}}</span>
          </el-form-item>
        </template>
        <template v-if="dialogData.templateId == 3">
          <el-form-item label="可用搜芽额度">
            <span>{{dialogData.remainLine}}</span>
          </el-form-item>
        </template>
        <template v-if="dialogData.templateId == 2">
          <el-form-item label="可以徙木额度">
            <span>{{dialogData.baitiaoRemainLine}}</span>
          </el-form-item>
        </template>
      </el-form>
      <footer>
        <el-button size="small" @click.naitve="checkNoMoneyDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="toAdjust(dialogData.customerId)">去调整</el-button>
      </footer>
    </el-dialog>
    <!-- dialog1.1 -内容：额度足够时展示的内容 -功能：确认对账 -->
    <el-dialog title="提示" v-model="checkHaveMoneyDialog" size="tiny">
      <span>
        <i class="el-icon-warning" style="color:#f00"></i>&nbsp一旦确认提交，将不可修改。
      </span>
      <el-form label-width="150px" label-position="right" style="margin-top:20px;margin-left:8%;" :model="form" :rules="rules" ref="form">
        <el-form-item label="结算方式：">
          <el-radio-group v-model="reqCheckParams.creditType" style="margin-top:10px;" @change="handleTypeChange">
            <el-radio :label="3">余额</el-radio>
            <el-radio :label="1">搜芽额度</el-radio>
            <template v-if="rowData.hasOpenedBaitiao">
              <el-radio :label="2">徙木额度</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="应收款：">
          <span style="color:#f00">{{dialogData.totalMoney | formatMoney}}</span>
        </el-form-item>
        <template v-if="dialogData.templateId == 4">
          <el-form-item label="可用余额抵扣：">
            <span>{{dialogData.availableBalance | formatMoney}}</span>
          </el-form-item>
        </template>
        <template v-if="dialogData.templateId == 6">
          <el-form-item label="可用搜芽额度抵扣">
            <span>{{dialogData.remainLine | formatMoney}}</span>
          </el-form-item>
        </template>
        <template v-if="dialogData.templateId == 5">
          <el-form-item label="可以徙木额度抵扣">
            <span>{{dialogData.baitiaoRemainLine | formatMoney}}</span>
          </el-form-item>
        </template>
        <el-form-item required label="到账日期：">
          <el-date-picker v-model="form.date" placeholder="选择日期" :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对账备注：" style="margin-bottom: 40px; " prop="remark">
          <limitInput :maxLength="500" :model="form.remark" type="textarea" v-on:update="updateRemark"></limitInput>
        </el-form-item>
        <template v-if="reqCheckParams.ids.length = 1">
          <div style="border-bottom:1px dashed #ccc; margin-left:-8%;"></div>
          <el-form-item label="采购商付款金额：">
            <span style="color:#f00">{{dialogData.buyerPayedMoney | formatMoney}}</span>
          </el-form-item>
          <el-form-item label="采购商付款凭据：">
            <article class="media" v-if='dialogData.buyerCertificateList && dialogData.buyerCertificateList.length'>
              <a :href="val" class="image media-left is-64x64" v-lightbox="bCList" v-for="val in bCList">
                <img :src="val+'@200h_200w_1e'" alt="Image" width="60" height="60">
              </a>
            </article>
          </el-form-item>
          <el-form-item label="结算备注：">
            <span>{{dialogData.followerRemark}}</span>
          </el-form-item>
        </template>
      </el-form>
      <footer>
        <el-button size="small" @click.naitve="checkHaveMoneyDialog = false">取消</el-button>
        <template v-if="dialogData.templateId == 4 || rowData.hasOpenedBaitiao == 0">
          <el-button size="small" :disabled="hadClick || !form.date" type="primary" @click.native="saveCheck('form')">确定</el-button>
        </template>
        <template v-else>
          <el-button size="small" :disabled="hadClick || !form.date" type="primary" @click.native="saveCheck('form')">提交客户支付</el-button>
        </template>
      </footer>
    </el-dialog>
    <!-- dialog2.0 内容：剪版对账额度不足时展示内容  -功能：跳转到调整 -->
    <el-dialog title="提示" v-model="checkJbNoMoneyDialog" size="tiny">
      <span>
        <i class="el-icon-warning" style="color:#f00"></i>&nbsp客户可用余额不足!请确认是否需要预存
      </span>
      <el-form label-width="150px" label-position="right" style="margin-left:8%;">
        <el-form-item label="结算方式：">
          <span>余额</span>
        </el-form-item>
        <el-form-item label="应收款：">
          <span style="color:#f00">{{dialogData.totalMoney | formatMoney}}</span>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{dialogData.availableBalance}}</span>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click.naitve="checkJbNoMoneyDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="toAdjust(dialogData.customerId)">去调整</el-button>
      </footer>
    </el-dialog>
    <!-- dialog2.1 内容：剪版对账额度足够时展示内容 -功能：确认对账-->
    <el-dialog title="提示" v-model="checkJbHaveMoneyDialog" size="tiny">
      <span>
        <i class="el-icon-warning" style="color:#f00"></i>&nbsp一旦确认提交，将不可修改。
      </span>
      <el-form label-width="150px" label-position="right" style="margin-top:20px;margin-left:8%;" :model="form" :rules="rules" ref="form">
        <el-form-item label="结算方式：">
          <span>余额</span>
        </el-form-item>
        <el-form-item label="应收款：">
          <span style="color:#f00">{{dialogData.totalMoney | formatMoney}}</span>
        </el-form-item>
        <el-form-item label="可用余额抵扣：">
          <span>{{dialogData.availableBalance | formatMoney}}</span>
        </el-form-item>
        <el-form-item required label="到账日期：">
          <el-date-picker v-model="form.date" placeholder="选择日期" :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对账备注：" style="margin-bottom: 40px; " prop="remark">
          <limitInput :maxLength="500" :model="form.remark" type="textarea" v-on:update="updateRemark"></limitInput>
        </el-form-item>
        <template v-if="reqCheckParams.ids.length = 1">
          <div style="border-bottom:1px dashed #ccc; margin-left:-8%;"></div>
          <el-form-item label="采购商付款金额：">
            <span style="color:#f00">{{dialogData.buyerPayedMoney | formatMoney}}</span>
          </el-form-item>
          <el-form-item label="采购商付款凭据：">
            <article class="media" v-if='dialogData.buyerCertificateList && dialogData.buyerCertificateList.length'>
              <a :href="val" class="image media-left is-64x64" v-lightbox="bCList" v-for="val in bCList">
                <img :src="val+'@200h_200w_1e'" alt="Image" width="60" height="60">
              </a>
            </article>
          </el-form-item>
          <el-form-item label="结算备注：">
            <span>{{dialogData.followerRemark}}</span>
          </el-form-item>
        </template>
      </el-form>
      <footer>
        <el-button size="small" @click.naitve="checkJbHaveMoneyDialog = false">取消</el-button>
        <el-button size="small" :disabled="hadClick || !form.date" type="primary" @click.native="saveCheck('form')">确定</el-button>
      </footer>
    </el-dialog>
    <!-- dialog3.0 内容：逾期未还款展示内容 -功能：跳转调整 -->
    <el-dialog v-model="checkOverdueNoMoneyDialog" size="tiny" title="提示">
      <span>
        <i class="el-icon-warning" style="color:#f00"></i>&nbsp客户已逾期未还款！请确保客户有充足可用余额再进行对账。
      </span>
      <el-form label-width="150px" label-position="right" style="margin-left:8%;">
        <el-form-item label="结算方式：">
          <span>余额</span>
        </el-form-item>
        <el-form-item label="应收款：">
          <span style="color:#f00">{{dialogData.totalMoney | formatMoney}}</span>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{dialogData.availableBalance}}</span>
        </el-form-item>
      </el-form>
      <footer>
        <el-button size="small" @click.naitve="checkOverdueNoMoneyDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click.native="toAdjust(dialogData.customerId)">去调整</el-button>
      </footer>
    </el-dialog>
    <!-- dialog3.1 内容：逾期未还款额度足够展示内容 功能：确认对账 -->
    <el-dialog v-model="checkOverdueHaveMoneyDialog" size="tiny" title="提示">
      <span>
        <i class="el-icon-warning" style="color:#f00"></i>&nbsp客户已逾期未还款！请确保客户有充足可用余额再进行对账。
      </span>
      <el-form label-width="150px" label-position="right" style="margin-top:20px;margin-left:8%;" :model="form" :rules="rules" ref="form">
        <el-form-item label="结算方式：">
          <span>余额</span>
        </el-form-item>
        <el-form-item label="应收款：">
          <span style="color:#f00">{{dialogData.totalMoney | formatMoney}}</span>
        </el-form-item>
        <el-form-item label="可用余额抵扣：">
          <span>{{dialogData.availableBalance | formatMoney}}</span>
        </el-form-item>
        <el-form-item required label="到账日期：">
          <el-date-picker v-model="form.date" placeholder="选择日期" :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对账备注：" style="margin-bottom: 40px; " prop="remark">
          <limitInput :maxLength="500" :model="form.remark" type="textarea" v-on:update="updateRemark"></limitInput>
        </el-form-item>
        <template v-if="reqCheckParams.ids.length = 1">
          <div style="border-bottom:1px dashed #ccc; margin-left:-8%;"></div>
          <el-form-item label="采购商付款金额：">
            <span style="color:#f00">{{dialogData.buyerPayedMoney | formatMoney}}</span>
          </el-form-item>
          <el-form-item label="采购商付款凭据：">
            <article class="media" v-if='dialogData.buyerCertificateList && dialogData.buyerCertificateList.length'>
              <a :href="val" class="image media-left is-64x64" v-lightbox="bCList" v-for="val in bCList">
                <img :src="val+'@200h_200w_1e'" alt="Image" width="60" height="60">
              </a>
            </article>
          </el-form-item>
          <el-form-item label="结算备注：">
            <span>{{dialogData.followerRemark}}</span>
          </el-form-item>
        </template>
      </el-form>
      <footer>
        <el-button size="small" @click.naitve="checkOverdueHaveMoneyDialog = false">取消</el-button>
        <el-button size="small" :disabled="hadClick || !form.date" type="primary" @click.native="saveCheck('form')">确定</el-button>
      </footer>
    </el-dialog>
    <lightbox></lightbox>
    <div class="loading" v-show="showLoading"></div>
  </div>
</template>

<style lang="scss">
.loading {
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, .5)
}

.check-account-tab {
  .el-tabs__content {
    position: static
  }
  .el-table td .cell {
    padding: 5px;
  }
  .line {
    height: 1px;
    border-bottom: 1px solid dashed;
  }
  .red {
    color: red;
  }
  .fl {
    float: left;
  }
  .imglist {
    float: left;
    width: 300px;
  }
}
</style>
<script>
import VueFlatpickr from 'vue-flatpickr/VueFlatpickr-en.vue'
import 'vue-flatpickr/assets/flatpickr.min.css'
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import limitInput from 'components/limitInput.vue'
import _ from 'lodash'
import AccountApi from 'api/account'
import checkTabs from 'components/checkTabs'
import {
  request,
  newRequest,
  formatTimeString,
  getCategoryStr,
  getCache,
  setCache
} from 'common/utils'
export default {
  components: {
    VueFlatpickr,
    HeadFilter,
    pagination,
    Lightbox,
    checkTabs,
    limitInput
  },
  data() {
    const filters = getCache({
      key: 'checkAccountFilters',
    }) || {
        pageNumber: 1,
        pageSize: 20,
      };
    const validateLength = (rule, value, callback) => {
      console.log(this.form.remark.length)
      if (this.form.remark.length > 500) {
        return callback(new Error('备注不能超过500字'));
      } else {
        callback();
      }
    }
    return {
      isCheckAgain: false,
      bCList: [],
      hadClick: false,
      checkOverdueNoMoneyDialog: false,
      checkOverdueHaveMoneyDialog: false,
      checkJbNoMoneyDialog: false,
      checkJbHaveMoneyDialog: false,
      checkNoMoneyDialog: false,
      checkHaveMoneyDialog: false,
      dialogData: {
        templateId: 1,
      },
      rowData: {
        hasOpenedBaitiao: 1,
      },
      reqCheckParams: {
        ids: [],
        creditType: 3,
        // 1.搜芽 2.徙木 3余额
      },
      waitCheckData: {
        buyerIds: [],
        ids: [],
        allJb: [],
      },
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < Date.parse(new Date(time))
        }
      },
      time: '',
      msg: '待分账',
      height: '600',
      checkYuerDialogVisible: false,
      shikuanDialogVisible: false,
      qiankuanDialogVisible: false,
      checkYuerDialogJianban: false,
      shikuanDialogJianban: false,
      duizhangDialog: {
        row: {
          ids: [],
          category: [],
        }
      }, // 销账弹窗
      cannotduizhang: {
        visible: false,
        tips: ''
      },
      customerAccount: {},
      buyerPayedMoney: '', // 采购商付款金额
      buyerCertificateList: [], // 采购商付款金额
      content: '', // 跟单员结算备注
      id: '',
      receivedTime: '',
      daozhangriqi: '',
      fullscreenLoading: true,
      filters: filters,
      payGroupList: {
        total: 0,
        page: {
          result: []
        }
      },
      payDebtList: {
        total: 0,
        page: {
          result: []
        }
      },
      showLoading: false,
      CheckVisible: false, // 单条对账的弹框
      singleCheckData: {}, // 单条对账内容信息
      singleCheckTitle: null, // 单条对账的头部提示内容
      multipleCheckFlag: true, // 单条对账和多条对账下边显示的切换
      timeFlag: null, // 记录点击对账的弹框的时候的时间戳
      ids: [], // 记录对账的id区别是批量对账还是单挑对账
      checkAgainVisible: false, // 重新对账的弹框
      checkAgainTitle: null, // 重新对账的头部提示内容
      checkAgainData: {}, // 重新对账内容
      checkAgainId: null, // 保存的时候提交的重新对账的id
      form: {
        date: '',
        remark: ''
      },
      rules: {
        remark: [
          { max: 500, validator: validateLength, trigger: 'blur' }
        ],
        // date: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ]
      }
    }
  },
  created() {
    // this.defaultTabKey = this.$route.query.type
    this.currentTab = getCache({
      key: 'checkAccountTabType',
    }) || 1
  },
  watch: {
    'form.date': function(val, oldVal) {
      setCache({
        key: 'selectedDuiZhangDate',
        value: val
      })
    },
    daozhangriqi: function(val, oldVal) {
      setCache({
        key: 'selectedDuiZhangDate',
        value: val
      })
    }
  },
  mounted() {
    this.time = new Date().getTime()
    this.height = String(window.document.body.clientHeight - 510);
    this.listPayGroup();
    this.form.date = getCache({ key: 'selectedDuiZhangDate' }) ? getCache({ key: 'selectedDuiZhangDate' }) : ''
    this.daozhangriqi = getCache({ key: 'selectedDuiZhangDate' }) ? getCache({ key: 'selectedDuiZhangDate' }) : ''
    console.log('selectedDuiZhangDate:' + this.form.date)
  },
  filters: {
    formateNumber(val) {
      return (val === null || val === -1) ? '--' : Number(val).toFixed(2)
    }
  },
  methods: {
    handleCheckAgainBtn(row) {
      this.reqCheckParams.creditType = 3
      this.isCheckAgain = true
      this.timeFlag = new Date().getTime()
      let ids = []
      this.reqCheckParams.ids = ids
      this.rowData = JSON.parse(JSON.stringify(row))
      this.rowData.hasOpenedBaitiao = 0
      let creditType = 3
      ids.push(row.id)
      newRequest({
        url: '/redwood/account/ReconciliationConfirm/getById',
        data: {
          ids: ids,
          creditType: creditType
        },
        method: 'get',
        contentType: 'application/json',
      }).then(res => {
        if (res.success == 1) {
          if (res.obj.buyerCertificateList != null) {
            this.bCList = res.obj.buyerCertificateList
            for (let i = 0; i < this.bCList.length; i++) {
              this.bCList[i] = 'http://www.soouya.com' + this.bCList[i]
            }
          }
          this.dialogData = res.obj
          this.hadClick = false
          if (([1, 2, 3].indexOf(this.dialogData.templateId)) > -1) {
            this.checkNoMoneyDialog = true
          } else if (([4, 5, 6].indexOf(this.dialogData.templateId)) > -1) {
            this.checkHaveMoneyDialog = true
          } else if (this.dialogData.templateId == 7) {
            this.checkJbNoMoneyDialog = true
          } else if (this.dialogData.templateId == 8) {
            this.checkJbHaveMoneyDialog = true
          } else if (this.dialogData.templateId == 9) {
            this.checkOverdueNoMoneyDialog = true
          } else if (this.dialogData.templateId == 10) {
            this.checkOverdueHaveMoneyDialog = true
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleTypeChange(val) {
      // this.fullscreenLoading = true
      this.checkNoMoneyDialog = false
      this.checkHaveMoneyDialog = false
      if (val === null) {
        this.reqCheckParams.creditType = 3
      } else {
        this.reqCheckParams.creditType = val
      }
      // this.reqCheckParams.ids = JSON.parse(JSON.stringify(this.waitCheckData.ids))
      let ids = []
      if (this.reqCheckParams.ids.length && this.reqCheckParams.ids[0] != undefined) {
        ids = this.reqCheckParams.ids
      } else {
        ids = this.waitCheckData.ids
        // this.reqCheckParams.ids = ids
      }
      console.log(ids)
      newRequest({
        url: '/redwood/account/ReconciliationConfirm/getById',
        data: {
          ids: ids,
          creditType: this.reqCheckParams.creditType
        },
        method: 'get',
        contentType: 'application/json',
      }).then(res => {
        if (res.success == 1) {
          if (res.obj.buyerCertificateList != null) {
            this.bCList = res.obj.buyerCertificateList
            for (let i = 0; i < this.bCList.length; i++) {
              this.bCList[i] = 'http://www.soouya.com' + this.bCList[i]
              // console.log(this.bCList[i])
            }
          }
          // console.log(this.bCList)
          this.dialogData = res.obj
          this.hadClick = false
          // console.log(this.dialogData)
          if (([1, 2, 3].indexOf(this.dialogData.templateId)) > -1) {
            this.checkNoMoneyDialog = true
          } else if (([4, 5, 6].indexOf(this.dialogData.templateId)) > -1) {
            this.checkHaveMoneyDialog = true
          } else if (this.dialogData.templateId == 7) {
            this.checkJbNoMoneyDialog = true
          } else if (this.dialogData.templateId == 8) {
            this.checkJbHaveMoneyDialog = true
          } else if (this.dialogData.templateId == 9) {
            this.checkOverdueNoMoneyDialog = true
          } else if (this.dialogData.templateId == 10) {
            this.checkOverdueHaveMoneyDialog = true
          }
        } else {
          this.$message.error(res.msg)
        }
        // this.fullscreenLoading = false
      })
    },
    handleCheckBtn(row) {
      this.isCheckAgain = false
      this.timeFlag = new Date().getTime();
      this.reqCheckParams.ids = []
      this.reqCheckParams.ids.push(row.id)
      console.log(this.reqCheckParams.ids)
      this.rowData = JSON.parse(JSON.stringify(row))
      let creditType = 0
      if (row.creditType && row.category != 'jb-all') {
        creditType = row.creditType
      } else {
        creditType = 3
      }
      this.handleTypeChange(creditType)
    },
    canSelect(row, index) {
      return row.status === 1
    },
    handleSelectionChange(val) {
      if (val.length) {
        this.rowData = JSON.parse(JSON.stringify(val[0]))
        this.waitCheckData.buyerIds = []
        this.waitCheckData.ids = []
        this.waitCheckData.allJb = []
        let buyerId = val[0].buyerId
        let allJb = val[0].category
        this.waitCheckData.ids.push(val[0].id)
        this.waitCheckData.buyerIds.push(buyerId)
        this.waitCheckData.allJb.push(allJb)
        let type = val[0].creditType
        this.waitCheckData.creditType = val[0].creditType
        for (let i = 1; i < val.length; i++) {
          if (buyerId != val[i].buyerId) {
            this.waitCheckData.buyerIds.push(val[i].buyerId)
          }
          if (allJb != val[i].category) {
            this.waitCheckData.allJb.push(val[i].category)
          }
          if (type != val[i].creditType) {
            this.waitCheckData.creditType = 3
          }
          this.waitCheckData.ids.push(val[i].id)
        }
      }
    },
    batchDuiZhangHandle() {
      this.isCheckAgain = false
      this.timeFlag = new Date().getTime();
      this.reqCheckParams.ids = []
      console.log(this.waitCheckData)
      if (this.waitCheckData.buyerIds.length > 1) {
        this.$message.error('请选择相同采购商')
        this.reqCheckParams.ids = []
      } else if (this.waitCheckData.allJb.length > 1) {
        this.$message.error('请选择相同类型订单')
        this.reqCheckParams.ids = []
      } else {
        if (this.waitCheckData.allJb[0] == 'jb-all') {
          this.waitCheckData.creditType = 3
        }
        this.handleTypeChange(this.waitCheckData.creditType)
      }
    },
    updateRemark(val) {
      this.form.remark = val;
    },
    PayGroupConfirmIncome(row) { // 点击对账按钮
      this.timeFlag = new Date().getTime();
      this.ids = [];
      this.ids.push(row.id);
      newRequest({
        url: AccountApi.Reconciliation.reconciliationConfirm,
        method: 'get',
        data: { ids: row.id }
      }).then(res => {
        if (res.success == '1') {
          this.singleCheckData = res.obj;
          this.CheckVisible = true;
          this.multipleCheckFlag = false;
          const partten = new RegExp('^1|5|7|10$');
          const flag = partten.test(this.singleCheckData.templateId);
          if (flag) {
            this.singleCheckTitle = '提示';
          } else {
            this.singleCheckTitle = '确认对账';
          }
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    saveCheck(formName) { // 对账弹框保存
      this.hadClick = true
      var time = null;
      if (this.form.date) {
        console.log(this.form.date)
        time = Date.parse(new Date(this.form.date))
        console.log(time)
      }
      let ids = []
      if (this.reqCheckParams.ids.length && this.reqCheckParams.ids[0] != undefined) {
        ids = this.reqCheckParams.ids
      } else {
        ids = this.waitCheckData.ids
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.CheckVisible = false;
          if (this.isCheckAgain) {
            this.checkAgainId = this.reqCheckParams.ids[0]
            newRequest({
              url: '/redwood/account/Reconciliation/reConfirmIncome',
              method: 'POST',
              contentType: 'application/json',
              data: {
                id: this.checkAgainId,
                creditType: this.reqCheckParams.creditType,
                incomeTime: time,
                financeRemark: this.form.remark,
                _time: this.timeFlag,
                // templateId: this.dialogData.templateId
              }
            }).then(res => {
              if (res.success == '1') {
                this.form.remark = ''
                this.$message.success(res.msg)
                this.checkHaveMoneyDialog = false
                this.checkJbHaveMoneyDialog = false
                this.checkOverdueHaveMoneyDialog = false
                this.listPayGroup();
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            newRequest({
              url: AccountApi.Reconciliation.batchConfirmIncome,
              method: 'post',
              contentType: 'application/json',
              data: {
                ids: ids,
                creditType: this.reqCheckParams.creditType,
                incomeTime: time,
                financeRemark: this.form.remark,
                _time: this.timeFlag,
                templateId: this.dialogData.templateId
              }
            }).then(res => {
              if (res.success == '1') {
                // this.form.date = null;
                this.form.remark = ''
                this.$message.success(res.msg)
                this.checkHaveMoneyDialog = false
                this.checkJbHaveMoneyDialog = false
                this.checkOverdueHaveMoneyDialog = false
                this.listPayGroup();
              } else {
                this.$message.error(res.msg)
                this.hadClick = false
              }
            })
          }
        } else {
          this.hadClick = false
          this.$message.error('提交失败')
          console.log('error submit!!');
          return false;
        }
      });
    },
    checkAgain(id) { // 点击重新对账按钮
      this.checkAgainId = id;
      newRequest({
        url: AccountApi.Reconciliation.reconciliationConfirm,
        method: 'get',
        data: { ids: this.checkAgainId }
      }).then(res => {
        if (res.success == '1') {
          this.checkAgainVisible = true; // 成功才显示重新对账，否则不出现弹框
          this.checkAgainData = res.obj;
          if (this.checkAgainData.templateId == '7') {
            this.checkAgainTitle = '提示';
          } else {
            this.checkAgainTitle = '重新对账';
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    saveCheckAgain(formName) { // 保存重新对账
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkAgainVisible = false;
          newRequest({
            url: AccountApi.Reconciliation.reConfirmIncome,
            method: 'post',
            contentType: 'application/json',
            data: {
              id: this.checkAgainId,
              incomeTime: Date.parse(new Date(this.form.date)),
              financeRemark: this.form.remark
            }
          }).then(res => {
            if (res.success == '1') {
              // this.form.date = null;
              this.form.remark = '';
              this.$message.success(res.msg)
              this.listPayGroup();
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    doPayGroup() { // 确定对账按钮
      const that = this
      newRequest({
        url: AccountApi.Reconciliation.confirmIncome,
        contentType: 'application/json',
        data: {
          ids: this.duizhangDialog.row.ids,
          _time: that.time,
          incomeTime: Date.parse(new Date(this.daozhangriqi))
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        that.shikuanDialogVisible = false
        this.shikuanDialogJianban = false
        Object.assign(that.duizhangDialog.row, {
          ids: [],
          category: [],
        })
        if (res.success == '1') {
          this.$message.success('操作成功!')
          if (that.customerAccount.totalMoney < that.customerAccount.available && that.customerAccount.availableBalance < that.customerAccount.totalMoney) {
            // 产生欠款  直接切换到 欠款tab
            setCache({
              key: 'checkAccountTabType',
              value: 2
            })
            this.listPayGroup();
            // location.reload()
          } else {
            this.listPayGroup();
            // that.$router.push('/finance/reconciliation')
          }
        } else {
          res.msg && this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    PayGroupSendbackIncome(id) { // 实款-对账异常
      const that = this
      const _time = new Date().getTime()
      this.$prompt('请描述异常问题（120个字以内）', '异常', {
        inputPattern: /^\S{0,120}$/,
        inputErrorMessage: '120个字以内'
      }).then(data => {
        that.fullscreenLoading = true
        newRequest({
          url: AccountApi.Reconciliation.sendbackIncome,
          data: {
            id: id,
            remark: data.value || '',
            _time: _time
          },
          contentType: 'application/json',
          method: 'post',
        }).then(res => {
          that.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            setCache({
              key: 'checkAccountTabType',
              value: 1
            })
            location.reload()
            // location.href = '/finance/checkAccount?type=1'
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    toAdjust(id) { // 去调整额度
      this.checkYuerDialogVisible = false
      this.checkNoMoneyDialog = false
      this.checkOverdueNoMoneyDialog = false
      this.checkJbNoMoneyDialog = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${id}`)
    },
    toPrint(orderNumber) { // 去打印
      window.open(`/common/printDetail/${orderNumber}`)
    },
    getCustomerInfo(row) { // 单条大货数据对账
      const that = this
      that.fullscreenLoading = true
      newRequest({ // 获取当前采购商的账户信息
        url: AccountApi.Account.getById,
        method: 'get',
        data: {
          id: row.buyerId || row.userId
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = row.totalMoney
          that.customerAccount.keYongYueDikou = row.totalMoney < that.customerAccount.availableBalance ? row.totalMoney : that.customerAccount.availableBalance
          that.buyerCertificateList = row.buyerCertificateList
          that.content = row.content
          that.buyerPayedMoney = row.buyerPayedMoney
          if (data.obj.available < row.totalMoney && that.currentTab == 1) {
            that.checkYuerDialogVisible = true
          } else {
            that.shikuanDialogVisible = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    getCustomerListInfo(buyerId) { // 批量大货数据对账
      const that = this
      that.fullscreenLoading = true
      request({ // 获取当前采购商的账户信息
        url: AccountApi.Account.getById,
        method: 'post',
        data: {
          param: JSON.stringify({ id: buyerId })
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = this.duizhangDialog.row.totalMoney
          that.customerAccount.keYongYueDikou = this.duizhangDialog.row.totalMoney < that.customerAccount.availableBalance ? this.duizhangDialog.row.totalMoney : that.customerAccount.availableBalance
          that.buyerCertificateList = []
          that.content = ''
          that.buyerPayedMoney = this.duizhangDialog.row.buyerPayedMoney
          if (data.obj.available < this.duizhangDialog.row.totalMoney && that.currentTab == 1) {
            that.checkYuerDialogVisible = true
          } else {
            that.shikuanDialogVisible = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    getJianbanInfo(row) { // 单条剪版数据对账
      const that = this
      that.fullscreenLoading = true
      request({ // 获取当前采购商的账户信息
        url: AccountApi.Account.getById,
        method: 'post',
        data: {
          param: JSON.stringify({ id: row.buyerId || row.userId })
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = row.totalMoney
          that.customerAccount.keYongYueDikou = that.customerAccount.availableBalance
          that.buyerPayedMoney = row.buyerPayedMoney
          that.buyerCertificateList = row.buyerCertificateList
          that.content = row.content
          if (data.obj.availableBalance < row.totalMoney && that.currentTab == 1) {
            that.checkYuerDialogJianban = true
          } else {
            that.shikuanDialogJianban = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    getJianbanListInfo(buyerId) { // 批量剪版数据对账
      const that = this
      that.fullscreenLoading = true
      request({ // 获取当前采购商的账户信息
        url: AccountApi.Account.getById,
        method: 'post',
        data: {
          param: JSON.stringify({ id: buyerId })
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          that.customerAccount.totalMoney = this.duizhangDialog.row.totalMoney
          that.customerAccount.keYongYueDikou = that.customerAccount.availableBalance
          that.buyerPayedMoney = this.duizhangDialog.row.buyerPayedMoney
          that.buyerCertificateList = []
          that.content = ''
          if (data.obj.availableBalance < this.duizhangDialog.row.totalMoney && that.currentTab == 1) {
            that.checkYuerDialogJianban = true
          } else {
            that.shikuanDialogJianban = true
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    PayDebtConfirmIncome(row) { // 欠款-确认对账
      const that = this
      this.time = new Date().getTime();
      this.id = row.id
      that.getCustomerInfo(row)
    },
    doPayDebt() {
      const that = this
      that.fullscreenLoading = true
      const param = JSON.stringify({
        id: this.id,
        available: that.customerAccount.keYongYueDikou,
        realTotalMoney: that.customerAccount.totalMoney - that.customerAccount.keYongYueDikou,
        receivedTime: Date.parse(new Date(that.receivedTime)),
        _time: that.time
      })
      request({
        url: AccountApi.PayDebt.confirmIncome,
        data: {
          param,
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        that.qiankuanDialogVisible = false
        if (res.success == '1') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          setCache({
            key: 'reconciliationTabkey',
            value: 2
          })
          this.listPayGroup();
          // that.$router.push('/finance/reconciliation')
        } else {
          res.msg && this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    PayDebtSendbackIncome(id) { // 欠款-对账异常
      const that = this
      this.time = new Date().getTime();
      this.$prompt('请描述异常问题（120个字以内）', '异常', {
        inputPattern: /^\S{0,120}$/,
        inputErrorMessage: '120个字以内'
      }).then(data => {
        that.fullscreenLoading = true
        request({
          url: AccountApi.PayDebt.sendbackIncome,
          data: {
            param: JSON.stringify({
              id: id,
              exceptionMsg: data.value || '',
              _time: this.time
            })
          },
          method: 'post'
        }).then(res => {
          that.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            setCache({
              key: 'checkAccountTabType',
              value: 2
            })
            this.listPayDebt()
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    seleted(list) {
      let seletedText = ''
      list.length && list.map((item, i) => {
        const index = item.indexOf(this.filters.orderNumber)
        if (index != -1) {
          seletedText = item
          return
        }
      })
      return seletedText || list[0]
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    jumpToPayDetail(id, status, category, serviceNumberList, outReposityNumberList) {
      setCache({
        key: 'checkAccountTabType',
        value: 1
      });
      this.$router.push(`/finance/checkAccount/detail?id=${id}&status=${status}&category=${category}&cutNumber=${serviceNumberList[0]}&outNumber=${outReposityNumberList}`)
    },
    jumpToDebtDetail(id) {
      setCache({
        key: 'checkAccountTabType',
        value: 2
      });
      this.$router.push(`/finance/checkAccount/debtDetail?id=${id}`)
    },
    getFilter(params) {
      this.filters = params
      this.filters.expectedIncomeMoney = params.totalMoney
      if (!this.filters.createTimeBegin) {
        delete this.filters.createTimeBegin
      }
      if (!this.filters.createTimeEnd) {
        delete this.filters.createTimeEnd
      }
      if (this.filters.buyerHasOpenedBaitiao == 0 || this.filters.buyerHasOpenedBaitiao) {
        this.filters.hasOpenedBaitiao = this.filters.buyerHasOpenedBaitiao
      }
      this.filters.pageNumber = 1
      this.listPayGroup()
    },
    listPayGroup() {
      const that = this
      that.fullscreenLoading = true
      if (that.filters && !that.filters.pageNumber) {
        that.filters.pageNumber = 1
      }
      if (that.filters && !that.filters.pageSize) {
        that.filters.pageSize = 20
      }
      that.filters._time = that.time;
      const param = _.clone(that.filters)
      delete param.currentTab
      // const option = Object.assign({_time: that.time}, that.filters, req)
      // const obj = {}
      // for (const key of Object.keys(option)) {
      //   if (option[key]) {
      //     obj[key] = option[key]
      //   }
      // }
      request({
        url: AccountApi.Reconciliation.list,
        contentType: 'application/json',
        data: JSON.stringify(this.filters),
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        if (res.success === '1') {
          setCache({
            key: 'checkAccountFilters',
            value: that.filters,
          });
          res.page.result = res.page.result || []
          res.page.result = res.page.result.map((item) => {
            switch (String(item.payWay)) {
              case 'alipay':
                item.payWay = '支付宝手机支付'
                break
              case 'tecent_wx':
                item.payWay = '微信支付'
                break
              case 'offline':
                item.payWay = '线下支付'
                break
            }
            switch (String(item.payType)) {
              case '0':
                item.payType = '欠款'
                break
              case '1':
                item.payType = '实款'
                break
            }
            if (item.createTime || item.createTime <= 0) {
              item.createTimeString = formatTimeString(item.createTime)
            } else {
              item.createTimeString = '--'
            }
            return item
          })
          that.payGroupList = res
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    listPayDebt() {
      const that = this
      if (this.filters && !this.filters.pageNumber) {
        this.filters.pageNumber = 1
      }
      if (this.filters && !this.filters.pageSize) {
        this.filters.pageSize = 20
      }
      this.filters._time = this.time;
      const param = _.clone(that.filters)
      delete param.currentTab
      // const option = Object.assign({_time: that.time}, that.filters, req)
      // const obj = {}
      // for (const key of Object.keys(option)) {
      //   if (option[key]) {
      //     obj[key] = option[key]
      //   }
      // }
      request({
        url: AccountApi.PayDebt.list,
        data: {
          param: JSON.stringify(this.filters)
        },
        method: 'post'
      }).then(res => {
        that.fullscreenLoading = false
        if (res.success === '1') {
          // console.log('this.filters', this.filters)
          setCache({
            key: 'checkAccountFilters',
            value: this.filters,
          });
          res.page.result = res.page.result || []
          res.page.result = res.page.result.map((item) => {
            switch (String(item.payStatus)) {
              case '-1':
                item.status = '异常'
                break
              case '-2':
                item.status = '待付款'
                break
              case '1':
                item.status = '待对账'
                break
              case '2':
                item.status = '已对账'
                break
            }
            switch (String(item.payWay)) {
              case 'alipay':
                item.payWay = '支付宝手机支付'
                break
              case 'tecent_wx':
                item.payWay = '微信支付'
                break
              case 'offline':
                item.payWay = '线下支付'
                break
            }
            switch (String(item.payType)) {
              case '0':
                item.payType = '欠款'
                break
              case '1':
                item.payType = '实款'
                break
            }
            if (item.createTime) {
              item.createTimeString = formatTimeString(item.createTime)
            } else {
              item.createTimeString = '--'
            }
            return item
          })
          that.payDebtList = res
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-form-item__content {
  text-align: left
}
</style>
