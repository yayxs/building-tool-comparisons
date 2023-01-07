<script setup>
import { useDebounceFn } from '@vueuse/core'
const emit = defineEmits(['downLoad'])
const handleDownLoad = () => {
  emit('downLoad')
}
const debouncedFn = useDebounceFn(handleDownLoad, 40)
</script>
<template>
  <el-button plain class="my-btn" @click="debouncedFn">
    <IconifyIconOffline icon="import" />
    <slot />
  </el-button>
</template>

<style lang="scss" scoped>
.my-btn {
  border-color: var(--el-color-primary);
  background-color: var(--el-fill-color-blank);
  color: var(--el-color-primary);
}
</style>
