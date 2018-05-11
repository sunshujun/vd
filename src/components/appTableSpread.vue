<template>
  <div id="tableSpread">
      <p class="table-head bg-purple" >
        <span>{{$t("indicator")}}</span>
        <span>{{$t("act")}}</span>
        <span>{{$t("bud")}}</span>
        <span>{{$t("percent")}}</span>
        <span>{{$t("lya")}}</span>
        <span>{{$t("yoy")}}</span>
      </p>
      <ul class="table-body">
	    <template v-for='(data,index) in listData'>
	         <li v-if="data.floor=='root'" class="root">
	            <!-- <span class="font20" @click="changeEchart(data.code)">{{data.name}}</span> -->
	            <span class="font20" >{{data.name}}</span>
	            <!-- <span v-for='item in data.data' class="font16">{{item | formatNum}}</span> -->
	             <template v-if="data.data">
	                         <span  :class="{'color-red':parseInt(data.data[0])-parseInt(data.data[1])<0}">{{data.data[0]|formatNum}}</span>
	                        <span >{{data.data[1]|formatNum}}</span>
	                        <span  :class="{'color-red':parseInt(data.data[2])<100}">{{data.data[2]|formatNum}}</span>
	                        <span >{{data.data[3]|formatNum}}</span>
	                        <span  :class="{'color-red':parseInt(data.data[4])<0}">{{data.data[4]|formatNum}}</span>
	              </template>
	            <span >
	            	<!-- <i :class='["iconfont",data.open?"icon-52":"icon-54"]'></i> -->
	            </span> 
	        </li>
	        <template v-else> 
	        	<li class="secondWrap" >
	        	      <ul>
	        	      	<li class="second">
		                    <span class="font20" @click="changeEchart(data.code)">{{data.name}}</span>
		                    <!-- <span v-for='item in data.data' class="font16">{{item | formatNum}}</span> -->
		                    <template v-if="data.data">
		                         <span  :class="{'color-red':parseInt(data.data[0])-parseInt(data.data[1])<0}">{{data.data[0]|formatNum}}</span>
		                        <span >{{data.data[1]|formatNum}}</span>
		                        <span  :class="{'color-red':parseInt(data.data[2])<100}">{{data.data[2]|formatNum}}</span>
		                        <span >{{data.data[3]|formatNum}}</span>
		                        <span  :class="{'color-red':parseInt(data.data[4])<0}">{{data.data[4]|formatNum}}</span>
		                    </template>
		                    <span v-if="data.children.length"  @click='spread(index,data.floor,$event)'>
		                    	<i :class='["iconfont",data.open?"icon-52":"icon-54"]'></i>
		                    </span>
		                    <span v-else></span>
		               </li>
		               <transition
			    enter-active-class="animated fadeInDown"
			    leave-active-class="animated fadeOutUp"
			 >
		               <li v-if='data.children.length&&data.open' class="third clearfix" >
		               	       <div class="left">
		               	       	<span v-for='item1 in data.children' class="font16">{{item1.name}}</span>
		               	       </div>
		               	       <div class="right clearfix">
		               	       	<p v-for='item2 in data.children' class="clearfix font14">
		               	       		<!-- <span v-for='item3 in item2.data'>{{item3 | formatNum}}</span> -->
		               	       		<template v-if="item2.data">
				                         <span  :class="{'color-red':parseInt(item2.data[0])-parseInt(item2.data[1])<0}">{{item2.data[0]|formatNum}}</span>
				                        <span >{{item2.data[1]|formatNum}}</span>
				                        <span  :class="{'color-red':parseInt(item2.data[2])<100}">{{item2.data[2]|formatNum}}</span>
				                        <span >{{item2.data[3]|formatNum}}</span>
				                        <span  :class="{'color-red':parseInt(item2.data[4])<0}">{{item2.data[4]|formatNum}}</span>
				              </template>
		               	       		<span v-if="position=='food'"  @click='jump(item2.name)'>
			                    	    <i class=' iconfont icon-52'></i>
			                               </span>
			                               <span v-else></span>
		               	       	</p>
		               	       </div>
		               </li>
		                </transition>
	        	      </ul>
	        	</li>
	        </template>
	    </template>
           </ul>
  </div> 
</template>
<script>
import BScroll from "better-scroll"; 
export default{
  name:'apptablespread',
  props:{listData:{},height:{default:'8.06666667rem'}},
  data(){
     return{
     	position:'',
     	/*listData:[{
     	  name:'当日收入',
     	  floor:'root',
     	  data:[15000,15,'100%',63421,'10%'],
     	  open:true,
     	},{
     	   name:'当日收入',
     	  floor:'root',
     	  data:[15000,15,'100%',63421,'10%'],
     	  open:true,
     	},{
                  name:'客房',
     	  floor:'second',
     	  data:[15000,15,'100%',63421,'10%'],
     	  open:true,
     	  children:[{
     	  	name:'出租率',
     	  	floor:'third',
     	  	data:[15000,15,'100%',63421,'10%'],
     	  },{
                                name:'平局房价',
     	  	floor:'third',
     	  	data:[15000,15,'100%',63421,'10%'],
     	  },{
     	  	name:'没房收益',
     	  	floor:'third',
     	  	data:[15000,15,'100%',63421,'10%'],
     	  }]
     	},{
     	  name:'当日收入',
     	  floor:'root',
     	  data:[15000,15,'100%',63421,'10%'],
     	  open:true,
     	},{
                  name:'客房',
     	  floor:'second',
     	  data:[15000,15,'100%',63421,'10%'],
     	  open:true,
     	  children:[{
     	  	name:'出租率',
     	  	floor:'third',
     	  	data:[15000,15,'100%',63421,'10%'],
     	  },{
                                name:'平局房价',
     	  	floor:'third',
     	  	data:[15000,15,'100%',63421,'10%'],
     	  },{
     	  	name:'没房收益',
     	  	floor:'third',
     	  	data:[15000,15,'100%',63421,'10%'],
     	  }]
     	}]*/ 
     }
  },
  methods:{
  	spread(index,floor,$event){
                   this.listData[index].open=!this.listData[index].open;
  	},
  	jump(name){
  	 if(this.$route.query.position=='food')
  	   this.$router.push('/fooddetail?name='+name)
  	},
  	changeEchart(code){
                     this.$emit('changeEchart',code);
  	}
  },
  mounted(){
  	this.position=this.$route.query.position;
  }
}
</script>
<style lang="less" scoped>
.bscroll{
  overflow:hidden;
}
  #tableSpread{
                width: 9.46666667rem;
	padding: .13333333rem 0 .16rem 0;
	margin:0 auto;
	border-radius:0 0 .13333333rem .13333333rem;
	background-color:#fff;
	.table-head{
	  height: .48rem;
	   background:#f7f7f7 url(../../static/images/@2x/tablehead2@2x.png) no-repeat;
	   background-size: cover;
	   [data-dpr='3'] &{
	   	background:#f7f7f7 url(../../static/images/@3x/tablehead2@3x.png) no-repeat;
	                background-size: cover;
	   }
	  span{
	     display: inline-block;
	     height: 100%;
	     width: 1.37333333rem;
	     float:left;
	     line-height: .48rem;
	     text-align: center;
	  }
	  span:nth-child(1){
	   width: 2.13333333rem/* 160px */;
	   color:#fff;
	  }
	} 
	.table-body{
	    margin-top:.13333333rem;
	    border-top:1px solid #d4d7e0;
	    .root,.second{
	    	height: .82666667rem;
	    	border-bottom: 1px dashed #d4d7e0;
	    	span{
                                    display: inline-block;
		     height: 100%;
		     width: 1.37333333rem;
		     float:left;
		     line-height: .8rem;
		     word-break:break-all;
		     text-align:right;
	    	}
	    	span:first-child{
	    	     width: 2.13333333rem/* 160px */; 
	    	     border-right: 1px dashed #f4f5f7;
	    	     text-align:left;
	    	}
	    	span:last-child{
	    	   width:.4rem;
	    	   text-align: center;
	    	    display: flex;
	    	    flex-direction: column;
	    	    justify-content: center;
	    	   i{
	    	   	line-height: .8em;
	    	   	color:#000;
	    	   	font-size: .24rem;
	    	   }
	    	}
	    }
	    .root{
                       span:first-child{
                       	padding-left:.13333333rem/* 10px */;
                       }
	    }
	    .second span:first-child{
	    	 padding-left:.2rem/* 15px */;
	    	     	   /*  background: url(../../static/images/@2x/message@2x.png) no-repeat center center;
	    	     	   		    	     [data-dpr='3'] &{
	    	     	   		    	     	background: url(../../static/images/@3x/message@3x.png) no-repeat center center;
	    	     	   		    	     } */
	    	}
	    .third{
	       border-bottom: 1px dashed #d4d7e0;
	       .left{
                               float:left;
                               width: 2.13333333rem/* 160px */; 
                               padding:.09333333rem 0;
	               border-right: 1px dashed #f4f5f7;
	               span{
	                  display: block;
	               	  width: 100%; 
	               	  line-height:.56rem;
	               	  padding-left:.26666667rem/* 20px */;
		  text-align: left; 
	               }
	       }
	       .right{
	       	float: left;
	       	width:7.33333333rem;
	       	padding:.09333333rem;
	       	font-size: 0;
	       	p{
	       	   background: #f9f9f9;
	       	   span{
	       	     width: 1.37333333rem;
		     float:left;
		     line-height: .56rem;
		     text-align: right; 
	       	   }
	       	   span:first-child{
	       	   	width:1.28rem;
	       	   }
	       	   span:last-child{
	    	      width:.4rem;
	    	      text-align: center;
	    	      i{
	    	   	line-height: .8em;
	    	   	color:#000;
	    	   	font-size: .24rem;
	    	       }
	    	   }
	       	}
	       	p:last-child{
	       	   background: #f9f9f9 url(../../static/images/@2x/rightbottom@2x.png) no-repeat right bottom;
	       	   [data-dpr='3'] &{
	       	   	background: #f9f9f9 url(../../static/images/@3x/rightbottom@3x.png) no-repeat right bottom;
	       	   }
	       	}
	       }
	    }
	}
  }
</style>