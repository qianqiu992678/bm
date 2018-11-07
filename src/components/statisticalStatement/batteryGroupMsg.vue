<template>
<div class="statisticalStatement-batteryGroupMsg">
	<div class="table-responsive">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>序号</th>
					<th>站名</th>
					<th>组号</th>
					<th>时间</th>
					<th>串级健康程度</th>
					<th>交流失电状态</th>
					<th>总电压</th>
					<th>总电流</th>
					<th>环境温度</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.value</td>
				</tr>
				<tr>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.value</td>
				</tr>
			</tbody>

		</table>
	</div>
</div>
</template>

<script>
export default {
	name: "batteryGroupMsg",
	data: function() {
		return {
			//tree:null
		}
	},
	methods:{},
	created() {
		this.$store.commit('titleChange', {
			newTitle: '蓄电池组的整体性能概况'
		})
	},
}
</script>

<style>
</style>