import Vue from 'vue';
import Router from 'vue-router';
import appIndex from '@/view/index';
import appFood from '@/view/food';
import appManPower from '@/view/manpower';
import appSearch from '@/view/search';
import appResturant from '@/view/resturant';
import appResturantDetail from '@/view/resturantDetail';
import appArtAndSep from '@/view/artificialAndseparation';
import appFoodDetail from '@/view/foodDetail';
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: appIndex,
      alias:'/index'
    },{
      path: '/food',
      name: 'food',
      component: appFood
    },{
      path: '/manpower',
      name: 'manpower',
      component: appManPower
    },{
      path: '/search',
      name: 'search',
      component: appSearch
    },{
      path: '/resturant',
      name: 'resturant',
      component: appResturant
    },{
      path: '/resturantdetail',
      name: 'resturantdetail',
      component: appResturantDetail
    },{
      path:'/artandsep',
      name:'artAndsep',
      component:appArtAndSep
    },{
      path:'/fooddetail',
      name:'fooddetail',
      component:appFoodDetail
    }
  ]
})
