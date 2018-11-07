<template>
	<!--<router-view/>-->
	<div class="main-container main-zonesEdit">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">地区配置</h3>
			</div>
			<div class="panel-body">
				<div class="btn-list">
					<button class="btn btn-primary" v-on:click="zoneAddFun(0)">添加地区</button>
				</div>
				<ul class="zone-collector-list">
					<zone-collector-item :addFun="zoneAddFun" :deleteFun="zoneDeleteFun"
						:zoneCollectorItem='item' :key="index"
						v-for="(item,index) in zoneCollectorList" >
					</zone-collector-item>
				</ul>
			</div>
			<!--<div class="panel-footer"></div>-->
		</div>
		<div class="modal fade zoneEditModal" tabindex="-1" role="dialog" 
			aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						编辑
					</div>
					<div class="modal-body">
						<div class="form-horizontal">
							<div class="form-group">
								<label for="form_phonenumber" class="col-sm-4 control-label">地区名称:</label>
								<div class="col-sm-8">
									<input type="tel" class="form-control" id="form_phonenumber" 
										placeholder="地区名称" v-model="editZone.Zone">
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary"
							v-on:click="zoneEditConfirmFun">保存</button>
						<button type="button" class="btn btn-danger" data-dismiss="modal">
							取消</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade zoneDeleteConfirmModal" tabindex="-1" role="dialog" 
			aria-labelledby="mySmallModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						删除确认
					</div>
					<div class="modal-body">
						确认删除？
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary"
							v-on:click="zoneDeleteConfirm">保存</button>
						<button type="button" class="btn btn-danger"
							 data-dismiss="modal">
							取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import zoneCollectorItem from './zoneCollectorItem'
export default {
	name: 'zonesEdit',
	data() {
		return {
			websock: null,
			/**
			 * zoneCollectorList数据结构说明
			 * showChldren:页面根据这个字段判断子地区是否显示
			 * children:为null则判断为集中器，为[]则判断为地区
			 * */
			zoneCollectorList:[],
			editZone:{},
		}
	},
	methods: {
		getZoneList: function() {//获取区域列表
			var that=this;
			this.yxRequest(
				'get',
				"/platform/zonelist",
				{},
				function(result) {
					that.getCollectorsFun(result.data);
					//console.log(that.zoneCollectorList);
				},
				function(result) {
					that.yxToastr.error('获取地区列表失败:'+result.msg);
					console.log('err:',result);
			})
		},
		zoneListData:function(originData){
			let that=this;
			let arr=[];
			for(let i=0;i<originData.length;i++){
				if(originData[i].Zone){
					originData[i].children=[];
					originData[i].showChildren=false;
					if(originData[i].parentid==0){
						arr.push(originData[i]);
						originData.splice(i,1);
						i--;
					}
				}
					
			}
			if(originData.length){
				arr=that.forOriginData(arr,originData).arr;
			}
			return arr;
		},
		forOriginData:function(arr,originData){
			let that=this;
			for(let i=0;i<originData.length;i++){
				for(let j=0;j<arr.length;j++){
					if(originData.length){
						if(arr[j].id==originData[i].parentid){
							arr[j].children.push(originData[i]);
							originData.splice(i,1);
							i--;
							if(!originData.length){
								return {arr:arr,originData:[]}
							}
							break;
						};
						if(arr[j].children&&arr[j].children.length&&originData.length){
							let r=that.forOriginData(arr[j].children,originData);
							arr[j].children=r.arr;
							originData=r.originData;
						}
					}else{
						break;
					}
				}
			}
			if(originData.length){
				return {arr:arr,originData:originData};
			}else{
				return {arr:arr,originData:[]};
			}
		},
		getCollectorsFun:function(zoneList){//获取集中器列表
			let that=this;
			this.yxRequest(
				'get',
				"/platform/stationlist", 
				{},
				function(result) {
					//console.log(result.data);
					
					result.data.forEach(function(collector){
						collector.children=null;
						collector.parentid=collector.ZoneID;
						//that.zoneCollectorList=that.findParentZone(that.zoneCollectorList,collector)
					})
					zoneList=zoneList.concat(result.data);
					//console.log(zoneList)
					that.zoneCollectorList=that.zoneListData(zoneList);
					//console.log(that.zoneCollectorList);
					//that.zoneCollectorList=that.fun(that.zoneCollectorList,result.data)
				},
				function(result) {	
					that.yxToastr.error('获取所有集中器列表失败:'+result.msg);
					console.log('err:',result);
			})
		},
		zoneAddFun:function(parentid){
			this.editZone={parentid:parentid};
			$('.zoneEditModal').modal('show');
		},
		zoneEditFun:function(zone){
			this.editZone=this.mycopy(zone);
			$('.zoneEditModal').modal('show');
		},
		zoneEditConfirmFun:function(){
			var that=this;
			if(this.editZone.id){
				
			}else{
				this.yxRequest(
					'post',
					"/platform/zoneadd", 
					this.editZone,
					function(result) {
						console.log(result);
						that.yxToastr.success('操作成功！');
						$('.zoneEditModal').modal('hide');
						that.getZoneList();
					},
					function(result) {
						that.yxToastr.error('操作失败:'+result.msg);
				})
			}
		},
		zoneDeleteFun:function(zone){
			console.log(zone.id);
			if(zone.children.length){
				this.yxToastr.warning('有子元素的项目不可以删除！');
				return;
			}
			this.deleteId=zone.id;
			$('.zoneDeleteConfirmModal').modal('show');
		},
		zoneDeleteConfirm:function(){
			var that=this;
			this.yxRequest(
				'post',
				"/platform/zonedelete", 
				{id:this.deleteId},
				function(result) {
					console.log(result);
					that.yxToastr.success('操作成功！');
					$('.zoneDeleteConfirmModal').modal('hide');
					that.getZoneList();
				},
				function(result) {
					that.yxToastr.error('操作失败:'+result.msg);
			})
		},
	},
	created() {
		let that = this;
		this.getZoneList();
		console.log(this._data,this)
	},
	components:{
		zoneCollectorItem
	}
}
</script>
<style lang="less" scoped>
@import '../../style/app.less';
.main-zonesEdit{
	.btn-list{
		.btn{
			float: right;
		}
	}
	.zone-collector-list{
		//border:1px solid red;
		//width: 40%;
    	padding: 20px 6px;
    	
	}
}

</style>