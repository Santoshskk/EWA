<template>
    <div class="container-fluid text-center quizMain">
      <div v-if="!quizStarted">
        <h1 class="">Welcome to the SDG quiz where you can find out what SDG suits your goals!</h1>
        <button @click="startQuiz" type="button" class="btn btn-primary my-5 startQuizButton ripple">Start quiz</button>
      </div>
       <!-- This is where the quiz progress bar will be displayed -->
      <!-- This is where the quiz questions will be displayed with the answers -->
      <div v-if="quizStarted">
        <QuizQuestionMultipleChoiceComponent :quizQuestion="quizQuestions[1].quizQuestion" :answers="quizQuestions[1].answers"/>
      </div>
    </div>
</template>

<script>
// import QuizQuestionYesNoComponent from '@/components/quiz/QuizQuestionYesNoComponent.vue'
import QuizQuestionMultipleChoiceComponent from '@/components/quiz/QuizQuestionMultipleChoiceComponent.vue'
import quizQuestions from '@/assets/quizQuestions.json'

export default {
  name: 'QuizComponent',
  components: {
    // QuizQuestionYesNoComponent,
    QuizQuestionMultipleChoiceComponent
  },
  data () {
    return {
      quizStarted: false,
      quizQuestions: quizQuestions.quizQuestions
    }
  },
  methods: {
    startQuiz () {
      this.quizStarted = true
      console.log(quizQuestions)
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

.btn {
  border-radius: 15px !important;
  color: #A38EE1 !important;
  background-color: transparent !important;
  border: 2px solid #A38EE1 !important;
}

.btn:hover {
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
