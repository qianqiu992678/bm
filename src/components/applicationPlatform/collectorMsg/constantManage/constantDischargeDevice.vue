<template>
<div class="constant-dischargeDevice">
	<ul class="edit-panel">
		<li class="list-item">
			<h4 class="item-title">
				放电装置配置信息
				<button class="btn btn-default">保存修改</button>
			</h4>
			<ul class="item-content row">
				<li class="col-lg-6">
					<span class="item-label">集中器名称：</span>
					<input type="text" v-model="$store.state.currentStation.StationName"/>
				</li>
			</ul>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	name: "constantDischargeDevice",
	data: function() {
		return {}
	},
	methods:{
		getStringConstantFun:function(){
			let that = this;
			this.yxRequest(
			'get',
			"/platform/constantmanage/getstringconstant",
			{StationID:this.getLocalStorage('currentStationID')},
			function(result) {
				
			},
			function(result) {
				
			})
		},
	},
	created() {},
}
</script>

<style lang="less" scoped>
@import '../../../../style/app.less';

</style>