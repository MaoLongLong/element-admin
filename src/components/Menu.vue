<template>
  <el-menu
    router
    unique-opened
    :default-active="$route.path"
    mode="vertical">
    <template v-for="(route, i) in routes">
      <el-submenu v-if="route.children" :key="i" :index="route.path">
        <template slot="title">
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item v-for="(child, j) in route.children" :key="j"
                      :index="child.path">{{ child.meta.title }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :key="i" :index="route.path">
        <i :class="route.meta.icon"></i>
        <span slot="title">{{ route.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  computed: {
    routes() {
      return this.$router.options.routes[1].children;
    },
  },
};
</script>

<style lang="scss" scoped>
  .el-menu {
    user-select: none;

    .el-menu-item.is-active {
      background-color: #ecf5ff !important;
    }
  }
</style>
