<template>
 
    <div :id="id"
    :option="option"></div>
  
</template>
<script>
import HighCharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

stockInit(HighCharts)

export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    }
  },
  methods:{
  	createChart:function(){
  		console.log('changed')
  		HighCharts.stockChart(this.id,this.option)
  	}
  },
  watch: {
		'option': 'createChart'
	},
  mounted() {
    this.createChart();
  }
}
</script>