<template>
    <main>
        <el-table :data="buyerList" style="width: 100%" :height="800">
            <el-table-column prop="account.mobilePhone" label="注册手机号" :render-header="renderHeaderMobile">
            </el-table-column>
            <el-table-column prop="account.nickName" label="昵称" :render-header="renderHeaderNickName">
            </el-table-column>
            <el-table-column prop="company" label="公司名称" :render-header="renderHeaderCompany">
            </el-table-column>
            <el-table-column label="用户头像">
                <template scope="scope">
                    <img :src="'http://www.soouya.com' + scope.row.account.headUrl" width="40" height="40" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="account.userName" label="用户名">
            </el-table-column>
            <el-table-column prop="account.tel" label="联系电话">
            </el-table-column>
            <el-table-column :render-header="renderHeaderAccountStatus">
                <template scope="scope">
                    <span v-if="scope.row.account.status == 0">未激活</span>
                    <span v-else-if="scope.row.account.status == 1">正常</span>
                    <span v-else>被管理员删除</span>
                </template>
            </el-table-column>
            <!--增加大客户-->
            <el-table-column :render-header="renderHeaderAccountStatus2">
                <template scope="scope">
                    <el-checkbox v-model="scope.row.large" @change="valueChange(scope.row,$event)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="更新时间">
                <template scope="scope">
                    {{scope.row.editTime | formatData}}
                </template>
            </el-table-column>
            <el-table-column>
                <template scope="scope">
                    <el-button type="text" size="mini" @click.native="$router.push('/merchant/buyer/details/id/' + scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row type="flex" style="padding-top:20px" justify="space-between">
            <el-button type="primary" @click.native="Addbuyer">新增采购商</el-button>
            <el-pagination @current-change="handleChangePage" :current-page="pagination.thisPageNumber" :page-size="20" layout="total, prev, pager, next, jumper" :total="pagination.totalCount" style="text-align:right;">
            </el-pagination>
        </el-row>
    </main>
</template>
<script>
import {
    request,
    // setCache,
    formatTimeString
} from 'common/utils'
import CrmApi from 'api/crm'
import { Message } from 'element-ui'
const originQuestData = {
    'account.mobilePhone': '',
    'account.nickName': '',
    'companyLike': '',
    'status': '',
    pageNumber: 1,
    pageSize: 20
}
export default {
    data() {
        return {
            buyerList: [],
            pagination: {},
            buyerListOption: Object.assign({}, originQuestData)
        }
    },
    mounted() {
        this.getBuyerList()
    },
    filters: {
        formatData(val) {
            return formatTimeString(val)
        }
    },
    methods: {
        getBuyerList() {
            let requestOption = {}
            for (let key in this.buyerListOption) {
                if (this.buyerListOption.hasOwnProperty(key) && this.buyerListOption[key]) {
                    requestOption[key] = this.buyerListOption[key]
                }
            }
            request({
                url: CrmApi.customer.listCustomer,
                data: requestOption
            }).then((response) => {
                this.fullscreenLoading = false;
                if (response.success === '1') {
                    response.page.result.forEach((item) => {
                        item.large = item.large === 1
                    })
                    this.buyerList = response.page.result
                    this.pagination = {
                        totalCount: response.page.totalCount,
                        thisPageNumber: response.page.thisPageNumber
                    }
                } else {
                    Message({
                        message: response.msg,
                        type: 'error',
                        duration: 1000
                    })
                }
            })
        },
        update(row, largeValue) {
            let requestOption = {
                id: row.id,
                large: largeValue,
                company: row.company,
                tel: row.tel,
                addr: row.addr,
                intent: row.intent,
                type: row.type,
                productType: row.productType,
                people: row.people,
                province: row.province,
                city: row.city,
                area: row.area,
                'account.userName': row.account.userName,
                'account.mobilePhone': row.account.mobilePhone,
                'account.nickName': row.account.nickName,
                'account.tel': row.account.tel,
                'account.idCardUrl': row.account.idCardUrl,
                'account.headUrl': row.account.headUrl,
            }
            request({
                url: '/crm/merchant/Customer/update.do',
                data: requestOption
            }).then((response) => {
                this.fullscreenLoading = false;
                this.getBuyerList();
                if (response.success !== '1') {
                    Message({
                        message: response.msg,
                        type: 'error',
                        duration: 1000
                    })
                }
                // if (response.success === '1') {
                //     this.buyerList = response.page.result
                //     this.pagination = {
                //         totalCount: response.page.totalCount,
                //         thisPageNumber: response.page.thisPageNumber
                //     }
                // } else {
                //     Message({
                //         message: response.msg,
                //         type: 'error',
                //         duration: 1000
                //     })
                // }
            })
        },
        handleKeyupEnter(type, event) {
            let keyCode = event.keyCode
            this.buyerListOption[type] = event.target.value
            if (keyCode === 13) {
                this.getBuyerList()
            }
        },
        handleStatusChange(status) {
            this.buyerListOption.status = status
            this.getBuyerList()
        },
        handleStatusChange2(large) {
            this.buyerListOption.large = large
            this.getBuyerList()
        },
        handleChangePage(currentPage) {
            this.buyerListOption = Object.assign({}, originQuestData, { pageNumber: currentPage })
            this.getBuyerList()
        },
        renderHeaderMobile(h, { column, $index }) {
            return (
                <el-input placeholder='注册手机号'
                    value={this.buyerListOption['account.mobilePhone']}
                    nativeOnKeyup={this.handleKeyupEnter.bind(this, 'account.mobilePhone')}>
                </el-input>
            )
        },
        renderHeaderNickName(h, { column, $index }) {
            return (
                <el-input placeholder='昵称'
                    nativeOnKeyup={this.handleKeyupEnter.bind(this, 'account.nickName')}>
                </el-input>
            )
        },
        renderHeaderCompany(h, { column, $index }) {
            return (
                <el-input placeholder='公司名称'
                    nativeOnKeyup={this.handleKeyupEnter.bind(this, 'companyLike')}>
                </el-input>
            )
        },
        renderHeaderAccountStatus(h, { column, $index }) {
            let statusTxt;
            switch (this.buyerListOption.status) {
                case '1':
                    statusTxt = '正常'
                    break
                case '0':
                    statusTxt = '未激活'
                    break
                case '-2':
                    statusTxt = '被管理员删除'
                    break
                default:
                    statusTxt = '状态'
            }
            return (
                <el-select placeholder='账号状态' value={statusTxt}>
                    <el-option value="0" nativeOnClick={this.handleStatusChange.bind(this, '')}>状态</el-option>
                    <el-option value="1" nativeOnClick={this.handleStatusChange.bind(this, '1')}>正常</el-option>
                    <el-option value="2" nativeOnClick={this.handleStatusChange.bind(this, '0')}>未激活</el-option>
                    <el-option value="3" nativeOnClick={this.handleStatusChange.bind(this, '-2')}>被管理员删除</el-option>
                </el-select>
            )
        },
        renderHeaderAccountStatus2(h, { column, $index }) {
            let largeTxt;
            switch (this.buyerListOption.large) {
                case '1':
                    largeTxt = '大客户'
                    break
                default:
                    largeTxt = '类型'
            }
            return (
                <el-select placeholder='是否为大客户' value={largeTxt}>
                    <el-option value="" nativeOnClick={this.handleStatusChange2.bind(this, '')}>类型</el-option>
                    <el-option value="1" nativeOnClick={this.handleStatusChange2.bind(this, '1')}>大客户</el-option>
                </el-select>
            )
        },
        valueChange(row, event) {
            console.log(row, event.target.checked)
            this.update(row, event.target.checked ? 1 : -1)
        },
        Addbuyer() {
            let host = location.host.indexOf('test') > -1 ? 'http://testoms-n.soouya.com' : 'http://oms-n.soouya.com'
            location.href = `${host}/merchantSys/editBuyer`
        }
    }
};
</script>
