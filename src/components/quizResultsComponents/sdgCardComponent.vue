<template>
  <div class="card m-1" style="width: 18rem;">
    <img class="card-img-top" alt="..." :src="sdgData.src">
    <div class="card-body">
      <h5 class="card-title">{{sdgData.title}}</h5>
      <p class="card-text">{{sdgData.description}}</p>
      <div class="card-footer">
        <flip-button-component/>
      </div>
    </div>
  </div>
</template>

<script>
import FlipButtonComponent from '@/components/quizResultsComponents/flipButtonComponent'
export default {
  name: 'sdgCardComponent',
  components: { FlipButtonComponent },
  props: {
    sdgData: {
      type: Object,
      default: () => ({
        gifSrc: '',
        src: '',
        color: '',
        description: '',
        id: 0,
        title: ''
      })
    }
  }
}
</script>

<style scoped>

</style>
