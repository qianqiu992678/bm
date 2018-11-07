<template>
	<div class="select">
		<div class="inner">
			<div class="inputWrapper">
				<input type="text" readonly 
					placeholder="请选择菜品"
					:value="selected" :click="showOptions = !showOptions">
				<span class="iconfont icon-zhankaishangxia"></span>
			</div>
			<ul class="options" v-show="showOptions">
				<li v-for="(item, index) in options" 
					:key="index"
					:click="choose(item.value)">{{item.value}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'selectComponent',
		porps:[],
		data: function() {
			return {
				options: [{
						value: '西红柿鸡蛋'
					},
					{
						value: '青椒抱鸡蛋'
					},
					{
						value: '回锅肉'
					},
					{
						value: '宫保鸡丁'
					},
					{
						value: '地三鲜'
					}
				],
				showOptions: false,
				selected: '',
			}
		},
		methods:{
			choose:function(value) {
			    this.showOptions = false
			    if (value !== this.selected) {
			      this.selected = value
			    }
		  	}
		}
	}
</script>

<style>

</style>