<template>
<div class="runStatus-outputValue">
	<div class="table-responsive">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>集中器id</th>
					<th>装置号</th>
					<th>开出量序号</th>
					<th>开出量名称</th>
					<th>开出量状态</th>
					<!--<th>命令状态</th>-->
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in $store.state.currentData.deviceDoDataCopy">
					<td>{{item.StationID}}</td>
					<td>{{item.DONo}}</td>
					<td>{{item.outputNo}}</td>
					<td>{{item.DOName}}</td>
					<td>{{item.DOStatus}}</td>
				</tr>
			</tbody>
		</table>
		<no-data-component :dataArray="$store.state.currentData.deviceDoDataCopy">
		</no-data-component>
	</div>
	<!--<div class="yx-paginate">
		<paginate v-if="valueList.pageCount>1"
		  v-model="valueList.pageNum"
		  :page-count="valueList.pageCount"
		  :page-class="'page-item'"
		  :prev-class="'paginate-prev'"
		  :break-view-class="'paginate-view'"
		  :next-class="'paginate-next'"
		  :click-handler="paginationPageClick"
		  :prev-text="'上一页'"
		  :next-text="'下一页'"
		  :container-class="'yx-paginate'">
		</paginate>
		<span v-if="valueList.total>0">当前显示{{valueList.data.length}}条,共{{valueList.total}}条</span>
	</div>-->
</div>
</template>

<script>
import noDataComponent from '../../../myComponents/noDataComponent.vue';
export default {
	name: "runStatusOutputValue",
	data: function() {
		return {
			valueList:{
				data:[
					{number:1,},{number:2,},{number:3,},{number:4,},{number:5,},
					{number:6,},{number:7,},{number:8,},{number:9,},{number:10,}
				],
				total:23,
				pageNum:1,
				pageCount:3,
			},
		}
	},
	methods:{
		paginationPageClick:function(pageNum){
			console.log(pageNum)
		}
	},
	created() {},
	components: {
		noDataComponent,
	},
	watch:{}
}
</script>

<style lang="less" scoped>
@import '../../../../style/app.less';
.runStatus-outputValue{
	.table-responsive{
		max-height:480px;
	}
}
</style>