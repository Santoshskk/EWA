<template>
  <h2 class="mx-0">These are your top sdgs!</h2>
  <section class="container">
    <div class="row">
      <div style="width: 400px">
        <Doughnut :data="data" :options="options"/>
      </div>
      <div class="col p-0">
        <sdg-card-component :sdg-data="this.sdgData[0]"/>
      </div>
      <div class="col p-0">
      <sdg-card-component :sdg-data="this.sdgData[1]"/>
      </div>
      <div class="col p-0">
        <sdg-card-component :sdg-data="this.sdgData[2]"/>
      </div>
      <div class="col p-0">
        <sdg-card-component :sdg-data="this.sdgData[3]"/>
      </div>
      <div class="col p-0">
        <sdg-card-component :sdg-data="this.sdgData[4]"/>
      </div>
      <div class="col p-0">
        <sdg-card-component :sdg-data="this.sdgData[5]"/>
      </div>
      <div class="col p-0">
        <sdg-card-component :sdg-data="this.sdgData[6]"/>
      </div>
    </div>
  </section>
</template>

<script>
import SdgCardComponent from '@/components/quizResultsComponents/sdgCardComponent'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { data, options } from '@/assets/testData/testData'
import { sdgData } from '@/assets/testData/sdgTestData'

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
      options: options,
      sdgData: sdgData
    }
  }
}
</script>

<style scoped>

</style>
