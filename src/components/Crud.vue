<template>
  <div class="crud">
    <div id="crud-header">
      <el-button
        type="primary"
        size="small"
        @click="handleAdd">
        添加
      </el-button>
      <el-input
        prefix-icon="el-icon-search"
        v-model="keyword"
        placeholder="输入关键字搜索"
        @change="reload"
        style="width: 200px" />
    </div>
    <el-table
      :data="tableData"
      stripe
      size="small"
      border
      v-loading="loading"
      style="width: 100%">
      <template v-for="(col, i) in options.columns">
        <el-table-column
          v-if="col.type === 'boolean'"
          :key="i"
          :label="col.label">
          <template v-slot="slotProps">
            <el-tag :type="slotProps.row.status ? 'success' : 'danger'">
              {{ slotProps.row.status ? 'YES' : 'NO' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="i"
          :prop="col.prop"
          :label="col.label">
        </el-table-column>
      </template>
      <el-table-column
        fixed="right"
        label="操作">
        <template v-slot="slotProps">
          <el-button
            v-if="options.enableDetails"
            @click="handleDetails(slotProps.row)"
            size="small">
            详细
          </el-button>
          <el-button
            @click="handleEdit(slotProps.row)"
            type="primary"
            size="small">
            编辑
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(slotProps.row)"
            style="margin-left: 9px">
            <el-button slot="reference" type="danger" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        background
        layout="sizes, prev, pager, next, jumper, ->, total"
        :page-size.sync="pageSize"
        style="margin-top: 10px"
        @current-change="reload"
        @size-change="reload()"
        :total="total">
      </el-pagination>
    </div>
    <!-- dialog for add or edit -->
    <el-dialog
      :title="dialogTitle"
      width="30%"
      :visible.sync="addDialogVisible">
      <el-form :model="form">
        <template v-for="(col, i) in options.columns">
          <el-form-item
            v-if="!col.pk && col.type === 'number'"
            :key="i"
            :label="col.label">
            <el-input type="number" v-model.number="form[col.prop]"></el-input>
          </el-form-item>
          <el-form-item
            v-else-if="!col.pk && col.type === 'boolean'"
            :key="i"
            :label="col.label">
            <el-switch
              v-model="form[col.prop]"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item
            v-else-if="!col.pk && col.ref"
            :key="i"
            :label="col.label">
            <el-select v-model="form[col.ref.key]" placeholder="请选择">
              <el-option
                v-for="(item, j) in col.ref.select"
                :key="j"
                :label="item[col.ref.label]"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-else-if="!col.pk"
            :key="i"
            :label="col.label">
            <el-input v-model="form[col.prop]"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog for details -->
    <el-dialog
      v-if="options.enableDetails"
      title="详细信息"
      :visible.sync="detailsDialogVisible"
      width="30%">
      <div>
        <p v-for="(col, i) in options.detailsColumns" :key="i">
          <strong>{{ col.label }}：</strong>{{ detailsData[col.prop] }}
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Crud',
  props: ['options'],
  data() {
    return {
      dialogTitle: '',
      loading: false,
      detailsDialogVisible: false,
      addDialogVisible: false,
      detailsData: {},
      tableData: [],
      form: {},
      total: 0,
      pageSize: 10,
      keyword: '',
    };
  },
  methods: {
    handleEdit(row) {
      const form = { ...row };
      form.status = form.status === 1;
      this.form = form;
      this.dialogTitle = '编辑';
      this.addDialogVisible = true;
    },
    handleDelete(row) {
      this.options.remove({ id: row.id })
        .then((resp) => {
          const { message } = resp;
          this.$message.success(message);
          this.reload();
        });
    },
    handleDetails(row) {
      this.options.getDetails({ id: row.id })
        .then((resp) => {
          console.log(resp);
          this.detailsData = resp.data;
          this.detailsDialogVisible = true;
        });
    },
    handleAdd() {
      this.form = {};
      this.dialogTitle = '添加';
      this.addDialogVisible = true;
    },
    commit() {
      if (this.form.id) {
        this.options.update(this.form)
          .then((resp) => {
            const { message } = resp;
            this.$message.success(message);
            this.reload();
            this.addDialogVisible = false;
          });
      } else {
        this.options.add(this.form)
          .then((resp) => {
            const { message } = resp;
            this.$message.success(message);
            this.reload();
            this.addDialogVisible = false;
          });
      }
    },
    reload(pageNum = 1) {
      this.loading = true;
      this.options.getList({
        pageNum,
        pageSize: this.pageSize,
        keyword: this.keyword,
      })
        .then((resp) => {
          this.loading = false;
          const { list, total } = resp.data;
          this.tableData = list;
          this.total = total;
        });
    },
  },
  mounted() {
    this.reload();
  },
};
</script>

<style lang="scss" scoped>
  #crud-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>
