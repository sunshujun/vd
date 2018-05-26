<template>
 <div id="manpower">
      <div class="head">
      	<app-header  
        @selfChangeTime="changeTime" 
        @selfChangeMode="changeMode"
        :time="time" 
        :isShowSearch="false"
        :isHiddenDay="true">
        </app-header>
      </div>
      <div class="body">
        <div class="echartWrap">
           <app-ecahrt :option="echartOption1" :echartId="'echartArea1'" :echartStyle="{height:'4.06666667rem',width:'8.86666667rem'}"></app-ecahrt>
        </div>
        <div class="echartWrap">
           <app-ecahrt :option="echartOption2" :echartId="'echartArea2'" :echartStyle="{height:'4.06666667rem',width:'8.86666667rem'}" :isSep="true"></app-ecahrt>
        </div>
        <ul class="twoMode clearfix font24">
        	<li @click="jump('artificial')"><span>{{$t("laboarcost")}}</span></li>
        	<li @click="jump('separation')"><span>{{$t("turnover")}}</span></li>
        </ul>
     </div>
 </div>
</template>
<script type="text/javascript">
import appEcharts from "../components/appEcharts";
import appHeader from '../components/appHeader';
import {cookie} from 'vux';
let timeNow=new Date();
let year=timeNow.getFullYear();
let month=(timeNow.getMonth()+1)>9?(timeNow.getMonth()+1):'0'+(timeNow.getMonth()+1);
export default{
 name:'appManpower',
 data(){
     return{
      time:window.selectTime.length<7?window.selectTime:window.selectTime.substr(0,6), //时间
      modeType:'group',
      dataArt:[],
      dataSep:[]
     }
 },
 computed:{
        echartOption1(){
               return {
                     isSmooth:true,
                     isFilling:false,
                     isShowHead:true,
                     time:this.time,
                     modeType:'group',
                     headIcon:'light',
                     title:this.time.substr(0,4)+this.$t('HrEchartTitle1'),
                     data:this.dataArt,
                     xAxis:['1月','3月','6月','9月','12月'],
                 }
             },
          echartOption2(){
               return {
                     isSmooth:false,
                     isFilling:false,
                     isShowHead:true, 
                     time:this.time,
                     headIcon:'user',
                     title:this.time.substr(0,4)+this.$t('HrEchartTitle2'),
                     data:this.dataSep,
                     xAxis:['1月','6月','12月']
                  }
               },
  },
 methods:{
      changeTime(time){
        this.time=time;
        window.selectTime=time;
        this.getData();
      },
       changeMode(mode){
                 this.modeType=mode;
                 this.getData();
        },
      jump(type){
            this.$router.push('/artandsep?type='+type+'&time='+this.time+'&modeType='+this.modeType);
      },
      getData(){
        let url='getHumenEchart.do?date='+this.time+'&type='+cookie.get('langSet')+'&budget_type='+this.modeType;
        this.$axios.get(url).then((res)=>{
          if (res.data.code==200){
                if(res.data.data.date&&res.data.data.date!=this.time){
                              this.time=res.data.data.date;
                              /*let _this=this;
                              this.$vux.confirm.show({
                                title:'消息提示',
                                content:'当天数据为空，是否展示最近有数据的一天',
                                confirmText:_this.$t('sure'),
                                cancelText:_this.$t('cancel'),
                                onConfirm(){
                                  Object.assign(_this.resturantData[_this.modeType][_this.tilteNow],res.data.data);
                                }
                              })*/
                }
               this.dataSep=res.data.data.echartData1;
               this.dataArt=res.data.data.echartData;
          }
        })
      },
  }, 
  components:{
           'app-header':appHeader,
           'app-ecahrt':appEcharts,
  },
  mounted(){
    if(this.time.length==6){
      let preMonth=parseInt(this.time.substr(4,2))-1;
      let year=parseInt(this.time.substr(0,4));
      if(year==new Date().getFullYear()){
                if(preMonth==0){
                  this.time=(year-1)+""+"12"
                }else{
                  this.time=year+""+(preMonth>9?preMonth:("0"+preMonth));
                }
                window.selectTime=this.time;
      }
    }
    this.getData();
  }
}
</script>
<style lang="less" scoped>
#manpower{
   position: relative;
}
.head{
   padding:.26666667rem/* 20px */ 0 2.93333333rem 0;
   background: url(../../static/images/@2x/headbg@2x.png) no-repeat ;
   background-size: 100%;
   [data-dpr='3'] &{
      background: url(../../static/images/@3x/headbg@3x.png) no-repeat;
      background-size: 100%;
   }
}
.body{
  width: 100%;
  position: absolute;
  top:1.2rem;
  padding:0 .26666667rem;
  .echartWrap{
  	padding: .26666667rem .13333333rem .33333333rem;
  	border-radius: 0 0 .13333333rem .13333333rem;
  	background: #fff;
       box-shadow:.06666667rem .06666667rem .13333333rem rgba(173,204,216,0.25);
  }
  .echartWrap:nth-child(1){
  	margin-bottom: .13333333rem;
  }
  .twoMode{
  	height: 1.33333333rem;
  	width: 8.66666667rem;
  	margin:.06666667rem auto 0;
  	background: #fff;
  	box-shadow:  0 .06666667rem .13333333rem .13333333rem #deeaef;
  	li{
  	  width: 50%;
  	  height: 1.33333333rem;
  	  float: left;
         display:flex;
         flex-direction:column;
         justify-content:center;
  	}
  	li:nth-child(1){
  		padding-left: 1.33333333rem/* 100px */;
  		background:url(../../static/images/@2x/lightbig@2x.png) no-repeat .33333333rem center;
  		[data-dpr='3'] &{
  			background:url(../../static/images/@3x/lightbig@3x.png) no-repeat .33333333rem center;
  		} 
                [data-dpr='1'] &{
                           background-size: 21%;
                           background-position: 30px center;
                     }
  		&:after{
  			display: inline-block;
  			float: right;
  			width:.02666667rem;
  			height: .4rem;
  			position: relative;
  			top:50%;
  			margin-top:-.2rem;
  		}
  	}
  	li:nth-child(2){
  		padding-left: 1.6rem/* 120px */;
  		background:url(../../static/images/@2x/userbig@2x.png) no-repeat .4rem center;
  		[data-dpr='3'] &{
  			background:url(../../static/images/@3x/userbig@3x.png) no-repeat .4rem center;
  		}
             [data-dpr='1'] &{
                                 background-size: 21%;
                                 background-position: 40px center;
               }
  	}
  }
}
</style>
