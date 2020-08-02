import axios from 'axios'
// import Vue from 'vue'
// import router from './router/index'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/web/api'
})


export default http