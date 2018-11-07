<template>
<div class="statisticalStatement-batteryMsg">
	<div class="table-responsive">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>站点ID</th>
					<th>站点名称</th>
					<th>总分数</th>
					<th>蓄电池分数</th>
					<th>充电装置分数</th>
					<th>馈线支路分数</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.value</td>
					<td>item.value</td>
					<td>item.value</td>
					<td>item.value</td>
				</tr>
				<tr>
					<td>item.name</td>
					<td>item.value</td>
					<td>item.value</td>
					<td>item.value</td>
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
	name: "batteryMsg",
	data: function() {
		return {
			//tree:null
		}
	},
	methods:{},
	created() {
		this.$store.commit('titleChange', {
			newTitle: '蓄电池整体性能评估'
		})
	},
}
</script>

<style>
</style>