<template>
  <el-menu
    :collapse="collapse"
    :collapse-transition="false"
    background-color="#35495e"
    text-color="#fff"
    active-text-color="#4fc08d"
    :default-active="$route.path"
    router>
    <template v-for="(route, i) in routes">
      <el-submenu :index="route.path" :key="i" v-if="route.children">
        <template slot="title">
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item :index="child.path" :key="j"
                      v-for="(child, j) in route.children">{{ child.meta.title }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item :index="route.path" :key="i" v-else>
        <i :class="route.meta.icon"></i>
        <span slot="title">{{ route.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  props: ['collapse'],
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
      background-color: #2a3a4b !important;
    }
  }
</style>
