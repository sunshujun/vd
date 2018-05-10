<template>
 <div id="search">
    <div class="head">
    	<!-- <i class="iconfont  icon-fanhui1" @click='back'></i> 
        <span class="line"></span> -->
	<div class="search-group">
	     <i class="iconfont icon-sousuo"></i>
	     <input type="text"  :class="['font20',inputError?'':'error']" v-model='searchKey' @keyup.13='search($event)' :placeholder="$t('placehoder')">
	</div>
    </div>
    <div class="content">
        <ul  v-if="searchList.length!=0" class="searchList font24">
            <li v-for="item in searchList" @click="jump(item.name,item.type)">{{item.name}} <i class="iconfont icon-ziyuan"></i></li>
        </ul>
    	<div v-if="searchList.length==0" class="hot">
    	    <p class="font30"><i class="iconfont icon-reci"></i>{{$t("hot")}}</p>
    	    <ul class="word clearfix">
               <template v-for='data in hot'>
                  <li  class="font24" v-for="item in data" @click="clickHotNearly(item.name)">{{item.name}}</li>
                  <br>
               </template> 
    	    </ul>
    	</div>
    	<div v-if="searchList.length==0" class="nearly">
    	     <p class="font30"><i class="iconfont icon-lishijilu"></i>{{$t("nearly")}}</p>
    	     <div class="nearly-content">
               <ul class="word clearfix">
                  <li v-for='(data,index) in nearly' class="font24" @click='clickHotNearly(data)'>{{data}}</li>
              </ul>
               <div v-if="nearly.length" class="delete-wrap">
                <div class="delete font24" @click='deleteHistory'>
                   <i class="iconfont icon-shanchu"></i>{{$t("empty")}}
                </div>
              </div> 
           </div>
    	</div> 
    </div>
 </div>
</template>
<script>/*
let timeNow=new Date();
let year=timeNow.getFullYear();
let month=(timeNow.getMonth()+1)>9?(timeNow.getMonth()+1):'0'+(timeNow.getMonth()+1);
let day=timeNow.getDate()>9?timeNow.getDate():'0'+timeNow.getDate();*/
import {cookie} from 'vux';
export default{
   name:'',
   data(){
      return{ 
        searchKey:'',
      	hot:[],
      	nearly:[], 
        searchList:[],
        lang:cookie.get('langSet'),
        inputError:true,
      }
   },
   watch:{
    searchKey(){
       let reg=null;
       if(this.lang=='cn'){  //中文模式只能输入中文不能有特殊字符
            reg=/^[\u4e00-\u9fa5]+$/gi
       }else{   //英文模式也只能有英文不能有特殊字符
            reg=/^[A-z]+$/gi
       } 
       if(!this.searchKey){
          this.searchList=[];
       }else{
             if(this.searchKey.match(reg)){
                    this.inputError=true;
                    let key=encodeURIComponent(encodeURIComponent(this.searchKey));
                    let url='/DAP/hotWordsLike.do?name='+key+'&type='+cookie.get('langSet');
                    this.$axios.get(url).then((res)=>{
                       if(res.data.code==200)
                        this.searchList=res.data.data;
                    })
             }else{
                    this.inputError=false;
             }
       }
    }
   },
   methods:{
   	back(){
   	   this.$router.go('-1')
   	},
   	deleteHistory(){
          let url='DAP/deleteNewSearch.do?userid='+cookie.get('userid');
          this.$axios.get(url).then((res)=>{
             if(res.data.code==200)
              this.nearly=[];;
          }) 
   	},
        jump(name,type){
             this.addNearly(name,type);
             if(type=='res_name'){
                    this.$router.push('/resturantdetail?name='+name+'&position='+this.$route.query.position+'&time='+this.$route.query.time);
             }else{
                    this.$router.push('/resturant?name='+name+'&type='+type+'&position='+this.$route.query.position+'&time='+this.$route.query.time);
             }
        },
        clickHotNearly(name){
              this.searchKey=name;
        },
        getNearly(){   //获取最近搜索数据
          let url='/DAP/searchWords.do?type='+cookie.get('langSet')+'&userid='+cookie.get('userid');
          this.$axios.get(url).then((res)=>{
             if(res.data.code==200)
              this.nearly=res.data.data;
          })
        },
        getHot(){
          let url='/DAP/hotWords.do?type='+cookie.get('langSet');
          this.$axios.get(url).then((res)=>{
             if(res.data.code==200)
              this.hot=res.data.data;
          })
        },
        addNearly(name,type){  //添加最近搜索记录
           let url ='/DAP/addNewSearch.do?userid='+cookie.get('userid')+'&type='+cookie.get('langSet')+'&name='+type+'&words='+encodeURIComponent(encodeURIComponent(name));
              this.$axios.get(url).then((res)=>{
                /* if(res.data.code==200)
                  console.log('添加成功');*/
              })
        },
        clearNearly(){ //清空最近搜索记录
          let url='';
          this.$axios.get(url).then((res)=>{
             if(res.data.code==200)
              this.nearly=[];
          })
        }
   },
   mounted(){
    cookie.set('userid','1')
    this.getHot();
    this.getNearly();
   }
}
</script>
<style lang="less" scoped>
#search{
  flex-direction: column;
  display:flex;
}
.error{
  color:red !important;
}
.head{
      height: 1.33333333rem;
      position: relative;
      padding:.26666667rem .26666667rem 0; 
      background: url(../../static/images/@2x/headbg@2x.png) no-repeat top left;
      background-size: 100%;
      [data-dpr='3'] &{
      	background: url(../../static/images/@3x/headbg@3x.png) no-repeat top left;
        background-size: 100%;
      }
      i{
          display: inline-block;
          height: .66666667rem;
          width: .96rem;
          position: absolute;
          left:.26666667rem/* 20px */;
          top:50%;
          margin-top:-.33333333rem/* 25px */;
          color:#fff;
          font-size: .53333333rem;
          line-height: .66666667rem;
          text-align: center;
          vertical-align: middle;
        }
        &>span{
          display: inline-block;
          height: .66666667rem;
          width: 2px;
          position: absolute;
          top:50%;
          margin-top:-.33333333rem/* 25px */;
          left:1.22666667rem/* 92px */; 
          background-color:#d4d7e0;
        }
        .search-group{
          display: inline-block;
          width: 6.13333333rem;
          height: .8rem;
          position: relative;
          margin-left: 2rem;
          line-height: .8rem;
          overflow:hidden;
          border-radius: .4rem;
          background-color:#fff;
          i{
             color: #aaa;
             position: absolute;
             left:0;
             top:50%;
             margin-top:-.33333333rem/* 25px */;
             font-size: .48rem; 
             vertical-align: middle;
          }
          input{
              position: absolute;
              left:.96rem/* 72px */;
              top:0;
              line-height: .8rem;
              letter-spacing: .06666667rem;
              color: #aaa;
          }
        }
}
.content{
    display:flex;
    flex-direction: column;
    flex-grow:1;
    padding:.26666667rem .26666667rem 0 .26666667rem;
    p{
         letter-spacing: .09333333rem;
         font-weight: 500; 
         color:#666;
    }
    .searchList{
      background: #fff;
      li{
            padding-left: .26666667rem;
            line-height: .65333333rem;
            border-bottom:1px solid #dfe1e8;
            i{
              float: right;
              font-size:  .4rem;
              color:#aaa;
            }
      }
      li:nth-child(1){
              border-top:1px solid #dfe1e8;
      }
    }
    .hot{
       margin-bottom: .26666667rem;
       padding-top:.26666667rem;
       background-color: #fff;
       i{
       	color:#fb4001;
       	font-size: .46666667rem;
       }
       .word{
           padding:.2rem .26666667rem .26666667rem 0;
           li{
            display:inline-block;
            padding:.18666667rem .33333333rem/* 25px */;
            margin:.2rem 0 0 .33333333rem/* 25px */; 
            letter-spacing: .05333333rem;
            background-color:#efefef;
           }
        }
    }
    .nearly{
       display:flex;
       flex-direction:column;
       flex-grow:1;
       background-color: #fff;
       padding:.26666667rem 0 .2rem 0; 
       .nearly-content{
           flex-grow:1;
           overflow:scroll;
       }
       i{
       	color:#666;
       	font-size: .4rem;
       }
       .word{
          padding:0 .26666667rem .26666667rem .26666667rem;
          margin-top:.2rem;
          li{
            width: 50%;
            float:left;
            padding-left: .26666667rem;
            line-height: .65333333rem;
            border-bottom:1px solid #dfe1e8;
            border-right:1px solid #dfe1e8;
          }
           li:nth-child(1), li:nth-child(2){
                border-top:1px solid #dfe1e8;
           }
          li:nth-child(2n){
            border-bottom:1px solid #dfe1e8;
            border-right: none;
          }
       }
    }
    
    .delete-wrap{
    	display: flex;
    	justify-content:center;
    }
    .delete{
      display: inline-block;
      height: .73333333rem; 
      margin:0 auto;
      padding-right:.13333333rem;
      background-color:#d3d3d3;
      letter-spacing: .06666667rem;
      line-height: .73333333rem;
      color:#a0a0a0;
      i{
      	font-size: .37333333rem;
      	margin:0 .10666667rem 0 .18666667rem;
      	vertical-align: middle;

      }
    }
}
</style>