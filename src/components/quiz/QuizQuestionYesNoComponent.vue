<template>
    <div>
        <h1 class="questionHeader">{{ quizQuestion }}</h1>
        <div class="container">
            <div class=" justify-content-between answerBox m-auto row">
                <div class="col-md-6 col-12 quizButtonSection">
                    <button @click="clickedYesButton" type="button" class="btn btn-primary my-5 quizYesNoButton ">Yes</button>
                </div>
                <div class="col-md-6 col-12 quizButtonSection">
                    <button @click="clickedNoButton" type="button" class="btn btn-primary my-5 quizYesNoButton ">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'QuizQuestionYesNoComponent',
  props: {
    quizQuestion: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    clickedYesButton () {
      console.log('Yes button clicked')
      this.handleQuestionAnswered(true)
    },
    clickedNoButton () {
      console.log('No button clicked')
      this.handleQuestionAnswered(false)
    },
    handleQuestionAnswered (answers) {
      this.$emit('questionAnswered', answers)
    }
  }
}
</script>

<style>
.questionHeader {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 50px;
}

.answerBox{
    max-width: 500px;
}
.quizYesNoButton {
    font-size: 1.5rem;
    width: 200px;
}
</style>
