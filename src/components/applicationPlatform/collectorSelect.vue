<template>
	<!--<router-view/>-->
	<div class="main-container main-collectorSelect">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">地区配置</h3>
			</div>
			<div class="panel-body">
				<ul class="zone-collector-list">
					<zone-collector-item
						:showChildrenFun="showChildrenFun"
						:zoneCollectorItem='item' :key="index"
						v-for="(item,index) in zoneCollectorList" >
					</zone-collector-item>
				</ul>
			</div>
			<!--<div class="panel-footer"></div>-->
		</div>
	</div>
</template>

<script>
import zoneCollectorItem from './zoneCollectorItem'
export default {
	name: 'collectorSelect',
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
	watch: {
		//'$route': 'getPath'
	},
	methods: {
		showChildrenFun:function(item){
			console.log(item);
			//this.zoneCollectorItem.showChildren=!this.zoneCollectorItem.showChildren;
			item.showChildren=!item.showChildren;
			if(!item.children){
				this.$store.commit('getCurrentStation', {
					station:item
				})
				this.setLocalStorage('currentStationID',item.StationID);
				this.$router.push(`/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/systemDiagram`)
			}
		},
		getZoneList: function() {
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
		getCollectorsFun:function(zoneList){
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
					if(that.$route.params.login==1){
						that.showChildrenFun(result.data[0])
						return;
					}
					zoneList=zoneList.concat(result.data);
					//console.log(zoneList)
					that.zoneCollectorList=that.zoneListData(zoneList);
					
					console.log(that.zoneCollectorList);
					//that.zoneCollectorList=that.fun(that.zoneCollectorList,result.data)
				},
				function(result) {	
					that.yxToastr.error('获取所有集中器列表失败:'+result.msg);
					console.log('err:',result);
			})
		},
	},
	created() {
		let that = this;
		this.getZoneList();
		//console.log(this.$route.params.login)
	},
	components:{
		zoneCollectorItem
	}
}
</script>

<style lang="less" scoped>
@import '../../style/app.less';
.main-collectorSelect{
	.zone-collector-list{
    	padding: 20px 6px;
    	.zone-operation{
    		.glyphicon{
    			font-size:22px;
    			margin-left:6px;
    			&.glyphicon-plus-sign{
    				color: @success-color;
    			}
    		}
    	}
	}
}

</style>