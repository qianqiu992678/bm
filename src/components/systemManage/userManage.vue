<template>
	<div class="systemManage-userManage">
		<div class="yx-btn-group"><!--data-toggle="modal" data-target=".itemEditModal"-->
			<button type="button" class="btn btn-primary" v-on:click="userEditFun">添加</button>
			<button :disabled="userList.length ? false : true" 
				class="btn yx-btn-active"
				data-toggle="modal" data-target=".exportConfirmModal" v-on:click="filename=''">导出</button>

		</div>
		<div class="table-responsive">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>用户名</th>
						<th>权限</th>
						<th>手机号码</th>
						<th>是否接受报警短信</th>
						<th>密码</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in userList">
						<td>{{item.UserName}}</td>
						<td>{{item.UserLevel}}</td>
						<td>{{item.PhoneNumber}}</td>
						<td>{{item.SmsFlag}}</td>
						<td>{{item.Password}}</td>
						<td>
							<span class="hot-word" v-on:click="userEditFun(item)">编辑</span>
							<span class="danger-word" v-on:click="userDeleteFun(item.id)">删除</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="modal fade itemEditModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						新增用户
					</div>
					<div class="modal-body">
						<div class="form-horizontal">
							<div class="form-group">
								<label for="form_username" class="col-sm-2 control-label">用户名:</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="form_username" 
										placeholder="用户名" v-model="params.UserName">
								</div>
							</div>
							<div class="form-group">
								<label for="form_password" class="col-sm-2 control-label">密码:</label>
								<div class="col-sm-10">
									<input type="password" class="form-control" id="form_password" 
										placeholder="密码" v-model="params.Password">
								</div>
							</div>
							<div class="form-group">
								<label for="form_phonenumber" class="col-sm-2 control-label">手机号码:</label>
								<div class="col-sm-10">
									<input type="tel" class="form-control" id="form_phonenumber" 
										placeholder="手机号码" v-model="params.PhoneNumber">
								</div>
							</div>
							
							<div class="form-group">
								<label class="col-sm-2 control-label">权限:</label>
								<div class="col-sm-10">
									<select class="form-control"  v-model="params.UserLevel">
										  <option value="2">普通柜员</option>
										  <option value="1">管理员</option>
										  <option value="0">超级管理员</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="form_message" class="col-sm-2 control-label">接收短信:</label>
								<div class="col-sm-10">
									<span :class="{'checkbox-true':params.SmsFlag,'checkbox-false':!params.SmsFlag}">
					            		<label>
					            			<input id="form_message" type="checkbox" 
					            				v-bind:true-value="1"
					            				v-bind:false-value="0"
					            				v-model="params.SmsFlag"/>
					            			<span>{{params.SmsFlag?'是':'否'}}</span>
										</label>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn yx-btn-active" v-on:click="editUserConfirm">保存</button>
						<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade itemDeleteModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						删除用户
					</div>
					<div class="modal-body">
						确认删除用户？
					</div>
					<div class="modal-footer">
						<button type="button" class="btn yx-btn-active" v-on:click="userDeleteConfirm">确认</button>
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
//	const _SheetJSFT = [
//		"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
//		].map(function(x) { return "." + x; }).join(",");
	export default {
		name: "userManage",
		data: function() {
			return {
				testdata:false,
				params:{},
				userList:[],
				filename:'',
				//tree:null,
				//SheetJSFT: _SheetJSFT,
			}

		},
		methods: {
			getUserList: function() {
				var that=this;
				this.yxRequest(
					'get',
					"/user/userlist", 
					{},
					function(result) {
						//console.log('succ',data)
						that.userList=result.data;
						console.log(that.userList)
					},
					function(result) {
						console.log('err:',result)
						that.yxToastr.error('获取用户列表失败:'+result.msg);
				},1)
			},
			editUserConfirm:function(){
			 	let that=this;
			 	
			 	if(this.params.id){
			 		this.yxRequest(
						'post',
						"/user/useredit", 
						this.params,
						function(data) {
							that.yxToastr.success('操作成功');
							$('.itemEditModal').modal('hide');
							that.getUserList();
						},
						function(result) {
							console.log('err:',result);
							that.yxToastr.error('编辑用户失败:'+result.msg);
					})
			 	}else{
			 		this.yxRequest(
						'post',
						"/user/adduser", 
						this.params,
						function(data) {
							console.log('succ',data);
							that.yxToastr.success('操作成功');
							$('.itemEditModal').modal('hide');
							that.getUserList();
						},
						function(result) {
							console.log('err:',result);
							that.yxToastr.error('添加用户失败:'+result.msg);
					})
			 	}
					
			},
			userDeleteFun:function(id){
				this.currentId=id;
				$('.itemDeleteModal').modal('show');
			},
			userDeleteConfirm:function(){
				var that=this;
				this.yxRequest(
					'post',
					"/user/userdelete", 
					{id:this.currentId},
					function(result) {
						that.yxToastr.success('操作成功');
						$('.itemDeleteModal').modal('hide');
						that.getUserList();
					},
					function(result) {
						console.log('err:',result)
						that.yxToastr.error('删除用户失败：'+result.msg);
				})
			},
			userEditFun:function(item){
				if(item){
					this.params=JSON.parse(JSON.stringify(item));
				}else{
					this.params={UserName:'',Password:'',PhoneNumber:'',UserLevel:'',SmsFlag:0};
				}
				$('.itemEditModal').modal('show');
			},
			menuCtrl: function(newState) {
				this.$store.commit('menuChange', {
					newState: newState
				})
			},
			menuCtrl2: function(newState) {
				this.$store.commit('menuChange', {
					newState: newState
				})
			},
			rightCtrl: function(newState) {
				this.$store.commit('rightChange', {
					newState: newState
				})
			},
			rightCtrl2: function(newState) {
				this.$store.commit('rightChange', {
					newState: newState
				})
			}, //
			soeCtrl: function(newState) {
				this.$store.commit('SOEChange', {
					newState: newState
				})
			},
			soeCtrl2: function(newState) {
				this.$store.commit('SOEChange', {
					newState: newState
				})
			},
			_export(evt) {
				/* convert state to workbook */
				let arr=[['用户名','权限','手机号码','是否接收报警短信','密码']];
				this.userList.forEach(function(user,key){
					arr.push([user.UserName,user.UserLevel,user.PhoneNumber,user.SmsFlag,user.Password])
				})
				const ws = this.XLSX.utils.aoa_to_sheet(arr);
				const wb = this.XLSX.utils.book_new();
				this.XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
				/* generate file and send to client */
				this.XLSX.writeFile(wb, "sheetjs.xlsx");
			},
			dataExportConfirm:function(){
				var that=this;
				this.yxRequest(
					'post',
					"/user/userlistexport", 
					{},
					function(result) {
						var eleLink = document.createElement('a');
						eleLink.style.display = 'none';
						//eleLink.download = filename||'名字.xlsx';
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
			}
		},
		created() {
			this.$store.commit('titleChange', {
				newTitle: '用户管理'
			})
			//this.yxToastr.error('网络走神了，请稍后再试...');
			this.getUserList();
		},
	}
</script>

<style lang="less" scoped>
	.yx-btn-group {
		text-align: left;
		padding-bottom: 6px;
	}
	.checkbox-false label:after{
		margin-left: -20px;
	}
</style>