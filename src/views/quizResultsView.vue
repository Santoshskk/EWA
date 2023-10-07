<template>
  <h2 class="mx-0">These are your top sdgs!</h2>
  <section class="container">
    <div class="row">
      <div style="width: 400px">
        <Doughnut :data="data" :options="options"/>
      </div>
      <div class="col">
        <sdg-card-component/>
        <sdg-card-component/>
      </div>
      <div class="col">
        <sdg-card-component/>
        <sdg-card-component/>
      </div>
    </div>
  </section>
</template>

<script>
import SdgCardComponent from '@/components/quizResultsComponents/sdgCardComponent'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { data, options } from '@/assets/testData/testData'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'quizResultsView',
  components: {
    SdgCardComponent,
    Doughnut
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
