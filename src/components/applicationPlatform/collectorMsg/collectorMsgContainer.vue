<template>
<div class="applicationPlatform-collectorMsgContainer">
	<div class="panel panel-default">
		<div class="panel-heading">
			<button type="button" class="btn btn-primary btn-sm"
				v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorSelect/0')">
				<i class="glyphicon glyphicon-chevron-left"></i>
				返回
			</button>
			<h3 class="panel-title">集中器信息({{$store.state.currentStation?$store.state.currentStation.StationName:''}})</h3>
		</div>
		<div class="panel-body">
			<ul class="nav nav-tabs marginBottom10">
				<li :class="{active:$route.path.includes('systemDiagram')}">
					<a v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/systemDiagram')">
						接线图</a>
				</li>
				<li :class="{active:$route.path.includes('runStatus')}">
					<a v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusStringValue')">
						运行状态</a>
				</li>
				<li :class="{active:$route.path.includes('alarmAnalysis')}">
					<a v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/alarmAnalysis')">
						告警分析</a>
				</li>
				<li :class="{active:$route.path.includes('dataAnalysis')}">
					<a v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/dataAnalysis')">
						数据分析</a>
				</li>
				<li :class="{active:$route.path.includes('peripheralControl')}">
					<a v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/peripheralControl')">
						外围控制</a>
				</li>
				<li :class="{active:$route.path.includes('constantManage')}">
					<a v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/constantManage/constantStringValue')">
						定值管理</a>
				</li>
				
				
			</ul>
			<router-view/>
		</div>
		<!--<div class="panel-footer"></div>-->
	</div>
	
</div>
</template>

<script>
export default {
	name: "collectorMsgContainer",
	data: function() {
		return {}
	},
	methods:{
		getCurrentStation:function(StationID){
			var that=this;
			this.yxRequest(
				'get',
				"/platform/currentstation", 
				{StationID:StationID},
				function(result) {
					//console.log(result);
					that.$store.commit('getCurrentStation', {
						station:result.data[0],
					})
				},
				function(result) {
					that.yxToastr.error('获取currentstation失败:'+result.msg);
					console.log('err:',result);
			})
		},
		getStringConstantFun:function(StationID){//platform/constantManage/getstringconstant
			let that = this;
			this.yxRequest(
				'get',
				"/platform/constantmanage/getstringconstant",
				{StationID:StationID},
				function(result) {
					result.data.forEach(function(string){
						string.showDetail=0;
					})
					that.$store.commit('getCurrentStringsMsg', {
						stringsMsg:result.data,
					})
				},
				function(result) {
					that.yxToastr.error('获取电池串配置数据失败:' + result.msg);
					console.log('err:', result);
			})
		},
		getSampleValueNames:function(StationID){
			let that = this;
			this.yxRequest(
				'post',
				"/platform/getsamplevaluenames",
				{StationID:StationID},
				function(result) {
					console.log(result.data)
					that.$store.commit('sampleValueNamesChange', {
						sampleValueNames:result.data,
					})
				},
				function(result) {
					that.yxToastr.error('获取开入量名称列表失败:' + result.msg);
					console.log('err:', result);
			})
		},
		getOutputValueNames:function(StationID){
			let that = this;
			this.yxRequest(
				'post',
				"/platform/getoutputvaluenames",
				{StationID:StationID},
				function(result) {
					console.log(result.data)
					that.$store.commit('outputValueNamesChange', {
						outputValueNames:result.data,
					})
				},
				function(result) {
					that.yxToastr.error('获取开入量名称列表失败:' + result.msg);
					console.log('err:', result);
			})
		}
	},
	computed: {},
	created(){
		console.log(this.$route.name)
		var that=this;
		if(!this.$store.state.currentStation){
			console.log('刷新页面单独请求currentStation');
			this.$store.commit('getCurrentStation', {
				station:{},
			})
			this.getCurrentStation(this.getLocalStorage('currentStationID'));
			
		}
		if(!this.$store.state.currentStringsMsg){
			console.log('请求currentStringsMsg');
			this.$store.commit('getCurrentStringsMsg', {
				stringsMsg:[],
			})
			this.getStringConstantFun(this.getLocalStorage('currentStationID'));
		}
		
		this.getSampleValueNames(this.getLocalStorage('currentStationID'));
		this.getOutputValueNames(this.getLocalStorage('currentStationID'));
	},
}
</script>

<style lang="less">
	.applicationPlatform-collectorMsgContainer{
		height: 100%;
		>.panel{
			height:calc(~"100% - 10px");
			margin-bottom: 10px;
			.panel-body{
				height:calc(~"100% - 40px");
			}
		}
		.collector-alarmAnalysis{
			.table-responsive{
				height: 460px;
				overflow: auto;
			}
		}
	}
</style>