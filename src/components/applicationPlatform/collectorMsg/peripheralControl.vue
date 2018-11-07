<template>
<div class="collector-peripheralControl">
	<div class="peripheralControl-config" v-show="showConfig">
		<div class="content-btns">
			<button class="btn btn-default" v-on:click="showConfig=0">返回</button>
		</div>
		<ul class="edit-panel">
			<li class="list-item">
				<h4 class="item-title">
					MODBUS通讯设备配置信息
					<button class="btn btn-default" v-on:click="cmdSave">保存</button>
				</h4>
				<ul class="item-content row">
					<li class="col-lg-6">
						<span class="item-label">命令编码：</span>
						<input type="text" v-model="currentCmd.CmdNum"/>
					</li>
					<li class="col-lg-6">
						<span class="item-label">命令码名称：</span>
						<input type="text" v-model="currentCmd.CmdName" />
					</li>
					<li class="col-lg-6">
						<span class="item-label">命令码类型：</span>
						<input type="text" v-model="currentCmd.CmdType" />
					</li>
					<li class="col-lg-6">
						<span class="item-label">命令码状态：</span>
						<input type="text" v-model="currentCmd.CmdStatus" />
					</li>
					<li class="col-lg-6">
						<span class="item-label">放电顺序号：</span>
						<input type="text" v-model="currentCmd.DischargeNum"/>
					</li>
					<li class="col-lg-6">
						<span class="item-label">放电操作：</span>
						<input type="text" :readonly="!currentCmd.DischargeNum" 
							v-model="currentCmd.DischargeOption"/>
					</li>
					<li class="col-lg-6">
						<span class="item-label">复位顺序号：</span>
						<input type="text" v-model="currentCmd.ResetNum"/>
					</li>
					<li class="col-lg-6">
						<span class="item-label">复位操作：</span>
						<input type="text" :readonly="!currentCmd.ResetNum" 
							v-model="currentCmd.ResetOption"/>
					</li>
					<li class="col-lg-6">
						<span class="item-label">逻辑描述：</span>
						<input type="text" v-model="currentCmd.LogicDescribe" />
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="peripheralControl-content" v-show="!showConfig">
		<div class="content-btns">
			<button class="btn btn-default" v-on:click="cmdEdit({})">添加</button>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered table-hover">
				<thead> 
					<tr>
						<th>步骤</th>
						<th>动作名称</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(cmd,index) in cmdListSorted.dischargeList">
						<td>放电第{{cmd.DischargeNum}}步</td>
						<td>{{cmd.CmdName}}</td>
						<td>
							<button class="btn btn-primary">执行</button>
							<span class="hot-word" v-on:click="cmdEdit(cmd)">编辑</span>
							<span class="danger-word">删除</span>
						</td>
					</tr>
					<tr v-for="(cmd,index) in cmdListSorted.resetList">
						<td>复位第{{cmd.ResetNum}}步</td>
						<td>{{cmd.CmdName}}</td>
						<td>
							<button class="btn btn-primary">执行</button>
							<span class="hot-word" v-on:click="cmdEdit(cmd)">编辑</span>
							<span class="danger-word">删除</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: "peripheralControl",
	data: function(){
		return {
			showConfig:0,
			cmdList:[],
			currentCmd:{},
		}
	},
	methods:{
		getStepList:function(){
			let that=this;
			this.yxRequest(
				'post',"/cmdOption/cmdlist",
				{},
				function(result) {
					console.log('所有命令码：',result);
					that.cmdList=result.data;
					console.log(that.cmdList)
				},
				function(result) {
					that.yxToastr.error('获取所有命令码失败');
					console.log('err:',result);
			})
		},
		cmdEdit:function(cmd){
			this.showConfig=1;
			this.currentCmd=cmd;
		},
		cmdSave:function(){
			let that=this;
			let url;
			if(this.currentCmd.CmdID){
				url='/cmdOption/cmdedit'
			}else{
				url='/cmdOption/cmdadd'
			}
			this.yxRequest(
				'post',url, 
				this.currentCmd,
				function(result) {
					console.log('所有命令码：',result);
					that.yxToastr.success('保存命令码成功');
					that.showConfig=0;
					that.getStepList();
				},
				function(result) {
					that.yxToastr.error('保存命令码失败');
					console.log('err:',result);
			})
		},
		
	},
	computed:{
		cmdListSorted:function(){
			let dischargList=this.cmdList.filter(function(cmd){
				return cmd.DischargeNum
			})
			let resetList=this.cmdList.filter(function(cmd){
				return cmd.ResetNum
			})
			dischargList=this.sortByKey(dischargList,'DischargeNum');
			resetList=this.sortByKey(resetList,'DischargeNum');
			return {dischargeList:dischargList,resetList:resetList}
		}
	},
	watch:{
		
	},
	created() {
		this.getStepList();
	},
}
</script>

<style lang="less" scoped>
	.collector-peripheralControl{
		.content-btns{
			>.btn{
				float: right;
			}
			&:after{
				content: '';
				display: table;
				clear: both;
			}
		}
		
		.peripheralControl-content{
			.table{
				.btn{
					padding: 1px 6px;
				}
			}
		}
		.peripheralControl-config{
			
		}
	}
</style>