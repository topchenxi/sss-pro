<template>
  <main>
    <header class="buyer-details-head" v-if="customerDetails">
        <div class="buyer-avatar">
            <img :src="'http://www.soouya.com' + customerDetails.account.headUrl"
                 width="80"
                 height="80">
        </div>
        <p class="buyer-namer">
            <el-input v-model="customerDetails.account.nickName" placeholder="请输入昵称"></el-input>
        </p>
        <p>上次登录：{{customerDetails.activeTime | formatData}}</p>
        <p>注册时间：{{customerDetails.createTime | formatData}}</p>
    </header>
    
    <section v-if="customerDetails">
        <el-row>
            <el-col :span="24"
                    class="list-title">基本信息</el-col>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">采购商ID：{{customerDetails.id}}</el-col>
            <el-col :span="8">账号状态：{{customerDetails.status}}</el-col>
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>注册手机号：</el-col>
                    <el-col>
                        <el-input v-model="customerDetails.account.mobilePhone" placeholder="请输入注册手机号"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>用户名：</el-col>
                    <el-col>
                        <el-input v-model="customerDetails.account.userName" placeholder="请输入用户名"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>微信号：</el-col>
                    <el-col>
                        <el-input v-model="customerDetails.account.unionid" placeholder="请输入微信号"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">身份证：<img :src='"http://www.soouya.com" + customerDetails.account.idCardUrl'
                     width="40"
                     height="40"
                     style="vertical-align:top"></el-col>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>联系电话：</el-col>
                    <el-col>
                        <el-input v-model="customerDetails.account.tel" placeholder="11位手机号或者区号-固话"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"
                    class="list-title">公司信息</el-col>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>公司名称：</el-col>
                    <el-col>
                        <el-input v-model="customerDetails.company" placeholder="请输入公司名称"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>公司电话：</el-col>
                    <el-col>
                        <el-input v-model="customerDetails.tel" placeholder="请输入公司电话"></el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>公司地址：</el-col>
                    <el-col>
                        <el-cascader expand-trigger="hover"
                                    :options="cityOptions"
                                    v-model="cityModel">
                        </el-cascader>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>合作意向：</el-col>
                    <el-col>
                        <el-select v-model="customerDetails.intent" placeholder="请选择">
                    <el-option label="未评级" :value="-1"></el-option>
                    <el-option label="意向度很高" :value="1"></el-option>
                    <el-option label="1-2个月内会合作" :value="2"></el-option>
                    <el-option label="是需要培养的" :value="3"></el-option>
                    <el-option label="已签约" :value="4"></el-option>
                </el-select>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>公司类型：</el-col>
                    <el-col>
                        <el-select v-model="customerDetails.type" placeholder="请选择">
                    <el-option label="ODM" :value="0"></el-option>
                    <el-option label="OEM" :value="1"></el-option>
                    <el-option label="服装公司" :value="2"></el-option>
                    <el-option label="纯贸易公司" :value="3"></el-option>
                </el-select>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>生产类型：</el-col>
                    <el-col>
                        <el-select v-model="customerDetails.productType" placeholder="请选择">
                    <el-option label="女装" :value="0"></el-option>
                    <el-option label="男装" :value="1"></el-option>
                    <el-option label="童装" :value="2"></el-option>
                    <el-option label="内衣" :value="3"></el-option>
                    <el-option label="手袋箱包" :value="4"></el-option>
                </el-select>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>商家人数：</el-col>
                    <el-col>
                        <el-select v-model="customerDetails.people" placeholder="请选择商家人数">
                    <el-option label="未知" :value="-1"></el-option>
                    <el-option label="20人以下" :value="0"></el-option>
                    <el-option label="20-100人" :value="1"></el-option>
                    <el-option label="100-500人" :value="2"></el-option>
                    <el-option label="500人以上" :value="3"></el-option>
                </el-select>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8">
                <el-row type="flex" class="options-item">
                    <el-col>email：</el-col>
                    <el-col>
                        <el-input v-model="customerDetails.email" placeholder="请输入Email"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col>收货地址：</el-col>
            <el-col>
                <el-row v-for="address in customerDetails.addressList">
                    <el-row v-if="!address.isAdd">
                        <el-button v-if="address.defaultType" type="primary" icon="edit" @click.native="address.defaultType = false"></el-button>
                        <el-button type="primary" icon="delete"></el-button>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-input v-model="address.name" :disabled="address.defaultType" placeholder="收件人姓名"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="address.tel" :disabled="address.defaultType" placeholder="手机号"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-cascader expand-trigger="hover"
                                        :options="cityOptions"
                                        :disabled="address.defaultType"
                                        v-model="address.addressModel">
                            </el-cascader>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-input v-model="address.addr" :disabled="address.defaultType" placeholder="详细地址"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="address.sendCompany" placeholder="物流公司" :disabled="address.defaultType"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="address.sendTel" placeholder="联系电话" :disabled="address.defaultType"></el-input>
                        </el-col>
                    </el-row>
                    <el-row v-if="!address.defaultType">
                        <el-button v-if="address.isAdd" @click.native="customerDetails.addressList.pop()">取消</el-button>
                        <el-button v-else @click.native="address.defaultType = true">
                            取消
                        </el-button>
                        <el-button type="primary" @click.native="saveAddress(address)">保存</el-button>
                    </el-row>
                </el-row>
            </el-col>
            <el-col>
                <el-button type="text" v-if="canAddAddress" @click.native="addShipAddress">新增收货地址</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>收款方式：</el-col>
            <el-row>
                <el-row>
                    <el-col :span="12">
                        账户类型
                        <el-radio-group>
                            <el-radio :label="1">个人</el-radio>
                            <el-radio :label="2">企业</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="12">
                        银行卡号
                        <el-input></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        银行名称
                        <el-select
                                placeholder="请选择">
                            <el-option v-for="(item,key) in bankTree"
                                    :label="key"
                                    :value="key">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        银行账号开户名
                        <el-input></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        开户地区
                        <el-cascader expand-trigger="hover"
                                    :options="cityOptions"
                                    >
                            </el-cascader>
                    </el-col>
                    <el-col :span="12">
                        开户支行
                        <el-select
                                placeholder="请选择">
                            <el-option v-for="(item,key) in bankTree"
                                    :label="key"
                                    :value="key">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-row>
            <el-row>
                <el-button type="text" v-if="canAddBankAccount" @click.native="addBankAccount">新增收款方式</el-button>
            </el-row>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">跟单员：</el-col>
            <el-col :span="16">
                {{customerDetails.followerName}}{{customerDetails.followerTel}}
            </el-col>
        </el-row>
        <el-row class="buyer-info-row">
            <el-col :span="8">销售员</el-col>
            <el-col :span="16">{{customerDetails.salerName}}{{customerDetails.salerTel}}</el-col>
        </el-row>
    </section>

  </main>
</template>
<script>
import {
    request,
    // setCache,
    formatTimeString,
    // newRequest
} from 'common/utils'
import CrmApi from 'api/crm'
import {proCity} from 'common/proCityArea'
export default {
    data() {
        return {
            customerDetails: null,
            customerBank: null,
            followList: null,
            sellerList: null,
            customerId: this.$route.params.customerId,
            cityOptions: proCity,
            cityModel: [],
            canAddAddress: true,
            canAddBankAccount: true,
            bankTree: null,
            bankArr: null
        }
    },
    mounted() {
        this.getCustomerDetails(this.customerId)
        this.getCustomerBank(this.customerId)
        this.getFollowAndSellerList()
        this.getBankTree()
    },
    filters: {
        formatData(val) {
            return formatTimeString(val)
        },
    },
    methods: {
        getCustomerDetails(customerId) {
            request({
                url: CrmApi.customer.getDetails,
                data: {
                    id: customerId
                }
            }).then((response) => {
                if (response.success === '1') {
                    response.entry.addressList.forEach((address, index) => {
                        address.addressModel = [address.province, address.city, address.area]
                        address.defaultType = true
                        address.isAdd = false
                    })
                    this.cityModel = [response.entry.province, response.entry.city, response.entry.area]
                    this.customerDetails = response.entry
                }
            })
        },
        getCustomerBank(customerId) {
            request({
                url: CrmApi.bankAccount.getBankAccountList,
                data: {
                    customerId: customerId
                }
            }).then((response) => {
                if (response.success === '1') {
                    this.customerBank = response.result || []
                }
            })
        },
        getFollowAndSellerList() {
            request({
                url: CrmApi.cm.followAndSellererList
            }).then((response) => {
                if (response.success === '1') {
                    this.followList = response.followList
                    this.sellerList = response.sellerList
                }
            })
        },
        addShipAddress() {
            let addressModel = {
                addr: '',
                area: '',
                city: '',
                email: '',
                name: '',
                province: '',
                sendCompany: '',
                sendTel: '',
                tel: '',
                defaultType: false,
                isAdd: true,
                addressModel: [this.cityModel[0], this.cityModel[1], this.cityModel[2]]
            }
            this.canAddAddress = false
            this.customerDetails.addressList.push(addressModel)
        },
        addAddress(addressObj) {
            request({
                url: CrmApi.address.add
            }).then((respoinse) => {
            })
        },
        updateAddress(addressObj) {
            request({
                url: CrmApi.address.update
            }).then((respoinse) => {
            })
        },
        getBankTree() {
            let bankTree = localStorage.getItem('bankTree')
            if (bankTree) {
                this.bankTree = JSON.parse(bankTree)
                this.bankArr = formatBank(this.bankTree)
            }
            request({
                url: CrmApi.bank.tree
            }).then((response) => {
                if (response.success === '1') {
                   formatBank(response.bankTree)
                    this.bankTree = response.bankTree
                    this.bankArr = formatBank(response.bankTree)
                    localStorage.setItem('bankTree', JSON.stringify(response.bankTree))
                }
            })
            function formatBank(bankTree) {
                let bankArr = []
                for (let key in bankTree) {
                    if (bankTree.hasOwnProperty(key)) {
                        let provinceBank = bankTree[key]
                        for (let province in provinceBank) {
                            if (provinceBank.hasOwnProperty(province)) {
                                let cityBank = provinceBank[province]
                                for (let city in cityBank) {
                                    if (cityBank.hasOwnProperty(city)) {
                                        let bankList = cityBank[city]
                                        for (let bank in bankList) {
                                            bankArr.push({
                                                [bank]: bankList[bank]
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return bankArr
            }
        },
        saveAddress(addressObj) {
            if (addressObj.isAdd) {
                this.addAddress(addressObj)
            } else {
                this.updateAddress(addressObj)
            }
        }
    }
}
</script>
<style scoped lang="scss">
.list-title{
    font-size: 18px;
    padding: 10px 0;
}
.buyer-info-row{
    height: 40px;
    line-height: 40px
}
.transaction-table{
     border-collapse: collapse;
     width: 100%;
     th{
         background: #eef1f6;
         padding: 10px;
         border: 1px solid #ccc;
     }
    td{
        border: 1px solid #ccc;
        text-align: center;
        padding: 5px;
    }
}
</style>
