<template>
	<div class="operateLog-container operateLog-optLog">
		<div class="form-inline">
			<!--<input id="datetimepicker1" type="text" />-->
			<div class="form-group yx-date-formGroup" style="position: relative;">
				<!--<date-picker v-model="optlogParam.startTime" 
					:config="dateConfig"></date-picker>-->
				<input type="text" class="startDate form-control"  v-model="optlogParam.startTime" />
				——
				<input type="text" class="endDate form-control" v-model="optlogParam.endTime"/>
					
				<!--<date-picker v-model="optlogParam.endTime" 
					:config="dateConfig"></date-picker>-->
			</div> 
			<div class="form-group">
				<label for="exampleInputName2">操作记录：</label>
				<input type="text" class="form-control" placeholder="操作记录" 
					style="width: 140px;" maxlength="8"
					v-model="optlogParam.content" >
			</div>
			<div class="form-group">
				<label for="exampleInputEmail2">用户名：</label>
				<input type="text" class="form-control" placeholder="用户名" 
					style="width: 140px;" maxlength="8" 
					v-model="optlogParam.username">
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
			
			<button type="submit" class="btn yx-btn-active" v-bind:disabled="submitting"
				v-on:click="getOptLogList(1)">{{submitting?'请求中...':'搜索'}}</button>
			<button :disabled="optlogParamCopy ? false : true" 
				class="btn yx-btn-active"
				data-toggle="modal" data-target=".exportConfirmModal" v-on:click="filename=''">导出</button>	
			
			
		</div>
		<div class="table-responsive marginTop10">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>时间</th>
						<th>操作记录</th>
						<th>用户名</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in optLogList.data">
						<td :title="item.time">{{item.time}}</td>
						<td :title="item.event">{{item.event}}</td>
						<td :title="item.name">{{item.name}}</td>
					</tr>
				</tbody> 
			</table>
			<no-data-component 
				:dataArray="optLogList.data"></no-data-component>
			<!--<div v-if="optLogList.data&&!optLogList.data.length" class="nodata-tip">
				暂无数据
			</div>-->
		</div>
		<div class="yx-paginate">
			<paginate v-if="optLogList.pageCount>1"
			  v-model="optLogList.pageNum"
			  :page-count="optLogList.pageCount"
			  :page-class="'page-item'"
			  :prev-class="'paginate-prev'"
			  :break-view-class="'paginate-view'"
			  :next-class="'paginate-next'"
			  :click-handler="paginationPageClick"
			  :prev-text="'上一页'"
			  :next-text="'下一页'"
			  :container-class="'yx-paginate'">
			</paginate>
			<span v-if="optLogList.total>0">当前显示{{optLogList.data.length}}条,共{{optLogList.total}}条</span>
		</div>
		
		<!--<vue-good-table></vue-good-table>-->
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
//import VueGoodTable from 'vue-good-table';
//console.log(VueGoodTable)
import noDataComponent from '../myComponents/noDataComponent.vue';
//import datePicker from 'vue-bootstrap-datetimepicker';
export default {
	name: "operateLogOptLog",
	data: function() {
		return {
			optlogParam:{
				startTime:'',//2018-07-01 21:46:13
				endTime:'',//2018-08-02 21:46:13
				content:'',
				username:'',
				pageNum:1,
				row:10,
			},
			dateConfig: {
				format: 'YYYY-MM-DD hh:mm:ss',
				useCurrent: false,
			}, 
			
			optLogList:{total:0,data:[],pageCount:0,},
			selectedDate:1,
			submitting:false,
			optlogParamCopy:null,
			filename:'',
		}
	},
	methods: {
		getOptLogList:function(pageNum){
			
			if(!this.optlogParam.startTime||!this.optlogParam.endTime){
				this.yxToastr.warning('起始截止日期必填！');
				return;
			}
			if(!this.dateTimeValidate(this.optlogParam.startTime)||!this.dateTimeValidate(this.optlogParam.endTime)){
				this.yxToastr.warning('请检查日期格式！');
				console.log(this.optlogParam)
				return;
			}
			this.submitting=true;
			this.optlogParam.pageNum=pageNum;
			console.log('更新store');
			this.$store.commit('operateLogOptLogParam',{
				dateParam:this.optlogParam
			})
			var that=this;
			this.yxRequest(
				'post',
				"/operatelog/getoptlog", 
				this.optlogParam,
				function(result) {
					that.optlogParamCopy=that.optlogParam;
					that.optLogList=result.data;
					
					that.submitting=false;
				},
				function(result) {
					console.log('err:',result);
					that.submitting=false;
					that.yxToastr.error('获取操作记录失败：'+result.msg);
			})
		},
		paginationPageClick:function(pageNum){
			this.getOptLogList(pageNum);
		},
		quickSelect:function(){
			//console.log(this.selectedDate);
			let date=new Date();
			this.optlogParam.endTime=this.dateFormat1(new Date(date));
			this.optlogParam.startTime=this.dateFormat1(new Date(date.setDate(date.getDate()-this.selectedDate)));
		},
		dataExportConfirm:function(){
			var that=this;
			this.yxRequest(
				'post',
				"/operatelog/operatelogexport", 
				this.optlogParamCopy,
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
	computed: {},
	created() {
		let that=this;
		//console.log(this.$store.state.operateLogOptLog.dateParam);
		let dateParam=this.$store.state.operateLogOptLog.dateParam;
		
		if(!dateParam.startTime){
			setTimeout(function(){
				that.quickSelect();
			},500);
		}else{
			that.optlogParam=this.mycopy(dateParam);
			this.getOptLogList(this.optlogParam.pageNum);
		}
			
		
	},
	mounted(){
		var that=this;
		$('.startDate').datetimepicker({
            showSecond: true, //显示秒  
            format:'Y-m-d H:i:s',
            onSelectDate:function(d){
            	that.optlogParam.startTime=that.dateFormat1(d);
            },
            onSelectTime:function(d){
            	that.optlogParam.startTime=that.dateFormat1(d);
            }
        })
		$('.endDate').datetimepicker({
            showSecond: true, //显示秒  
            format:'Y-m-d H:i:s',
            onSelectDate:function(d){
            	that.optlogParam.endTime=that.dateFormat1(d);
            },
            onSelectTime:function(d){
            	that.optlogParam.endTime=that.dateFormat1(d);
            }
       })
	},
	components: {
		noDataComponent,
//		datePicker
	}
}
</script>

<style lang="less" scoped>
@import '../../style/app.less';
	.operateLog-optLog {
		padding: 6px;
		.form-inline {
			text-align: left;
		}
	}
</style>