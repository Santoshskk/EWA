<template>
    <div class="container-fluid text-center quizMain">
      <div v-if="!quizStarted" class="quizButtonSection">
        <h1 class="">Welcome to the SDG quiz where you can find out what SDG suits your goals!</h1>
        <button @click="startQuiz" type="button" class="btn btn-primary my-5 quizAnswerButton startQuizButton  ripple">Start quiz</button>
      </div>
       <!-- This is where the quiz progress bar will be displayed -->
      <!-- This is where the quiz questions will be displayed with the answers -->
      <div v-else>
        <QuizProgressBarComponent :currentQuestionIndex="this.quizIndex + 1" :totalQuestions="this.quizQuestionsObjectArray.length + 1"
        :totalQuestionsAnswered="totalQuestionsAnswered" v-on:changeQuestion="handleChangeQuestion"/>
        <div v-if="currentQuestion.type === 'yesNoQuestion'">
          <QuizQuestionYesNoComponent :questionObject="currentQuestion" v-on:questionAnswered="handleQuestionAnswered"/>
        </div>
        <div v-else>
          <QuizQuestionMultipleChoiceComponent :questionObject="currentQuestion" v-on:questionAnswered="handleQuestionAnswered"/>
        </div>
      </div>
    </div>
</template>

<script>
import QuizQuestionYesNoComponent from '@/components/quiz/QuizQuestionYesNoComponent.vue'
import QuizQuestionMultipleChoiceComponent from '@/components/quiz/QuizQuestionMultipleChoiceComponent.vue'
import quizQuestionsJSON from '@/assets/quizQuestions.json'
import QuizProgressBarComponent from './QuizProgressBarComponent.vue'

export default {
  name: 'QuizComponent',
  components: {
    QuizQuestionYesNoComponent,
    QuizQuestionMultipleChoiceComponent,
    QuizProgressBarComponent
  },
  data () {
    return {
      quizStarted: false,
      quizQuestionsObjectArray: [],
      quizIndex: 0,
      totalQuestionsAnswered: 0,
      currentQuestion: null
    }
  },
  methods: {
    startQuiz () {
      this.quizQuestionsObjectArray = quizQuestionsJSON.quizQuestions
      this.currentQuestion = this.quizQuestionsObjectArray[this.quizIndex]
      this.quizStarted = true
    },
    handleQuestionAnswered (answers) {
      this.quizQuestionsObjectArray[this.quizIndex].givenAnswer = answers
      this.quizIndex++
      this.totalQuestionsAnswered++
      if (this.quizIndex > this.quizQuestionsObjectArray.length - 1) {
        this.quizStarted = false
        this.quizIndex = 0
        this.totalQuestionsAnswered = 0
      } else {
        this.currentQuestion = this.quizQuestionsObjectArray[this.quizIndex]
      }
    },
    handleChangeQuestion (change) {
      this.quizIndex += change
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.quizIndex !== 0) {
      if (window.confirm('You have not finished the quiz, your progress will be lost')) {
        this.quizIndex = 0
        next()
      } else {
        next(false)
      }
    }
  },
  watch: {
    quizIndex () {
      this.currentQuestion = this.quizQuestionsObjectArray[this.quizIndex]
    }
  }
}
</script>

<style>
.quizMain {
  font-family: 'Inter';
  padding-top: 100px;
  height: 100vh;
}

.quizButtonSection .btn {
  border-radius: 15px !important;
}

.quizButtonSection .quizAnswerButton {
  color: #A38EE1 !important;
  background-color: transparent !important;
  border: 2px solid #A38EE1 !important;
}

.quizButtonSection .selectedButton {
    color: #fff !important;
    background-color: #A38EE1 !important;
    border: 2px solid #A38EE1 !important;
}

.quizAnswerButton:hover {
  color: #fff !important;
  background-color: #A38EE1 !important;
  border: 2px solid #A38EE1 !important;
}

.startQuizButton {
  font-size: 1.5rem;
  width: 200px;
}

.ripple {
  background-position: center;
  transition: background 0.5s;
}
.ripple:hover {
  background: #A38EE1 radial-gradient(circle, transparent 1%, #b0a0e0 1%) center/15000%;
}
.ripple:active {
  background-color: #b0a0e0;
  background-size: 100%;
  transition: background 0s;
}
</style>
