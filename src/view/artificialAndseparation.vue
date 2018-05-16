<template>
 <div class="artificial">
      <div class="head">
      	<app-header
      	    @selfChangeTime="changeTime"
      	    @selfChangeMode="changeMode"
      	    :isShowSearch="false"
      	    :time="time"
                    :modeType="modeType"
      	     >
      	</app-header>
      </div>
      <div class="body">
      	<app-table-resturant :listData="showData" :webposition="webposition" :time="time"></app-table-resturant>
      </div>
 </div>
</template>
<script >
import appHeader from '../components/appHeader';
import appTableResturant from '../components/appTableResturant';
import {cookie} from  'vux';
export default{
	data(){
		return{
		          modeType:'group',
	                          showData:[],
	                          time:'',
	                          webposition:'artificial',//默认人工成本
		}
	},
	methods:{
	      changeTime(time){
	      	  this.time=time;
                                 this.getData();
	      },
	      changeMode(mode){
	                 this.modeType=mode;
	                 this.getData();
	      },
	      getData(){
	      	let url=this.webposition=='artificial'?'getHumen.do':'getSeparation.do';
	      	url+='?date='+this.time+'&type='+cookie.get('langSet')+'&budget_type='+this.modeType;
	      	this.$axios.get(url).then((res)=>{
		          if (res.data.code==200){
		                this.showData={data:res.data.data};
		          }
	                })
	      }
	 },
	components:{
	       'app-header':appHeader,
	       'app-table-resturant':appTableResturant,
	},
	mounted(){
	   this.time=this.$route.query.time;
	   this.modeType=this.$route.query.modeType;
	   if(this.$route.query.type=='artificial'){
	   	document.title=this.$t('laboarcost');
	   	this.webposition='artificial';
	   }else if(this.$route.query.type=='separation'){
	   	document.title=this.$t('turnover');
	   	this.webposition='separation';
	   }
	   this.getData();
	}
}
</script>
<style lang="less" scoped>
.head{
   padding:.26666667rem/* 20px */ 0;
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