<template>
  <div id="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :unique-opened=isOpen>
          <el-submenu v-for="item in menuList" :index=item.index>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="childItem in item.childrenList" :index=childItem.index>{{childItem.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        isOpen: true,
        menuList:[
          {title:"系统管理",index:"1",childrenList:[
              {title:"角色管理",index:"1-1"},
              {title:"用户管理",index:"1-2"},
              {title:"权限管理",index:"1-3"}
            ]},
          {title:"日历管理",index:"2",childrenList:[
              {title:"日历",index:"2-1"}
            ]},
          {title:"留言管理",index:"3",childrenList:[
              {title:"留言管理",index:"3-1"}
            ]},
          {title:"类型管理",index:"4",childrenList:[
              {title:"音乐",index:"4-1"}
            ]},
          {title:"微信端接口",index:"5",childrenList:[
              {title:"角色管理",index:"5-1"},
              {title:"用户管理",index:"5-2"},
              {title:"权限管理",index:"5-3"}
            ]},
          {title:"音频管理",index:"6",childrenList:[
              {title:"角色管理",index:"6-1"},
              {title:"用户管理",index:"6-2"},
              {title:"权限管理",index:"6-3"}
            ]}
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="scss" scoped>
  #home{
    height: 100%;
    width: 100%;
    .el-container{
      height: 100%;
      .el-header{
        background-color: chartreuse;
      }
      .el-aside{
        background-color: coral;
        &::-webkit-scrollbar{
          display: none;
        }
          .el-col{
            height: 100%;
            width: 100%;
          }
        .el-menu-item{
          width: 100%;
          min-width: 0;
        }
      }
      .el-main{
        background-color: aqua;
      }
    }
  }
</style>

