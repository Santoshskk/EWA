<template>
    <div>
        <h1 class="questionHeader">{{ questionObject.quizQuestion }}</h1>
        <div class="container">
            <div class="m-auto row " v-for="answer in quizAnswers" :key="answer.answer">
                <div class="col-12 quizButtonSection">
                    <button @click="clickedMultipleChoiceButton(answer)" type="button" :class="{selectedButton: answer.selected, quizAnswerButton: !answer.selected}" class="btn btn-primary my-5 quizMultipleChoiceButton" > {{ answer.answer }}</button>
                </div>
            </div>
            <div class="d-flex justify-content-end"  >
              <div class="nextButtonDiv" @mouseenter="nextButtonHover = true" @mouseleave="nextButtonHover = false">
              <button id="nextButton" @click="handleQuestionAnswered()" type="button" class="btn btn-primary my-5 quizNextButton d-inline-block" :disabled="!nextButtonEnabled"  aria-describedby="tooltip"
             >Next</button>
              </div>
            </div>
            <div id="tooltip" role="tooltip"  :class="{hidden: !showTooltip}">
              Select an answer
              <div id="arrow" data-popper-arrow :class="{hidden: !showTooltip}"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { createPopper } from '@popperjs/core'

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
      nextButtonHover: true
    }
  },
  /**
   * This is a function that will be called when the component is created and setup all the values
   * @param {*} props
   * @author Marco de Boer
   */
  setup (props) {
    if (props.questionObject.answers !== null && props.questionObject.answers !== undefined) {
      const quizAnswers = ref([])
      const nextButtonEnabled = ref(false)

      const clickedMultipleChoiceButton = (answer) => {
        const index = quizAnswers.value.indexOf(answer)
        quizAnswers.value[index].selected = !quizAnswers.value[index].selected
        checkIfNextButtonEnabled()
      }
      /**
       * This is a function that will be called when the user clicks on the next button and emits the answer to the parent component
       * @author Marco de Boer
       */
      const checkIfNextButtonEnabled = () => {
        nextButtonEnabled.value = quizAnswers.value.filter(answer => answer.selected).length > 0
      }
      /**
       * This is a function that will be called when the user clicks on the next button and emits the answer to the parent component
       * @author Marco de Boer
       */
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
          for (const quizAnswer of quizAnswers.value) {
            for (const givenAnswer of props.questionObject.givenAnswer) {
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
    /**
     * This is a function that will be called when the user clicks on the next button and emits the answer to the parent component
     * The answers are filtered to only the selected answers and then emitted to the parent component
     * @author Marco de Boer
     */
    handleQuestionAnswered () {
      const selectedAnswerObjects = this.quizAnswers.filter(answer => answer.selected)
      const selectedAnswers = selectedAnswerObjects.map(answer => answer.answer)

      this.$emit('questionAnswered', selectedAnswers)
    }
  },
  computed: {
    selectedAnswersList () {
      return this.quizAnswers.filter(answer => answer.selected)
    },
    showTooltip () {
      return !this.nextButtonEnabled && this.nextButtonHover
    }
  },
  mounted () {
    const buttonForPopper = document.querySelector('#nextButton')
    const tooltipForPopper = document.querySelector('#tooltip')
    createPopper(buttonForPopper, tooltipForPopper, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }
      ]
    })
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

#tooltip {
  display: inline-block;
  background: rgb(37, 61, 244);
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 4px;
}
.nextButtonDiv{
  width: fit-content;
  height: fit-content;
}

.hidden {
  visibility: hidden !important;
}

#arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: transparent;  /* No background here */
  visibility: visible;
}

#arrow::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(37, 61, 244);  /* The color you want for the arrow */
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -4px;
}
</style>
