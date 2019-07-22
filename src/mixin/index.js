import Vue from 'vue'
Vue.mixin({
    methods: {
        post(action, message) {
            return this.$confirm(`您确定要${message}吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                action().then((resp) => {
                    console.log("删除结果", resp);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        toTree(data) {
            var length = data.length;
            var arr = []
            for (var i = 0; i < length; i++) {
                if (data[i].parentid == 0) {
                    arr.push(data[i])
                    data[i].children = []
                }
                else {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j]._id == data[i].parentid) {
                            arr[j].children.push(data[i])
                        }
                    }
                }
            }
            return arr
        }
    }
})