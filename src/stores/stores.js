export default {
	operateLogOptLog:{//操作记录
		state: {
			dateParam:{//查询条件
				startTime:'',
				endTime:'',
				content:'',
				username:'',
				pageNum:'',
				row:10,
			},
		},
	    mutations: {
	    	operateLogOptLogParam(state,payload){
	    		state.dateParam=payload.dateParam;
	    	},
	    },
	    actions: {}
	},
	operateLogCtrlLog:{//控制记录
		state: {
			dateParam:{//查询条件
				startTime:'',
				endTime:'',
				content:'',
				username:'',
				pageNum:'',
				row:10,
			},
		},
	    mutations: {
	    	operateLogCtrlLogParam(state,payload){
	    		state.dateParam=payload.dateParam;
	    	},
	    },
	},
	dataAnalysis:{//数据分析
		state: {
			selectParam:{//查询条件
				startTime:'',
				endTime:'',
				StringNo:'',
				StationID:'',
			},
		},
	    mutations: {
	    	dataAnalysisParam(state,payload){
	    		state.selectParam=payload.selectParam;
	    	},
	    },
	},
	alarmAnalysis:{//告警分析
		state: {
			dataParam:{//查询条件
				startTime:'',
				endTime:'',
				WarnTypeID:'',
				StationID:'',
			},
		},
	    mutations: {
	    	alarmAnalysisParam(state,payload){
	    		state.dataParam=payload.dataParam;
	    	},
	    },
	},
}
