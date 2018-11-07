<template>
	<vue-draggable-resizable class="window-soe" v-if="showsoe" 
    	v-on:dragging="onDrag" v-on:resizing="onResize" 
    	:x='30' :y='300' :w='900' :h='300'
    	:handles="['tm']" :draggable="true">
    	<span class="glyphicon glyphicon-remove-circle"
    		title="ctrl+s"
    		v-on:click="hideSoeFun"></span>
      	<div class="table-responsive">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>集中器名称</th>
						<th>设备类型</th>
						<th>记录产生时间</th>
						<th>告警内容</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>item.name</td>
						<td>item.value</td>
						<td>item.name</td>
						<td>item.value</td>
					</tr>
					<tr>
						<td>item.name</td>
						<td>item.value</td>
						<td>item.name</td>
						<td>item.value</td>
					</tr>
				</tbody>

			</table>
		</div>
    </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
	name: 'systemSoe',
	data() {
		return {
			width: 0,
			height: 0,
			x: 0,
			y: 0,
		}
	},
	watch: {
		//'$route': 'getPath'
	},
	methods: {
		onResize: function(x, y, width, height) {
			this.x = x
			this.y = y
			this.width = width
			this.height = height
		},
		onDrag: function(x, y) {
			this.x = x
			this.y = y
		},
		hideSoeFun:function(){
			this.$store.commit('SOEChange',{
				newState:false
			})
		}
	},
	created() {
		//console.log($('body'));
	},
	computed: {
		showMenu() {
			return this.$store.state.showMenu;
		},
		showRight() {
			return this.$store.state.showRight;
		},
		showsoe(){
			return this.$store.state.showSOE;
		}
	},
	components: {
		VueDraggableResizable,
	}
}
</script>

<style lang="less">
@import '../../style/app.less';
.window-soe {
	border: 1px solid @border-color;
	background: #fff;
	overflow:hidden;
    padding: 24px 6px 6px;
    box-shadow: 2px 2px 2px 1px;
    border-radius: 6px;
    >.glyphicon{
	    float: right;
	    margin-top: -22px;
	    color: #fff;
    }
	.handle{
	    top: 0;
	    width: 100%;
	    left: 0;
	    height:20px;
	    margin-left: 0;
	    border: 0px;
		background: @active-color;
	}
}
</style>