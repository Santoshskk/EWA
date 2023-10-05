<template>
    <div>
        <h1 class="questionHeader">{{ questionObject.quizQuestion }}</h1>
        <div class="container">
            <div class=" justify-content-between answerBox m-auto row">
                <div class="col-md-6 col-12 quizButtonSection">
                    <button @click="clickedYesButton" type="button" :class="{selectedButton: yesWasSelected, quizAnswerButton: !yesWasSelected}"  class="btn btn-primary my-5 quizAnswerButton quizYesNoButton  ">Yes</button>
                </div>
                <div class="col-md-6 col-12 quizButtonSection">
                    <button @click="clickedNoButton" type="button" :class="{selectedButton: noWasSelected, quizAnswerButton: !noWasSelected}" class="btn btn-primary my-5 quizAnswerButton quizYesNoButton  ">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'QuizQuestionYesNoComponent',
  props: {
    questionObject: {
      type: Object,
      required: true
    }
  },
  /**
   * This is a function that will be called when the component is created and setup all the values
   * @param {*} props The props that are passed to this component
   * @author Marco de Boer
   */
  setup (props) {
    const yesWasSelected = ref(false)
    const noWasSelected = ref(false)

    if (props.questionObject.givenAnswer !== undefined) {
      if (props.questionObject.givenAnswer === true) {
        yesWasSelected.value = true
      } else if (props.questionObject.givenAnswer === false) {
        noWasSelected.value = true
      }
    }

    return { yesWasSelected, noWasSelected }
  },
  data () {
    return {
    }
  },
  methods: {
    clickedYesButton () {
      this.handleQuestionAnswered(true)
    },
    clickedNoButton () {
      this.handleQuestionAnswered(false)
    },
    /**
     * This is a function that will be called when the user clicks on the next button and emits the answer to the parent component
     * @param {boolean} answers is either true or false depending on the answer given by the user
     * @author Marco de Boer
     */
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
