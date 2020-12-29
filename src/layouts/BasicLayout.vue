<template>
  <el-container id="basic-layout">
    <el-header id="header">
      <div id="logo">Classroom</div>
      <div id="user-info">
        <!--suppress HtmlUnknownTarget -->
        <el-avatar :src="avatar" id="avatar"/>
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container id="sub">
      <el-aside id="aside" width="200px">
        <Menu/>
      </el-aside>
      <el-scrollbar id="scrollbar">
        <el-main>
          <router-view/>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Menu from '../components/Menu.vue';

export default {
  name: 'BasicLayout',
  components: {
    Menu,
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('user/logout')
          .then(() => {
            this.$router.push('/login');
            this.$message.success('注销成功');
          });
      }
    },
  },
  computed: {
    ...mapGetters(['avatar', 'name']),
  },
};
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    font-size: 18px;
    cursor: pointer;
    /*color: #409EFF;*/
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  #basic-layout {
    height: 100%;

    #header {
      border-bottom: #DCDFE6 solid 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      #logo {
        font-family: "Indie Flower", sans-serif;
        font-weight: bold;
        font-size: 30px;
        user-select: none;
        display: inline-block;
      }

      #user-info {
        display: flex;
        align-items: center;

        #avatar {
          margin-right: 10px;
        }
      }
    }

    #sub {
      height: calc(100% - 60px);

      #aside {
        overflow: hidden;

        .el-menu {
          border-right: none;
        }
      }

      #scrollbar {
        height: 100%;
        width: 100%;

        /deep/ .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
    }
  }
</style>
