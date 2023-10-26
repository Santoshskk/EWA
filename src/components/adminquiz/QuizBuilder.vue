<template>
    <div class="container">
        <h1>Start Creating a new quiz</h1>
        <div class="container d-flex justify-content-center">
            <div class="d-inline-flex my-4">
                <label for="quizName" class="quizBuilderLabel col-4">Quiz Name:</label>
                <input type="text" autocomplete="off" class="form-control col-8" id="quizName">
            </div>
        </div>
        <div v-for="(value, key) in questionObjectArray" :key="key">
            <Suspense>
                <QuizBuilderTrueFalse class="my-2" v-if="isTrueFalseQuesetion(value)" :question="value" :numberInArray="key + 1" @deleteQuestion="deleteQuestion"/>
            </Suspense>
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
    </div>
</template>
<script>
import { ref } from 'vue'
import QuizBuilderTrueFalse from './QuizBuilderTrueFalse.vue'
import QuizQuestionTrueFalse from '@/models/QuizQuestionTrueFalse'

export default {
  name: 'QuizBuilder',
  components: {
    QuizBuilderTrueFalse
  },
  setup () {
    const questionObjectArray = ref([])
    const questionTypes = ref(['True/false', 'MultipleChoice'])
    const selectedQuestionType = ref('')

    const addQuestion = async (questoinType) => {
      questionObjectArray.value.push(
        await new QuizQuestionTrueFalse(null, null)
      )

      console.log(questionObjectArray.value)
    }

    const deleteQuestion = (index) => {
      questionObjectArray.value.splice(index, 1)
    }

    return {
      questionObjectArray, questionTypes, addQuestion, selectedQuestionType, deleteQuestion
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
</style>
