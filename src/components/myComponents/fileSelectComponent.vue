<template>
<li>
	
	<span :class="{'folder-item':true}"
		v-on:click="fileSelectFun(folderItem)">
		<a>{{folderItem.name}}</a>
		<!--<span :class="{glyphicon:true,'glyphicon-chevron-right':!folderItem.showChildren,'glyphicon glyphicon-chevron-down':folderItem.showChildren}" 
			v-on:click="folderOpenClose"></span>-->
	</span>
	<ul class="menuListSelect" v-if="!folderItem.isFile&&folderItem.children.length">
		<!--{{folderItem.children}}-->
		<!--<li v-for="(item,key) in folderItem.children">{{item.name}}</li>-->
		<file-select-component v-for="(item,key) in folderItem.children" 
			:fileChange="fileChange" :folderItem="item" :key='key'>
		</file-select-component>
	</ul>
</li>

 
</template>

<script>
/**
 * props:
 * folderItem:当前组件显示的文件夹
 * */

export default {
	name: 'fileSelectComponent',
	props:["folderItem","fileChange"],
	data: function() {
		return {}
	},
	beforeCreate: function () {
    // 官方文档给出的是require
    // this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
    // 在基于vue-cli@2.8.1按照上面的写法还是会报错
    // Failed to mount component: template or render function not defined.
    // 所以我们应该改为基于es6的写法异步加载一个组件如下
      //this.$options.components.fileSelectComponent = () => import('./fileSelectComponent.vue')
   },
	methods:{
		fileSelectFun:function(item){
			//console.log(item)
			if(item.isFile){
				this.fileChange(item.url);
			}
		}
	},
	created(){
		//console.log(this.folderItem)
	},
	components:{
		//fileSelectComponent
	}
}
</script>

<style lang="less" scoped>
@import '../../style/app.less';
.menuListSelec{
	text-align: left;
}
</style>