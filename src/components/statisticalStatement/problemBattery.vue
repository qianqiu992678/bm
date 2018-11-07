<template>
<div class="statisticalStatement-problemBattery">
	<div class="table-responsive">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>序号</th>
					<th>站点ID</th>
					<th>站点名称</th>
					<th>组号</th>
					<th>电池序号</th>
					<th>单体电压(V)</th>
					<th>单体温度(℃)</th>
					<th>单体电阻(mΩ)</th>
					<th>首要判别信息</th>
					<th>附属判别信息</th>
					<th>推荐处理方法</th>
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
	name: "problemBattery",
	data: function() {
		return {
			//tree:null
		}
	},
	methods:{},
	created() {
		this.$store.commit('titleChange', {
			newTitle: '疑似故障电池统计'
		})
	},
}
</script>

<style>
</style>