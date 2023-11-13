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
import YesNoQuestion from '@/models/YesNoQuestion'
import MultipleChoiceQuestion from '@/models/MultipleChoiceQuestion'
export default {
  components: { NavBar, FooterComponent },
  provide () {
    return {
      quizService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/quiz', Quiz.copyBuilderConstructor),
      quizLiveService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/quiz', Quiz.copyConstructor),
      questionTrueFalseService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/question', YesNoQuestion.copyConstructor),
      questionMultipleChoiceService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/question', MultipleChoiceQuestion.copyConstructor)
    }
  }

}
</script>
