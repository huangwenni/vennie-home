<template>
  <div>
    <el-main>
      <h1>链接收藏列表</h1>
      <el-table :data="LinkColItems">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="链接名称"></el-table-column>
        <el-table-column prop="link" label="链接"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/linkCol/edit/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="primary" size="small" @click="delCol(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h1>个人链接列表</h1>
      <el-table :data="LinkPerItems">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="链接名称"></el-table-column>
        <el-table-column prop="link" label="链接"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/linkPer/edit/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="primary" size="small" @click="delPer(scope.row)">删除</el-button>
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
      LinkColItems: [],
      LinkPerItems: []
    };
  },
  methods: {
    async fetchLinkCol() {
      const res = await this.$http.get("/crud/linkCols");
      this.LinkColItems = res.data;
    },
    async fetchLinkPer() {
      const res = await this.$http.get("/crud/linkPers");
      this.LinkPerItems = res.data;
    },
    async delCol(row) {
      this.$confirm(`是否确定删除链接收藏 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$http.delete(`/crud/linkCols/${row._id}`);
        })
        .then(() => {
          this.fetchLinkCol();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async delPer(row) {
      this.$confirm(`是否确定删除个人链接 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$http.delete(`/crud/linkPers/${row._id}`);
        })
        .then(() => {
          this.fetchLinkPer();
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
    this.fetchLinkCol();
    this.fetchLinkPer();
  }
};
</script>