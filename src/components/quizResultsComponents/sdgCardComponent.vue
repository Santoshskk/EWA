<template>
  <div class="card m-1" style="width: 18rem;">
    <img class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <flip-button-component/>
    </div>
  </div>
</template>

<script>
import FlipButtonComponent from '@/components/quizResultsComponents/flipButtonComponent'
export default {
  name: 'sdgCardComponent',
  components: { FlipButtonComponent }

}
</script>

<style scoped>

</style>
