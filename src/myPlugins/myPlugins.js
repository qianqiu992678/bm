/**
 * 封装了yxToastr
 * 封装了yxConfirm
 * 封装了yxRequest
 * 封装了
 * 封装了
 * 封装了
 * */
let myPlugins = {}
import $ from 'jquery'

import toastr from 'toastr'
import axios from 'axios'
import config from "../config"
import fileSaver from './FileSaver.js'
import XLSX from 'xlsx'
import './jquery.form.js'


myPlugins.install = function(Vue, options) {
	/*对象深度克隆   
	 *
	 * */
	Vue.prototype.mycopy = function(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
	Vue.prototype.fileSaver=fileSaver;
	Vue.prototype.XLSX=XLSX;
	/**dom转字符串以便下载文件
	 * @param dom
	 * @return string
	 * */
	Vue.prototype.parseDom=function(arg){
		var objE = document.createElement("div");
	　　 objE.append(arg);
	　　 return objE.innerHTML;
	}
	/**编译方法
	 * 
	 */
	Vue.prototype.compileFun=function(document){
		let elements=$(document).find('*');
		for(let i=1;i<elements.length;i++){
			
			if(elements[i].attributes.onclick){
				let str=elements[i].attributes.onclick.nodeValue;
				try{
					var obj=JSON.parse(str.substring(7,str.length-2));
				}catch(e){
					//TODO handle the exception
					console.error('json格式错误：'+$(elements[i].attr('id'))+'--'+str)
					return;
				}
				$(elements[i]).removeAttr("onclick");
				for(let k in obj){
					$(elements[i]).attr(obj);
				}
				switch (obj.widget_name){
					case 'widget_lampA':
						break;
					case 'widget_lampB':
						break;
					default:
						break;
				}
			}
		}
		return document
	}
	/**
	 * 获取、存储localStore
	 * */
	Vue.prototype.setLocalStorage = function(key, value) {
		window.localStorage.setItem(key, value);
	}
	Vue.prototype.getLocalStorage = function(key) {
		return window.localStorage.getItem(key);
	}
	/**
	 * 
	 * */
	Vue.prototype.config = config;
	/**
	 *对象数组排序方法 
	 */
	Vue.prototype.sortByKey=function(array,key){
		return array.sort(function(a,b){
            var x=a[key];
            var y=b[key];
            return ((x<y)?-1:((x>y)?1:0));
       });
	}
	/**
	 * 封装操作提示toastr
	 * */
	Vue.prototype.yxToastr = toastr;
	Vue.prototype.yxToastr.options.positionClass = 'toast-top-right';
	/**
	 * 封装确认取消提示框
	 * */
	Vue.prototype.yxConfirm = function() {
		var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
			'<div class="modal-dialog modal-sm">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
			'<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
			'</div>' +
			'<div class="modal-body">' +
			'<p>[Message]</p>' +
			'</div>' +
			'<div class="modal-footer">' +
			'<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
			'<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';

		var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
			'<div class="modal-dialog">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
			'<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
			'</div>' +
			'<div class="modal-body">' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';
		var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
		var generateId = function() {
			var date = new Date();
			return 'mdl' + date.valueOf();
		}
		var init = function(options) {
			options = $.extend({}, {
				title: "操作提示",
				message: "提示内容",
				btnok: "确定",
				btncl: "取消",
				width: 200,
				auto: false
			}, options || {});
			var modalId = generateId();
			var content = html.replace(reg, function(node, key) {
				return {
					Id: modalId,
					Title: options.title,
					Message: options.message,
					BtnOk: options.btnok,
					BtnCancel: options.btncl
				}[key];
			});
			$('body').append(content);
			$('#' + modalId).modal({
				width: options.width,
				backdrop: 'static'
			});
			$('#' + modalId).on('hide.bs.modal', function(e) {
				$('body').find('#' + modalId).remove();
			});
			return modalId;
		}

		return {
			alert: function(options) {
				if(typeof options == 'string') {
					options = {
						message: options
					};
				}
				var id = init(options);
				var modal = $('#' + id);
				modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
				modal.find('.cancel').hide();

				return {
					id: id,
					on: function(callback) {
						if(callback && callback instanceof Function) {
							modal.find('.ok').click(function() {
								callback(true);
							});
						}
					},
					hide: function(callback) {
						if(callback && callback instanceof Function) {
							modal.on('hide.bs.modal', function(e) {
								callback(e);
							});
						}
					}
				};
			},
			confirm: function(options) {
				var id = init(options);
				var modal = $('#' + id);
				modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
				modal.find('.cancel').show();
				return {
					id: id,
					on: function(callback) {
						if(callback && callback instanceof Function) {
							modal.find('.ok').click(function() {
								callback(true);
							});
							modal.find('.cancel').click(function() {
								callback(false);
							});
						}
					},
					hide: function(callback) {
						if(callback && callback instanceof Function) {
							modal.on('hide.bs.modal', function(e) {
								callback(e);
							});
						}
					}
				};
			},
			dialog: function(options) {
				options = $.extend({}, {
					title: 'title',
					url: '',
					width: 800,
					height: 550,
					onReady: function() {},
					onShown: function(e) {}
				}, options || {});
				var modalId = generateId();

				var content = dialogdHtml.replace(reg, function(node, key) {
					return {
						Id: modalId,
						Title: options.title
					}[key];
				});
				$('body').append(content);
				var target = $('#' + modalId);
				target.find('.modal-body').load(options.url);
				if(options.onReady())
					options.onReady.call(target);
				target.modal();
				target.on('shown.bs.modal', function(e) {
					if(options.onReady(e))
						options.onReady.call(target, e);
				});
				target.on('hide.bs.modal', function(e) {
					$('body').find(target).remove();
				});
			}
		}
	}();
	/**封装axios请求方法
	 * @param1  string   	请求方式
	 * @param2  string    	请求路径
	 * @param3  obj   		请求数据
	 * @param4  function   	请求成功回调
	 * @param5  function   	请求失败回调
	 * */
	/*
	axios.defaults.withCredentials=true; // 让ajax携带cookie
	axios.defaults.headers["access_token"]=$.cookie('access_token');
	
	Vue.prototype.yxRequest = function(type, url, data, succCB, errCB) {
		if(url!='/sys/login'&&!$.cookie('access_token')){
			Vue.prototype.yxToastr.warning('登录失效请重新登录！');
			this.$router.push('/system/login');
			return; 
		}
		var that = this;
		let param;
		if(type=='get'){
			param={
				params:data,
			}
		}else if(type=='post'){
			param=data;
		}else{
			param=data
		}
		
		axios[type](
			config.requestIp+url,
			param,
		).then(function(res) {
			console.log(res)
			if(res.status == 200) {
				if(res.data.status==200){
					if(typeof succCB == 'function') {
						succCB(res.data);
					}
				}else if(res.data.status==401){
					Vue.prototype.yxToastr.warning('登录失效请重新登录！');
					that.$router.push('/system/login');
					return; 
				}else{
					if(typeof errCB == 'function') {
						errCB(res);
					}
				}
			} else {
				Vue.prototype.yxToastr.error('网络走神了，请稍后再试...');
			}
		}).catch(function(err) {
			//console.log(err)
			Vue.prototype.yxToastr.error('网络走神了，请稍后再试...');
		})
	}*/
	Vue.prototype.yxRequest = function(type, url, data, succCB, errCB,toast) {
		if(url!='/sys/login'&&!$.cookie('access_token')){
			if(!toast){
				Vue.prototype.yxToastr.warning('登录失效请重新登录！');
			}
			this.$router.push('/system/login');
			return; 
		}
		var that = this;
		let access_token=$.cookie('access_token')||undefined;
		
		$.ajax({
			headers: {
				'access_token': access_token
			},
			type: type,
			url: config.requestIp+url,
			async: true,
			xhrFields:{
				withCredentials: true,
			},
			crossDomain: true,
			data: data,
			success: function(res) {
				if(res.status == 200) {
					if(typeof succCB == 'function') {
						succCB(res);
					}
				} else if(res.status == 401) {
					that.$router.push('/system/login');
				} else {
					if(typeof errCB == 'function') {
						errCB(res);
					}
				}

			},
			error: function(err) {
				Vue.prototype.yxToastr.error('网络走神了，请稍后再试...');
			}
		});
	}
	/**
	 * svg画面初始化
	 * */
	Vue.prototype.svgInitFun=function(){
		let that=this;
		//console.log(that.$store.state.currentDataForSVG)
		//对lampA_WIDGET的处理
		//$('.class').forEach(function(){})
		$('[id^="lampA_WIDGET"]').each(function(){
			//console.log($(this).attr("address"))
			let address=$(this).attr("address");
			let signalType=$(this).attr("signalType");
			if(that.$store.state.currentDataForSVG[signalType][address]){
				if(that.$store.state.currentDataForSVG[signalType][address].value==1){
					$(this).attr('fill','red')
				}else if(that.$store.state.currentDataForSVG[signalType][address].value==0){
					$(this).attr('fill','green')
				}
			}else{
				$(this).attr('fill','orange')
			}	
		})
		$('[id^="lampB_WIDGET"]').each(function(){
			let address=$(this).attr("address");
			let signalType=$(this).attr("signalType");
			if(that.$store.state.currentDataForSVG[signalType][address]){
				if(that.$store.state.currentDataForSVG[signalType][address].value==1){
					
					$(this).addClass('alarm')
				}else if(that.$store.state.currentDataForSVG[signalType][address].value==0){
					
					$(this).addClass('reset')
				}
			}else{
				$(this).addClass('noData')
			}	
		})
		
	}
	/**
	 * 列表项选择
	 * */
	Vue.prototype.checkTest = function() {
		console.log('checkTest')
	}
	Vue.prototype.urlGo = function(url) {
		//console.log(url)
		this.$router.push(url);
	}
	/**
	 * 验证日期格式
	 * @param1 string 
	 * @return bool
	 * */
	Vue.prototype.dateTimeValidate=function(str) {
		if(!str)return false;
		var _reTimeReg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
		return _reTimeReg.test(str);
	}
	/**
	 * 数字前边补0
	 *
	 */
	Vue.prototype.PrefixInteger=function(num, length) {
	 	return (Array(length).join('0') + num).slice(-length);
	}
	/**
	 *日期格式化 
	 *@param1 date
	 *@return string 
	 */
	Vue.prototype.dateFormat1=function(d){
		let year=d.getFullYear();
	    let date=Vue.prototype.PrefixInteger(d.getDate(),2);
	    let month= Vue.prototype.PrefixInteger(d.getMonth()+1,2);
	    let hour= Vue.prototype.PrefixInteger(d.getHours(),2);
	    let minute= Vue.prototype.PrefixInteger(d.getMinutes(),2);
	    let second= Vue.prototype.PrefixInteger(d.getSeconds(),2);
	    return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second
	}
	/*svg缩放、拖拽功能
	 *,resetBtn
	 * */
	Vue.prototype.dragScale=function(svgEle,radarEle){
		this.svgEle = svgEle;//svg
		//this.resetBtn=resetBtn;//复位按钮
		this.radarBoxEle=radarEle;//小地图
		this.init.apply(this);
	}
	Vue.prototype.dragScale.prototype={
		constructor: Vue.prototype.dragScale,
		_dom: {},
		_top: 0,//drag--
		_left: 0,//drag--
		move: false,//drag--
		down: false,//drag--
		boxEle:null,
		radarAreaSize:{width:0,height:0},//小地图尺寸
		radarCurrentMsg:{width:0,height:0,left:0,top:0},//小地图显示区域  尺寸及位置
		
		svgSize:{width:0,height:0},//svg元素尺寸
		boxSize:{width:0,height:0},//container的尺寸
		mouseDownPos:{x:0,y:0},//鼠标按下时的位置
		mousePosition:{},//滚动时鼠标位置
		maxVB:{},//最大视口，即最小图形尺寸不小于box的尺寸
		WHRatio:{box:1,svg:1},//box和svg尺寸的宽/高
		init: function() {
			//this.WHRatio={};
			this.radarEle=this.radarBoxEle.children('.areaWrap')
			this.currentRadarEle=this.radarEle.siblings('.currentArea');
			this.radarAreaSize.width=parseInt(this.radarBoxEle.css('width'));
			
			this.boxEle=this.svgEle.parent('.svg-container');
			this.svgSize.width=parseInt(this.svgEle.css('width'));
			this.svgSize.height=parseInt(this.svgEle.css('height'));
//			this.boxEle.css({'width':'100%','height':'100%'});
			this.boxSize.width=parseInt(this.boxEle.css('width'));
			this.boxSize.height=parseInt(this.boxEle.css('height'));
			
			this.WHRatio.box=this.boxSize.width/this.boxSize.height;
			this.WHRatio.svg=this.svgSize.width/this.svgSize.height;
			if(this.boxSize.width>this.svgSize.width){
				this.boxEle.css('width',this.svgSize.width+'px')
			}
			
			if(this.boxSize.height>this.svgSize.height){
				this.boxEle.css('height',this.svgSize.height+'px')
			}
			this.boxSize.width=parseInt(this.boxEle.css('width'));
			this.boxSize.height=parseInt(this.boxEle.css('height'));
			
			this.currentVBArr=this.svgEle.attr('viewBox').split(' ');

			this.radarAreaSize.height=this.radarAreaSize.width*this.svgSize.height/this.svgSize.width;
			this.radarBoxEle.css({'height':this.radarAreaSize.height+'px'})
			
			this.radarCurrentMsg.left=this.currentVBArr[0]/this.svgSize.width*this.radarAreaSize.width;
			this.radarCurrentMsg.top=this.currentVBArr[1]/this.svgSize.height*this.radarAreaSize.height;
			this.goRadarCurrent();
			this.bindEvent();
//			let radarVBArr=[0,0,0,0];

			let xX=this.svgSize.width*this.svgSize.width/this.radarAreaSize.width;
			let xY=xX*this.svgSize.height/this.svgSize.width;
			let yY=this.svgSize.height*this.svgSize.height/this.radarAreaSize.height;
			if(xY>yY){
				this.radarBoxEle.children('.areaMap').children('svg')[0].setAttribute("viewBox",`0 0 ${xX} ${xY}`);
			}else{
				let yX=yY*this.svgSize.width/this.svgSize.height;
				this.radarBoxEle.children('.areaMap').children('svg')[0].setAttribute("viewBox",`0 0 ${yX} ${yY}`);
			}
			////初始化缩放
			if(this.WHRatio.box>this.WHRatio.svg){//box的宽度大，，以高度来计算
				this.boxEle.css('width',this.boxSize.height*this.svgSize.width/this.svgSize.height+'px');
			}else{
				this.boxEle.css('height',this.svgSize.height*this.boxSize.width/this.svgSize.width+'px');
			}
			this.boxSize.width=parseInt(this.boxEle.css('width'));
			this.boxSize.height=parseInt(this.boxEle.css('height'));
		
			let arr=[0,0];
			arr[2]=this.svgSize.width*this.svgSize.width/this.boxSize.width;
			arr[3]=arr[2]/this.WHRatio.svg;
			this.mouseScroll(1,arr);	
			this.originVBArr=arr;
			
			this.maxVB.width=arr[2];
			this.maxVB.height=arr[3];
		},
		bindEvent: function() {
			var that = this;
			$("body").unbind( "mouseup" );
			$("body").unbind( "mousemove" );
			$("body").unbind( "mousedown" );
			$('body').on('mousedown', 'svg', function(e) {
				e && e.preventDefault();
				if(!that.move) {
					that.mouseDown(e);
				}
			});
			$('body').on('mouseup', 'svg', function(e) {
				that.mouseUp(e);
			});
			$('body').on('mousemove', 'svg', function(e) {
				if(that.down) {
					that.mouseMove(e);
				}
			});
			this.radarEle.unbind('click');
			this.radarEle.on('click',function(e){
				that.radarCurrentMsg.left=e.offsetX-that.radarCurrentMsg.width/2;
				that.radarCurrentMsg.top=e.offsetY-that.radarCurrentMsg.height/2;
				
				let vbArr=JSON.parse(JSON.stringify(that.currentVBArr));
				vbArr[0]=that.svgSize.width*that.radarCurrentMsg.left/that.radarAreaSize.width;
				vbArr[1]=that.svgSize.height*that.radarCurrentMsg.top/that.radarAreaSize.height;
				if(vbArr[0]>=that.svgSize.width-that.boxSize.width*that.currentVBArr[2]/that.svgSize.width){
					vbArr[0]=that.svgSize.width-that.boxSize.width*that.currentVBArr[2]/that.svgSize.width;
				}
				if(vbArr[0]<0){
					vbArr[0]=0;
				}
				if(vbArr[1]>=that.svgSize.height-that.boxSize.height*that.currentVBArr[3]/that.svgSize.height){
					vbArr[1]=that.svgSize.height-that.boxSize.height*that.currentVBArr[3]/that.svgSize.height
				}
				if(vbArr[1]<0){
					vbArr[1]=0;
				}
				that.moveToPosition(vbArr)
			})
			
			this.boxEle[0].onmousewheel=this.scrollFunc.bind(this);
			this.boxEle[0].addEventListener('DOMMouseScroll',this.scrollFunc.bind(this),false);
//			this.resetBtn.unbind('click')
//			this.resetBtn.on('click',function(){
//				that.moveToPosition(that.originVBArr)
//			})
		},
		mouseMove: function(e) {
			
			e && e.preventDefault();
			this.move = true;
			
			//dom = $('.dqmx-svgContainer');
			let vbArr=this.currentVBArr;
			
			var x = (this.mouseDownPos.x - e.clientX)*vbArr[2]/this.svgSize.width,
				y = (this.mouseDownPos.y - e.clientY)*vbArr[2]/this.svgSize.width;
			let vb0=parseFloat(vbArr[0])+x;
			let vb1=parseFloat(vbArr[1])+y;
			
			if(vb0<0){
				vb0=0;
			}
			if(vb0>=this.svgSize.width-this.boxSize.width*this.currentVBArr[2]/this.svgSize.width){
				vb0=this.svgSize.width-this.boxSize.width*this.currentVBArr[2]/this.svgSize.width;
				if(vb0<0){
					vb0=0;
				}
			}
			if(vb1<0){
				vb1=0;
			}
			if(vb1>=this.svgSize.height-this.boxSize.height*this.currentVBArr[3]/this.svgSize.height){
				vb1=this.svgSize.height-this.boxSize.height*this.currentVBArr[3]/this.svgSize.height
				if(vb1<0){
					vb1=0;
				}
			}
			this.radarCurrentMsg.left=vb0/this.svgSize.width*this.radarAreaSize.width;
			this.radarCurrentMsg.top=vb1/this.svgSize.height*this.radarAreaSize.height;
			this.svgEle[0].setAttribute("viewBox", vb0+' '+vb1+' '+vbArr[2]+' '+vbArr[3]);
			
			this.goRadarCurrent();
		},
		mouseUp: function(e) {
			e && e.preventDefault();
			this.move = false;
			this.down = false;
			this.currentVBArr=this.svgEle[0].attributes.viewBox.nodeValue.split(' ');
			this.svgEle.css('cursor', '');
		},
		mouseDown: function(e) {
			this.currentVBArr=this.svgEle.attr('viewBox').split(' ');
			this.move = false;
			this.down = true;
			this.mouseDownPos.x = e.clientX;
			this.mouseDownPos.y = e.clientY;
			
			this.boxSize.width=parseInt(this.svgEle.parent('.svg-container').css('width'));
			this.boxSize.height=parseInt(this.svgEle.parent('.svg-container').css('height'));
			this._top = $('.svg-container').scrollTop();
			this._left = $('.svg-container').scrollLeft();
			this.svgEle.css('cursor', 'move');
		},
		scrollFunc: function(e) {
			this.mousePosition.left=e.layerX;
			this.mousePosition.top=e.layerY;
			e=e || window.event;  
			e.preventDefault();
	        if(e.wheelDelta){//IE/Opera/Chrome  
	            //自定义事件：编写具体的实现逻辑  
	            let scaleTimes=e.wheelDelta>0?'0.9':'1.1';
	            this.mouseScroll(scaleTimes);
	        }else if(e.detail){//Firefox
	            //自定义事件：编写具体的实现逻辑  
	            let scaleTimes=e.detail<0?0.9:1.1;
	            this.mouseScroll(scaleTimes); 
	        }
		},
		mouseScroll: function(scaleTimes,arr) {
			
			if(!arr){
				var vbArr=this.currentVBArr;
				if(vbArr[2]*scaleTimes>this.maxVB.width){
					vbArr[0]=vbArr[1]=0;
					vbArr[2]=this.maxVB.width;
					vbArr[3]=this.maxVB.height;
				}else{
					vbArr[0]=(vbArr[2]-vbArr[2]*scaleTimes)/this.svgSize.width*this.mousePosition.left+parseFloat(vbArr[0]);
					vbArr[1]=(vbArr[3]-vbArr[3]*scaleTimes)/this.svgSize.height*this.mousePosition.top+parseFloat(vbArr[1]);
					vbArr[2]=vbArr[2]*scaleTimes;
					vbArr[3]=vbArr[3]*scaleTimes;
					if(vbArr[0]<0){
						vbArr[0]=0
					}else if(vbArr[0]>this.svgSize.width-vbArr[2]*this.boxSize.width/this.svgSize.width){
						vbArr[0]=this.svgSize.width-vbArr[2]*this.boxSize.width/this.svgSize.width
					};
					if(vbArr[1]<0){
						vbArr[1]=0
					}else if(vbArr[1]>this.svgSize.height-vbArr[3]*this.boxSize.height/this.svgSize.height){
						vbArr[1]=this.svgSize.height-vbArr[3]*this.boxSize.height/this.svgSize.height
					};
				}
			}else{
				var vbArr=arr;
			}
			this.svgEle[0].setAttribute("viewBox", vbArr[0]+' '+vbArr[1]+' '+vbArr[2]+' '+vbArr[3]);
			this.currentVBArr=this.svgEle.attr('viewBox').split(' ');
			this.radarCurrentMsg.left=this.currentVBArr[0]/this.svgSize.width*this.radarAreaSize.width;
			this.radarCurrentMsg.top=this.currentVBArr[1]/this.svgSize.height*this.radarAreaSize.height;
			this.goRadarCurrent()
		},
		moveToPosition:function(endPosition){
			let that=this;
			let number=50;
			let d0=(endPosition[0]-that.currentVBArr[0])/number;
			let d1=(endPosition[1]-that.currentVBArr[1])/number;
			let d2=(endPosition[2]-that.currentVBArr[2])/number;
			let d3=(endPosition[3]-that.currentVBArr[3])/number;
			let i=1;
			let timer= setInterval(function(){
				i+=1;
				if(i<=number){
					that.svgEle[0].setAttribute("viewBox", parseFloat(that.currentVBArr[0])+d0*i+' '+(parseFloat(that.currentVBArr[1])+d1*i)+' '+(parseFloat(that.currentVBArr[2])+d2*i)+' '+(parseFloat(that.currentVBArr[3])+d3*i));
					
				}else{
					clearInterval(timer);
					timer=null;
					that.currentVBArr=that.svgEle[0].attributes.viewBox.nodeValue.split(' ');
					that.radarCurrentMsg.left=that.currentVBArr[0]/that.svgSize.width*that.radarAreaSize.width;
					that.radarCurrentMsg.top=that.currentVBArr[1]/that.svgSize.height*that.radarAreaSize.height;
					that.goRadarCurrent();
				}
			},5)
		},
		goRadarCurrent:function(){
			this.radarCurrentMsg.width=this.boxSize.width/(this.svgSize.width*this.svgSize.width/this.currentVBArr[2])*this.radarAreaSize.width;
			this.radarCurrentMsg.height=this.boxSize.height/(this.svgSize.height*this.svgSize.height/this.currentVBArr[3])*this.radarAreaSize.height;
			
			
			this.currentRadarEle.css({width:this.radarCurrentMsg.width+'px',height:this.radarCurrentMsg.height+'px',top:this.radarCurrentMsg.top+'px',left:this.radarCurrentMsg.left+'px'})
		}
	}
	/**
	 * 自定义过滤器
	 * */
	Vue.filter('capitalize', function(value) {
		if(!value) return ''
		value = value.toString()
		return value.charAt(0).toUpperCase() + value.slice(1)
	})
	Vue.filter('num', function(value, n) {
		if(!value) return ''
		return Number(value).toFixed(n || 2)
	})
	Vue.filter('objArrayFilter', function(objArray, key, mValue, rKey) {
		console.log(objArray, key, mValue, rKey);
		if(!objArray || !key || !mValue) {
			throw new Error('参数不全！');
			return '';
		}
		let res = objArray.filter(function(item) {
			return item[key] == mValue;
		});
		if(rKey) {
			if(res.length > 1) {
				throw new Error('过滤结果大于一个！');
				return;
			} else if(res.length == 1) {
				return res[0][rKey];
			} else {
				return '--';
			}
		} else {
			return res;
		}

	})
//	Vue.directive('yxclass', { //五个注册指令的钩子函数
//      bind: function(el,bindings) { //被绑定
//      	$(el).attr('yxclass',bindings.value)
//      	console.log(bindings)
//      	//el.innerHTML=bindings.value;
//            //$(el).attr('yxclass',bindings.value)
//      },
//      inserted: function() { //绑定到节点
//          console.log('2 - inserted');
//      },
//      update: function(el,bindings) { //组件更新
//      	//el.innerHTML=bindings.value;
//          //console.log('3 - update');
//          $(el).attr('yxclass',bindings.value)
//      },
//      componentUpdated: function() { //组件更新完成
//          console.log('4 - componentUpdated');
//      },
//      unbind: function() { //解绑
//          console.log('5 - bind');
//      }
//  })

}
export default myPlugins