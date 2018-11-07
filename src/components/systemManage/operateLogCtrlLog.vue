<template>
<div class="operateLog-container operateLog-ctrlLog">
	<div class="form-inline">
		<div class="form-group yx-date-formGroup" style="position: relative;">
			<!--<date-picker v-model="ctrllogParam.startTime" :config="dateConfig"></date-picker>
			——
			<date-picker v-model="ctrllogParam.endTime" :config="dateConfig"></date-picker>-->
			<input type="text" class="startDate form-control"  v-model="ctrllogParam.startTime" />
			——
			<input type="text" class="endDate form-control" v-model="ctrllogParam.endTime"/>
		</div>
		<div class="form-group">
			<label for="exampleInputName2">操作记录：</label>
			<input type="text" class="form-control" placeholder="操作记录"
				style="width: 140px;"
				maxlength="8" v-model="ctrllogParam.content">
		</div>
		<div class="form-group">
			<label for="exampleInputEmail2">用户名：</label>
			<input type="text" class="form-control" placeholder="用户名"
				style="width: 140px;"
				maxlength="8" v-model="ctrllogParam.username">
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
		<button type="submit" class="btn yx-btn-active" v-on:click="getCtrlLogList(1)">搜索</button>
		<button :disabled="ctrllogParamCopy ? false : true" 
				class="btn yx-btn-active" data-toggle="modal" 
				data-target=".exportConfirmModal" 
				v-on:click="filename=''">导出</button>	
	</div>
	<div class="table-responsive marginTop10">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<!--<th>集中器名称</th>-->
					<th>时间</th>
					<th>操作记录</th>
					<th>用户名</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in ctrlLogList.data">
					<!--<td>集中器</td>-->
					<td>{{item.OperateTime}}</td>
					<td>{{item.OperateInfo}}</td>
					<td>{{item.UserName}}</td>
				</tr>
			</tbody>
		</table>
		<no-data-component :dataArray="ctrlLogList.data">
		</no-data-component>
	</div>
	<div class="yx-paginate">
		<paginate v-if="ctrlLogList.pageCount>1"
		  v-model="ctrlLogList.pageNum"
		  :page-count="ctrlLogList.pageCount"
		  :page-class="'page-item'"
		  :prev-class="'paginate-prev'"
		  :break-view-class="'paginate-view'"
		  :next-class="'paginate-next'"
		  :click-handler="paginationPageClick"
		  :prev-text="'上一页'"
		  :next-text="'下一页'"
		  :container-class="'yx-paginate'">
		</paginate>
		<span v-if="ctrlLogList.total>0">当前显示{{ctrlLogList.data.length}}条,共{{ctrlLogList.total}}条</span>
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
import noDataComponent from '../myComponents/noDataComponent.vue';
export default {
	name: "operateLogCtrlLog",
	data: function() {
		return {
			dateConfig: {
				format: 'YYYY-MM-DD HH:mm:ss',
				useCurrent: false,
			},
			ctrllogParam:{
				startTime:'',
				endTime:'',
				content:'',
				username:'',
				pageNum:1,
				row:10,
			},
			ctrlLogList:{total:0,data:[],pageCount:0},
			selectedDate:1,
			ctrllogParamCopy:null,
			filename:'',
		}
	},
	methods:{
		getCtrlLogList:function(pageNum){
			if(!this.ctrllogParam.startTime||!this.ctrllogParam.endTime){
				this.yxToastr.warning('起始截止日期必填！');
				return;
			}
			if(!this.dateTimeValidate(this.ctrllogParam.startTime)||!this.dateTimeValidate(this.ctrllogParam.endTime)){
				console.log(this.ctrllogParam)
				this.yxToastr.warning('请检查日期格式！');
				return;
			}
			this.ctrllogParam.pageNum=pageNum;
			this.$store.commit('operateLogCtrlLogParam',{
				dateParam:this.ctrllogParam
			})
			var that=this;
			this.yxRequest(
				'post',
				"/operatelog/getctrllog", 
				this.ctrllogParam,
				function(result) {
					that.ctrlLogList=result.data;
					that.ctrllogParamCopy=that.ctrllogParam;
					//if(that.ctrlLogList.data.length==0){
						//that.yxToastr.warning('暂无数据！');
					//}
					//console.log('succ',that.ctrlLogList)
				},
				function(result) {
					console.log('err:',result);
					that.yxToastr.error('获取操作记录失败：'+result.msg);
			})
		},
		paginationPageClick:function(pageNum){
			this.getCtrlLogList(pageNum);
		},
		quickSelect:function(){
			//console.log(this.selectedDate);
			let date=new Date();
			this.ctrllogParam.endTime=this.dateFormat1(new Date(date));
			this.ctrllogParam.startTime=this.dateFormat1(new Date(date.setDate(date.getDate()-this.selectedDate)));
		},
		dataExportConfirm:function(){
			var that=this;
			this.yxRequest(
				'post',
				"/operatelog/ctrllogexport", 
				this.ctrllogParamCopy,
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
	created(){
		let that=this;
		let dateParam=this.$store.state.operateLogCtrlLog.dateParam;
		
		if(!dateParam.startTime){
			setTimeout(function(){
				that.quickSelect();
			},500);
		}else{
			that.ctrllogParam=this.mycopy(dateParam);
			this.getCtrlLogList(this.ctrllogParam.pageNum);
		}
	},
	mounted(){
		var that=this;
		$('.startDate').datetimepicker({
            showSecond: true, //显示秒  
            format:'Y-m-d H:i:s',
            onSelectDate:function(d){
            	that.ctrllogParam.startTime=that.dateFormat1(d);
            },
            onSelectTime:function(d){
            	that.ctrllogParam.startTime=that.dateFormat1(d);
            }
        })
		$('.endDate').datetimepicker({
            showSecond: true, //显示秒  
            format:'Y-m-d H:i:s',
            onSelectDate:function(d){
            	that.ctrllogParam.endTime=that.dateFormat1(d);
            },
            onSelectTime:function(d){
            	that.ctrllogParam.endTime=that.dateFormat1(d);
            }
       })
	},
	components: {
		noDataComponent,
	}
}
</script>

<style lang="less" scoped>
@import '../../style/app.less';
	.operateLog-ctrlLog {
		padding: 6px;
		.form-inline {
			text-align: left;
		}
	}
</style>