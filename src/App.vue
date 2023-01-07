<script setup>
import { ref } from 'vue'
import 'dayjs/locale/zh-cn'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = ref(zhCn)
</script>
<template>
  <el-config-provider namespace="el" :locale="locale">
    <div id="app">
      <RouterView />
    </div>
  </el-config-provider>
</template>

<style lang="scss"></style>
