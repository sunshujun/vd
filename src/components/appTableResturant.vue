<template>
  <div id="tableResturant">
     <div class="table-head">
     	<div class="font20 left">{{showTitle.firstTitle}}</div>
     	<div class="right font16">
     		<p :class="{'foodDetail':webposition=='foodDetail'}"><span v-for='item in showTitle.secondTitle'>{{item}}</span></p>
	     	<p v-if="webposition=='resturant'">
	     	         <span  v-for="(title,index) in showTitle.thirdTitle" @click='sort(index)'><b>{{title}}<i class="iconfont icon-paixu"></i></b></span>
	     	</p>
                <p v-else style="padding-right:0">
                 <span  v-for="(title,index) in showTitle.thirdTitle" ><b>{{title}}</b></span>
                </p>
     	</div>
     </div>
     <ul class="table-body">
             <li v-for="data in showData" v-if="data.data">
                <span :class="['font20']" @click='jump(data.name)'>
                  <!-- <span @click="changeEchart(data.code)">{{data.name}}</span> -->
                  <span>{{data.name}}</span>
                </span>
                <!-- <span class="font16" v-for='item in data.data'>{{item | formatNum}}</span> -->
                <template v-if="data.data&&webposition!='artificial'&&webposition!='separation'">
                         <span  :class="{'color-red':parseInt(data.data[0])-parseInt(data.data[1])<0}">{{data.data[0]|formatNum}}</span>
                        <span >{{data.data[1]|formatNum}}</span>
                        <span  :class="{'color-red':parseInt(data.data[2])<100}">{{data.data[2]|formatNum}}</span>
                        <span >{{data.data[3]|formatNum}}</span>
                        <span  :class="{'color-red':parseInt(data.data[4])<0}">{{data.data[4]|formatNum}}</span>
              </template> 
               <span v-else v-for="item in data.data">{{item}}</span> 
                 <span v-if="webposition=='resturant'" @click='jump(data.name)'><i class="iconfont icon-52"></i></span>
                 <span v-else style="width:0"></span>
              </li>
      </ul>
  </div>
</template>
<script >
import {cookie} from 'vux'; 
export default{
   name:'tableResturant',
   props:{
     webposition:{     // 记录从哪个页面调用的 默认为resturant页面调用
           default:'resturant'
     },
     time:{
      default:''
     },
     modeType:{
      default:''
     },
     listData:{
       default:{
        code:'',
        data:[],
       }
     },
     height:{
      default:'10.4rem'
     }
   },
   data(){
      return{ 
            showTitle:{firstTitle:'',secondTitle:[],thirdTitle:[]},
            showData:this.listData.data,
            sortMode:[true,true,true,true,true],//保存列表是升序还是降序
            lang:cookie.get('langSet'), //
      }
   },
   computed:{ 
   },
   watch:{
      listData(){
        this.showData=this.listData.data;
        this.sortMode[0]=true;
        if(this.webposition=='resturant')this.sort(0);
      },
      webposition(){
        this.setTitle();
      },
      time(){
        if(this.webposition=='artificial'||this.webposition=='separation'){
          this.showTitle.secondTitle[0]=this.time.length==4?this.$t('currYear'):this.$t('currMonth')
        }
      }
   },
   mounted(){
       this.setTitle(); 
       if(this.webposition=='resturant')this.sort(0);
   },
   methods:{
     jump(name){ 
       if(this.webposition=='resturant'){
            this.$router.push('/resturantdetail?name='+name+'&position='+this.$route.query.position+'&code='+this.listData.code+'&time='+this.time+'&modeType='+this.modeType);
       }
     },
     changeEchart(code){
          if(this.webposition=='foodDetail')
            this.$emit('changeEchart',code)
     },
     setTitle(){
           if(this.webposition=='resturant'){  //餐饮二级页面表头title
             this.showTitle={
              firstTitle:this.$t('hotelname'),
              secondTitle:[this.$t('dayincome')],
              thirdTitle:[this.$t('actual'),this.$t('budget'),this.$t('percent'),this.$t('lya'),this.$t('yoy')]
            }
           }else if(this.webposition=='foodDetail'){ //餐饮四级页面表头title
              this.showTitle={
                firstTitle:this.$t('indicator'),
                secondTitle:[this.$t('income'),this.$t('number'),this.$t('ave')],
                thirdTitle:[this.$t('actual'),this.$t('budget'),this.$t('lya'),this.$t('actual'),this.$t('budget'),this.$t('actual'),this.$t('budget'),]
              }
           }else if(this.webposition=='artificial'){  //人力人工成本表头
              this.showTitle={
                firstTitle:this.$t('indicator'),
                secondTitle:[this.$t('actual'),this.$t('budget')],
                thirdTitle:[this.$t('laboarcost'),this.$t('laboarcostper'),this.$t('laboarcost'),this.$t('laboarcostper')]
              }
           }else if(this.webposition=='separation'){  //人力离职率表头
               this.showTitle={
                firstTitle:this.$t('indicator'),
                secondTitle:[this.time.length==4?this.$t('currYear'):this.$t('currMonth')],
                thirdTitle:[this.$t('turnoveract'),this.$t('onduty'),this.$t('turnoverper')]
              }
           }
     },
     sort(index){  //对列表数据进行排序
       let newArr=[...this.showData];
       let n=this.showData.length;
       if(n==0) return;
        for(let i=0; i<n; i++){
          for(let j=0; j<n; j++){
            if(this.sortMode[index]){
                  if(parseInt(newArr[i]['data'][index])||parseInt(newArr[i]['data'][index])==0){
                       if(parseInt(newArr[i]['data'][index])>parseInt(newArr[j]['data'][index])){ 
                          [newArr[i],newArr[j]]=[newArr[j],newArr[i]];
                        }
                  }else{
                        [newArr[i],newArr[n-1]]=[newArr[n-1],newArr[i]];
                        break;
                  }
            }else{
                   if(parseInt(newArr[i]['data'][index])||parseInt(newArr[i]['data'][index])==0){
                       if(parseInt(newArr[i]['data'][index])<parseInt(newArr[j]['data'][index])){ 
                          [newArr[i],newArr[j]]=[newArr[j],newArr[i]];
                        }
                  }else{
                        [newArr[i],newArr[j]]=[newArr[j],newArr[i]]; 
                  }
            }
          }
        }
        this.sortMode[index]=!this.sortMode[index];
        this.showData=[...newArr]; 
     }, 
   }
}
</script>
<style lang="less" scoped> 
[data-dpr="1"]{
                  .iconfont{
                                    font-size:12px;
                                   }
                }
[data-dpr="3"]{
                  .iconfont{
                                    font-size:24px;
                                   }
                }
 #tableResturant{
   margin: 0 auto;
   padding-top: .13333333rem;
   background-color:#fff;
   .foodDetail{
    span{
      flex-grow: 0 !important;
    }
    span:nth-child(1){
      width:42.85%;
      border-right: 1px solid #d4d7e0;
    }
    span:nth-child(2){
      width:28.57%;
      border-right: 1px solid #d4d7e0;
    }
    span:nth-child(3){
      width:28.57%;
    }
   }
   .table-head{
   	/* width:9.46666667rem; */
   	height: 1.2rem/* 90px */;
   	display: flex;
   	border-radius:.06666667rem;
   	border: 2px solid #eee;
   	box-shadow: .08rem .10666667rem  #efefef;
   	 .left{
   	    height:100%;
   	    width:2.53333333rem;
   	    line-height: 1.14666667rem/* 86px */;
   	    text-align: center;
                    /* padding-left: .73333333rem; */
                    border-right: 1px solid #d4d7e0;
   	 } 
   	 .right{
   	   flex-grow:1;
   	         p{
	   	   display: flex;
	   	 } 
	   	 p:nth-of-type(1){
	                     height: .53333333rem;
	                     line-height: .52rem;
	                     border-bottom: 1px solid #dfe1e8;
	                     span{
                                  width:0;
                                  flex-grow: 1;
	                           display: inline-block;
	                           text-align: center;
	                     }
	   	 }
	   	 p:nth-of-type(2){
	   	      height:.61333333rem/* 46px */;
	   	      padding-right: .33333333rem;
	   	      span{
	   	           width:0;
	   	           flex-grow: 1;
                           display: flex;
                           flex-direction:column;
                           justify-content:center;
                           text-align: center;
                           color:#444;
                           b{
                            font-weight:normal;
                           }
	   	      }
                      span:nth-child(2n-1){
                        background-color:rgb(249,249,249); 
                      }
	   	 }
   	 }
   }
   .table-body{ 
   	    /* width: 9.46666667rem; */
   	    border-top: 1px dashed #d4d7e0;
   	    margin:.26666667rem auto 0;
	    li{ 
	    	height:.93333333rem;
	    	display: flex;
	    	padding:0 .02666667rem;
	    	border-bottom: 1px dashed #d4d7e0; 
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
	    	span:last-child{
	    	   width:.33333333rem;
	    	   flex-grow: 0;
                   display: flex;
                  flex-direction: column;
                  justify-content: center;
	    	   text-align: center;
	    	   i{
	    	   	line-height: .8em;
	    	   	color:#000;
	    	   	font-size: .24rem;
	    	   }
	    	}
               span:nth-child(2n){
                background-color:rgb(249,249,249); 
               }
	    }
	}
 }
</style>