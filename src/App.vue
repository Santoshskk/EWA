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
import Quiz from '@/models/Quiz'
import YesNoQuestion from '@/models/YesNoQuestion'
import MultipleChoiceQuestion from '@/models/MultipleChoiceQuestion'
import { RESTContentAdaptor } from '@/services/RESTContentAdaptor'
import { UsersAdaptor } from '@/services/users-adaptor'
import CONFIG from '@/services/app-config.js'
export default {
  components: { NavBar, FooterComponent },
  provide () {
    return {
      quizService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/quiz', Quiz.copyBuilderConstructor),
      quizLiveService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/quiz', Quiz.copyConstructor),
      questionTrueFalseService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/question', YesNoQuestion.copyConstructor),
      questionMultipleChoiceService: new RESTAdaptorWithFetch(CONFIG.BACKEND_URL + '/question', MultipleChoiceQuestion.copyConstructor),
      contentService: new RESTContentAdaptor(CONFIG.BACKEND_URL + '/page'),
      usersServices: new UsersAdaptor(CONFIG.BACKEND_URL)
    }
  },

  created () {
    // set language to english in sessionStorage, set default language to english (en-US)
    if (sessionStorage.getItem('language') === null) {
      sessionStorage.setItem('language', 'en-US')
    }
    // sessionStorage.setItem('language', 'nl-NL')
  }
}
</script>
