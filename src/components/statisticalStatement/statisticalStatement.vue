<template>
<div class="main-container main-statisticalStatement">
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
	name: "statisticalStatement",
	data: function() {
		return {
			//tree:null
		}
	},
	computed: {
        pageTitle () {
            return this.$store.state.systemManageTitle  
        }
    },
	methods:{
		
	},
	created() {
		
	},
}
</script>

<style>
</style>