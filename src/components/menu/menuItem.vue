<template>
	<li>
		<a v-on:click="menuItemClick(tree)" :class="{active:$route.path.includes(tree.identification)}">
			<i :class="tree.icon?tree.icon:'glyphicon glyphicon-cog'"></i>
			{{tree.label}}
			<span v-if="tree.children&&!tree.isShow" class="glyphicon glyphicon-chevron-right"></span>
			<span v-if="tree.children&&tree.isShow" class="glyphicon glyphicon-chevron-down"></span>
		</a>
		
		<ul v-if="tree.isShow">
			<menu-item v-if="tree.children" :tree="item" 
				v-for="(item,index) in tree.children" :key="index"
				:class="item.test==2?'test2':'test3'">
			</menu-item>
		</ul>
	</li>
</template>
<style lang="less" scoped>
	@import '../../style/app.less';
	ul {
		li {
			text-align: left;
			padding-left: 15px;
			>a {
				display: inline-block;
				width: 100%;
				padding: 6px;
				border-bottom: 1px solid @border-color;
				margin-top:3px;
				background: linear-gradient(#aaa, #eee);
				&:hover {
					background: linear-gradient(@active-color, lighten(@active-color,20%));
					color: #fff;
				}
				&.active{
					background: linear-gradient(@active-color, lighten(@active-color,20%));
					color: #fff;
				}
				>span{
					float: right;
				}
			}
		}
		list-style: none;
	}
</style>
<script>
	export default {
		name: "menuItem",
		props: ["tree"],
		data: function() {
			return {
				//tree:null
			}
		},
		methods:{
			menuItemClick:function(tree){
				//console.log(tree.url)
				if(tree.children){
					tree.isShow=!tree.isShow;
				}else{
					this.$router.push(tree.url)
				}
				
			}
		},
		created() {
			//console.log(this.tree);
			//this.tree=this._props.tree;
		},
	}
</script>