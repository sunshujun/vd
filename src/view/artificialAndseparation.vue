<template>
 <div class="artificial">
      <div class="head">
      	<app-header  @selfChangeTime="changeTime" @selfChangeMode="changeMode" :time="time"></app-header>
      </div>
      <div class="body">
      	<app-table-resturant :listData="showData" :webposition="webposition"></app-table-resturant>
      </div>
 </div>
</template>
<script >
import appHeader from '../components/appHeader';
import appTableResturant from '../components/appTableResturant';
export default{
	data(){
		return{
		          modeType:'group',
	                          showData:[],
	                          time:'',
	                          webposition:'',
		}
	},
	methods:{
	      changeTime(time){

	      },
	      changeMode(mode){
	                 this.modeType=mode; 
	                 //this.modeName=this.modeType=='group'?'集团预算':'压力预算'
	                  this.modeName=this.modeType=='group'?this.$t("group")+this.$t("budget"):this.$t("stretch")+this.$t("budget")
	      }
	 },
	components:{
	       'app-header':appHeader,
	       'app-table-resturant':appTableResturant,
	},
	mounted(){
	    this.time=this.$route.query.time;
	   if(this.$route.query.type=='artificial'){
	   	document.title=this.$t('laboarcost');
	   	this.webposition='artificial';
	                      this.showData={
			            firstTitle:'酒店名称',
			            secondTitle:['实际','预算'],
			            thirdTitle:['人工成本','人工成本','人工成本','人工成本'],
			            data:[{name:'realm嘉华',data:[15000,3400,'100%',54032,54032]
			                            },{
			                        name:'realm嘉华',data:[15000,3400,'100%',54032,54032]
			                    },{
			                           name:'realm嘉华',data:[15000,3400,'100%',54032,23409]
			                       },{
			              name:'realm嘉华',data:[15000,3400,'100%',54032,23409]
			                        },{
			                                     name:'realm嘉华',data:[15000,3400,'100%',54032,23409]
			              },{
			                                     name:'realm嘉华',data:[15000,3400,'100%',54032,23409]
			              },{
			                 name:'realm嘉华',data:[15000,3400,'100%',54032,23409]
			              },{
			                 name:'realm嘉华',data:[15000,3400,'100%',54032,23409]
			              },{
			                 name:'realm嘉华',data:[15000,3400,'100%',54032,23409]
			              }]
			          }
	   }else if(this.$route.query.type=='separation'){
	   	document.title=this.$t('turnover');
	   	this.webposition='separation';
	                          this.showData={
			            firstTitle:'酒店名称',
			            secondTitle:['单月'],
			            thirdTitle:['离职人数','在岗人数','离职率'],
			            data:[{name:'realm嘉华',data:[15000,3400,'100%']
			                            },{
			                        name:'realm嘉华',data:[15000,3400,'100%']
			                    },{
			                           name:'realm嘉华',data:[15000,3400,'100%']
			                       },{
			              name:'realm嘉华',data:[15000,3400,'100%']
			                        },{
			                                     name:'realm嘉华',data:[15000,3400,'100%']
			              },{
			                                     name:'realm嘉华',data:[15000,3400,'100%']
			              },{
			                 name:'realm嘉华',data:[15000,3400,'100%']
			              },{
			                 name:'realm嘉华',data:[15000,3400,'100%']
			              },{
			                 name:'realm嘉华',data:[15000,3400,'100%']
			              }]
			          }
	   }
	}
}
</script>
<style lang="less" scoped>
.head{ 
   padding:.06666667rem 0 .13333333rem 0;
   background: url(../../static/images/@2x/headbg@2x.png) no-repeat ;
   background-size: 100%;
   [data-dpr='3'] &{
      background: url(../../static/images/@3x/headbg@3x.png) no-repeat;
      background-size: 100%;
   }
}
.body{
 padding:0 .26666667rem;
}
</style>