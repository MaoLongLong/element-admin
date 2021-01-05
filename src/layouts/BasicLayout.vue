<template>
  <el-container id="basic-layout">
    <el-aside id="aside" :style="{
      minWidth: collapse ? 'unset' : '200px',
      width: 'auto',
    }">
      <div id="logo" v-show="!collapse">
        Classroom
      </div>
      <Menu :collapse="collapse"/>
    </el-aside>
    <el-container id="sub">
      <el-header id="header">
        <div id="trigger" @click="collapse = !collapse">
          <i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
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
      <el-scrollbar id="scrollbar">
        <el-backtop target=".el-scrollbar__wrap">
          <div
            style="{
              height: 100%;
              width: 100%;
              background-color: #ecf8f3;
              box-shadow: 0 0 6px rgba(0,0,0, .12);
              text-align: center;
              line-height: 40px;
              color: #41b883;
            }"
          >
            UP
          </div>
        </el-backtop>
        <el-main class="main-container">
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
  data() {
    return {
      collapse: false,
    };
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

    #aside {
      background-color: #35495e;
      overflow: hidden;

      #logo {
        margin: 12px 0;
        font-size: 30px;
        font-weight: bold;
        user-select: none;
        font-family: "Indie Flower", sans-serif;
        /*color: #303133;*/
        color: #fff;
        text-align: center;
      }

      .el-menu {
        border-right: none;
      }
    }

    #sub {
      height: 100%;

      #header {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dee1e6;

        #trigger {
          font-size: 28px;
          cursor: pointer;
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

      #scrollbar {
        height: calc(100% - 60px);
        width: 100%;

        /deep/ .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
    }
  }
</style>
