<template>
    <div class="container-fluid text-center quizMain" @click="skipAnimation">
      <div v-if="!quizStarted && !quizEnded" class="quizButtonSection ">
        <h1 v-show="showItemSequence[0]" class="slide-in-animation">Welcome to the SDG Quiz!</h1>
        <h3 v-show="showItemSequence[1]" class="slide-in-animation slide-in-animation-delayed m-5"> You will be asked questions about different topics </h3>
        <h3 v-show="showItemSequence[2]" class="slide-in-animation slide-in-animation-delayed m-5"> answer the questions and find out which SDG's are compatible with you!</h3>
        <button v-show="showItemSequence[3]" @click="startQuiz" type="button" class="btn btn-primary my-5 quizAnswerButton startQuizButton slide-in-animation slide-in-animation-delayed  ripple">Start quiz</button>
      </div>
       <!-- This is where the quiz progress bar will be displayed -->
      <!-- This is where the quiz questions will be displayed with the answers -->
      <div v-else-if="quizStarted && !quizEnded">
        <QuizProgressBarComponent :currentQuestionIndex="this.quizIndex + 1" :totalQuestions="this.quiz.totalQuestions"
        :totalQuestionsAnswered="totalQuestionsAnswered" v-on:changeQuestion="handleChangeQuestion"/>
        <div v-if="(isCurrentQuestionYesNo)">
          <QuizQuestionYesNoComponent :questionObject="currentQuestion" v-on:questionAnswered="handleQuestionAnswered"/>
        </div>
        <div v-else>
          <QuizQuestionMultipleChoiceComponent :questionObject="currentQuestion" v-on:questionAnswered="handleQuestionAnswered"/>
        </div>
      </div>
      <div v-else-if="!quizStarted && quizEnded" class="slide-in-animation">
        <h1 class="my-4">Quiz ended!</h1>
        <div class="row  maxWidth800 m-auto justify-content-center my-5">
          <h2 class="col-6">Calculating results...</h2>
          <div class="spinner-border spinnerColor " role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import QuizQuestionYesNoComponent from '@/components/quiz/QuizQuestionYesNoComponent.vue'
import QuizQuestionMultipleChoiceComponent from '@/components/quiz/QuizQuestionMultipleChoiceComponent.vue'
import quizQuestionsJSON from '@/assets/quizQuestions.json'
import QuizProgressBarComponent from './QuizProgressBarComponent.vue'
import Quiz from '@/models/Quiz.js'
import QuizQuestionTrueFalse from '@/models/QuizQuestionTrueFalse.js'

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
      quizEnded: false,
      quizIndex: 0,
      totalQuestionsAnswered: 0,
      currentQuestion: null,
      textIndex: 0,
      characterIndex: 0,
      showItemSequence: [false, false, false, false]
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
     * This function will start the quiz and set the quizStarted to true and the quizEnded to false
     * it will also create a new quiz object and set the currentQuestion to the first question in the quizQuestionsObjectArray
     * @author Marco de Boer
     */
    async startQuiz () {
      try {
        this.quiz = await new Quiz(quizQuestionsJSON)
        this.currentQuestion = await this.quiz.getCurrentQuestion()
        this.quizStarted = true
        this.quizEnded = false
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * This function will handle the question answered event from the QuizQuestionYesNoComponent and QuizQuestionMultipleChoiceComponent
     * It will check if the quiz is ended and if it is it will set the quizEnded to true and the quizStarted to false
     * It will also get the next question from the quiz and set the currentQuestion to the next question
     * if the quiz ended it will calculate the results
     * @author Marco de Boer
     */
    async handleQuestionAnswered () {
      try {
        if (this.quizIndex + 1 === this.quiz.totalQuestions) {
          this.quizStarted = false
          this.quizEnded = true
        }
        this.currentQuestion = await this.quiz.getNextQuestion()
        this.totalQuestionsAnswered = await this.quiz.getTotalAnsweredQuestions()
        if (this.quizEnded) {
          const quizanswers = await this.quiz.setQuizResultObjectArray()
          console.log(quizanswers)
          // #TODO do something here to redirect to results page
        }
      } catch (error) {
        console.error(error)
      }
    },
    skipAnimation () {
      this.showItemSequence = [true, true, true, true]
    },
    /**
     * This function will handle the change question event from the QuizProgressBarComponent
     * @param {Number} change is either 1 or -1 to change to next or previous question
     * @author Marco de Boer
     */
    async handleChangeQuestion (change) {
      try {
        if (change === 1) {
          this.currentQuestion = await this.quiz.getNextQuestion()
        } else {
          this.currentQuestion = await this.quiz.getPreviousQuestion()
        }
      } catch (error) {
        console.error(error)
      }
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
  computed: {
    isCurrentQuestionYesNo () {
      return this.currentQuestion instanceof QuizQuestionTrueFalse
    }
  },
  watch: {
    /**
     * This will be called when the quizIndexChanges and displays the appropriate question in the quizQuestionsObjectArray
     * @author Marco de Boer
     */

    currentQuestion () {
      this.quizIndex = this.quiz.currentQuestionIndex
      this.questionAnswered = this.quiz.totalAnsweredQuestions
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
  padding-top: 30px;
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

.quizButtonSection .selectedButton:hover {
  background-color: #8C7ACD !important;
}

.quizAnswerButton:hover {
  color: #fff !important;
  background-color: #C0B2E8 !important;
  border: 2px solid #A38EE1 !important;
}

.startQuizButton {
  font-size: 1.5rem;
  width: 200px;
}
.spinnerColor {
  color: #A38EE1;
}
.maxWidth800 {
  max-width: 800px;
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
