<template>
<li>
	<a style="display: inline-block;width: 20px;height: 16px;">
		<span v-if="zoneCollectorItem.children&&zoneCollectorItem.children.length" 
			v-on:click="showChildrenFun(zoneCollectorItem)" 
			:class="{glyphicon:true,
				'glyphicon-chevron-right':!zoneCollectorItem.showChildren,
				'glyphicon-chevron-down':zoneCollectorItem.showChildren}">
		</span>
	</a>
	<a :class="{glyphicon:true,'glyphicon-file':!zoneCollectorItem.children,'glyphicon-folder-open':zoneCollectorItem.children}" 
		v-on:click="showChildrenFun(zoneCollectorItem)">
		 <!--v-on:click="getEditFun(zoneCollectorItem)"-->
		<span>
			{{zoneCollectorItem.Zone||zoneCollectorItem.StationName}}
			<span v-if="zoneCollectorItem.children">
				（{{zoneCollectorItem.children.length}}）
			</span>
		</span>
	</a>
	<ul v-if="zoneCollectorItem.showChildren">
		<zone-collector-item
			v-if="zoneCollectorItem.children"
			:showChildrenFun="showChildrenFun"
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
	props: ["zoneCollectorItem","showChildrenFun"],
	data: function() {
		return {
			//tree:null
		}
	},
	methods:{},
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
				
			}
		}
	} 
}
</style>