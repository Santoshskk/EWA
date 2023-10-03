<template>
    <div class="container-fluid  text-center">
      <h5>Question: {{ currentQuestionIndex + '/' + totalQuestions }}</h5>
      <div class="row gap-1 justify-content-center">
        <button type="button" class="btn btn-primary col-1">Previous</button>
        <div class="col-6 progressBar">
            <div class="progress">
            <div class="progress-bar" role="progressbar" :style="{ width: barPercentage + '%' }" :aria-valuenow="barPercentage" aria-valuemin="0" :aria-valuemax="totalQuestions"></div>
            </div>
        </div>
        <button type="button" class="btn btn-primary col-1">Next</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'QuizProgressBarComponent',
  props: {
    currentQuestionIndex: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      barPercentage: this.currentQuestionIndex / this.totalQuestions * 100
    }
  },
  watch: {
    currentQuestionIndex () {
      this.barPercentage = this.currentQuestionIndex / this.totalQuestions * 100
    }
  },
  methods: {
    clickedNext () {
      // this.$emit
    }
  }
}
</script>

<style>
.progressBar {
    max-width: 500px;
    vertical-align: center;
    margin-top: auto;
    margin-bottom: auto;
}

.centerElement {
    justify-content: center;
}
</style>
