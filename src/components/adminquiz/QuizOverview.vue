<template>
    <div class="minvh100">
        <div v-if="error">
            <ErrorComponent :error="error"/>
        </div>
        <div v-else-if="isPending">
            <LoadingComponent/>
        </div>
        <div v-else>
            <section v-if="quizzes != null">
                <div class="my-5">
                    <div v-if="!isBuilderRoute">
                        <h1>Quiz Overview</h1>
                        <div class="d-flex justify-content-start container my-5">
                            <ul class="quizBuilder row gap-5">
                                <li class="quizOverviewCards col">
                                    <div class="d-flex align-top m-auto quizOverviewCardContent flex-column align-items-center gap-3">
                                        <div class="quizOverViewCardContentText">Current quiz for users:</div>
                                        <div v-if="liveQuiz !== null">{{ liveQuiz.quizName }}</div>
                                        <div v-else>No quiz is live</div>
                                    </div>
                                </li>
                                <li class="quizOverviewCards col">
                                    <div class="d-flex align-top m-auto quizOverviewCardContent flex-column align-items-center gap-3">
                                        <div class="quizOverViewCardContentText">Quizzes ready to publish:</div>
                                        <select v-model="selectedQuizForLive" class="form-select ">
                                            <option value="" selected disabled>Select a quiz</option>
                                            <!-- #todo autoload from available options -->
                                            <option v-for="quiz in publishedQuizzes" :key="quiz.id" :value="quiz"> {{ quiz.quizName}}</option>
                                        </select>
                                        <button @click="setQuizLive" class="btn btn-primary" :disabled="!selectedQuizForLive">Set Live</button>
                                    </div>
                                </li>
                                <li class="quizOverviewCards col">
                                    <div class="d-flex align-top m-auto quizOverviewCardContent flex-column align-items-center gap-3">
                                        <div class="quizOverViewCardContentText">QuizBuilder</div>
                                        <select v-model="selectedQuizForBuilder" class="form-select ">
                                            <option value="" selected disabled>Select a quiz</option>
                                            <!-- #todo autoload from available options -->
                                            <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz"> {{ quiz.quizName}}</option>
                                        </select>
                                        <button @click="gotoQuizBuilder" class="btn btn-primary" :disabled="!selectedQuizForBuilder">Go to quiz</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <router-view @updateQuizzes="updateQuizzes"/>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { ref, inject, onBeforeMount, watchEffect, computed } from 'vue'
import { useRoute } from 'vue-router'
import ErrorComponent from '@/components/ErrorComponent'
import LoadingComponent from '@/components/LoadingComponent'
import router from '@/router'

export default {
  name: 'QuizOverview',
  components: {
    ErrorComponent,
    LoadingComponent
  },
  setup () {
    const quizService = inject('quizService')
    const quizzes = ref([])
    const conceptQuizzes = ref([])
    const publishedQuizzes = ref([])
    const liveQuiz = ref(null)
    const load = ref(null)
    const isPending = ref(false)
    const error = ref(null)
    const route = useRoute()
    const selectedQuizForBuilder = ref('')
    const selectedQuizForLive = ref('')

    onBeforeMount(async () => {
      const results = await quizService.asyncFindAll()

      load.value = results.load

      watchEffect(() => {
        quizzes.value = results.entities.value
        isPending.value = results.isPending.value
        error.value = results.error.value
      })

      load.value().then(() => {
        if (error.value) {
          console.log(error.value)
        }
        filterQuizzes()
      })
    })

    function filterQuizzes () {
      // Clear the existing quizzes
      conceptQuizzes.value.splice(0, conceptQuizzes.value.length)
      publishedQuizzes.value.splice(0, publishedQuizzes.value.length)

      quizzes.value.forEach(quiz => {
        if (quiz.isConcept) {
          conceptQuizzes.value.push(quiz)
        } else if (quiz.isPublished) {
          publishedQuizzes.value.push(quiz)
          if (quiz.isLive) {
            liveQuiz.value = quiz
          }
        }
      })
    }

    const updateQuizzes = () => {
      load.value().then(() => {
        selectedQuizForBuilder.value = ''
        selectedQuizForLive.value = ''
        if (error.value) {
          console.log(error.value)
        }
        filterQuizzes()
      })
    }

    const gotoQuizBuilder = () => {
      router.push({ name: 'QuizBuilder', params: { id: selectedQuizForBuilder.value.id } })
    }

    const setQuizLive = async () => {
      selectedQuizForLive.value.isLive = true
      const results = await quizService.asyncSave(selectedQuizForLive.value)

      results.load().then(() => {
        if (results.error.value) {
          return
        }
        liveQuiz.value = selectedQuizForLive.value
      })
    }

    const isBuilderRoute = computed(() => {
      return route.path.includes('/quiz/builder')
    })

    return {
      quizzes, conceptQuizzes, publishedQuizzes, liveQuiz, isPending, error, isBuilderRoute, selectedQuizForBuilder, gotoQuizBuilder, selectedQuizForLive, setQuizLive, updateQuizzes
    }
  }
}
</script>

<style>
.quizBuilder .nav-item .nav-link {
    color: #1d1d1d !important;
    font-size: 20px;
    font-weight: 600;
}

.quizBuilder .nav-item:hover .nav-link:hover {
    color: #a2a2a2 !important;
}

.quizBuilder .active {
    border-bottom: 2px solid #000000;
}

.quizBuilder {
    list-style: none;
}

.quizOverviewCards {
    width: 241px;
    height: 162px;
    flex-shrink: 0;
    background-color: #a5a5a5;
    border-radius: 10px;
    padding: 5px;
}

.quizOverviewCardContent {
    width: 100%;
    height: 100%;
    text-align: center;
    align-items: top;
    justify-content: center;
    margin: auto;
    color: white !important;
}

.minvh100 {
    min-height: 100vh;
}

</style>
