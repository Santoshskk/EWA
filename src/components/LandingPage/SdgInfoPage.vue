<template>
  <div class="container-fluid d-flex flex-row justify-content-around m-2 mx-auto" style="width: 80%">
    <div class="card" style="width: 25vw; border: 2px solid black;">
      <img :src="this.sdgContent.goal.image" class="card-img-top" alt="sdg-img">
      <div class="card-body">
        <h5 class="card-title">{{ this.sdgContent.info.title }}</h5>
        <p class="card-text text-start">{{ this.sdgContent.info.problem }}</p>
      </div>
    </div>
    <div class="card" style="width: 25vw; border: 2px solid black;">
      <img src="@/assets/img/logos/target.png" class="card-img-top" alt="sdg-img">
      <div class="card-body">
        <h5 class="card-title">Target</h5>
        <ol>
          <li class="sdg-targets" v-for="target in this.sdgContent.info.targets" :key="target">{{ target }}</li>
        </ol>
      </div>
    </div>
    <div class="card" style="width: 25vw; border: 2px solid black;">
      <img src="@/assets/img/logos/sdg_goal.jpg" class="card-img-top" alt="sdg-img">
      <div class="card-body">
        <h5 class="card-title">Goal</h5>
        <ul>
          <li class="sdg-user-goals" v-for="pGoal in this.sdgContent.info.potentialGoals" :key="pGoal">{{ pGoal }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { SustainableDevelopmentGoal } from '@/models/SustainableDevelopmentGoal'

/**
 * Sustainable Development Goal Information Page
 * On this page, users can read in-depth information about an SDG
 */
export default {
  name: 'SdgInfoPage',
  props: ['sdg'],
  data () {
    return {
      sdgContent: SustainableDevelopmentGoal.getInfo(1)
    }
  },
  watch: {
    /**
     * watch for path update and load correct SDG content
     * @param route current route
     */
    '$route' (route) {
      const goalId = route.params.id
      this.loadData(goalId)
    }
  },
  methods: {
    /**
     * Loads additional data from an SDG by id
     * **TEMPORARY** set id=1 to prevent /sdg from crashing
     * @param id of an SDG
     */
    loadData (id) {
      if (id === undefined) id = 1
      if (id < 1 || id > 17) id = 1
      this.sdgContent = SustainableDevelopmentGoal.getInfo(id)
    }
  },
  /**
   * Once created, load data
   */
  created () {
    this.loadData(this.$route.params.id)
  }
}
</script>

<style scoped>
.sizing {
  width: 400px;
  height: auto;
}
</style>
