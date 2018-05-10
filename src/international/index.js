import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {cookie} from 'vux'
Vue.use(VueI18n)
 let lang='';
 if(window.langgroup){
     lang = window.langgroup;
     cookie.set('langSet', lang);
 }else{
      lang = (navigator.systemLanguage?navigator.systemLanguage:navigator.language);
      cookie.get('langSet', function(s) {
          if(s){
            lang=s;
          }else{
              lang = lang.substr(0, 2);//获取lang字符串的前两位
      　　lang=(lang == 'zh'?'cn':'en'); 
              cookie.set('langSet', lang);
          }
      } )
 } 
export default new VueI18n({
    locale: lang,    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'cn': require('../assets/lang/zn'),   // 中文语言包
      'en': require('../assets/lang/en')    // 英文语言包
    }
})