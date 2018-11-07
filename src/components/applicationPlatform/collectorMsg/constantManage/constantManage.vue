<template>
<div class="collector-constantManage">
	<div class="nav-container">
		<ul class="pageSelect">
			<li :class="{currentPageSign:true,
				stringValue:$route.name=='constantStringValue',
				sampleValue:$route.name=='constantSampleValue',
				constantOutputValue:$route.name=='constantOutputValue',
				dischargeDevice:$route.name=='constantDischargeDevice'}"></li>
			<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/constantManage/constantStringValue')" 
				:class="{pageItem:true,active:$route.name=='constantStringValue'}">电池串信息</li>
			<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/constantManage/constantSampleValue')" 
				:class="{pageItem:true,active:$route.name=='constantSampleValue'}">开入装置配置信息</li>
			<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/constantManage/constantOutputValue')" 
				:class="{pageItem:true,active:$route.name=='constantOutputValue'}">开出装置配置信息</li>
			<li v-on:click="urlGo('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/constantManage/constantDischargeDevice')" 
				:class="{pageItem:true,active:$route.name=='constantDischargeDevice'}">放电装置配置信息</li>
		</ul>
	</div>
		
	<router-view/>
</div>
</template>
<script>
//import VueDraggableResizable from 'vue-draggable-resizable'
//import HighCharts from 'highcharts'
//import stockInit from 'highcharts/modules/stock'
export default {
	name: "constantManage",
	data: function() {
		return {
			item:'',
		}
	},
	methods:{
		itemSelect:function(){
			this.$router.push({path:this.item})
		},
	},
	created() {
		this.item=this.$route.path;
		var that=this;
		console.log(this.$route.name)
	},
	components: {},
	watch:{}
}
</script>

<style lang="less">
@import '../../../../style/app.less';
.collector-constantManage{
	position: relative;
    //padding-top: 30px;
	.form-control{
	    position: absolute;
	    top: -5px;
	    right: 0;
	    width: auto;
	}
	.nav-container{
		overflow: auto;
	}
	.pageSelect{
		min-width: 800px;
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
			width: 157px;
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
				left:160px;
			}
			&.constantOutputValue{
				left:320px;
			}
			&.dischargeDevice{
				left:480px;
			}
		}
	}
	
}
</style>