<template>
	<div class="systemManage-sysManage">
		<div class="yx-btn-group">
			<button type="button" class="btn btn-primary" v-on:click="itemEditFun">添加</button>
			<button :disabled="parameterList.length ? false : true" 
				class="btn yx-btn-active" 
				data-toggle="modal" data-target=".exportConfirmModal" v-on:click="filename=''">导出</button>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>参数名称</th>
						<th>参数值</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in parameterList">
						<td>{{item.ParaName}}</td>
						<td>{{item.ParaValue}}</td>
						<td>
							<a class="hot-word" v-on:click="itemEditFun(item)">编辑</a>
							<!--<a class="danger-word" v-on:click="itemDeleteFun(item)">删除</a>-->
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div class="modal fade itemEditModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						修改配置
					</div>
					<div class="modal-body">
						<ul>
							<li>
								<span>参数名：</span>
								<input type="text" v-model='editItem.ParaName' />
							</li>
							<li>
								<span>参数值：</span>
								<input type="text" v-model='editItem.ParaValue'/>
							</li>
						</ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn yx-btn-active" v-on:click="itemEditConfirm">保存</button>
						<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade itemDeleteModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						配置删除确认
					</div>
					<div class="modal-body">
						确认删除？
					</div>
					<div class="modal-footer">
						<button type="button" class="btn yx-btn-active" v-on:click="itemDeleteConfirm">保存</button>
						<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
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
	export default {
		name: "sysManage",
		data: function() {
			return {
				editItem:'',
				parameterList:[],
				filename:'',
			}
		},
		computed:{
			//viewEditItem () {
	            //return JSON.parse(JSON.stringify(this.editItem)); 
	        //}
		},
		methods: {
			getRoute: function() {
				console.log(this.$route.path);
			},
			getParamListFun:function(){
				var that=this;
				this.yxRequest(
					'get',
					"/system/getparameterlist", 
					{},
					function(result) {
						that.parameterList=result.data;
					},
					function(result) {
						console.log('err:',result);
						that.yxToastr.success('获取参数失败：'+result.msg);
				})
			},
			itemEditFun: function(item) {
				if(item){
					this.editItem=this.mycopy(item);
					this.editItem.oldName=this.editItem.ParaName;
				}else{
					this.editItem={};
				}
				$('.itemEditModal').modal()
			},
			itemEditConfirm:function(){
				var that=this;
				if(this.editItem.oldName){
					this.yxRequest(
						'post',
						"/system/parameterupdate", 
						this.editItem,
						function(result) {
							that.yxToastr.success('更新成功！');
							that.getParamListFun();
							$('.itemEditModal').modal('hide');
						},
						function(result) {
							console.log('err:',result);
							that.yxToastr.error('获取参数失败：'+result.msg);
					})
				}else{
					this.yxRequest(
						'post',
						"/system/parameteradd", 
						this.editItem,
						function(result) {
							that.yxToastr.success('添加成功！');
							that.getParamListFun();
							$('.itemEditModal').modal('hide');
						},
						function(result) {
							console.log('err:',result);
							that.yxToastr.error('获取参数失败：'+result.msg);
					})
				}	
			},
			itemDeleteFun:function(item){
				
				this.editItem=this.mycopy(item);
				console.log(this.editItem);
				$('.itemDeleteModal').modal('show')
			},
			itemDeleteConfirm:function(){
				var that=this;
				this.yxRequest(
					'post',
					"/system/parameterdelete", 
					this.editItem,
					function(result) {
						that.yxToastr.success('操作成功！');
						that.getParamListFun();
						$('.itemDeleteModal').modal('hide');
					},
					function(result) {
						console.log('err:',result);
						that.yxToastr.error('删除参数失败：'+result.msg);
				})
			},
			dataExportConfirm:function(){
				var that=this;
				this.yxRequest(
					'post',
					"/system/parameterlistexport", 
					{},
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
			this.$store.commit('titleChange', {
				newTitle: '服务器通讯参数'
			})
			this.getParamListFun();
		},
	}
</script>

<style lang="less">
	.systemManage-sysManage {
		.yx-btn-group{
		    text-align: left;
		    padding-bottom: 6px;
		}
		height: 100%;
		.modal-body{
			ul{
				li{
					padding: 6px 0;
				}
			}
		}
		
	}
</style>