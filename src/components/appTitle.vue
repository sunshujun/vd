<template>
  <div id="sevenTitle">
        <div class="wrapTitle">
           <ul class="resturant clearfix font24">
                <li v-for="(value,key) in titles.title"
                     :class="{'active':codeNow==titles.titleCode[key]}"
                     @click="changeTitle(key,titles.titleCode[key])"
                >
                    <span>{{value}}</span>
               </li>
           </ul> 
        </div>
        <div class="position">
                <p>
                   <span v-for="(value,key) in titles.title" :class="{'active':codeNow==titles.titleCode[key]}"></span>
                </p>
                <div class="bar" style="left:0"></div>
        </div>
  </div>
</template>
<script >
export default{
    props:{ 
     titles:{
     	default:{
            code:'',
            title: {},
            titleCode:{},
      }
     },
    },
    data(){
    	return{
                    //currentTitle:this.titles.titleNow,
                    codeNow:this.titles.code,
    	}
    }, 
    watch:{
         titles(){
           this.codeNow=this.titles.code;
         }
    },
    methods:{
    	changeTitle(key,code){
                this.codeNow=code;
    		this.$emit("changeTitle",{'key':key,'code':code});
    	}, 
    },
    mounted(){
           document.body.addEventListener('touchstart', function () {
           });
           let oTitle=document.getElementsByClassName("wrapTitle")[0]; 
           let oU=oTitle.querySelector(".resturant");
           let oBar=document.getElementsByClassName("bar")[0]; 
           let oPosition=document.getElementsByClassName("position")[0]; 
           let wrapWidth=oTitle.clientWidth;
           let inWidth=oU.clientWidth;
           oTitle.addEventListener('scroll',function(event){
                    oBar.style.left=oPosition.clientWidth*3/7*(oTitle.scrollLeft/(inWidth-wrapWidth))+'px'
           })
    }
}
</script>
<style lang="less" scoped>
    .wrapTitle{
        height: 1.06666667rem/* 80px */;
        position: relative;
        overflow-x: auto; 
        box-shadow: .06666667rem  0 .13333333rem #dbe9ee;  
       }
       .wrapTitle ::-webkit-scrollbar {
        display: none;
        }
       .position{
          height: .13333333rem/* 10px */; 
          width: 50%;
          position: relative;
          margin:0 auto .18666667rem;
          border-radius:.06666667rem/* 5px */;
          background:#fff;
          p{
            display: flex;
            height: 100%;
            position: relative;
            z-index: 2;
            justify-content:space-around; 
            span{
              display: inline-block;
              width:.13333333rem/* 10px */;
              height: .13333333rem/* 10px */;
              border-radius: .06666667rem/* 5px */;
              background:#d4d7e0;
            }
            .active{
            	width:.4rem;
            }
          }
          .bar{
            position:absolute;
            height: .13333333rem/* 10px */;
            width:57.14%;
            top:0;
            left:0;
            border-radius: .06666667rem;
            background: #2b4177;
            z-index: 1;
           }
         }
         .resturant{
             width:175%;
             display: flex;
             position: relative;
	     background: #fff; 
	     li{
	       flex-grow: 1;
	       height: .93333333rem;
                       width:0;
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
</style>