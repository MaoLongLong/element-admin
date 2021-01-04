<template>
  <div id="sys-user">
    <el-row :gutter="20">
      <el-col :span="6" v-for="user in users" :key="user.id">
        <el-card style="margin-bottom: 20px">
          <el-dropdown class="el-dropdown">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="card-wrapper">
            <!--suppress HtmlUnknownTarget -->
            <el-avatar class="user-avatar" :src="user.avatar" :size="100"/>
            <ul>
              <li><strong>uid:</strong> {{ user.id }}</li>
              <li><strong>用户名:</strong> {{ user.username }}</li>
              <li><strong>昵称:</strong> {{ user.nickname }}</li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList } from '../../api/user';

export default {
  name: 'User',
  data() {
    return {
      users: [],
    };
  },
  methods: {
    loadUser() {
      getList().then((resp) => {
        this.users = resp.data;
      });
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style lang="scss" scoped>
  .el-dropdown {
    float: right;

    .el-dropdown-link {
      cursor: pointer;
      color: #41b883;

      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }

  .card-wrapper {
    display: flex;
    justify-content: center;

    .user-avatar {
      margin-right: 10px;
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        margin-top: 6px;
      }
    }
  }
</style>
