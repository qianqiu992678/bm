<template>
<div class="noData-omponent" v-if="dataArray&&!dataArray.length">
	暂无数据
</div>

</template>

<script>
export default {
	name: 'noDataComponent',
	props:["dataArray"],
	data: function() {
		return {}
	},
	methods:{
		
	},
	created(){
		
	}
	
}
</script>

<style>
.noData-omponent{
	padding: 6px;
	background: #aaa;
}
</style>