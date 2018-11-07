<template>
<div class="runStatus-chargeMachine">
	<ul class="edit-panel">
		<li class="list-item" v-if="$store.state.currentData.chargerData">
			<h4 class="item-title">
				<!--MODBUS通讯设备配置信息-->
			</h4>
			<ul class="item-content row">
				<!--<li class="col-lg-6">
					<span class="item-label">充电装置序号：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.recordNo"/>
				</li>-->
				<li class="col-lg-6">
					<span class="item-label">当前状态：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.curStatus" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">输出电压(V)：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.dianya" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">输出电流(A)：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.dianliu" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">输出稳压精度：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.jingduV" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">输出稳流精度：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.jingduI" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">输出纹波系数：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.wbxs" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">采样时间：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.chargerData.time" />
				</li>
			</ul>
		</li>
	</ul>
</div>
</template>

<script>
import noDataComponent from '../../../myComponents/noDataComponent.vue';
export default {
	name: "runStatusChargeMachine",
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
.runStatus-chargeMachine{
}
</style>