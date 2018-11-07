<template>
<div class="runStatus-stringValue">
	<div class="runStatus-title marginBottom10">
		<span v-if="$store.state.currentData.headData">
			{{$store.state.currentData.headData.time}}
		</span>
		<!--<button class="btn btn-default">更新数据</button>-->
		<select class="form-control" 
			style="display: inline-block;width: auto;position: relative;top:2px"
			v-model="StringNo" v-on:change="getCurrentData">
			<option :value="string.StringNo" v-for="string in $store.state.currentStringsMsg">{{string.StringName}}</option>
		</select>
		<button class="btn btn-default" v-on:click="displayTypeChange">表格显示/图形显示</button>
		<button class="btn btn-default" v-on:click="showSummary=!showSummary">显示/隐藏电池串信息</button>
	</div>
	<div class="runStatus-dataContainer data-table" v-if="showTable">
		<div class="table-responsive">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>电池序号</th>
						<th>电压</th>
						<th>温度</th>
						<th>内阻</th>
						<th>剩余容量</th>
						<th>内阻变化率</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in $store.state.currentData.bodyData">
						<td>{{item.cellId+1}}</td>
						<td>{{item.dianya}}</td>
						<td>{{item.wendu}}</td>
						<td>{{item.neizu}}</td>
						<td>{{item.rl}}</td>
						<td>{{item.nzbhl}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="runStatus-dataContainer data-diagram" v-show="!showTable">
		<div id="runStatusChartContainer" style="min-width:400px;height:400px"></div>
	</div>
	<vue-draggable-resizable class="runStatus-summary" style="z-index: 10;" v-if="showSummary&&$store.state.currentData.headData" 
    	v-on:dragging="onDrag" v-on:resizing="onResize" 
    	:x='400' :y='30' :w='300' :h='500'
    	:handles="['tm']" :draggable="true">
    	<span class="glyphicon glyphicon-remove-circle" v-on:click="showSummary=!showSummary"></span>
  		<ul class="edit-panel">
			<li class="list-item">
				<h4 class="item-title">电池串信息：</h4>
				<ul class="item-content row">
					<li class="col-lg-12">
						<span class="item-label">串名:</span>
						<input v-for="string in $store.state.currentStringsMsg" 
							v-if="string.StringNo==StringNo" type="text" readonly
							v-model='string.StringName'/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">串状态代码：</span>
						<input type="text" readonly v-model='$store.state.currentData.headData.dcStatus'/>
					</li>
					<!--<li class="col-lg-12">
						<span class="item-label">串状态：</span>
						<input type="text" readonly />
					</li>-->
					<li class="col-lg-12">
						<span class="item-label">总电压：</span>
						<input type="text" readonly v-model='$store.state.currentData.headData.allI'/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">总电流：</span>
						<input type="text" readonly v-model='$store.state.currentData.headData.allV'/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">纹波系数：</span>
						<input type="text" readonly  v-model='$store.state.currentData.headData.wbxs'/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">电池数：</span>
						<input type="text" readonly v-model='$store.state.currentData.headData.dcCount'/>
					</li>
					<!--<li class="col-lg-12">
						<span class="item-label">电压最大值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">电压最小值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">电压平均值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">温度最大值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">温度最小值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">温度平均值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">电池容量最大值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">电池容量最小值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">电池容量平均值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">内阻最大值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">内阻最小值：</span>
						<input type="text" readonly/>
					</li>
					<li class="col-lg-12">
						<span class="item-label">内阻平均值：</span>
						<input type="text" readonly/>
					</li>-->
				</ul>
			</li>
		</ul>	
    </vue-draggable-resizable>
</div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import HighCharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
export default {
	name: "runStatusStringValue",
	data: function() {
		return {
			showSummary:false,
			showTable:true,
			width: 0,
			height: 0,
			x: 0,
			y: 0,
			StringNo:0,
			chartOption:{
				chart: {
					alignTicks: false
				},
				rangeSelector:{
					enabled:false
				},
				plotOptions:{
			        column:{
			            borderWidth:0
			        }
			    },
			    yAxis:[
					{
						labels: {
							format: this.value,
							style: {
								color: HighCharts.getOptions().colors[0]
							}
					
						},
						plotLines: [{
							value: 0,
							width: 2,
							color: 'silver'
						}],
						title: {
							text: '',
							style: {
								color: HighCharts.getOptions().colors[0]
							}
						}
					},{
						labels: {
							format: this.value,
							style: {
								color: HighCharts.getOptions().colors[1]
							}
						},
						plotLines: [{
							value: 0,
							width: 2,
							color: 'silver'
						}],
						title: {
							text: '',
							style: {
								color: HighCharts.getOptions().colors[1]
							}
						}
					},{
						labels: {
							format: this.value,
							style: {
								color: HighCharts.getOptions().colors[2]
							}
						},
						plotLines: [{
							value: 0,
							width: 2,
							color: 'silver'
						}],
						title: {
							text: '',
							style: {
								color: HighCharts.getOptions().colors[2]
							}
						}
					},{
						labels: {
							format: this.value,
							style: {
								color: HighCharts.getOptions().colors[3]
							}
						},
						plotLines: [{
							value: 0,
							width: 2,
							color: 'silver'
						}],
						title: {
							text: '',
							style: {
								color: HighCharts.getOptions().colors[3]
							}
						}
					}
				],
				xAxis:{
					categories:[],
					labels: {
    					formatter:function(){
    						return this.pos+1+'号电池'
    					}
					}
				},
				legend: {                                                                  
					enabled: true                                                         
				},
				credits:{
					text:'www.yxdq.net',
					href:'http://www.yxdq.net'
				},
				navigator: {
			        xAxis:{
			        	labels:{
							enabled:false
			         	}	
			        }
			    },
				title: {
					text:"时刻数据"
				},
				series: [
					{
						type:"column",
						name:"电压",
						yAxis:0,
						data:[],
					},{
						type:"column",
						name:"内阻",
						yAxis:1,
						data:[],
					},{
						type:"column",
						name:"温度",
						yAxis:2,
						data:[],
					},{
						type:"column",
						name:"容量",
						yAxis:3,
						data:[],
					},
				]
			},
		}
	},
	methods:{
		onResize: function(x, y, width, height) {
			this.x = x
			this.y = y
			this.width = width
			this.height = height
		},
		onDrag: function(x, y) {
			this.x = x
			this.y = y
		},
		
		displayTypeChange:function(){
			this.showTable=!this.showTable;
			if(this.$store.state.currentData.bodyData){
				this.createChart();
			}
		},
		createChart:function(){
			if(this.showTable)return;
			var that=this;
			that.chartOption.series[0].data=[];
			that.chartOption.series[1].data=[];
			that.chartOption.series[2].data=[];
			that.chartOption.series[3].data=[];
			//console.log(this.$store.state.currentData.bodyData);
			//that.chartOption.xAxis.categories=[];
			this.$store.state.currentData.bodyData.forEach(function(cell,k){
				//that.chartOption.xAxis.categories.push(k+1+'号电池');
				that.chartOption.series[0].data.push(cell.dianya+12)
				that.chartOption.series[1].data.push(cell.neizu+15)
				that.chartOption.series[2].data.push(cell.wendu+11)
				that.chartOption.series[3].data.push(cell.rl+17)
//				that.chartOption.series[0].data.push(cell.dianya)
//				that.chartOption.series[1].data.push(cell.neizu)
//				that.chartOption.series[2].data.push(cell.wendu)
//				that.chartOption.series[3].data.push(cell.rl)
			})
			//console.log(JSON.stringify(this.chartOption));
			HighCharts.stockChart('runStatusChartContainer', this.chartOption)
			//HighCharts.chart('runStatusChartContainer', this.chartOption)
			//HighCharts.chart('runStatusChartContainer', option)
		},
		//告诉node获取当前数据--传StationID，StringNo
		getCurrentData:function(){
			let that=this;
			this.yxRequest(
				'post',
				"/platform/getcurrentdata",
				{StationIP:this.$store.state.currentStation.IPAddress,StringNo:this.StringNo},
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
		
	},
	components: {
		VueDraggableResizable,
	},
	watch:{
		$store:'createChart'
	}
}
</script>

<style lang="less" scoped>
@import '../../../../style/app.less';
.runStatus-stringValue{
	.runStatus-title{
		text-align: left;
	}
	.runStatus-dataContainer{
		min-height: 300px;
		.table-responsive{
			max-height:400px;
		}
	}
	border: 1px solid @border-color;
	background: #fff;
	overflow:hidden;
    padding: 24px 6px 6px;
    box-shadow: 2px 2px 2px 1px;
    border-radius: 6px;
}
</style>