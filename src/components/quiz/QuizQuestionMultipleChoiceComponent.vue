<template>
    <div>
        <h1 class="questionHeader">{{ quizQuestion }}</h1>
        <div class="container">
            <div class="m-auto row " v-for="answer in quizAnswers" :key="answer.answer">
                <div class="col-12 quizButtonSection">
                    <button @click="clickedMultipleChoiceButton(answer)" type="button" :class="{selectedButton: answer.selected}" class="btn btn-primary my-5 quizMultipleChoiceButton" > {{ answer.answer }}</button>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                    <button @click="handleQuestionAnswered()" type="button" class="btn btn-primary my-5 quizNextButton" :disabled="!nextButtonEnabled" >Next</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'QuizQuestionYesNoComponent',
  props: {
    quizQuestion: {
      type: String,
      required: true
    },
    answers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },

  setup (props) {
    if (props.answers !== null && props.answers !== undefined) {
      const quizAnswers = ref(props.answers.map(answer => {
        return {
          answer: answer,
          selected: false
        }
      }))

      const nextButtonEnabled = ref(quizAnswers.value.filter(answer => answer.selected).length > 0)

      const clickedMultipleChoiceButton = (answer) => {
        const index = quizAnswers.value.indexOf(answer)
        quizAnswers.value[index].selected = !quizAnswers.value[index].selected
        console.log(quizAnswers.value[index].selected)
        console.log(quizAnswers.value)
        checkIfNextButtonEnabled()
      }

      const checkIfNextButtonEnabled = () => {
        nextButtonEnabled.value = quizAnswers.value.filter(answer => answer.selected).length > 0
      }

      return { quizAnswers, clickedMultipleChoiceButton, nextButtonEnabled }
    }
  },

  methods: {
    handleQuestionAnswered () {
      const selectedAnswers = this.quizAnswers.filter(answer => answer.selected)
      this.$emit('questionAnswered', selectedAnswers)
    }
  },
  computed: {
    selectedAnswersList () {
      console.log(this.quizAnswers.filter(answer => answer.selected).length)
      return this.quizAnswers.filter(answer => answer.selected)
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
.quizMultipleChoiceButton {
    font-size: 1.5rem;
    width: 80%;
    margin: 20px !important
}

.quizButtonSection .selectedButton {
    color: #fff !important;
    background-color: #A38EE1 !important;
    border: 2px solid #A38EE1 !important;
}
.quizNextButton {
    font-size: 1.5rem;
    width: 200px;
    color: rgb(37, 61, 244) !important;
    border: 2px solid rgb(37, 61, 244) !important;
    background-color: transparent !important;
}
.quizNextButton:hover {
    color: #fff !important;
    background-color: rgb(37, 61, 244) !important;
    border: 2px solid rgb(37, 61, 244) !important;
}
</style>
