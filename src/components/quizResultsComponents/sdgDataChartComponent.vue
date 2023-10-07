<template>
  <Radar :data="data" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'
import { data, options } from '@/assets/testData/testData.js'
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default {
  name: 'sdgDataChartComponent',
  components: {
    Radar
  },
  data () {
    return {
      data: data,
      options: options
    }
  }
}
</script>
<style scoped>

</style>
