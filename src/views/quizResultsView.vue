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
import { options } from '@/assets/testData/testData'
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
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          }
        ]
      },
      options: options,
      sdgData: sdgData
    }
  },
  created () {
    if (this.$route.query.quizanswers) {
      const quizanswers = JSON.parse(decodeURIComponent(this.$route.query.quizanswers))
      // sort the scores
      quizanswers.sort((a, b) => {
        // If scores are the same SDG is leading.
        if (b.score === a.score) {
          return a.SDG - b.SDG
        }
        return b.score - a.score
      })
      // Top 7 scores.
      const top7 = quizanswers.slice(0, 7)
      const scores = top7.map(item => item.score)
      // Get the corresponding labels and colors through the ID.
      const names = []
      const sdgColors = []
      for (let i = 0; i < top7.length; i++) {
        names.push(sdgData.find(sdg => sdg.id === top7[i].SDG).title)
        sdgColors.push(sdgData.find(sdg => sdg.id === top7[i].SDG).color)
      }
      console.log(sdgColors)
      // Give the data to the graph and labels.
      this.data.labels = names
      console.log(this.data.datasets)
      const dataset = [{
        backgroundColor: sdgColors,
        data: scores
      }]
      this.data.datasets = dataset
      // Give data to card elements
    }
  }
}
</script>

<style scoped>

</style>
