<template>
<div class="window-right">
	<div class="panel panel-default">
		<div class="panel-heading">
			<span class="glyphicon glyphicon-chevron-right"
				v-on:click="rightShowHideFun"
				v-if="showRight"
				title="ctrl+r"></span>
			<span class="glyphicon glyphicon-chevron-left"
				v-on:click="rightShowHideFun"
				v-if="!showRight"
				title="ctrl+r"></span>
			<h3 class="panel-title">操作记录</h3>
			
		</div>
		<div class="panel-body">
			<div class="table-responsive">
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>参数名称</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>item.name</td>
						</tr>
						<tr>
							<td>item.name</td>
						</tr>
					</tbody>
	
				</table>
			</div>
		</div>
		<!--<div class="panel-footer"></div>-->
	</div>	
</div>

</template>

<script>
export default {
	name: "operateLog",
	//props: ["tree"],
	data: function() {
		return {
			
		}
	},
	methods:{
		rightShowHideFun:function(){
			this.$store.commit('rightChange',{
				newState:!this.$store.state.showRight
			})
		}
	},
	created() {
		
	},
	computed:{
		showRight() {
			return this.$store.state.showRight;
		},
	}
}
</script>
<style lang="less" scoped>
@import '../../style/app.less';
.window-right{
	border: 1px solid @border-color;
	height:100%;
	width: 20px;
	transition: width linear 1s;
	overflow: hidden;
	float: right;
	>.panel{
		width: 198px;
		.panel-heading{
			.glyphicon{
				float: left;
				margin-left: -15px;
			}
		}
	}
	.panel-body{
		padding: 6px;
	}
}
</style>