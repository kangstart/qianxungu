<template>
    <div>
       <h5>上传音频</h5>
       <div class="container">
        <div class="row">
            <div class="col-md-12">
                <form class="form-inline" role="form">
                    <div class="form-group">
                        <label class="form-label">选择文件: </label>
                        <input type="file" class="form-control" id="fileinput">
                    </div>
                    <div class="form-group">
                        <label class="form-label">选择图片: </label>
                        <input type="file" class="form-control" id="iconInput">
                    </div>
                    <div class="form-group">
                        <a id="submit" class="btn btn-xs btn-primary">SUBMIT</a>
                    </div>
                </form>
            </div>
        </div>
        <div class="row" id="process1" style="display: none">
            <div class="col-md-4">校验文件进度</div>
            <div class="col-md-8">
                <div class="progress">
                    <div id="checkProcessStyle1" class="progress-bar" style="width:0%"></div>
                    <p id="checkProcessValue1" class="value">0%</p>
                </div>
            </div>
        </div>
        <div class="row" id="process2" style="display: none">
            <div class="col-md-4">上传文件进度</div>
            <div class="col-md-8">
                <div class="progress">
                    <div id="uploadProcessStyle2" class="progress-bar" style="width:0%"></div>
                    <p id="uploadProcessValue2" class="value">0%</p>
                </div>
            </div>
        </div>
    </div>
    <el-dialog title="编辑文件" :visible.sync="centerDialogVisible" width="50%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="文件名称" prop="name">
          <el-input
            placeholder="请输入文件名称"
            v-model="ruleForm.name"
            clearable
            style="width:300px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="文件类型" prop="type">
          <el-input
            placeholder="请输入文件类型"
            v-model="ruleForm.type"
            clearable
            style="width:300px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="文件名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件类型" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(this, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
export default {
    //let baseUrl = 'http://localhost:3000'
    data() {
    return {
      tableData: [],
      centerDialogVisible: false,
      ruleForm: {},
      data: [],
      editData:{},
      rules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      }
    };
  },
    methods: {
    loadData(){
         this.$http.get(this.$api.findMusic).then(res=>{
          this.tableData = res.data.data
          console.log(res)
      })
    },
    handleEdit(a,b){
        console.log(a,b)
        this.ruleForm = {...b}
        this.centerDialogVisible=true;
    },
    handleDelete(a,b){
        console.log(a,b)
        var id = b._id
        console.log(id)
        let musicList = JSON.stringify([{ _id: id}])
        console.log(musicList)
         this.$http.post(this.$api.deleteMusic,{musicList:musicList}).then(res => {
        this.loadData();
      });
    },  
    handleOk(){
        console.log(this.ruleForm)
         this.$http.post(this.$api.updateMusicInfo, this.ruleForm).then(res => {
              this.centerDialogVisible = false;
              this.loadData();
              console.log(res);
            });
    },
    
    fn(){
    let baseUrl = 'http://localhost:3000';
    // 1m 1024kb 1kb->1024byte
    let chunkSize = 1 * 1024 * 1024 //分块大小
    let fileSize = 0 //文件大小
    let file = null //文件
    let hasUploaded = 0//是否已经上传
    let chunks = 0 //分块数
    $("body").on("click", "#submit", function(){
        let files = document.querySelector("#fileinput").files;
        if(!files.length){
            alert("当前没有选择文件");
            return false;
        }    
        file = files[0];
        fileSize = file.size;
        var musicType = '自然世界';
        startUpload(file,musicType); 
    })
    //0. 响应点击
    async function startUpload(file,musicType){
        //校验文件
        $("#process1").slideDown(200);
        //生成文件MD5
        let fileMd5Value = await md5File(file);
        console.log(fileMd5Value);
        //校验文件是否已存在
        let result = await checkFile(file.name, fileMd5Value);
        console.log("result",file);
        if(result.file){
            alert("文件已秒传成功");
            return false;
        }
        console.log("文件还没有上传",result);
        //文件上传
        $("#process2").slideDown(200);
        //检查所有分块是否都上传完毕
        await checkAndUploadChunk(fileMd5Value, result.chunkList,file.name,musicType);

    }

    //1. 文件MD5
    function md5File(file){
        return new Promise((resolve, reject) => {
            var blobSlice = File.prototype.slice || File.prototype.webkitSlice || File.prototype.mozSlice,
                chunkSize = file.size / 100,
                chunks = 100,
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                fileReader = new FileReader();
            fileReader.onload = function(e){
                spark.append(this.result);
                currentChunk++;
                if(currentChunk < chunks){
                    loadNext();
                }else{
                    resolve(spark.end());
                }
            }
            function loadNext(){
                let start = currentChunk * chunkSize,
                    end = ((start + chunkSize) >= file.size) ? file.size : (start + chunkSize);
                
                fileReader.readAsArrayBuffer(blobSlice.apply(file, [start, end]));
                $("#checkProcessStyle1").css({width: (currentChunk + 1) + '%'})
                $("#checkProcessValue1").html((currentChunk + 1) + '%');
            }

            loadNext();
        })
    }
    //2. 校验文件是否已存在
    function checkFile(fileName, fileMd5Value){
        return new Promise((resolve, reject) => {
            let url = `${baseUrl}/music/checkFile?fileName=${fileName}&fileMd5Value=${fileMd5Value}&musicType=自然世界`;
            $.get(url, data => {
                console.log("检测文件是否存在",data);
                resolve(data);
            })
        })
    }
    //3. 检查已上传分块，上传未上传分块
    async function checkAndUploadChunk(fileMd5Value, chunkList,filename,musicType){
        chunks = Math.ceil(fileSize / chunkSize);
        hasUploaded = chunkList.length;
        for(let i = 0; i < chunks; i++){
            let existChunk = chunkList.indexOf(i + "") > -1;
            //存在则不再上传
            if(!existChunk){
                await uploadChunk(i, fileMd5Value, chunks,filename,musicType);
                hasUploaded++
                //计算百分比
                let percent = Math.floor((hasUploaded / chunks) * 100) + '%';
                $("#uploadProcessStyle2").css({width: percent});
                $("#uploadProcessValue2").html(percent);
            }
        }
    }
    //4. 上传分块
    console.log(this)
     var that = this;
    function uploadChunk(i, fileMd5Value, chunks,filename,musicType){
        return new Promise((resolve, reject) => {
            let end = (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize;
            //构建一个表单
            let form = new FormData()
            form.append("vedio", file.slice(i * chunkSize, end));
            form.append("totalChunks", chunks);
            form.append("currChunk", i);
            form.append("fileMd5Value", fileMd5Value);
            form.append('filename',filename)
            form.append('musicType',musicType)
            if((i+1)==chunks){
                let iconInput = document.querySelector("#iconInput").files[0];
                form.append('iconInput',iconInput)
            }
            // let url = `${baseUrl}/music/uploadMusic`;
           console.log(form)
           
            // $.ajax({
            //     url: url,
            //     type: "post",
            //     data: form,
            //     async: true,
            //     processData: false,
            //     contentType:false,
            //     success: function(data){
            //         console.log("获取到的数据结果",data);
            //         that.loadData()
            //         resolve(data);
            //     }
            // })
            that.$http.post(that.$api.uploadMusic,form).then(res=>{
                console.log(res)
                if(res.data.success){
                    that.loadData()
                }
            })
        })
    }

    //5. 合并分块
    function mergeChunk(fileMd5Value,filename,musicType){
        let url = `${baseUrl}/music/mergeChunk?md5=${fileMd5Value}&fileName=${filename}&size=${file.size}&musicType=${musicType}`;
        $.get(url, function(data){
            alert('上传成功');
        })
    }

    $("#fileinput").on("change", function(){
        $("#checkProcessStyle1").css({width: '0%'})
        $("#checkProcessValue1").html('0%');
        $("#checkProcessStyle2").css({width: '0%'})
        $("#checkProcessValue2").html('0%');
        $("#process1").slideUp(200);
        $("#process2").slideUp(200);
    })
   
    }
  },
  mounted() {
      console.log(this)
      this.fn()
      this.loadData()
  },
}
</script>
<style lang="scss" scoped>
.container{
        width: 800px;
    }
    .progress {
        position: relative;
    }
    .progress-bar {
        transition: width .3s ease
    }
    .progress .value {
        position: absolute;
        color: #FF9800;
        left: 50%;
    }
    .row {
        border-bottom: 1px solid gray;
        padding: 10px;
    }
</style>
