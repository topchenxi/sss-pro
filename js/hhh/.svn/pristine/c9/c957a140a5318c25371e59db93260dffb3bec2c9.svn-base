<template>
  <section class="inRepo-msg">
    <div class="select-msg">
      <span v-if="selectData.length" class="color59">{{`已选${selectData.length}匹/${Number(totalLength).toFixed(2)}${totalUnit}`}}</span>
      <template v-if="selectData.length&&checkCloth">
        <span @click="handlePiDownBtn" class="down-btn" style="cursor: pointer;">
        <span class="el-icon-download"></span>
        <span class="forgive-color">批量下载</span>
        </span>
      </template>
      <!-- <template v-else>
        <span class="down-btn" style="cursor: not-allowed;">
        <span class="el-icon-download"></span>
        <span class="color59">批量下载</span>
        </span>
      </template> -->
      <el-select @change="handleRucangSelectChange" v-model="rucangSelect" class="width200 ml25">
        <el-option label="全部入仓单" value=""></el-option>
        <el-option v-for="item in rucangData" :label="item.number" :value="item.id"></el-option>
      </el-select>
    </div>
    <ul class="allDetail-tab">
      <li>验布入仓</li>
    </ul>
    <div>
      <div class="table-head">
        <table border="1" style="margin-top:15px;">
          <colgroup>
            <col width="5%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="15%">
          </colgroup>
          <thead>
            <th>
              <el-checkbox @change.native="handleSelectAll(checkAll)" v-model="checkAll" :disabled="!checkCloth"></el-checkbox>
            </th>
            <th>色号/匹号</th>
            <th>入仓实数</th>
            <th>实际布长</th>
            <th>验布师/评分</th>
            <th>验布报告</th>
          </thead>
        </table>
      </div>
      <div class="table-body" v-if="checkData && checkData.length">
        <table border="1">
          <colgroup>
            <col width="5%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="15%">
          </colgroup>
          <tbody>
            <template v-for="(inItem, inIndex) in checkData">
              <tr>
                <td class="bg2f"></td>
                <td colspan="5" class="bg2f">
                  <span class="bold-text">入仓单号：{{inItem.number}}</span>
                  <span class="ml25">入仓时间：{{inItem.createTime | formatTime}}</span>
                  <span class="ml25" v-if="inItem.inType == 1">类型：采购入仓</span>
                  <span class="ml25" v-if="inItem.inType == 2">类型：换货入仓</span>
                  <span class="ml25" v-if="inItem.inType == 3">类型：售后入仓</span>
                  <span class="ml25" v-if="inItem.inType == 4">类型：售后换货入仓</span>
                  <span class="ml25">入仓地点：{{inItem.reposityName}}</span>
                </td>
              </tr>
              <tr v-for="(piItem,piIndex) in inItem.clothLones">
                <td style="text-align:center">
                  <el-checkbox v-model="piItem.check" @change.native="handleCheckChange" :disabled="!piItem.clothCheckReport || !piItem.clothCheckReport.id"></el-checkbox>
                </td>
                <td>
                  <span>{{piItem.color}}/{{piItem.number}}</span>
                </td>
                <td>
                  <span>{{piItem.quantity | formatNumber}}&nbsp;{{piItem.quantityUnit}}</span>
                </td>
                <td>
                  <span>{{piItem.clothCheckReport.buchang | formatNumber}}&nbsp;{{piItem.clothCheckReport.buchangUnit}}</span>
                </td>
                <td>
                  <span v-if="piItem.clothCheckReport && piItem.clothCheckReport.checkerId">{{piItem.clothCheckReport.checkerName}}/{{piItem.clothCheckReport.average}}</span>
                  <span class="color59" v-else>--/--</span>
                </td>
                <td>
                  <template v-if="checkCloth&&piItem.clothCheckReport.id">
                    <span @click="handleDownBtn(piItem.id)" class="m5 forgive-color down-btn">下载</span>
                    <a v-if="piItem.id" :href="`${host}?clothLoneId=${piItem.id}`" target="_blank" class="m5 forgive-color">查看</a>
                  </template>
                  <template v-else>
                    <span class="color59 m5">暂无</span>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="!checkData || checkData.length == 0">
        <table border="1">
          <colgroup>
            <col width="5%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="15%">
          </colgroup>
          <tbody>
            <tr>
              <td colspan="6" style="height:250px;text-align:center">
                <div class="empty">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
import {
  newRequest,
}
from 'utils/tool'
export default {
  name: 'checkCloth',
  props: ['id'],
  data() {
    return {
      checkData: [],
      host: '',
      checkCloth: 0,
      selectData: [],
      totalLength: 0,
      totalUnit: '',
      checkAll: false,
      rucangData: [],
      rucangSelect: '',
    }
  },
  watch: {
    id() {
      this.getData()
    }
  },
  mounted() {
    const host = window.location.host
    if (host.indexOf('local') > -1 || host.indexOf('test') > -1 || host.indexOf('hspc') > -1) {
      this.host = 'http://testmhongshan.soouya.com/reportDetail.html'
    } else {
      this.host = 'http://mhongshan.soouya.com/reportDetail.html'
    }
  },
  methods: {
    getData() {
      newRequest({
        url: `/redwood/repo/in`,
        data: {
          orderNumber: this.id,
          _function: 'detail'
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.rucangData = res.page.result
          this.rucangData.forEach(rucang => {
            this.checkCloth = rucang.bulk.checkCloth;
            this.checkData.push(rucang)
            rucang.clothLones.forEach(item => {
              this.$set(item, 'check', false)
            })
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSelectAll(val) {
      this.selectData = []
      this.totalLength = 0
      this.checkData.forEach(check => {
        check.clothLones.forEach(item => {
          item.check = val
          if (item.check) {
            this.selectData.push(item.id)
            this.totalLength += Number(item.clothCheckReport.buchang)
            this.totalUnit = item.clothCheckReport.buchangUnit
          }
        })
      })
    },
    handleCheckChange() {
      this.selectData = []
      let len = 0
      this.totalLength = 0
      this.checkData.forEach(check => {
        len += check.clothLones.length
        check.clothLones.forEach(item => {
          if (item.check) {
            this.selectData.push(item.id)
            this.totalLength += Number(item.clothCheckReport.buchang)
            this.totalUnit = item.clothCheckReport.buchangUnit
          }
        })
      })
      if (len == this.selectData.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
    handleRucangSelectChange(val) {
      this.checkData = []
      this.rucangData.forEach(item => {
        if (item.id == val) {
          this.checkData.push(item)
        } else if (val == '') {
          this.checkData.push(item)
        }
      })
    },
    handleDownBtn(id) {
      let url = `/redwood/reposity/CheckCloth/exportCheckCloth?param={clothLoneIds:${JSON.stringify([id])}}`
      window.open(url)
    },
    handlePiDownBtn() {
      let url = `/redwood/reposity/CheckCloth/exportCheckCloth?param={clothLoneIds:${JSON.stringify(this.selectData)}}`
      window.open(url)
    }
  },
  filters: {
    formatNumber(val) {
      if (Number(val) < 0 || val == null) {
        return '--'
      } else {
        return Number(val).toFixed(2)
      }
    }
  }
}

</script>
<style>


</style>
