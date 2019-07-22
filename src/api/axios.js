import axios from 'axios'
import Vue from 'vue'
axios.defaults.timeout = 5000;//超时时间
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(
    config=>{
        // var token = localStorage.getItem("token");
        // config.headers.common['Authorization']='Bearer '+token;
        return config;
    }
)

axios.interceptors.response.use(
    (response)=>{
        return response;
    },
    (err)=>{
        if(err && err.response){
            switch(err.response.status){
                case 400:
                    console.log('错误请求');
                    break;
                case 401:
                    console.log('未认证')
                    break;
                case 403:
                    console.log('访问拒绝')
                    break;
                case 404:
                    console.log('未找到资源')
                    break;
                case 405:
                    console.log('请求方式不允许')
                    break;
                case 408:
                    console.log('请求超时')
                    break;
                case 500:
                    console.log('服务器出错')
                    break;
                case 501:
                    console.log('服务器出错')
                    break;
                case 502:
                    console.log('网络出错')
                    break;
                case 503:
                    console.log('服务不可用')
                    break;
                case 504:
                    console.log('网络超时')
                    break;
                default:
                    console.log('链接错误，错误信息为'+err.response.staus)
            }
        }else{
            console.log('发生未知错误，请求失败')
        }
        return Promise.resolve(err.response)
    }
)
const get = function(url,prams={}){
    return axios.get(url,{prams})
}
const post = function(url,prams={}){
    return axios.post(url,prams)
}

const myaxios = {get,post}
Vue.prototype.$http = myaxios;
export default myaxios;
