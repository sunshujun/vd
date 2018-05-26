<template>
<div id="index">
   <div class="head">
       <app-header  
            @selfChangeTime="changeTime" 
            @selfChangeMode="changeMode" 
            @changeLang="changeLang"
             :time="time">
             </app-header>
       <div class="all-resturant">
       	   <div class="left" @click="jumpToSecond(account_code)">
                <p :class="['font46',parseInt(showData.detail[2])<0?'color-red':'']">{{showData.sum|formatNum}}<span class="font14 unit">{{$t("unit.million")}}</span></p>
                <span class="font18">{{title[tilteNow]=='All'?'Total':title[tilteNow]}}</span>
           </div>
           <div class="right">
                <p @click="jump('complete')">
                  <span class="font18">{{$t("reach")}}</span><span></span><span class="font24 color-green">{{showData.resNum[0]|formatNum}}</span><span class="font14">{{$t("unit.home")}}</span>
                </p>
                <p @click="jump('nocomplete')">
                  <span class="font18">{{$t("unreach")}}</span><span ></span><span class="font24 color-red">{{showData.resNum[1]|formatNum}}</span><span class="font14">{{$t("unit.home")}}</span>
                </p>
           </div>
       </div>
       <ul class="detail clearfix">
         	<li>
         		<p class="font24">{{showData.detail[0]|formatNum}}<span class="font14 unit">{{$t("unit.million")}}</span></p>
         		<span class="font18">{{modeName}}</span>
         	</li>
         	<li>
         		<p :class="['font24',parseInt(showData.detail[1])<100?'color-red':'']">{{showData.detail[1]}}<span class="font14 unit">%</span></p>
         		<span class="font18">{{$t("complete")}}</span>
         	</li>
         	<li>
         		<p  :class="['font24',parseInt(showData.detail[2])<0?'color-red':'']">{{showData.detail[2]|formatNum}}<span class="font14 unit">{{$t("unit.million")}}</span></p>
         		<span class="font18">{{$t("ver")}}</span>
         	</li>
         	<li>
         		<p :class="['font24',parseInt(showData.detail[3])<0?'color-red':'']">{{showData.detail[3]}}<span class="font14 unit">%</span></p>
         		<span class="font18">{{$t("yoyGrowth")}}</span>
         	</li>
       </ul>
       <!-- <ul class="budget clearfix">
         <li @click="jump('complete')">
           <p class="font18">{{$t("reach")}}<span class="font24 color-green">{{showData.resNum[0]|formatNum}}</span>{{$t("unit.home")}}</p>
         </li>
         <li @click="jump('nocomplete')">
           <p class="font18">{{$t("unreach")}}<span class="font24 color-red">{{showData.resNum[1]|formatNum}}</span>{{$t("unit.home")}}</p>
         </li>
       </ul> -->
   </div>
   <div class="body">
   	<ul class="resturant clearfix font24">
   		<li v-for='(value,key) in title' :class="{'active':key===tilteNow}" @click='changeFour(key)'><span>{{value}}</span></li>
   	</ul>
        <div class="echartWrap">
           <app-ecahrt :option="echartOption" :echartId="'echartIndex'"></app-ecahrt>
        </div>
   	<app-table
            :listData="listData"
            :bgClass="tableBg"
            @changeEchart='changeEchart'
            @jump='jumpToSecond'
            >
        </app-table>
   </div>
</div>
</template>
<script type="text/javascript">
import appHeader from '../components/appHeader';
import appTable from '../components/appTable';
import appEcharts from "../components/appEcharts";
import {cookie} from 'vux';
export default{
	name:'appIndex',
	data(){
		return{
                        title:{all:this.$t("all"),out:this.$t("mgt"),entrust:this.$t("coh"),self:this.$t("omh")},
                        bgClass:{all:"bg-purple",out:"bg-sky",entrust:"bg-blue",self:"bg-green"},
                        modeType:'group',
                        modeName:this.$t("group")+this.$t("budget"),
                        tilteNow:"all",
                        time:window.selectTime,
                        account_code:'R1000',
                        resturantData:{
                           group:{
                               all:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               },
                               out:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               },
                               entrust:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               },
                               self:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               }
                           },
                           stretch:{
                               all:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               },
                               out:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               },
                               entrust:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               },
                               self:{
                                    sum:'',
                                    detail:['','',,''],
                                    resNum:['',''],
                                    echartData:[ ],
                                      tableData:[ ]
                               }
                           }
                        }
		}
	},
        methods:{
          changeFour(type,event){ 
                    this.tilteNow=type;
                    this.getData();
          },
          changeMode(mode){
                 this.modeType=mode; 
                  this.modeName=this.modeType=='group'?this.$t("group")+this.$t("budget"):this.$t("stretch")+this.$t("budget");
                  this.getData();
          },
          changeTime(time){ 
               this.time=time; 
               window.selectTime=time;
               this.getData(); 
          },
          changeLang(){ 
                 this.modeName=this.$t("group")+this.$t("budget");
                 this.title={all:this.$t("total"),out:this.$t("mgt"),entrust:this.$t("coh"),self:this.$t("omh")},
                 this.getData();
          },
          changeEchart(code){
               let name=encodeURIComponent(encodeURIComponent(this.tilteNow));
               let url='/changeFirstEchart.do?type='+cookie.get('langSet')+'&hotel_name='+name+'&account_code='+code+'&date='+this.time+'&budget_type='+this.modeType
                  this.$axios.get(url).then((res)=>{
                     if(res.data.code==200){
                          this.resturantData[this.modeType][this.tilteNow]['echartData']=res.data.data.echartData;
                     }
                  }).catch((error)=>{
                    alert(error)
                  })
          },
          jump(type){
              let url="/resturant?position=index&iscomplete="+type+"&time="+this.time+'&modeType='+this.modeType
              let name='';
              let lang=cookie.get('langSet');
              if(this.tilteNow!='all'){
                if(this.tilteNow=='out'){
                    name=lang=='cn'?'输出酒店':'Mgt';
                }else if(this.tilteNow=='entrust'){
                    name=lang=='cn'?'委托酒店':'COH';
                }else{
                    name=lang=='cn'?'自营酒店':'OMH';
                }
                 url+='&type=hotel_type&name='+name;
              } 
                this.$router.push(url);
          },
          jumpToSecond(code){
              let url='/resturant?code='+code+'&position=index&time='+this.time+'&modeType='+this.modeType;
              let name='';
              let lang=cookie.get('langSet');
              if(this.tilteNow!='all'){
                if(this.tilteNow=='out'){
                    name=lang=='cn'?'输出酒店':'Mgt';
                }else if(this.tilteNow=='entrust'){
                    name=lang=='cn'?'委托酒店':'COH';
                }else{
                    name=lang=='cn'?'自营酒店':'OMH';
                }
                 url+='&type=hotel_type&name='+name;
              }
                this.$router.push(url);
          },
          getData(){
                 let url='/getData.do?date='+this.time+'&budget_type='+this.modeType+'&hotel_type='+(this.tilteNow=='all'?'':this.tilteNow)+'&hotel_name='+this.tilteNow+'&account_code='+this.account_code+'&type='+cookie.get('langSet')
                  this.$axios.get(url).then((res)=>{
                     if(res.data.code==200){  
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
                           this.resturantData[this.modeType][this.tilteNow]=res.data.data; 
                     }
                  }).catch((error)=>{
                    alert(error)
                  })
          }
        },
        computed:{
               showData(){return this.resturantData[this.modeType][this.tilteNow]},
               echartOption(){
                       return {
                             isSmooth:true,
                             isFilling:true,
                             isShowHead:true,
                             time:this.time,
                             title:this.title[this.tilteNow],
                             data:this.resturantData[this.modeType][this.tilteNow].echartData,
                       }
                },
                listData(){
                  return this.resturantData[this.modeType][this.tilteNow].tableData;
                },
                tableBg(){
                  return this.bgClass[this.tilteNow]
                }
        },
	components:{
	   'app-header':appHeader,
	   'app-table':appTable,
           'app-ecahrt':appEcharts,
	},
        mounted(){
           this.getData();
        }
}
</script>
<style lang='less' scoped>
.head{
   padding:.26666667rem/* 20px */ 0 .53333333rem 0;
   background: url(../../static/images/@2x/headbg@2x.png) no-repeat ;
   background-size: 100%;
   [data-dpr='3'] &{
      background: url(../../static/images/@3x/headbg@3x.png) no-repeat;
      background-size: 100%;
   }
.all-resturant{
     height: 2.53333333rem/* 190px */;
     .left{
           width:65%;
           float: left;
           padding-top:.66666667rem/* 50px */;
           p{
              text-align: center;
              font-weight:600;
              color:#fff;
              span{
                position: relative;
                bottom:.13333333rem;
                color:#b2b9cd;
                margin-left: .13333333rem;
                vertical-align: bottom;
              }
             }
             &>span{
              display: block;
              text-align: center;
              color:#d9dce6;
             }
     } 
     .right{
        width:35%;
        float: left;
        padding-top:.66666667rem/* 50px */;
        color:#e8e8e8;
        p{
          width:100%;
          height: .53333333rem/* 40px */;
          line-height: .53333333rem/* 40px */;
          font-size: 0;
          margin-top:.13333333rem/* 10px */;
        }
        p:nth-child(1){ 
        }
        span{
          vertical-align: bottom;
          text-align:right;
        }
        span:nth-child(1){
          display: inline-block;
          width: 1.6rem/* 120px */;
          margin-right:.26666667rem/* 20px */;
        }
        span:nth-child(2){
          display: inline-block;
          width: 0; 
          height: 0; 
          position: relative;
          top:.17333333rem/* 13px */; 
          border-top: .06666667rem solid transparent; 
          border-left: .13333333rem solid #fff; 
          border-bottom: .06666667rem solid transparent; 
          vertical-align: top;
        }
        span:nth-child(3){
            margin:0 .13333333rem 0 .26666667rem;
            position: relative;
            &:after{
                   display: inline-block;
                   content:"";
                   position: absolute;
                   width:100%;
                   height:3px;
                   left:0;
                   bottom:-.06666667rem/* 5px */;
                   background: #fff;
             }
        }
     }
}
.detail{
     height: 1.53333333rem/* 115px */;
     padding-top:.33333333rem/* 25px */;
     border-top: 2px dashed #ffea6b;
     li{
      width: 25%;
      height: 100%;
      float: left;
      text-align: center;
      font-size:0;
      &:after{
      	display: inline-block;
      	height: .4rem;
      	background: #afb6c9;
      	vertical-align: middle;
      }
      p{
        /* margin-bottom: .13333333rem; */
        color:#fff;
        font-weight: 400;
        span{
        	margin-left:.04rem;
        	color:#b2bace;
        }
      }
      &>span{
      	color:#fff;
      }
      .unit{
        font-weight: 400
      }
     }
     li:last-child{
     	&:after{
     		display: none;
     	}
     }
}
/* .budget{
   li{
     height: .8rem;
     width:50%;
     float:left;
     p{ 
       height: .8rem;
       line-height: .8rem;
       letter-spacing: .02666667rem;
               text-align: center;
               color:#fff;
               span{
                  margin:0 .13333333rem;
                 position: relative;
                 display: inline-block;
                 &:after{
                   display: inline-block;
                   content:"";
                   position: absolute;
                   width:100%;
                   height:3px;
                   left:0;
                   bottom:.06666667rem;
                   background: #fff;
                 }
               }
     }
   }
   li:first-child{
       & p:after{
         display: inline-block;
         content: '';
         height: .4rem;
         width: 1px;
         float: right; 
         position: relative;
         top:50%;
         margin-top:-.2rem;
         background:#d4d7e0;
       }
   }
} */
}
.body{
  position: relative;
  width: 100%;
  top:-.46666667rem/* 35px */;
  padding:0 .26666667rem;
  .resturant{
     height: .93333333rem;
     margin-bottom: .26666667rem;
     box-shadow:.06666667rem .06666667rem .13333333rem rgba(173,204,216,0.55); 
     background: #fff;
     li{
       width:25%;
       height: .93333333rem;
       float: left;
       color:#777;
       text-align: center;
       &>span{
       	     display: inline-block;
                     margin:0 auto;
                     position: relative;
                     line-height: .93333333rem;
                  }
       &:after{
       	display: inline-block;
       	content: '';
       	width:.02666667rem;
       	height:.4rem; 
       	float:right; 
       	position: relative;
       	top:50%;
       	margin-top:-.2rem;
       	background:#dfe1e8;
       }

       &:last-child{
       	&:after{
       		display: none;
       	}
       }
       &.active{
        color:#394e80;
       	span:after{
                     display: inline-block;
                     content: '';
                     width: 100%;
                     height: 3px; 
                     position: absolute;
                     top:.77333333rem;
                     left:0;
                     background-color:#2b4177;
       	}
       }
     }
  }
  .echartWrap{
    padding:.13333333rem .2rem .21333333rem;
    background: #fff;
    margin-bottom: .16rem;
    border-radius: .13333333rem;
    box-shadow:.06666667rem .06666667rem .13333333rem rgba(173,204,216,0.25);
  }
}
</style>