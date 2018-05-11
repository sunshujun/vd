<template>
  <div id="tableResturant">
     <div class="table-head font20">
     	<div class=" left">{{showTitle.firstTitle}}</div>
     	<div class="right">
     		<p><span v-for='item in showTitle.secondTitle'>{{item}}</span></p>
     	</div>
     </div>
     <ul class="table-body">
             <li v-for="data in showData" v-if="data.data">
                <div class="font20 wrap">
                   <div class="inner1"><span>{{data.name}}</span></div>
                   <div class="inner2">
                      <span>{{$t('actual')}}</span>
                      <span>{{$t('budget')}}</span>
                      <span>{{$t('lya')}}</span>
                   </div> 
                </div>
                <ul class="children font18">
                   <li v-for="(item1,index) in data.data">
                       <!-- <span  v-for="val in item1">{{val | formatNum}}</span>  -->
                       <template v-if="index==0">
                             <span :class="{'color-red':parseInt(item1[0])-parseInt(data.data[1][0])<0}">{{item1[0] | formatNum}}</span>
                             <span>{{item1[1] | formatNum}}</span>
                             <span>{{item1[2] | formatNum}}</span>
                       </template>
                       <span v-else  v-for="val in item1">{{val | formatNum}}</span> 
                   </li>
                </ul>
              </li>
      </ul>
  </div>
</template>
<script >
import {cookie} from 'vux'; 
export default{
   name:'tableResturant',
   props:{
     listData:{
       default:{
        code:'',
        data:[],
       }
     } 
   },
   data(){
      return{ 
            showTitle:{
              firstTitle:this.$t('indicator'),
              secondTitle:[this.$t('dayincome')+'('+this.$t('unit.yuan')+')',this.$t('covers'),this.$t('ave')]
            },
            showData:this.listData.data,
      }
   },
   computed:{ 
   },
   watch:{
      listData(){
        this.showData=this.listData.data;
      }
   },
   mounted(){
   },
   methods:{
     changeEchart(code){
            this.$emit('changeEchart',code);
     },
   }
}
</script>
<style lang="less" scoped> 
 #tableResturant{
   margin: 0 auto;
   padding-top: .13333333rem;
   background-color:#fff;
   .table-head{
   	/* width:9.46666667rem; */
   	height:.8rem/* 60px */;
   	display: flex;
   	border-radius:.06666667rem;
   	border: 2px solid #eee;
   	box-shadow: .08rem .10666667rem  #efefef;
   	 .left{
   	    height:100%;
   	    width:2.53333333rem;
   	    line-height: .74666667rem/* 56px */;
   	    text-align: center; 
            border-right: 1px solid #d4d7e0;
   	 }
   	 .right{
   	   flex-grow:1;
   	         p{
	   	       display: flex;
                       line-height: .74666667rem/* 56px */;
                       border-bottom: 1px solid #dfe1e8;
                       span{
                              width:0;
                              flex-grow: 1;
                             display: inline-block;
                             text-align: center;
                       }
	   	 } 
   	 }
   }
   .table-body{ 
   	    /* width: 9.46666667rem; */
   	    border-top: 1px dashed #d4d7e0;
   	    margin:.26666667rem auto 0;
	    &>li{ 
	    	height:2.4rem/* 180px */;
	    	display: flex;
	    	padding:0 .02666667rem;
	    	border-bottom: 1px dashed #d4d7e0;
               .wrap{
                 width:2.53333333rem;
                 div{
                     display:inline-block;
                     width:50%;
                     height:100%;
                     float:left; 
                     text-align:center;
                     display:flex;
                     flex-direction: column;
                 }
                 .inner1{ 
                     justify-content:center;
                     border-right:1px dashed #d4d7e0;
                 }
                 .inner2{ 
                   border-right:1px dashed #d4d7e0;
                   span{
                    display:inline-block;
                    flex-grow:1;
                    width:100%;
                    line-height:.8rem/* 60px */;
                    border-bottom:1px dashed #d4d7e0;
                   }
                   span:last-child{
                    border-bottom:none;
                   }
                 }
               }
               .children{
                display: inline-block;
                flex-grow:1;
                li{
                  height:.8rem/* 60px */;
                  line-height:.8rem/* 60px */; 
                  display:flex;
                  border-bottom:1px dashed #d4d7e0;
                  span{
                    display:inline-block; 
                    width:0;
                    flex-grow:1;
                    height:100%;
                    line-height:.8rem/* 60px */;
                    text-align:right;
                    border-right:1px dashed #d4d7e0;
                  }
                  span:last-child{
                    border-right:none;
                  }
                }
                li:last-child{
                  border-bottom:none;
                }
               }
	    	&>span{
                    display: inline-block;
		     height: 100%; 
		     width:0;
		     flex-grow: 1;
		     line-height:.84rem;
		     text-align: center;
                    word-break:break-all;
	    	}
	    	&>span:first-child{
	    	     width: 2.53333333rem; 
	    	     flex-grow: 0;
	    	     border-right: 1px dashed #f4f5f7;
                    display: flex;
                    flex-direction:column;
                     justify-content:center;
                    span{
                      width:100%;
                      line-height: 1;
                    }
	    	}
	    }
           &>li:nth-child(2n){
              .inner1{
                background-color:#f9f9f9;
              }
           }
	}
 }
</style>