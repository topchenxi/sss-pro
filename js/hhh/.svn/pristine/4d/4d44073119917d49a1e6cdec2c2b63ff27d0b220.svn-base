<template>
  <div class="cutMange-list tab-wrap">
    <el-tabs type="card" v-model="tabIndex" @tab-click="handleTableClick" class="has-link tabs-container">
      <el-tab-pane v-for="(item, index) in tabsOptions" :name="item.value" :key="item.value">
        <router-link to="" slot="label" tag="a">
          <template v-if="index == 0">
            <p>{{allCount | filterCount}}</p>
            <p> {{item.label}}</p>
          </template>
          <template v-if="index == 1">
            <p>{{cutCount[500] | filterCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 2">
            <p>{{cutCount[501] | filterCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 3">
            <p>{{cutCount[502] | filterCount}}</p>
            <p> {{item.label}}</p>
          </template>
          <template v-if="index == 4">
            <p>{{cutCount[503] | filterCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 5">
            <p>{{cutCount[521] | filterCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 6">
            <p>{{cutCount[522] | filterCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 7">
            <p>{{cutCount[523] | filterCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 8">
            <p>{{cutCount[530] | filterCount}}</p>
            <p>{{item.label}}</p>
          </template>
          <template v-if="index == 9">
            <p>{{cutCount[521] + cutCount[522] + cutCount[523]}}</p>
            <p>{{item.label}}</p>
          </template>
        </router-link>
      </el-tab-pane>
    </el-tabs>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input placeholder="订单号，采购商名称，供应商名称，销售员，剪版员" v-model="filters.key" @keydown.enter.native="reqList()"> </el-input>
          </div>
          <el-button type="primary" @click.native="search"> 搜索 </el-button>
          <el-button type="primary" @click.native="resetSubmit"> 重置 </el-button>
          <el-button type="primary" v-if="tabIndex==501" :disabled="!multipleSelection.length" @click.native="toLading('')">
            批量通知提货
          </el-button>
        </div>
        <div class="row">
          <div class="item">
            <el-date-picker v-model="filters.createTimeBegin" type="datetime" placeholder="开始时间" @change="reqList()"> </el-date-picker>
          </div>
          <div class="item">
            <el-date-picker v-model="filters.createTimeEnd" type="datetime" placeholder="结束时间" @change="reqList()"> </el-date-picker>
          </div>
          <div class="item" v-if="tabIndex==0">
            <el-select v-model="filters.status" placeholder="全部" @change="reqList()">
              <el-option label="全部" value=""></el-option>
              <el-option :label="statusDesc[500]" :value="500"></el-option>
              <el-option :label="statusDesc[501]" :value="501"></el-option>
              <el-option :label="statusDesc[502]" :value="502"></el-option>
              <el-option :label="statusDesc[503]" :value="503"></el-option>
              <el-option :label="statusDesc[521]" :value="521"></el-option>
              <el-option :label="statusDesc[522]" :value="522"></el-option>
              <el-option :label="statusDesc[523]" :value="523"></el-option>
              <el-option :label="statusDesc[530]" :value="530"></el-option>
              <el-option label="待发货" :value="5200"></el-option>
              <el-option label="已发货" :value="5201"></el-option>
            </el-select>
          </div>
          <el-button class="fr" v-if="tabIndex==0" type="primary" :disabled="canDownExcel" @click.native="exportExcel">导出excel</el-button>
          <el-button class="fr" v-if="tabIndex==522 || tabIndex==523" type="primary" :disabled="!multipleSelection.length" @click.native="print">
            打印
          </el-button>
          <el-button class="fr" v-if="tabIndex == 521" type="primary" :disabled="!multipleSelection.length" @click.native="batchSubmitPay">
            批量提交支付
          </el-button>
        </div>
      </div>
    </div>
    <div class="y_table m20 mt0 pt0 mr0">
      <div class="y_table_wrap ">
        <el-table border :data="result" :resizable="false" :height="height" @selection-change="handleSelectionChange" v-if="result.length>0">
          <el-table-column type="selection" width="55" fixed="left" v-if="isNeedselection"> </el-table-column>
          <el-table-column align="center" min-width="180" label="订单编号">
            <template scope="scope"> {{scope.row.number}}
              <br/> <span v-if="scope.row.delayTime > 0" style="color:red;"> {{scope.row.delayTime | formatDate}}发货 </span> </template>
          </el-table-column>
          <el-table-column align="center" width="160" label="订单时间">
            <template scope="scope"> {{scope.row.createTime | formatTime}} </template>
          </el-table-column>
          <el-table-column align="center" label="采购商名称" width="250">
            <template scope="scope">
              {{scope.row.customerCompany}}/{{scope.row.customerNumber}}
            </template>
          </el-table-column>
          <el-table-column prop="shopCompany" align="center" width="120" label="供应商名称"> </el-table-column>
          <el-table-column align="center" :render-header="title" width="770" class="product-td" class-name="product-column">
            <template scope="scope">
              <ul class="product-wrap">
                <li v-for='(product, index) in scope.row.productNumbers' class="product-item">
                  <div style="border-right: 1px solid #ddd;width:100px"> {{product.number}} </div>
                  <div style="border-right: 1px solid #ddd;"> {{product.title}} </div>
                  <div>
                    <ul class="item-table">
                      <li v-for='(color, key_2) in product.colors' class="color-item"> <span> {{color.color}} <label v-if="color.status == 0" style="color:red;"> (无货) </label> </span> <span> {{color.followerQuantity > 0 ? color.followerQuantity.toFixed(2) + color.followerQuantityUnit : '--'}} </span> <span> {{color.taxPoint > 0 ? color.taxPoint + '%' : '--'}} </span> <span> {{color.salePriceMoney > 0 ? color.salePriceMoney + color.salePriceUnit : '--'}} </span> <span> {{color.cutterQuantity > 0 ? color.cutterQuantity.toFixed(2) + color.cutterQuantityUnit: '--'}} </span> <span> {{color.followerPriceMoney > 0 ? color.followerPriceMoney + color.followerPriceUnit : '--' }} </span> <span> {{color.cutterPriceMoney > 0 ? color.cutterPriceMoney + color.cutterPriceUnit : '--'}} </span> </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column align="center" label="总费用" width="80">
            <template scope="scope">
              <template v-if="scope.row.totalMoney && scope.row.totalMoney > 0"> {{scope.row.totalMoney | formateNumber}}元 </template>
              <template v-else> -- </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="销售员" width="150" prop="salerName"> </el-table-column>
          <el-table-column align="center" label="剪版员" width="150" prop="cutterName"> </el-table-column>
          <el-table-column align="center" label="订单状态" width="150">
            <template scope="scope">
              <template v-if="scope.row.status == '500'">{{statusDesc[500]}}</template>
              <template v-if="scope.row.status == '501'">{{statusDesc[501]}}</template>
              <template v-if="scope.row.status == '502'">{{statusDesc[502]}}</template>
              <template v-if="scope.row.status == '503'">{{statusDesc[503]}}</template>
              <template v-if="scope.row.status == '520'">待发货</template>
              <template v-if="scope.row.status == '521'">
                <span v-if="filters.status == 520 || filters.status == 5200 || filters.status == 5201">
                <span v-if="scope.row.sendStatus == 1">已发货</span>
                <span v-else>待发货</span> </span>
                <span v-if="filters.status != 520 && filters.status != 5200 && filters.status != 5201"> {{statusDesc[521]}} </span>
              </template>
              <template v-if="scope.row.status == '522'">
                <span v-if="filters.status == 520 || filters.status == 5200 || filters.status == 5201">
                <span v-if="scope.row.sendStatus == 1">已发货</span>
                <span v-else>待发货</span> </span>
                <span v-if="filters.status != 520 && filters.status != 5200 && filters.status != 5201"> {{statusDesc[522]}} </span> </template>
              <template v-if="scope.row.status == '523'">
                <span v-if="filters.status == 520 || filters.status == 5200 || filters.status == 5201">
                <span v-if="scope.row.sendStatus == 1">已发货</span>
                <span v-else>待发货</span> </span>
                <span v-if="filters.status != 520 && filters.status != 5200 && filters.status != 5201"> {{statusDesc[523]}} </span>
              </template>
              <template v-if="scope.row.status == '530'">
                {{statusDesc[530]}}
              </template>
            </template>
          </el-table-column>
          <el-table-column inline-template align="center" label="操作" width="200" fixed="right">
            <div class="operate-btn">
              <div>
                <el-button @click.native="toLading(row.id)" class="table-btn" v-if="row.status == 501">通知提货</el-button>
                <el-button class="table-btn" v-if="row.status == 521" @click.native="submitPay(row)">提交支付 </el-button>
                <el-button @click.native="delay(row.id)" class="table-btn" v-if="row.status == 501 || row.status == 502 || row.status == 503 || row.status == 520">延期发货</el-button>
                <el-button @click.native="cancel(row.id)" class="table-btn" v-if="(row.status == 500 || row.status == 501 || row.status == 520)">取消订单</el-button>
                <el-button @click.native="cancel2(row.id)" class="table-btn" v-if="(row.status == 502 || row.status == 503)">取消订单</el-button>
                <el-button @click.native="input(row, $index)" class="table-btn submit" v-if="row.status == 500">录入剪版信息</el-button>
              </div>
              <div>
                <router-link :to="{name: 'guiderCutUpdate', query: { id: row.id}}" v-if="[500,501,502,503,521].indexOf(row.status) != -1">
                  <el-button class="table-btn submit">编辑</el-button>
                </router-link>
                <router-link :to="{name: 'guiderCutDetail', query: { id: row.id}}">
                  <el-button class="table-btn">详情</el-button>
                </router-link>
              </div>
            </div>
          </el-table-column>
        </el-table>
        <div class="empty" v-else :style="{height: height + 'px'}"></div>
      </div>
      <div class="bottom">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" /> </div>
    </div>
    <el-dialog v-model="payVisible" title="提交支付" size="small" custom-class="cutManage-pay-money" :close-on-click-modal="false">
      <div class="pay-content">
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;"> 采  购  商: </span>
          <div style="width: 300px; display: inline-block;margin-left: 110px;">
            <div class="showmadan"> {{pay.customerCompany}} </div>
          </div>
        </div>
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;"> 账户金额: </span>
          <div style=" display: inline-block;margin-left: 110px;">
            <div class="showmadan">
              <p>可用余额：&yen;{{pay.availableBalance}}</p>
              <p>可用白条额度：&yen;{{pay.baitiaoRemainLine}}（白条额度：&yen;{{pay.baitiaoCreditLine}} 预扣金额：&yen;{{pay.baitiaoHoldMoney}}）</p>
              <p>可用垫付额度：&yen;{{pay.remainLine}}（垫付额度：&yen;{{pay.creditLine}} 预扣金额：&yen;{{pay.holdMoney}}）</p>
            </div>
          </div>
        </div>
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;"> 总费用: </span>
          <div style=" display: inline-block;margin-left: 110px;">
            <div class="showmadan">
              <p>{{pay.totalMoney}}元</p>
            </div>
          </div>
        </div>
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;"> <b style="color: red;">*</b>支付方式: </span>
          <div style=" display: inline-block;margin-left: 110px;">
            <div class="showmadan">
              <!-- <el-radio class="radio" v-model="pay.creditType" label="3">余额支付</el-radio> -->
              垫付支付
            </div>
          </div>
        </div>
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;"> <b style="color: red;">*</b>回款时间: </span>
          <div style=" display: inline-block;margin-left: 110px;">
            <div class="showmadan">
              <el-date-picker v-model="pay.returnDate" type="date" size="small" placeholder="选择时间" :picker-options="pickerOptions1"> </el-date-picker>
            </div>
          </div>
        </div>
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;">垫付凭据: </span>
          <div style="width: 500px; display: inline-block;margin-left: 110px;">
            <div class="showmadan"> <a :href="'http://www.soouya.com' + item" :key="item" v-lightbox="pay.prepayCredentialUrls" v-for="(item, index) in pay.prepayCredentialUrls" class="madan-wrap"> <img :src="'http://www.soouya.com' + item" width='40' height="40" /> <span @click="delPrepayCredentialUrl(index)" class="del-arrow">X</span> </a> </div>
            <el-upload idx="prepayCredentialUrls" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="display:inline-block; width: auto; margin-bottom: 8px;" :before-upload="beforePrepayUpload" :on-error="handleError" v-if="pay.prepayCredentialUrls.length < 9">
              <div class="upImg">+</div>
            </el-upload>
          </div>
        </div>
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;"> 付款凭据: </span>
          <div style="width: 500px; display: inline-block;margin-left: 110px;">
            <div class="showmadan"> <a :href="'http://www.soouya.com' + item" :key="item" v-lightbox="pay.payCredentialUrls" v-for="(item, index) in pay.payCredentialUrls" class="madan-wrap"> <img :src="'http://www.soouya.com' + item" width='40' height="40" /> <span @click="delPayCredentialUrl(index)" class="del-arrow">X</span> </a> </div>
            <el-upload idx="payCredentialUrls" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="display:inline-block; width: auto; margin-bottom: 8px;" :before-upload="beforePayUpload" :on-error="handleError" v-if="pay.payCredentialUrls.length < 9">
              <div class="upImg">+</div>
            </el-upload>
          </div>
        </div>
        <div class="pay-item"> <span class="pay-item-l" style="position: absolute; top: 0; left: 0;"> 结算备注: </span>
          <div style="width: 500px; display: inline-block;margin-left: 110px;">
            <div class="showmadan">
              <el-input type="textarea" :rows="4" style="resize:none;" placeholder="请输入内容" :maxlength="100" v-model="pay.payRemark"> </el-input> {{pay.payRemark.length}}/100 </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" @click.native="confirmPay()">确定支付</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="delayVisible" title="延期发货" size="mini" :close-on-click-modal="false"> <b style="color: red;">*</b>延期时间:
      <el-date-picker v-model="delayTime" type="date" size="mini" placeholder="选择日期时间" :picker-options="pickerOptions"> </el-date-picker>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" @click.native="confirmDelay" :disabled="!canSubmitDelay">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="cancel2Visible" title="取消订单" size="mini" :close-on-click-modal="false"> 线下是否已剪版:
      <el-select v-model="hasCut" size="small" style="width: 120px; display: inline-block;" placeholder="请选择">
        <el-option label="请选择" value=""></el-option>
        <el-option label="已剪版" value="1"></el-option>
        <el-option label="未剪版" value="0"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" @click.native="confirmCancel2" :disabled="hasCut == ''">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="inputVisible" class="cut-dialog" title="录入剪版信息" custom-class="input-dialog" :close-on-click-modal="false">
      <div class="input-product" v-for='(product, index) in inputProductNumbers'>
        <el-row :span="24">
          货号：{{product.number}}
        </el-row>
        <el-row class="seller">
          <el-col :span="24"> <span v-if="product.shopId != ''">
            原供应商：{{product.shopCompany}} <span class="mr20"></span> {{product.shopTel}}
            <span class="mr20"></span>{{product.shopProvince}}{{product.shopCity}}{{product.shopArea}}{{product.shopAddr}}<span class="mr20"></span>原货号：{{product.shopOriginalNumber}}</span>
          </el-col>
        </el-row>
        <el-row class="info" v-for='(color, key_2) in product.colors'>
          <el-col :span="3">色号：{{color.color}}</el-col>
          <el-col :span="5" style="display:inline-flex;"> <b style="color: red;">*</b>销售价：
            <RuleInput v-model="color.salePriceMoney" class="input-number" :rule="rules.price"></RuleInput>
            <el-select v-model="color.salePriceUnit" class="input-select">
              <el-option v-for="item in priceUnitList" :label="item" :value="item"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="5"> <b style="color: red;">*</b>成本单价：
            <RuleInput v-model="color.followerPriceMoney" class="input-number" :rule="rules.price"></RuleInput> {{color.salePriceUnit}} </el-col>
          <el-col :span="4"> <b style="color: red;">*</b>采购数量：
            <RuleInput v-model="color.cutterQuantity" class="input-number" :rule="rules.num"></RuleInput> {{color.salePriceUnit | shortUnit}} </el-col>
          <el-col :span="5"> 采购单价：
            <RuleInput v-model="color.cutterPriceMoney" class="input-number" :rule="rules.priceCanNull"></RuleInput>
            <el-select v-model="color.cutterPriceUnit" class="input-select">
              <el-option v-for="item in priceUnitList" :label="item" :value="item"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            <el-select v-model="color.status" size="small" style="width: 80px; display: inline-block;" placeholder="请选择">
              <el-option label="无货" :value="0"></el-option>
              <el-option label="有货" :value="1"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="line-item clearfix mt40">
        <div class="line-item-l"> <span style="position: relative; top: 10px;"> <b style="color: red;">*</b>档口码单:</span> </div>
        <div class="line-item-r">
          <div class="showmadan"> <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="madanUrls" v-for="(item, index) in madanUrls" class="madan-wrap"> <img :src="'http://www.soouya.com' + item" width='86' height="86" /> <span @click="delMadanUrl(item, key)" class="del-arrow">X</span> </a> </div>
          <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="float: left; width: auto;" :before-upload="beforeMadanUpload" :on-error="handleError">
            <div class="icon-upload"></div>
          </el-upload>
        </div>
      </div>
      <div class="line-item"> <span class="line-item-l"> <b style="color: red;">*</b>码单号码:</span>
        <RuleInput v-model="madan" :rule="rules.madan"></RuleInput>
      </div>
      <p class="line-item"> <span class="line-item-l">成本货款:</span> <span v-if="costMoney">{{costMoney.toFixed(2)}}元 </span> </p>
      <p class="line-item"> <span class="line-item-l">总费用:</span> <span v-if="totalMoney">{{totalMoney.toFixed(2)}}元 </span> </p>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <!-- <el-button type="primary" @click.native="confirmInput" :disabled="!canSubmitInput">确 定</el-button> -->
        <el-button type="primary" @click.native="next" :disabled="!canNext">下一步</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="nextVisible" class="cut-dialog" title="确定剪版信息" custom-class="input-dialog" :close-on-click-modal="false">
      <div class="input-product" v-for="(product,index) in inputProductNumbers">
        <el-row :span="24" v-if="product.status">
          货号：{{product.number}}
        </el-row>
        <div class="table-wrap">
          <table class="table" v-if="product.status">
            <thead>
              <tr>
                <th width="20%">色号</th>
                <th width="20%">采购数量</th>
                <th width="20%">成本价</th>
                <th width="20%">销售价</th>
                <th width="20%">采购价</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(color,colorIndex) in product.colors" :key="colorIndex" v-if="color.status">
                <!-- 色号 -->
                <td>{{color.color}}</td>
                <!-- 采购数量 -->
                <td>{{color.followerQuantity}}{{color.followerQuantityUnit}}</td>
                <!-- 成本价 -->
                <td>{{color.followerPriceMoney}}{{color.salePriceUnit}}</td>
                <!-- 销售价 -->
                <td>{{color.salePriceMoney}}{{color.salePriceUnit}}</td>
                <!-- 采购价 -->
                <td>{{color.cutterPriceMoney}}{{color.cutterPriceUnit}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p class="line-item"> <span class="line-item-l">成本货款:</span> <span v-if="costMoney">{{costMoney.toFixed(2)}}元 </span> </p>
      <p class="line-item"> <span class="line-item-l">总费用:</span> <span v-if="totalMoney">{{totalMoney.toFixed(2)}}元 </span> </p>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button type="primary" @click.native="prev">上一步</el-button>
        <el-button type="primary" @click.native="confirmInput">确 定</el-button>
      </div>
    </el-dialog>
    <lightbox></lightbox>
  </div>
</template>
<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import lrz from 'lrz'
import Lightbox from 'components/lightbox/lightbox'
import {
  deepCopy,
  newRequest,
  formatTimeString,
}
from 'utils/tool'
import {
  request
} from 'utils/request'
import getCutList from 'api/cut/getZiyingCutList'
import getCutCount from 'api/cut/getCutCount'
import RuleInput from 'components/ruleInput'
const regFloat = /^\d+(\.\d{1,6})?$/
export default {
  components: {
    Fliter,
    Pagination,
    Lightbox,
    RuleInput
  },
  data() {
    // let listStatus = this.$route.params.listStatus || '-1'
    // console.log('listStatus:' + listStatus)
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      tabsOptions: [{
          label: '全部',
          value: '',
        },
        {
          label: '待录入剪版信息',
          value: '500',
        },
        {
          label: '待通知提货',
          value: '501',
        },
        {
          label: '待提货',
          value: '502',
        },
        {
          label: '待收版',
          value: '503',
        },
        {
          label: '待提交支付',
          value: '521',
        },
        {
          label: '待对账',
          value: '522',
        },
        {
          label: '已完成',
          value: '523',
        },
        {
          label: '已取消',
          value: '530',
        },
        {
          label: '发货状态',
          value: '520',
        },
      ],
      allCount: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      imgPath: 'http://www.soouya.com',
      passNoCheckStatus: false,
      hasCut: '',
      cancel2Visible: false,
      delayVisible: false,
      inputVisible: false,
      nextVisible: false,
      payVisible: false,
      delayTime: '',
      denyRemark: '',
      payCredentialUrls: [],
      temId: '',
      inputProductNumbers: [],
      // inputProductNumbers: [
      //     {
      //         colors: [
      //             {
      //                 statusBox: false
      //             }
      //         ]
      //     }
      // ],
      madanUrls: [],
      pay: {
        customerCompany: '',
        availableBalance: '',
        baitiaoCreditLine: '',
        baitiaoRemainLine: '',
        baitiaoHoldMoney: '',
        creditLine: '',
        remainLine: '',
        holdMoney: '',
        customerId: '',
        creditType: '1',
        returnDate: '',
        totalMoney: null,
        prepayCredentialUrls: [],
        payCredentialUrls: [],
        payRemark: '',
        hasOverdueDebt: ''
      },
      madan: '',
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      statusDesc: {
        500: '待录入剪版信息',
        501: '待通知提货',
        502: '待提货',
        503: '待收版',
        521: '待提交支付',
        522: '待对账',
        523: '已完成',
        530: '已取消',
        520: '发货状态',
      },
      num1: '',
      num2: '',
      tabIndex: '',
      filters: {
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        status: ''
      },
      height: 600,
      result: [],
      multipleSelection: [],
      costMoney: null, // 只是展示的总货款
      totalMoney: null, // 只是展示的总货款
      cutCount: {
        520: 0,
        502: 0,
        503: 0,
        521: 0,
        522: 0,
        523: 0,
        500: 0,
        530: 0,
        501: 0
      },
      // 服务费单位
      priceUnitList: [
        '元/米',
        '元/码',
        '元/千克',
        '元/条',
        '元/罗',
        '元/对'
      ],
      rules: {
        priceCanNull: {
          message: '请输入大于0小于1万且最多六位小数的值',
          rule(val) {
            if (val == '') {
              return false;
            }
            if (regFloat.test(val) && val < 10000 && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        price: {
          message: '请输入大于0小于1万且最多六位小数的值',
          rule(val) {
            if (regFloat.test(val) && val < 10000 && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        num: {
          message: '请输入大于0小于10万且最多六位小数的值',
          rule(val) {
            if (regFloat.test(val) && val < 100000 && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        madan: {
          message: '请输入1~100字',
          rule(val) {
            if (val.length <= 100 && val.length > 0) {
              return false
            } else {
              return true
            }
          }
        }
      },
      hasEdit: false
    }
  },
  mounted() {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList()
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return formatTimeString(val)
    },
    formatDate(val) {
      return formatTimeString(val).substring(0, 10)
    },
    filterCount(val) {
      if (val) {
        return val
      } else {
        return 0
      }
    },
    shortUnit(val) {
      if (val == undefined) {
        return ''
      }
      var index = val.indexOf('/')
      if (index < 0) {
        return val
      }
      return val.substring(index + 1)
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleTableClick(table) {
      if (this.filters.status != table.name) {
        this.filters = Object.assign({}, this.filters, {
          type: '',
          status: table.name < 0 ? '' : table.name,
          key: '',
          pageNumber: 1,
          createTimeBegin: '',
          createTimeEnd: ''
        })
        const listStatus = table.name == '-1' ? undefined : table.name
        if (table.name === '') {
          this.$router.push({
            name: 'guiderCutList'
          })
        } else {
          this.$router.replace({
            name: 'guiderCutList',
            params: {
              listStatus: listStatus
            }
          })
        }
        this.reqList()
      }
    },
    exportExcel() {
      this.filters.export = 1
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || '';
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || '';
      newRequest({
        url: '/redwood/ziying/cut',
        method: 'get',
        data: this.filters
      }).then(res => {
        if (res.success == 1) {
          window.open(res.obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    search() {
      this.filters.pageNumber = 1
      this.reqList()
    },
    reqList(req = {}) {
      this.filters.export = '' // 把导出置空防止导出影响tab切换
      this.$store.dispatch('changeload', true)
      getCutCount().then((response) => {
        if (response.success === '1') {
          var count = JSON.parse(JSON.stringify(response.obj))
          for (let val in this.cutCount) {
            if (!count[val]) {
              this.cutCount[val] = 0
            } else {
              this.cutCount[val] = count[val]
            }
          }
          this.allCount = count.all // 全部的是比较特殊的所以特殊处理
        }
      })
      this.hasEdit = false
      let filters = this.filters
      filters.createTimeBegin = new Date(filters.createTimeBegin).getTime() || '';
      filters.createTimeEnd = new Date(filters.createTimeEnd).getTime() || '';
      let reqs = {}
      for (const key of Object.keys(filters)) {
        if (String(filters[key]) && key !== 'status' || (key === 'status' && filters[key] != -1)) {
          reqs[key] = filters[key]
        }
      }
      if (reqs.status == 520) {
        reqs.status = ''
        reqs.statuses = '521,522,523'
      }
      if (reqs.status == 5200) {
        reqs.status = ''
        reqs.statuses = '521,522,523'
        reqs.sendStatus = 0
      }
      if (reqs.status == 5201) {
        reqs.status = ''
        reqs.statuses = '521,522,523'
        reqs.sendStatus = 1
      }
      if (reqs.key) {
        reqs.key = reqs.key.trim() // 如果存在搜索的值对两边的空格进行去除
      }
      getCutList(reqs).then((res) => {
        this.$store.dispatch('changeload', false)
        // if (!reqs.status && !reqs.statuses) {
        //   this.allCount = res.page.totalCount;
        // }
        if (res.success == 1) {
          if (res.page) {
            this.convertData(res.page)
          } else if (res.obj) {
            window.open(res.obj)
          } else {
            this.result = []
            this.num1 = ''
            this.num2 = ''
            this.num3 = ''
            const currentNumber = 'num' + this.tabIndex
            this[currentNumber] = '0'
          }
          this.filters.export = 0
        }
      })
    },
    convertData(page) {
      this.pagation.pageNumber = page.pageNumber
      this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      this.filters.pageSize = page.pageSize
      this.filters.pageNumber = page.pageNumber
      this.num1 = ''
      this.num2 = ''
      this.num3 = ''
      const currentNumber = 'num' + this.tabIndex
      this[currentNumber] = page.totalCount
      this.result = page.result
      this.result.forEach((item) => {
        item.productNumbers.forEach((item1) => {
          item1.colors.forEach((item2) => {
            if (item.taxPoint > 0) {
              this.$set(item2, 'taxPoint', item.taxPoint)
            } else {
              this.$set(item2, 'taxPoint', 0)
            }
          })
        })
      })
    },
    // 公共请求
    sameConfirm(id, done, instance, text) {
      this.$store.dispatch('changeload', true)
      let url = ''
      let obj = {}
      let method = 'get'
      if (text == 'input') {
        url = `/redwood/ziying/cut/${id}?_function=input`
        method = 'put'
        let copyInput = JSON.parse(JSON.stringify(this.inputProductNumbers))
        for (var i = 0; i < copyInput.length; i++) {
          var productNumber = copyInput[i];
          for (var j = 0; j < productNumber.colors.length; j++) {
            var color = productNumber.colors[j]
            // if (Number(color.salePriceMoney) > Number(color.followerPriceMoney)) {
            // } else if (Number(color.status) != 0) {
            //     this.$message.error('销售价需>成本单价');
            //     this.$store.dispatch('changeload', false)
            //     return;
            // }
            if (color.cutterPriceMoney == '') {
              color.cutterPriceMoney = -1
            }
            color.followerPriceUnit = color.salePriceUnit
            var index = color.salePriceUnit.indexOf('/')
            if (index >= 0) {
              color.cutterQuantityUnit = color.salePriceUnit.substring(index + 1)
            }
            if (color.cutterPriceMoney == '') {
              color.cutterPriceMoney = -1
            } else {
              color.cutterPriceMoney = Number(color.cutterPriceMoney)
            }
            if (color.followerPriceMoney == '') {
              color.followerPriceMoney = -1
            } else {
              color.followerPriceMoney = Number(color.followerPriceMoney)
            }
            if (color.salePriceMoney == '') {
              color.salePriceMoney = -1
            } else {
              color.salePriceMoney = Number(color.salePriceMoney)
            }
            if (color.followerQuantity == '') {
              color.followerQuantity = -1
            } else {
              color.followerQuantity = Number(color.followerQuantity)
            }
            if (color.cutterQuantity == '') {
              color.cutterQuantity = -1
            } else {
              color.cutterQuantity = Number(color.cutterQuantity)
            }
            // color.cutterQuantityUnit
            // if (color.statusBox) {
            //     color.status = 0
            // } else {
            //     color.status = 1
            // }
          }
        }
        obj = {
          madanUrls: this.madanUrls.map((item) => {
            item = item.replace(this.imgPath, '')
            return item
          }),
          madan: this.madan,
          productNumbers: copyInput
        }
      } else if (text == 'toLading') {
        url = `/redwood/ziying/cut/${id}?_function=toLading`
        method = 'put'
      } else if (text == 'cancel') {
        url = `/redwood/ziying/cut/${id}?_function=cancel`
        method = 'put'
        obj = {
          hasCut: 0
        }
      } else if (text == 'cancel2') {
        url = `/redwood/ziying/cut/${id}?_function=cancel`
        method = 'put'
        obj = {
          hasCut: this.hasCut
        }
      } else if (text == 'pay') {
        url = `/redwood/ziying/cut/${id}?_function=pay`
        method = 'put'
        obj = JSON.parse(JSON.stringify(this.pay))
        obj.creditType = Number(obj.creditType)
        if (obj.creditType == 3) {
          obj.returnDate = 0
        } else {
          obj.returnDate = +new Date(obj.returnDate) + 86399000
        }
      } else if (text == 'delay') {
        url = `/redwood/ziying/cut/${id}?_function=updateInfo`
        method = 'put'
        obj = {
          delayTime: new Date(this.delayTime).getTime() || ''
        }
      }
      request(url, {
        method,
        headers: {
          'Content-Type': method === 'put' ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        data: obj
      }).then((res) => {
        this.$store.dispatch('changeload', false)
        if (instance) {
          instance.confirmButtonLoading = false
        }
        if (res.success == 1) {
          done && done()
          this.clearTemData()
          getCutCount().then((response) => {
            if (response.success == 1) {
              Object.assign(this.cutCount, {
                500: 0,
                501: 0,
                502: 0,
                503: 0,
                520: 0,
                521: 0,
                522: 0,
                523: 0,
                530: 0,
              })
              Object.assign(this.cutCount, response.obj)
            }
          })
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
          })
          this.reqList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    // 取消订单提醒
    cancel(id) {
      this.$msgbox({
        title: '提示',
        message: '是否确认取消订单？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(id, done, instance, 'cancel')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    batchSubmitPay() {
      let customs = []
      let ids = []
      this.multipleSelection.forEach((item) => {
        customs.push(item.customerCompany)
        ids.push(item.id)
      })
      if (Array.from(new Set(customs)).length > 1) {
        this.$message.error('请选择同一个采购商');
      } else {
        this.pay.totalMoney = this.multipleSelection.reduce(function(prev, current, index, array) {
          return prev + current.totalMoney
        }, 0);
        this.temId = ids.join(',')
        this.pay.customerCompany = this.multipleSelection[0].customerCompany
        var that = this;
        request('/redwood/account/CustomerAccount/getSummary', {
          method: 'GET',
          data: {
            id: this.multipleSelection[0].customerId
          }
        }).then(data => {
          that.$store.dispatch('changeload', false)
          if (data.success === '1') {
            this.pay.availableBalance = data.obj.availableBalance
            this.pay.baitiaoRemainLine = data.obj.baitiaoRemainLine
            this.pay.baitiaoCreditLine = data.obj.baitiaoCreditLine
            this.pay.baitiaoHoldMoney = data.obj.baitiaoHoldMoney
            this.pay.remainLine = data.obj.remainLine
            this.pay.creditLine = data.obj.creditLine
            this.pay.holdMoney = data.obj.holdMoney
            this.pay.hasOverdueDebt = data.obj.hasOverdueDebt
            let imgArr = []
            this.multipleSelection.forEach(item => {
              imgArr.concat(item.payCredentialUrls)
            })
            // this.pay.creditType = '';
            this.pay.returnDate = '';
            this.pay.payRemark = '';
            this.pay.prepayCredentialUrls = [];
            if (imgArr.length > 0) {
              this.pay.payCredentialUrls = imgArr.splice(0, 9)
            } else {
              this.pay.payCredentialUrls = []
            }
            this.payVisible = true;
          } else {
            that.$alert(data.msg, '', {
              callback: action => {
                return true
              }
            });
          }
        })
      }
    },
    submitPay(row) {
      var that = this;
      request('/redwood/account/CustomerAccount/getSummary', {
        method: 'GET',
        data: {
          id: row.customerId
        }
      }).then(data => {
        that.$store.dispatch('changeload', false)
        if (data.success === '1') {
          this.pay.customerCompany = row.customerCompany
          this.pay.totalMoney = row.totalMoney
          this.temId = row.id
          this.pay.availableBalance = data.obj.availableBalance
          this.pay.baitiaoRemainLine = data.obj.baitiaoRemainLine
          this.pay.baitiaoCreditLine = data.obj.baitiaoCreditLine
          this.pay.baitiaoHoldMoney = data.obj.baitiaoHoldMoney
          this.pay.remainLine = data.obj.remainLine
          this.pay.creditLine = data.obj.creditLine
          this.pay.holdMoney = data.obj.holdMoney
          this.pay.hasOverdueDebt = data.obj.hasOverdueDebt
          // this.pay.creditType = '';
          this.pay.returnDate = '';
          this.pay.payRemark = '';
          this.pay.prepayCredentialUrls = [];
          this.pay.payCredentialUrls = row.payCredentialUrls;
          this.payVisible = true;
        } else {
          that.$alert(data.msg, '', {
            callback: action => {
              return true
            }
          });
        }
      })
    },
    delay(id) {
      this.delayVisible = true
      this.delayTime = ''
      this.temId = id
    },
    cancel2(id) {
      this.cancel2Visible = true
      this.hasCut = ''
      this.temId = id
    },
    input(row, index) {
      console.log(row)
      this.inputProductNumbers = deepCopy(row.productNumbers)
      // Object.assign(this.inputProductNumbers, row.productNumbers)
      for (var i = 0; i < this.inputProductNumbers.length; i++) {
        var productNumber = this.inputProductNumbers[i];
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          if (color.salePriceMoney < 0) {
            color.salePriceMoney = ''
          }
          if (color.followerPriceMoney < 0) {
            color.followerPriceMoney = ''
          }
          if (color.cutterPriceMoney < 0) {
            color.cutterPriceMoney = ''
          }
          // 采购数量=销售填的需求数量（支持修改）
          color.cutterQuantity = color.followerQuantity
          if (color.cutterQuantity < 0) {
            color.cutterQuantity = ''
          }
          if (color.followerQuantity < 0) {
            color.followerQuantity = ''
          }
          color.status = 1
          // 默认有货
        }
      }
      this.madanUrls = []
      Object.assign(this.madanUrls, row.madanUrls)
      this.inputVisible = true
      this.madan = ''
      this.temId = row.id
    },
    confirmCancel2() {
      this.$msgbox({
        title: '提示',
        message: '是否确认取消订单？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(this.temId, done, instance, 'cancel2')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    confirmPay(formName) {
      //  if (this.pay.availableBalance < this.pay.totalMoney && this.pay.creditType == '3') {
      //                     this.$message({
      //                         message: '金额不足，请保证账户资金充足',
      //                         type: 'warning'
      //                       })
      //                       return false
      //                     }
      if (!this.pay.returnDate) {
        this.$message({
          message: '必须选择回款时间',
          type: 'warning'
        })
        return false
      }
      if (this.pay.remainLine < this.pay.totalMoney && this.pay.creditType == '1') {
        this.$message({
          message: '金额不足，请保证账户资金充足',
          type: 'warning'
        })
        return false
      }
      this.sameConfirm(this.temId, false, false, 'pay')
    },
    confirmDelay() {
      this.sameConfirm(this.temId, false, false, 'delay')
    },
    prev() {
      this.nextVisible = false
      this.inputVisible = true
    },
    next() {
      this.inputVisible = false
      this.nextVisible = true
      this.inputProductNumbers.forEach(product => {
        let flag = null
        flag = product.colors.reduce(function(prev, current, index, array) {
          return prev + current.status
        }, 0)
        if (flag == 0) {
          this.$set(product, 'status', false);
        } else {
          this.$set(product, 'status', true);
        }
      })
    },
    confirmInput() {
      this.sameConfirm(this.temId, false, false, 'input')
    },
    print() {
      let ids = []
      this.multipleSelection.forEach((item) => {
        ids.push(item.id)
      })
      window.open('/print/printGuiderCut?ids=' + ids.join(','));
    },
    toLading(id) {
      let ids = []
      if (id == '') {
        this.multipleSelection.forEach((item) => {
          ids.push(item.id)
        })
      } else {
        ids.push(id)
      }
      this.$msgbox({
        title: '提示',
        message: '是否确认通知提货?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(ids.join(','), done, instance, 'toLading')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    clearTemData() {
      this.passNoCheckStatus = false
      this.denyRemark = ''
      this.temId = ''
      this.payVisible = false
      this.cancel2Visible = false
      this.delayVisible = false
      this.inputVisible = false
      this.nextVisible = false
      this.delayTime = ''
      this.payCredentialUrls = []
      this.madanUrls = []
      this.inputProductNumbers = []
      // this.inputProductNumbers = [
      //     {
      //         colors: [
      //             {
      //                 statusBox: false
      //             }
      //         ]
      //     }
      // ]
      this.madan = ''
    },
    // 总费用小数点处理
    fixTotalMoney(row) {
      if (row.totalMoney) {
        let split = row.totalMoney.split('.');
        if (split.length > 1 && split[1].length > 2) row.totalMoney = Number(row.totalMoney).toFixed(2)
      }
    },
    uploadImg(id) {
      this.temId = id
      this.payVisible = true
    },
    // 上传图片组件
    beforePrepayUpload(file) {
      this.beforeUpload(file, 'prepay')
    },
    beforePayUpload(file) {
      this.beforeUpload(file, 'pay')
    },
    beforeMadanUpload(file) {
      this.beforeUpload(file, 'madan')
    },
    beforeUpload(file, type) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
          quality: 1
        })
        .then(function(rst) {
          // 处理成功会执行
          rst.formData.append('field', 'imgUrl')
          request('/redwood/sys/Common/uploadFile.do?type=4', {
            method: 'POST',
            data: rst.formData,
          }).then(data => {
            that.$store.dispatch('changeload', false)
            if (data.success === '1') {
              if (type == 'prepay') {
                that.handlePrepayUrlSuccess(data)
              }
              if (type == 'pay') {
                that.handlePayUrlSuccess(data)
              }
              if (type == 'madan') {
                that.handleMadanUrlSuccess(data)
              }
            } else {
              that.$alert(data.msg, '', {
                callback: action => {
                  return true
                }
              });
            }
          })
          return rst
        })
      return false
    },
    handlePrepayUrlSuccess(file, fileList) {
      if (this.pay.prepayCredentialUrls.length < 9) {
        this.pay.prepayCredentialUrls.push(file.imgUrl)
      }
    },
    handlePayUrlSuccess(file, fileList) {
      if (this.pay.payCredentialUrls.length < 9) {
        this.pay.payCredentialUrls.push(file.imgUrl)
      }
    },
    handleMadanUrlSuccess(file, fileList) {
      if (this.madanUrls.length < 9) {
        this.madanUrls.push(file.imgUrl)
      }
    },
    handleError(file, fileList) {
      this.$store.dispatch('changeload', false)
    },
    delPrepayCredentialUrl(index) {
      this.pay.prepayCredentialUrls.splice(index, 1)
    },
    delPayCredentialUrl(index) {
      this.pay.payCredentialUrls.splice(index, 1)
    },
    delMadanUrl(url) {
      this.madanUrls = this.madanUrls.filter((item, key) => item != url)
    },
    countH() {
      this.height = String(document.documentElement.clientHeight - 320)
    },
    resetSubmit() {
      Object.assign(this.filters, {
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
      })
    },
    title(h, { column, $index }) {
      // return (
      //     <div class="product-wrap">
      //         <div class="product-item">
      //             <div> 货号 </div>
      //             <div> 品名 </div>
      //             <div>
      //                 <div class="color-item">
      //                     <span> 色号 </span>
      //                     <span> 数量 </span>
      //                     <span> 税点 </span>
      //                     <span> 销售价 </span>
      //                     <span> 采购数量 </span>
      //                     <span> 成本单价 </span>
      //                     <span> 采购单价 </span>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // )
      let createElementObj = function(el, props, subEl) {
        return { el, props, subEl }
      }
      let renderElement = function(obj) {
        return h(obj.el, obj.props, typeof obj.subEl === 'object' ? obj.subEl.map(item => { return renderElement(item) }) : obj.subEl)
      }
      const productWrapProps = { 'class': { 'product-wrap': true } }
      const productItemProps = { 'class': { 'product-item': true } }
      const colorItemProps = { 'class': { 'color-item': true } }
      const renderTree = createElementObj('div', productWrapProps, [
        createElementObj('div', productItemProps, [
          createElementObj('div', null, '货号'),
          createElementObj('div', null, '品名'),
          createElementObj('div', null, [
            createElementObj('div', colorItemProps, [
              createElementObj('span', null, '色号'),
              createElementObj('span', null, '数量'),
              createElementObj('span', null, '税点'),
              createElementObj('span', null, '销售价'),
              createElementObj('span', null, '采购数量'),
              createElementObj('span', null, '成本单价'),
              createElementObj('span', null, '采购单价')
            ])
          ])
        ])
      ])
      return renderElement(renderTree)
    }
  },
  computed: {
    // tableLabel() {
    //   let cutCount = this.cutCount
    //   function getNumber(number) {
    //     return number > 0 ? `(${number})` : 0
    //   }
    //   return {
    //     500: `${getNumber(cutCount[500])} `,
    //     501: `${getNumber(cutCount[501])} `,
    //     502: `${getNumber(cutCount[502])} `,
    //     503: `${getNumber(cutCount[503])} `,
    //     521: `${getNumber(cutCount[521])} `,
    //     522: `${getNumber(cutCount[522])} `,
    //     523: `${getNumber(cutCount[523])} `,
    //     530: `${getNumber(cutCount[530])} `,
    //     520: `${getNumber(cutCount[521]) + getNumber(cutCount[522]) + getNumber(cutCount[523])} `,
    //   }
    // },
    isNeedselection() {
      return this.filters.status == 501 || this.filters.status == 502 || this.filters.status == 503 || this.filters.status == 520 || this.filters.status == 521 || this.filters.status == 522 || this.filters.status == 523
    },
    canDownExcel() {
      return false;
    },
    canSubmitDelay() {
      if (this.delayTime == '') {
        return false
      }
      return true
    },
    canNext() {
      if (this.madanUrls.length == 0 || this.madan == '' || this.madan.length > 100) {
        return false
      }
      for (var i = 0; i < this.inputProductNumbers.length; i++) {
        var productNumber = this.inputProductNumbers[i];
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          // if (color.statusBox) {
          //     continue;
          // }
          // 无货
          if (color.status == 0) {
            continue;
          }
          var failed = this.rules.price.rule(color.salePriceMoney) || this.rules.price.rule(color.followerPriceMoney) || this.rules.priceCanNull.rule(color.cutterPriceMoney) || this.rules.num.rule(color.cutterQuantity) || this.rules.madan.rule(this.madan)
          if (color.salePriceUnit == '' || (color.cutterPriceMoney != '' && color.cutterPriceUnit == '')) {
            return false
          }
          if (failed) {
            return false;
          }
        }
      }
      return true;
    },
    canDianfuPay() {
      if (this.pay.hasOverdueDebt == 1) {
        return false
      }
      return true
    },
  },
  watch: {
    inputProductNumbers: {
      handler: function(inputProductNumbers) {
        var costArr = []
        var totalArr = []
        inputProductNumbers.forEach((item) => {
          item.colors.forEach((item1) => {
            if (item1.salePriceMoney && !isNaN(Number(item1.salePriceMoney)) && item1.cutterQuantity && !isNaN(Number(item1.cutterQuantity))) {
              totalArr.push(item1.salePriceMoney * item1.cutterQuantity)
            }
            if (item1.followerPriceMoney && !isNaN(Number(item1.followerPriceMoney)) && item1.cutterQuantity && !isNaN(Number(item1.cutterQuantity))) {
              costArr.push(item1.followerPriceMoney * item1.cutterQuantity)
            }
          })
        })
        if (costArr.length > 0) {
          this.costMoney = costArr.reduce(function(prev, current, index, array) {
            return prev + current
          }, 0);
        } else {
          this.costMoney = null
        }
        if (totalArr.length > 0) {
          this.totalMoney = totalArr.reduce(function(prev, current, index, array) {
            return prev + current
          }, 0);
        } else {
          this.totalMoney = null
        }
      },
      deep: true
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.countH)
  },
}

</script>
<style lang="scss">
.info {
  margin-bottom: 20px !important;
}

.y_table_wrap,
.y_table {
  background-color: #fff;
}

.y_table {
  box-shadow: 0 2px 4px 0 #ddd;
}

.y_table_wrap {
  padding: 14px;
}

.y_table_wrap .el-table td .cell {
  padding-top: 0 !important;
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid #ddd;
  }
  >div {
    display: table-cell;
    &:nth-child(1) {
      width: 100px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 0;
    }
    &:nth-child(2) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 1px solid #ddd;
      // border-right: 1px solid #ddd;
    }
    &:nth-child(3) {
      width: 600px;
      vertical-align: middle; // border-right: 1px solid #ddd;
    }
  }
  .price-input {
    width: 60px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  select {
    width: 30px;
  }
}

.product-td {
  height: 100%;
}

.product-column {
  .cell {
    // height: 100%;
    padding: 0;
    padding-left: 0;
    padding-right: 0;
  }
}

.product-wrap {
  display: table;
  border: 0;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  min-height: 60px;
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

td {
  .color-item {
    span {
      border-left: 1px solid #ddd;
      &:first-child {
        border-left: 0;
      }
    }
  }
}

.color-item {
  display: flex;
  flex: 1;
  min-height: 43px;
  &:not(:first-child) {
    border-top: 1px solid #ddd;
  }
  span {
    width: 20%;
    text-align: center;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  span:nth-child(1) {
    width: 200px;
  }

  .alert-red {
    color: red;
  }
}

.list-import {
  background: #20a0ff;
  color: #fff;
}

.cutMange-list {
  .y_table {
    clear: both;
  }

  .y_table_wrap {
    .combine {
      .cell {
        padding: 0;
        .t-title {
          width: 300px;
          float: left;
          .t-item {
            float: left;
            width: 75px;
          }
          .t-item1 {
            width: 60px;
          }
          .t-item2 {
            width: 80px;
          }
          .t-item3 {
            width: 80px;
          }
          .t-item3 {
            width: 80px;
          }
        }
      }
    }
    .el-upload-list {
      display: none;
    }
  }
  .bottom {
    text-align: right;
    background: #fff;
    padding: 10px;
  }
  .operate-btn {
    text-align: left;
    margin-left: 0;
    .o-btn {
      // width: 80px;
      margin-left: 0;
      margin-right: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
  .line {
    border-bottom: 1px solid #ddd;
  }
}

.common-pop {
  min-width: 500px;
}

.take-good {
  max-height: 450px;
  min-width: 460px;
  overflow-y: auto;
  .t-item {
    position: relative;
    margin-bottom: 8px;
  }
  .t-item-l {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .t-item-r {
    display: inline-block; // min-width: 320px;
    .r-line {
      padding-bottom: 5px;
    }
  }
}

.send-good {
  max-height: 450px;
  overflow-y: auto;
}

.unnormal {
  .un-line {
    margin-bottom: 5px;
    position: relative;
    .un-l-left {
      display: inline-block;
      width: 70px;
      padding-right: 5px;
      text-align: right;
    }
    .un-l-r {
      width: 150px;
      display: inline-block;
    }
  }
}

.cutManage-pay-money {
  min-width: 500px;
  .pay-content {
    min-width: 500px;
    .pay-item {
      position: relative;
      padding-bottom: 10px;
      .pay-item-l {
        width: 110px;
        display: inline-block;
        text-align: right;
        padding-right: 10px;
      }
    }
    .total-money {
      .el-form-item__label {
        width: 110px !important;
      }
    }
  }
  .showmadan {
    float: left;
    textarea {
      resize: none;
      width: 300px;
    }
  }
  .madan-wrap {
    position: relative;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 15px;
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
  .el-upload-list {
    display: none;
  }
}

.input-product {
  .el-col-24 {
    height: 30px;
    font-size: 16px;
  }
  .el-col-4 {
    height: 30px;
  }
}

.line-item {
  min-height: 40px;
  margin-bottom: 10px;
  .line-item-l {
    float: left;
    font-size: 14px;
    width: 85px;
    text-align: right;
    padding-right: 10px;
  }
  .radio-tit {
    padding-top: 5px;
  }
  .line-item-r {
    font-size: 14px;
    min-width: 500px;
    float: left;
  }
  .buyer-select-info {
    p {
      padding: 10px 0;
    }
  }
  .mark {
    color: red;
  }
}

.showmadan {
  float: left;
  .madan-wrap {
    position: relative;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px; // border: 1px solid #ccc;
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
}

.el-upload-list {
  display: none;
}

.el-table td,
.el-table th {
  min-height: 40px;
  height: auto;
}

.input-dialog {
  min-width: 1200px;
  input {
    height: 26px;
  }
}

.input-number {
  width: 55px;
}

.input-select {
  width: 90px;
}

.upImg {
  float: left;
  width: 40px;
  height: 40px;
  line-height: 36px;
  background: #ccc;
  text-align: center;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  &:active {
    background: #999;
  }
}

.product-column {
  height: 40px !important;
  padding: 0 !important;
}

</style>
