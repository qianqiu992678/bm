<template>
<div class="collector-systemDiagram">
	<!--<h1 v-yxclass='currentSVGData.yaoxin[2].value'>asdfasd</h1>-->
	
		<!--<select v-model="filePath" 
			class="select" name="test" v-on:change="fileChange">
			<option value="http://127.0.0.1:3000/1/index.svg">index</option>
			<option value="http://127.0.0.1:3000/1/test.svg">test</option>
			<option value="http://127.0.0.1:3000/1/组件库1.svg">组件库1</option>
			<option value="http://127.0.0.1:3000/1/组件库2.svg">组件库2</option>
			<option value="http://127.0.0.1:3000/1/组件库3.svg">组件库3</option>
		</select>-->
	<ul class="menuListSelect">
		<!--{{$store.state.fileList}}-->
		<file-select v-for="(item,key) in fileList" 
			:fileChange="fileChange" :folderItem="item" :key='key' >
		</file-select>
	</ul>
	<div class="svg-container"></div>
	<div :class="{radarArea:true}" v-show="showRadar">
		<div class="areaMap"></div>
		<div class="currentArea"></div>
		<div class="areaWrap"></div>
	</div>
</div>
</template>
<script>
import fileSelect from '../../myComponents/fileSelectComponent'
export default {
	name: "systemDiagram",
	data: function() {
		return {
			data:0,
			filePath:'',
			showRadar:true,
			fileList:[],
		}
	},
	methods:{
		fileChange:function(url){
			let that=this;
			$.ajax({
				//headers: {
					//'access_token': access_token
				//},
				type:"get",
				url:'http://127.0.0.1:3000/client/'+url,
				async:true,
				crossDomain: true,
				success:function(result){
					
					$('.svg-container').html('')
					let radarSvgDom=$(result.children[0]).clone();
					let elelist=radarSvgDom.find('[id]')
					for(let i=0;i<elelist.length;i++){
						$(elelist[i]).attr({id:$(elelist[i]).attr('id')+'_radar'})
					}
					$('.svg-container').append(result.children[0]);
					$('.svg-container').css({height:'100%',width:'100%'})
					$('.areaMap').html('')
					$('.areaMap').append(radarSvgDom);
					new that.dragScale($('svg'),$('.radarArea'));
					that.svgInitFun();
				},
				error:function(result){
					console.log('err:',result)
				}
			});
		},
		getAllFiles:function(){
			let that = this;
			return new Promise((resolve)=>{
				this.yxRequest(
					'get',
					"/fileOption/getallfiles",
					{},
					function(result) {
						that.$store.commit('fileListChange', {
							fileList:result.data
						});
						if(!that.$store.state.fileList.url){
							that.$store.commit('fileListRootUrl', {
								url:JSON.parse(that.getLocalStorage('userInfo')).UserName,
							})
						}
						resolve();
					},
					function(result) {
						console.log('err:', result);
				})
			})
				
		},
		//获取首页
		getIndex:function(){
			let that=this;
			that.fileList=that.$store.state.fileList;	
			let arr=this.fileList[0].children.filter(function(folder){
				return folder.name=='index.svg'
			})
			//console.log(JSON.parse(this.getLocalStorage('userInfo')).UserName);
			if(arr.length){
				this.fileChange(JSON.parse(this.getLocalStorage('userInfo')).UserName+'/index.svg');
			}
		},
	},
	computed:{
		currentSVGData() {
			return this.$store.state.currentDataForSVG;
		},
	},
	created() {
		let that=this;
		//console.log(this.$store.state.currentDataForSVG);
		setInterval(function(){
			that.data+=1;
		},2000);
		console.log(that.$store.state.fileList[0].children)
		if(!that.$store.state.fileList[0].children.length){
			this.getAllFiles().then(that.getIndex);
		}else{
			that.getIndex();
		}
		
				
		
	},
	components: {
		fileSelect,
	},
}
</script>
<style lang="less">
@import '../../../style/app.less';
.collector-systemDiagram{
	position: relative;
	height:calc(~"100% - 40px");
	.menuListSelect{
		li{
			position:relative;
			>.menuListSelect{
				display:none;
				position:absolute;
				left:100%;
				top: 0;
			}
			&:hover{
				>.menuListSelect{
					display: block;
				}
			}
		}	
		>li{
			/*//padding: 3px 0 3px 12px;*/
			margin-bottom: 1px;
			&:last-child{
				margin-bottom: 0;
			}
			.folder-item{
				width:100%;
				display:inline-block;
				background:#eee;
				>a{
				    display: inline-block;
	    			width: 100%;
				}
				&:hover{
					background:@active-color;
					a{
						color: #fff;
					}
						
				}
			}
		}
		height:auto;
		border:1px solid #AAAAAA;
		position:absolute;
		width:150px;
	}
		
	.svg-container{
		border: 1px solid #aaa;
		height: 100%;
		overflow:hidden;
	}
	.radarArea{
	    position: absolute;
	    right: 0;
	    top:0;
	    width: 300px;
	    border: 1px solid #aaa;
	    overflow: hidden;
	    .areaMap{
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .areaWrap{
            width: 100%;
            height: 100%;
            position: absolute;
            background: rgba(100,100,100,.4);
        }
        .currentArea{
            position: absolute;
            border: 1px solid #aaa;
            background: rgba(100,100,100,.4);
        }
	}
}

</style>


