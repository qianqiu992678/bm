<template>
<div class="collector-alarmAnalysis">
	<div class="form-inline"><!--style="position: relative;"-->
		<div class="form-group yx-date-formGroup" style="position: relative;">
			起始时间：
			<input type="text" class="startDate form-control"  v-model="dataParam.startTime" />
			结束时间：
			<input type="text" class="endDate form-control" v-model="dataParam.endTime"/>
		</div>
		<div class="form-group numSelect">
			<label>告警代码：</label>
				 
			<span class="form-control" style="width:150px">{{alarmNumSelect}}</span>
			<ul>
				<li v-for="alarm in alarmNum" :class="{selected:alarm.isChecked}"
					v-on:click="alarm.isChecked=!alarm.isChecked">
					<span>{{alarm.number}}</span>
				</li>
			</ul>
		</div>
		<div class="form-group">
			<label>快速选择：</label>
			<select class="form-control" v-model="selectedDate" 
				v-on:change="quickSelect">
				<option value="1">最近1天</option>
				<option value="3">最近3天</option>
				<option value="7">最近7天</option>
				<option value="30">最近30天</option>
			</select>
		</div>
		
		<button type="submit" class="btn btn-default" v-on:click="getAlarmHistory(1)">查询</button>
		<button :disabled="dataParamCopy ? false : true" 
				class="btn yx-btn-active" 
				 data-toggle="modal" 
				data-target=".exportConfirmModal" 
				v-on:click="filename=''">导出</button>	
	</div>
	<div class="table-responsive marginTop10">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>设备序号</th>
					<th>告警装置</th>
					<th>记录产生时间</th>
					<th>电压记录数据</th>
					<th>内阻记录数据</th>
					<th>告警代码</th>
					<th>告警内容 </th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="alarm in alarmHistory.data">
					<td>{{alarm.DevNo}}</td>
					<td>{{alarm.DevType}}</td>
					<td>{{alarm.WarnTime}}</td>
					<td>
						<a v-if="alarm.VolFlag==1" v-on:click="searchVolMsg(alarm.ID)">查看</a>
						<span v-if="alarm.VolFlag==0">--</span>
					</td>
					<td>
						<a v-if="alarm.ResFlag==1">查看</a>
						<span v-if="alarm.ResFlag==0">--</span>
					</td>
					<td>{{alarm.WarnTypeID}}</td>
					<td>{{alarm.Content}}</td>
				</tr>
			</tbody>
		</table>
		<no-data-component 
			:dataArray="alarmHistory.data">
		</no-data-component>
	</div>
	<div class="yx-paginate">
		<paginate v-if="alarmHistory.pageCount>1"
		  v-model="alarmHistory.pageNum"
		  :page-count="alarmHistory.pageCount"
		  :page-class="'page-item'"
		  :prev-class="'paginate-prev'"
		  :break-view-class="'paginate-view'"
		  :next-class="'paginate-next'"
		  :click-handler="paginationPageClick"
		  :prev-text="'上一页'"
		  :next-text="'下一页'"
		  :container-class="'yx-paginate'">
		</paginate>
		<span v-if="alarmHistory.total>0">当前显示{{alarmHistory.data.length}}条,共{{alarmHistory.total}}条</span>
	</div>
	<div class="modal fade alarmVolMsgModal" tabindex="-1" 
		role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					电压信息
				</div>
				<div class="modal-body">
					<ul class="edit-panel">
						<li class="list-item">
							<!--<h4 class="item-title">
								MODBUS通讯设备配置信息
							</h4>-->
							<ul class="item-content row">
								<li class="col-lg-4 col-md-6">
									<span class="item-label">总电压(V)：</span>
									<input type="text" v-model="currentAlarmVolMsg.stringData.TotalVol"/>
								</li>
								<li class="col-lg-4 col-md-6">
									<span class="item-label">总电流(A)：</span>
									<input type="text" v-model="currentAlarmVolMsg.stringData.Current" />
								</li>
								<li class="col-lg-4 col-md-6">
									<span class="item-label">纹波系数：</span>
									<input type="text" v-model="currentAlarmVolMsg.stringData.Ripple" />
								</li>
								
								<li class="col-lg-4 col-md-6">
									<span class="item-label">电池数量：</span>
									<input type="text" v-model="currentAlarmVolMsg.stringData.CellNum" />
								</li>
							</ul>
						</li>
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th>电池序号</th>
									<th>电池电压</th>
									<th>电池温度</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="cell in currentAlarmVolMsg.cellData">
									<td>{{cell.CellNo}}</td>
									<td>{{cell.CellVol}}</td>
									<td>{{cell.CellTemp}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade alarmResMsgModal" tabindex="-1" 
		role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					内阻信息
				</div>
				<div class="modal-body">
					<ul class="edit-panel">
						<li class="list-item">
							<ul class="item-content row">
								<li class="col-lg-4 col-md-6">
									<span class="item-label">总电压(V)：</span>
									<input type="text" v-model="currentAlarmResMsg.stringData.TotalVol"/>
								</li>
								<li class="col-lg-4 col-md-6">
									<span class="item-label">总电流(A)：</span>
									<input type="text" v-model="currentAlarmResMsg.stringData.Current" />
								</li>
								<li class="col-lg-4 col-md-6">
									<span class="item-label">纹波系数：</span>
									<input type="text" v-model="currentAlarmResMsg.stringData.Ripple" />
								</li>
								
								<li class="col-lg-4 col-md-6">
									<span class="item-label">电池数量：</span>
									<input type="text" v-model="currentAlarmResMsg.stringData.CellNum" />
								</li>
							</ul>
						</li>
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th>电池序号</th>
									<th>电池内阻</th>
									<th>内阻变化率</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="cell in currentAlarmResMsg.cellData">
									<td>{{cell.CellNo}}</td>
									<td>{{cell.CellRes}}</td>
									<td>{{cell.CellResRate}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade exportConfirmModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					文件名：
				</div>
				<div class="modal-body">
					<input type="text" v-model="filename"/>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" v-on:click="dataExportConfirm">确认</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import noDataComponent from '../../myComponents/noDataComponent.vue';
import datePicker from 'jquery-datetimepicker';
export default {
	name: "alarmAnalysis",
	data: function() {
		return {
			datetimeconfig: {
				format: 'YYYY-MM-DD HH:mm:ss',
				useCurrent: false,
			},
			dataParam:{
				startTime:'',
				endTime:'',
				pageNum:1,
				WarnTypeID:'',
				row:10,
				StationID:this.getLocalStorage('currentStationID')
			},
			alarmHistory:{data:[],total:0,pageCount:0},
			currentAlarmVolMsg:{stringData:{},cellData:[]},
			currentAlarmResMsg:{stringData:{},cellData:[]},
			selectedDate:1,
			submitting:false,
			dataParamCopy:null,
			filename:'',
			alarmNum:[
				{number:324,isChecked:false},
				{number:325,isChecked:false},
				{number:326,isChecked:false},
				{number:327,isChecked:false},
			],
		}
	},
	methods:{
		getAlarmHistory:function(pageNum){
			if(!this.dataParam.startTime||!this.dataParam.endTime){
				this.yxToastr.warning('起始截止日期必填！');
				return;
			}
			if(!this.dateTimeValidate(this.dataParam.startTime)||!this.dateTimeValidate(this.dataParam.endTime)){
				this.yxToastr.warning('请检查日期格式！');
				console.log(this.dataParam)
				return;
			}
			
			this.dataParam.WarnTypeID=this.alarmNumSelect;
			this.$store.commit('alarmAnalysisParam',{
				dataParam:this.dataParam
			})
			this.submitting=true;
			this.dataParam.pageNum=pageNum;
			var that=this;
			this.yxRequest(
				'post',
				"/platform/getalarmhistory", 
				this.dataParam,
				function(result) {
					that.dataParamCopy=that.dataParam;
					//console.log(result.data);
					that.alarmHistory=result.data;
				},
				function(result) {
					that.yxToastr.error('获取告警历史记录失败:'+result.msg);
					console.log('err:',result);
			})
		},
		searchVolMsg:function(id){
			$('.alarmVolMsgModal').modal('show');
			var that=this;
			that.currentAlarmVolMsg={stringData:{},cellData:[]};
			this.yxRequest(
				'get',
				"/platform/getalarmvol", 
				{WarnID:id},
				function(result) {
					that.currentAlarmVolMsg=result.data;
				},
				function(result) {
					that.yxToastr.error('获取电压失败:'+result.msg);
					console.log('err:',result);
			})
		},
		searchResMsg:function(id){
			$('.alarmResMsgModal').modal('show');
			var that=this;
			that.currentAlarmResMsg={stringData:{},cellData:[]};
			this.yxRequest(
				'get',
				"/platform/getalarmres", 
				{WarnID:id},
				function(result) {
					that.currentAlarmResMsg=result.data;
				},
				function(result) {
					that.yxToastr.error('获取内阻失败:'+result.msg);
					console.log('err:',result);
			})
		},
		quickSelect:function(){
			//console.log(this.selectedDate);
			let date=new Date();
			this.dataParam.endTime=this.dateFormat1(new Date(date));
			this.dataParam.startTime=this.dateFormat1(new Date(date.setDate(date.getDate()-this.selectedDate)));
		},
		paginationPageClick:function(pageNum){
			this.getAlarmHistory(pageNum);
		},
		dataExportConfirm:function(){
			var that=this;
			this.yxRequest(
				'post',
				"/platform/alarmhistoryexport", 
				this.dataParamCopy,
				function(result) {
					var eleLink = document.createElement('a');
					eleLink.style.display = 'none';
					if(that.filename.substr(that.filename.length-5,5)!='.xlsx'){
						that.filename+='.xlsx';
					}
					eleLink.href = that.config.requestIp+result.data.url+'/'+that.filename;
					document.body.appendChild(eleLink);
					eleLink.click();
					document.body.removeChild(eleLink);	
					$('.exportConfirmModal').modal('hide');
				},
				function(result) {
					console.log('err:',result)
					that.yxToastr.error('失败：'+result.msg);
			})
		},
	},
	created() {
		let that=this;
		let dateParam=this.$store.state.alarmAnalysis.dataParam;
		if(!dateParam.startTime||this.getLocalStorage('currentStationID')!=this.$store.state.alarmAnalysis.dataParam.StationID){
			setTimeout(function(){
				that.quickSelect();
			},500);
		}else{
			that.dataParam=this.mycopy(dateParam);
			console.log(that.dataParam.WarnTypeID);
			that.dataParam.WarnTypeID.split(',').forEach(function(item){
				that.alarmNum.filter(function(a){
					return a.number==item
				})[0].isChecked=true;
			})
			that.getAlarmHistory(that.dataParam.pageNum);
		}
	},
	mounted(){
		var that=this;
		$('.startDate').datetimepicker({
            showSecond: true, //显示秒  
            format:'Y-m-d H:i:s',
            onSelectDate:function(d){
            	that.dataParam.startTime=that.dateFormat1(d);
            },
            onSelectTime:function(d){
            	that.dataParam.startTime=that.dateFormat1(d);
            }
        })
		$('.endDate').datetimepicker({
            showSecond: true, //显示秒  
            format:'Y-m-d H:i:s',
            onSelectDate:function(d){
            	that.dataParam.endTime=that.dateFormat1(d);
            },
            onSelectTime:function(d){
            	that.dataParam.endTime=that.dateFormat1(d);
            }
       })
	},
	
	components: {
		noDataComponent,
	},
	computed:{
		alarmNumSelect(){
			let str='';
			this.alarmNum.filter(function(alarm){
				return alarm.isChecked;
			}).forEach(function(item,key){
				str+=item.number+',';
			})
			str=str.substring(0,str.length-1);
			return str;
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../style/app.less';

.collector-alarmAnalysis{
	.form-inline{
		.numSelect{
			position: relative;
			>ul{
				display: none;
				position: absolute;
			    background: #fff;
			    right: 0;
			    width: 150px;
			    border: 1px solid #aaa;
			    li.selected{
			    	background:lighten(@theme-color,20%);
			    	
			    }
			}
			&:hover{
				>ul{
					display: block;
				}
			}
				
		}
	}
}

</style>