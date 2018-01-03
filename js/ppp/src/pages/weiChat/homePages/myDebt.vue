<template>
  <section id="sectionId">
    <title>我的欠款</title>
    <Tab></Tab>
    <!-- <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:1.3rem;"> -->
    <div class="debt-box">
      <span>我的欠款</span>
      <router-link :to="{name: 'debtList', query: {status: 5}}">
        <el-button style="float:right">查看所有欠款
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </router-link>
    </div>
    <div class="tab-box">
      <el-row>
        <router-link :to="{name: 'debtList', query: {status: 2}}">
          <el-col :span="6">
            <img src="../../../assets/fangkuan@1x.png" width="42%" />
            <p style="color: #999">待放款</p>
          </el-col>
        </router-link>
        <router-link :to="{name: 'debtList', query: {status: 3}}">
          <el-col :span="6">
            <img src="../../../assets/pay-active@1x.png" width="42%" />
            <p style="color: #999">待还款</p>
          </el-col>
        </router-link>
        <router-link :to="{name: 'debtList', query: {status: 1}}">
          <el-col :span="6">
            <img src="../../../assets/credit-active@1x.png" width="42%" />
            <p style="color: #999">已还款</p>
          </el-col>
        </router-link>
        <router-link :to="{name: 'debtList', query: {status: 0}}">
          <el-col :span="6">
            <template v-if="obj > 0">
              <img src="../../../assets/yuqi-redpoint@1x.png" width="42%" />
            </template>
            <template v-else>
              <img src="../../../assets/timeout@1x.png" width="42%" />
            </template>
            <p style="color: #999">逾期</p>
          </el-col>
        </router-link>
      </el-row>
    </div>
    <div style="padding:15px 4%;font-size:1.5rem;background-color:#fff;color:#333;margin-top:10px;">还款账户</div>
    <div class="bank-box">
      <span style="font-size: 1.7rem;float:left">邓代国</span>
      <span style="font-size: 1.7rem;">中国农业银行广州轻纺交易园支行</span>
      </br>
      <span style="font-size: 1.7rem;">6228 4800 8674 1169 170</span>
    </div>
    <el-button class="signOut-btn" type="success" @click.native="signOut">退出</el-button>
    <!-- </mt-loadmore> -->
  </section>
</template>

<script>
import Tab from '../bottomTab.vue'
import request from '@/utils/request'
import { Toast } from 'mint-ui'
export default {
  components: {
    Tab,
  },
  data() {
    return {
      obj: 0,
    }
  },
  mounted() {
    document.getElementById('sectionId').style.height = window.screen.height + 'px'
    this.getData()
  },
  methods: {
    getData() {
      request('/redwood/shop/loanCount/my', {
        data: {},
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
        } else {
          Toast({
            message: res.msg,
            position: 'bottome',
            duration: 2000,
          })
        }
      })
    },
    signOut() {
      request('/soouya/v1/shopToken/my', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.success !== '1') {
          this.$Message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        } else {
          localStorage.clear()
          sessionStorage.clear()
          this.$router.replace({
            name: 'newLogin'
          })
        }
      })
    },
    loadTop() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-arrow-right {
  color: #999;
}
section{
  height: 100%;
  padding-bottom: 10%;
}
.signOut-btn{
  width: 89%;
  margin-left:5.35%;
  height: 49px;
  position: absolute;
  bottom: 0px;
}
.debt-box {
  padding: 18px 0% 18px 4%;
  background-color: #fff;
  >span {
    font-size: 1.5rem;
  }
  .el-button {
    float: right;
    color: #999;
    border: 0px;
    margin-top: -5px;
  }
}

.tab-box {
  margin-top: 3px;
  background-color: #fff;
  padding: 25px 4%;
  p {
    margin: 2px 0;
    font-size: 1.3rem;
  }
  .el-col {
    text-align: center;
  }
}

.company-box {
  padding: 15px 4%;
  font-size: 1.5rem;
  color: #000;
  background-color: #fff;
}

.bank-box {
  background: -webkit-linear-gradient(#0ba360, #3cba92);
  background: -o-linear-gradient(#0ba360, #3cba92);
  background: -moz-linear-gradient(#0ba360, #3cba92);
  background: linear-gradient(#0ba360, #3cba92);
  padding-top: 5.5%;
  padding-bottom: 5.5%;
  text-align: right;
  padding-left: 4%;
  padding-right: 4%;
  span {
    line-height: 30px;
    color: #fff;
  }
}
</style>
