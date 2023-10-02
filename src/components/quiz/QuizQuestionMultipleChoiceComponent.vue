<template>
    <div>
        <h1 class="questionHeader">{{ questionObject.quizQuestion }}</h1>
        <div class="container">
            <div class="m-auto row " v-for="answer in quizAnswers" :key="answer.answer">
                <div class="col-12 quizButtonSection">
                    <button @click="clickedMultipleChoiceButton(answer)" type="button" :class="{selectedButton: answer.selected, quizAnswerButton: !answer.selected}" class="btn btn-primary my-5 quizMultipleChoiceButton" > {{ answer.answer }}</button>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                    <button @click="handleQuestionAnswered()" type="button" class="btn btn-primary my-5 quizNextButton" :disabled="!nextButtonEnabled" >Next</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
  name: 'QuizQuestionYesNoComponent',
  props: {
    questionObject: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },

  setup (props) {
    if (props.questionObject.answers !== null && props.questionObject.answers !== undefined) {
      const quizAnswers = ref([])
      const nextButtonEnabled = ref(false)

      const clickedMultipleChoiceButton = (answer) => {
        const index = quizAnswers.value.indexOf(answer)
        quizAnswers.value[index].selected = !quizAnswers.value[index].selected
        checkIfNextButtonEnabled()
      }

      const checkIfNextButtonEnabled = () => {
        nextButtonEnabled.value = quizAnswers.value.filter(answer => answer.selected).length > 0
      }

      watchEffect(() => {
        if (Array.isArray(props.questionObject.answers)) {
          quizAnswers.value = props.questionObject.answers.map(answer => {
            return {
              answer: answer,
              selected: false
            }
          })
        }
        if (props.questionObject.givenAnswer !== undefined) {
          console.log('new round')
          for (const quizAnswer of quizAnswers.value) {
            for (const givenAnswer of props.questionObject.givenAnswer) {
              console.log(givenAnswer, quizAnswer.answer)
              if (quizAnswer.answer === givenAnswer) {
                quizAnswer.selected = true
                nextButtonEnabled.value = true
              }
            }
          }
        }
      })

      return { quizAnswers, clickedMultipleChoiceButton, nextButtonEnabled }
    }
  },

  methods: {
    handleQuestionAnswered () {
      const selectedAnswerObjects = this.quizAnswers.filter(answer => answer.selected)
      const selectedAnswers = selectedAnswerObjects.map(answer => answer.answer)

      this.$emit('questionAnswered', selectedAnswers)
    }
  },
  computed: {
    selectedAnswersList () {
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
