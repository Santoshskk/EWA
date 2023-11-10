<template>
  <nav-bar/>
  <router-view/>
  <FooterComponent/>
</template>

<style>

</style>

<script>
import NavBar from '@/components/NavBar/NavBar'
import FooterComponent from '@/components/FooterComponent'
import { RESTAdaptorWithFetch } from '@/services/RESTAdaptorWithFetch'
import CONFIG from '../app-config'
import Quiz from '@/models/Quiz'
import QuizQuestionTrueFalse from '@/models/QuizQuestionTrueFalse'
export default {
  components: { NavBar, FooterComponent },
  provide () {
    return {
      quizService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/quiz', Quiz.copyBuilderConstructor),
      questionTrueFalseService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/quiz', QuizQuestionTrueFalse.copyBuilderConstructor)
    }
  }

}
</script>
