import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'
import myApp from '@/components/myApp'
//登录
import system from '@/components/system/system'
import login from '@/components/system/login'
//系统管理
import systemManage from '@/components/systemManage/systemManage'
import userManage from '@/components/systemManage/userManage'
import sysManage from '@/components/systemManage/sysManage'

import fileManage from '@/components/systemManage/fileManage'

import zonesEdit from '@/components/systemManage/zonesEdit' 
import collectorsEdit from '@/components/systemManage/collectorsEdit'

import operateLog from '@/components/systemManage/operateLog'
import operateLogOptLog from '@/components/systemManage/operateLogOptLog'
import operateLogCtrlLog from '@/components/systemManage/operateLogCtrlLog'
//统计报表
import statisticalStatement from '@/components/statisticalStatement/statisticalStatement'
import batteryMsg from '@/components/statisticalStatement/batteryMsg'
import batteryGroupMsg from '@/components/statisticalStatement/batteryGroupMsg'
import problemBattery from '@/components/statisticalStatement/problemBattery'

//应用平台
import applicationPlatform from '@/components/applicationPlatform/applicationPlatform'

import batteryMonitorSys from '@/components/applicationPlatform/batteryMonitorSys'

import collectorSelect from '@/components/applicationPlatform/collectorSelect' 
//import collectorsEdit from '@/components/applicationPlatform/collectorsEdit' //
import collectorMsgContainer from '@/components/applicationPlatform/collectorMsg/collectorMsgContainer'
import bianyi from '@/components/applicationPlatform/collectorMsg/bianyi' //测试编译
import systemDiagram from '@/components/applicationPlatform/collectorMsg/systemDiagram' //接线图
//import fileManage from '@/components/applicationPlatform/collectorMsg/fileManage' //文件管理
import dataAnalysis from '@/components/applicationPlatform/collectorMsg/dataAnalysis' //数据分析
import chargeAnalysis from '@/components/applicationPlatform/collectorMsg/chargeAnalysis' //充电数据分析
import dischargeAnalysis from '@/components/applicationPlatform/collectorMsg/dischargeAnalysis' //放电数据分析
import runStatus from '@/components/applicationPlatform/collectorMsg/runStatus/runStatus' //运行状态

import runStatusStringValue from '@/components/applicationPlatform/collectorMsg/runStatus/runStatus_stringValue' //运行状态--电池串
import runStatusSampleValue from '@/components/applicationPlatform/collectorMsg/runStatus/runStatus_sampleValue' //运行状态--开入装置
import runStatusOutputValue from '@/components/applicationPlatform/collectorMsg/runStatus/runStatus_outputValue' //运行状态--开出装置
import runStatusInsulationMonitoring from '@/components/applicationPlatform/collectorMsg/runStatus/runStatus_insulationMonitoring' //运行状态--绝缘监察
import runStatusChargeMachine from '@/components/applicationPlatform/collectorMsg/runStatus/runStatus_chargeMachine' //运行状态--充电机
import runStatusPowerStatus from '@/components/applicationPlatform/collectorMsg/runStatus/runStatus_powerStatus' //运行状态--电源状态


import alarmAnalysis from '@/components/applicationPlatform/collectorMsg/alarmAnalysis' //告警分析
import constantManage from '@/components/applicationPlatform/collectorMsg/constantManage/constantManage' //定值管理
import constantStringValue from '@/components/applicationPlatform/collectorMsg/constantManage/constantStringValue' //定值管理--电池串、modbus信息
//import constantChargeDevice from '@/components/applicationPlatform/collectorMsg/constantManage/constantChargeDevice' //定值管理--充电装置信息
import constantDischargeDevice from '@/components/applicationPlatform/collectorMsg/constantManage/constantDischargeDevice' //定值管理--放电装置信息
//import constantInsulationMonitoring from '@/components/applicationPlatform/collectorMsg/constantManage/constantInsulationMonitoring' //定值管理--绝缘监察
import constantSampleValue from '@/components/applicationPlatform/collectorMsg/constantManage/constantSampleValue' //定值管理--开入装置信息
import constantOutputValue from '@/components/applicationPlatform/collectorMsg/constantManage/constantOutputValue' //定值管理--开出装置信息


import peripheralControl from '@/components/applicationPlatform/collectorMsg/peripheralControl' //外围控制

Vue.use(Router)
export default new Router({
	mode:'hash',
	routes: [
    	{
    		path: '/', 
    		//redirect: '/myapp/systemManage/userManage'
    		redirect:'/myapp/applicationPlatform/batteryMonitorSys/collectorSelect/1'
		}, 
		{ //系统页面
			path: '/system',
			name: 'system',
			component: system,
			children: [{ //登录页面
				path: 'login',
				name: 'login',
				component: login,
				children: [],
			}, ]
		}, {
			path: '/myapp',
			name: 'myApp',
			component: myApp,
			children: [{ //系统管理
				path: 'systemManage',
				name: 'systemManage',
				component: systemManage,
				children: [{ //用户管理
					path: 'userManage',
					name: 'userManage',
					component: userManage,
					children: []
				}, { //系统管理
					path: 'sysManage',
					name: 'sysManage',
					component: sysManage,
					children: []
				},{
					path: 'fileManage',
					name: 'fileManage',
					component: fileManage,
					children: []
				},{ //地区站点配置
					path: 'zonesEdit',
					name: 'zonesEdit',
					component: zonesEdit,
					children: []
				},{//站点配置
					path: 'collectorsEdit/:id',
					name: 'collectorsEdit',
					component: collectorsEdit,
					children: []
				}, { //操作记录
					path: 'operateLog',
					name: 'operateLog',
					component: operateLog,
					children: [{ //操作记录--操作记录
						path: 'operateLogOptLog',
						name: 'operateLogOptLog',
						component: operateLogOptLog,
						children: []
					}, { //操作记录--控制记录
						path: 'operateLogCtrlLog',
						name: 'operateLogCtrlLog',
						component: operateLogCtrlLog,
						children: []
					}]
				}, ]
			}, { //统计报表
				path: 'statisticalStatement',
				name: 'statisticalStatement',
				component: statisticalStatement,
				children: [{ //蓄电池整体性能概况
					path: 'batteryMsg',
					name: 'batteryMsg',
					component: batteryMsg,
					children: []
				}, { //蓄电池组整体性能评估
					path: 'batteryGroupMsg',
					name: 'batteryGroupMsg',
					component: batteryGroupMsg,
					children: []
				}, { //疑似故障电池统计
					path: 'problemBattery',
					name: 'problemBattery',
					component: problemBattery,
					children: []
				}, ]
			}, { //应用平台
				path: 'applicationPlatform',
				name: 'applicationPlatform',
				component: applicationPlatform, //
				children: [{
						path: 'batteryMonitorSys',
						name: 'batteryMonitorSys',
						component: batteryMonitorSys,
						children: [{
							path: 'collectorSelect/:login',
							name: 'collectorSelect',
							component: collectorSelect,
							children: []
						},  {
							path: 'collectorMsgContainer',
							name: 'collectorMsgContainer',
							component: collectorMsgContainer,
							children: [{
									path: 'bianyi',
									name: 'bianyi',
									component: bianyi,
									children: []
								},{
									path: 'systemDiagram',
									name: 'systemDiagram',
									component: systemDiagram,
									children: []
								}, {
									path: 'alarmAnalysis',
									name: 'alarmAnalysis',
									component: alarmAnalysis,
									children: []
								}, {
									path: 'constantManage',
									name: 'constantManage',
									component: constantManage,
									children: [
										{
											path: 'constantStringValue',
											name: 'constantStringValue',
											component: constantStringValue,
											children: []
										},{
											path: 'constantDischargeDevice',
											name: 'constantDischargeDevice',
											component: constantDischargeDevice,
											children: []	
										},{
											path: 'constantSampleValue',
											name: 'constantSampleValue',
											component: constantSampleValue,
											children: []	
										},{
											path: 'constantOutputValue',
											name: 'constantOutputValue',
											component: constantOutputValue,
											children: []	
										},
									]									  
								}, {
									path: 'dataAnalysis',
									name: 'dataAnalysis',
									component: dataAnalysis,
									children: []
								},{
									path: 'chargeAnalysis',
									name: 'chargeAnalysis',
									component: chargeAnalysis,
									children: []
								},{
									path: 'dischargeAnalysis',
									name: 'dischargeAnalysis',
									component: dischargeAnalysis,
									children: []
								}, {
									path: 'peripheralControl',
									name: 'peripheralControl',
									component: peripheralControl,
									children: []
								}, {
									path: 'runStatus',
									name: 'runStatus',
									component: runStatus,
									children: [
										{
											path:'runStatusStringValue',
											name:'runStatusStringValue',
											component:runStatusStringValue,
											children:[],
										},{
											path:'runStatusSampleValue',
											name:'runStatusSampleValue',
											component:runStatusSampleValue,
											children:[],
										},{
											path:'runStatusPowerStatus',
											name:'runStatusPowerStatus',
											component:runStatusPowerStatus,
											children:[],
										},{
											path:'runStatusOutputValue',
											name:'runStatusOutputValue',
											component:runStatusOutputValue,
											children:[],
										},{
											path:'runStatusInsulationMonitoring',
											name:'runStatusInsulationMonitoring',
											component:runStatusInsulationMonitoring,
											children:[],
										},{
											path:'runStatusChargeMachine',
											name:'runStatusChargeMachine',
											component:runStatusChargeMachine,
											children:[],
										},
									]
								}, 
							]
						}]
					}

				]
			}, ]
		}

	]
})

const app = new Vue({
	Router
})