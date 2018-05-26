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
import {cookie} from 'vux'
/*这样引入echart，会比在线定制化的echart.js大很多*/
/*// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框、title组件、legend组件  
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/markArea');
require('echarts/lib/component/visualMap');*/
export default{
 name:'echart',
 props:{
       echartId:{
            default:'echartArea',
       },
       isSep:{
        default:false, //离职率使用折线图和柱状图叠加
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
                xMonthcn:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                xMonthen:['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
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
                       offset:0,color:'#f60'
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
                       offset:0,color:'#f3f'
                    }]
                 }
                ],//区域填充颜色渐变值，对应下面四个颜色值
                optionLine:{
        color:["#009eff","#19ff00","#f60","#909"],
        tooltip : {
            trigger: 'axis',
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
       let legendData=[];
       let data=[];
       let isTwo=false;// 看是否有传入预测值，默认没有
       let that=this;
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
       /*处理合并在一起的实际和预测值*/
       if(this.option.data[0]&&this.option.data[0].isTwo){
         this.optionLine.color=["#009eff","#19ff00","#f60","#909"];
         data=[...this.option.data];
         let two=data.shift(); 
         let data1=[];
         let data2=[];
         let data3=[];
         for(let i=0;i<two.data.length;i++){  //取实际值 ,实际值与预测值重叠一个
             if(i<two.startIndex){
                  data1.push(two.data[i]);
             }else{
                  data1.push('');
             }
         }
         for(let z=0;z<two.data.length;z++){  //取预测值
             if(z>two.startIndex-2&two.data.length!=two.startIndex){  //如果数组内全为实际值，则预测存空
                  data2.push(two.data[z]);
             }else{
                  data2.push('');
             }
         }
         for(let t=0;t<two.startIndex+1;t++){  //取实际值那个点
             if(t==two.startIndex){
                  data3.push(two.total?two.total:'');
             }else{
                  data3.push('');
             }
         }
         data.unshift({
           name:two.name2,
          data:data2
         })
          data.unshift({
           name:two.name,
           data:data1
         }); 
          seriesData.push({
            type:'scatter',
            name:two.name,
            z:5,
            symbolSize :15,
            data:data3
          })
          this.optionLine.tooltip.formatter=function(params){
                        let html=params[0].axisValue+'<br/>';
                        let data=two;
                        params.forEach((item,index)=>{
                            if(item.dataIndex>(data.startIndex-1)&&item.seriesName==data.name&&item.seriesType!='scatter'){ 
                            }else if(item.dataIndex<data.startIndex&&item.seriesName==data.name2){
                            }else if(item.dataIndex==data.startIndex&&item.seriesType=='scatter'){
                              html+=item.marker+item.seriesName+":"+item.value+"<br/>"
                            }else if(item.dataIndex<data.startIndex&&item.seriesType=='scatter'){ 
                            }else{
                               html+=item.marker+item.seriesName+":"+item.value+"<br/>"
                            }
                        })
                        return html;
                }
       }else{
        this.optionLine.color=["#009eff","#f60","#909"];
        data=[...this.option.data];
        this.optionLine.tooltip.formatter=function(params){
          let html=params[0].axisValue+'<br/>';
           params.forEach((item,index)=>{
                           html+=item.marker+item.seriesName+":"+item.value+"<br/>"
            })
            return html;
        }
       }
       data.forEach((item,index)=>{
          let json;
          if(!this.isSep){
               json={
                  name:item.name,
                  type:'line',
                  smooth: that.option.isSmooth,
                  data:item.data,
                  z:index,
               }
          }else{
              this.optionLine.xAxis.boundaryGap=true;
              if(item.name=='主动离职率%'||item.name=='Active%'||item.name=='被动离职率%'||item.name=='Passive%'){
                  json={
                      name:item.name,
                      type:'bar', 
                      stack: '总量',
                      data:item.data,
                      z:index,
                   }
              }else{
                   json={
                      name:item.name,
                      type:'line',
                      smooth: that.option.isSmooth,
                      data:item.data,
                      z:index,
                   }
              }
          }
         if(dpr==3){
             json.symbolSize=12
         }else{
             json.symbolSize=8
         }
         if(that.option.isFilling){
                if(!(item.name=='预算'||item.name=='Budget'||item.name=='同期'||item.name=='LYA'||item.name=='离职率'||item.name=='Turnover%')){
                    json.areaStyle= {color:this.colorLinear[index]};
                }
          }
         legendData.push({name:item.name,icon:'rect'});
         seriesData.push(json);
       })
       this.optionLine.series=seriesData;
       let arr=[]; 
       if(this.option.time.length<5){
          for(var i=0;i<5;i++){
            arr.unshift(parseInt(this.option.time)-i)
          }
          this.optionLine.xAxis.data=arr;
       }else if(this.option.time.length<7){
          if(cookie.get('langSet')=='cn'){
           this.optionLine.xAxis.data=this.xMonthcn;
          }else{
            this.optionLine.xAxis.data=this.xMonthen;
          }
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
      this.myChart.setOption(this.optionLine,true);
   },
   makeXday(i){
      let date=new Date();
      let time1=this.option.time.substr(0,4)+'-'+this.option.time.substr(4,2); 
      let arr=[];
      for(var t=1;t<i+1;t++){
         date.setTime(Date.parse(time1+'-'+(t>9?t:('0'+t))));
         if(date.getDay()==0||date.getDay()==6){
              arr.push({value:t,textStyle:{color:'red'}});
         }else{
              arr.push({value:t});
         } 
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