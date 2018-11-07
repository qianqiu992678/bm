<template>
	<div class="collector-dataAnalysis">
		<select class="analysisSelect" v-model="analysisType" v-on:change="analysisSelectFun">
			<option value="dataAnalysis">历史</option>
			<option value="chargeAnalysis">充电</option>
			<option value="dischargeAnalysis">放电</option>
		</select>
		<div class="form-container">
			<div class="form-inline">
				<!--style="position: relative;"-->
				<div class="form-group yx-date-formGroup" style="position: relative;">
					时间：
					<!--<date-picker v-model="dataParam.startTime" :config="datetimeconfig"></date-picker>-->
					<input type="text" class="startDate form-control"  v-model="dataParam.startTime" />
					——
					<input type="text" class="endDate form-control"  v-model="dataParam.endTime" />
					
				</div>
				<div class="form-group stringSelect">
					<label>选择电池串：</label>
					<input class="form-control" placeholder="电池串名（id）"
						v-model="dataParam.StringIpt" v-on:keyup="stringInputFun"
						@focus="focusFun" @blur="blurFun"/>
					<!--stringNameInput-->
					<ul class="filterList">
						<li v-for="string in stringListFilter"
							v-on:click="stringSelectFun">
							{{string.StringName}}（{{string.StringNo+1}}）
						</li>
						<!--<li>abc</li>
						<li>abc</li>
						<li>abc</li>-->
					</ul>
					<!--<select class="form-control" v-model="dataParam.StringNo">
						<option v-for="string in $store.state.currentStringsMsg" 
							:value="string.StringNo">{{string.StringName}}</option>
					</select>-->
					<!--<select-component></select-component>-->
				</div>
				<div class="form-group">
					<label>快速选择：</label>
					<select class="form-control" v-model="selectedDate" v-on:change="quickSelect">
						<option value="1">最近1天</option>
						<option value="3">最近3天</option>
						<option value="7">最近7天</option>
						<option value="30">最近30天</option>
					</select>
				</div>
				<button type="submit" class="btn btn-default" v-on:click="getHistoryData">查询</button>
				<!--showOneTable=!showOneTable-->
				<!--<button class="marginLeft10 btn btn-default" v-if='historyData'
					v-on:click="tableDiagramChange">表格/图形 显示</button>-->
			</div>
		</div>
		<div class="data-displayCtrl" v-show="historyChartData.CellRes">
			<ul>
				<li>
					显示时刻数据：
					<span :class="{'checkbox-true':oneData,'checkbox-false':!oneData}">
		        		<label>
		        			<input type="checkbox" 
		        				v-bind:true-value="1"
		        				v-bind:false-value="0"
		        				v-model="oneData"/>
		        			<span>{{oneData?'是':'否'}}</span>
					</label>
					</span>
				</li>
				<li>
					显示表格：
					<input v-show="!oneData" type="checkbox" v-model="showAllTable" />
					<input v-show="oneData" type="checkbox" v-model="showOneTable" />
				</li>
				<li v-show="oneData&&historyData">
					<button class="marginLeft10 btn btn-default" v-on:click="showSummary=!showSummary">
						显示/隐藏 电池串数据
					</button>
				</li>
			</ul>
		</div>
		<div class="data-chartCtrl">
			<ul>
				<li v-if="!oneData&&!showAllTable">
					电池号：
					<input type="text" v-model="allDataChartFilter.cellNumber" />
					<input type="checkbox" v-model="allDataChartFilter.CellVol" />电压
					<input type="checkbox" v-model="allDataChartFilter.CellTemp" />温度
					<input type="checkbox" v-model="allDataChartFilter.CellRes" />内阻
					<input type="checkbox" v-model="allDataChartFilter.Current" />总电流
					<input type="checkbox" v-model="allDataChartFilter.Ripple" />纹波系数
					<input type="checkbox" v-model="allDataChartFilter.TotalVol" />总电压
					<button class="btn btn-default" v-on:click="createAllChart">确认</button>
				</li>

			</ul>
		</div>
		<div class="dataAnalysis-dataWindow logData-page" v-show="!oneData">
			<!--所有数据--表格-->
			<div class="table-responsive" v-show="showAllTable">
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>时间</th>
							<th>电池序号</th>
							<th>电压</th>
							<th>温度</th>
							<th>内阻 </th>
						</tr>
					</thead>
					<tbody v-for="item in historyData||[]" v-if="item">
						<tr v-for="cell in item.cellData">
							<td>{{item.time}}</td>
							<td>{{cell.CellNo+1}}</td>
							<td>{{cell.CellVol}}</td>
							<td>{{cell.CellTemp}}</td>
							<td>{{cell.CellRes}}</td>
						</tr>
					</tbody>
				</table>
				<no-data-component :dataArray="historyData||[]"></no-data-component>
			</div>
			<!--所有数据--图形-->
			<div id="allDataChartContainer" v-show="!showAllTable" style="min-width:400px;height:400px"></div>
		</div>
		<div class="dataAnalysis-dataWindow oneData-page" v-show="oneData">

			<div class="left-dateSelect">
				<div class="table-responsive">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th></th>
								<th>时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in historyData" v-on:click="currentItemSelect(item)" :class="{selected:currentItem==item}">
								<td>{{index+1}}</td>
								<td>{{item.time}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!--时刻数据--表格-->
			<div class="right-dataContainer tableData" v-if="showOneTable">
				<div class="table-responsive">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>电池序号</th>
								<th>电压</th>
								<th>温度</th>
								<th>内阻 </th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="currentItem" v-for="(cell,index) in currentItem.cellData">
								<td>{{cell.CellNo+1}}</td>
								<td>{{cell.CellVol}}</td>
								<td>{{cell.CellTemp}}</td>
								<td>{{cell.CellRes}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!--时刻数据--图形-->
			<div class="right-dataContainer diagramData" v-show="!showOneTable">
				<div id="oneDataChartContainer" style="min-width:400px;height:400px"></div>
			</div>
			<vue-draggable-resizable class="runStatus-summary" v-if="showSummary" v-on:dragging="onDrag" v-on:resizing="onResize" :x='400' :y='30' :w='300' :h='500' :handles="['tm']" :draggable="true">
				<span class="glyphicon glyphicon-remove-circle" v-on:click="showSummary=!showSummary"></span>
				<ul class="edit-panel">
					<li class="list-item">
						<h4 class="item-title">电池串信息：</h4>
						<ul class="item-content row">
							<li class="col-lg-12">
								<span class="item-label">串名：</span>
								<input type="text" readonly value="电池串" />
							</li>
							<li class="col-lg-12">
								<span class="item-label">串状态代码：</span>
								<input type="text" readonly v-model="currentItem.headData.StringStatus" />
							</li>
							<li class="col-lg-12">
								<span class="item-label">总电压：</span>
								<input type="text" readonly v-model="currentItem.headData.TotalVol" />
							</li>
							<li class="col-lg-12">
								<span class="item-label">总电流：</span>
								<input type="text" readonly v-model="currentItem.headData.Current" />
							</li>
							<li class="col-lg-12">
								<span class="item-label">纹波系数：</span>
								<input type="text" readonly v-model="currentItem.headData.Ripple" />
							</li>
							<li class="col-lg-12">
								<span class="item-label">电池数：</span>
								<input type="text" readonly v-model="currentItem.headData.CellNum" />
							</li>
							<li class="col-lg-12">
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
							</li>
						</ul>
					</li>
				</ul>
			</vue-draggable-resizable>
		</div>
	</div>
</template>
<script>
	import HighCharts from 'highcharts'
	import stockInit from 'highcharts/modules/stock'
	import VueDraggableResizable from 'vue-draggable-resizable'
	import noDataComponent from '../../myComponents/noDataComponent.vue';
	stockInit(HighCharts)
	export default {
		name: "dataAnalysis",
		data: function() {
			return {
				stringListFilter:[],//过滤后的电池串列表
				analysisType:'',
				allDataChartFilter: {},
				cellBased: false,
				selectedDate: 1,
				showAllTable: false,
				showOneTable: false,
				oneData: false,
				cellNum: 0, //选中的电池画图
				datetimeconfig: {
					//format: 'YYYY-MM-DD HH:mm:ss',
					format: 'YYYY-MM-DD HH:mm:ss',
					useCurrent: false,
				},
				dataParam: {
					startTime: '',
					endTime: '',
					StringNo: '',
					StringIpt:'',
					StationID: this.getLocalStorage('currentStationID'),
				},
				historyData: null,
				historyChartData: {},
				//allChartDataBasedCell:[],
				currentItem: [],
				dataItem: 'CellTemp',
				showSummary: false,
				width: 0,
				height: 0,
				x: 0,
				y: 0,
				allDataOption: {
					yAxis: [{
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
								//text: '温度',
								style: {
									color: HighCharts.getOptions().colors[0]
								}
							}
						}, {
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
								//text: '电压',
								style: {
									color: HighCharts.getOptions().colors[1]
								}
							}
						}, {
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
								//text: '内阻',
								style: {
									color: HighCharts.getOptions().colors[2]
								}
							}
						}, {
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
								//text: '总电压',
								style: {
									color: HighCharts.getOptions().colors[3]
								}
							}
						}, {
							labels: {
								format: this.value,
								style: {
									color: HighCharts.getOptions().colors[4]
								}
							},
							plotLines: [{
								value: 0,
								width: 2,
								color: 'silver'
							}],
							title: {
								//text: '总电流',
								style: {
									color: HighCharts.getOptions().colors[4]
								}
							}
						}, {
							labels: {
								format: this.value,
								style: {
									color: HighCharts.getOptions().colors[5]
								}
							},
							plotLines: [{
								value: 0,
								width: 2,
								color: 'silver'
							}],
							title: {
								//text: '纹波系数',
								style: {
									color: HighCharts.getOptions().colors[5]
								}
							}
						}, {
							labels: {
								format: this.value,
								style: {
									color: HighCharts.getOptions().colors[5]
								}
							},
							plotLines: [{
								value: 0,
								width: 2,
								color: 'silver'
							}],
							title: {
								//text: '纹波系数',
								style: {
									//color: HighCharts.getOptions().colors[5]
								}
							}
						}

					],
					credits: {
						text: 'www.yxdq.net',
						href: 'http://www.yxdq.net'
					},
					xAxis: {
						//type: 'datetime',
						//dateTimeLabelFormats: {
						//day:'%Y-%m-%d'
						//}
						type: 'datetime',
						dateTimeLabelFormats: {
							//second: '%Y-%m-%d<br/>%H:%M:%S',
							//minute: '%Y-%m-%d<br/>%H:%M',
							//hour: '%Y-%m-%d<br/>%H:%M',
							day: '%m-%d',
							month: '%Y-%m',
							year: '%Y'
						}
					},
					navigator: {
						enabled: true,
						adaptToUpdatedData: false,
						xAxis: {
							dateTimeLabelFormats: {
								day: '%m-%d',
								month: '%Y-%m',
								year: '%Y'
							}

						}
					},
					rangeSelector: {
						enabled: false

					},

					legend: {
						enabled: true
					},
					tooltip: {
						//pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
						pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
						valueDecimals: 2,
						padding: 2,
						shared: true,
						split: false,
						formatter: function() {
							//var content = '<span style="font-size: 10px;visiblity:hidden">' + this.x + '</span><br/>';
							var content = '';
							for(var i = 0; i < this.points.length; i++) {
								content += '<span style="color: ' + this.points[i].series.color + '">' + this.points[i].series.name + '</span>: ' + this.points[i].y + '<br/>';
							};
							var date = new Date(this.points[0].key);
							//content += '<span>当前时间: ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + (date.getMinutes() + 1) + ':' + (date.getSeconds() + 1) + ':' + (date.getHours() + 1) + '</span>'
							content+='<span>当前时间：'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+ ':'+date.getMinutes() + ':' + date.getSeconds()+'</span>'
							//content+='<span>当前时间：'+that.dateFormat1(this.points[0])+'</span>'
							return content;
						}
					},
					series: undefined,
				},
				oneDataOptions: {
					chart: {
						alignTicks: false
					},
					rangeSelector: {
						enabled: false
					},
					plotOptions: {
						column: {
							borderWidth: 0
						}
					},
					credits: {
						text: 'www.yxdq.net',
						href: 'http://www.yxdq.net'
					},
					navigator: {
						xAxis: {
							labels: {
								enabled: false
							}
						}
					},
					yAxis: [{
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
					}, {
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
					}, {
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
					}],
					xAxis: {
						categories: [],
						labels: {
							formatter: function() {
								return this.pos + 1 + "号"
							}
						}
					},
					legend: {
						enabled: true
					},
					title: {
						text: '时刻数据'
					},
					series: []
				},
			}
		},
		methods: {
			focusFun:function($event){
				$($event.target).next().css({display:'block'});
				this.stringInputFun();
			},
			blurFun:function($event){
				setTimeout(function(){
					$($event.target).next().css({display:'none'})
				},350)
				
			},
			stringSelectFun:function($event){
				this.dataParam.StringIpt=$($event.target).html().trim();
			},
			stringInputFun:function(){
				let that=this;
				let reg=/(?:（|\()\d*(?:）|\))?$/ig;
					
				if(this.dataParam.StringIpt){
					if(reg.test(this.dataParam.StringIpt)){
						this.stringListFilter=this.$store.state.currentStringsMsg.filter(function(str){
							return str.StringName.includes(that.dataParam.StringIpt.replace(reg,''));
						})
					}else{
						this.stringListFilter=this.$store.state.currentStringsMsg.filter(function(str){
							return str.StringName.includes(that.dataParam.StringIpt);
						})
					}
						
				}
			},
			analysisSelectFun:function(){
				this.$router.push('/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/'+this.analysisType)
			},
			getHistoryData: function() {
				let that = this;
				if(!this.dataParam.startTime||!this.dataParam.endTime||!this.dataParam.StringIpt){
					that.yxToastr.warning('请输入完整参数！' );
					return;
				}
				let reg=/(?:（|\()\d+(?:）|\))$/ig;
				let str=reg.exec(this.dataParam.StringIpt)[0];
				if(!str){
					that.yxToastr.warning('请输入正确格式电池串！' );
					return;
				}
				this.$store.commit('dataAnalysisParam',{
					selectParam:this.dataParam
				});
				
				
				this.dataParam.StringNo=str.replace(/(?:\(|\))/g,'');
				console.log(this.dataParam.StringNo)
				this.yxRequest(
					'post',
					"/platform/gethistorydata",
					this.dataParam,
					function(result) {
						that.historyData = result.data;
						that.currentItem = that.historyData[0] || [];
						that.historyChartData = that.getHistoryChartData_string(that.historyData);

						that.allDataChartFilter.cellNumber = 1;
						that.allDataChartFilter.CellVol = true;
						if(that.historyData.length){
							that.createAllChart();
						}
						
						if(that.historyData.length) {
							//that.currentItemSelect(that.historyData[0])
						}

					},
					function(result) {
						that.yxToastr.error('获取历史数据失败:' + result.msg);
						console.log('err:', result);
					})
			},
			getHistoryChartData_string: function(historyData) {
				console.log(historyData)
				if(!historyData.length) {
					return {};
				}
				let obj = {
					CellTemp: [],
					CellVol: [],
					CellRes: [],
					TotalVol: [{
						name: '总电压',
						yAxis: 0,
						data: []
					}],
					Current: [{
						name: '总电流',
						yAxis: 1,
						data: []
					}],
					Ripple: [{
						name: '纹波系数',
						yAxis: 2,
						data: []
					}]
				};

				historyData[0].cellData.forEach(function(cell, key) {
					obj.CellTemp.push({
						name: key + 1 + '号温度',
						yAxis: 3,
						data: []
					});
					obj.CellVol.push({
						name: key + 1 + '号电压',
						yAxis: 4,
						data: []
					});
					obj.CellRes.push({
						name: key + 1 + '号内阻',
						yAxis: 5,
						data: []
					});
				})
				console.log(obj)
				historyData.forEach(function(item, k) {
					obj.TotalVol[0].data.push([
						new Date(item.time).valueOf(),
						item.headData.TotalVol
					])
					obj.Current[0].data.push([
						new Date(item.time).valueOf(),
						item.headData.Current
					])
					obj.Ripple[0].data.push([
						new Date(item.time).valueOf(),
						item.headData.Ripple
					])
					item.cellData.forEach(function(cell, key) {
						
						obj.CellTemp[key].data.push([
							new Date(item.time).valueOf(),
							cell.CellTemp
						])
						obj.CellVol[key].data.push([
							new Date(item.time).valueOf(),
							cell.CellVol
						])
						obj.CellRes[key].data.push([
							new Date(item.time).valueOf(),
							cell.CellRes
						])
					})
				})
				return obj;
			},
			createOneDataChart: function() {
				HighCharts.stockChart('oneDataChartContainer', this.oneDataOptions);
			},

			createAllChart: function() {
				let that = this;
				let cellnumber = String(this.allDataChartFilter.cellNumber) ? String(this.allDataChartFilter.cellNumber).split(/,|，/) : [];
				let sonArr = [];
				for(let i = 0; i < cellnumber.length; i++) {
					if(isNaN(Number(cellnumber[i]))) {
						console.log(cellnumber[i])
						if(/\d(-|~)\d/.test(cellnumber[i])) {
							let rangeArr = cellnumber[i].split(/-|~/);
							for(let j = rangeArr[0]; j <= rangeArr[1]; j++) {
								sonArr.push(j);
							}
							cellnumber.splice(i, 1);
							i--;
						} else {
							that.yxToastr.warning('电池号输入不合法！' + cellnumber[i]);
							return;
						}
					}
				}
				cellnumber = cellnumber.concat(sonArr)
				let arr = [];
				let cellMsgList = ['CellVol', 'CellTemp', 'CellRes'];
				for(let key in this.allDataChartFilter) {
					if(this.allDataChartFilter[key] && key != 'cellNumber') {
						if(cellMsgList.includes(key)) {
							cellnumber.forEach(function(v, k) {
								
								if(that.historyChartData[key][v - 1]) {
									arr.push(that.historyChartData[key][v - 1]);
								}

							})
						} else {
							arr = arr.concat(this.historyChartData[key]);
						}

					}
				}
				this.allDataOption.series = arr;
				HighCharts.stockChart('allDataChartContainer', this.allDataOption)
			},
			currentItemSelect: function(item) {
				this.currentItem = item;
				this.oneDataOptions.series = [{
					type: 'column',
					name: '电压',
					yAxis: 0,
					data: []
				}, {
					type: 'column',
					name: '内阻',
					yAxis: 1,
					data: []
				}, {
					type: 'column',
					name: '温度',
					yAxis: 2,
					data: []
				}];
				var that = this;
				this.currentItem.cellData.forEach(function(item, key) {
					that.oneDataOptions.series[0].data.push(item.CellVol);
					that.oneDataOptions.series[1].data.push(item.CellRes);
					that.oneDataOptions.series[2].data.push(item.CellTemp);
				});
				this.createOneDataChart();
			},
			onResize: function(x, y, width, height) {
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
			},
			onDrag: function(x, y) {
				this.x = x;
				this.y = y;
			},
			quickSelect: function() {
				let date = new Date();
				this.dataParam.endTime = this.dateFormat1(new Date(date));
				this.dataParam.startTime = this.dateFormat1(new Date(date.setDate(date.getDate() - this.selectedDate)));
			},
		},
		components: {
			VueDraggableResizable,
			noDataComponent,
		},
		created() {
			let that = this;
			let dateParam=this.$store.state.dataAnalysis.selectParam;
			if(!dateParam.startTime||this.getLocalStorage('currentStationID')!=this.$store.state.dataAnalysis.selectParam.StationID){
				setTimeout(function(){
					that.quickSelect();
				},500);
			}else{
				that.dataParam=this.mycopy(dateParam);
				this.getHistoryData();
				
			}
			this.analysisType=this.$route.name;
		},
		mounted(){
			var that=this;
			$('.startDate').datetimepicker({
				showSecond: true, //显示秒  .
				timepicker:true,
	            format:'Y-m-d H:i:s',
	            timeFormat: 'hh:mm:ss', 
	            stepHour:1,
	            stepMinute:1,
	            stepSecond:1,
	            onSelectDate:function(d){
	            	that.dataParam.startTime=that.dateFormat1(d);
	            },
	            onSelectTime:function(d){
	            	that.dataParam.startTime=that.dateFormat1(d);
	            }
	        })
			$('.endDate').datetimepicker({
				showSecond: true, //显示秒  
				timepicker:true,
	            format:'Y-m-d H:i:s',
	            minDate:'',
	            onSelectDate:function(d){
	            	that.dataParam.endTime=that.dateFormat1(d);
	            },
	            onSelectTime:function(d){
	            	that.dataParam.endTime=that.dateFormat1(d);
	            }
	       })
		},
	}
</script>

<style lang="less" scoped>
	@import '../../../style/app.less';
	.collector-dataAnalysis {
		.analysisSelect{
			float:right;
		}
		.form-container {
			width: 100%;
			overflow: visible;
			.form-inline {
				min-width: 760px;
				.stringSelect{
					position: relative;
					input{
						width: 150px;
						
					}
					.filterList{
						display: none;
						position: absolute;
						z-index: 10;
						border: 1px solid #aaa;
						background: #FFFFFF;
						right: 0;
						width: 150px;
						li{
							padding: 3px;
							&:hover{
								background: @theme-color;
								color: #fff;
							}
						}
					}
					
				}
			}
		}
		.data-displayCtrl,
		.data-chartCtrl {
			padding: 5px;
			>ul:after {
				content: '';
				display: table;
				clear: both;
			}
			li {
				float: left;
				margin-right: 12px;
			}
			[class^='checkbox-'] {
				position: relative;
				bottom: 5px;
			}
			.checkbox-false {
				>label:after {
					//margin-left: 5px;
				}
			}
		}
		.dataAnalysis-dataWindow {
			//border: 1px solid red;
			position: relative;
			max-height: 430px;
			overflow: auto;
			margin-top: 6px;
			&.oneData-page {
				.left-dateSelect {
					float: left;
					width: 25%;
					min-height: 300px;
					border: 1px solid @border-color;
					max-height: 400px;
					overflow: auto;
					.selected {
						background: @active-color;
						color: #fff;
					}
				}
				.right-dataContainer {
					width: 75%;
					margin-left: 25%;
					min-height: 300px;
					border: 1px solid @border-color;
				}
			}
		}
	}
</style>