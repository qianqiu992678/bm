<template>
	<div class="collector-bianyi">
		<button v-on:click="createChart">画图</button>
		<div id="testChart" style="min-width:400px;height:400px"></div>
	</div>
</template>
<script>
	import HighCharts from 'highcharts'
	import stockInit from 'highcharts/modules/stock'
	stockInit(HighCharts)
	export default {
		name: "bianyi",
		data: function() {
			return {
				options:{
				    "yAxis":[
				        {
				            "labels":{
				                "style":{
				                    "color":"#7cb5ec"
				                }
				            },
				            "plotLines":[
				                {
				                    "value":0,
				                    "width":2,
				                    "color":"silver"
				                }
				            ],
				            "title":{
				                "style":{
				                    "color":"#7cb5ec"
				                }
				            }
				        },
				        {
				            "labels":{
				                "style":{
				                    "color":"#434348"
				                }
				            },
				            "plotLines":[
				                {
				                    "value":0,
				                    "width":2,
				                    "color":"silver"
				                }
				            ],
				            "title":{
				                "style":{
				                    "color":"#434348"
				                }
				            }
				        },
				        {
				            "labels":{
				                "style":{
				                    "color":"#90ed7d"
				                }
				            },
				            "plotLines":[
				                {
				                    "value":0,
				                    "width":2,
				                    "color":"silver"
				                }
				            ],
				            "title":{
				                "style":{
				                    "color":"#90ed7d"
				                }
				            }
				        },
				        {
				            "labels":{
				                "style":{
				                    "color":"#f7a35c"
				                }
				            },
				            "plotLines":[
				                {
				                    "value":0,
				                    "width":2,
				                    "color":"silver"
				                }
				            ],
				            "title":{
				                "style":{
				                    "color":"#f7a35c"
				                }
				            }
				        },
				        {
				            "labels":{
				                "style":{
				                    "color":"#8085e9"
				                }
				            },
				            "plotLines":[
				                {
				                    "value":0,
				                    "width":2,
				                    "color":"silver"
				                }
				            ],
				            "title":{
				                "style":{
				                    "color":"#8085e9"
				                }
				            }
				        },
				        {
				            "labels":{
				                "style":{
				                    "color":"#f15c80"
				                }
				            },
				            "plotLines":[
				                {
				                    "value":0,
				                    "width":2,
				                    "color":"silver"
				                }
				            ],
				            "title":{
				                "style":{
				                    "color":"#f15c80"
				                }
				            }
				        },
				        {
				            "labels":{
				                "style":{
				                    "color":"#f15c80"
				                }
				            },
				            "plotLines":[
				                {
				                    "value":0,
				                    "width":2,
				                    "color":"silver"
				                }
				            ],
				            "title":{
				                "style":{
				
				                }
				            }
				        }
				    ],
				    "credits":{
				        "text":"www.yxdq.net",
				        "href":"http://www.yxdq.net"
				    },
				    "xAxis":{
				        "type":"datetime",
				        "dateTimeLabelFormats":{
				            "day":"%m-%d",
				            "month":"%Y-%m",
				            "year":"%Y"
				        }
				    },
				    "rangeSelector":{
				        "enabled":false
				    },
				    "navigator":{
//				    	"enabled":false,
				        "adaptToUpdatedData":false,
				        "xAxis":{
				            "dateTimeLabelFormats":{
				                "day":"%m-%d",
				                "month":"%Y-%m",
				                "year":"%Y"
				            }
				        }
				    },
				    "legend":{
				        "enabled":true
				    },
				    "tooltip":{
				        "pointFormat":"<span style='color:{series.color}'>{series.name}</span>: <b>{point.y}</b><br/>",
				        "valueDecimals":2,
				        "padding":2,
				        "shared":true,
				        "split":false
				    },
				    "series":[
				        {
				            "name":"1号电池电压",
				            "yAxis":4,
				            "data":[
				                [
				                    1532656890000,
				                    0
				                ],
				                [
				                    1532678649000,
				                    0
				                ],
				                [
				                    1532680473000,
				                    0
				                ],
				                [
				                    1532684042000,
				                    0
				                ],
				                [
				                    1532705784000,
				                    0
				                ],
				                [
				                    1532727541000,
				                    0
				                ],
				                [
				                    1532749298000,
				                    0
				                ],
				                [
				                    1532771056000,
				                    0
				                ],
				                [
				                    1532792814000,
				                    0
				                ],
				                [
				                    1532814572000,
				                    0
				                ],
				                [
				                    1532836327000,
				                    0
				                ],
				                [
				                    1532854424000,
				                    0
				                ],
				                [
				                    1532933319000,
				                    0
				                ],
				                [
				                    1532955081000,
				                    0
				                ],
				                [
				                    1532976838000,
				                    0
				                ],
				                [
				                    1532998598000,
				                    0
				                ],
				                [
				                    1533020356000,
				                    0
				                ],
				                [
				                    1533042112000,
				                    0
				                ],
				                [
				                    1533063870000,
				                    0
				                ],
				                [
				                    1533076337000,
				                    0
				                ],
				                [
				                    1533085623000,
				                    0
				                ],
				                [
				                    1533107376000,
				                    0
				                ],
				                [
				                    1533129130000,
				                    0
				                ],
				                [
				                    1533150883000,
				                    0
				                ],
				                [
				                    1533172636000,
				                    0
				                ],
				                [
				                    1533194389000,
				                    0
				                ],
				                [
				                    1533216143000,
				                    0
				                ],
				                [
				                    1533237896000,
				                    0
				                ],
				                [
				                    1533259649000,
				                    0
				                ],
				                [
				                    1533281402000,
				                    0
				                ],
				                [
				                    1533303180000,
				                    0
				                ],
				                [
				                    1533324935000,
				                    0
				                ],
				                [
				                    1533346833000,
				                    0
				                ],
				                [
				                    1533546882000,
				                    0
				                ],
				                [
				                    1533568642000,
				                    0
				                ],
				                [
				                    1533590401000,
				                    0
				                ],
				                [
				                    1533612165000,
				                    0
				                ],
				                [
				                    1533633925000,
				                    0
				                ],
				                [
				                    1533655685000,
				                    0
				                ],
				                [
				                    1533677445000,
				                    0
				                ],
				                [
				                    1533699201000,
				                    0
				                ],
				                [
				                    1533720957000,
				                    0
				                ],
				                [
				                    1533742712000,
				                    0
				                ],
				                [
				                    1533764467000,
				                    0
				                ],
				                [
				                    1533786223000,
				                    0
				                ],
				                [
				                    1533807979000,
				                    0
				                ],
				                [
				                    1533829734000,
				                    0
				                ],
				                [
				                    1533851490000,
				                    0
				                ],
				                [
				                    1533862672000,
				                    0
				                ],
				                [
				                    1533884434000,
				                    0
				                ],
				                [
				                    1534118865000,
				                    0
				                ],
				                [
				                    1534140623000,
				                    0
				                ],
				                [
				                    1534162384000,
				                    0
				                ],
				                [
				                    1534184145000,
				                    0
				                ],
				                [
				                    1534205907000,
				                    0
				                ],
				                [
				                    1534227667000,
				                    0
				                ],
				                [
				                    1534232063000,
				                    0
				                ],
				                [
				                    1534253823000,
				                    0
				                ],
				                [
				                    1534275583000,
				                    0
				                ],
				                [
				                    1534294281000,
				                    0
				                ],
				                [
				                    1534298806000,
				                    0
				                ],
				                [
				                    1534320564000,
				                    0
				                ],
				            ]
				        },
				        {
				            "name":"1号电池温度",
				            "yAxis":3,
				            "data":[
				                [
				                    1532656890000,
				                    0
				                ],
				                [
				                    1532678649000,
				                    0
				                ],
				                [
				                    1532680473000,
				                    0
				                ],
				                [
				                    1532684042000,
				                    0
				                ],
				                [
				                    1532705784000,
				                    0
				                ],
				                [
				                    1532727541000,
				                    0
				                ],
				                [
				                    1532749298000,
				                    0
				                ],
				                [
				                    1532771056000,
				                    0
				                ],
				                [
				                    1532792814000,
				                    0
				                ],
				                [
				                    1532814572000,
				                    0
				                ],
				                [
				                    1532836327000,
				                    0
				                ],
				                [
				                    1532854424000,
				                    0
				                ],
				                [
				                    1532933319000,
				                    0
				                ],
				                [
				                    1532955081000,
				                    0
				                ],
				                [
				                    1532976838000,
				                    0
				                ],
				                [
				                    1532998598000,
				                    0
				                ],
				                [
				                    1533020356000,
				                    0
				                ],
				                [
				                    1533042112000,
				                    0
				                ],
				                [
				                    1533063870000,
				                    0
				                ],
				                [
				                    1533076337000,
				                    0
				                ],
				                [
				                    1533085623000,
				                    0
				                ],
				                [
				                    1533107376000,
				                    0
				                ],
				                [
				                    1533129130000,
				                    0
				                ],
				                [
				                    1533150883000,
				                    0
				                ],
				                [
				                    1533172636000,
				                    0
				                ],
				                [
				                    1533194389000,
				                    0
				                ],
				                [
				                    1533216143000,
				                    0
				                ],
				                [
				                    1533237896000,
				                    0
				                ],
				                [
				                    1533259649000,
				                    0
				                ],
				                [
				                    1533281402000,
				                    0
				                ],
				                [
				                    1533303180000,
				                    0
				                ],
				                [
				                    1533324935000,
				                    0
				                ],
				                [
				                    1533346833000,
				                    0
				                ],
				                [
				                    1533546882000,
				                    0
				                ],
				                [
				                    1533568642000,
				                    0
				                ],
				                [
				                    1533590401000,
				                    0
				                ],
				                [
				                    1533612165000,
				                    0
				                ],
				                [
				                    1533633925000,
				                    0
				                ],
				                [
				                    1533655685000,
				                    0
				                ],
				                [
				                    1533677445000,
				                    0
				                ],
				                [
				                    1533699201000,
				                    0
				                ],
				                [
				                    1533720957000,
				                    0
				                ],
				                [
				                    1533742712000,
				                    0
				                ],
				                [
				                    1533764467000,
				                    0
				                ],
				                [
				                    1533786223000,
				                    0
				                ],
				                [
				                    1533807979000,
				                    0
				                ],
				                [
				                    1533829734000,
				                    0
				                ],
				                [
				                    1533851490000,
				                    0
				                ],
				                [
				                    1533862672000,
				                    0
				                ],
				                [
				                    1533884434000,
				                    0
				                ],
				                [
				                    1534118865000,
				                    0
				                ],
				                [
				                    1534140623000,
				                    0
				                ],
				                [
				                    1534162384000,
				                    0
				                ],
				                [
				                    1534184145000,
				                    0
				                ],
				                [
				                    1534205907000,
				                    0
				                ],
				                [
				                    1534227667000,
				                    0
				                ],
				                [
				                    1534232063000,
				                    0
				                ],
				                [
				                    1534253823000,
				                    0
				                ],
				                [
				                    1534275583000,
				                    0
				                ],
				                [
				                    1534294281000,
				                    0
				                ],
				                [
				                    1534298806000,
				                    0
				                ],
				                [
				                    1534320564000,
				                    0
				                ],
				                [
				                    1534342324000,
				                    0
				                ],
				                [
				                    1534364085000,
				                    0
				                ],
				                [
				                    1534379411000,
				                    0
				                ],
				                [
				                    1534401168000,
				                    0
				                ],
				                [
				                    1534422928000,
				                    0
				                ],
				                [
				                    1534444687000,
				                    0
				                ],
				                [
				                    1534466447000,
				                    0
				                ],
				                [
				                    1534488206000,
				                    0
				                ],
				                [
				                    1534724597000,
				                    0
				                ],
				                [
				                    1534746355000,
				                    0
				                ],
				                
				            ]
				        }
				    ]
				}

			}
		},
		methods: {
			createChart:function(){
				this.options.series=this.series;
				//console.log(JSON.stringify(this.options));
				HighCharts.stockChart('testChart', this.options);
			},
			 parseDom:function(arg) {
			　　 var objE = document.createElement("div");
			　　 objE.append(arg);
			　　 return objE.innerHTML;
			},
			getSvgFun:function(){
				let that=this;
				$.ajax({
					type:"get",
					url:"http://127.0.0.1:3000/1/test.svg",
					async:true,
					success:function(result){
						//console.log('succ:',$(result).find('*'));
						//console.log($('.btn'))
//						let elements=$(result).find('*');
//						for(let i=1;i<elements.length;i++){
//							
//							if(elements[i].attributes.onclick){
//								let str=elements[i].attributes.onclick.nodeValue;
//								try{
//									var obj=JSON.parse(str.substring(7,str.length-2));
//								}catch(e){
//									//TODO handle the exception
//									console.error('json格式错误：'+$(elements[i].attr('id'))+'--'+str)
//									return;
//								}
//								$(elements[i]).removeAttr("onclick");
//								for(let k in obj){
//									$(elements[i]).attr(obj);
//								}
//								switch (obj.widget_name){
//									case 'widget_lampA':
//										break;
//									case 'widget_lampB':
//										break;
//									default:
//										break;
//								}
//							}
//						}
						result=that.compileFun(result);
						//console.log(that.parseDom(result.children[0]));
						var file = new File([that.parseDom(result.children[0])], `test.svg`, { type: "text/plain;charset=utf-8" });
						that.fileSaver.saveAs(file);
					},
					error:function(result){
						console.log('err:',result)
					}
				});
			}
				
		},
		created() {
			//this.getSvgFun();
			this.series=this.mycopy(this.options.series);
		},
		components: {},
	}
</script>

<style lang="less" scoped>
</style>