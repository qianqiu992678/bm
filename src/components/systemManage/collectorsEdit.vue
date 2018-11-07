<template>
<div class="applicationPlatform-collectorEdit">
	<div class="panel panel-default">
		<div class="panel-heading">
			<button type="button" class="btn btn-primary btn-sm"
				v-on:click="urlGo('/myapp/systemManage/zonesEdit')">
				<i class="glyphicon glyphicon-chevron-left"></i>
				返回
			</button>
			<h3 class="panel-title">站点配置（{{$store.state.currentZone?$store.state.currentZone.Zone:''}}）</h3>
		</div>
		<div class="panel-body">
			<div class="stationname">
				<input type="text" v-model="zoneTitle" />
				<!--$store.state.currentZone.Zone-->
				<button class="btn btn-primary" 
					v-on:click="zoneTitleEdit()">
					保存
				</button>
			</div>
			
			<button class="btn btn-default" v-on:click="stationAddFun">新增站点</button>
			<div class="table-responsive">
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>序号</th>
							<th>集中器名称</th>
							<th>集中器类型</th>
							<th>ip地址</th>
							<th>通讯端口</th>
							<th>Modbus地址</th>
							<th>子网掩码</th>
							<th>网关</th>
							<th>电源型号ID</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in stationList">
							<td>{{item.StationID}}</td>
							<td>{{item.StationName}}</td>
							<td>
								<span v-for="type in $store.state.stationTypeList" 
									v-if="type.StationTypeID==item.StationType">
									{{type.StationTypeName}}
								</span>    
							</td>
							<td>{{item.IPAddress}}</td>
							<td>{{item.Port}}</td>
							<td>{{item.ModbusAddress}}</td>
							<td>{{item.IPMask}}</td>
							<td>{{item.Gateway}}</td>
							<td>{{item.PowerType}}</td>
							<td>
								<a class="hot-word twoWordWidth" v-on:click="stationEditFun(item)">编辑</a>
								<a class="danger-word twoWordWidth" v-on:click="stationDeleteFun(item.StationID)">删除</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="panel-footer"></div>
	</div>
	<div class="modal fade stationEditModal" tabindex="-1" 
		role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					站点编辑
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						<div class="form-group">
							<label for="form_stationname" 
								class="col-sm-4 control-label">
								集中器名称:
							</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="form_stationname" 
									placeholder="集中器名称" v-model="stationObj.StationName">
							</div>
						</div>
						<div class="form-group">
							<label for="form_StationType" class="col-sm-4 control-label">集中器类型:</label>
							<div class="col-sm-8">
								<select class="form-control" id="form_StationType" v-model="stationObj.StationType">
									<option v-for="type in $store.state.stationTypeList" :value="type.StationTypeID">{{type.StationTypeName}}</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="form_IPAddress" class="col-sm-4 control-label">ip地址:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_IPAddress" 
									placeholder="ip地址" v-model="stationObj.IPAddress">
							</div>
						</div>
						<div class="form-group">
							<label for="form_Port" class="col-sm-4 control-label">通讯端口:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_Port" 
									placeholder="通讯端口" v-model="stationObj.Port">
							</div>
						</div>
						
						<div class="form-group">
							<label for="form_ModbusAddress" class="col-sm-4 control-label">Modbus地址:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_ModbusAddress" 
									placeholder="Modbus地址" v-model="stationObj.ModbusAddress">
							</div>
						</div>
						<div class="form-group">
							<label for="form_IPMask" class="col-sm-4 control-label">子网掩码:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_IPMask" 
									placeholder="子网掩码" v-model="stationObj.IPMask">
							</div>
						</div>
						<div class="form-group">
							<label for="form_Gateway" class="col-sm-4 control-label">网关:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_Gateway" 
									placeholder="网关" v-model="stationObj.Gateway">
							</div>
						</div>
						<div class="form-group">
							<label for="form_PowerType" class="col-sm-4 control-label">电源型号ID:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_PowerType" 
									placeholder="电源型号ID" v-model="stationObj.PowerType">
							</div>
						</div>
						<div class="form-group">
							<label for="form_Longitude" class="col-sm-4 control-label">经度:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_Longitude" 
									placeholder="经度" v-model="stationObj.Longitude">
							</div>
						</div>
						<div class="form-group">
							<label for="form_Latitude" class="col-sm-4 control-label">纬度:</label>
							<div class="col-sm-8">
								<input type="tel" class="form-control" id="form_Latitude" 
									placeholder="纬度" v-model="stationObj.Latitude">
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" v-on:click="stationEditConfirm">保存</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade stationDeleteConfirmModal" tabindex="-1" 
		role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					删除确认
				</div>
				<div class="modal-body">
					<div class="form-horizontal">
						确认删除？
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" v-on:click="stationDeleteConfirm(deleteID)">确定</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>

export default {
	name: 'collectorsEdit',
	data() {
		return {
			stationList:[],
			stationObj:{},
			zoneTitle:'',
		}
	},
	watch: {},
	methods: {
		getCurrentZone:function(id){
			var that=this;
			this.yxRequest(
				'get',
				"/platform/currentzone", 
				{id:id},
				function(result) {
					that.$store.commit('getCurrentZone', {
						Zone:result.data[0]
					})
					that.getStationList(result.data[0].id);
				},
				function(result) {
					that.yxToastr.error('获取currentzone失败:'+result.msg);
					console.log('err:',result);
			})
		},
		getStationList:function(ZoneID){
			var that=this;
			this.yxRequest(
				'get',
				"/platform/stationlist", 
				{ZoneID:ZoneID},
				function(result) {
					that.stationList=result.data;
				},
				function(result) {
					that.yxToastr.error('获取站点列表失败:'+result.msg);
					console.log('err:',result);
			})
		},
		stationAddFun:function(){
			this.stationObj={
				ZoneID:this.$route.params.id,
				StationName:"",StationType:"",
				IPAddress:"",Port:"",
				ModbusAddress:"",IPMask:"",
				Gateway:"",PowerType:"",
				Longitude:"",Latitude:""
			}
			$('.stationEditModal').modal('show');
		},
		stationEditFun:function(station){
			this.stationObj=this.mycopy(station);
			$('.stationEditModal').modal('show');
		},
		stationEditConfirm:function(){
			console.log(this.stationObj)
			for(let key in this.stationObj){
				if(!this.stationObj[key]){
					//this.yxToastr.warning('参数不完整！');
					//return ;
				}
			}
			
			let that=this;
			if(this.stationObj.StationID){
				this.yxRequest(
					'post',
					"/platform/stationedit", 
					this.stationObj,
					function(result) {
						console.log(result);
						that.yxToastr.success('操作成功！');
						that.getStationList(that.$store.state.currentZone.id);
						$('.stationEditModal').modal('hide');
					},
					function(result) {
						that.yxToastr.error('操作失败:'+result.msg);
						console.log('err:',result);
				})
			}else{
				this.yxRequest(
					'post',
					"/platform/stationadd", 
					this.stationObj,
					function(result) {
						that.yxToastr.success('操作成功！');
						that.getStationList(that.$store.state.currentZone.id);
						$('.stationEditModal').modal('hide');
						console.log(result);
					},
					function(result) {
						that.yxToastr.error('操作失败:'+result.msg);
						console.log('err:',result);
				})
			}
		},
		stationDeleteFun:function(stationID){
			console.log(stationID);
			this.deleteID=stationID;
			$('.stationDeleteConfirmModal').modal('show');
		},
		stationDeleteConfirm:function(StationID){
			let that=this;
			this.yxRequest(
				'post',
				"/platform/stationdelete", 
				{StationID:StationID},
				function(result) {
					that.yxToastr.success('操作成功！');
					that.getStationList(that.$store.state.currentZone.id);
					$('.stationDeleteConfirmModal').modal('hide');
				},
				function(result) {
					that.yxToastr.error('操作失败:'+result.msg);
					console.log('err:',result);
			})
		},
		zoneTitleEdit:function(){
			let that=this;
			that.$store.commit('getCurrentZoneTitle', {
				title:this.zoneTitle
			})
			
			this.yxRequest(
				'post',
				"/platform/zoneedit",
				that.$store.state.currentZone,
				function(result) {
					console.log(result);
					that.yxToastr.success('操作成功！');
					//$('.zoneEditModal').modal('hide');
					//that.getZoneList();
					
				},
				function(result) {
					that.yxToastr.error('操作失败:'+result.msg);
			})
		}
	},
	created() {
		if(!this.$store.state.currentZone){
			console.log('刷新页面单独获取currentZone')
			this.getCurrentZone(this.$route.params.id);
		}else{
			this.getStationList(this.$store.state.currentZone.id);
		}
		
		this.zoneTitle=this.$store.state.currentZone.Zone;
		console.log(this.$store.state.stationTypeList)
	},
	components:{},
	computed:{
//		zoneTitle:{
//			get:function(){
//				return this.$store.state.currentZone.Zone;
//			},
//			set:function(newValue){
//				console.log(newValue)
//			}
//		}
	}
}
</script>
<style lang="less" scoped>
@import '../../style/app.less';

.applicationPlatform-collectorEdit{
	.panel-body{
		>.btn{
			float: right;
		}
		>.table-responsive{
			margin-top: 40px;
		}
	}
	.modal-dialog{
		.modal-dialog(450px);
	}
}	
</style>