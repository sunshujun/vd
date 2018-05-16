<template>
  <div id="app">
    <div class="index-content" ref="indexContent">
      <keep-alive>
        <transition 
           name="slide-fade"
           enter-active-class="animated fadeInRight"
           leave-active-class="animated fadeOutLeft"
        >
          <router-view/>
        </transition> 
      </keep-alive>
    </div>
    <div>
      <app-footer @jump="jump"></app-footer>
    </div>
  </div>
</template>

<script>
import appFooter from './components/appFooter'; 
export default {
  name: 'App',
  data(){
    return{ 
    }
  },
  components:{
    'app-footer':appFooter,
  },
 methods:{
  jump(target){
     if(target=='index'){
        this.$router.push('/index') 
     }else if(target=='food'){
        this.$router.push('/food')
     }else if(target=='manpower'){
         this.$router.push('/manpower')
     } 
  }
 },
 mounted(){
   this.$router.push('/index'); 
   document.body.addEventListener('touchstart',function(event){
     event.preventDefault();
   })
 }
}
</script>

<style lang='less'>
/* 
* 页面中的字体大小设置
 */
.font14{
 font-size:20px;
}
.font16{
  font-size: 22px;
}
.font18{
  font-size: 24px;
}
.font20{
 font-size:26px;
}
.font24{
 font-size:28px;
} 
.font28{
 font-size:30px;
}
& .font30{
   font-size:32px;
  }
.font32{
 font-size:34px;
} 
.font46{
   font-size:44px;
  } 
input[type="password"], /*强行设置iphone input框字体大小，防止点击放大页面*/
input[type="text"],
select{
  font-size:32px !important;  
}

[data-dpr='3'] {
  .font14{
   font-size:28px;
  }
  .font16{
   font-size: 32px;
  }
  .font18{
   font-size: 34px;
  }
  .font20{
   font-size:40px;
  }
   .font24{
   font-size:44px;
  } 
   .font28{
   font-size:48px;
  }
  .font30{
   font-size:52px;
  }
   .font32{
   font-size:54px;
  }
  .font46{
   font-size:74px;
  }
  input[type="password"], 
  input[type="text"]
  select{
    font-size:42px !important;
  }
}
[data-dpr='1'] {
   .font14{
   font-size:10px;
  }
  .font16{
   font-size: 10px;
  }
  .font18{
   font-size: 12px;
  }
  .font20{
   font-size:12px;
  }
   .font24{
   font-size:14px;
  } 
   .font28{
   font-size:16px;
  }
   .font30{
   font-size:18px;
  }
   .font32{
   font-size:18px;
  }
  .font46{
   font-size:26px;
  }
  input[type="password"], 
  input[type="text"],
  select{
    font-size:12px !important;
  }
}
/* 
* 页面中的animate.css动画
 */
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both
}
@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight
}

@-webkit-keyframes fadeOutLeft {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }
}

@keyframes fadeOutLeft {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }
}

.fadeOutLeft {
  -webkit-animation-name: fadeOutLeft;
  animation-name: fadeOutLeft
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown
}
@-webkit-keyframes fadeOutUp {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
}

@keyframes fadeOutUp {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0)
  }
}

.fadeOutUp {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp
}

@-webkit-keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp
}

@-webkit-keyframes fadeOutDown {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

@keyframes fadeOutDown {
  0% {
    opacity: 1
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0)
  }
}

.fadeOutDown {
  -webkit-animation-name: fadeOutDown;
  animation-name: fadeOutDown
}


.clearfix:after{
  display: block;
  content: '';
  width: 0;
  height: 0;
  clear: both;
  visibility: hidden;
}
.color-red{
  color:#ff4c22 !important;
}
.color-green{
  color:#4aff24 !important;
}
#app{
 display: flex;   
 flex-direction: column;
 height: 100%;
 overflow-x: hidden;
}
.index-content{
  flex-grow: 1;
  background-color:#fafcfd;
  position: relative;
  width:200%; 
  overflow-x:hidden;
  overflow-y:auto ; 
   -webkit-overflow-scrolling : touch;
  &>div{
    width:50%;
    position: absolute;
    top:0;
    min-height:calc(100% + 5px);
  }
}

</style>
