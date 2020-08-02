<template>
  <div>
    <h1>{{id?'编辑':'新建'}}个人链接</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="model.link"></el-input>
      </el-form-item>
      <el-form-item>
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
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/crud/linkPers/${this.id}`, this.model);
      } else {
        await this.$http.post("/crud/linkPers", this.model);
      }
      this.$router.push("/link/list");
    },
    async fetch() {
      const res = await this.$http.get(`/crud/linkPers/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  }
};
</script>