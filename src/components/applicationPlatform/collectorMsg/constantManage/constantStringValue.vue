<template>
<div class="constant-stringValue">
	<button class="btn btn-default" v-on:click="synchronousData">集中器数据同步到数据库</button>
	<ul class="edit-panel">
		<li class="list-item">
			<h4 class="item-title">
				MODBUS通讯设备配置信息
				<button class="btn btn-default" v-on:click="modbusSaveFun">保存修改</button>
			</h4>
			<ul class="item-content row">
				<li class="col-lg-6">
					<span class="item-label">集中器名称：</span>
					<input type="text" v-model="$store.state.currentStation.StationName"/>
				</li>
				<li class="col-lg-6">
					<span class="item-label">ip地址：</span>
					<input type="text" v-model="$store.state.currentStation.IPAddress" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">子网掩码：</span>
					<input type="text" v-model="$store.state.currentStation.IPMask" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">网关：</span>
					<input type="text" v-model="$store.state.currentStation.Gateway" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">MAC地址：</span>
					<input type="text" v-model="$store.state.currentStation.MacAddress" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">通讯端口：</span>
					<input type="text" v-model="$store.state.currentStation.Port" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">集中器发短信：</span>
					<input type="text" v-model="$store.state.currentStation.SmsFlag"/>
				</li>
				<li class="col-lg-6">
					<span class="item-label">手机号码1：</span>
					<input type="text" v-model="$store.state.currentStation.Telenumber1"/>
				</li>
				<li class="col-lg-6">
					<span class="item-label">手机号码2：</span>
					<input type="text" v-model="$store.state.currentStation.Telenumber2"/>
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">手机号码3：</span>
					<input type="text" v-model="$store.state.currentStation.Telenumber3" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">Modbus地址：</span>
					<input type="text" v-model="$store.state.currentStation.ModbusAddress" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">目标地址：</span>
					<input type="text" v-model="$store.state.currentStation.DestPort" />
				</li>
				
				<!--<li class="col-lg-4 col-md-6">
					<span class="item-label">电池串数：</span>
					<input type="text" v-model="$store.state.currentStation." />
				</li>-->
				<!--<li class="col-lg-4 col-md-6">
					<span class="item-label">充电机数：</span>
					<input type="text" v-model="$store.state.currentStation." />
				</li>-->
				<!--<li class="col-lg-4 col-md-6">
					<span class="item-label">开入装置数：</span>
					<input type="text" v-model="$store.state.currentStation." />
				</li>
				<li class="col-lg-4 col-md-6">
					<span class="item-label">开出装置数：</span>
					<input type="text" v-model="$store.state.currentStation." />
				</li>
				<li class="col-lg-4 col-md-6">
					<span class="item-label">放电装置数：</span>
					<input type="text" v-model="$store.state.currentStation." />
				</li>
				<li class="col-lg-4 col-md-6">
					<span class="item-label">绝缘监察数：</span>
					<input type="text" v-model="$store.state.currentStation." />
				</li>-->
			</ul>
		</li>
		<li class="list-item" v-for="(string,index) in $store.state.currentStringsMsg">
			<h4 class="item-title">
				<span v-on:click="string.showDetail=!string.showDetail">{{string.StringNo+1}}号电池串配置信息</span>
				<button class="btn btn-default" v-on:click="stringSaveFun(string)">保存修改</button>
			</h4>
			<ul class="item-content row" v-show="string.showDetail">
				<li class="col-lg-6">
					<span class="item-label">电池个数：</span>
					<input type="text" v-model="string.CellNumber" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">电池类型（电压级别）：</span>
					<input type="text" v-model="string.CellType" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">模块类型：</span>
					<input type="text" v-model="string.ModuleType" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">额定容量(A/h)：</span>
					<input type="text" v-model="string.CellCapacity" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">标称内阻(uΩ)：</span>
					<input type="text" v-model="string.RatedImpedance" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">内阻上限值(mΩ)：</span>
					<input type="text" v-model="string.MaxCellRes" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">电压上限值1(V)：</span>
					<input type="text" v-model="string.MaxCellVol1" />
				</li>
				<!--<li class="col-lg-4 col-md-6">
					<span class="item-label">电压上限值2(V)：</span>
					<input type="text" v-model="string.MaxCellVol2" />
				</li>-->
				<li class="col-lg-6">
					<span class="item-label">电压下限值1(V)：</span>
					<input type="text" v-model="string.MinCellVol1" />
				</li>
				<!--<li class="col-lg-4 col-md-6">
					<span class="item-label">电压下限值2(V)：</span>
					<input type="text" v-model="string.MinCellVol2" />
				</li>-->
				
				<li class="col-lg-6">
					<span class="item-label">温度上限制(℃)：</span>
					<input type="text" v-model="string.MaxCellTemp" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">温度下限值(℃)：</span>
					<input type="text" v-model="string.MinCellTemp" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">容量下限值：</span>
					<input type="text" v-model="string.MinCellCap" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">电压差上限值：</span>
					<input type="text" v-model="string.MaxDeltaVol" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">内阻变化率上限值：</span>
					<input type="text" v-model="string.MaxResRate" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">放电电流上限值(A)：</span>
					<input type="text" v-model="string.MaxDischargeCur" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">充电电流上限值(A)：</span>
					<input type="text" v-model="string.MaxChargeCur" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">充电电流下限值(A)：</span>
					<input type="text" v-model="string.MinChargeCur" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">浮充电流上限值(A)：</span>
					<input type="text" v-model="string.MaxFloatCur" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">总电压上限值(V)：</span>
					<input type="text" v-model="string.MaxTotalVol" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">总电压下限值(V)：</span>
					<input type="text" v-model="string.MinTotalVol" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">纹波系数上限值：</span>
					<input type="text" v-model="string.MaxRipple" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">正常采样间隔(M)：</span>
					<input type="text" v-model="string.NormalSpan" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">充放电采样间隔(M)：</span>
					<input type="text" v-model="string.ChargeSpan" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">终止放电时间(M)：</span>
					<input type="text" v-model="string.StopTimeSpan" />
				</li>
				
				<li class="col-lg-6">
					<span class="item-label">终止放电总电压值(V)：</span>
					<input type="text" v-model="string.StopTotalVol" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">终止放电单体电压(V)：</span>
					<input type="text" v-model="string.StopCellVol" />
				</li>
				<li class="col-lg-6">
					<span class="item-label">终止放电温度(℃)：</span>
					<input type="text" v-model="string.StopTemperature" />
				</li>
			</ul>
		</li>
	</ul>
</div>
</template>
<script>
export default {
	name: "constantStringValue",
	data: function() {
		return {
			stringsMsg:null,
		}
	},
	methods:{
		synchronousData(){
			this.getStringConstantFun();return;
			var that=this;
			this.yxRequest(
				'get',"/platform/constantmanage/synchronousdata", 
				{StationIP:this.$store.state.currentStation.IPAddress,StationID:this.getLocalStorage('currentStationID')},
				function(result) {
					console.log(result.data);
					that.getStringConstantFun();
					that.getCurrentStation();
					that.yxToastr.success('同步成功！');
				},
				function(result) {
					that.yxToastr.error('从集中器获取配置信息失败数据失败:'+result.msg);
					console.log('err:',result);
			})
		},
		getStringConstantFun:function(){
			let that = this;
			this.yxRequest(
			'get',
			"/platform/constantmanage/getstringconstant",
			{StationID:this.getLocalStorage('currentStationID')},
			function(result) {
				result.data.forEach(function(string){
					string.showDetail=0;
				})
				that.$store.commit('getCurrentStringsMsg', {
					stringsMsg:result.data,
				})
			},
			function(result) {
				that.yxToastr.error('获取电池串配置数据失败:' + result.msg);
				console.log('err:', result);
			})
		},
		getCurrentStation:function(){
			var that=this;
			this.yxRequest(
				'get',
				"/platform/currentstation", 
				{StationID:this.getLocalStorage('currentStationID')},
				function(result) {
					//console.log(result);
					that.$store.commit('getCurrentStation', {
						station:result.data[0],
					})
				},
				function(result) {
					that.yxToastr.error('获取currentstation失败:'+result.msg);
					console.log('err:',result);
			})
		},
		stringSaveFun:function(string){
			console.log(string);
			string.IPAddress=this.$store.state.currentStation.IPAddress;
			var that=this;
			this.yxRequest(
				'post',
				"/platform/constant/stringconstupdate", 
				string,
				function(result) {
					that.yxToastr.success('保存成功！');
					console.log(result);
				},
				function(result) {
					that.yxToastr.error('修改电池串定值失败失败:'+result.msg);
					console.log('err:',result);
			})
		},
		modbusSaveFun:function(){
			//console.log(this.$store.state.currentStation);
			var that=this;
			this.yxRequest(
				'post',
				"/platform/constant/modbusconstupdate", 
				this.$store.state.currentStation,
				function(result) {
					that.yxToastr.success('保存成功！');
					console.log(result);
				},
				function(result) {
					that.yxToastr.error('修改modbus定值失败失败:'+result.msg);
					console.log('err:',result);
			})
			
		}
	},
	created() {
		
		//console.log(this.$store.state.currentStation)
		//this.getConstantFun(this.$store.state.currentStation.ZoneID,this.$store.state.currentStation.StationID);
	},
}
</script>

<style lang="less" scoped>
.constant-stringValue{
	max-height: 450px;
	overflow: auto;
	text-align: left;
	.item-title{
		.btn{
			float: right;
		}
	}
	/*.item-content{
        li{
            >.item-label{
                width: calc(~"60% - 4px");
            }
            >input{
                width: 40%;
            }
        }
    }*/
}
</style>