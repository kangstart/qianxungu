import Vue from 'vue'
var api = {
    //系统管理
    signin:'/signin',
    checkDynamicCode:'/checkDynamicCode',
    // 角色列表
    findRoles:'/system/role/findRoles',
    deleteRole:'/system/role/deleteRole',
    addNewRole:'/system/role/addNewRole',
    updateRole:'/system/role/updateRole',
    //用户
    findAdmins:'/system/admin/findAdmins',
    addNewAdmin:'/system/admin/addNewAdmin',
    deleteAdmin:'/system/admin/deleteAdmin',
    //权限
    findPermission:'/system/permission/findPermission',
    addNewPermission:'/system/permission/addNewPermission',
    deletePermission:'/system/permission/deletePermission',
    //音频
    findMusic:'/webapp/findMusic',
    updateMusicInfo:'/music/updateMusicInfo',
    deleteMusic:'/music/deleteMusic',
    uploadMusic:'/music/uploadMusic',
    //类型
    findMusicTypes:'/music/findMusicTypes',
    addNewMusicType:'/music/addNewMusicType',
    deleteMusicType:'/music/deleteMusicType',
}
Vue.prototype.$api = api;
export default{api}