<template>
    <div class="minvh100">
        <div v-if="error">
            <ErrorComponent :error="error"/>
        </div>
        <div v-else-if="isPending">
            <LoadingComponent/>
        </div>
        <div v-else>
            <section v-if="quizzes !== null">
                <div class="my-5">
                    <div v-if="!isBuilderRoute">
                        <h1>Quiz Overview</h1>
                        <div class="d-flex justify-content-start container my-5">
                            <ul class="quizBuilder row gap-5">
                                <li class="quizOverviewCards col">
                                    <div class="d-flex align-top m-auto quizOverviewCardContent flex-column align-items-center gap-3">
                                        <div class="quizOverViewCardContentText">Current quiz for users:</div>
                                        <div class="liveQuizText" v-if="liveQuiz !== null">{{ liveQuiz.quizName }}</div>
                                        <div class="liveQuizText" v-else>No quiz is live</div>
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
                                        <button @click="setQuizLive" class="btn btn-primary" :disabled="!selectedQuizForLive || setLiveIsPending">
                                          <div class="d-flex row">
                                            <div class="col">Set Live</div>
                                            <div v-if="setLiveIsPending" class="col spinnerInButton p-0">
                                              <div class="spinner-border text-light spinnerInButton" role="status">
                                                  <span class="sr-only"></span>
                                              </div>
                                            </div>
                                          </div>
                                        </button>
                                    </div>
                                </li>
                                <li class="quizOverviewCards col">
                                    <div class="d-flex align-top m-auto quizOverviewCardContent flex-column align-items-center gap-3">
                                        <div class="quizOverViewCardContentText">Edit quiz</div>
                                        <select v-model="selectedQuizForBuilder" class="form-select ">
                                            <option value="" selected disabled>Select a quiz</option>
                                            <!-- #todo autoload from available options -->
                                            <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz"> {{ quiz.quizName}}</option>
                                        </select>
                                        <button @click="gotoQuizBuilder" class="btn btn-primary" :disabled="!selectedQuizForBuilder">
                                          Edit quiz
                                        </button>
                                    </div>
                                </li>
                                <li class="quizOverviewCards col">
                                    <div class="d-flex align-top m-auto quizOverviewCardContent flex-column align-items-center gap-3">
                                      <div class="quizOverViewCardContentText">Create Quiz</div>
                                      <button @click="createQuiz" class="btn btn-primary" :disabled="createIsPending" >
                                        <div class="d-flex row">
                                          <div class="col">Create quiz</div>
                                          <div v-if="createIsPending" class="col spinnerInButton p-0">
                                            <div class="spinner-border text-light spinnerInButton" role="status">
                                                <span class="sr-only"></span>
                                            </div>
                                          </div>
                                        </div>
                                      </button>
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
import Quiz from '@/models/Quiz'
import { useToast } from 'vue-toast-notification'

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
    const createIsPending = ref(false)
    const createError = ref(null)
    const $toast = useToast()
    const setLiveIsPending = ref(false)
    const setLiveError = ref(null)

    onBeforeMount(async () => {
      const results = await quizService.asyncFindAll()

      load.value = results.load

      watchEffect(() => {
        quizzes.value = results.entities.value
        isPending.value = results.isPending.value
        error.value = results.error.value
      })

      load.value().then(() => {
        if (error.value === null) {
          filterQuizzes()
        }
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

      watchEffect(() => {
        setLiveIsPending.value = results.isPending.value
        setLiveError.value = results.error.value
      })

      results.load().then(() => {
        if (results.error.value) {
          return
        }
        liveQuiz.value = selectedQuizForLive.value
      })
    }

    const createQuiz = async () => {
      const result = await quizService.asyncSave(new Quiz({ id: 0 }))

      watchEffect(() => {
        createIsPending.value = result.isPending.value
        createError.value = result.error.value
      })

      result.load().then(() => {
        if (result.error.value) {
          $toast.error('Unable to create quiz, please try again later')
          return
        }
        updateQuizzes()
        router.push({ name: 'QuizBuilder', params: { id: result.entity.value.id } })
      })
    }

    const isBuilderRoute = computed(() => {
      return route.path.includes('/quiz/builder')
    })

    return {
      quizzes, conceptQuizzes, publishedQuizzes, liveQuiz, isPending, error, isBuilderRoute, selectedQuizForBuilder, gotoQuizBuilder, selectedQuizForLive, setQuizLive, updateQuizzes, createQuiz, createIsPending, setLiveIsPending
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

.liveQuizText {
  color: #411C97 !important;
  font-weight: 600;
  font-size: 1.3rem;
}

.quizCardTitles {
  font-weight: 600;
  font-size: 1.3rem;
}

.quizOverviewCards {
    width: 250px;
    height: 200px;
    flex-shrink: 0;
    background-color: #C5B2F0;
    border-radius: 10px;
    padding: 5px;
}

.quizOverviewCardContent {
    width: 100%;
    height: 100%;
    text-align: center;
    align-items: top;
    margin-top: 10px;
    justify-content: center;
    margin: auto;
    color: white !important;
    font-weight: 500;
    font-size: 1.3rem;
}

.minvh100 {
    min-height: 100vh;
}

</style>
