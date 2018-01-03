<template>
  <div>
    <div class="oms-content mt20">
      <div class="search-content">
        <div class="row">
          <div class="item">
            <el-select v-model="form.sellerId" placeholder="请选择供应商" @change="search">
              <el-option key="" value="" label="请选择供应商"></el-option>
              <el-option v-for="item in companyOptions" :key="item.sellerId" :label="item.company" :value="item.sellerId">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </div>
        <div class="row">
          <div class="item">
            <el-input placeholder="货号" v-model="form.number" @keydown.enter.native="search">
            </el-input>
          </div>
          <div class="item">
            <el-input placeholder="原供应商" v-model="form.shopCompany" @keydown.enter.native="search">
            </el-input>
          </div>
          <div class="item">
            <el-input placeholder="原货号" v-model="form.shopOriginalNumber" @keydown.enter.native="search">
            </el-input>
          </div>
        </div>
      </div>
      <div class="main-wrap" v-show="visiable">
        <div class="main-content product-container style-2">
          <el-tabs v-model="form.ownStatus" @tab-click="search" class="tabs-container-2">
            <el-tab-pane label="换卡头" name="0"></el-tab-pane>
            <el-tab-pane label="自营" name="1"></el-tab-pane>
          </el-tabs>
          <div class="product-table-wrap">
            <table class="table" v-if="noMsg&&tableList.length">
              <colgroup>
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
              </colgroup>
              <thead>
                <tr>
                  <th>图片</th>
                  <th>供应商</th>
                  <th>货号</th>
                  <th>原供应商</th>
                  <th>原货号</th>
                  <th>品类</th>
                  <th>成分</th>
                  <th>幅宽</th>
                  <th>克重</th>
                  <th>大货价格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableList">
                  <td style="width:10%">
                    <a :name="index" :href="imageDomain + item.colorUrls[0]" v-lightbox="item.colorUrls" v-if="item.colorUrls.length > 0" v-bind:data="`商品` + index">
                                    <img :src="imageDomain +  item.colorUrls[0] + '@60w_60h_90Q'" width="60" height="60" />
                                </a>
                    <img src="~assets/default_pic_detail.png" alt="" width="60px" height="60px" v-else>
                  </td>
                  <td>
                    <span v-if="item.company">{{item.company}}</span>
                    <span v-else>-</span>
                  </td>
                  <td>
                    <span v-if="item.number">{{item.number}}</span>
                    <span v-else>-</span>
                  </td>
                  <td>
                    <el-tooltip placement="left" v-if="item.shopCompany">
                      <div slot="content">档口电话：{{item.shopTel}}
                        <br/>档口地址: {{item.shopProvince}}{{item.shopCity}}{{item.shopArea}}{{item.shopAddr}}</div>
                      <p v-if="item.shopCompany">{{item.shopCompany}}</p>
                    </el-tooltip>
                    <span v-if="!item.shopCompany">-</span>
                  </td>
                  <td>
                    <p>
                      <p v-if="item.shopOriginalNumber">{{item.shopOriginalNumber}}</p>
                      <p v-else>-</p>
                    </p>
                  </td>
                  <td>
                    <span v-if="item.type">{{item.type}}</span>
                    <span v-else>-</span>
                  </td>
                  <td>
                    <span v-if="item.composition">{{item.composition}}</span>
                    <span v-else>-</span>
                  </td>
                  <td>
                    <span v-if="item.width">{{item.width}}{{item.widthUnit}}</span>
                    <span v-else>-</span>
                  </td>
                  <td>
                    <span v-if="item.weight">{{item.weight}}{{item.weightUnit}}</span>
                    <span v-else>-</span>
                  </td>
                  <td class="ta-l">
                    <p v-if="item.costPrice == '-1' || item.costPrice == '0'">成本价：-</p>
                    <p v-else>成本价：{{item.costPrice}}{{item.priceUnit}}</p>
                    <p v-if="Number(item.priceMin) > 0 && Number(item.priceMax) > 0">
                      <span>销售价：{{item.priceMin}}{{item.priceUnit}} ~ {{item.priceMax}}{{item.priceUnit}}</span>
                    </p>
                    <p v-if="Number(item.priceMin) <= 0 &&Number(item.priceMax) > 0">
                      <span>销售价：{{item.priceMax}}{{item.priceUnit}}</span>
                    </p>
                    <p v-if="Number(item.priceMin) <= 0 && Number(item.priceMax) <= 0">
                      <span>销售价：-</span>
                    </p>
                  </td>
                  <td>
                    <router-link :to="{path: '/index/guider/cloth/guiderClothDetail', query: {id: item.id, type: form.ownStatus} }">
                      <el-button class="table-btn">查看</el-button>
                    </router-link>
                    <router-link :to="{path: '/index/guider/cloth/guiderClothEdit', query: {id: item.id} }" v-if="form.ownStatus == 0">
                      <el-button class="table-btn">编辑</el-button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
              </tbody>
            </table>
            <div v-if="!tableList.length" class="empty"></div>
          </div>
          <!--  <div class="table-wrap null" v-if="noMsg">
          <span v-if="tableList.length == 0">没有搜索到该商品信息</span>
        </div> -->
        </div>
        <div class="page-wrap" v-if="tableList.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageNumber" :page-sizes="[10, 30, 50]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="form.totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--   <div class="main-header">
      <el-row>
        <el-col :span="3">
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">供应商</div>
            <el-select v-model="form.sellerId" placeholder="请选择" @change="search">
              <el-option key="" value="" label="请选择"></el-option>
              <el-option v-for="item in companyOptions" :key="item.sellerId" :label="item.company" :value="item.sellerId">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input placeholder="请输入内容" v-model="form.number" @keydown.enter.native="search">
            <template slot="prepend">货号</template>
          </el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input placeholder="请输入内容" v-model="form.shopCompany" @keydown.enter.native="search">
            <template slot="prepend">原供应商</template>
          </el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input placeholder="请输入内容" v-model="form.shopOriginalNumber" @keydown.enter.native="search">
            <template slot="prepend">原货号</template>
          </el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div> -->
    <lightbox></lightbox>
  </div>
</template>
<script>
import { newRequest } from 'utils/tool'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      tableHeight: '',
      soouya: '',
      imageDomain: 'http://www.soouya.com',
      title: '',
      shopCompany: '',
      number: '',
      numberSelect: '货号',
      type: '', // 品类
      status: '',
      companyOptions: [],
      batchOptions: [
        { val: 'putaway', name: '上架' },
        { val: 'remove', name: '下架' },
        { val: 'delete', name: '删除' },
      ],
      activeName: 'self',
      multipleSelection: [],
      tableList: [],
      visiable: false,
      noMsg: false,
      form: {
        sellerId: '',
        number: '',
        shopCompany: '',
        shopOriginalNumber: '',
        sellerSoouya: 1,
        pageNumber: 1,
        totalCount: null,
        pageSize: 10,
        ownStatus: '0',
      },
    }
  },
  watch: {},
  mounted() {
    if (sessionStorage.getItem('guiderList')) {
      let obj = JSON.parse(sessionStorage.getItem('guiderList'))
      if (obj.back) {
        delete obj.back
        this.form = obj
        this.getData()
        sessionStorage.setItem('guiderList', JSON.stringify(this.form))
      }
    }
    this.tableHeight = String(document.documentElement.clientHeight - 450);
    this.$store.dispatch('changeload', false)
    this.getCompany();
    let setHeight = () => {
      let node = document.querySelector('.product-table-wrap');
      node && (node.style.height = document.documentElement.clientHeight - 300 + 'px');
    };
    setHeight();
    window.addEventListener('resize', setHeight, false);
  },
  methods: {
    search() {
      this.form.pageNumber = 1
      this.getData()
    },
    reset() {
      this.form.sellerId = ''
      this.form.number = ''
      this.form.shopCompany = ''
      this.form.shopOriginalNumber = ''
      location.reload();
    },
    formatNumber(val) {
      if (val > 0) {
        return val.toFixed(2)
      } else {
        return val
      }
    },
    getCompany() {
      newRequest({
        url: '/soouya/ziying/shop',
        method: 'get',
        data: {
          sellerSoouya: 1
        }
      }).then((res) => {
        this.companyOptions = res.page.result
      })
    },
    getData() {
      if (!this.form.sellerId && !this.form.number && !this.form.shopCompany && !this.form.shopOriginalNumber) {
        this.$message.warning('请选择搜索条件')
        this.tableList = []
        this.noMsg = false
        return false
      }
      this.visiable = true
      this.$store.dispatch('changeload', true)
      this.noMsg = false
      let params = Object.assign({}, this.form)
      newRequest({
        url: '/soouya/ziying/cloth',
        method: 'get',
        data: params
      }).then((res) => {
        if (res.success == '1') {
          this.form.pageNumber = res.page.pageNumber;
          this.form.totalCount = res.page.totalCount;
          this.form.pageSize = res.page.pageSize;
          this.tableList = res.page.result;
          this.tableList.forEach((item) => {
            item.colorPrice = this.formatNumber(item.colorPrice)
            item.cutPrice = this.formatNumber(item.cutPrice)
            item.cutCostPrice = this.formatNumber(item.cutCostPrice)
            item.costPrice = this.formatNumber(item.costPrice)
            this.$set(item, 'showTitle', false);
            this.$set(item, 'priceMin', null);
            this.$set(item, 'priceMax', null);
            this.$set(item, 'check', false);
            var numberArr = [];
            var copyNumberArr = [];
            copyNumberArr = item.colorPrices.map((item) => {
              return item.price
            })
            copyNumberArr.push(item.price)
            numberArr = Array.from(new Set(copyNumberArr))
            numberArr.sort((a, b) => {
              return a - b
            })
            if (numberArr.length > 1) {
              item.priceMin = numberArr[0].toFixed(2)
              let value = numberArr[numberArr.length - 1]
              if (value == Infinity) {
                item.priceMax = value
              } else {
                item.priceMax = value.toFixed(2)
              }
            } else {
              if (numberArr.length == 1) {
                item.priceMin = -1
                item.priceMax = numberArr[0].toFixed(2)
              } else {
                item.priceMin = -1
                item.priceMax = -1
              }
            }
          })
          this.noMsg = true
          var str = JSON.stringify(this.form)
          sessionStorage.setItem('guiderList', str)
          this.$store.dispatch('changeload', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(val) {
      this.form.pageNumber = val
      this.getData()
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getData()
    }
  }
}

</script>
<style lang="scss" scoped>

</style>

