<template>
  <div class="crud">
    <div id="crud-header">
      <el-button
        @click="handleAdd"
        size="small"
        type="primary">
        添加
      </el-button>
      <el-input
        @change="reload()"
        placeholder="输入关键字搜索"
        prefix-icon="el-icon-search"
        style="width: 200px"
        v-model="keyword"/>
    </div>
    <el-table
      :data="tableData"
      border
      size="small"
      stripe
      style="width: 100%"
      v-loading="loading">
      <template v-for="(col, i) in options.columns">
        <el-table-column
          :key="i"
          :label="col.label"
          v-if="col.type === 'boolean'">
          <template v-slot="slotProps">
            <el-tag :type="slotProps.row.status ? 'success' : 'danger'">
              {{ slotProps.row.status ? 'YES' : 'NO' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :key="i"
          :label="col.label"
          :prop="col.prop"
          v-else>
        </el-table-column>
      </template>
      <el-table-column
        fixed="right"
        label="操作">
        <template v-slot="slotProps">
          <el-button
            @click="handleDetails(slotProps.row)"
            size="small"
            v-if="options.enableDetails">
            详细
          </el-button>
          <el-button
            @click="handleEdit(slotProps.row)"
            size="small"
            type="primary">
            编辑
          </el-button>
          <el-popconfirm
            @confirm="handleDelete(slotProps.row)"
            style="margin-left: 9px"
            title="确定删除吗？">
            <el-button size="small" slot="reference" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        :page-size.sync="pageSize"
        :current-page.sync="pageNum"
        :total="total"
        @current-change="reload"
        @size-change="reload()"
        background
        layout="sizes, prev, pager, next, jumper, ->, total"
        style="margin-top: 10px">
      </el-pagination>
    </div>
    <!-- dialog for add or edit -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-form :model="form">
        <template v-for="(col, i) in options.columns">
          <el-form-item
            :key="i"
            :label="col.label"
            v-if="!col.pk && col.type === 'number'">
            <el-input type="number" v-model.number="form[col.prop]"></el-input>
          </el-form-item>
          <el-form-item
            :key="i"
            :label="col.label"
            v-else-if="!col.pk && col.type === 'boolean'">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="form[col.prop]">
            </el-switch>
          </el-form-item>
          <el-form-item
            :key="i"
            :label="col.label"
            v-else-if="!col.pk && col.ref">
            <el-select placeholder="请选择" v-model="form[col.ref.key]">
              <el-option
                :key="j"
                :label="item[col.ref.label]"
                :value="item.id"
                v-for="(item, j) in col.ref.select">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :key="i"
            :label="col.label"
            v-else-if="!col.pk">
            <el-input v-model="form[col.prop]"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="commit" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog for details -->
    <el-dialog
      :visible.sync="detailsDialogVisible"
      title="详细信息"
      v-if="options.enableDetails"
      width="30%">
      <div>
        <p :key="i" v-for="(col, i) in options.detailsColumns">
          <strong>{{ col.label }}：</strong>{{ detailsData[col.prop] }}
        </p>
      </div>
      <span class="dialog-footer" slot="footer">
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
      pageNum: 1,
      pageSize: 10,
      keyword: '',
    };
  },
  methods: {
    handleEdit(row) {
      this.form = row;
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
      this.pageNum = pageNum;
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
