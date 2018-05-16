<template>
   <div id="resturantDetail">
   	<div class="head">
	      <app-header 
                 @selfChangeTime="changeTime" 
                 @selfChangeMode="changeMode" 
                 @changeLang="changeLang"
                 :time="time" 
                 :modeType="modeType">
                 </app-header>
	</div>
	<div class="content">
             <div class="echartWrap">
                 <app-echart :option="echartOption" :echartStyle="{height:'3.73333333rem',width:'8.66666667rem'}"></app-echart>
             </div>
             <!-- <div class="title">
              <span class="line"></span>
               <div class="font14 ">
                    <i class="iconfont icon-shuoming"></i>
                    <i class="iconfont icon-shuoming-"></i>
                    <span>{{this.time}}</span>
                    {{$t("ope")}}<b class="number font20">{{detailData[0]?detailData[0]:''}}</b>,{{$t("groupin")}}<b class="number font20">{{detailData[1]?detailData[1]:''}}</b>{{$t("unit.ming")}}，{{$t("area")}}<b class="number font20">{{detailData[2]?detailData[2]:''}}</b>{{$t("unit.ming")}}。
               </div>
               <span class="line"></span>
             </div> -->
	     <app-table-spread  v-if="position=='index'"
               :listData="listData"
               :height="height"
               @changeEchart="changeEchart"></app-table-spread>
             <app-table v-else
               :listData="listData"
               :bgClass="'bg-blue'"
               :webposition="'fooddetail'"
               @jump="jump"
               @changeEchart="changeEchart"
             ></app-table>
	</div>
   </div>
</template>
<script >
import appHeader from '../components/appHeader';
import appTableSpread from '../components/appTableSpread';
import appTable from '../components/appTable';
import appEcharts from "../components/appEcharts";
import {cookie} from 'vux';
let timeNow=new Date();
let year=timeNow.getFullYear();
let month=(timeNow.getMonth()+1)>9?(timeNow.getMonth()+1):'0'+(timeNow.getMonth()+1);
let day=timeNow.getDate()>9?timeNow.getDate():'0'+(timeNow.getDate()-1);
export default{
  name:'resturantDetail',
  data(){
     return{
            time:year+month+day+'', //时间
            modeType:'group',
            code:'',
            listData:[],
            detailData:[],
            echartData:[],
            name:'',//酒店名称
            position:'index',
            height:'',//列表高度
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
    changeLang(){
          this.getData();
    },
    changeEchart(code){
        if(this.position=='food'){
          let name=encodeURIComponent(encodeURIComponent(this.name))
          let url='/changeFoodEchart.do?date='+this.time+'&budget_type='+this.modeType+'&hotel_name='+name+'&account_code='+code+'&type='+cookie.get('langSet');
          this.$axios.get(url).then((res)=>{
            if (res.data.code==200){
                 this.echartData=res.data.data.echartData;
            }
          })
        }
    },
    getData(){
      let url='';
      if(this.position=='index'){
         url='/getDetailData.do?date='+this.time+'&budget_type='+this.modeType+'&hotel_name='+encodeURIComponent(encodeURIComponent(this.name))+'&account_code='+this.code+'&type='+cookie.get('langSet')
      }else{
          url='/getFoodDetailData.do?date='+this.time+'&budget_type='+this.modeType+'&hotel_name='+encodeURIComponent(encodeURIComponent(this.name))+'&account_code='+this.code+'&type='+cookie.get('langSet')
      }
      this.$axios.get(url).then((res)=>{
        if (res.data.code==200){
             this.echartData=res.data.data.echartData;
             this.listData=res.data.data.listData;
             this.detailData=res.data.data.detail;
        }
      })
    },
    jump(code){
       let url='/fooddetail?code='+code+'&position=food&time='+this.time+'&modeType='+this.modeType+'&name='+this.name;
       this.$router.push(url);
    }
  },
  computed:{
    echartOption(){
                        return{
                             isSmooth:true,
                             isFilling:true,
                             isShowHead:true,
                             time:this.time,
                             title:this.name,
                             data:this.echartData,
                             xAxis:['周一','周二','周三','周四','周五','周六','周日']
                       }
               }
  },
  mounted(){
     this.name=this.$route.query.name;
     if(this.$route.query.position){
         this.position=this.$route.query.position;
     }
     if(this.$route.query.code){
          this.code=this.$route.query.code;
     }else{
         this.code=(this.position=='index'?'R1000':'R1200');
     }
     if(this.$route.query.time){
          this.time=this.$route.query.time;
     }
     if(this.$route.query.modeType){
          this.modeType=this.$route.query.modeType;
     } 
     this.getData();
  },
  components:{
       'app-header':appHeader,
       'app-table-spread':appTableSpread,
       'app-echart':appEcharts,
       'app-table':appTable
  }
}
</script>
<style lang="less" scoped>
.head{
     padding:.26666667rem/* 20px */ 0 .2rem/* 15px */;
     background: url(../../static/images/@2x/headbg@2x.png) no-repeat ;
     background-size: 100%;
     [data-dpr='3'] &{
        background: url(../../static/images/@3x/headbg@3x.png) no-repeat;
        background-size: 100%;
      }
}
.content{
   padding: 0 .26666667rem .46666667rem;
  .echartWrap{
    width: 9.46666667rem; 
    padding:.2rem .4rem .33333333rem;
    border-radius: 0 0  .13333333rem .13333333rem;
    margin:.26666667rem auto .16rem;
    background: #fff;
    box-shadow:.06666667rem .06666667rem .13333333rem rgba(173,204,216,0.25);
  }
  .title{
    height: 1.01333333rem;
    display: flex; 
    margin:.13333333rem 0;
    color:#898989;
    div{
          display: inline-block;
          width:7.73333333rem;
          padding:0  .2rem;
          line-height: .4rem;
          border:1px dashed #d3d7e0;
          border-radius: .49333333rem;
          text-align: left;
          .number{
            margin:0 .10666667rem;
            color:#2b4177;
          } 
          i{
            color:#2b4177;
          }
          i:nth-child(1){
            font-size: .18666667rem;
          }
          i:nth-child(2){
            font-size: .06666667rem;
          }
    }
    .line{
          display: inline-block; 
          height: 1px;
          flex-grow: 1;
          margin-top:.49333333rem;
          border-bottom: 1px dashed #d3d7e0;
          vertical-align: middle;
        }
  }
}
</style>