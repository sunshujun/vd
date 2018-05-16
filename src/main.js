// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import i18n from './international'  //中英文切换 
Vue.config.productionTip = false;
console.log(window.baseURL);
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
  template:'<App/>'
})
