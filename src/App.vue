<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  html, body {
    height: 100%;
  }

  #app {
    height: 100%;
  }

  #nprogress .bar {
    background: #41b883 !important; //自定义颜色
  }
</style>
