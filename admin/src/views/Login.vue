<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent = "login"> 
        <el-form-item label="用户名">
          <el-input v-model = "model.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" class="center">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods:{
      async login(){
          const res = await this.$http.post('/login',this.model)
          localStorage.token = res.data.token
          localStorage.userName = this.model.userName
          this.$router.push(`/welcome`)
      }
  }
};
</script>

<style>
.login-card {
  width: 30rem;
  margin: 8rem auto;
}
.center{
  margin:0 auto;
  display: block;
}
</style>