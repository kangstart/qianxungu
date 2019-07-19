import Vue from 'vue'
var api = {
    signin:'/signin',
    checkDynamicCode:'/checkDynamicCode'
}
Vue.prototype.$api = api;
export default{api}