<template>
    <el-dialog title="通知出仓单"
               v-model="sendgoodShow"
               custom-class="common-pop"
               size="tiny"
               v-if="sendgoodShow"
               :close-on-click-modal="false"
               @close="cancelOut">
        <div class="take-good clearfix send-good">
            <div class="t-item">
                <div class="t-item-l">
                    订单号
                </div>
                <div class="t-item-r">
                    {{sendgoodData.serviceNumber}}
                </div>
            </div>
            <div class="t-item">
                <div class="t-item-l">
                    采购商
                </div>
                <div class="t-item-r">
                    {{sendgoodData.buyerCompany}}
                </div>
            </div>
            <div class="t-item">
                <div class="t-item-l"
                     style="position: absolute; top:0;">
                    <b style="color: red;">*</b> 发货内容
                </div>
                <div class="t-item-r"
                     style="margin-left: 100px;">
                    <div class="r-line">
                        <input type='checkbox'
                               class='input-checkbox'
                               id="chk"
                               :checked="checked"
                               @click='checkedAll'>
                        <label for="chk">
                            全选
                        </label>
                    </div>
                    <div class="r-line"
                         v-for='(checkb, index) in checkboxData'>
                        <input type="checkbox"
                               name='checkboxinput'
                               v-model="clothLoneIdList"
                               :value='checkb.id'
                               :id='index'>
                        <label :for="index">
                            {{checkb.productNumber}}|{{checkb.color}}|{{checkb.quantity}}{{checkb.quantityUnit}}|{{checkb.number}}
                            <template v-if="checkb.rank">({{checkb.rank}}/{{checkb.average}}分)</template>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="">

        </div>
    </el-dialog>
</template>
<script>
export default {
    props: ['sendgoodShow'],
    data() {
        return {

        }
    },
    mounted() {

    },
    methods() {

    }
}
</script>