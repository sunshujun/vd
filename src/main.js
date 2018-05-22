// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import i18n from './international';  //中英文切换 
import {ConfirmPlugin } from 'vux';
Vue.use(ConfirmPlugin); //注册全局弹出框组件（以插件形式调用）
Vue.config.productionTip = false;
axios.defaults.baseURL = window.baseURL;
Vue.prototype.$axios=axios;
/* eslint-disable no-new */
Vue.filter('formatNum', function (s) {    //定义一个全局的千分位分隔符过滤器
  if (!s) return s;
  if(s.toString().indexOf('-')==0){
       return '-'+s.toString().substr(1,s.toString().length-1).split("").reverse().join("").replace(/(\d{3})(?=[^$])/g, "$1,").split("").reverse().join("");
  }else{
      return s.toString().split("").reverse().join("").replace(/(\d{3})(?=[^$])/g, "$1,").split("").reverse().join("");
  }
})

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template:'<App/>',
  munted(){
    alert(123);
     let _this=this;
                          this.$vux.confirm.show({
                            title:'消息提示',
                            content:'当天数据为空，是否展示最近有数据的一天',
                            confirmText:_this.$t('sure'),
                            cancelText:_this.$t('cancel'),
                          })
  }
})
