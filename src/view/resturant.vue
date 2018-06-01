<template>
 <div id="resturant">
    <div class="head" :class="{'noSelect':position=='food'}">
    	<app-header
          @selfChangeTime="changeTime"
          @selfChangeMode="changeMode"
          @changeLang="changeLang"
          :time="time"
          :modeType="modeType">
          </app-header>
    	<ul v-if="position=='index'" class="selects">
          <li  v-for="(item,index) in conditionArr">
            <select v-model="conditions[index]" class="font20">
                   <option value=''>{{item.name}}</option>
                   <option v-for='name in item.data' :value="name">{{name}}</option> 
            </select>
          </li>
    	</ul>
        <a v-if="position=='index'" class="btn btn-first font20" @click.preventDefault="sure">{{$t("submit")}}</a>
        <a v-if="position=='index'" class="btn font20" @click.preventDefault="reset">{{$t("reset")}}</a>
    </div>
    <div class="content">
         <app-title @changeTitle="changeTitle" :titles="titles"></app-title>
    	  <app-table-resturant
             :listData="showData"
             :time="time"
             :modeType="modeType"
             :height="height"
             :webposition="'resturant'"
             :isAddSort="true"
             ></app-table-resturant>
      </div>
 </div>
</template>
<script >
 import appHeader from '../components/appHeader';
 import appTableResturant from '../components/appTableResturant';
 import appTitle from '../components/appTitle';
 import {cookie} from 'vux';
 let timeNow=new Date(Date.parse(new Date())-24*3600*1000);  //时间回退一天
        let year=timeNow.getFullYear();
        let month=(timeNow.getMonth()+1)>9?(timeNow.getMonth()+1):'0'+(timeNow.getMonth()+1);
        let day=timeNow.getDate()>9?timeNow.getDate():'0'+timeNow.getDate();
 export default{
    name:'resturant',
    data(){
       return{
              titleNow:"totalrev",  //存储目前展示的是哪个title
              isComplete:"",//存储目前展示的是未完成还是完成，如没有传值则展示总的数据
              position:"",//存储页面从index还是food跳转过来的
              modeType:'group',
              height:'',
              time:year+month+day+'', //时间
              code:'', //当前展示的title的code
              codeTitles:{index:{},food:{}}, //存储7个title的code
              conditions:['','','',''], //保存过滤条件
              conditionArr:[], //保存下拉列表展示数据
              allData:{
                 index:{totalrev:this.$t("totalrev"),roomsrev:this.$t("roomsrev"),fbrev:this.$t("fbrev"),otherrev:this.$t("otherrev"),occ:this.$t("occ"),adr:this.$t("adr"),revpar:this.$t("revpar")},  //酒店项目名称及key
                 food:{totalrev:this.$t("totalrev"),add:this.$t("add"),chineserest:this.$t("chineserest"),specialty:this.$t("specialty"),lobby:this.$t("lobby"),mini:this.$t("mini"),banquet:this.$t("banquet")},  //餐饮项目名称及key 
                 group:{
                   totalrev:'',
                   roomsrev:'',
                   fbrev:'',
                   otherrev:'',
                   occ:'',
                   adr:'',
                   revpar:'',
                   add:'',
                   chineserest:'',
                   specialty:'',
                   lobby:'',
                   mini:'',
                   banquet:'',
                 },
                 stretch:{
                   totalrev:'',
                   roomsrev:'',
                   fbrev:'',
                   otherrev:'',
                   occ:'',
                   adr:'',
                   revpar:'',
                   add:'',
                   chineserest:'',
                   specialty:'',
                   lobby:'',
                   mini:'',
                   banquet:'',
                 }
              }
       }
    },
    methods:{
      changeTitle(type){
              this.titleNow=type.key;
              this.code=type.code;
              this.getData();
      },
      changeLang(){  
               if(this.position=='index'){
                this.allData.index={totalrev:this.$t("totalrev"),roomsrev:this.$t("roomsrev"),fbrev:this.$t("fbrev"),otherrev:this.$t("otherrev"),occ:this.$t("occ"),adr:this.$t("adr"),revpar:this.$t("revpar")};
                this.getFilters(); 
               }else{
                 this.allData.food={totalrev:this.$t("totalrev"),add:this.$t("add"),chineserest:this.$t("chineserest"),specialty:this.$t("specialty"),lobby:this.$t("lobby"),mini:this.$t("mini"),banquet:this.$t("banquet")}; 
               }
               this.getData();
      },
      sure(){
        this.getData();
      },
      reset(){
        this.$set(this.conditions,0,'');
        this.$set(this.conditions,1,'');
        this.$set(this.conditions,2,'');
        this.$set(this.conditions,3,'');
      },
       getFilters(){
             /*let url='http://10.1.234.173:8080/DAP/getFourData.do';*/
             let url='/getFourData.do?type='+cookie.get('langSet');
             this.$axios.get(url).then((res)=>{
                     if(res.data.code==200)
                     this.conditionArr=res.data.data;
             })
       },
       getData(){
                 let url=''; 
                 if(this.position=='index'){
                          let c1=encodeURIComponent(encodeURIComponent(this.conditions[0]));
                          let c2=encodeURIComponent(encodeURIComponent(this.conditions[1]));
                          let c3=encodeURIComponent(encodeURIComponent(this.conditions[2]));
                          let c4=encodeURIComponent(encodeURIComponent(this.conditions[3]));
                          url='/getTwoData.do?date='+this.time+'&budget_type='+this.modeType+'&code='+this.code+'&hotel_type='+c1+'&hotel_brand='+c2+'&hotel_area='+c3+'&hotel_owner='+c4+'&type='+cookie.get('langSet');
                 }else{
                         url='/getFoodTwoData.do?date='+this.time+'&budget_type='+this.modeType+'&code='+this.code+'&type='+cookie.get('langSet');
                 }
                  url+='&i='+(this.isComplete?(this.isComplete=='complete'?1:0):'');
                  this.$axios.get(url).then((res)=>{
                     if(res.data.code==200){
                          this.allData[this.modeType][this.titleNow]=res.data.data;
                     }
                  })
          },
        getCode(){
          let url='/getCode.do?type='+cookie.get('langSet');
          this.$axios.get(url).then((res)=>{
                  if(res.data.code==200){
                         this.codeTitles.index=res.data.data.index;
                         this.codeTitles.food=res.data.data.food; 
                  }
                  if(!this.code)
                  this.code=this.codeTitles[this.position][this.titleNow];  //给code一个默认的值
          })
        },
       changeTime(time){
           this.time=time;
           window.selectTime=time;
           this.getData(); 
        },
        changeMode(mode){
                 this.modeType=mode;
                 //this.modeName=this.modeType=='group'?'集团预算':'压力预算'
                  this.modeName=this.modeType=='group'?this.$t("group")+this.$t("budget"):this.$t("stretch")+this.$t("budget")
                  this.getData();
        }
    },
    mounted(){
           this.position=this.$route.query.position;
           if(this.$route.query.code){    //如果是搜索页面跳转过来使用默认code，其他页面跳转使用传过来的参数
              this.code=this.$route.query.code;
           }else{
              this.code=this.position=='index'?'R1000':'R1200';
           }
           if(this.$route.query.time){  
                this.time=this.$route.query.time;
           }
           if(this.$route.query.modeType){  
                this.modeType=this.$route.query.modeType;
           }
          if(this.$route.query.type){    //接收从搜索页面/首页跳转过来的过滤参数类型
            if(this.$route.query.type=='hotel_type')
              this.conditions[0]=this.$route.query.name;
             if(this.$route.query.type=='hotel_brand')
              this.conditions[1]=this.$route.query.name;
             if(this.$route.query.type=='hotel_area')
               this.conditions[2]=this.$route.query.name;
           }
           this.isComplete=this.$route.query.iscomplete?this.$route.query.iscomplete:"";
           document.body.addEventListener('touchstart', function () {
           });
           if(this.position=='index'){  //首页跳转过来的需要获取四个下拉列表的过滤值
             this.getFilters();
           }
           if(this.position=='index'){
             this.height='10.93333333rem'
           }else{
             this.height='12.66666667rem'
           }
           this.getCode();
           this.getData();
    },
    computed:{
         showData(){    //table中需要展示的数据
               return {
                code:this.code,
                data:this.allData[this.modeType][this.titleNow] 
               }
         },
         titles(){
           return{
                code:this.code,
                title:this.allData[this.position],
                titleCode:this.codeTitles[this.position],
           };
         }
    },
    components:{
       'app-header':appHeader,
       'app-table-resturant':appTableResturant,
       'app-title':appTitle,
    } 
 }
</script>
<style lang="less" scoped>
 #resturant{
   .head{
     padding:.26666667rem/* 20px */ 0 .46666667rem;
     background: url(../../static/images/@2x/headbg@2x.png) no-repeat ;
     background-size: 100%;
     [data-dpr='3'] &{
        background: url(../../static/images/@3x/headbg@3x.png) no-repeat;
        background-size: 100%;
      }
      &.noSelect{
        padding-bottom:.8rem/* 60px */;
      }
      .selects{
      	height: 1.17333333rem;
        width:100%;
      	padding: .34666667rem .26666667rem .26666667rem/* 20px */;
      	display: flex;
      	li{
           width:0;
      	   flex-grow: 1;
           height: .53333333rem/* 40px */;
           line-height: .53333333rem/* 40px */;
      	   border-right: 1px solid #bdc0c8;
      	   select{
      	          display: block;
      	          height: 100%;
                  width:90%;
      	          margin:0 auto;
      	          padding-right: .33333333rem; 
      	          background: transparent url(../../static/images/@2x/down@2x.png) no-repeat right center;
      	          color:#fff;
      	          [data-dpr='3'] &{
	               background:transparent url(../../static/images/@3x/down@3x.png) no-repeat right center; 
	           }
      	   }
      	}
        [data-dpr='3'] & li{
          height:.56rem/* 42px */;
          line-height:.56rem/* 42px */;
        }
        [data-dpr='3'] & li:first-child{
          width:.66666667rem/* 50px */;
        }
        li:first-child{
          width:.26666667rem/* 20px */;
        }
      	li:last-child{
      	   border-right: none;
      	}
      }
      .btn{
             display:inline-block;
             width: 2.02666667rem;
             height: .50666667rem;
             margin:0 auto .4rem;
             border-radius: .24rem;
             border:1px solid #a4acc2;
             background:#a4acc2;
             line-height: .48rem;
             text-align: center;
             color:#2b4177;
           }
           .btn-first{
            margin-left:2.93333333rem/* 220px */;
           }
        .bth:active{
          background:#fff;
          color:red;
          /* box-shadow: inset 0 5px 10px #B41313,inset 0 -5px 10px #B41313;   */
        }
   }
   .content{
       position: relative;
       top:-.46666667rem;
       padding :0  .26666667rem .46666667rem;
       .title{
       	 line-height: .29333333rem;
       	 margin-bottom: .18666667rem;
       	 color:#7e7f7f;
       	 i{
       	   color:#2a4076;
       	   line-height: .29333333rem;
       	 }
       	 i:nth-of-type(1){
       	  font-size:.16rem;
       	 }
       	 i:nth-of-type(2){
       	  font-size:.06666667rem;
       	 }
       	 .number{
       	    margin:0 .09333333rem;
                   font-style: normal;
                   font-weight: 400;
                   color:#2a4076;
       	  }
                }
   }
 }
</style>