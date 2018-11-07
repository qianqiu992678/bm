<template>
<div class="collector-runStatus">
	<!--<select v-model="item" class="form-control" v-on:change="itemSelect">
		<option value=>电池串</option>
		<option value="/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusSampleValue">开入装置</option>
		<option value="/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusOutputValue">开出装置</option>
		<option value="/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusInsulationMonitoring">绝缘监察</option>
		<option value="/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusChargeMachine">充电机</option>
		<option value="/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusPowerStatus">电源状态</option>
	</select>-->
	<!--{{$route}}-->
	<ul class="pageSelect">
		<li :class="{currentPageSign:true,
			stringValue:$route.name=='runStatusStringValue',
			sampleValue:$route.name=='runStatusSampleValue',
			outputValue:$route.name=='runStatusOutputValue',
			insulationMonitoring:$route.name=='runStatusInsulationMonitoring',
			chargeMachine:$route.name=='runStatusChargeMachine',
			powerStatus:$route.name=='runStatusPowerStatus'}"></li>
		<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusStringValue')" 
			:class="{pageItem:true,active:$route.name=='runStatusStringValue'}">电池串</li>
		<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusSampleValue')" 
			:class="{pageItem:true,active:$route.name=='runStatusSampleValue'}">开入装置</li>
		<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusOutputValue')" 
			:class="{pageItem:true,active:$route.name=='runStatusOutputValue'}">开出装置</li>
		<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusInsulationMonitoring')" 
			:class="{pageItem:true,active:$route.name=='runStatusInsulationMonitoring'}">绝缘监察</li>
		<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusChargeMachine')" 
			:class="{pageItem:true,active:$route.name=='runStatusChargeMachine'}">充电机</li>
		<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/runStatus/runStatusPowerStatus')" 
			:class="{pageItem:true,active:$route.name=='runStatusPowerStatus'}">电源状态</li>
	</ul>
	<router-view/>
</div>
</template>
<script>
//import VueDraggableResizable from 'vue-draggable-resizable'
//import HighCharts from 'highcharts'
//import stockInit from 'highcharts/modules/stock'
export default {
	name: "runStatus",
	data: function() {
		return {
			item:'',
		}
	},
	methods:{
		itemSelect:function(){
			this.$router.push({path:this.item})
		},
		//告诉node获取当前数据--传StationID，StringNo
		getCurrentData:function(StringNo){
			let that=this;
			this.yxRequest(
				'post',
				"/platform/getcurrentdata",
				{StationIP:this.$store.state.currentStation.IPAddress,StringNo:StringNo},
				function(result) {
					that.yxToastr.success('获取当前数据成功');
				},
				function(result) {
					that.yxToastr.error('获取当前数据失败:' + result.msg);
					console.log('err:', result);
			})
		},
	},
	created() {
		this.item=this.$route.path;
		var that=this;
		setTimeout(function(){
			//that.StringNo=that.$store.state.currentStringsMsg[0].StringNo;
			that.getCurrentData(0);
		},2000)
		console.log(this.$route.name)
	},
	components: {},
	watch:{}
}
</script>

<style lang="less">
@import '../../../../style/app.less';
.collector-runStatus{
	position: relative;
    //padding-top: 30px;
	.form-control{
	    position: absolute;
	    top: -5px;
	    right: 0;
	    width: auto;
	}
	.pageSelect{
		margin-bottom: 6px;
		position: relative;
		&:after{
			content: '';
			display: table;
			clear: both;
		}
		>li{
			float:left;
			padding: 4px 12px;
			border: 1px solid @active-color;
			border-radius: 15px;
			height: 30px;
			margin-right: 3px;
			width: 82px;
			z-index: 1;
    		position: relative;
    		transition:color 1s;
			&.active{
				color: #fff;
			}
		}
		.currentPageSign{
			position: absolute;
			z-index: 0;
			background: @active-color;
			transition:left .5s ease-out;
			&.stringValue{
				left:0;
			}
			&.sampleValue{
				left:85px;
			}
			&.outputValue{
				left:170px;
			}
			&.insulationMonitoring{
				left:255px;
			}
			&.chargeMachine{
				left:340px;
			}
			&.powerStatus{
				left:425px;
			}
		}
	}
	
}
</style>