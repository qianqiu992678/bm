<template>
	<div class="main-container main-systemManage">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">{{pageTitle}}</h3>
			</div>
			<div class="panel-body">
				<router-view/>
			</div>
			<!--<div class="panel-footer"></div>-->
		</div>
		
	</div>
</template>

<script>
export default {
	name: "systemManage",
	data: function() {
		return {
		}
	},
	methods:{},
	computed: {
        pageTitle () {
            return this.$store.state.systemManageTitle  
        }
    },
	created(){
		//console.log(this.$route.path)
		//this.pageTitle=this.$store.state.systemManageTitle;
	},
}
</script>
<style lang="less">
	@import '../../style/app.less';
	.main-container{
		.panel-default{
		    height: 100%;
    		margin: 0;
    		.panel-body{
    			height: calc(~"100% - 35px");
    		}
		}
	}
</style>