<template>
<div class="collector-fileManage">
	<div class="fileManage-left">
		<ul class="menuList">
			<!--<button v-on:click="getAllFiles">getAllFiles</button>-->
			<folder-item v-for="(item,key) in folderList" 
				v-if="!item.isFile" :folderItem="item"
				:key='key' :folderDelete="folderDelete"
				:folderRename="folderRename"
				:folderAccess="folderAccess" 
				:currentFolder="currentFolder"
				:folderSelect="folderSelect"
				:newFolder="newFolder">
			</folder-item>
		</ul>
	</div>
	<div class="fileManage-right" @contextmenu="fileSelect($event,{})" v-contextmenu:contextmenuFile>
		<!--<ul>
		    <li v-for="file in files">{{file.name}} - Error: {{file.error}}, Success: {{file.success}}</li>
	    </ul>
		<button v-show="!$refs.upload || !$refs.upload.active" 
			@click.prevent="$refs.upload.active = true" type="button">
			开始上传</button>
		<button v-show="$refs.upload && $refs.upload.active" 
			@click.prevent="$refs.upload.active = false" type="button">
			停止上传</button>-->
		
		<ul>
			<li v-for="item in currentFolder.children" 
				v-contextmenu:contextmenuFile
				:class='{selectedItem:currentFile.fid==item.fid}'
				@contextmenu="fileSelect($event,item)"
				v-if="item.isFile">{{item.name}}</li>
		</ul>
		<!--{{files}}-->
		<v-contextmenu ref="contextmenuFile" v-on:contextmenu="testFun">
			<v-contextmenu-item v-on:click="fileCompileFun" :disabled="typeof currentFile.name == 'undefined'">编译</v-contextmenu-item>
		    <v-contextmenu-item v-on:click="fileDownload" :disabled="typeof currentFile.name == 'undefined'">下载</v-contextmenu-item>
		    <v-contextmenu-item v-on:click="fileDelete" :disabled="typeof currentFile.name == 'undefined'">删除</v-contextmenu-item>
		    <v-contextmenu-item v-on:click="fileRename" :disabled="typeof currentFile.name == 'undefined'">重命名</v-contextmenu-item>
		    <v-contextmenu-item v-on:click="showForm"><!---->
		    	上传文件
		    	<!--post-action="http://127.0.0.1:3000/fileOption/fileupload" 
		    	:maximum="10" :headers="{'access_token': getToken(),'Content-Type':'application/octet-stream'}"-->
		    	
				<!--:multiple="false"
				    extensions="jpg,jpeg,gif,png,webp,svg"
				    :size="1024 * 1024"
				    :timeout="600 * 1000"
				    :headers="{'access_token': getToken(),'Content-Type':'application/octet-stream'}"
				    :drop="true"
				    accept="image/png,image/gif,image/jpeg,image/webp,image/svg+xml"-->
				<!--<label for='my_file' class="theme-color">
				  上传文件
				</label>
				<input type="file" ref="upload"
					 name="file" id='my_file'
					  style="display:none;" 
					  accept="image/jpg" 
					  @change="fileUpload" />-->

		    </v-contextmenu-item>
		</v-contextmenu>
	</div>
	<div class="modal fade fileRenameModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					文件重命名
				</div>
				<div class="modal-body"><!--currentFile.name-->
					<input type="text" v-model="newFileName"
						@keyup.enter="fileRenameConfirm" />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" v-on:click="fileRenameConfirm">确认</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade fileDeleteModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					文件删除确认！
				</div>
				<div class="modal-body">
					确定删除吗？删除后将不可以恢复！
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" v-on:click="fileDeleteConfirm">确认</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>		
	<div class="modal fade folderRenameModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					文件夹重命名
				</div>
				<div class="modal-body"><!--selFolder.name-->
					<input type="text" v-model="newFolderName"
						@keyup.enter="folderRenameConfirm" />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" v-on:click="folderRenameConfirm">确认</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>	
	<div class="modal fade folderDeleteModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					文件夹删除确认！
				</div>
				<div class="modal-body">
					确定删除吗？删除后将不可以恢复！
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" v-on:click="folderDeleteConfirm">确认</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade newFolderModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					新建子文件夹
				</div>
				<div class="modal-body">
					<input type="text" v-model="newFolder_name"
						@keyup.enter="newFolderConfirm" />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" 
						v-on:click="newFolderConfirm">确认</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade fileUploadModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					文件上传
				</div>
				<div class="modal-body">
					<form id="fileUploadForm" action="http://127.0.0.1:3000/fileOption/fileupload"  
			    		method="post" enctype="multipart/form-data">
			    		<input type="file" value="选择文件" name="file"
			    			accept="image/gif,image/jpeg,image/svg+xml"/>
			    		<input  type="hidden" name="path" v-model="currentFolder.url" />
			    	</form>
			    	<!--put-action= "http://127.0.0.1:3000/fileOption/fileupload"-->
			    	<!--<file-upload
					    ref="upload"
					    v-model="files"
					    put-action="http://127.0.0.1:3000/fileOption/fileupload"
					    post-action="http://127.0.0.1:3000/fileOption/fileupload"
					    :headers="{access_token: 'abcdef'}"
					    :data="{access_token: 'access_token',path:'1/132'}"
					    @input-file="inputFile"
					    :multiple="false"
					    @input-filter="inputFilter" 
					    :custom-action="customAction">
					  	上传文件
					</file-upload>-->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn yx-btn-active" v-on:click="fileUploadConfirm">确认</button>
					<button type="button" class="btn yx-btn-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>	
</div>
</template>
<script>
import folderItem from '../../myComponents/folderItemComponent'
export default {
	name: "fileManage",
	data: function() {
		return {
			files:[],//要上传的文件列表
			//file:'',
			selFolder:{},//右键的文件夹
			newFileName:'',//文件重命名-新名字
			newFolderName:'',//文件夹重命名-新名字
			newFolder_name:'',//新建文件夹-文件夹名
			folderList:[
				{
					fid:1,
					name:'',
					isFile:0,
					showChildren:1,
					children:[]
				}
			],
			username:111,
			folderList1:[
				{
					fid:1,
					name:'文件夹1',
					isFile:0,
					showChildren:0,
					children:[
						{
							fid:6,
							name:'文件1_1_1.svg',
							isFile:1,
							url:'http://127.0.0.1:3000/1/test.svg',
						}
					]
				}
			],
			currentFolder:{},//当前打开的文件夹
			contextMenu:{},
			currentFile:{},//右键的文件
		}
	},
	methods:{
		fileUpload:function(event){
			let img = event.target.files[0];
		    let size = img.size;
		    if (size > 3145728) {
		        alert('请选择3M以内的图片！');
		        return false;
		    }
		      let Form = new FormData();
		      Form.append('file', img, this.file_name);
		      //Form.middlePath='文件夹1';
	      	this.yxRequest(
				'post',
				"/fileOption/fileupload",
				Form,
				function(result) {
					console.log(result);
					that.yxToastr.success('成功');
				},
				function(result) {
					console.log('err:', result);
					that.yxToastr.error(result.msg);
				}
			)
		},
		showForm:function(){
			$('.fileUploadModal').modal('show');
		},
		customAction:async function (file, component) {
			console.log(file)
			let path='1';
			$('.fileUploadModal').modal('show')
			//return await component.uploadPut(file);
			return await component.uploadHtml4(file,path)
		},
		fileUploadConfirm:function(){
			let that=this;
			$('#fileUploadForm').ajaxSubmit({
				url:'http://127.0.0.1:3000/fileOption/fileupload',
				type:'post',
				headetrs:{
					'access_token':'token'
				},
				success:function(result){
					//console.log('succ:',result);
					$('.fileUploadModal').modal('hide')
					that.getAllFiles();
				},
				error:function(result){
					console.log('err:',result)
				}
			})
		},
		folderAccess:function(url){
			console.log(url)
			if(!url){
				var url=this.currentFolder.url;
			}
			let arr=url.split('/');
			this.currentFolder=this.folderList[0];
			for(let i=1;i<arr.length;i++){
//				this.currentFolder.children.filter(function(item){
//					return item.name==arr[i];
//				})[0].showChildren=1;
				
				this.currentFolder=this.currentFolder.children.filter(function(item){
					return item.name==arr[i];
				})[0];
				
			}
		},
		fileCompileFun:function(){
			let that=this;
			$.ajax({
				type:"get",
				url:'http://127.0.0.1:3000/client/'+this.currentFile.url,
				async:true,
				success:function(result){
					var file = new File([that.parseDom(that.compileFun(result).children[0])], that.currentFile.name, { type: "text/plain;charset=utf-8" });
					that.fileSaver.saveAs(file);
				},
				error:function(result){
					console.log('err:',result)
				}
			});
		},
		fileDownload:function(){
			let that=this;
			$.ajax({
				type:"get",
				url:'http://127.0.0.1:3000/client/'+this.currentFile.url,
				async:true,
				success:function(result){
					//console.log(that.parseDom(result.children[0]));
					var file = new File([that.parseDom(result.children[0])], that.currentFile.name, { type: "text/plain;charset=utf-8" });
					that.fileSaver.saveAs(file);
				},
				error:function(result){
					console.log('err:',result)
				}
			});
		},
		fileDelete:function(){
			console.log('fileDelete');
			
			$('.fileDeleteModal').modal('show')
			
		},
		fileDeleteConfirm:function(){
			console.log(this.currentFile.url);
			let that = this;
			this.yxRequest(
				'post',
				"/fileOption/filedelete",
				{url:this.currentFile.url},
				function(result) {
					that.yxToastr.success('文件删除成功');
					$('.fileDeleteModal').modal('hide');
					that.getAllFiles();
				},
				function(result) {
					console.log('err:', result);
					that.yxToastr.error(result.msg);
			})
		},
		fileRename:function(){
			console.log(this.currentFile);
			$('.fileRenameModal').modal('show');
			this.newFileName=this.currentFile.name;
		},
		fileRenameConfirm:function(){
			let that = this;
			this.yxRequest(
				'post',
				"/fileOption/filerename",
				{
					url:this.currentFile.url,
					newname:this.newFileName
				},
				function(result) {
					that.yxToastr.success('文件重命名成功');
					$('.fileRenameModal').modal('hide');
					that.getAllFiles();
				},
				function(result) {
					console.log('err:', result);
					that.yxToastr.error(result.msg);
			})
		},
		folderSelect:function(item){
			this.selFolder=item;
		},
		folderDelete:function(){
			$('.folderDeleteModal').modal('show')
		},
		folderDeleteConfirm:function(){
			console.log(this.selFolder.url);
			let that = this;
			this.yxRequest(
				'post',
				"/fileOption/folderdelete",
				{url:this.selFolder.url},
				function(result) {
					that.yxToastr.success('文件夹删除成功');
					$('.folderDeleteModal').modal('hide');
					that.getAllFiles();
				},
				function(result) {
					console.log('err:', result);
					that.yxToastr.error(result.msg);
			})
		},
		folderRename:function(){
			$('.folderRenameModal').modal('show');
			this.newFolderName=this.selFolder.name;
		},
		folderRenameConfirm:function(){
			let that = this;
			this.yxRequest(
				'post',
				"/fileOption/folderrename",
				{
					url:this.selFolder.url,
					newname:this.newFolderName
				},
				function(result) {
					that.yxToastr.success('文件夹重命名成功');
					$('.folderRenameModal').modal('hide');
					that.getAllFiles();
				},
				function(result) {
					console.log('err:', result);
					that.yxToastr.error(result.msg);
			})
		},
		newFolder:function(){
			console.log(this.selFolder);
			$('.newFolderModal').modal('show');
			
		},
		newFolderConfirm:function(){
			console.log(this.newFolder_name);
			console.log(this.selFolder.url);
			let that = this;
			this.yxRequest(
				'post',
				"/fileOption/foldernew",
				{
					url:this.selFolder.url,
					sonFoldername:this.newFolder_name
				},
				function(result) {
					that.yxToastr.success('新建子文件夹成功');
					$('.newFolderModal').modal('hide');
					that.getAllFiles();
				},
				function(result) {
					console.log('err:', result);
					that.yxToastr.error(result.msg);
			})
		},
		fileSelect:function(event,item){
			//console.log(event)
			this.currentFile=item;
			event.stopPropagation() 
			//console.log(this.currentFile.name)
		},
		getAllFiles:function(){
			let that = this;
			this.yxRequest(
				'get',
				"/fileOption/getallfiles",
				{},
				function(result) {
					that.$store.commit('fileListChange', {
						fileList:result.data,
					})
					if(!that.$store.state.fileList.url){
						that.$store.commit('fileListRootUrl', {
							url:JSON.parse(that.getLocalStorage('userInfo')).UserName,
						})
					}
					that.folderList=that.$store.state.fileList;
					//console.log('succ:',result);
					if(that.currentFolder.url){
						that.folderAccess();
					}
					
					//console.log(that.$store.state.fileList)
					
				},
				function(result) {
					console.log('err:', result);
			})
		},
		fileUploadFun:function(){
			if(this.file){
				console.log(this.file)
			}
			
		},
		getToken:function(){
//			return $.cookie('access_token')||'';
			return 'token'
		},
		
		/**
	     * Has changed
	     * @param  Object|undefined   newFile   只读
	     * @param  Object|undefined   oldFile   只读
	     * @return undefined
	     */
	    inputFile: function (newFile, oldFile) {
	      if (newFile && oldFile && !newFile.active && oldFile.active) {
	        // 获得相应数据
	        console.log('response', newFile);
	        if (newFile.xhr) {
	          //  获得响应状态码
	          console.log('status', newFile.xhr.status)
	          
	        }
	      }
	    },
	    /**
	     * Pretreatment
	     * @param  Object|undefined   newFile   读写
	     * @param  Object|undefined   oldFile   只读
	     * @param  Function           prevent   阻止回调
	     * @return undefined
	     */ 
	    inputFilter: function (newFile, oldFile, prevent) {
	      if (newFile && !oldFile) {
	        // 过滤不是图片后缀的文件
	        if (!/\.(jpeg|jpe|jpg|gif|png|webp|xls|svg|png)$/i.test(newFile.name)) {
	          return prevent()
	        }
	      }
	      // 创建 blob 字段 用于图片预览
	      newFile.blob = ''
	      let URL = window.URL || window.webkitURL
	      if (URL && URL.createObjectURL) {
	        newFile.blob = URL.createObjectURL(newFile.file)
	      }
	    },
		testFun:function(){
			console.log('testFun')
		},
		uploadStart:function(){
			this.$refs.upload.active=true;
		},
	},
	created() {
		let that=this;
		that.folderList[0].name=JSON.parse(that.getLocalStorage('userInfo')).UserName;
		that.folderList[0].url=that.folderList[0].name;
		//this.getAllFiles();
		if(!that.$store.state.fileList[0].children.length){
			this.getAllFiles();
		}else{
			that.folderList=that.$store.state.fileList;
		}
		this.folderAccess(JSON.parse(that.getLocalStorage('userInfo')).UserName);
	},
	components: {
		folderItem,
	},
	watch:{
		files:'uploadStart'
	}
}
</script>

<style lang="less"  scoped>
@import '../../../style/app.less';
.collector-fileManage{
	border: 1px solid @border-color;
	height: calc(~"100% - 42px");
	min-height: 300px;
	.fileManage-left{
		width: 300px;
		height: 100%;
		float: left;
		border: 1px solid @border-color;
		padding:6px;
		.menuList{
			text-align: left;
			>li{
				padding: 3px 0 3px 12px;
				margin-bottom: 1px;
				.folder-item{
					width:100%;
					display:inline-block;
					background:#eee;
					.glyphicon{
						float: right;
					}
				}
			}
		}
	}
	.fileManage-right{
		height: 100%;
		margin-left: 300px;
		border: 1px solid @border-color; 
		text-align: left;
		padding: 6px;
		.selectedItem{
			background: lighten(@active-color,40%);
		}
	}
}
</style>


