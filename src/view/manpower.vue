<template>
 <div id="manpower">
      <div class="head">
      	<app-header  
        @selfChangeTime="changeTime" 
        @selfChangeMode="changeMode" 
        @changeLang="changeLang"
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
           <app-ecahrt :option="echartOption2" :echartId="'echartArea2'" :echartStyle="{height:'4.06666667rem',width:'8.86666667rem'}"></app-ecahrt>
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
let timeNow=new Date();
let year=timeNow.getFullYear();
let month=(timeNow.getMonth()+1)>9?(timeNow.getMonth()+1):'0'+(timeNow.getMonth()+1); 
export default{
 name:'appManpower',
 data(){
     return{
      time:year+month+'', //时间
      dataArt:[{
                                        name:'实际',
                                        data:[150, 232, 201, 154,213]
                                      },{
                                        name:'预算',
                                        data:[290, 182, 101, 234, 290]
                                      }],
      dataSep:[{
                                        name:'主动',
                                        data:[150, 232, 201]
                                      },{
                                        name:'离职率',
                                        data:[290, 182, 101]
                                }]
     }
 },
 computed:{
        echartOption1(){
               return {
                     isSmooth:true,
                     isFilling:true,
                     isShowHead:true,
                     time:this.time,
                     modeType:'group',
                     headIcon:'light',
                     title:this.time.substr(0,4)+'年人工成本率趋势图',
                     data:this.dataArt,
                     xAxis:['1月','3月','6月','9月','12月'],
                 }
             },
          echartOption2(){
               return {
                     isSmooth:true,
                     isFilling:true,
                     isShowHead:true,
                     time:this.time,
                     headIcon:'user',
                     title:this.time.substr(0,4)+'年离职率趋势图',
                     data:this.dataSep,
                     xAxis:['1月','6月','12月']
                  }
               },
  },
 methods:{
      changeTime(time){
        this.time=time;
        this.changeTopTitle();
      },
      changeMode(){
        
      },
      changeLang(){

      },
      changeTopTitle(){ 
               if(this.time.length<5){
                       document.title=this.$t('manpowerTitle.year');
               }else{
                       document.title=this.$t('manpowerTitle.month');
               } 
       },
      jump(type){
            this.$router.push('/artandsep?type='+type+'&time='+this.time);
      },
      getData(){
        let url='';
        this.$axios.get(url).then((res)=>{
          if (res.data.code==200){
               this.dataSep=res.data;
               this.dataArt=res.data;
          }
        })
      },
  }, 
  components:{
           'app-header':appHeader,
           'app-ecahrt':appEcharts,
  },
  mounted(){
    document.getElementsByClassName('index-content')[0].scrollTop=0; //每次切换页面，滚到屏幕顶部
    this.changeTopTitle();
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
  		padding-left: 2rem;
  		background:url(../../static/images/@2x/lightbig@2x.png) no-repeat 1.2rem center;
  		[data-dpr='3'] &{
  			background:url(../../static/images/@3x/lightbig@3x.png) no-repeat 1.2rem center;
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
  		padding-left: 2.26666667rem;
  		background:url(../../static/images/@2x/userbig@2x.png) no-repeat 1.33333333rem center;
  		[data-dpr='3'] &{
  			background:url(../../static/images/@3x/userbig@3x.png) no-repeat 1.33333333rem center;
  		}
             [data-dpr='1'] &{
                                 background-size: 21%;
                                 background-position: 40px center;
               }
  	}
  }
}
</style>
