<template>
  <div>
    <el-main>
      <h1>上级分类列表</h1>
      <el-table :data="parentItems">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/categories/editParent/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="primary" size="small" @click="delParent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h1>子分类列表</h1>
      <el-table :data="sonItems">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/categories/editSon/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="primary" size="small" @click="delSon(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentItems: [],
      sonItems: []
    };
  },
  methods: {
    async fetchParent() {
      const res = await this.$http.get("/crud/categoryParents");
      this.parentItems = res.data;
      console.log(res);
    },
    async fetchSon() {
      const res = await this.$http.get("/crud/categorySons");
      this.sonItems = res.data;
      console.log(res);
    },
    async delParent(row) {
      this.$confirm(`是否确定删除上级分类 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$http.delete(`/crud/categoryParents/${row._id}`);
        })
        .then(() => {
          this.fetchParent();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async delSon(row) {
      this.$confirm(`是否确定删除子分类 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$http.delete(`/crud/categorySons/${row._id}`);
        })
        .then(() => {
          this.fetchSon();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetchParent();
    this.fetchSon();
  }
};
</script>