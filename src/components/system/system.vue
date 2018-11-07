<template>
	<div class="system container">
		<router-view/>
	</div>
	
</template>

<script>
export default{
	name:'system',
	data(){
		return {}
	},
	methods:{},
}
</script>

<style lang="less" scoped>
@import '../../style/app.less';
.system.container{
	width:100%;
	height:100%;
	background: lighten(@active-color,50%);
}
</style>