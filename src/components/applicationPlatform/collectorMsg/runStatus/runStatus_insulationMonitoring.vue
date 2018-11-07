<template>
<div class="runStatus-insulationMonitoring">
	<ul class="edit-panel">
		<li class="list-item" v-if="$store.state.currentData.JYJCData">
			<h4 class="item-title">
				<!--MODBUS通讯设备配置信息-->
			</h4>
			<ul class="item-content row">
				<li class="col-lg-6">
					<span class="item-label">绝缘监察序号 ：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.JYJCData.recordNo"/>
				</li>
				<li class="col-lg-6">
					<span class="item-label">正母线绝缘电阻(MΩ)：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.JYJCData.res" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">负母线绝缘电阻(MΩ) ：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.JYJCData.res_" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">正母线电压值(V)：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.JYJCData.dianya" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">负母线电压值(V)：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.JYJCData.dianya_" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">母线总电压(V)：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.JYJCData.dianyaAll" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">采样时间：</span>
					<input type="text" readonly
						v-model="$store.state.currentData.JYJCData.time" />
				</li>
			</ul>
		</li>
	</ul>
</div>
</template>

<script>
import noDataComponent from '../../../myComponents/noDataComponent.vue';
export default {
	name: "runStatusInsulationMonitoring",
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
.runStatus-insulationMonitoring{
}
</style>