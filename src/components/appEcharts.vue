<template>
<div class ="echarts">
  <h1 v-if="option.isShowHead" 
           :class='[option.headIcon?"":"title", "font24"]'
    >
    <i v-if="option.headIcon":class="option.headIcon"></i>{{option.title}}
    <span class="time font18">{{option.sumdata?option.sumdata:''}}</span>
  </h1>
  <span v-else class="font14">{{option.time}}</span>
  <div :id="echartId" class="echartArea" :style="echartStyle"></div>
</div> 
</template>
<script >
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框、title组件、legend组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/visualMap');
export default{
 name:'echart',
 props:{
       echartId:{
            default:'echartArea',
       },
       option:{
       	type:Object,
       	default:()=>{
       		return{
       		isSmooth:true,  //折线图是否曲线化
       		isFilling:true,// 折线图区域是否填充
       		headIcon:null, //表头icon类名  light和user
       		isShowHead:true, //是否要显示title
       		time:'', // 需要显示的时间
       		title:'', //表头名
               sumdata:'',//当前时间显示的数据
       		data:'',//echart数据 
       		xAxis:[], //echart x轴各项名
       		//style:{'height':'3.6rem','width':'8.66666667rem'}
       	              }
                },
       },
       echartStyle:{
       	type:Object,
       	default:()=>{
       		return{
	               height:'3.6rem',
	 		width:'8.66666667rem', 
       	               }
                 }
       }
 },
 data(){
 	return{
                myChart:null,
                xMonth:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
 	      colorLinear:[{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[{
                       offset:1,color:'#fff'
                    },{
                       offset:0,color:'#009eff'
                    }]
                 },{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[{
                       offset:1,color:'#fff'
                    },{
                       offset:0,color:'#19ff00'
                    }]
                 },{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[{
                       offset:1,color:'#fff'
                    },{
                       offset:0,color:'#ff9900'
                    }]
                 },{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[{
                       offset:1,color:'#fff'
                    },{
                       offset:0,color:'#ff6600'
                    }]
                 }
                ],//区域填充颜色渐变值，对应下面四个颜色值
                optionLine:{
		    color:["#009eff","#19ff00","#ff9900","#ff6600"],
		    tooltip : {
		        trigger: 'axis',
		        /*axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        },*/
                        textStyle:{}
		    },
		    legend: {
		       right:'2%',
		       textStyle:{
		           color:'#777',
		        }, 
                       //selectedMode:false //禁用点击
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    grid: {
		        left: '2%',
		        right: '4%',
		        bottom: '1%',
                       top:'18%',
		        containLabel: true
		    },
		    xAxis : {
		            type : 'category',
		            boundaryGap : false,
		           // data : ['周一','周二','周三','周四','周五','周六','周日'],
		            /*offset:40,*/   //只能使周一周二下移，x轴线不能下移
		            position:'bottom',
		            axisLine :{
		            	 symbol:'circle',
		            	 symbolSize :[10,10],
		                 lineStyle:{
		                 	width:'2',
		                 	color:'#999'
		                 }
		            },
                           axisLabel:{
                            
                           },
		            axisTick :{
		            	show:false
		            },
                           splitNumber:6
		        },
		    yAxis : {
		            show:true ,
		            type : 'value',
		            axisLine :{
		               show:false,
		                lineStyle:{
		                     color:'#999'
		                 }
		            },
                           axisLabel:{

                           },
		            axisTick :{
		            	show:false
		            },
		            splitLine:{
		            	lineStyle:{
		            	   type:'dashed'
		            	}
		            }
		        },
		},
 	}
 },
 mounted(){
   this.setOption(); 
   this.drawLine(); 
   var that=this;
    let resizeDiv = document.getElementById(this.echartId);
    let listener = function () {
         setTimeout(()=>{
              that.myChart.resize();
            },400)
    };
     EleResize.on(resizeDiv, listener);
 },
 watch:{
    option(){
    	this.setOption(); 
                this.drawLine();
    }
 },
 methods:{
   setOption(){
       let seriesData=[];
       let legendData=[]
       var that=this;

        let dpr=document.getElementsByTagName("html")[0].getAttribute("data-dpr");
       //根据dpr来设置echart中字体大小
       if(dpr==3){ 
             this.optionLine.legend.itemWidth=34;
             this.optionLine.legend.itemHeight=28;
             this.optionLine.xAxis.axisLabel.fontSize=28;
             this.optionLine.yAxis.axisLabel.fontSize=28;
             this.optionLine.tooltip.textStyle.fontSize=28;
             this.optionLine.legend.textStyle.fontSize=28;
       }else if(dpr==2){
            this.optionLine.legend.itemWidth=24;
            this.optionLine.legend.itemHeight=18;
            this.optionLine.xAxis.axisLabel.fontSize=20;
             this.optionLine.yAxis.axisLabel.fontSize=20;
             this.optionLine.tooltip.textStyle.fontSize=20;
            this.optionLine.legend.textStyle.fontSize=20;
       }

       this.option.data.forEach((item,index)=>{
         	let json={
                    name:item.name,
  	            type:'line',
  	            smooth: that.option.isSmooth, 
  	            data:item.data,
         	}; 
               if(dpr==3){ 
                   json.symbolSize=12
               }else{
                   json.symbolSize=8
               }
         /* if(that.option.isSmooth){   //需要填充的报表就需要堆叠数据显示
            json.stack='总量';
          };*/
       	 if(that.option.isFilling){
                   json.areaStyle= {color:this.colorLinear[index]}  
          }
       	 legendData.push({name:item.name,icon:'rect'});
         seriesData.push(json);
          if(item.isTwo){   //如果该条数据是实际与预估
                legendData.push({name:item.name2,icon:'rect'});
                seriesData.push({
                  name:item.name2,
                  type:'line',
                  smooth:true,
                  areaStyle:{color:this.colorLinear[index]},
                  data:[],
                });
               this.optionLine.visualMap={
                                                                    show: false,
                                                                    dimension: 0,
                                                                    pieces: [{
                                                                        lte:item.startIndex,
                                                                        color:this.optionLine.color[index]
                                                                    }, {
                                                                        gt:item.startIndex,
                                                                        lte:item.data.length,
                                                                        color: this.optionLine.color[index+1]
                                                                    }],
                                                                    seriesIndex:index,
                                                                }
                this.optionLine.tooltip.formatter=function(params){
                        let html=params[0].axisValue+'<br/>';
                        let data=item;
                        params.forEach((item,index)=>{
                            if(item.dataIndex>data.startIndex&&item.seriesName==data.name){
                              html+=item.marker+data.name2+":"+item.value+"<br/>"
                            }else{
                              html+=item.marker+item.seriesName+":"+item.value+"<br/>"
                            }
                        })
                        return html;
                }
          }
       })
       this.optionLine.series=seriesData;

       let arr=[]; 
       if(this.option.time.length<5){
          for(var i=0;i<5;i++){
            arr.unshift(parseInt(this.option.time)-i)
          }
          this.optionLine.xAxis.data=arr;
       }else if(this.option.time.length<7){
           this.optionLine.xAxis.data=this.xMonth;
       }else{
           switch(parseInt(this.option.time.substr(4,2))) {
             case 1:
             case 3:
             case 5:
             case 7:
             case 8:
             case 10:
             case 12:
               this.optionLine.xAxis.data=this.makeXday(31);
               break;
             case 4:
             case 6:
             case 9:
             case 11: 
               this.optionLine.xAxis.data=this.makeXday(30);
               break;
             case 2:
                let year=parseInt(this.option.time.substr(0,4)) 
                this.optionLine.xAxis.data=this.makeXday(((year%4==0&&year%100!=0)||year%400==0)?29:28);
           } 
       }
       this.optionLine.legend.data=legendData; 
   },
   drawLine(){
       // 基于准备好的dom，初始化echarts实例 
      this.myChart = echarts.init(document.getElementById(this.echartId));
      this.myChart.setOption(this.optionLine);
   },
   makeXday(i){
      let arr=[];
      for(var t=0;t<i;t++){
        arr.push(t+1)
      } 
      return arr;
   }
 }
}
</script>
<style lang="less" scoped>
 .echarts{
     h1{
     	position: relative;
     	height: .53333333rem;
     	line-height: .53333333rem;
     	letter-spacing: .06666667rem;
        padding-right: .30666667rem;
     	&.title{
     	       padding-left: .13333333rem;
     	}
     	&.title:before{
     		display:inline-block;
     		content: '';
     		width:.05333333rem;
     		height: .29333333rem;
     		border-radius: .02666667rem;
     		background: #c9d5ed;
     		position: absolute;
     		top:50%;
     		left:0;
     		margin-top:-.14666667rem;
     		margin-right:.14666667rem;
     	}
     	i{
     	  display: inline-block;
     	   width: .4rem;
     	   height: .46666667rem;
     	   margin-right: .18666667rem;
     	   vertical-align: middle; 
     	}
     	.light{
     	   background: url(../../static/images/@2x/lightsmall@2x.png) no-repeat center center;
     	   [data-dpr='3'] &{
     	   	background: url(../../static/images/@3x/lightsmall@3x.png) no-repeat center center;
     	   }
         background-size: contain;
     	}
     	.user{
     	   background: url(../../static/images/@2x/usersmall@2x.png) no-repeat center center;
     	   [data-dpr='3'] &{
     	   	background: url(../../static/images/@3x/usersmall@3x.png) no-repeat center center;
     	   }
          background-size: contain;
     	}
     }
     span{
     	
     }
     .time{
     	  float: right;
     	}
     .echartArea{
       margin:0 auto;
     }
 }
</style>