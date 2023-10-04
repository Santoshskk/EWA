<template>
  <h2 class="mx-0">These are your top sdgs!</h2>
  <section class="container mx-5">
    <div class="row">
      <sdg-card-component/>
      <sdg-card-component/>
      <sdg-card-component/>
      <sdg-card-component/>
    </div>
  </section>
</template>

<script>
import SdgCardComponent from '@/components/quizResultsComponents/sdgCardComponent'
export default {
  name: 'quizResultsView',
  components: { SdgCardComponent }
}
</script>

<style scoped>

</style>
