<template>
  <div v-if="questionClone" class="question-card justify-content-center m-auto">
    <div class="question-header">
      <div class="d-flex gap-1">
        <span class="question-number">{{ questionClone.index }}</span>
        <button class="btn btn-primary questionArrowButton" @click="moveQuestionDown">&#8595;</button>
        <button class="btn btn-primary questionArrowButton" @click="moveQuestionUp">&#8593;</button>
      </div>
      <div>
        <button type="button" :class="{ 'disabled': hasChanged || pendingBusy }" @click="saveQuestion()"
          class="btn btn-success m-1">
          <div class="d-flex row">
            <div class="col">
              {{ saveButtonText }}
            </div>
            <div v-if="saveQuestionIsPending" class="col spinnerInButton p-0">
              <div class="spinner-border text-light spinnerInButton" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          </div>
        </button>
        <button class="questionDeleteButton" @mouseenter="deleteButtonHover = true"
          @mouseleave="deleteButtonHover = false" @click="deleteQuestion">
          <svg v-if="!deleteButtonHover" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red"
            class="bi bi-trash" viewBox="0 0 20 20">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </svg>
          <svg v-if="deleteButtonHover" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red"
            class="bi bi-trash-fill" viewBox="0 0 20 20">
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="true">
      <div class="uploadImageSpace">
        <UploadImageComponent ref="uploadImage" @image-previewed="setQuestionImgPath"
          :imagePath="questionClone.imgPath" />
      </div>
      <QuizBuilderTrueFalse v-if="questionClone instanceof YesNoQuestion" :question="questionClone" />
      <QuizBuilderMultipleChoice v-if="questionClone instanceof MultipleChoiceQuestion" :question="questionClone" />
    </div>
  </div>
</template>

<script setup>
import UploadImageComponent from '@/components/UploadImageComponent'
import YesNoQuestion from '@/models/YesNoQuestion'
import MultipleChoiceQuestion from '@/models/MultipleChoiceQuestion'
import QuizBuilderTrueFalse from './QuizBuilderTrueFalse.vue'
import QuizBuilderMultipleChoice from './QuizBuilderMultipleChoice.vue'
import { inject, watch, ref, onBeforeMount, watchEffect, computed, defineProps, defineEmits } from 'vue'
import { useToast } from 'vue-toast-notification'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['saveQuestion', 'deleteQuestion', 'moveQuestion'])

let questionService
if (props.question instanceof YesNoQuestion) {
  questionService = inject('questionTrueFalseService')
} else if (props.question instanceof MultipleChoiceQuestion) {
  questionService = inject('questionMultipleChoiceService')
}

console.log(props.question)

const questionClone = ref(null)
const sdgOptions = ref([])
const uploadImage = ref(null)
const saveQuestionIsPending = ref(false)
const saveQuestionError = ref(null)
const saveButtonText = ref('Saved')
const deleteQuestionIsPending = ref(false)
const $toast = useToast()

watch(() => props.question, async (newQuestion) => {
  questionClone.value = await newQuestion.clone()
}, { deep: true })
const cloneQuestion = async () => {
  questionClone.value = await props.question.clone()
}

onBeforeMount(async () => {
  for (let i = 1; i <= 17; i++) {
    sdgOptions.value.push(i)
  }
  await cloneQuestion()
})

const deleteQuestion = () => {
  emit('deleteQuestion', props.question.index - 1)
}

const moveQuestionUp = () => {
  emit('moveQuestion', props.question.index - 1, props.question.index - 2)
}

const moveQuestionDown = () => {
  emit('moveQuestion', props.question.index - 1, props.question.index)
}

const setQuestionImgPath = (imgPath) => {
  questionClone.value.imgPath = imgPath
}

async function callUploadImage () {
  if (uploadImage.value !== null) {
    questionClone.value.imgPath = await uploadImage.value.uploadImage()
  }
}

const saveQuestion = async () => {
  await callUploadImage()

  const { isPending, error, load } = await questionService.asyncSave(questionClone.value)

  watchEffect(() => {
    saveQuestionIsPending.value = isPending.value
    saveQuestionError.value = error.value
    if (saveQuestionIsPending.value) {
      saveButtonText.value = 'Saving'
    }
  })

  load().then(() => {
    if (saveQuestionError.value === null) {
      saveButtonText.value = 'Saved'
      emit('saveQuestion', questionClone.value)
    } else {
      $toast.error('Could not save question ' + questionClone.value.index)
    }
  })
}

const hasChanged = computed(() => { return props.question.equals(questionClone.value) && props.question.id !== null })

const pendingBusy = computed(() => { return deleteQuestionIsPending.value || saveQuestionIsPending.value })

watch(hasChanged, (newValue) => {
  if (!newValue && questionClone.value !== null) {
    saveButtonText.value = 'Save'
  } else {
    saveButtonText.value = 'Saved'
  }
})
</script>

<style></style>
