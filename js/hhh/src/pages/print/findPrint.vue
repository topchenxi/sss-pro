<template>
	<div class="print-main">
		<table v-for="item in list" style="border-collapse:collapse;height:53.3mm;width:90mm;">
			<tr>
				<td width="50">货号</td>
				<td width="290" v-if="item.number">{{item.number}}</td>
				<td width="290" v-else>——</td>
			</tr>
			<tr>
				<td width="50">成分</td>
				<td width="290" v-if="item.composition">{{item.composition}}</td>
				<td width="290" v-else>——</td>
			</tr>
			<tr>
				<td width="50">幅宽</td>
				<td width="290" v-if="item.width == -1 || !item.width">——</td>
				<td width="290" v-else>{{item.width}}{{item.widthUnit}}</td>
			</tr>
			<tr>
				<td width="50">克重</td>
				<td width="290" v-if="item.weight == -1 || !item.weight">——</td>
				<td width="290" v-else>{{item.weight}}{{item.weightUnit}}</td>
			</tr>
			<tr>
				<td width="50">价格</td>
				<td width="290" v-if="item.bulkPrice">{{item.bulkPrice}}{{item.bulkPriceUnit}}</td>
				<td width="290" v-else>——</td>
			</tr>
		</table>
	</div>
</template>
<script>
import {
	request
} from 'utils/request'
export default {
	data() {
		return {
			list: [],
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			this.originalColorList = {}
			this.$store.dispatch('changeload', true)
			var orderNumber = this.$route.query.orderNumber
			var indexArr = this.$route.query.index.split(',')
			console.log(indexArr)
			request('/redwood/find/getDetail', {
				method: 'GET',
				data: { orderNumber: orderNumber }
			}).then(response => {
				this.$store.dispatch('changeload', false)
				if (response.success == '1') {
					if (indexArr.length > 1) {
							indexArr.forEach((item, index) => {
					var changeColorCard = response.obj.changeColorCardList[index]
					var obj = {
						number: changeColorCard.productNumber,
						composition: changeColorCard.title,
						width: changeColorCard.replyWidth,
						widthUnit: changeColorCard.replyWidthUnit,
						weight: changeColorCard.replyWeigth,
						weightUnit: changeColorCard.replyWeigthUnit,
						bulkPrice: changeColorCard.bulkPrice,
						bulkPriceUnit: changeColorCard.bulkPriceUnit
					}
					this.list.push(obj)
					})
					} else {
						let index = indexArr[0]
						let changeColorCard = response.obj.changeColorCardList[index]
							console.log(changeColorCard)
					let obj = {
						number: changeColorCard.productNumber,
						composition: changeColorCard.title,
						width: changeColorCard.replyWidth,
						widthUnit: changeColorCard.replyWidthUnit,
						weight: changeColorCard.replyWeigth,
						weightUnit: changeColorCard.replyWeigthUnit,
						bulkPrice: changeColorCard.bulkPrice,
						bulkPriceUnit: changeColorCard.bulkPriceUnit
					}
					this.list = []
					this.list.push(obj)
					}
				} else {
					this.$message({
						type: 'success',
						message: response.msg,
						duration: 1500
					})
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.print-main {
	width: 360px;
	margin: auto;
	font-size: 12px;
	font-weight: 700;
	font-family: "Microsoft YaHei";
}
td {
	border:1px solid black;
	text-align: center;
}
</style>

<style lang="scss">
body,
html {
	height: 0px;
	min-height: 0px;
	min-width: 0px;
}

.app {
	min-height: 0px;
	min-width: 0px;
}
</style>
