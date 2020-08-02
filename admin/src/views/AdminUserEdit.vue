<template>
  <div>
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="用户">
          <el-form-item label="用户名">
            <el-input v-model="model.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="用户信息">
          <el-form-item label="用户名">
            <span>{{model.userName}}</span>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="model.sex"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="model.phone"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/crud/admin_users/${this.id}`, this.model);
      } else {
        await this.$http.post("/crud/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
    },
    async fetch() {
      const res = await this.$http.get(`/crud/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>