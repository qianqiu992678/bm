<template>
	<div class="systemManage-operateLog">
		<!-- Nav tabs -->
		<ul class="nav nav-tabs">
			<li :class="{active:$route.path.includes('operateLogOptLog')}">
				<a v-on:click="urlGo('/myapp/systemManage/operateLog/operateLogOptLog')">操作记录</a>
			</li>
			<li :class="{active:$route.path.includes('operateLogCtrlLog')}">
				<a v-on:click="urlGo('/myapp/systemManage/operateLog/operateLogCtrlLog')">控制记录</a>
			</li>
		</ul>
		<router-view/>
	</div>
</template>

<script>
	
	export default {
		name: "operateLog",
		data: function() {
			return {
				
			}
		},
		methods: {
//			_suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
//			_drop(evt) {
//				evt.stopPropagation(); evt.preventDefault();
//				const files = evt.dataTransfer.files;
//				if(files && files[0]) this._file(files[0]);
//			},
//			_change(evt) {
//				const files = evt.target.files;
//				if(files && files[0]) this._file(files[0]);
//			},
			
//			_file(file) {
//				/* Boilerplate to set up FileReader */
//				const reader = new FileReader();
//				reader.onload = (e) => {
//					/* Parse data */
//					const bstr = e.target.result;
//					const wb = this.XLSX.read(bstr, {type:'binary'});
//					/* Get first worksheet */
//					const wsname = wb.SheetNames[0];
//					const ws = wb.Sheets[wsname];
//					/* Convert array of arrays */
//					const data = this.XLSX.utils.sheet_to_json(ws, {header:1});
//					/* Update state */
//					this.data = data;
//					this.cols = make_cols(ws['!ref']);
//				};
//				reader.readAsBinaryString(file);
//			}
		},
		created() {
			this.$store.commit('titleChange', {
				newTitle: '操作记录'
			})
		},
	}
</script>

<style>

</style>