<template>
	<div :class="{window:true,showMenu:showMenu,showRight:showRight}">
		<div class="window-left">
			<ul>
				<menu-item :tree="item" v-for="(item,index) in tree" :key="index"></menu-item>
			</ul>
		</div>
		<operate-log></operate-log>
		<div class="window-main">
			<router-view/>
		</div>
		<!--<vue-draggable-resizable class="window-soe">
			<p>You can drag me around and resize me as you wish.</p>
		</vue-draggable-resizable>-->
		  <!--:handles="['tm']"--> 
	    <system-soe></system-soe>
		  
	</div>
</template>
<script>
import menuItem from "./menu/menuItem.vue";
import operateLog from "./menu/operateLog.vue";
import systemSoe from './menu/systemSoe.vue'

//console.log(VueDraggableResizable)
export default {
	name: 'myApp',
	data() {
		return {
			websock: null,
			width: 0,
			height: 0,
			x: 0,
			y: 0,
			tree: [{
					label: "系统管理",
					icon: 'glyphicon glyphicon-wrench',
					url: '',
					identification: 'systemManage',
					isShow: false,
					children: [{
						label: "用户管理",
						icon: 'glyphicon glyphicon-user',
						url: '/myapp/systemManage/userManage',
						identification: 'systemManage/userManage',
						isShow: null
					}, {
						label: "系统管理",
						icon: 'glyphicon glyphicon-th-large',
						url: '/myapp/systemManage/sysManage',
						identification: 'systemManage/sysManage',
						isShow: null
					},{
						label: "文件管理",
						icon: 'glyphicon glyphicon-file',
						url: '/myapp/systemManage/fileManage',
						identification: 'systemManage/fileManage',
						isShow: null
					},{
						label: "地区站点配置",
						icon: 'glyphicon glyphicon-wrench',
						url: '/myapp/systemManage/zonesEdit',
						identification: 'systemManage/zonesEdit',
						isShow: null
					}, {
						label: "操作记录",
						icon: 'glyphicon glyphicon-list-alt',
						url: '/myapp/systemManage/operateLog/operateLogOptLog',
						identification: 'systemManage/operateLog',
						isShow: null
					}, ]
				}, {
					label: "统计报表",
					icon: 'glyphicon glyphicon-list-alt',
					url: '',
					identification: 'statisticalStatement',
					isShow: false,
					children: [{
							label: "蓄电池整体性能评估",
							icon: 'glyphicon glyphicon-list',
							url: '/myapp/statisticalStatement/batteryMsg',
							identification: 'statisticalStatement/batteryMsg',
							isShow: null
						}, {
							label: "蓄电池组性能概况",
							icon: 'glyphicon glyphicon-list',
							url: '/myapp/statisticalStatement/batteryGroupMsg',
							identification: 'statisticalStatement/batteryGroupMsg',
							isShow: null
						}, {
							label: "疑似故障电池统计",
							icon: 'glyphicon glyphicon-list',
							url: '/myapp/statisticalStatement/problemBattery',
							identification: 'statisticalStatement/problemBattery',
							isShow: null
						},{
							label: "蓄电池智能运维工具",
							icon: 'glyphicon glyphicon-list',
							url: '',
							identification: 'no no',
							isShow: null
						},
	
					]
				}, {
					label: "应用平台",
					icon: 'glyphicon glyphicon-globe',
					url: '',
					identification: 'applicationPlatform',
					isShow: false,
					children: [{
						label: "蓄电池监测系统",
						icon: 'glyphicon glyphicon-hdd',
						url: '/myapp/applicationPlatform/batteryMonitorSys/collectorSelect/0',
						identification: 'applicationPlatform/batteryMonitorSys',
						isShow: false,
					}]
			}]
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
		},
		getStationTypeList:function(){
			var that=this;
			this.yxRequest(
				'get',
				"/platform/stationtypelist", 
				{},
				function(result) {
					that.$store.commit('stationTypeListChange',{
						stationTypeList:result.data,
					})
					//stationTypeListChange
				},
				function(result) {
					that.yxToastr.error('获取站点类型列表失败:'+result.msg);
					console.log('err:',result);
			},1)
		},
		getUserInfo:function(){
			var that=this;
			this.yxRequest(
				'get',
				"/sys/getuserinfo", 
				{},
				function(result) {
					that.setLocalStorage('userInfo',JSON.stringify(result.data));
				},
				function(result) {
					that.yxToastr.error('获取用户信息失败:'+result.msg);
					console.log('err:',result);
			})
		}
	},
	created() {
		console.log(this.$store)
		var that=this;
		if(!this.getLocalStorage('userInfo')){
			this.getUserInfo();
		}
		$('body').keydown(function(e){
			if(e.ctrlKey){
				if(e.keyCode==83){//s
					that.$store.commit('SOEChange',{
						newState:!that.$store.state.showSOE
					})
					e.preventDefault();
				}else if(e.keyCode==76){//l
					that.$store.commit('menuChange',{
						newState:!that.$store.state.showMenu
					})
					e.preventDefault();
				}else if(e.keyCode==82){//r
					that.$store.commit('rightChange',{
						newState:!that.$store.state.showRight
					})
					e.preventDefault();
				}
				
				if(that.$route.name=='systemDiagram'){
					if(e.keyCode==67){//c
						//that.showCtrl=!that.showCtrl;
						//$('.menuListSelect').css({'display':'none'})
						let str=$('.collector-systemDiagram>.menuListSelect').css('display')=='none'?'block':'none';
						//console.log($('.collector-systemDiagram>.menuListSelect').css('display'))
						$('.collector-systemDiagram>.menuListSelect').css({'display':str});
					}
					if(e.keyCode==86){//v
						$('.radarArea').css('display')
						let str=$('.radarArea').css('display')=='none'?'block':'none';
						console.log($('.radarArea').css('display'))
						$('.radarArea').css({'display':str});
					}
				}
			}
				
		})
		this.getStationTypeList();
		
		var ws = new WebSocket("ws://127.0.0.1:3001");
		ws.onopen = function(evt) { 
		  console.log("Connection open ...");
		};
		ws.onmessage = function(evt) {
			let result=JSON.parse(evt.data);
			if(result.status!=200){
				that.yxToastr.warning(result.msg);
				return;
			}
		  	if(result.act=='currentdata'){
		  		switch (that.$route.name){
		  			case 'runStatusStringValue':
		  				that.$store.commit('currentDataChange',{
							data:result.data
						})
		  				break;
		  			case 'runStatusSampleValue':
		  				result.data.deviceDiDataCopy=[];
		  				result.data.deviceDiData.diStatus
		  					.split('').forEach(function(item,key){
		  						let str='DI'+(key+1)+'Name';
		  						if(that.$store.state.sampleValueNames[str]){
		  							result.data.deviceDiDataCopy.push({
		  								StationID:that.$store.state.sampleValueNames.StationID,
		  								DINo:that.$store.state.sampleValueNames.DINo,
		  								DeviceName:that.$store.state.sampleValueNames.DeviceName,
		  								sampleNo:key+1,
		  								DIName:that.$store.state.sampleValueNames[str],
		  								DIStatus:item,
		  							})
		  						}
		  					})
		  				
		  				that.$store.commit('currentDataChange',{
							data:result.data
						})
		  				break;
		  			case 'runStatusOutputValue':
		  				result.data.deviceDoDataCopy=[];
		  				result.data.deviceDoData.diStatus
		  					.split('').forEach(function(item,key){
		  						let str='DO'+(key+1)+'Name';
		  						if(that.$store.state.outputValueNames[str]){
		  							result.data.deviceDoDataCopy.push({
		  								StationID:that.$store.state.outputValueNames.StationID,
		  								DONo:that.$store.state.outputValueNames.DONo,
		  								DeviceName:that.$store.state.outputValueNames.DeviceName,
		  								outputNo:key+1,
		  								DOName:that.$store.state.outputValueNames[str],
		  								DOStatus:item,
		  							})
		  						}
		  					})
		  				that.$store.commit('currentDataChange',{
							data:result.data
						})
		  				break;
		  			case 'runStatusInsulationMonitoring':
		  				that.$store.commit('currentDataChange',{
							data:result.data
						})
		  				break;
		  			case 'runStatusChargeMachine':
		  				that.$store.commit('currentDataChange',{
							data:result.data
						})
		  				break;
		  			case 'runStatusPowerStatus':
		  				that.$store.commit('currentDataChange',{
							data:result.data
						})
		  				break;
		  			default:
			  			that.$store.commit('currentDataChange',{
							data:result.data
						})
		  				break;
		  		}
		  	}else if(result.act=='toast'){
		  		console.log('toast',result.msg)
		  		that.yxToastr.success(result.msg);
		  	}
		};
		ws.onclose = function(evt) {
		  console.log("Connection closed.");
		};
		console.log(111111111111)
		jQuery(function($){  
		    $.datepicker.regional['zh-CN'] = {  
		        closeText: '关闭',  
		        prevText: '<上月',  
		        nextText: '下月>',  
		        currentText: '今天',  
		        monthNames: ['一月','二月','三月','四月','五月','六月',  
		        '七月','八月','九月','十月','十一月','十二月'],  
		        monthNamesShort: ['一','二','三','四','五','六',  
		        '七','八','九','十','十一','十二'],  
		        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
		        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
		        dayNamesMin: ['日','一','二','三','四','五','六'],  
		        weekHeader: '周',  
		        dateFormat: 'yy-mm-dd',  
		        firstDay: 1,  
		        isRTL: false,  
		        showMonthAfterYear: true,  
		        yearSuffix: '年'};  
		    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);  
		});
	},
	computed: {
		showMenu() {
			return this.$store.state.showMenu;
		},
		showRight() {
			return this.$store.state.showRight;
		}
	},
	components: {
		menuItem,
		operateLog,
		systemSoe,
	}
}
</script>
<style lang="less" scoped>
	@import '../style/app.less';
	.window {
		height: 100%;
		&.showMenu {
			.window-left {
				width: 200px;
			}
		}
		&.showRight {
			.window-right {
				width: 200px;
			}
		}
	}
	
	.window-left {
		border: 1px solid @border-color;
		height: 100%;
		width: 0px;
		overflow-x: hidden;
		overflow-y: auto;
		float: left;
		padding: 6px;
		transition: width linear 1s;
		ul {
			width: 186px;
			position: relative;
			right: 15px;
		}
	}
	
	.window-main {
		border: 1px solid @border-color;
		height: 100%;
	}
</style>