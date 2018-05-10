<template>
   <div id="resturantDetail">
   	<div class="head">
	      <app-header 
                     @selfChangeTime="changeTime" 
                     @selfChangeMode="changeMode"
                     :time="time">
                     </app-header>
	</div>
	<div class="content">
             <app-title @changeTitle="changeTitle" :titles="titles"></app-title> 
             <div class="echartWrap">
                 <app-echart 
                 :option="echartOption" 
                 :echartId="'echartFoodDetail'"
                 :echartStyle="{height:'3.73333333rem',width:'8.66666667rem'}"></app-echart>
             </div> 
	     <app-food-detail :listData="showData" @changeEchart="changeEchart"></app-food-detail>
	</div>
   </div>
</template>
<script >
import appHeader from '../components/appHeader';
 import appFoodDetail from '../components/appFoodDetail'; 
import appEcharts from "../components/appEcharts";
import appTitle from '../components/appTitle';
import {cookie} from 'vux';
let timeNow=new Date();
let year=timeNow.getFullYear();
let month=(timeNow.getMonth()+1)>9?(timeNow.getMonth()+1):'0'+(timeNow.getMonth()+1);
let day=timeNow.getDate()>9?timeNow.getDate():'0'+timeNow.getDate();
export default{
  name:'resturantDetail',
  data(){
     return{
            time:'', //时间
            titleNow:"add",  //存储目前展示的是哪个title
            modeType:'group',
            code:'R1211',//全日餐厅
            listData:{data:''},
            echartData:[],
            name:'',//酒店名称
            codeTitles:'',
            sumdata:'',
            foodTitle:{add:this.$t("add"),chineserest:this.$t("chineserest"),specialty:this.$t("specialty"),lobby:this.$t("lobby"),mini:this.$t("mini")},  //餐饮项目名称及key
      }
  },
  methods:{
    changeTime(time){
          this.time=time;
          this.getData();
    },
    changeMode(mode){
          this.modeType=mode; 
                 //this.modeName=this.modeType=='group'?'集团预算':'压力预算'
                  this.modeName=this.modeType=='group'?this.$t("group")+this.$t("budget"):this.$t("stretch")+this.$t("budget");
           this.getData();
    },
    changeTitle(type){
              this.titleNow=type.key;
              this.code=type.code;
              this.getData();
      },
      changeEchart(code){
          let name=encodeURIComponent(encodeURIComponent(this.name))
          let url='/DAP/changeFoodEchart.do?date='+this.time+'&budget_type='+this.modeType+'&hotel_name='+name+'&account_code='+code+'&type='+cookie.get('langSet');
          this.$axios.get(url).then((res)=>{
            if (res.data.code==200){
                 this.echartData=res.data.data.echartData; 
            }
          })
      },
     getData(){
        let url='/DAP/getFourFoodDetailData.do?date='+this.time+'&budget_type='+this.modeType+'&hotel_name='+encodeURIComponent(encodeURIComponent(this.name))+'&account_code='+this.code+'&type='+cookie.get('langSet')
        this.$axios.get(url).then((res)=>{
          if (res.data.code==200){
               this.echartData=res.data.data.echartData;
               this.$set(this.listData,'data',res.data.data.listData);
               if(this.echartData.length){
                   if(this.time.length<5){
                        this.sumdata=this.echartData[0].data[this.echartData.length-1]
                   }else if(this.time.length<7){
                       this.sumdata=this.echartData[0].data[parseInt(this.time.substr(4,2))-1]
                   }else{
                      this.sumdata=this.echartData[0].data[parseInt(this.time.substr(6,2))-1]
                   }
               }else{
                     this.sumdata="";
               }
              // this.listData.data=res.data.data.listData;
          }
        })
      },
      getCode(){
          let url='/DAP/getCode.do?'+'&type='+cookie.get('langSet');
          this.$axios.get(url).then((res)=>{
                  if(res.data.code==200){
                         this.codeTitles=res.data.data.food;
                         for(var key in this.codeTitles){
                           if(this.code==this.codeTitles[key])
                           {
                            this.titleNow=key;
                             break;
                           } 
                         }
                  }
          })
        },
 },
  computed:{
    echartOption(){
                        return{
                             isSmooth:true,
                             isFilling:true,
                             isShowHead:true,
                             time:this.time,
                             sumdata:this.sumdata+"("+this.$t('unit.million')+")",
                             title:this.name+this.foodTitle[this.titleNow]+this.$t('income'),
                             data:this.echartData
                       }
               },
       titles(){
           return{
            code:this.code,
            title:this.foodTitle,
            titleCode:this.codeTitles,
           }
         },
        showData(){
          return {data:this.listData.data}
        }
  },
  mounted(){
     this.name=this.$route.query.name;
     if(this.$route.query.code){    //如果是搜索页面跳转过来使用默认code，其他页面跳转使用传过来的参数
              this.code=this.$route.query.code=='R1200'?'R1211':this.$route.query.code;
      }
     if(this.$route.query.time){
          this.time=this.$route.query.time;
     }
     if(this.$route.query.modeType){  
          this.modeType=this.$route.query.modeType;
     }
      this.getCode();
      this.getData();
  },
  components:{
       'app-header':appHeader,
       'app-food-detail':appFoodDetail,
       'app-echart':appEcharts,
       'app-title':appTitle
  }
}
</script>
<style lang="less" scoped>
.head{
     padding: 0.26666667rem 0 .8rem/* 60px */;
     background: url(../../static/images/@2x/headbg@2x.png) no-repeat ;
     background-size: 100%;
     [data-dpr='3'] &{
        background: url(../../static/images/@3x/headbg@3x.png) no-repeat;
        background-size: 100%;
      }
}
.content{
   position: relative;
   top:-.46666667rem;
   padding :0  .26666667rem .46666667rem;
  .echartWrap{
    width: 9.46666667rem;
    padding:.2rem .4rem .33333333rem;
    border-radius: 0 0  .13333333rem .13333333rem;
    margin:.26666667rem auto .16rem;
    background: #fff;
    box-shadow:.06666667rem .06666667rem .13333333rem rgba(173,204,216,0.25);
  }
}
</style>