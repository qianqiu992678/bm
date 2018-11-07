<template>
<div class="runStatus-sampleValue">
	<div class="table-responsive">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>集中器id</th>
					<th>开入装置序号</th>
					<th>开入装置名称</th>
					<th>开入量序号</th>
					<th>开入量名称</th>
					<th>开入量状态</th>
					<!--<th>命令状态</th>-->
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in $store.state.currentData.deviceDiDataCopy">
					<td>{{item.StationID}}</td>
					<td>{{item.DINo}}</td>
					<td>{{item.DeviceName}}</td>
					<td>{{item.sampleNo}}</td>
					<td>{{item.DIName}}</td>
					<td>{{item.DIStatus}}</td>
				</tr>
			</tbody>
		</table>
		<no-data-component :dataArray="$store.state.currentData.deviceDiDataCopy">
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
	name: "runStatusSampleValue",
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
.runStatus-sampleValue{
	.table-responsive{
		max-height:480px;
	}
}
</style>