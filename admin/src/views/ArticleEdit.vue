<template>
  <div>
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="所属上级分类">
        <el-select v-model="model.categoryParent">
          <el-option v-for="item in categoryParent" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属子分类">
        <el-select v-model="model.categorySon" multiple>
          <el-option
            v-for="item in categorySon"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <!-- useCustomImageHandler：自定义图片处理 @image-added:图片处理函数-->
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categoryParent: [],
      categorySon: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/crud/articles/${this.id}`);
      this.model = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("/crud/articles/upload", formData);
      //插入图片
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      //重置上传器
      resetUploader();
    },
    async save() {
      this.model.created_time = new Date()
      if (this.id) {
        await this.$http.put(`/crud/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("/crud/articles", this.model);
      }
      this.$router.push("/articles/list");
    },
    async fetchParent() {
      const res = await this.$http.get(`/crud/categoryParent`);
      this.categoryParent = res.data;
    },
    async fetchSon() {
      const res = await this.$http.get(`/crud/categorySon`);
      this.categorySon = res.data;
    }
  },
  created() {
    this.fetchParent()
    this.fetchSon()
    this.id && this.fetch();
  }
};
</script>
