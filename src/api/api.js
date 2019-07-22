import Vue from 'vue'
var api = {
    signin:'/signin',
    checkDynamicCode:'/checkDynamicCode',
    findRole:'system/role/findRoles',
    updateRole:'/system/role/updateRole',
    findPermission:'/system/permission/findPermission',
    addNewRole:"/system/role/addNewRole",
    deleteRole:'/system/role/deleteRole',
}
Vue.prototype.$api = api;
export default{api}