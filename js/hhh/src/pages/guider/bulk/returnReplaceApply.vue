<template>
  <section class="detail">
    <div class="detail-title">
      <span @click="toback"></span>
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
    <template v-if="obj.product.shopCompany">
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
          </el-form-item>
          <el-form-item label="商品信息" style="margin-top:12px;">
            <table style="border-collapse:collapse; border: 1px solid #ccc" border="1" border-spacing="0">
              <tr>
                <th style="width:100px;">品名</th>
                <th style="width:100px;">成分</th>
                <th style="width:100px;">幅宽</th>
                <th style="width:100px;">克重</th>
                <th style="width:100px;">空差</th>
                <th style="width:100px;">纸筒</th>
                <th style="width:100px;">成分</th>
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
                  <span>{{obj.product.width}}{{obj.product.widthUnit}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.weight}}{{obj.product.weightUnit}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.shortWeight}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.paperTube}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.composition}}</span>
                </td>
                <td style="text-align:center;">
                  <span>{{obj.product.metrePerKilo}}米</span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <div class="detail-group mb0">
      <div class="detail-item w100p">
        <h6>退换货内容</h6>
        <el-form label-width="150px" label-position="right">
          <el-form-item label="入仓单号">
            <span>{{obj.reposityNumber}}</span>
          </el-form-item>
          <el-form-item label="可退换数量">
            <span>{{totalQuantity | formatMoney}}{{totalQuantityUnit}}/{{totalQuantityCount}}匹</span>
          </el-form-item>
          <el-form-item label="退换类型" :required="true">
            <el-radio-group v-model="radio1" @change="selectType">
              <el-radio label="退">退</el-radio>
              <el-radio label="换">换</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 申请退货 -->
          <template v-if="radio1 == '退'">
            <el-form-item label="退货原因" required>
              <el-select v-model="reasonNumber" placeholder="请选择" @change="handleReasonChange">
                <el-option key="1" label="客户要求退货" value="1"></el-option>
                <el-option key="2" label="验货不通过退货" value="2"></el-option>
                <el-option key="3" label="其他" value="3"></el-option>
              </el-select>
              <template v-if="reasonNumber == 3">
                <el-input v-model="reasonStr" style="width:200px"></el-input>
              </template>
            </el-form-item>
            <el-form-item label="退货明细" :required="true" style="width:80%;">
              <el-table :data="obj.selectList" border ref="detailTable">
                <el-table-column width="180px" label="货号" prop="productNumber" :formatter="inputProductNumber"></el-table-column>
                <el-table-column width="150px" label="色号" prop="color"></el-table-column>
                <el-table-column width="150px" label="销售单价" prop="" align="right">
                  <template scope="scope">
                    <span>{{scope.row.salePrice | formatMoneym}}{{scope.row.salePriceUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="150px" label="成本单价" prop="" align="right">
                  <template scope="scope">
                    <span>{{scope.row.costPrice | formatMoneym}}{{scope.row.costPriceUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="150px" label="供应商税点" prop="taxPoint" align="center" :formatter="formattaxPoint"></el-table-column>
                <el-table-column label="*退货原数" prop="">
                  <template scope="scope">
                    <span>共{{scope.row.selectQuantityCount}}匹/{{scope.row.selectQuantity | formatMoney}}{{totalQuantityUnit}}</span>
                    <template v-if="scope.row.productNumber == '合计'"></template>
                    <template v-else>
                      <el-popover placement="bottom" title="" trigger="click" width="600" ref="popover1" :value="popoverVisible" :disabled="popoverVisible">
                        <template>
                          <input type="checkbox" v-model="scope.row.selectAll" @change="handleSelectAll(scope)" id="allSelectbox">全选(选中匹数({{checkedArr.length}}))</input>
                        </template>
                        <el-table :data="clothLoneList" border>
                          <el-table-column width="50px" align="center">
                            <template scope="scope">
                              <input type="checkbox" v-model="scope.row.isChecked" name="checkbox" @change="handleSelectChange(scope)"></input>
                            </template>
                          </el-table-column>
                          <el-table-column prop="" label="色号" :formatter="formatColor" align="center" width="100px"></el-table-column>
                          <el-table-column prop="number" label="匹号" align="center" width="100px"></el-table-column>
                          <el-table-column prop="" label="入仓实数" align="center" width="100px">
                            <template scope="scope">
                              <span>{{scope.row.quantity}}{{scope.row.quantityUnit}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="" label="实际布长" align="center">
                            <template scope="scope">
                              <span>{{scope.row.buchang}}{{scope.row.buchangUnit}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="checkFlaws" label="验布结果" align="center" width="120px" :formatter="formatCheckBu"></el-table-column>
                        </el-table>
                        <el-button type="primary" size="mini" @click.native="confirmSelect(scope.row)">选好了</el-button>
                        <el-button size="mini" @click.native="setTrue">取消</el-button>
                        <el-button slot="reference" ref="button" class="el-icon-arrow-down" size="mini" @click.native="setPopColor(scope.row)"></el-button>
                      </el-popover>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="*退货实数" align="center" width="120px">
                  <template scope="scope">
                    <template v-if="scope.row.productNumber != '合计'">
                      <el-input type="number" v-model="scope.row.inputRealQuantity" style="width:80px;" @input="handleInputQuantity(scope.row)"></el-input>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="退货备注">
              <!--  <el-input type="textarea" style="width:250px;margin-top:12px;" v-model="requestParams.guiderRemark"></el-input>
              </br>
              <span style="margin-left:220px;color:#f00">{{requestParams.guiderRemark.length}}/500</span> -->
              <div class="form-warp pl0">
                <textarea v-model="requestParams.guiderRemark" maxlength="500"></textarea>
                <span class="font-count">{{requestParams.guiderRemark.length}}/500</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="confirmSubmit" :disabled="submitFlag">提交审核</el-button>
              <!-- <el-button type="primary" @click.native="confirmSubmit" :disabled="checkOutInput1()">提交审核</el-button> -->
            </el-form-item>
          </template>
          <!-- 申请换货 -->
          <template v-if="radio1 == '换'">
            <el-form-item label="换货原因" required>
              <el-select v-model="reasonNumber" placeholder="请选择" @change="handleReasonChange">
                <el-option key="1" label="客户要求换货" value="1"></el-option>
                <el-option key="2" label="验货不通过换货" value="2"></el-option>
                <el-option key="3" label="其他" value="3"></el-option>
              </el-select>
              <template v-if="reasonNumber == 3">
                <el-input v-model="reasonStr" style="width:200px"></el-input>
              </template>
            </el-form-item>
            <el-form-item label="换货明细" :required="true">
              <el-table :data="obj.selectList" border style="margin-top:12px; width:1200px" ref="detailTable">
                <el-table-column width="180px" label="货号" prop="productNumber" :formatter="inputProductNumber"></el-table-column>
                <el-table-column width="150px" label="色号" prop="color"></el-table-column>
                <el-table-column width="150px" label="销售单价" prop="" align="right">
                  <template scope="scope">
                    <span>{{scope.row.salePrice | formatMoneym}}{{scope.row.salePriceUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="150px" label="成本单价" prop="" align="right">
                  <template scope="scope">
                    <span>{{scope.row.costPrice | formatMoneym}}{{scope.row.costPriceUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="150px" label="税点" prop="taxPoint" align="center" :formatter="formattaxPoint"></el-table-column>
                <el-table-column label="*换货原数" prop="">
                  <template scope="scope">
                    <span>共{{scope.row.selectQuantityCount}}匹/{{scope.row.selectQuantity | formatMoney}}{{totalQuantityUnit}}</span>
                    <template v-if="scope.row.productNumber == '合计'"></template>
                    <template v-else>
                      <el-popover placement="bottom" title="" trigger="click" width="600" ref="popover1" :value="popoverVisible" :disabled="popoverVisible">
                        <template>
                          <input type="checkbox" v-model="scope.row.selectAll" @change="handleSelectAll(scope)" id="allSelectbox">全选</input>
                        </template>
                        <el-table :data="clothLoneList" border>
                          <el-table-column width="50px" align="center">
                            <template scope="scope">
                              <input type="checkbox" v-model="scope.row.isChecked" name="checkbox" @change="handleSelectChange(scope)"></input>
                            </template>
                          </el-table-column>
                          <el-table-column prop="" label="色号" :formatter="formatColor" align="center" width="100px"></el-table-column>
                          <el-table-column prop="number" label="匹号" align="center" width="100px"></el-table-column>
                          <el-table-column prop="" label="入仓实数" align="center" width="100px">
                            <template scope="scope">
                              <span>{{scope.row.quantity}}{{scope.row.quantityUnit}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="" label="实际布长" align="center">
                            <template scope="scope">
                              <span>{{scope.row.buchang}}{{scope.row.buchangUnit}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="checkFlaws" label="验布结果" align="center" width="120px" :formatter="formatCheckBu"></el-table-column>
                        </el-table>
                        <el-button type="primary" size="mini" @click.native="confirmSelect(scope.row)">选好了</el-button>
                        <el-button size="mini" @click.native="setTrue">取消</el-button>
                        <el-button slot="reference" ref="button" class="el-icon-arrow-down" size="mini" @click.native="setPopColor(scope.row)"></el-button>
                      </el-popover>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="*换货实数" align="center" width="120px">
                  <template scope="scope">
                    <template v-if="scope.row.productNumber != '合计'">
                      <el-input type="number" v-model="scope.row.inputRealQuantity" style="width:80px;" @input="handleInputQuantity(scope.row)"></el-input>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column label="*现采购数" align="center" width="120px">
                  <template scope="scope">
                    <template v-if="scope.row.productNumber != '合计'">
                      <el-input type="number" v-model="scope.row.inputNeedBuyQuantity" style="width:80px;" @input="handleInputBuyQuantity(scope.row)"></el-input>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="上传换货码单">
              <div class="fl">
                <a :href="item" :key="item" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" class="madan-wrap">
              <img :src="item" width='86' height="86" />
              <span @click="del(item)" class="del-arrow">X</span>
            </a>
              </div>
              <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" class="fl" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError">
                <div class="icon-upload"></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="换货备注">
              <!-- <el-input type="textarea" style="width:250px;margin-top:12px;" v-model="requestParams.guiderRemark"></el-input>
              </br>
              <span style="margin-left:220px;color:#f00">{{requestParams.guiderRemark.length}}/500</span> -->
              <div class="form-warp pl0">
                <textarea v-model="requestParams.guiderRemark" maxlength="500"></textarea>
                <span class="font-count">{{requestParams.guiderRemark.length}}/500</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="confirmSubmit" :disabled="submitFlag">提交审核</el-button>
              <!-- <el-button type="primary" @click.native="confirmSubmit" :disabled="checkOutInput1()">提交审核</el-button> -->
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>
    <Lightbox></Lightbox>
  </section>
</template>
<script>
  import Lightbox from 'components/lightbox/lightbox'
  import {
    newRequest,
    request
  } from 'utils/tool'
  import lrz from 'lrz'
  export default {
    components: {
      Lightbox,
    },
    data() {
      return {
        imgUrls: [],
        totalQuantity: 0,
        totalQuantityUnit: '',
        totalQuantityCount: '',
        popoverVisible: false,
        clothLoneList: [],
        checkedArr: [],
        reasonNumber: '',
        reasonStr: '',
        radio1: '',
        shopOriginalImgUrls: [],
        imgPath: 'http://www.soouya.com',
        obj: {
          order: {
            customerAccount: {},
            address: {},
          },
          product: {},
        },
        submitFlag: true,
        requestParams: {
          id: '',
          type: 1,
          reason: '',
          lstClothLoneIdToReturnReplace: [],
          guiderRemark: '',
          realBuyQuantity: [],
          imgUrls: []
        },
      }
    },
    mounted() {
      this.requestParams.id = this.$route.query.id
      this.$store.dispatch('changeload', false)
      this.getData()
    },
    watch: {
      reasonStr() {
        if (this.reasonNumber == 3) {
          this.requestParams.reason = this.reasonStr
          }
      },
      requestParams: {
        handler: function (val) { // 通过监控来确定提交核对是否置灰
            console.log(val)
          val.realBuyQuantity.forEach(item => {
            if (this.radio1 == '退') {
              if ((val.reason || this.reasonStr) && val.lstClothLoneIdToReturnReplace.length && item.realQuantity) {
                this.submitFlag = false
              } else {
                this.submitFlag = true
              }
            }
            if (this.radio1 == '换') {
              if ((val.reason || this.reasonStr) && val.lstClothLoneIdToReturnReplace.length && item.realQuantity &&
                item.needBuyQuantity) {
                this.submitFlag = false
              } else {
                this.submitFlag = true
              }
            }
          })
        },
        deep: true
      }
    },
    methods: {
      getData() {
        // let res = config.guiderRR
        newRequest({
          url: '/redwood/reposity/InReposity/getInReposityForReplaceReturnByGuider',
          method: 'get',
          data: {
            id: this.$route.query.id
          },
          contentType: 'application/json',
        }).then(res => {
          if (res.success == 1) {
            this.obj = res.obj
            if (!res.obj.product) {
              this.obj.product = {}
            }
            this.shopOriginalImgUrls = this.formateImgList(this.obj.product.shopOriginalImgUrls)
            this.totalQuantity = 0
            this.totalQuantityCount = 0
            for (let i = 0; i < this.obj.selectList.length; i++) {
              this.totalQuantityUnit = this.obj.selectList[i].clothLoneList[0].quantityUnit
              this.totalQuantityCount += this.obj.selectList[i].clothLoneList.length
              this.obj.selectList[i].selectQuantityCount = 0
              this.obj.selectList[i].selectQuantity = 0
              this.obj.selectList[i].selectQuantityUnit = this.totalQuantityUnit
              for (let j = 0; j < this.obj.selectList[i].clothLoneList.length; j++) {
                this.totalQuantity += this.obj.selectList[i].clothLoneList[j].quantity
              }
            }
            if (this.obj.selectList[this.obj.selectList.length - 1].productNumber == '合计') {
              this.obj.selectList.splice(this.obj.selectList.length - 1, 1)
            }
            this.calQuantity()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 发起退换货
      confirmSubmit() {
        if (this.radio1 == '退') {
          this.requestParams.type = 1
        } else {
          this.requestParams.type = 2
        }
        this.requestParams.reason = this.reasonStr
        for (let i = 0; i < this.imgUrls.length; i++) {
          this.requestParams.imgUrls.push(this.imgUrls[i].slice(21))
        }
        newRequest({
          url: '/redwood/returnreplace/commitForGuider',
          data: this.requestParams,
          contentType: 'application/json',
          method: 'post'
        }).then((res) => {
          if (res.success == 1) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            window.history.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 输入退货实数的响应
      handleInputQuantity(row) {
        console.log(row.inputRealQuantity)
        let bool = false
        let i = 0
        if (row.inputRealQuantity < 0 || row.inputRealQuantity == '') {
          if (this.radio1 == '退') {
            this.$message('退货实数不得小于0')
            this.submitFlag = true
          } else {
            this.$message('换货实数不得小于0')
            this.submitFlag = true
          }
          for (; i < this.requestParams.realBuyQuantity.length; i++) {  // 处理填入数值了然后又删了这时候把该字段置空
            if (this.requestParams.realBuyQuantity[i].color == row.color) {
              this.requestParams.realBuyQuantity[i].realQuantity = null
            }
          }
        } else {
          for (; i < this.requestParams.realBuyQuantity.length; i++) {
            if (this.requestParams.realBuyQuantity[i].color == row.color) {
              bool = true
              break
            } else {
              bool = false
            }
          }
          if (bool) {
            this.requestParams.realBuyQuantity[i].realQuantity = row.inputRealQuantity
          } else {
            let list = {
              color: row.color,
              realQuantity: row.inputRealQuantity,
              needBuyQuantity: row.inputNeedBuyQuantity
            }
            this.requestParams.realBuyQuantity.push(list)
          }
        }
      },
      // 输入现采购数的响应
      handleInputBuyQuantity(row) {
        let bool = false
        let i = 0
        if (row.inputNeedBuyQuantity < 0 || row.inputNeedBuyQuantity == '') {
          this.$message('现采购数不得小于0')
          this.submitFlag = true
          for (; i < this.requestParams.realBuyQuantity.length; i++) {  // 处理填入数值了然后又删了这时候把该字段置空
            if (this.requestParams.realBuyQuantity[i].color == row.color) {
              this.requestParams.realBuyQuantity[i].needBuyQuantity = null
            }
          }
          return
        } else {
          for (; i < this.requestParams.realBuyQuantity.length; i++) {
            if (this.requestParams.realBuyQuantity[i].color == row.color) {
              bool = true
              break
            } else {
              bool = false
            }
          }
          if (bool) {
            this.requestParams.realBuyQuantity[i].needBuyQuantity = row.inputNeedBuyQuantity
          } else {
            let list = {
              color: row.color,
              realQuantity: row.inputRealQuantity,
              needBuyQuantity: row.inputNeedBuyQuantity
            }
            this.requestParams.realBuyQuantity.push(list)
          }
        }
      },
      confirmSelect(rows) {
        rows.clothLoneList = JSON.parse(JSON.stringify(this.clothLoneList))
        let list = this.requestParams.lstClothLoneIdToReturnReplace
        rows.clothLoneList.forEach(row => {
          let exist = false
          if (row.isChecked) {
            for (let i = 0; i < list.length; i++) {
              if (list[i] == row.id) {
                exist = true
                break
              }
            }
            if (!exist) {
              list.push(row.id)
            }
            row.hasSelected = 1
          } else {
            for (let i = 0; i < list.length; i++) {
              if (row.id == list[i]) {
                list.splice(i, 1)
              }
            }
            row.hasSelected = 0
          }
        })
        this.requestParams.lstClothLoneIdToReturnReplace = list.slice(0)
        this.setTrue()
        for (let i = 0; i < this.obj.selectList.length; i++) {
          let quantityCount = 0
          let totalQuantity = 0
          let totalUnit = ''
          for (let j = 0; j < this.obj.selectList[i].clothLoneList.length; j++) {
            if (this.obj.selectList[i].clothLoneList[j].hasSelected) {
              quantityCount += 1
              totalQuantity += this.obj.selectList[i].clothLoneList[j].quantity
              totalUnit = this.obj.selectList[i].clothLoneList[j].quantityUnit
            }
          }
          this.obj.selectList[i].selectQuantityCount = quantityCount
          this.obj.selectList[i].selectQuantity = totalQuantity
          this.obj.selectList[i].selectQuantityUnit = totalUnit
        }
        let len = this.obj.selectList.length
        this.obj.selectList.splice(len - 1, 1)
        this.calQuantity()
      },
      // 处理勾选货取消全选框
      handleSelectAll(scope) {
        scope.row.clothLoneList.forEach(item => {
          item.isChecked = scope.row.selectAll
        })
        this.clothLoneList = scope.row.clothLoneList
        for (let i = 0; i < this.clothLoneList.length; i++) {
          let list = document.getElementsByName('checkbox')
          for (let j = 0; j < list.length; j++) {
            if (list[j].type == 'checkbox') {
              list[j].checked = this.clothLoneList[i].isChecked
            }
          }
        }
        this.checkedArr = this.clothLoneList.filter(item => {
          if (item.isChecked) {
            return item
          }
        })
      },
      // 每一个选择框的点击事件
      handleSelectChange(scope) {
        for (let i = 0; i < this.obj.selectList.length; i++) {
          if (this.obj.selectList[i].clothLoneList[0].number == this.clothLoneList[0].number) {
            let allSelect = false
            for (let j = 0; j < this.clothLoneList.length; j++) {
              if (!this.clothLoneList[j].isChecked) {
                allSelect = false
                break
              }
              allSelect = true
            }
            scope.row.selectAll = allSelect
            document.getElementById('allSelectbox').checked = allSelect
          }
        }
        this.checkedArr = this.clothLoneList.filter(item => {
          if (item.isChecked) {
            return item
          }
        })
      },
      // 处理退换货原因选中值发生变化的操作
      handleReasonChange(val) {
        if (this.radio1 == '退') {
          if (val == 1) {
            this.reasonStr = '客户要求退货'
          } else if (val == 2) {
            this.reasonStr = '验货不通过退货'
          } else {
            this.reasonStr = ''
          }
        } else if (this.radio1 == '换') {
          if (val == 1) {
            this.reasonStr = '客户要求换货'
          } else if (val == 2) {
            this.reasonStr = '验货不通过换货'
          } else {
            this.reasonStr = ''
          }
        }
        this.requestParams.reason = this.reasonStr
      },
      // 设置popover中的色号及判断是否选中
      setPopColor(row, index) {
        this.popoverVisible = false
        this.selectIndex = index
        this.popColor = row.color
        let rows1 = row.clothLoneList
        if (rows1) {
          rows1.forEach(row1 => {
            if (row1.hasSelected) {
              row1.isChecked = true
            } else {
              row1.isChecked = false
            }
          })
        }
        this.clothLoneList = JSON.parse(JSON.stringify(rows1))
        let allSelect = false
        for (let i = 0; i < this.clothLoneList.length; i++) {
          if (!this.clothLoneList[i].isChecked) {
            allSelect = false
            break;
          }
          allSelect = true
        }
        row.selectAll = allSelect
        console.log(this.clothLoneList)
      },
      // 退换类型切换时操作
      selectType() {
        if (this.radio1 == '退') {
          if (this.reasonNumber == 1) {
            this.reasonStr = '客户要求退货'
          } else if (this.reasonNumber == 2) {
            this.reasonStr = '验货不通过退货'
          } else {
            this.reasonStr = ''
          }
        } else if (this.radio1 == '换') {
          if (this.reasonNumber == 1) {
            this.reasonStr = '客户要求换货'
          } else if (this.reasonNumber == 2) {
            this.reasonStr = '验货不通过换货'
          } else {
            this.reasonStr = ''
          }
        }
        this.requestParams.reason = this.reasonStr
      },
      calQuantity() {
        let lastObj = JSON.parse(JSON.stringify(this.obj.selectList[0]))
        lastObj.productNumber = '合计'
        lastObj.color = ''
        lastObj.salePrice = null
        lastObj.salePriceUnit = ''
        lastObj.costPrice = null
        lastObj.costPriceUnit = ''
        lastObj.taxPoint = ''
        lastObj.selectQuantity = 0
        lastObj.selectQuantityCount = 0
        this.obj.selectList.forEach(item => {
          // console.log(item, '合计')
          lastObj.selectQuantity += item.selectQuantity
          lastObj.selectQuantityCount += item.selectQuantityCount
        })
        this.obj.selectList.push(lastObj)
      },
      selectable(row, column) {
        if (row.selectQuantityCount != 0) {
          return true
        } else {
          return false
        }
      },
      toback() {
        window.history.go(-1)
      },
      setTrue() {
        this.popoverVisible = true
      },
      formatColor(row, column) {
        let val = row[column.property]
        return val === undefined ? this.popColor : val
      },
      inputProductNumber(row, column) {
        let val = row[column.property]
        return val === undefined ? this.obj.order.productNumber : val
      },
      formattaxPoint(row, column) {
        let val = row[column.property]
        if (val == undefined) {
          if (this.obj.order.sellerTaxPoint != null && this.obj.order.sellerTaxPoint >= 0) {
            return Number(this.obj.order.sellerTaxPoint).toFixed(2) + '%'
          } else {
            return '--'
          }
        } else {
          return val
        }
      },
      // 组合图片网址
      formateImgList(list) {
        let arr = []
        if (Array.isArray(list)) {
          for (let i = 0; i < list.length; i++) {
            arr.push(this.imgPath + list[i])
          }
        }
        return arr
      },
      // 上传换货码单系列操作
      beforeUpload(file) { // 预览图片
        const that = this
        this.$store.dispatch('changeload', true)
        lrz(file, {
            quality: 1
          })
          .then(function (rst) {
            // 处理成功会执行
            rst.formData.append('field', 'imgUrl')
            request({
              url: '/redwood/sys/Common/uploadFile.do?type=5',
              method: 'post',
              data: rst.formData,
              dataType: 'FormData'
            }).then(data => {
              that.$store.dispatch('changeload', false)
              if (data.success === '1') {
                that.handleSuccess(data)
              } else {
                that.$message.error(data.msg)
              }
            })
            return rst
          })
        return false
      },
      handleSuccess(file, fileList) {
        this.$store.dispatch('changeload', false)
        this.imgUrls.push(this.imgPath + file.imgUrl)
      },
      handleError(file, fileList) {
        this.$store.dispatch('changeload', false)
      },
      del(url) {
        this.imgUrls = this.imgUrls.filter((item, key) => item != url)
      },
      setEmpty(resetObj) {
        let keys = Object.keys(resetObj)
        for (let i = 0; i < keys.length; i++) {
          if (typeof resetObj[keys[i]] == 'object' && !Array.isArray(resetObj[keys[i]])) {
            this.setEmpty(resetObj[keys[i]])
          } else if (Array.isArray(resetObj[keys[i]])) {
            resetObj[keys[i]] = []
          } else if (typeof resetObj[keys[i]] == 'number') {
            resetObj[keys[i]] = 0
          } else if (typeof resetObj[keys[i]] == 'string') {
            resetObj[keys[i]] = ''
          }
        }
        return
      },
    },
    filters: {
      formatMoneym(val) {
        return val === null ? '' : Number(val).toFixed(2)
      },
    }
  }
</script>
<style lang="scss">
  // .el-popover {
  //   .el-table__body-wrapper {
  //     max-height: 300px
  //   }
  // }
  // .show-image {
  //   .card {
  //     width: 200px;
  //   }
  //   .image {
  //     width: 100%;
  //     height: 200px;
  //     cursor: pointer;
  //   }
  // }
  // .price-show-image {
  //   font-size: 14px;
  //   .card {
  //     width: 140px;
  //   }
  //   .image {
  //     width: 100%;
  //     height: 120px;
  //     cursor: pointer;
  //   }
  // }
  // .upImg {
  //   float: left;
  //   width: 42px;
  //   height: 42px;
  //   line-height: 42px;
  //   background: #ccc;
  //   text-align: center;
  //   color: #fff;
  //   font-size: 40px;
  //   cursor: pointer;
  //   &:active {
  //     background: #999;
  //   }
  // }
  .madan-wrap {
    position: relative;
    display: inline-block;
    margin-right: 15px;
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

</style>
