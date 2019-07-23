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

    //日历管理
    findDailyBackground:'/webapp/findDailyBackground?from=2019-06-12&to=2019-06-15',
    setDailyBackground:'/daily/setDailyBackground',
    setDailyBackgroundLike:'/daily/setDailyBackgroundLike',
    //留言管理
    addNewMessage:'/message/addNewMessage',
    //类型管理
    findMusicTypes:'/music/findMusicTypes',
    addNewMusicType:'/music/addNewMusicType',
    deleteMusicType:'/music/deleteMusicType',
    //微信端
    login:'/user/signin',
    //音频管理
    findMusic:'/webapp/findMusic',
    uploadMusic:'/music/uploadMusic',
    updateMusicInfo:'/music/updateMusicInfo',
    deleteMusic:'/music/deleteMusic'
}
Vue.prototype.$api = api;
export default{api}