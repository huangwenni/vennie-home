<template>
  <div>
    <h1>{{id?'编辑':'新建'}}子分类</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model = "model.parent" >
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        await this.$http.put(`/crud/categorySons/${this.id}`, this.model);
      } else {
        await this.$http.post("/crud/categorySons", this.model);
      }
      this.$router.push("/categories/list");
    },
    async fetch() {
      const res = await this.$http.get(`/crud/categorySons/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get("/crud/categoryParents");
      this.parents = res.data
    }
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  }
};
</script>