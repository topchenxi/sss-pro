<template>
    <div class="deliver-list">
      <div class="y_tab tab-wrap">
        <el-tabs type="card" :active-name="tabIndex" @tab-click="handleClick">
          <!--等待入仓tab及具体html  -->
          <!-- <el-tab-pane name="1" :label="'等待入仓'+(num1 ? '(' : '')+num1+''+(num1 ? ')' : '')">
                    <fliter :category="{name: 'fh', index: tabIndex }" :params="filters" @getParams="search" />
                    <div class="y_table">
                      <div class="y_table_wrap">
                      </div>
                    </div>
                  </el-tab-pane> -->
          <!--等待验货tab及具体html  -->
          <!-- <el-tab-pane name="2" :label="'等待验货'+(num2? '(' : '')+num2+''+(num2 ? ')' : '')">
                    <fliter :category="{name: 'fh', index: tabIndex }" :params="filters" @getParams="search" />
                    <div class="y_table">
                      <div class="y_table_wrap">
                      </div>
                    </div>
                  </el-tab-pane> -->
          <!--等待出仓tab及具体tab  -->
          <el-tab-pane name="1" :label="'等待出仓'+(num1 ? '(' : '')+num1+''+(num1 ? ')' : '')">
            <fliter :category="{name: 'fh', index: tabIndex }" :params="filters" @getParams="search" />
            <div class="y_table">
              <div class="y_table_wrap">
                <el-table :data="result" :resizable="false" :height="height">
                  <el-table-column prop="reposityNumber" label="入仓单号" align="center" width="120">
                  </el-table-column>
                  <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="180" label="入仓时间">
                    <div>{{row.reposityTime | convertDate}}</div>
                  </el-table-column>
                  <el-table-column inline-template align="right" label="出仓货款" width="120">
                    <div>¥{{row.total}}</div>
                  </el-table-column>
                  <el-table-column prop="buyerCompany" align="center" label="采购商" width="120">
                  </el-table-column>
                  <el-table-column prop="sellerCompany" align="center" width="100" label="供应商">
                  </el-table-column>
                  <el-table-column inline-template align="center" label="品类" width="80">
                    <div>
                      <template v-if="row.productType == '1'">面料</template>
                      <template v-if="row.productType == '2'">辅料</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="100" label="验货">
                    <div>
                      <template v-if="row.checkCloth == '1'">验货</template>
                      <template v-if="row.checkCloth == '0'">不验货</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="120" label=" 配送方式">
                    <div>
                      <template v-if="row.sendType == '0'">搜芽配送</template>
                      <template v-if="row.sendType == '1'">采购商自提</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template width="180" align="center" label="待发货数量">
                    <div>
                      {{Number(row.totalpihaoNumber).toFixed(2)}}{{row.quantityUnit}}/{{row.clothLoneList && row.clothLoneList.length}}匹
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" label="当前状态" width="100">
                    <div>
                      <template v-if="row.checkCloth == '1'">等待验布抉择</template>
                      <template v-if="row.checkCloth == '0'">等待确认发货</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" label="操作" width="220">
                    <div class="operate-btn">
                      <router-link :to="{name: 'orderDetail', query: { id: row.reposityNumber, pathIndex: 2, orderNumber: row.orderNumber, status: 0}}">
                        <el-button class="o-btn" size="small" type="primary">详情</el-button>
                      </router-link>
                      <el-button class="o-btn" size="small" type="primary" @click.native="sendgood(row)">通知出仓</el-button>
                      <!-- (row.clothLoneStatus == 3115 && row.checkCloth == 0) -->
                      <template v-if="row.checkCloth == '1'">
                        <router-link :to="{name: 'beforeApplyRrOrder', query: {id: row.reposityId} }">
                          <el-button class="o-btn" size="small" type="primary">申请退换货</el-button>
                        </router-link>
                      </template>
                    </div>
                  </el-table-column>
                </el-table>
              </div>
              <div class="bottom">
                <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
              </div>
            </div>
          </el-tab-pane>
          <!--等待客户确认收货tab及具体html  -->
          <el-tab-pane name="2" :label="'等待客户确认收货'+(num2 ? '(' : '')+num2+''+(num2 ? ')' : '')">
            <fliter :category="{name: 'fh', index: tabIndex }" :params="filters" @getParams="search" />
            <div class="y_table">
              <div class="y_table_wrap">
                <el-table :data="result" :resizable="false" :height="height">
                  <el-table-column prop="reposityNumber" label="出仓单号" align="center" width="120">
                  </el-table-column>
                  <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="180" label="通知发货时间">
                    <div>{{row.notifySendTime | convertDate}}</div>
                  </el-table-column>
                  <el-table-column inline-template align="right" label="出仓货款" width="120">
                    <div>¥{{row.total}}</div>
                  </el-table-column>
                  <el-table-column prop="buyerCompany" align="center" label="采购商" width="120">
                  </el-table-column>
                  <el-table-column prop="sellerCompany" align="center" width="100" label="供应商">
                  </el-table-column>
                  <el-table-column inline-template align="center" label="品类" width="80">
                    <div>
                      <template v-if="row.productType == '1'">面料</template>
                      <template v-if="row.productType == '2'">辅料</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="100" label="验货">
                    <div>
                      <template v-if="row.checkCloth == '1'">验货</template>
                      <template v-if="row.checkCloth == '0'">不验货</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="120" label=" 配送方式">
                    <div>
                      <template v-if="row.sendType == '0'">搜芽配送</template>
                      <template v-if="row.sendType == '1'">采购商自提</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template width="180" align="center" label="通知出仓实数">
                    <div>
                      {{Number(row.totalpihaoNumber).toFixed(2)}}{{row.quantityUnit}}/{{row.clothLoneList && row.clothLoneList.length}}匹
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" label="操作" width="220">
                    <div class="operate-btn">
                      <el-button v-if="row.clothLoneStatus == '3883'" class="o-btn" size="small" type="primary" @click.native="confirmGood(row)">确认收货</el-button>
                      <router-link :to="{name: 'orderDetail', query: { id: row.reposityNumber, pathIndex: 2, orderNumber: row.orderNumber, status: 1 }}">
                        <el-button class="o-btn" size="small" type="primary">详情</el-button>
                      </router-link>
                    </div>
                  </el-table-column>
                </el-table>
              </div>
              <div class="bottom">
                <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
              </div>
            </div>
          </el-tab-pane>
          <!--客户已收货tab及具体html  -->
          <el-tab-pane name="3" :label="'客户已收货'+(num3 ? '(' : '')+num3+''+(num3 ? ')' : '')">
            <fliter :category="{name: 'fh', index: tabIndex }" :params="filters" @getParams="search" />
            <div class="y_table">
              <div class="y_table_wrap">
                <el-table :data="result" :resizable="false" :height="height">
                  <el-table-column prop="reposityNumber" label="出仓单号" align="center" width="120">
                  </el-table-column>
                  <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="180" label="出仓时间">
                    <div>{{row.reposityTime | convertDate}}</div>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="180" label="确认收货时间">
                    <div>{{row.confirmReceiveTime | convertDate}}</div>
                  </el-table-column>
                  <el-table-column inline-template align="right" label="出仓货款" width="120">
                    <div>¥{{row.total}}</div>
                  </el-table-column>
                  <el-table-column prop="buyerCompany" align="center" label="采购商" width="120">
                  </el-table-column>
                  <el-table-column prop="sellerCompany" align="center" width="100" label="供应商">
                  </el-table-column>
                  <el-table-column inline-template align="center" label="品类" width="80">
                    <div>
                      <template v-if="row.productType == '1'">面料</template>
                      <template v-if="row.productType == '2'">辅料</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="100" label="验货">
                    <div>
                      <template v-if="row.checkCloth == '1'">验货</template>
                      <template v-if="row.checkCloth == '0'">不验货</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" width="120" label=" 配送方式">
                    <div>
                      <template v-if="row.sendType == '0'">搜芽配送</template>
                      <template v-if="row.sendType == '1'">采购商自提</template>
                    </div>
                  </el-table-column>
                  <el-table-column inline-template width="180" align="center" label="已出仓实数">
                    <div>
                      {{Number(row.totalpihaoNumber).toFixed(2)}}{{row.quantityUnit}}/{{row.clothLoneList.length}}匹
                    </div>
                  </el-table-column>
                  <el-table-column inline-template align="center" label="操作" width="200" fixed="right">
                    <div class="operate-btn">
                      <!-- <template v-if="row.isTwoMonth">
                                            <router-link :to="{name: 'deliverApplyOrder', query: {id: row.outReposityNumber, category: 2, buyerId: row.buyerId} }">
                                              <el-button class="o-btn" size="small" type="primary">申请退换货</el-button>
                                            </router-link>
                                           </template> -->
                      <router-link :to="{name: 'orderDetail', query: { id: row.reposityNumber, pathIndex: 2, orderNumber: row.orderNumber, status: 1 }}">
                        <el-button class="o-btn" size="small" type="primary">详情</el-button>
                      </router-link>
                      <template v-if="row.rereconciliated && ((currentTime - row.reposityTime)/(1000 * 60 * 60 * 24)) < 60">
                        <router-link :to="{name: 'afterApplyRrOrder', query: {id: row.reposityId}}">
                          <!--插入时间戳  -->
                          <!--100改成30  -->
                          <el-button type="primary" size="small">申请退换货</el-button>
                        </router-link>
                      </template>
                      <template v-if="((currentTime - row.reposityTime)/(1000 * 60 * 60 * 24)) > 60"></template>
                      <template v-if="!row.rereconciliated">
                        <el-tooltip class="item" effect="dark" content="出仓单未对账，不能售后退换货" placement="top">
                          <span style="font-size:13px;color:#20A0FF;margin-left:6px;display:inline-block; border: 1px solid #ccc;padding:3px 5px;border-radius:5px">申请退换货</span>
                        </el-tooltip>
                      </template>
                    </div>
                  </el-table-column>
                </el-table>
              </div>
              <div class="bottom">
                <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 确认收货 -->
      <el-dialog title="确认收货" v-model="confirmtakegood" custom-class="common-pop" size="tiny" :close-on-click-modal="false">
        <div class="take-good clearfix send-good">
          <div class="t-item">
            <div class="t-item-l">订单号</div>
            <div class="t-item-r">{{confirmtakegoodData.serviceNumber}}</div>
          </div>
          <div class="t-item">
            <div class="t-item-l">采购商</div>
            <div class="t-item-r">{{confirmtakegoodData.buyerCompany}}</div>
          </div>
          <div class="t-item">
            <div class="t-item-l" style="position: absolute; top:0;">发货内容</div>
            <div class="t-item-r" style="margin-left: 100px;">
              <div class="r-line" v-for='(checkb, index) in confirmtakegoodData.clothLoneList'>
                {{checkb.productNumber}}|{{checkb.color}}|{{checkb.quantity}}{{checkb.quantityUnit}}|{{checkb.number}}
                <template v-if="checkb.rank">({{checkb.rank}}/{{checkb.average}}分)</template>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="confirmTakeit(confirmtakegoodData)">确认收货</el-button>
          <el-button @click.native="confirmtakegood=false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 确认收货 end -->
  
      <!-- 通知出仓 -->
      <!-- 第一步 -->
      <el-dialog title="通知出仓单" v-model="sendgoodStep1Show" custom-class="common-pop" size="tiny" v-if="sendgoodStep1Show" :close-on-click-modal="false" :close="cancelOut">
        <div class="take-good clearfix send-good">
          <div class="t-item">
            <div class="t-item-l">订单号</div>
            <div class="t-item-r">{{sendgoodData.serviceNumber}}</div>
          </div>
          <div class="t-item">
            <div class="t-item-l">采购商</div>
            <div class="t-item-r">{{sendgoodData.buyerCompany}}</div>
          </div>
          <div class="t-item">
            <div class="t-item-l" style="position: absolute; top:0;">
              <b style="color: red;">*</b>发货内容</div>
            <div class="t-item-r" style="margin-left: 100px;">
              <div class="r-line">
                <input type='checkbox' class='input-checkbox' id="chk" :checked="checked" @click='checkedAll'>
                <label for="chk">全选</label>
              </div>
              <div class="r-line" v-for="(checkb, index) in checkboxDataSort" :key="checkb.number">
                <input type="checkbox" name='checkboxinput' v-model="clothLoneIdList" :value='checkb.id' :id='index'>
                <label :for="index">
                  {{checkb.productNumber}}|{{checkb.color}}|{{checkb.quantity}}{{checkb.quantityUnit}}|{{checkb.number}}
                  <template v-if="checkb.rank">({{checkb.rank}}/{{checkb.average}}分)</template>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click.native="cancelOut">取消</el-button>
          <el-button type="primary" :disabled="clothLoneIdList.length == 0" @click.native="nextStep(sendgoodData.buyerId)">下一步</el-button>
        </div>
      </el-dialog>
      <!-- 第二步 -->
      <el-dialog title="通知出仓单" v-model="sendgoodStep2Show" custom-class="common-pop" size="tiny" v-if="sendgoodStep2Show" :close-on-click-modal="false" @close="cancelOut2">
        <div class="take-good clearfix send-good">
          <div class="t-item">
            <div class="t-item-l">配送方式</div>
            <div class="t-item-r">{{sendgoodData.sendType == 1 ? '采购商自提' : '搜芽配送'}}</div>
          </div>
          <template v-if="sendgoodData.sendType == 0">
            <div>
              <template v-if=" defaultAddress == null||defaultAddress.id == null">
                <div class="t-item">
                  <div class="t-item-l">
                    <b style="color: red;">*</b>收货人姓名</div>
                  <div class="t-item-r">
                    <el-input placeholder="请输入姓名" size="small" style="width: 100%;" v-model="initSendGoodData.contactName"></el-input>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-l">
                    <b style="color: red;">*</b>收货人电话</div>
                  <div class="t-item-r">
                    <el-input placeholder="请输入手机号" size="small" style="width: 100%;" v-model="initSendGoodData.contactTel"></el-input>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-l">
                    <b style="color: red;">*</b>省市区</div>
                  <div class="t-item-r">
                    <y-address :province="initSendGoodData.province" :city="initSendGoodData.city" :areas="initSendGoodData.area" @change="handlerChange" />
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-l">
                    <b style="color: red;">*</b>收货地址</div>
                  <div class="t-item-r">
                    <el-input placeholder="收货地址" size="small" style="width: 100%;" v-model="initSendGoodData.addr"></el-input>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="t-item">
                  <div class="t-item-l">收货人信息</div>
                  <div class="t-item-r">
                    <font>{{initSendGoodData.contactName}}</font>
                    <font>{{initSendGoodData.province}}{{initSendGoodData.city}}{{initSendGoodData.area}}{{initSendGoodData.addr}}</font>
                    <font>{{initSendGoodData.contactTel}}</font>
                  </div>
                  <el-button type="text" style="margin-left: 100px;" @click.native="changeDefaultAddr(sendgoodData.buyerId)">更改收货地址 ></el-button>
                </div>
              </template>
            </div>
            <div class="line"></div>
            <div class="t-item">
              <div class="t-item-l">物流公司</div>
              <div class="t-item-r">
                <el-input placeholder="请输入物流公司" size="small" style="width: 100%;" v-model="initSendGoodData.sendCompany"></el-input>
              </div>
            </div>
            <div class="t-item">
              <div class="t-item-l">联系电话</div>
              <div class="t-item-r">
                <el-input placeholder="请输入联系电话" size="small" style="width: 100%;" v-model="initSendGoodData.sendTel"></el-input>
              </div>
            </div>
          </template>
          <div class="t-item">
            <div class="t-item-l">出仓备注</div>
            <div class="t-item-r">
              <textarea rows="3" style="width: 248px; height: 50px; resize: none; border: 1px solid #c0ccda;border-radius: 4px; padding: 5px;" v-model.trim="initSendGoodData.remark"></textarea>
              <span>
                <b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/400字</span>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="cancelOut2">取消出仓</el-button>
          <el-button type="primary" :disabled="isCHeckoutOut" @click.native="notifyOut">确认出仓</el-button>
        </div>
      </el-dialog>
      <!-- 编辑收货地址列表 -->
      <el-dialog title="收货人管理" v-model="editDefaultAddress" custom-class="common-pop" size="tiny" v-if="editDefaultAddress" :close-on-click-modal="false" @close="cancelOut3">
        <div class="take-good clearfix send-good">
          <table class="addr-list">
            <tr v-for="(item, index) in addressList">
              <td>
                <label>
                  <input type="radio" name="isChecked" :checked="item.id == initSendGoodData.id ? true : false" @click="choosedAddr(item)"></input>
                </label>
                <div class="addr-info">
                  <span>{{item.name}}
                    <font v-if="item.isDefault == 1">默认地址</font>
                  </span>
                  <span>{{item.province}}{{item.city}}{{item.area}}{{item.addr}}</span>
                  <span>{{item.tel}}</span>
                </div>
              </td>
              <td>
                <el-button type="text" @click.native="editAddr(item)">编辑</el-button>
                <el-button type="text" @click.native="deleteAddr(item.id)">删除</el-button>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <el-button type="text" @click.native="addAddr()" v-if="addressList.length < 10">新增收货人地址 +</el-button>
        </div>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click.native="confirmAddress">选好了</el-button>
        </div>
      </el-dialog>
      <!-- dialog4.0 title:新增/修改收货地址 -内容：收货地址的编辑或新增 -功能：新增或修改收货地址 -->
      <el-dialog title="新增/修改收货人" size="tiny" v-model="editSingleAddrShow">
        <div style="margin-left:50px;">
          <el-form label-width="80px" label-position="right" :rules="infoRules" :model="addressInfo" ref="addressInfo">
            <el-form-item label="姓名" prop="name">
              <el-input style="width:220px" v-model="addressInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input style="width:220px" v-model="addressInfo.tel" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="省市区" required>
              <y-address :province="addressInfo.province " :city="addressInfo.city " :area="addressInfo.area" @change="handlerChange2" />
            </el-form-item>
            <el-form-item label="收货地址" prop="addr">
              <el-input v-model="addressInfo.addr" style="width:220px"></el-input>
            </el-form-item>
             <el-form-item label="设为默认地址" prop="addr">
             <input type="checkbox" v-model="isDefault" :checked="checked" @change="changeDefault" />
            </el-form-item>
          </el-form>
        </div>
        <footer style="padding-left:25%;margin-top:20px;">
        <el-button type="primary" :disabled="isCHeckoutOut2" @click.native="singleAddrAdd('addressInfo')" v-if="addStatus">保存</el-button>
         <el-button type="primary" :disabled="isCHeckoutOut2" @click.native="singleAddrSave('addressInfo')" v-else>保存</el-button>
         <el-button @click.native="clearOut">取消</el-button>
        </footer>
      </el-dialog>
      <!-- 编辑单条收货地址 -->
      <!-- <el-dialog title="新增/修改收货人" v-model="editSingleAddrShow" custom-class="common-pop" size="tiny" v-if="editSingleAddrShow" :close-on-click-modal="false" @close="clearOut">
        <div class="take-good clearfix send-good">
          <div class="t-item">
            <div class="t-item-l">
              <b style="color: red;">*</b>收货人姓名</div>
            <div class="t-item-r">
              <el-input placeholder="请输入姓名" size="small" style="width: 100%;" v-model="addressInfo.name"></el-input>
            </div>
          </div>
          <div class="t-item">
            <div class="t-item-l">
              <b style="color: red;">*</b>收货人电话</div>
            <div class="t-item-r">
              <el-input placeholder="请输入手机号" size="small" style="width: 100%;" v-model="addressInfo.tel"></el-input>
            </div>
          </div>
          <div class="t-item">
            <div class="t-item-l">
              <b style="color: red;">*</b>省市区</div>
            <div class="t-item-r">
              <y-address :province="addressInfo.province" :city="addressInfo.city" :area="addressInfo.area" @change="handlerChange2" />
            </div>
          </div>
          <div class="t-item">
            <div class="t-item-l">
              <b style="color: red;">*</b>收货地址</div>
            <div class="t-item-r">
              <el-input placeholder="收货地址" size="small" style="width: 100%;" v-model="addressInfo.addr"></el-input>
            </div>
          </div>
          <div class="t-item" v-if="addressInfo.isDefault != 1">
            <div class="t-item-l">设为默认地址</div>
            <div class="t-item-r">
              <input type="checkbox" v-model="isDefault" :checked="checked" @change="changeDefault" />
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" align="center">
          <template v-if="addStatus">
            <el-button type="primary" :disabled="isCHeckoutOut2" @click.native="singleAddrAdd">保存</el-button>
          </template>
          <template v-else>
            <el-button type="primary" :disabled="isCHeckoutOut2" @click.native="singleAddrSave">保存</el-button>
          </template>
          <el-button @click.native="clearOut">取消</el-button>
        </div>
      </el-dialog> -->
      <!-- 通知出仓 end -->
    </div>
  </template>
  
  <script>
  import Fliter from 'components/filter'
  import Pagination from 'components/pagination'
  import Api from 'api/reposity'
  import allApi from 'api/allApi'
  import YAddress from 'components/y-address/index'
  import { mapActions, mapState } from 'vuex'
  import {
    // request,
    // extend,
    // setCache,
    newRequest,
    formatTimeString
  } from 'utils/tool'
  export default {
    components: {
      Fliter,
      Pagination,
      'y-address': YAddress
    },
    data() {
       var checkTel = (rule, value, callback) => {
        if (!value) {
          callback(new Error('手机号不能为空'));
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
      return {
        currentTime: 0,
        addAddressSuccess: false, // 新增地址成功
        confirmtakegood: false, // 确认收货
        confirmtakegoodData: {}, // 确认收货
        sendgoodData: {}, // 通知出仓单
        sendgoodStep1Show: false,
        sendgoodStep2Show: false,
        editDefaultAddress: false,
        editSingleAddrShow: false,
        count: 0,
        initSendGoodData: {
          sendCompany: '',
          sendTel: '',
          contactName: '',
          contactTel: '',
          remark: '',
          province: '',
          city: '',
          area: '',
          addr: '',
          id: ''
        },
        pagation: {
          pageNumber: 1,
          pageSize: 20,
          totalCount: 1,
        },
        num1: '',
        num2: '',
        num3: '',
        tabIndex: '1',
        filters: {
          pageSize: 20,
          pageNumber: 1
        },
        height: 600,
        result: [],
        // 这一块是通知出仓单全选
        checkboxData: [],
        clothLoneIdList: [],
        defaultAddress: {},
        addressList: [],
        addressInfo: {
          name: '',
          tel: '',
          province: '',
          city: '',
          area: '',
          addr: ''
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
          tel: [
            { validator: checkTel, trigger: 'blur' }
          ],
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
        addStatus: false,
        checked: false,
        isDefault: false,
        _time: 0
      }
    },
    filters: {
      convertDate(val) {
        return Number(val) != 0 ? formatTimeString(val) : '--'
      }
    },
    mounted() {
      this.countH()
      window.addEventListener('resize', this.countH)
      this.initCondition()
      this.reqList()
    },
    updated() {
      // console.log('sss', this.tabIndex)
    },
    methods: {
      checkTel(currentVal) {
        const val = currentVal.target.value
        if (/\d/i.test(val)) {
          this.initSendGoodData.sendTel = val
        } else {
          this.initSendGoodData.sendTel = ''
        }
      },
      handlerChange: function (val) {
        this.initSendGoodData.province = val.province
        this.initSendGoodData.city = val.city
        this.initSendGoodData.area = val.area
        this.addressInfo.province = val.province
        this.addressInfo.city = val.city
        this.addressInfo.area = val.area
      },
      handlerChange2: function (val) {
        this.addressInfo.province = val.province
        this.addressInfo.city = val.city
        this.addressInfo.area = val.area
      },
      isSelectable(row) {
        if (row.clothLoneListForSelect.length > 0) {
          return true
        } else {
          return false
        }
      },
      initCondition() {
        this.tabIndex = this.condition.tabIndex
      },
      ...mapActions([
        'updateVuexData'
      ]),
      handleClick(val) {
        this.tabIndex = String(val.name)
        this.updateVuexData({ module: 'deliverManage', tabIndex: this.tabIndex })
        this.reqList()
      },
      search(params) {
        this.filters.pageNumber = '1'
        this.filters = Object.assign(this.filters, params)
        this.reqList()
      },
      reqList(req) {
        this.$store.dispatch('changeload', false)
        const reqs = {}
        for (const key of Object.keys(this.filters)) {
          if (this.filters[key]) {
            reqs[key] = this.filters[key]
          }
        }
        reqs.tag = this.tabIndex // 配合后端修改状态参数要求按照需求文档修改
        newRequest({
          url: Api.InReposity_listForSend,
          contentType: 'application/json',
          data: reqs
        }, (res) => {
          this.$store.dispatch('changeload', false)
          if (res.success == 1) {
            if (res.page) {
              this.convertData(res.page)
            } else {
              this.result = []
              this.num1 = ''
              this.num2 = ''
              this.num3 = ''
              const currentNumber = 'num' + this.tabIndex
              this[currentNumber] = '0'
            }
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
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
        page.result.map((item) => {
          // 是否超过两个月 不给申请退换货
          let currentTime = new Date().getTime()
          this.currentTime = currentTime
          const twoMonths = (currentTime - item.confirmReceiveTime) / (1000 * 60 * 60 * 24)
          if (Math.floor(twoMonths) > 60) {
            item.isTwoMonth = false
          } else {
            item.isTwoMonth = true
          }
          item.quantityUnit = item.clothLoneList.length > 0 ? item.clothLoneList[0].quantityUnit : ''
          let totalpihaoNumber = 0
          item.clothLoneList.map((val) => {
            totalpihaoNumber += Number(val.quantity)
          })
          item.totalpihaoNumber = totalpihaoNumber
        })
        this.result = page.result
      },
      // 清空通知出仓的字段内容
      clearoutData() {
        this.sendgoodStep1Show = false
        for (const key of Object.keys(this.initSendGoodData)) {
          this.initSendGoodData[key] = ''
        }
        this.clothLoneIdList = []
        this.checked = false
        this.addressList = []
      },
      cancelOut() {
        this.clearoutData()
      },
      cancelOut2() {
        this.sendgoodStep2Show = false
        for (const key of Object.keys(this.initSendGoodData)) {
          this.initSendGoodData[key] = ''
        }
        this.clothLoneIdList = []
        this.checked = false
        this.addressList = []
      },
      cancelOut3() {
        this.editDefaultAddress = false
        this.sendgoodStep2Show = true
      },
      clearOut() {
        this.addressInfo.name = ''
        this.addressInfo.tel = ''
        this.addressInfo.province = ''
        this.addressInfo.city = ''
        this.addressInfo.area = ''
        this.addressInfo.addr = ''
        this.editSingleAddrShow = false
        this.editDefaultAddress = true
      },
      // 确认收货请求
      confirmTakeit(row) {
        this.$store.dispatch('changeload', true)
        const obj = { outReposityNumber: row.reposityNumber, _time: this._time }
        newRequest({
          url: '/redwood/reposity/OutReposity/confirmReceive',
          data: obj,
          contentType: 'application/json',
          method: 'post'
        }, (res) => {
          this.$store.dispatch('changeload', false)
          this.confirmtakegood = false
          if (res.success == 1) {
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
      // 确认收货数据配置
      confirmGood(row) {
        this.confirmtakegood = true
        this.confirmtakegoodData = row
        this._time = (new Date()).getTime()
      },
      // 通知出仓
      notifyOut() {
        if (this.sendgoodData.sendType != 1) {
          if (this.defaultAddress == null) {
            this.singleAddrAdd()
            // console.log(this.addAddressSuccess)
          } else {
            this.addAddressSuccess = true
          }
        } else {
          this.addAddressSuccess = true
        }
        if (this.addAddressSuccess) {
          this.$store.dispatch('changeload', true)
          const obj = {
            clothLoneIdList: this.clothLoneIdList,
            remark: this.initSendGoodData.remark
          }
          // 搜芽配送
          if (this.initSendGoodData.sendType == 0) {
            obj.contactName = this.initSendGoodData.contactName
            obj.contactTel = this.initSendGoodData.contactTel
            obj.province = this.initSendGoodData.province
            obj.city = this.initSendGoodData.city
            obj.area = this.initSendGoodData.area
            obj.addr = this.initSendGoodData.addr
            obj.sendCompany = this.initSendGoodData.sendCompany
            obj.sendTel = this.initSendGoodData.sendTel
          }
          obj._time = this._time
          newRequest({
            url: Api.OutReposity_notifyOutReposity,
            data: obj,
            contentType: 'application/json',
            method: 'post'
          }, (res) => {
            this.$store.dispatch('changeload', false)
            if (res.success == 1) {
              this.addAddressSuccess = false
              const self = this
              // this.reqList()
              this.$message({
                type: 'success',
                message: res.msg,
                duration: 1000,
                onClose() {
                  self.clearoutData()
                  self.$router.push({ name: 'payView' })
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
        } else {
          this.$message.error('新增地址失败，无法操作通知出仓')
        }
      },
      countH() {
        this.height = String(document.documentElement.clientHeight - 200)
      },
      takegood(obj) {
        this.tkgoodShow = true
        this.takegoodData = obj
      },
      sendgood(obj) {
        this.count++
        this.sendgoodStep1Show = true
        this.sendgoodData = obj
        this.checkboxData = obj.clothLoneList
        this.initSendGoodData.sendType = obj.sendType
        this.initSendGoodData.sendCompany = obj.sendCompany
        this.initSendGoodData.sendTel = obj.sendTel
        this.initSendGoodData.remark = (obj.remark ? obj.remark : '')
        this._time = (new Date()).getTime()
      },
      nextStep(buyerId) {
        this.sendgoodStep1Show = false
        this.sendgoodStep2Show = true
        this.getDefaultAddress(buyerId)
      },
      getDefaultAddress(buyerId) {
        newRequest({
          url: allApi.Address.getDefault,
          contentType: 'application/json',
          data: {
            userId: buyerId
          }
        }, (res) => {
          if (res) {
            // console.log(res)
            this.defaultAddress = res.obj
            this.initSendGoodData.contactName = res.obj.name
            this.initSendGoodData.contactTel = res.obj.tel
            this.initSendGoodData.province = res.obj.province
            this.initSendGoodData.city = res.obj.city
            this.initSendGoodData.area = res.obj.area
            this.initSendGoodData.addr = res.obj.addr
            this.initSendGoodData.id = res.obj.id
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      },
      changeDefaultAddr(buyerId) {
        this.sendgoodStep2Show = false
        this.editDefaultAddress = true
        this.getAddrList(buyerId)
      },
      getAddrList(buyerId) {
        newRequest({
          url: allApi.Address.list,
          contentType: 'application/json',
          data: {
            userId: buyerId
          }
        }, (res) => {
          this.confirmtakegood = false
          if (res.success == 1) {
            this.addressList = res.result
            if (this.addressList.length == 0) {
              this.getDefaultAddress(this.sendgoodData.buyerId)
            }
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      },
      deleteAddr(id) {
        newRequest({
          url: allApi.Address.deleteAddr,
          contentType: 'application/json',
          data: {
            id: id
          }
        }, (res) => {
          if (res.success == 1) {
            this.getAddrList(this.sendgoodData.buyerId)
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      },
      singleAddrSave(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
        this.addressInfo.editTime = new Date().getTime()
        this.addressInfo.isDefault = this.isDefault ? 1 : 0
        newRequest({
          url: allApi.Address.editAddr,
          contentType: 'application/json',
          data: Object.assign({}, this.addressInfo, { haveSendCompany: this.addressInfo ? 1 : 0 })
        }, (res) => {
          if (res.success == 1) {
            this.getAddrList(this.sendgoodData.buyerId)
            let defaultId = this.initSendGoodData.id
            if (this.addressInfo.id == defaultId) {
              this.initSendGoodData.contactName = this.addressInfo.name
              this.initSendGoodData.contactTel = this.addressInfo.tel
              this.initSendGoodData.province = this.addressInfo.province
              this.initSendGoodData.city = this.addressInfo.city
              this.initSendGoodData.area = this.addressInfo.area
              this.initSendGoodData.addr = this.addressInfo.addr
            }
            this.editSingleAddrShow = false
            this.editDefaultAddress = true
            this.addressInfo = {
              name: '',
              tel: '',
              province: '',
              city: '',
              area: '',
              addr: '',
            }
            this.isDefault = false
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
           }
         })
      },
      singleAddrAdd(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
        this.addressInfo.creatTime = new Date().getTime()
        this.addressInfo.userId = this.sendgoodData.buyerId
        this.addressInfo.isDefault = this.isDefault ? 1 : 0
        // this.addressInfo.name = this.initSendGoodData.contactName
        // this.addressInfo.tel = this.initSendGoodData.contactTel
        // this.addressInfo.addr = this.initSendGoodData.addr
        this.addAddressSuccess = true
        console.log(this.addressInfo)
        newRequest({
          url: allApi.Address.addAddr,
          contentType: 'application/json',
          data: Object.assign({}, this.addressInfo, { haveSendCompany: this.addressInfo ? 1 : 0 })
        }, (res) => {
          if (res.success == 1) {
            this.getAddrList(this.sendgoodData.buyerId)
            this.editSingleAddrShow = false
            // this.editDefaultAddress = true
            this.addressInfo = {
              creatTime: '',
              userId: '',
              isDefault: '',
              name: '',
              tel: '',
              addr: ''
            }
            this.isDefault = false
          } else {
            this.addAddressSuccess = false
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
          }
         })
      },
      choosedAddr(item) {
        this.initSendGoodData.contactName = item.name
        this.initSendGoodData.contactTel = item.tel
        this.initSendGoodData.province = item.province
        this.initSendGoodData.city = item.city
        this.initSendGoodData.area = item.area
        this.initSendGoodData.addr = item.addr
        this.initSendGoodData.id = item.id
      },
      confirmAddress() {
        this.editDefaultAddress = false
        this.sendgoodStep2Show = true
      },
      editAddr(item) {
        this.editDefaultAddress = false
        this.editSingleAddrShow = true
        this.addressInfo = item
        this.addStatus = false
      },
      addAddr() {
        this.editDefaultAddress = false
        this.editSingleAddrShow = true
        this.addStatus = true
      },
      changeDefault() {
        if (this.checked) {
          this.isDefault = true
        } else {
          this.isDefault = false
        }
      },
      checkedAll() {
        var _this = this
        if (this.checked) {
          _this.clothLoneIdList = []
        } else {
          _this.clothLoneIdList = []
          _this.checkboxData.forEach(function (item) {
            _this.clothLoneIdList.push(item.id)
          })
        }
      }
    },
    watch: {
      'initSendGoodData.remark'(val) {
        if (val.length >= 400) {
          this.initSendGoodData.remark = val.slice(0, 400)
        }
      },
      'clothLoneIdList': {
        handler: function (val, oldVal) {
          if (this.clothLoneIdList.length === this.checkboxData.length) {
            this.checked = true
          } else {
            this.checked = false
          }
          this.count++
        },
        deep: true
      },
      'initSendGoodData': {
        handler(val, oldVal) {
          this.count++
        },
        deep: true
      }
    },
    computed: {
      ...mapState({
        condition: state => {
          // console.log(state.deliverManage.tabIndex)
          return {
            tabIndex: state.deliverManage.tabIndex
          }
        }
      }),
      leftnumber() {
        if (this.initSendGoodData.remark) {
          return 400 - Number(this.initSendGoodData.remark.length)
        } else {
          return 400
        }
      },
      checkboxDataSort: function () {
        let _ = require('lodash')
        return _.sortBy(this.checkboxData, 'number')
      },
      // 校验通知出仓字段
      isCHeckoutOut() {
        this.count++
        let flag = false
        if (this.clothLoneIdList.length == 0) {
          // console.log(this.clothLoneIdList)
          flag = true
        }
        if (this.initSendGoodData.sendType == 0) {
          // console.log(this.initSendGoodData)
          if (!this.initSendGoodData.contactName || !this.initSendGoodData.contactTel || !this.initSendGoodData.province || !this.initSendGoodData.city || this.initSendGoodData.city == '请选择' || !this.initSendGoodData.addr) {
            flag = true
          }
        }
        return flag
      },
      isCHeckoutOut2() {
        let bool = false
        // console.log(this.addressInfo)
        if (!this.addressInfo.name || !this.addressInfo.tel || !this.addressInfo.province || !this.addressInfo.city || !this.addressInfo.addr) {
          bool = true
        }
        return bool
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.countH)
    }
  }
  </script>
  <style lang="scss">
  .deliver-list {
    .y_table {
      clear: both;
    }
    .y_table_wrap {
      td.is-center {
        text-align: center;
        border-right: 1px solid #ddd;
      }
      td {
        text-overflow: initial;
      }
      th.is-center {
        text-align: center;
      }
      .el-table td .cell {
        padding: 5px 0 0;
        line-height: 1.5;
        word-break: break-word;
      }
    }
    .bottom {
      text-align: right;
      background: #fff;
      padding: 10px;
    }
    .operate-btn {
      text-align: left;
      padding-left: 10px;
      .o-btn {
        min-width: 80px;
        margin-right: 5px;
        margin-bottom: 5px;
      }
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
      vertical-align: top;
    }
    .t-item-r {
      display: inline-block;
      min-width: 320px;
      .r-line {
        padding-bottom: 5px;
      }
      font {
        display: block;
        padding-bottom: 5px;
      }
    }
  }
  
  .send-good {
    max-height: 450px;
    overflow-y: auto;
    .addr-list {
      border-top: 1px solid #ccc;
      width: 100%;
      tr td {
        border-bottom: 1px dashed #ccc;
        border-right: 1px dashed #ccc;
        padding: 5px 0;
        font-size: 14px;
        label {
          width: 7%;
          display: inline-block;
          vertical-align: top;
        }
        .addr-info {
          display: inline-block;
          width: 88%;
          span {
            display: block;
            line-height: 20px;
            font {
              float: right;
            }
          }
        }
        .el-button span {
          padding-left: 5px;
        }
      }
    }
  }
  
  .line {
    height: 15px;
    border-top: 1px dashed #ccc;
  }
  </style>
  