import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
    //vue-cli才有process这个环境变量
    baseURL:process.env.VUE_APP_API_URL ||'/admin/api',
})

//响应拦截
http.interceptors.response.use(res => {
    if (res.data.msg) {
        Vue.prototype.$message({
            type: "success",
            message: res.data.msg
        })
    }
    return res
}, err => {
    if (err.response.data.msg) {
        Vue.prototype.$message({
            type: "error",
            message: err.response.data.msg
        })
    }
    //未登录时跳转页面到/login
    if(err.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(err)
})

//请求拦截
http.interceptors.request.use(req => {
    if(localStorage.token){
        req.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return req
},err=>{
    return err
})

export default http