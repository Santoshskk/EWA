<template>
    <div class="container">
      <div v-if="error">
        <ErrorComponent :error="error"/>
      </div>
      <div v-else-if="isPending">
        <LoadingComponent/>
      </div>
      <div v-else>
        <section v-if="quiz != null">
          <h1>Start Creating a new quiz</h1>
          <div class="container d-flex justify-content-center">
              <div class="d-inline-flex my-4">
                  <label for="quizName" class="quizBuilderLabel col-4">Quiz Name:</label>
                  <input v-model="quiz.quizName" type="text" autocomplete="off" class="form-control col-8" id="quizName">
              </div>
          </div>
          <div v-for="(value, key) in quiz.questionObjectArray" :key="key">
                  <QuizBuilderTrueFalse class="my-2" v-if="isTrueFalseQuesetion(value)" :question="value" @deleteQuestion="deleteQuestion"/>
          </div>
          <div class="d-flex justify-content-center flexRow">
              <div class="quizBuilderQuestionType">
                  <select class="form-select " aria-label="Select a type of question" v-model="selectedQuestionType" >
                      <option value="" selected disabled>Select a type of question</option>
                      <!-- #todo autoload from available options -->
                      <option v-for="(value,key) in questionTypes" :key="key"> {{ value }}</option>
                  </select>
              </div>
              <div class="">
                  <button class="col btn btn-primary" @click="addQuestion(selectedQuestionType)">Add Question</button>
              </div>
          </div>
        </section>
      </div>
    </div>
</template>
<script>
import { ref, inject, onBeforeMount, watchEffect } from 'vue'
import QuizBuilderTrueFalse from './QuizBuilderTrueFalse.vue'
import QuizQuestionTrueFalse from '@/models/QuizQuestionTrueFalse'
import ErrorComponent from '@/components/ErrorComponent'
import LoadingComponent from '@/components/LoadingComponent'

export default {
  name: 'QuizBuilder',
  components: {
    QuizBuilderTrueFalse,
    ErrorComponent,
    LoadingComponent
  },
  setup () {
    const quizService = inject('quizService')
    const questionObjectArray = ref([])
    const questionTypes = ref(['True/false', 'MultipleChoice'])
    const selectedQuestionType = ref('')
    const load = ref(null)
    const quiz = ref(null)
    const isPending = ref(false)
    const error = ref(null)

    onBeforeMount(async () => {
      const results = await quizService.asyncFindById(1)

      load.value = results.load

      watchEffect(() => {
        quiz.value = results.entity.value
        isPending.value = results.isPending.value
        error.value = results.error.value
      })

      load.value().then(() => {
        console.log(quiz.value)
        if (error.value === 'Could not fetch the data for that resource') {
          error.value = 'Could not find quiz with id: '
        }
      })
    })

    const addQuestion = async (questoinType) => {
      questionObjectArray.value.push(
        await new QuizQuestionTrueFalse(null, null)
      )
    }

    const deleteQuestion = (index) => {
      console.log(index)
      // questionObjectArray.value.splice(index, 1)
      console.log(questionObjectArray.value)
    }

    return {
      questionObjectArray, questionTypes, addQuestion, selectedQuestionType, deleteQuestion, error, isPending, quiz
    }
  },
  methods: {
    isTrueFalseQuesetion (question) {
      return question instanceof QuizQuestionTrueFalse
    }
  }
}
</script>
<style>
.quizBuilderLabel {
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
}

.quizBuilderNameInput {

}

.quizBuilderQuestionType {
    width: 250px;
    margin-right: 30px;
}

.flexRow {
    display: flex;
    flex-direction: row;
}

template {
    min-height: 100vh;
}
</style>
