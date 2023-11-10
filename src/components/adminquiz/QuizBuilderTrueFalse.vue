<template>
<div v-if="questionClone">
    <div class="question-card justify-content-center m-auto">
        <div class="question-header">
            <div class="d-flex gap-1">
                <span class="question-number">{{ questionClone.index }}</span>
                <button class="btn btn-primary questionArrowButton">&#8595;</button>
                <button class="btn btn-primary questionArrowButton">&#8593;</button>
            </div>
            <!-- <div>
                Type:
                <select class="question-type">
                    <option value="true-false">True False</option>
                    <option value="multiple-choice">Multiple Choice</option>
                </select>
            </div> -->
            <div>
                <button type="button" :class="{ 'disabled' : hasChanged || pendingBusy}" @click="saveQuestion()" class="btn btn-success m-1">
                    <div class="d-flex row">
                        <div class="col">
                        Save
                        </div>
                        <div v-if="saveQuestionIsPending" class="col spinnerInButton p-0">
                            <div class="spinner-border text-light spinnerInButton" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                    </div>
                </button>
                <button class="questionDeleteButton" @mouseenter="deleteButtonHover = true" @mouseleave="deleteButtonHover = false" @click="deleteQuestion">
                    <svg v-if="!deleteButtonHover" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-trash" viewBox="0 0 20 20">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                    <svg v-if="deleteButtonHover"  xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-trash-fill" viewBox="0 0 20 20">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="d-flex row">
        <div class="col-10 my-5">
            <label class="justify-content-start h5" :for="questionClone.question">Question:</label>
            <textarea class="question-text" placeholder="How many of the following SDG goals have you worked on?" v-model="questionClone.question" ></textarea>
            <div class="question-footer justify-content-center gap-5">
                <!-- <div>
                    Answers:
                    <select class="answer-format">
                        <option value="yes-no">Yes No</option>
                        <option value="true-false">True False</option>
                        <option value="agree-disagree">Agree Disagree</option>
                    </select>
                </div> -->
            </div>
            <div class="justify-content-center m-auto">
                <div class="justify-content-between answerBox m-auto row">
                    <div class="col-md-6 col-12 quizButtonSection">
                        <button class="btn btn-primary my-5 quizAnswerButton quizYesNoButton" disabled>Yes</button>
                    </div>
                    <div class="col-md-6 col-12 quizButtonSection">
                        <button class="btn btn-primary my-5 quizAnswerButton quizYesNoButton" disabled>No</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="sdgSelecter">
                SDG:
                <div class="dropdown">
                    <div v-for="sdgOption in sdgOptions" :key="sdgOption" class="dropdown-item m-1" :class="{ 'selected': isSelected(sdgOption) }" @click="toggleSelectedSDG(sdgOption)">
                        {{ sdgOption }}
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import { ref, computed, onBeforeMount, inject, watchEffect } from 'vue'
export default {
  name: 'QuizBuilderTrueFalse',
  props: {
    question: Object,
    numberInArray: Number
  },
  data () {
    return {
      deleteButtonHover: false
    }
  },
  setup (props, { emit }) {
    const questionTrueFalseService = inject('questionTrueFalseService')
    const questionClone = ref()
    const selectedSDGOptions = ref([])
    const sdgOptions = ref([])
    const saveQuestionIsPending = ref(false)
    const saveQuestionError = ref(null)
    const deleteQuestionIsPending = ref(false)

    const cloneScooter = async () => {
      questionClone.value = await props.question.clone()
    }

    function setSelected () {
      for (const sdg of questionClone.value.SDG) {
        selectedSDGOptions.value.push('SDG ' + sdg)
      }
    }

    onBeforeMount(async () => {
      for (let i = 1; i <= 17; i++) {
        sdgOptions.value.push('SDG ' + i)
      }
      await cloneScooter()
      await setSelected()
    })

    function updateSDGs () {
      questionClone.value.SDG = []
      selectedSDGOptions.value.sort()
      for (const sdg of selectedSDGOptions.value) {
        questionClone.value.SDG.push(sdg.split(' ')[1])
      }
    }

    const toggleSelectedSDG = (sdgOption) => {
      if (isSelected(sdgOption)) {
        selectedSDGOptions.value.splice(selectedSDGOptions.value.indexOf(sdgOption), 1)
        updateSDGs()
      } else {
        selectedSDGOptions.value.push(sdgOption)
        updateSDGs()
      }
    }

    const deleteQuestion = () => {
      emit('deleteQuestion')
    }

    const saveQuestion = async () => {
      const { isPending, error, load } = await questionTrueFalseService.asyncSave(questionClone.value)

      watchEffect(() => {
        saveQuestionIsPending.value = isPending.value
        saveQuestionError.value = error.value
      })

      load.value()
    }

    const isSelected = (sdgOption) => { return selectedSDGOptions.value.includes(sdgOption) }

    const hasChanged = computed(() => { return props.question.equals(questionClone.value) })

    const pendingBusy = computed(() => { return deleteQuestionIsPending.value || saveQuestionIsPending.value })

    return {
      questionClone, deleteQuestion, sdgOptions, selectedSDGOptions, isSelected, toggleSelectedSDG, hasChanged, pendingBusy, saveQuestionIsPending, deleteQuestionIsPending, saveQuestion
    }
  }
}
</script>

<style>
.question-card {
    border: 1.5px solid black;
    border-radius: 15px;
    padding: 20px;
    max-width: 1000px;
    margin: 20px;
}

.question-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.question-number {
    font-size: 24px;
    margin-right: 10px;
    background-color: #e1e1e1;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.questionArrowButton {
    width: 30px;
    height: 35px;
    font-size: x-large;
    border-radius: 8px !important;
    padding: 0;
}

.questionDeleteButton {
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    border: none;
}

.question-type {
    color: #fff !important;
    background-color: #6D3FD9 !important;
    border: 2px solid #6D3FD9 !important;
    border-radius: 4px;
}

.question-type option {
    color: #000 !important;
    background-color: #fff;
}

.question-type:focus {
    box-shadow: none !important;
    outline: none;
}

.question-type:hover {
    background-color: #6D3FD9 !important;
    color: #fff !important;
}

.delete-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.question-text {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    height: 80px;
    border: 1px solid #7777779e;
    border-radius: 10px;
    background-color: #f3f3f3;
    resize: none;
    align-content: start;
    font-size: 20px;
}

.question-text:focus {
    outline: none;
}

.question-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.answer-format, .sdg-select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 370px;
    overflow-y: auto;
}

.sample-btn {
    padding: 10px 20px;
    border: 2px solid purple;
    border-radius: 4px;
    cursor: not-allowed;
}

.sdgSelecter .dropdown {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }

  .sdgSelecter .dropdown-item {
    padding: 5px;
    cursor: pointer;
    border-radius: 10px;

  }

  .sdgSelecter .dropdown-item:hover {
    background-color: #f0f0f0;
  }

  .sdgSelecter .selected {
    background-color: #6D3FD9;
    border-radius: 10px;
    color: white;
    margin: 0;
  }

  .sdgSelecter .selected:hover {
    background-color: #6D3FD9;
    border-radius: 10px;
    color: white;
  }

  .spinnerInButton {
    max-height: 25px;
    max-width: 25px;
    margin-right: 5px !important;
    }

</style>
