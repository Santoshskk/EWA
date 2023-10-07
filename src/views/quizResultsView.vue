<template>
  <h2 class="mx-0">These are your top sdgs!</h2>
  <section class="container">
    <div class="row">
      <div style="width: 400px">
        <Doughnut :data="this.data" :options="this.options"/>
      </div>
<!--      Loop to add all the sdg-results-->
      <div v-for="(sdg, index) in sdgData.slice(0, 7)" :key="index" class="col p-0">
        <sdg-card-component :sdg-data="sdg"/>
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
  },
  created () {
    if (this.$route.query.quizanswers) {
      const quizanswers = JSON.parse(decodeURIComponent(this.$route.query.quizanswers))
      console.log(quizanswers)// Output will be the original object, e.g., { key1: 'value1', key2: 'value2' }
    }
  }
}
</script>

<style scoped>

</style>
