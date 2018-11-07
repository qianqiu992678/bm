<template>
<li>
	<a style="display: inline-block;width: 20px;height: 16px;">
		<span v-if="zoneCollectorItem.children&&zoneCollectorItem.children.length" 
			v-on:click="showChildrenFun" 
			:class="{glyphicon:true,
				'glyphicon-chevron-right':!zoneCollectorItem.showChildren,
				'glyphicon-chevron-down':zoneCollectorItem.showChildren}">
		</span>
	</a>
	<a :class="{glyphicon:true,
		'glyphicon-file':!zoneCollectorItem.children,
		'glyphicon-folder-open':zoneCollectorItem.children}">
		<span v-on:click="showChildrenFun">
			{{zoneCollectorItem.Zone||zoneCollectorItem.StationName}}
			<span v-if="zoneCollectorItem.children">
				（{{zoneCollectorItem.children.length}}）
			</span>
		</span>
		<span class="zone-operation" v-if="zoneCollectorItem.children" >
			<i class="glyphicon glyphicon-plus-sign" 
				v-on:click="addFun(zoneCollectorItem.id)"></i>
			<i class="glyphicon glyphicon-edit" v-on:click="getEditFun(zoneCollectorItem)"></i>
			<i class="glyphicon glyphicon-remove" v-on:click="deleteFun(zoneCollectorItem)"></i>
		</span>
	</a>
	<ul v-if="zoneCollectorItem.showChildren">
		<zone-collector-item
			:addFun='addFun'
			v-if="zoneCollectorItem.children" :deleteFun="deleteFun"
			:zoneCollectorItem="item"
			v-for="(item,index) in zoneCollectorItem.children" 
			:key="index">
		</zone-collector-item>
	</ul>
	
</li>
</template>

<script>
export default {
	name: "zoneCollectorItem",
	props: ["zoneCollectorItem","addFun","editFun","deleteFun"],
	data: function() {
		return {
			//tree:null
		}
	},
	methods:{
		showChildrenFun:function(){
			this.zoneCollectorItem.showChildren=!this.zoneCollectorItem.showChildren;
			console.log(this.zoneCollectorItem);
		},
		getEditFun:function(item){
			//console.log(item)
			//console.log(this.zoneCollectorItem);
			if(this.zoneCollectorItem.children){
				//console.log('/myapp/applicationPlatform/batteryMonitorSys/collectorEdit')
				this.$store.commit('getCurrentZone', {
					Zone:item
				})
				this.$router.push(`/myapp/systemManage/collectorsEdit/${item.id}`);
			}else{
				this.$store.commit('getCurrentStation', {
					station:item
				})
				this.setLocalStorage('currentStationID',item.StationID);
				//this.$router.push(`/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/systemDiagram/${item.StationID}`)
				this.$router.push(`/myapp/applicationPlatform/batteryMonitorSys/collectorMsgContainer/systemDiagram`)
			}
		}
	},
	created() {
		//this.addFun(1)
	},
}
</script>

<style scoped lang="less">
@import '../../style/app.less';
li{
	
	a.glyphicon:hover .zone-operation{
		display:inline-block;
	}
	//line-height:32px;
    text-align: left;
    >a{
    	padding: 4px;
    	display: inline-block;
    	.glyphicon-chevron-right,.glyphicon-chevron-down{
    		color: @active-color;
    		font-size: 18px;
    	}
    }
	>ul{
		margin-left: 20px;
	}
	>a.glyphicon{
		line-height: 26px;
		.zone-operation{
			position: relative;
			top: 3px;
			display: none;
			.glyphicon{
				
				font-size:20px;
				margin-right: 6px;
				&.glyphicon-plus-sign{
					color: @success-color;
				}
				&.glyphicon-edit{
					color: @active-color;
				}
				&.glyphicon-remove{
					color: @danger-color;
				}
				
				//&:hover{
					//color: @active-color;
				//}
			}
		}
	} 
}
</style>