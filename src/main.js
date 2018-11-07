// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import $ from 'jquery'
import './bootstrap/bootstrap.min.js'
import './bootstrap/bootstrap.min.css'
import './style/app.css'
import Vue from 'vue'
import Vuex from 'vuex'
import './toastr/toastr.css'

//import datePicker from 'vue-bootstrap-datetimepicker';
//import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
//import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import './bootstrap/jquery-ui-1.12.1/jquery-ui.min.js'
//import './bootstrap/jquery-ui-1.12.1/jquery-ui.min.css'


import './bootstrap/jquery-ui-timepicker-addon.min.js'
//import './bootstrap/jquery-ui-timepicker-zh-CN.js'
//import './bootstrap/jquery-ui-timepicker-addon.min.css'
import './bootstrap/jquery.datetimepicker.css'
$.datetimepicker.setLocale('zh');
//Vue.use(datePicker);

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu); 
import VueUploadComponent from 'vue-upload-component';
Vue.component('file-upload', VueUploadComponent)

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate);
//import VueUploadComponent from 'vue-upload-component'
//Vue.component('file-upload', VueUploadComponent)

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
//import Highcharts from 'highcharts'

//import stockInit from 'highcharts/modules/stock'
//
//stockInit(Highcharts)

import myPlugins from './myPlugins/myPlugins'
Vue.use(myPlugins); 
import App from './App'
import router from './router'
//import commonFun from './myPlugins/commonFun'
//Vue.prototype.commonFun=commonFun

//Vue.prototype.$ajax = axios
Vue.config.productionTip = false
//import store from './store'

Vue.use(Vuex)
import stores from './stores/stores.js';
const store=new Vuex.Store({
	state:{
		systemManageTitle:'',
		showMenu:true,
		showRight:false,
		showSOE:false,
		currentStation:null,	//当前集中器信息
		currentZone:null,		//当前区域（zone）信息,当前编辑的区域
		currentData:{},			//当前数据，，每5s变一次
		currentDataForSVG:{
			yaoxin:{
				'2':{
					address:2,
					value:1,
					description:'一号开关'
				},
				'4':{
					address:4,
					value:0,
					description:'二号开关'
				}
			},
			yaoce:{
				'2':{
					address:2,
					value:220,
					description:'A相电压',
				},
				'4':{
					address:4,
					value:220,
					description:'B相电压',
				}
			}
		},//当前数据--为svg准备的数据，需要特殊格式
		currentStringsMsg:null,//当前电池串配置信息
		stationTypeList:null,
		sampleValueNames:null,//开入装置名称列表
		outputValueNames:null,//开出装置名称列表
		fileList:[
			{
				fid:1,
				name:'',
				isFile:0,
				showChildren:1,
				url:'',
				children:[]
			}
		],//用户文件系统
	},
	getters:{},
	mutations:{
		titleChange(state,payload){
			state.systemManageTitle=payload.newTitle;
		},
		menuChange(state,payload){
			state.showMenu=payload.newState;
		},
		rightChange(state,payload){
			state.showRight=payload.newState;
		},
		SOEChange(state,payload){
			state.showSOE=payload.newState;
		},
		getCurrentZone(state,payload){//
			state.currentZone=payload.Zone;
		},
		getCurrentZoneTitle(state,payload){//
			state.currentZone.Zone=payload.title;
		},
		getCurrentStation(state,payload){//当前站信息--主窗口要显示的站的信息
			state.currentStation=payload.station;
		},
		getCurrentStringsMsg(state,payload){//当前站下所有电池串配置信息
			state.currentStringsMsg=payload.stringsMsg;
		},
		currentDataChange(state,payload){//当前数据
			state.currentData=payload.data;
		},
		currentDataForSVGChange(state,payload){
			state.currentDataForSVG=payload.data;
		},
		stationTypeListChange(state,payload){
			state.stationTypeList=payload.stationTypeList;
		},
		sampleValueNamesChange(state,payload){
			state.sampleValueNames=payload.sampleValueNames;
		},
		outputValueNamesChange(state,payload){
			state.outputValueNames=payload.outputValueNames;
		},
		fileListChange(state,payload){
			state.fileList[0].children=payload.fileList;
		},
		fileListRootUrl(state,payload){
			state.fileList[0].url=payload.url;
			state.fileList[0].name=payload.url;
		}
	},
	modules:stores,
	
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})


