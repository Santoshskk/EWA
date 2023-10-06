<template>
    <div>
        <h1 class="questionHeader">{{ questionObject.question }}</h1>
        <div class="container">
            <div class="m-auto row " v-for="option in questionObject.optionsObjectArray" :key="option.option">
                <div class="col-12 quizButtonSection">
                    <button @click="handleOptionClicked(option)" type="button" :class="{selectedButton: option.isSelected, quizAnswerButton: !option.isSelected}" class="btn btn-primary my-5 quizMultipleChoiceButton ripple" > {{ option.option }}</button>
                </div>
            </div>
            <div class="d-flex justify-content-end"  >
              <div class="nextButtonDiv" @mouseenter="nextButtonHover = true" @mouseleave="nextButtonHover = false">
              <button id="nextButton" @click="handleQuestionAnswered()" type="button" class="btn btn-primary my-5 quizNextButton d-inline-block" :disabled="!nextIsButtonEnabled"  aria-describedby="tooltip"
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
      nextButtonHover: false
    }
  },
  methods: {
    /**
     * This is a function that will be called when the user clicks on the next button and emits the answer to the parent component
     * The answers are filtered to only the selected answers and then emitted to the parent component
     * @author Marco de Boer
     */
    async handleQuestionAnswered () {
      await this.questionObject.setGivenAnswers()
      this.$emit('questionAnswered')
    },
    async handleOptionClicked (option) {
      await option.toggleSelected()
    }
  },
  computed: {
    selectedAnswersList () {
      return this.quizAnswers.filter(answer => answer.selected)
    },
    showTooltip () {
      return !this.nextIsButtonEnabled && this.nextButtonHover
    },
    nextIsButtonEnabled () {
      return this.questionObject.optionsObjectArray.some(option => option.isSelected)
    }
  },
  /**
   * This is a lifecycle hook that will be called when the component is created and setup all the values for tooltip
   * @author Marco de Boer
   */
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
