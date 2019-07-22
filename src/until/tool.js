import Vue from 'vue'
export function toTree(permissions){
  //  console.log('permissions',permissions);
   
   let length = permissions.length;
   let obj = {}
  //  处理后的结果
  let arr = []
  for(let i=0;i<length;i++){
    let permission = permissions[i]
    if (permission) {
      if(permission.parentid == 0){
        permission.children = []
        arr.push(permission)
      }else{
        for(let j=0;j<arr.length;j++){
          let parent = arr[j];
          if(parent['_id']===permission.parentid){
            parent.children.push(permission)
          }
        }
      }
    }
    
  }
  return arr;
 }

 Vue.prototype.$tool = toTree;
export default toTree;