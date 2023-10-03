<template>
    <div class="container-fluid  text-center">
      <h5>Question: {{ currentQuestionIndex + '/' + totalQuestions }}</h5>
      <div class="row gap-1 justify-content-center">
        <button v-show="previousButtonVisible" type="button" class="removeButtonStyle col-1" @click="clickedPrevious">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
        </button>
        <div class="col-6 progressBar">
            <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{ width: barPercentage + '%' }" :aria-valuenow="barPercentage" aria-valuemin="0" :aria-valuemax="totalQuestions"></div>
            </div>
        </div>
        <button v-show="nextButtonVisible" type="button" class="btn btn-primary col-1" @click="clickedNext">Next</button>
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
    },
    nextButtonVisible: {
      type: Boolean,
      required: true
    },
    previousButtonVisible: {
      type: Boolean,
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
      this.$emit('changeQuestion', 1)
    },
    clickedPrevious () {
      this.$emit('changeQuestion', -1)
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

.indexCursor {
    border-right:  2px rgb(253, 0, 0) solid;
}
.removeButtonStyle {
    border: none;
    background-color: transparent;
    width: fit-content;
    height: fit-content;
    padding: 0;
}
</style>
