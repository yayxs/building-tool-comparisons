import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, PictorialBarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  DatasetComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  PieChart,
  DatasetComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  PictorialBarChart
])

/**
 * @description 按需引入echarts
 * @see {@link https://echarts.apache.org/handbook/zh/basics/import#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-echarts-%E5%9B%BE%E8%A1%A8%E5%92%8C%E7%BB%84%E4%BB%B6}
 */
export function setupEcharts(app) {
  app.config.globalProperties.$echarts = echarts
}
export default echarts
