<template>
    <ul id="footer">
       <li
           :class="{'active':items[0].isActive}" 
           @click="jump(items[0].target,0)">
             <p><i  :class="['icon','iconfont',items[0].isActive?items[0].class[0]:items[0].class[1]]"></i></p>
             <p class='font20'>{{$t('index')}}</p>
        </li> 
        <li
           :class="{'active':items[1].isActive}" 
           @click="jump(items[1].target,1)">
             <p><i  :class="['icon','iconfont',items[1].isActive?items[1].class[0]:items[1].class[1]]"></i></p>
             <p class='font20'>{{$t('fd')}}</p>
        </li> 
        <li 
           :class="{'active':items[2].isActive}" 
           @click="jump(items[2].target,2)">
             <p><i  :class="['icon','iconfont',items[2].isActive?items[2].class[0]:items[2].class[1]]"></i></p>
             <p class='font20'>{{$t('manpower')}}</p>
        </li> 
    </ul>
</template>
<script >
import { cookie } from 'vux';
export default{
	name:'appfooter',
	data(){
		return{
			items:[{
			   target:'index',
			   isActive:true,
			   name:this.$t('index'),
			   //class:['icon-zishouye-dianjiyuan','icon-shouye-moren']
                          class:['icon-shouye-moren1','icon-shouye-1']
			},{
			   target:'food',
                           isActive:false,
			   name:this.$t('fd'),
			   //class:['icon-canyin-dianji','icon-canyin-moren']
                          class:['icon-canyin-moren1','icon-canyin-']
			},{
			   target:'manpower',
			    isActive:false,
			   name:this.$t('manpower'),
			   //class:['icon-renli-dianji','icon-renli-moren']
                          class:['icon-renli-moren1','icon-renli-']
			}]
		}
	},
	methods:{ 
		jump(target,index){
                         document.getElementsByClassName('index-content')[0].scrollTop=0; //每次切换页面，滚到屏幕顶部
                          this.$emit('jump',target); 
		}
	},
       watch:{
           $route(){
              let index=0;
              if(this.$route.fullPath.indexOf('food')>-1){
                 index=1;
              }else if(this.$route.fullPath.indexOf('manpower')>-1){
                 index=2;
              } 
             this.items.forEach(function(item){
              if(item.isActive){
                item.isActive=false;
                return false;
              }
             })
             this.items[index].isActive=!this.items[index].isActive; 
           }
       },
       mounted(){
       }
}
</script>
<style lang='less' scoped>
#footer{
	height: 1.33333333rem;
	padding:0 .34666667rem;
	display:flex;
	li{
	   display: inline-block;
                   height: 100%;
                   flex-grow: 1;
                   color:#aaa; 
                   &.active{
                   	color:#2b4177
                   }
                   p:nth-child(1){
                    height: .86666667rem/* 65px */;
                    line-height:.86666667rem/* 65px */;
                    text-align: center; 
                    i{
                         display: inline-block;
                         font-size:.66666667rem/* 50px */; 
                          vertical-align: top;
                    }
                   }
                   p:nth-child(2){
                    height: .4rem;
                    line-height: .4rem; 
                    text-align: center;
                   }
	}
	/* .active p:nth-child(1) i{ 
                          font-size:.66666667rem
                     } */
}
</style>