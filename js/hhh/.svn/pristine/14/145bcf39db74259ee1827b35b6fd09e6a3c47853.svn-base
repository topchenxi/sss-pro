<template>
  <div class="cutDetail-jb-publish detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item detail-right" style="width:100%">
        <h6>采购商供应商信息</h6>
        <dl class="info-item">
          <dt>订单号 :</dt>
          <dd>{{details.number}}</dd>
        </dl>
        <dl class="info-item">
          <dt>订单时间 :</dt>
          <dd>{{details.createTime | formatTime}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商 :</dt>
          <dd>{{details.customerCompany}} | {{details.customerTel}}</dd>
        </dl>
        <dl class="info-item">
          <dt>收货地址 :</dt>
          <dd>
            <p>{{details.addressName}}</p>
            <p>{{details.addressTel}}</p>
            <p>{{details.addressProvince}}{{details.addressCity}}{{details.addressArea}}{{details.addressAddr}}</p>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>供应商 :</dt>
          <dd>
            <p>{{details.shopCompany}}</p>
            <p>{{details.shopTel}} </p>
            <p>{{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}</p>
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-for="(value, key) in details.productNumbers" :key="key">
      <div class="detail-item detail-right" style="width:100%">
        <h6>货号-<span class="green">{{key+1}}</span> </h6>
        <dl class="info-item" v-if="value.shopOriginalNumber">
          <dt>原货号:</dt>
          <dd>{{value.shopOriginalNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>图片:</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="item" :key="item" v-lightbox:index="value.imgUrls" v-for="(item, index) in value.imgUrls" class="pic-item">
                        <img :src="item" width='80' height="80" />
                      </a>
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>品类:</dt>
          <dd>{{value.category == 1 ? '面料' : '辅料'}}</dd>
        </dl>
        <dl class="info-item">
          <dt>服务费单价:</dt>
          <dd>{{value.price}}{{value.priceUnit}}</dd>
        </dl>
        <dl class="info-item mb40">
          <dt>货物信息:</dt>
          <dd>
            <div class="table-warp table-center pt10" style="width:90%">
              <table class="table-normal">
                <colgroup>
                </colgroup>
                <thead>
                  <tr>
                    <th>品名</th>
                    <th>颜色</th>
                    <th>单价</th>
                    <th v-if="details.status >= 201 && details.status != 230">成本单价</th>
                    <th>数量</th>
                    <th v-if="details.status >= 201 && details.status != 230">采购数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="itemColor in value.colors">
                    <td>
                      {{value.number}}
                    </td>
                    <td>
                      {{itemColor.color}}
                    </td>
                    <td>
                      {{itemColor.followerPriceMoney}}{{itemColor.followerPriceUnit}}
                    </td>
                    <td v-if="details.status >= 201 && details.status != 230">
                      <span>{{itemColor.cutterPriceMoney}}</span>{{itemColor.cutterPriceUnit}}
                    </td>
                    <td>
                      <span>{{itemColor.followerQuantity}}</span>{{itemColor.followerQuantityUnit}}
                    </td>
                    <td v-if="details.status >= 201 && details.status != 230">
                      <span>{{itemColor.cutterQuantity}}</span>{{itemColor.cutterQuantityUnit}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-if="details.status == 200 || details.status == 230">
      <div class="detail-item detail-right" style="width:100%">
        <h6>费用信息</h6>
        <dl class="info-item">
          <dt>采购商是否需要发票 :</dt>
          <dd>
            <span v-if="details.needInvoice == 1">需要</span>
            <span v-else>不需要</span>
          </dd>
        </dl>
        <dl class="info-item" v-if="details.needInvoice == 1">
          <dt>采购商税率 :</dt>
          <dd>{{details.taxPoint}}%</dd>
        </dl>
        <dl class="info-item">
          <dt>跟单员留言 :</dt>
          <dd>{{details.followerRemark}}</dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-if="details.status != 200 && details.status != 230">
      <div class="detail-item detail-right" style="width:100%">
        <h6>费用信息</h6>
        <dl class="info-item">
          <dt>成本货款 :</dt>
          <dd>
            <span>{{details.costMoney}}</span>元
          </dd>
        </dl>
        <dl class="info-item">
          <dt>码单 :</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="item" :key="item" v-lightbox="madanUrls" v-for="(item, index) in madanUrls" class="pic-item">
                        <img :src="item" width='80' height="80" />
                      </a>
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>剪版员留言 :</dt>
          <dd>{{details.cutterRemark}}</dd>
        </dl>
        <dl class="info-item">
          <dt>跟单员留言 :</dt>
          <dd>{{details.followerRemark}}</dd>
        </dl>
      </div>
    </div>
    <div class="detail-group" v-if="details.status == 223">
      <div class="detail-item detail-right" style="width:100%">
        <h6>物流信息</h6>
        <dl class="info-item">
          <dt>发货凭据 :</dt>
          <dd>
            <div class="detail-pic-wrap">
              <a :name="index" :href="item" :key="item" v-lightbox="details.endCredentialUrls" v-for="(item, index) in details.sendCredentialUrls" class="pic-item">
                        <img :src="item" width='80' height="80" />
                      </a>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="jb-content">
      <!-- 预览状态 -->
      <div style="padding-left: 10px; margin: 10px 0;">
        <!-- <div class="section">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">采购商供应商信息</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">订单号:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{details.number}}</p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">订单时间:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{details.createTime | formatTime}}</p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">采购商:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{details.customerCompany}} {{details.customerTel}}</p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l clearfix">
                <span>收货地址:</span>
              </div>
              <div class="line-item-r">
                {{details.addressName}} {{details.addressTel}} {{details.addressProvince}}{{details.addressCity}}{{details.addressArea}}{{details.addressAddr}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">供应商:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{details.shopCompany}} {{details.shopTel}} {{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}</p>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="section" v-for="(value, key) in productNumbers" :key="key">
          <div class="jb-content-buyer-info top-line clearfix operate-wrap">
            <span class="jb-info">货号({{key+1}})</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">图片:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="item" :key="item" v-lightbox:index="value.imgUrls" v-for="(item, index) in value.imgUrls" class="madan-wrap">
                        <img :src="item" width='40' height="40" />
                      </a>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>品类:</span>
              </div>
              <div class="line-item-r">
                {{value.category == 1 ? '面料' : '辅料'}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>服务费单价：</span>
              </div>
              <div class="line-item-r">
                {{value.price}}{{value.priceUnit}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">货物信息:</span>
              </div>
              <div class="line-item-r">
                <table class="pure-table pure-table-bordered fix-table fix-width" style="background: #fff; text-align: center; max-width: 700px;">
                  <thead>
                    <tr class="th">
                      <th style="min-width:100px; width: 10%; text-align: center;">{{value.category == 1 ? '货号' : '品名'}}</th>
                      <th style="min-width:100px; width: 10%; text-align: center;">{{value.category == 1 ? '色号' : '颜色'}}</th>
                      <th style="min-width:100px; width: 10%; text-align: center;">单价</th>
                      <th v-if="details.status >= 201 && details.status != 230" style="min-width:150px; width: 10%; text-align: center;">成本单价</th>
                      <th style="min-width:100px; width: 10%; text-align: center;">数量</th>
                      <th v-if="details.status >= 201 && details.status != 230" style="min-width:100px; width: 10%; text-align: center;">采购数量</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="itemColor in value.colors">
                      <td>
                        <div style="padding: 10px 0;">{{value.number}}</div>
                      </td>
                      <td>
                        <div style="padding: 20px 0;">{{itemColor.color}}</div>
                      </td>
                      <td>
                        <div style="padding: 20px 0;"><span>{{itemColor.followerPriceMoney}}</span>{{itemColor.followerPriceUnit}}</div>
                      </td>
                      <td v-if="details.status >= 201 && details.status != 230">
                        <div style="padding: 20px 0;"><span>{{itemColor.cutterPriceMoney}}</span>{{itemColor.cutterPriceUnit}}</div>
                      </td>
                      <td>
                        <div style="padding: 20px 0;"><span>{{itemColor.followerQuantity}}</span>{{itemColor.followerQuantityUnit}}</div>
                      </td>
                      <td v-if="details.status >= 201 && details.status != 230">
                        <div style="padding: 20px 0;"><span>{{itemColor.cutterQuantity}}</span>{{itemColor.cutterQuantityUnit}}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="section">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">费用信息</span>
          </div>
          <div class="jb-info-content clearfix" v-if="details.status == 200 || details.status == 230">
            <div class="line-item clearfix">
              <div class="line-item-l clearfix">
                <span>采购商是否需要发票:</span>
              </div>
              <div class="line-item-r">
                <span v-if="details.needInvoice == 1">需要</span>
                <span v-else>不需要</span>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.needInvoice == 1">
              <div class="line-item-l">
                <span>采购商税率:</span>
              </div>
              <div class="line-item-r">
                <span>{{details.taxPoint}}%</span>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>跟单员留言:</span>
              </div>
              <div class="line-item-r">
                <span>{{details.followerRemark}}</span>
              </div>
            </div>
          </div>
          <div class="jb-info-content clearfix" v-if="details.status != 200 && details.status != 230">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>成本货款</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <p class="money-info-item clearfix">
                    <span style="width: 100px; margin-right: 10px;">{{details.costMoney}}</span>元
                  </p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">码单:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="item" :key="item" v-lightbox="madanUrls" v-for="(item, index) in madanUrls" class="madan-wrap">
                      <img  :src="item" width='40' height="40" />
                    </a>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>剪版员留言:</span>
              </div>
              <div class="line-item-r">
                <div style="max-width: 400px; word-break: break-word;">{{details.cutterRemark}}</div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span>跟单员留言:</span>
              </div>
              <div class="line-item-r">
                <div style="max-width: 400px; word-break: break-word;">{{details.followerRemark}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="section" v-if="details.status == 223">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">物流信息</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">发货凭据:</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="item" :key="item" v-lightbox="details.endCredentialUrls" v-for="(item, index) in details.sendCredentialUrls" class="madan-wrap">
                      <img  :src="item" width='40' height="40" />
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div style="text-align: center;">
          <el-button @click.native="$router.go(-1)">返回</el-button>
          <el-button v-if="woodCutCloth && details.status == 200" @click.native="goInputJb(details.id)" disabled title="请前往移动端录入剪版">录入剪版信息</el-button>
          <el-button v-if="woodCutCloth && details.status == 201" @click.native="submitPass(details.id)" type="primary">提交审核</el-button>
          <el-button v-if="woodFollowLeader && details.status == 202" @click.native="passCheck(details.id)" type="primary">审核通过</el-button>
          <el-button v-if="woodFollowLeader && details.status == 202" @click.native="passNoCheck(details.id)" type="primary">审核失败</el-button>
          <el-button v-if="woodCutCloth && details.status == 210" @click.native="confirmPay(details.id)" type="primary">确认收款</el-button>
          <el-button v-if="woodFollowLeader && details.status == 200" @click.native="cancelOrder(details.id)" type="primary">取消订单</el-button>
          <el-button @click.native="uploadImg(details.id)" v-if="woodFollowLeader && details.status == 220" type="primary" style="width: 88px;">发货</el-button>
        </div>
      </div>
      <!-- 录入态结束 -->
      <!-- 审核不通过弹窗 -->
      <el-dialog title="提示" v-model="passNoCheckStatus" size="tiny">
        <div>
          <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="denyRemark"></textarea>
          <span><b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/50字</span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="clearTemData">取 消</el-button>
            <el-button type="primary" :disabled="!denyRemark" @click="confirmPassNoCheck">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 发货凭证 -->
      <el-dialog v-model="sendVisible" size="small" custom-class="cutDetail-pay-money" :close-on-click-modal="false">
        <div class="pay-content">
          <div class="pay-item">
            <span class="pay-item-l" style="position: absolute; top: 0; left: 0;">
                <strong style="color: red;">*</strong>发货凭据:
              </span>
            <div style="width: 300px; display: inline-block;margin-left: 110px;">
              <div class="showmadan">
                <a :href="item" :key="item" v-lightbox="sendCredentialUrls" v-for="(item, index) in sendCredentialUrls" class="madan-wrap">
                      <img  :src="item" width='40' height="40" />
                      <span @click="del(item)" class="del-arrow">X</span>
                    </a>
              </div>
              <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="display:inline-block; width: auto; margin-bottom: 8px;" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button @click.native="clearTemData">取 消</el-button>
          <el-button type="primary" :disabled="sendCredentialUrls.length > 0 ? false : true" @click.native="confirmSend">确 定</el-button>
        </div>
      </el-dialog>
      <lightbox />
    </div>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import allApi from 'api/allApi'
import lrz from 'lrz'
import {
  request,
  // unique,
  getCache,
  newRequest,
  formatTimeString
}
from 'utils/tool'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      imgPath: 'http://www.soouya.com',
      passNoCheckStatus: false,
      sendVisible: false,
      denyRemark: '',
      sendCredentialUrls: [],
      temId: '',
      details: {},
      productNumbers: [],
      madanUrls: [],
      on: false,
      index: 1,
      woodCutCloth: '',
      woodFollowLeader: '',
    }
  },
  mounted() {
    this.getDetail()
    const loginInfo = getCache({ key: 'currentUser' }).loginInfo
    this.woodCutCloth = loginInfo.woodCutCloth
    this.woodFollowLeader = loginInfo.woodFollowLeader
  },
  computed: {},
  watch: {},
  filters: {
    formatTime(val) {
      return formatTimeString(val)
    }
  },
  methods: {
    getDetail() {
      this.$store.dispatch('changeload', true)
      const id = this.$route.query.id
      request({
        url: `${allApi.cut.cut}/${id}`,
        method: 'get',
        data: {}
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.details = res.obj
          this.productNumbers = res.obj.productNumbers
          this.productNumbers.forEach((item) => {
            item.imgUrls = item.imgUrls.map((val) => {
              val = (this.imgPath + val)
              return val
            })
          })
          if (res.obj.madanUrls && res.obj.madanUrls.length > 0) {
            res.obj.madanUrls = res.obj.madanUrls.map((item) => {
              item = this.imgPath + item
              return item
            })
          } else {
            res.obj.madanUrls = []
          }
          if (res.obj.sendCredentialUrls && res.obj.sendCredentialUrls.length > 0) {
            res.obj.sendCredentialUrls = res.obj.sendCredentialUrls.map((item) => {
              item = this.imgPath + item
              return item
            })
          } else {
            res.obj.sendCredentialUrls = []
          }

          this.madanUrls = res.obj.madanUrls
          this.totalMoney = res.obj.totalMoney
        }
      })
    },
    goInputJb(id) {
      this.$router.push({ name: 'inputJb', query: { id } })
    },
    // 公共请求
    sameConfirm(id, done, instance, text) {
      this.$store.dispatch('changeload', true)
      let url = ''
      let obj = {}
      let method = 'get'
      // 取消订单
      if (text == 'cancelOrder') {
        url = `${allApi.cut.cut}/${id}?_function=cancel`
        method = 'put'
      } else if (text == 'submitPass') {
        // 提交审核
        url = `${allApi.cut.cut}/${id}?_function=submit`
        method = 'put'
      } else if (text == 'passCheck') {
        // 审核通过
        url = `${allApi.cut.cut}/${id}?_function=agree`
        method = 'put'
      } else if (text == 'passNoCheck') {
        // 审核不通过
        url = `${allApi.cut.cut}/${id}?_function=disagree`
        method = 'put'
        obj = { denyRemark: this.denyRemark }
      } else if (text == 'confirmPay') {
        // 审核不通过
        url = `${allApi.cut.cut}/${id}?_function=confirm`
        method = 'put'
      } else if (text == 'send') {
        // 发货凭证
        url = `${allApi.cut.cut}/${id}?_function=send`
        method = 'put'
        obj = {
          sendCredentialUrls: this.sendCredentialUrls.map((item) => {
            item = item.replace(this.imgPath, '')
            return item
          })
        }
      }
      newRequest({
        url,
        method,
        contentType: method === 'put' ? 'application/json' : 'application/x-www-form-urlencoded',
        data: obj
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (instance) {
          instance.confirmButtonLoading = false
        }
        if (res.success == 1) {
          const self = this
          done && done()
          self.clearTemData()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.getDetail()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    // 提交审核提醒
    submitPass(id) {
      this.$msgbox({
        title: '提示',
        message: '是否确认提交审核?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(id, done, instance, 'submitPass')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    // 取消订单提醒
    cancelOrder(id) {
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
            this.sameConfirm(id, done, instance, 'cancelOrder')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    // 确认审核通过
    passCheck(id) {
      this.$msgbox({
        title: '提示',
        message: '是否确认审核通过?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(id, done, instance, 'passCheck')
          } else {
            done()
          }
        }
      }).then(action => {});
    },
    // 确认收款
    confirmPay(id) {
      this.$msgbox({
        title: '提示',
        message: '是否确认收款?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...'
            this.sameConfirm(id, done, instance, 'confirmPay')
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
      this.sendVisible = false
      this.sendCredentialUrls = []
    },
    // 确认审核不通过
    passNoCheck(id) {
      this.passNoCheckStatus = true
      this.temId = id
    },
    confirmPassNoCheck() {
      this.sameConfirm(this.temId, '', '', 'passNoCheck')
    },
    // 单个发货
    confirmSend() {
      this.sameConfirm(this.temId, '', '', 'send')
    },
    uploadImg(id) {
      this.temId = id
      this.sendVisible = true
    },
    // 上传图片组件
    beforeUpload(file) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
          quality: 1
        })
        .then(function(rst) {
          // 处理成功会执行
          rst.formData.append('field', 'imgUrl')
          request({
            url: '/redwood/sys/Common/uploadFile.do?type=4',
            method: 'post',
            data: rst.formData,
            dataType: 'FormData'
          }).then(data => {
            that.$store.dispatch('changeload', false)
            if (data.success === '1') {
              that.handleSuccess(data)
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
    handleSuccess(file, fileList) {
      this.$store.dispatch('changeload', false)
      this.sendCredentialUrls.push(this.imgPath + file.imgUrl)
    },
    handleError(file, fileList) {
      this.$store.dispatch('changeload', false)
    },
    del(url) {
      this.sendCredentialUrls = this.sendCredentialUrls.filter((item, key) => item != url)
    },
  },
  update() {}
};

</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
// .cutDetail-jb-publish {
//   .jb-title {
//     font-size: 18px;
//     font-weight: normal;
//   }
//   .jb-progress {
//     padding-top: 20px;
//     text-align: center;
//   }
//   .el-upload-list {
//     display: none;
//   }
//   .bot-line {
//     position: relative;
//     &:after {
//       position: absolute;
//       display: block;
//       content: '';
//       height: 2px;
//       width: 100%;
//       background: #bfcbd9;
//     }
//   }
//   .top-line {
//     position: relative;

//     &:before {
//       position: absolute;
//       display: block;
//       content: '';
//       height: 2px;
//       width: 100%;
//       background: #bfcbd9;
//     }
//   }

//   .jb-info {
//     float: left;
//     width: 150px;
//     padding: 10px 0;
//     background: #20a0ff;
//     text-align: center;
//     color: #fff;
//   }
//   .jb-info-content {
//     padding-bottom: 20px;
//     .line-item {
//       margin-bottom: 10px;
//       .line-item-l {
//         float: left;
//         font-size: 14px;
//         width: 146px;
//         text-align: right;
//         padding-right: 10px;
//       }
//       .radio-tit {
//         padding-top: 5px;
//       }
//       .line-item-r {
//         font-size: 14px;
//         min-width: 500px;
//         float: left;
//       }
//       .buyer-select-info {
//         p {
//           padding: 10px 0;
//         }
//       }
//       .mark {
//         color: red;
//       }
//     }
//   }
//   .product-list {
//     .pro-title {
//       position: relative;
//       top: 10px;
//       float: left;
//       margin-right: 10px;
//     }
//     .pro-list-item {
//       float: left;
//       margin-right: 20px;
//     }
//   }
//   .jb-content-buyer-info {
//     margin-bottom: 10px;
//   }
//   .operate-wrap {
//     .operate {
//       float: right;
//       width: 30px;
//       height: 30px;
//       line-height: 30px;
//       text-align: center;
//       background: #20a0ff;
//       border-radius: 50%;
//       cursor: pointer;
//       color: #fff;
//       &:hover {
//         color: #000;
//         background: #0c95fb;
//       }
//     }
//     .add {
//       margin-right: 20px;
//     }
//     .plus {
//       background: #FF4949;
//       &:hover {
//         color: #000;
//         background: #FF4949;
//       }
//     }
//   }
//   .jb-content-title {
//     margin: 30px 0;
//   }
//   .showmadan {
//     float: left;
//     .madan-wrap {
//       position: relative;
//       float: left;
//       margin-right: 10px;
//       margin-bottom: 10px;
//       border: 1px solid #ccc;
//     }
//     .del-arrow {
//       position: absolute;
//       text-align: center;
//       width: 20px;
//       height: 20px;
//       line-height: 20px;
//       border-radius: 50%;
//       top: -10px;
//       right: -10px;
//       background-color: #ccc;
//       color: #fff;
//       border: 1px solid #fff;
//     }
//   }
//   .upImg {
//     float: left;
//     width: 42px;
//     height: 42px;
//     line-height: 42px;
//     background: #ccc;
//     text-align: center;
//     color: #fff;
//     font-size: 40px;
//     cursor: pointer;
//     &:active {
//       background: #999;
//     }
//   }
//   .money-info {
//     .money-info-ls {
//       float: left;
//       width: 100px;
//     }
//     .money-info-item {
//       margin-bottom: 10px;
//     }
//   }
// }

// .cutDetail-pay-money {
//   min-width: 500px;
//   .pay-content {
//     min-width: 500px;
//     .pay-item {
//       position: relative;
//       padding-bottom: 10px;
//       .pay-item-l {
//         width: 110px;
//         display: inline-block;
//         text-align: right;
//         padding-right: 10px;
//       }
//     }
//   }
//   .showmadan {
//     float: left;
//   }
//   .madan-wrap {
//     position: relative;
//     display: inline-block;
//     margin-right: 15px;
//     margin-bottom: 15px;
//   }
//   .del-arrow {
//     position: absolute;
//     text-align: center;
//     width: 20px;
//     height: 20px;
//     line-height: 20px;
//     border-radius: 50%;
//     top: -10px;
//     right: -10px;
//     background-color: #ccc;
//     color: #fff;
//     border: 1px solid #fff;
//   }
//   .el-upload-list {
//     display: none;
//   }
// }

</style>
