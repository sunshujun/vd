<template>
<div id='table' class="font20">
 <p  :class="['table-head',bgClass]">
   <span>{{$t("indicator")}}</span>
   <span>{{$t("act")}}</span>
   <span>{{$t("bud")}}</span>
   <span>{{$t("percent")}}</span>
   <span>{{$t("lya")}}</span>
   <span>{{$t("yoy")}}</span>
 </p>
 <ul class="table-body font18">
    <li v-for='data in listData'>
        <!-- <span class="font20" @click='changeEchart(data.code)'>{{data.name}}</span> -->
        <span @click="jump(data.code)" class="font20"><span>{{data.name}}</span></span>
        <!-- <template v-for='(item,index) in data.data' >
        	<span v-if="index==0" :class="{'color-red':parseInt(item)-parseInt(data.data[1])<0}">{{item|formatNum}}</span>
                <span v-else>{{item|formatNum}}</span>
        </template> -->
        <template v-if="data.data">
        	         <span  :class="{'color-red':parseInt(data.data[0])-parseInt(data.data[1])<0}">{{data.data[0]|formatNum}}</span>
	        <span >{{data.data[1]|formatNum}}</span>
	        <span  :class="{'color-red':parseInt(data.data[2])<100}">{{data.data[2]|formatNum}}</span>
	        <span >{{data.data[3]|formatNum}}</span>
	        <span  :class="{'color-red':parseInt(data.data[4])<0}">{{data.data[4]|formatNum}}</span>
        </template>
        <span v-if="webposition=='fooddetail'&&(data.code=='R1200'||data.code=='R1216')" ></span>
        <span v-else @click="jump(data.code)" ><i class="iconfont icon-52"></i></span>
          <!-- 餐饮4级不要总收入和宴会跳转 -->
    </li>
 </ul>
</div>
</template>
<script > 
export default{
   name:'appTable',
   props:['listData','bgClass','webposition'],
   data(){
	return{ 
	}
   },
   methods:{
   	jump(code){
   	   this.$emit('jump',code)
   	   /*this.$router.push('/resturant?code='+code+'&position='+this.position+'&time='+this.time+'&modeType='+this.modeType);*/
   	},
   	changeEchart(code){
                     this.$emit('changeEchart',code)
   	}
   },
   watch:{
         /* listData(){
          	this.$nextTick(()=>{
          	     console.log(document.querySelector('.index-content>div').clientHeight);
          	})
          }*/
   },
   mounted(){ 
   }
}
</script>
<style lang="less" scoped>
#table{
	/* width: 9.46666667rem; */
	padding: .13333333rem 0 .16rem 0;
	margin:0 auto;
	border-radius:0 0 .13333333rem .13333333rem;
	background-color:#fff;
	.table-head{
	  height: .61333333rem/* 46px */;
	  display: flex;
	  padding-right: .4rem;
	  span{
	     display: inline-block;
	     height: 100%;
	     width:0;
	      flex-grow: 1;
	     line-height:.61333333rem/* 46px */;
	     text-align: right;
	     word-break:break-all;
	  }
	  span:nth-child(1){
	   width: 1.90666667rem;
	   flex-grow: 0;
	   color:#fff;
	   text-align: center;
	  }
	}
	.bg-purple{
	    background:#ffe6ff url(../../static/images/@2x/tablehead1@2x.png) no-repeat;
	    background-size: cover; 
	}
	.bg-sky{
	    background:#E9F8FF url(../../static/images/@2x/tablehead2@2x.png) no-repeat;
	    background-size: cover;
	}
	.bg-blue{
	    background:#EDF7FF url(../../static/images/@2x/tablehead3@2x.png) no-repeat;
	    background-size: cover;
	}
	.bg-green{
	    background:#E9F8FF url(../../static/images/@2x/tablehead4@2x.png) no-repeat;
	    background-size: cover;
	}
	[data-dpr='3'] {
	               .bg-purple{
		    background:#ffe6ff url(../../static/images/@3x/tablehead1@3x.png) no-repeat; 
		    background-size: cover;
		}
	               .bg-sky{
		    background:url(../../static/images/@3x/tablehead2@3x.png) no-repeat;
		    background-size: cover;
		}
		 .bg-blue{
		    background:url(../../static/images/@3x/tablehead3@3x.png) no-repeat;
		    background-size: cover;
		}
		.bg-green{
		    background:url(../../static/images/@3x/tablehead4@3x.png) no-repeat;
		    background-size: cover;
		}
	}
	.table-body{
	    li{
	    	border-bottom: 1px dashed #d4d7e0;
	    	display: flex;
	    	&>span{
                                    display: inline-block;
		     height: 100%;
		     width:0;
		      flex-grow: 1;
		     line-height: .8rem; 
		     text-align: right; 
	    	}
	    	&>span:first-child{
	    	     width: 1.90666667rem; 
	    	     display:flex;
	    	     height:.8rem/* 60px */;
	    	     flex-direction:column;
	    	     justify-content:center;
	    	     padding-left:.06666667rem;
	    	     text-align: left; 
	    	     flex-grow: 0;
	    	     border-right: 1px dashed #f4f5f7;
	    	     /* background: url(../../static/images/@2x/message@2x.png) no-repeat left center;
	    	     background-size: 90%;
	    	     [data-dpr='3'] &{
	    	     	background: url(../../static/images/@3x/message@3x.png) no-repeat left center;
	    	     	background-size: 90%;
	    	     }
	    	     [data-dpr='1'] &{
	    	     	background-size: 85%;
	    	     } */
	    	     span{
	    	     	display:inline-block;
	    	     	width:100%;
	    	     	line-height:1; 
	    	     }
	    	}
	    	span:last-child{
	    	   width:.4rem;
	    	   flex-grow: 0;
	    	   display: flex;
	    	   flex-direction: column;
	    	   justify-content: center;
	    	   text-align: center;
	    	   i{
	    	   	/* line-height: .8em; */
	    	   	color:#000;
	    	   	font-size: .24rem;
	    	   }
	    	}
	    }
	}
   
} 
</style>