import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    next()
  }else{
    var token = localStorage.getItem('token')
    if(token){
      next()
    }else{
      next({name:'login',params:{redname:to.name}})
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
