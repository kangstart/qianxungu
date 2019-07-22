import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:'/login'},
    {path:'/login',name:'login',component:Login},
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home'),
      children:[

        {path:'permission',name:'permission',
        component:()=>import(/* webpackChunkName:'system' */ '@/components/system/permissions')},

        {path:'user',name:'user',
        component:()=>import(/* webpackChunkName:'system' */ '@/components/system/user')},
        // {path:'system',name:'system',
        // component:()=>import(/* webpackChunkName:'system' */ '@/components/system/system')},
        {path:'role',name:'role',
        component:()=>import(/* webpackChunkName:'role' */ '@/components/system/role')},
        {path:'date',name:'date',
        component:()=>import(/* webpackChunkName:'date' */ '@/components/date/date')},
        {path:'message',name:'message',
        component:()=>import(/* webpackChunkName:'message' */ '@/components/message/message')},
        {path:'type',name:'type',
        component:()=>import(/* webpackChunkName:'type' */ '@/components/type/type')},
        {path:'myvideo',name:'myvideo',
        component:()=>import(/* webpackChunkName:'myvideo' */ '@/components/myvideo/myvideo')},
        {path:'weixin',name:'weixin',
        component:()=>import(/* webpackChunkName:'weixin' */ '@/components/weixin/weixin')},
      ]
    }
  ]
})
