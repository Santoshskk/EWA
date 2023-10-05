<template>
    <div class="container-fluid text-center quizMain">
      <div v-if="!quizStarted" class="quizButtonSection ">
        <h1 v-show="showItemSequence[0]" class="slide-in-animation">Welcome to the SDG Quiz!</h1>
        <h3 v-show="showItemSequence[1]" class="slide-in-animation slide-in-animation-delayed m-5"> You will be asked questions about different topics </h3>
        <h3 v-show="showItemSequence[2]" class="slide-in-animation slide-in-animation-delayed m-5"> answer the questions and find out which SDG's are compatible with you!</h3>
        <button v-show="showItemSequence[3]" @click="startQuiz" type="button" class="btn btn-primary my-5 quizAnswerButton startQuizButton slide-in-animation slide-in-animation-delayed  ripple">Start quiz</button>
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
      currentQuestion: null,
      textIndex: 0,
      characterIndex: 0,
      showItemSequence: [false, false, false, false],
      quizResults: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted () {
    /**
     * This is a function that will be called every 700ms and will show the next item in the showItemSequence array
     * This is used to show the welcome text in a sequence
     * @author Marco de Boer
     */
    setInterval(() => {
      this.showItemSequence[this.textIndex] = true
      this.textIndex++
    }, 700)
  },
  methods: {
    /**
     * This function will start the quiz by setting the quizStarted variable to true and setting the currentQuestion to the first question in the quizQuestionsObjectArray
     * @author Marco de Boer
     */
    startQuiz () {
      this.quizQuestionsObjectArray = quizQuestionsJSON.quizQuestions
      this.currentQuestion = this.quizQuestionsObjectArray[this.quizIndex]
      this.quizStarted = true
    },
    /**
     *  This function will handle the question answered event from the QuizQuestionYesNoComponent and QuizQuestionMultipleChoiceComponent
     * @param {*} answers can be true or false or object of the answer if multiple choice
     * @author Marco de Boer
     */
    async handleQuestionAnswered (answers) {
      this.quizQuestionsObjectArray[this.quizIndex].givenAnswer = answers
      this.quizIndex++
      this.totalQuestionsAnswered++
      if (this.quizIndex > this.quizQuestionsObjectArray.length - 1) {
        this.quizStarted = false
        this.quizIndex = 0
        this.totalQuestionsAnswered = 0
        await this.calculateQuizResults()
      } else {
        this.currentQuestion = this.quizQuestionsObjectArray[this.quizIndex]
      }
    },
    /**
     * This function will handle the change question event from the QuizProgressBarComponent
     * @param {Number} change is either 1 or -1 to change the question index by 1 or -1
     * @author Marco de Boer
     */
    handleChangeQuestion (change) {
      this.quizIndex += change
    },
    /**
     * This function will calculate the quiz results by looping through the quizQuestionsObjectArray and adding the answers to the quizResults array
     * @author Marco de Boer
     */
    async calculateQuizResults () {
      for (const question of this.quizQuestionsObjectArray) {
        if (question.type === 'yesNoQuestion') {
          if (question.givenAnswer === true) {
            this.quizResults[question.SDG - 1] += 1
          }
        } else if (question.type === 'multipleChoiceQuestion') {
          for (const answer of question.givenAnswer) {
            this.quizResults[question.SDG[question.answers.indexOf(answer)] - 1] += 1
          }
        }
      }
      console.log(this.quizResults)
    }
  },
  /**
   * This function will be called when the user tries to leave the quiz page when they have not finished the quiz
   * @param {*} to you dont have to give these parameters, they are given by vue router
   * @param {*} from you dont have to give these parameters, they are given by vue router
   * @param {*} next you dont have to give these parameters, they are given by vue router
   * @author Marco de Boer
   */
  beforeRouteLeave (to, from, next) {
    if (this.totalQuestionsAnswered !== 0) {
      if (window.confirm('You have not finished the quiz, your progress will be lost')) {
        this.totalQuestionsAnswered = 0
        next()
      } else {
        next(false)
      }
    }
  },
  watch: {
    /**
     * This will be called when the quizIndexChanges and displays the appropriate question in the quizQuestionsObjectArray
     * @author Marco de Boer
     */
    quizIndex () {
      this.currentQuestion = this.quizQuestionsObjectArray[this.quizIndex]
    }
  }
}
</script>

<style>
.slide-in-form {
  transform: translateY(100%); /* Push the form off the bottom of the screen/container */
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
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
.slide-in-animation {
  /* Initial position -50px off the top of its original position */
  transform: translateY(50px);
  opacity: 0; /* Initial opacity set to 0 to make it invisible */

  /* Animation configuration */
  animation: slideIn 0.8s ease-out forwards; /* Name, duration, easing function, fill mode */
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 500ms ease-in-out;
}

@keyframes slideIn {
  to {
    transform: translateY(0); /* Target position */
    opacity: 1; /* Make it fully visible */
  }
}
</style>
