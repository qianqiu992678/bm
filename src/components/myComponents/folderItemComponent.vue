<template>
<li>
	<span :class="{'folder-item':true,currentItem:folderItem.fid==currentFolder.fid}">
		<a v-on:click="folderAccess(folderItem.url)"
			v-contextmenu:contextmenuFolder
			@contextmenu="folderSelect(folderItem)">{{folderItem.name}}</a>
		<span :class="{glyphicon:true,'glyphicon-chevron-right':!folderItem.showChildren,'glyphicon glyphicon-chevron-down':folderItem.showChildren}" 
			v-on:click="folderOpenClose"></span>
	</span>
	<ul class="menuList" v-if="folderItem.showChildren&&!folderItem.isFile">
		<folder-item-component v-for="(item,key) in folderItem.children"
			v-if="!item.isFile" :folderAccess="folderAccess"
			 :folderItem="item" :key='key'
			 :folderDelete="folderDelete"
			 :folderRename="folderRename"
			 :currentFolder="currentFolder"
			 :folderSelect="folderSelect"
			 :newFolder="newFolder">
		</folder-item-component>
	</ul>
	<v-contextmenu ref="contextmenuFolder">
	    <v-contextmenu-item v-on:click="folderDelete()">删除</v-contextmenu-item>
	    <v-contextmenu-item v-on:click="folderRename()">重命名</v-contextmenu-item>
	    <v-contextmenu-item v-on:click="newFolder()">新建子文件夹</v-contextmenu-item>
	    <v-contextmenu-item>
	    	<!--put-action="/fileOption/fileupload"-->
	    	<!--<file-upload
			    ref="upload"
			    v-model="files"
			    post-action="http://127.0.0.1:3000/fileOption/fileupload"
			    @input-file="inputFile"
			    @input-filter="inputFilter"
			    :multiple="true"
			    :headers="{'access_token': 'OabJbzhaUdzbEDchjwOyrTLG1ubPYXij'}"
			    extensions="jpg,jpeg,gif,png,webp,svg"
			    :size="1024 * 1024"
			    :timeout="600 * 1000"
			    :maximum="10"
			    :drop="true"
			    accept="image/png,image/gif,image/jpeg,image/webp,image/svg+xml"
			  >
			  上传文件
			</file-upload>-->
	    </v-contextmenu-item>
	</v-contextmenu>
	
</li>


</template>

<script>
/**
 * props:
 * folderItem:当前组件显示的文件夹
 * folderAccess:进入文件——方法
 * currentFolder：当前打开的——文件夹
 * folderDelete：文件夹删除——方法
 * folderRename：文件夹重命名——方法
 * folderSelect：右键选中的文件夹
 * newFolder：新建文件夹 ————方法
 * */

export default {
	name: 'folderItemComponent',
	props:["folderItem","folderAccess","currentFolder","folderDelete","folderRename","folderSelect","newFolder"],
	data: function() {
		return {}
	},
	methods:{
		folderOpenClose:function(){
			this.folderItem.showChildren=!this.folderItem.showChildren;
		},
	},
	created(){},
	components:{
		//FileUpload: VueUploadComponent
	}
	
}
</script>

<style lang="less" scoped>
@import '../../style/app.less';
.menuList{
	text-align: left;
	>li{
		padding: 3px 0 3px 12px;
		margin-bottom: 1px;
		.folder-item{
			width:100%;
			display:inline-block;
			background:#eee;
			>a{
			    display: inline-block;
    			width: calc(~"100% - 30px");
			}
			&:hover{
				background: lighten(@active-color,40%);
			}
			&.currentItem{
				background: lighten(@active-color,40%);
			}
			.glyphicon{
				float: right;
				width:30px;
			}
		}
	}
}
</style>