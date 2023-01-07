import { ref, unref, computed, nextTick } from 'vue'
import { useDebounceFn, tryOnUnmounted, useEventListener, useTimeoutFn } from '@vueuse/core'
import echarts from '@/plugins/echarts/index.js'
/**
 * @param {*} elRef 图表渲染的视图DOM Ref
 */
export function useECharts(elRef) {
  let chartInstance = null // 图表实例
  let resizeFn = resize // 监听函数
  const cacheOptions = ref({}) // EChartsOption
  let removeResizeFn = () => {} // 移动resize 函数
  resizeFn = useDebounceFn(resize, 200)
  let legendClickFn = () => {}
  // 获取配置
  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value
    }
  })

  // 初始化图表
  function initCharts() {
    const el = unref(elRef)

    if (!el || !unref(el)) {
      // dom 判断
      return
    }
    chartInstance = echarts.init(el)
    useEventListener(window, 'resize', resizeFn)
  }

  // 设置配置
  function setOptions(options, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts()

          if (!chartInstance) return
        }

        clear && chartInstance?.clear()
        chartInstance?.setOption(unref(getOptions), true)
      }, 30)
    })
  }
  // 图表重新绘制
  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    })
  }

  // 移除监听并且销毁图表
  tryOnUnmounted(() => {
    if (!chartInstance) return
    // 移除resize事件
    // removeResizeFn()
    chartInstance?.dispose()
    chartInstance = null
  })

  // 获取当前图表的实例
  function getInstance() {
    if (!chartInstance) {
      // 如果实例不存在进行初始化
      initCharts()
    }

    return chartInstance
  }
  // legend click

  return {
    setOptions,
    resize,
    echarts,
    getInstance
  }
}
