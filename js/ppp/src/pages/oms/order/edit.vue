<template>
  <div id="order" class="h100">
    <div class="main-container">
      <c-menu></c-menu>
      <div class="main-content">
        <div class="crumbs-warp">
          <div class="oms-back link" @click="toBack">
            < 返回</div>
              订单中心
              <span>></span> 编辑订单
              <span>></span> 订单号：{{info.number}}
          </div>
          <div class="info-warp">
            <ul>
              <li>
                <div class="detail-title">
                  <span>客户信息</span>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>客户名称：</td>
                      <td>{{info.customerCompany}}</td>
                    </tr>
                    <tr>
                      <td>联系人：</td>
                      <td>{{info.customerName}}</td>
                    </tr>
                    <tr>
                      <td>电话：</td>
                      <td>{{info.customerTel}}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <div class="detail-title">
                  <span>收货人</span>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>姓名：</td>
                      <td>{{info.addressName}}</td>
                    </tr>
                    <tr>
                      <td>电话：</td>
                      <td>{{info.addressTel}}</td>
                    </tr>
                    <tr>
                      <td>地址：</td>
                      <td>{{info.addressProvince}}{{info.addressCity}}{{info.addressArea}}{{info.addressAddr}}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
          <div class="detail-warp">
            <div class="detail-title">
              <span>商品信息</span>
            </div>
            <div class="product-warp">
              <span>货号： <input type="text" class="form-input" maxlength="50" v-model="info.productNumber"></span>
            </div>
            <div class="table">
              <table>
                <colgroup>
                  <col width="3%">
                  <col width="10%">
                  <col width="10%">
                  <col width="10%">
                  <col width="18%">
                  <col width="10%">
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>色号</th>
                    <th>数量</th>
                    <th>单位</th>
                    <th>单价</th>
                    <th>合计(元)</th>
                    <th>细码数</th>
                  </tr>
                </thead>
                <tbody v-if="info.colors&&info.colors.length">
                  <tr v-for="(item,index) in info.colors" :key='item.index'>
                    <td class="ta-c">
                      <span class="icon-delete" @click="deleteItem(index)"></span>
                    </td>
                    <td>
                      <input type="text" style="width:80px;" class="form-input" v-model="item.color" maxlength="50">
                    </td>
                    <td>
                      <input type="number" style="width:80px;" class="form-input" @keyup='colMoney(item)' v-model="item.quantity">
                    </td>
                    <td>
                      <el-select v-model="info.unit" placeholder="请选择">
                        <el-option value="米" label="米"></el-option>
                        <el-option value="码" label="码"></el-option>
                        <el-option value="公斤" label="公斤"></el-option>
                        <el-option value="千克" label="千克"></el-option>
                      </el-select>
                    </td>
                    <td>
                      <input type="number" style="width:80px;" class="form-input mr5" @keyup='colMoney(item)' v-model="item.price">元 / {{info.unit}}</td>
                    <td>
                      <input type="number" style="width:80px;" class="form-input" @keyup='calTotal()' v-model="item.money">
                    </td>
                    <td>
                      <div class="item" v-for='(sizeItem,sizeIndex) in item.ximashus' :key='sizeItem.index'>
                        <input type="number" v-model="item.ximashus[sizeIndex]">
                        <span class="el-icon-circle-close del" @click="delSize(index,sizeIndex)"></span>
                      </div>
                      <span class="icon-addSize" @click="addSize(index)">+</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="btn-groups mt20">
              <button class="btn btn-default" @click="addColor()">新增色号</button>
            </div>
            <div class="total-warp">
              总计：
              <span> <input type="text" class="form-input w200 mr5" v-model="info.totalMoney"></span>元
            </div>
          </div>
          <div class="remark-warp">
            <div class="detail-title">
              <span>备注</span>
            </div>
            <div class="remark-detail">
              {{info.remark}}
            </div>
            <div class="btn-groups mt20">
              <button class="btn btn-default" @click="saveInfo()">保存</button>
              <button class="btn btn-submit" @click="showDlg()">提交</button>
            </div>
          </div>
        </div>
        <el-dialog title="温馨提示" :visible.sync="dialogVisible" size="tiny">
          <span>确定删除该色号?</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ensureDelete()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="submitDialogVisible" size="tiny">
          <span>订单总计<span class="red">{{info.totalMoney | formatNumber}}</span>元，请确定后提交！</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="submitDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ensuerSubmitOrder">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>
<script>
import omsServices from '@/utils/omsServices';
import {
  Message
} from 'element-ui';
import menu from 'components/oms-menu';
export default {
  name: 'order',
  data() {
    return {
      dialogVisible: false,
      submitDialogVisible: false,
      selectIndex: '',
      'id': this.$route.params.id,
      info: {}
    }
  },
  components: {
    'c-menu': menu
  },
  methods: {
    toBack() {
      this.$confirm('正在编辑中, 是否返回?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'dlg-cancel',
        confirmButtonClass: 'dlg-submit',
        type: 'warning'
      }).then(() => {
        this.$router.replace({
          name: 'orderMgr'
        })
      }).catch(() => {});
    },
    showDlg() {
      if (!this.isRequired()) return;
      this.submitDialogVisible = true;
    },
    ensuerSubmitOrder() {
      this.submitInfo();
    },
    colMoney(item) {
      if (parseFloat(item.quantity) < 0 || parseFloat(item.quantity) > 100000) {
        Message({
          type: 'error',
          message: '商品数量范围 0-100000',
          duration: 3000
        });
        return;
      }
      if (parseFloat(item.price) < 0 || parseFloat(item.price) > 100000) {
        Message({
          type: 'error',
          message: '商品单价范围 0-10000',
          duration: 3000
        });
        return;
      }
      item.money = parseFloat(item.price || 0) * parseFloat(item.quantity || 0);
      this.calTotal();
    },
    calTotal() {
      let colorsArray = this.info.colors;
      let sum = 0;
      colorsArray.forEach(item => {
        if (parseFloat(item.money) < 0) {
          Message({
            type: 'error',
            message: '商品小计不能为0',
            duration: 3000
          });
        }
        sum += parseFloat(item.money || 0);
      })
      this.info.totalMoney = Number(sum).toFixed(2) || '0.00';
    },
    deleteItem(index) {
      this.selectIndex = index;
      this.dialogVisible = true;
    },
    ensureDelete() {
      this.info.colors.splice(this.selectIndex, 1);
      this.dialogVisible = false;
      this.calTotal();
    },
    isRequired() {
      if (!this.info.productNumber) {
        Message({
          type: 'error',
          message: '请先填写订单货号',
          duration: 1000
        })
        return false;
      }
      if (!this.info.totalMoney) {
        Message({
          type: 'error',
          message: '请先填写商品总计',
          duration: 1000
        })
        return false;
      }
      if (parseFloat(this.info.totalMoney) > 1000000 || parseFloat(this.info.totalMoney) < 0) {
        Message({
          type: 'error',
          message: '商品总计范围 0-1000000',
          duration: 1000
        })
        return false;
      }
      let colorsArray = this.info.colors;
      if (!colorsArray.length) {
        Message({
          type: 'error',
          message: '请先完善色号信息',
          duration: 1000
        })
        return false;
      }
      for (let i = 0, len = colorsArray.length; i < len; i++) {
        let item = colorsArray[i];
        if (!item.color || !item.price || !item.quantity || !item.money) {
          Message({
            type: 'error',
            message: '请先完善色号信息',
            duration: 1000
          })
          return false;
        }
        if (parseFloat(item.quantity) < 0 || parseFloat(item.quantity) > 100000) {
          Message({
            type: 'error',
            message: '商品数量范围 0-100000',
            duration: 3000
          });
          return false;
        }
        if (parseFloat(item.price) < 0 || parseFloat(item.price) > 100000) {
          Message({
            type: 'error',
            message: '商品单价范围 0-10000',
            duration: 3000
          });
          return false;
        }
        if (parseFloat(item.money) < 0 || parseFloat(item.money) > 1000000) {
          Message({
            type: 'error',
            message: '商品色号小计范围 0-1000000',
            duration: 3000
          });
          return false;
        }
      }
      return true;
    },
    saveInfo() {
      if (!this.isRequired()) return;
      omsServices.saveOrderInfo(this.id, this.info).then(response => {
        if (response.success !== '1') {
          Message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        } else {
          Message({
            message: '保存成功',
            type: 'success',
            duration: 2000
          });
          this.$router.replace({
            name: 'orderMgr'
          })
        }
      })
    },
    submitInfo() {
      if (!this.isRequired()) return;
      omsServices.submitOrderInfo(this.id, this.info).then(response => {
        if (response.success !== '1') {
          Message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        } else {
          Message({
            message: '提交成功',
            type: 'success',
            duration: 2000
          });
          this.$router.replace({
            name: 'orderMgr'
          })
        }
      })
    },
    addSize(index) {
      this.info.colors[index].ximashus.push('');
    },
    delSize(index, sizeIndex) {
      this.info.colors[index].ximashus.splice(sizeIndex, 1);
    },
    addColor() {
      if (this.info.colors.length >= 20) {
        Message({
          type: 'error',
          message: '色号最多只能有20个',
          duration: 1000
        })
        return;
      }
      class Color {
        constructor(color = '', price = '', quantity = '', money = '') {
          this.color = color;
          this.price = price;
          this.quantity = quantity;
          this.money = money;
          this.ximashus = [];
        }
      }
      this.info.colors.push(new Color());
    },
    getDetail() {
      omsServices.getOrderDetail(this.id).then(res => {
        if (res.success !== '1') {
          Message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        } else {
          console.log(res.obj)
          if (!res.obj) return;
          this.info = res.obj;
          // 模拟字段等下删掉
          this.info.colors.forEach(item => {
            if (item.money) {
              item.money = item.money == -1 ? parseFloat(item.price || 0) * parseFloat(item.quantity || 0) : item.money;
            } else {
              this.$set(item, 'money', '');
            }
          })
        }
      })
    }
  },
  mounted() {
    this.getDetail();
    let height = window.innerHeight;
    document.querySelector('.main-content').style.minHeight = height + 'px';
    window.onresize = function() {
      let height = window.innerHeight;
      document.querySelector('.main-content').style.minHeight = height + 'px';
    }
  }
}

</script>
<style lang="scss">
@import '../../../common/scss/oms-base.scss';
.icon-delete
{
    display: inline-block;

    width: 24px;
    height: 24px;

    cursor: pointer;

    background: url('images/delete@1x.png') 0 0 no-repeat;
}

.icon-addSize
{
    font-size: 19px;
    line-height: 16px;

    display: inline-block;
    float: left;

    width: 18px;
    height: 19px;
    margin-top: 8px;
    margin-left: 4px;

    cursor: pointer;
    text-align: center;
    vertical-align: top;

    color: #fff;
    border-radius: 3px;
    background-color: #2fb468;
}

.icon-order
{
    background: url('images/orders-active@1x.png') 0 0 no-repeat;
}

.icon-customer
{
    background: url('images/customer@1x.png') 0 0 no-repeat;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
{
    margin: 0;

    -webkit-appearance: none !important;
}

input[type='number']
{
    -moz-appearance: textfield;
}


</style>
