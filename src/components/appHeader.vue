<template>
 <div id="header">
       <!-- <i class="iconfont  icon-fanhui1" @click='back'></i>
       <span class="line"></span>  -->
       <!-- <date-picker :option='optionEvent' :date='startTime' class='font30 showTime'></date-picker>
        -->
       <div  class="font30 selectTime" @click="showTimeModal" >{{showTime}}<i class="iconfont icon-rili"></i></div>
       <!-- <div class="lang font20" @click="changeLang">{{lang}}</div> -->
       <i v-if="isShowSearch" class="iconfont  icon-sousuo" @click='toSearch'></i> 
       <div v-if="isShowMode"  :class="['changeMode',version?'group':'pressure']" @click='changeVersion'>
         <span class="font20">{{version?$t("group"):$t("stretch")}}</span>
       </div> 
       <transition 
             enter-active-class="animated fadeInUp"
             leave-active-class="animated fadeOutDown"
       >
       <div  v-show="isShowTimeModal" class="timeModal" @click="hideTimeModal">
             <div class="wrap">
                <ul class="timeheader font16">
                  <li  :class="{'active':isYear}" @click.stop="changeMode('year')"><div>{{$t("yearreport")}}</div></li>
                  <li :class="{'active':isMonth}" @click.stop="changeMode('month')"><div>{{$t("monthreport")}}</div></li>
                  <li v-if="!isHiddenDay" :class="{'active':isDay}" @click.stop="changeMode('day')"><div>{{$t("dayreport")}}</div></li>
               </ul>
               <date-time-view 
                v-model="timeNow"
                :format="format"
                :min-year="1980">
                </date-time-view>
                <div class="timefooter ">
                  <button class="font24" @click.stop="hideTimeModal('sure')">{{$t("sure")}}</button>
                  <button class="font24" @click.stop="hideTimeModal('')">{{$t("cancel")}}</button>
                </div>
             </div>
       </div>
     </transition>
 </div>
</template>
<script type="text/javascript">
import appDatepicker from 'vue-datepicker'; 
import { DatetimeView ,cookie} from 'vux';
export default{
      name:'appHeader',
      props:{
           modeType:{
             type:String,
             default:'group', //true代表集团版 false代表压力版 默认为
           },
           isShowMode:{
             type:Boolean,
             default:true, //是否显示模板切换按钮，默认显示
           },
           isShowSearch:{
             default:true
           },
           time:{
            type:String, //接收返回的时间都是YYYYMMDD格式，没有中划线
            default:''
           },
           isHiddenDay:{   //是否显示日历部分日选择部分
            default:false,
           }
        },
	data(){
		return{
                    lang:cookie.get('langSet')=='cn'?'中文':'EN',
                    timeNow:this.time.substr(0,4)+'-'+(this.time.substr(4,2)?this.time.substr(4,2):'06')+(this.isHiddenDay?'':'-'+(this.time.substr(6,2)?this.time.substr(6,2):'15')), //时间选择插件只传入年，月日那两列则不会渲染出来，所以补足月日
                    showTime:'',//this.time.substr(0,4)+'-'+this.time.substr(4,2)+(this.isHiddenDay?'':'-'+this.time.substr(6,2)),
                    mode:this.isHiddenDay?'month':'day',   //标记时间年月日选择模式
                    version:this.modeType=='group'?true:false,   //true表示集团版false表示压力
                     isShowTimeModal:false,  //是否显示时间选择模板
                    format:'YYYY-MM-DD',
                    isYear:false,
                    isMonth:false,
                    isDay:true,
		}
	},
     components:{
        'date-picker':appDatepicker,
        'date-time-view':DatetimeView
     },
     watch:{
      time(){
        this.changeTopTitle(this.time); //在改变时间之前修改title
        if(this.time.substr(6,2)){
          this.showTime=(this.time.substr(0,4)+'-'+this.time.substr(4,2)+(this.isHiddenDay?'':'-'+this.time.substr(6,2)));
        }else if(this.time.substr(4,2)){
          this.showTime=(this.time.substr(0,4)+'-'+this.time.substr(4,2));
        }else{
          this.showTime=this.time;
        }
      },
      modeType(){
        this.version=(this.modeType=='group'?true:false);
      }
     },
     computed:{
         optionEvent(){
         this.option.format=this.format[this.mode]
         return this.option
         },
      },
     methods:{
        changeVersion(){
          this.version=!this.version;
          this.$emit('selfChangeMode',this.version?'group':'stretch')
        },
        changeLang(){
          this.lang=this.lang=='EN'?'中文':'EN';
          this.$i18n.locale=this.lang=='EN'?'en':'cn';
          cookie.set('langSet',this.$i18n.locale);
          this.$emit('changeLang');
        },
        back(){
          this.$router.go(-1);
        },
        toSearch(){
          let position=this.$route.fullPath.indexOf('index')>-1?'index':'food';
          this.$router.push('/search?position='+position+'&time='+this.showTime.split('-').join(''));
        },
        showTimeModal(){
          this.isShowTimeModal=!this.isShowTimeModal;
        },
        hideTimeModal(message){
          let time=null;
          let times=null;
          this.isShowTimeModal=false;  
          if(this.isYear){
              time=this.timeNow.split("-")[0];
          }else if(this.isMonth){
              times=this.timeNow.split("-");
              time=times[0]+'-'+times[1]
          }else{
            time=this.timeNow
          }
          //this.timeNow=time;
          if(message=="sure"){ 
              this.showTime=time;
              this.$emit('selfChangeTime',time.split('-').join(''));  //返回MMMMyydd格式的时间
          }
          this.changeTopTitle(time.split('-').join(''));
        },
        changeMode(type){
                      let oTime='';
                      let oMonth='';
                      let oDay='';
                      let that=this;
                     let timer=setInterval(function(){
                         oTime=document.getElementsByClassName("vux-datetime-view")[0];
                         if(oTime){
                                   clearInterval(timer);
                                   oMonth=oTime.querySelector("[data-role='month']");
                                   oDay=oTime.querySelector("[data-role='day']");
                                   if(type==='year'){
                                          that.isYear=true;
                                          that.isMonth=false;
                                          that.isDay=false;
                                          oMonth.style.display='none';
                                          oDay.style.display='none';
                                    }else if(type==='month'){
                                          that.isYear=false;
                                          that.isMonth=true;
                                          that.isDay=false;
                                          oMonth.style.display='inline-block';
                                          oDay.style.display='none';
                                    }else{
                                          that.isYear=false;
                                          that.isMonth=false;
                                          that.isDay=true;
                                          oMonth.style.display='inline-block';
                                          oDay.style.display='inline-block';
                                    }
                         }
                     },100);
          },
         changeTopTitle(time){ 
               let position="";
               if(this.$route.fullPath.indexOf('index')>-1){
                position='index';
               }else if(this.$route.fullPath.indexOf('food')>-1){
                 position='food';
               }else{
                 position='manpower';
               };
               if(time.length<5){
                       document.title=this.$t(position+'Title.year');
               }else if(time.length<7){
                       document.title=this.$t(position+'Title.month');
               }else{
                      document.title=this.$t(position+'Title.day');
               }
          },
      },
      mounted(){
        this.changeTopTitle(this.time); //在改变时间之前修改title
        if(this.time.substr(6,2)){
          this.showTime=(this.time.substr(0,4)+'-'+this.time.substr(4,2)+(this.isHiddenDay?'':'-'+this.time.substr(6,2)));
        }else if(this.time.substr(4,2)){
          this.showTime=(this.time.substr(0,4)+'-'+this.time.substr(4,2));
          //this.timeNow=this.timeNow+'-15'; //时间选择插件只传入年月，日那一列则不会渲染出来，所以补足日
         this.changeMode('month');
        }else{
          this.showTime=this.time;
          //this.timeNow=this.timeNow+'-06-15'; //时间选择插件只传入年，月日那两列列则不会渲染出来，所以补足月日
          this.changeMode('year');
        }
         if(this.isHiddenDay){
             this.changeMode('month');
         }
      }
}
</script>
<style lang='less' scoped>
#header{
	height:.66666667rem;
        position: relative; 
        font-size: 0;
      i{
          display: inline-block;
          height: .66666667rem;
          width: .93333333rem;
          position: relative;
          z-index: 10;
          color:#fff;
          font-size: .48rem;
          line-height: .66666667rem;
          text-align: center;
          vertical-align: top;
          float: right; 
        }
        i:nth-of-type(2){ 
          width: .6rem/* 45px */;
          margin-right:.26666667rem/* 20px */;
        }
        &>span{
          display: inline-block;
          height: 100%;
          width: 1px;
          background-color:#d4d7e0;
        }
        .changeMode{
          display: inline-block;
          /* width:1.53333333rem; */ 
          height: .42666667rem;
          padding:0 .06666667rem;
          position: relative;
          z-index: 10;
          margin:.13333333rem .18666667rem;
          vertical-align: top;
         border-radius: .21333333rem;
          background: #108ee9;
          color:#fff;
          &:before,&:after{
                   display: none;
                   content:"";
                   width:.34666667rem;
                   height: .34666667rem;
                   position: relative;
                   top:50%;
                   margin-top:-.17333333rem;
                   vertical-align: top;
                   background: #fff;
                   border-radius: 50%;
               }
          &.group{ 
               &:after{
                display: inline-block; 
                float: right;
                margin-left: .13333333rem;
               }
               & span{
                margin-left:.06666667rem;
               }
          }
          &.pressure{
               &:before{
                display: inline-block; 
               }
               & span{
                margin-left:.13333333rem;
               }
          }
          span{
            display: inline-block;
            height: 100%;
            line-height:.42666667rem;
            letter-spacing:.02666667rem/* 2px */; 
          }
        }
        .lang{
           display: inline-block;
           height: .42666667rem/* 32px */;
           float: right;
           position: relative;
           margin:.13333333rem .26666667rem/* 20px */ 0 0 ;
           padding:0 .13333333rem;
           line-height: .4rem/* 30px */;
           border:1px solid #fff;
           color:#fff;
           z-index: 10;
           vertical-align: top;
           border-radius: .21333333rem;
        }
        .showTime{
            vertical-align: top;
            margin:.06666667rem 0 0 1.33333333rem ;
            width:3.33333333rem;
        }
        .selectTime{  
            position:absolute;
            top:.02666667rem/* 2px */;
            left:0;
            right:0; 
            padding-left:.2rem;
            line-height: .4rem;
            background-color:transparent; 
            text-align: center;
            color: #fff;
            i{
              float:none; 
              position:relative;
              top:-.06666667rem/* 5px */;
              vertical-align:middle;
            }
        }
        .timeModal{
          position: fixed;
          width: 100%;
          top:0;
          bottom:0;
          z-index: 10;
          background-color:rgba(0,0,0,.5);
          .wrap{
            position: relative;
            width: 9.33333333rem;
            padding:0 .8rem;
            margin:0 auto;
            background:#fff;
            border-radius: .26666667rem;
            border-top:1px solid #8c919e;
            top:50%;
            margin-top:-2.28rem;
          }
          .timeheader{
               display: flex;
               height:1.2rem;
               position: relative;
               border-bottom:3px solid #d4d7e0; 
               &:before{
                 display: inline-block;
                 content: '';
                 width:.76rem;
                 height: .25333333rem;
                 position: absolute;
                 left:50%;
                 top:-.24rem;
                 margin-left:-.37333333rem;
                 background: url(../../static/images/@2x/cal-arrow@2x.png) no-repeat ;
                 background-size: cover;
                 [data-dpr='3'] &{
                  background: url(../../static/images/@3x/cal-arrow@3x.png) no-repeat  ;
                  background-size: cover;
                 }
               }
              
               li{
                flex-grow: 1;
                line-height: 1.06666667rem;
                text-align:center;
                background-color:#fff;
                            color:#36f;
                div{
                  width: .96rem/* 72px */;
                  height: .96rem/* 72px */;
                  position: relative;
                  top:50%;
                  left:50%;
                  margin:-.48rem 0 0 -.48rem;
                  line-height: .96rem/* 72px */;
                  color:#777;
                  background:#efefef;
                  border-radius: 50%;
                }
               }
               .active{
                 div{
                  width: .96rem;
                  height: .96rem/* 72px */;
                  position: relative;
                  top:50%;
                  left:50%;
                  margin:-.48rem 0 0 -.48rem;
                  line-height: .96rem/* 72px */;
                  color:#fff;
                  background:url(../../static/images/@2x/calendar-bg@2x.png) no-repeat center center;
                  background-size: cover;
                 }
                 [data-dpr='3'] div{
                   background:url(../../static/images/@3x/calendar-bg@3x.png) no-repeat center center;
                   background-size: cover;
                 }
               }
            }
            .timefooter{
                  height:.8rem;
                  display: flex;
                  padding-top:.06666667rem;
                  background-color: #fff;
                  button{
                    flex-grow: 1;
                    height: 100%;
                    border:none;
                    border-top: 1px solid #e9ebef; 
                    background-color: #fff;
                    line-height: .8rem;
                    color:#2b4177;
                    text-align: center;
                  }
                  button:nth-child(2){
                    border-left: 1px solid #e9ebef;
                  }
            }
        }
} 
</style>