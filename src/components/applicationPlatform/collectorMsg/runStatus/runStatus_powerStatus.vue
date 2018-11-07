<template>
<div class="runStatus-powerStatus">
	<ul class="edit-panel">
		<li class="list-item" v-if="$store.state.currentData.dischargeData">
			<h4 class="item-title">
				<!--MODBUS通讯设备配置信息-->
			</h4>
			<ul class="item-content row">
				<li class="col-lg-6">
					<span class="item-label">放电状态：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.dischargeData.dischargeStatus"/>
				</li>
				<li class="col-lg-6">
					<span class="item-label">放电信息：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.dischargeData.dischargeText" />
				</li>
			</ul>
		</li>
	</ul>
</div>
</template>

<script>
import noDataComponent from '../../../myComponents/noDataComponent.vue';
export default {
	name: "runStatuspowerStatus",
	data: function() {
		return {
			valueList:{
					data:[
						{number:1,},{number:2,},{number:3,},{number:4,},{number:5,},
						{number:6,},{number:7,},{number:8,},{number:9,},{number:10,}
					],
					total:23,
					pageNum:1,
					pageCount:3,
			},
		}
	},
	methods:{
		paginationPageClick:function(pageNum){
			console.log(pageNum)
		}
	},
	created() {},
	components: {
		noDataComponent,
	},
	watch:{}
}
</script>

<style lang="less" scoped>
@import '../../../../style/app.less';
.runStatus-powerStatus{
	
}
</style>