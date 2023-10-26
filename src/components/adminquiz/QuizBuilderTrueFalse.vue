<template>
    <div class="question-card justify-content-center m-auto">
        <div class="question-header">
            <div class="d-flex gap-1">
                <span class="question-number">{{ numberInArray }}</span>
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
        <textarea class="question-text" placeholder="How many of the following SDG goals have you worked on?" v-model="questionClone.question" @input="saveQuestion"></textarea>
        <div class="question-footer justify-content-center gap-5">
            <div>
                Answers:
                <select class="answer-format">
                    <option value="yes-no">Yes No</option>
                    <option value="true-false">True False</option>
                    <option value="agree-disagree">Agree Disagree</option>
                </select>
            </div>
            <div>
                SDG:
                <select class="sdg-select">
                    <option value="sdg1">SDG 1</option>
                    <option value="sdg2">SDG 2</option>
                    <!-- Add more SDG options as needed -->
                </select>
            </div>
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
</template>

<script>
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
  async setup (props, { emit }) {
    console.log(props.question)
    const questionClone = await props.question.clone()

    const deleteQuestion = () => {
      emit('deleteQuestion', props.numberInArray - 1)
    }

    const saveQuestion = () => {
      questionClone.question = event.target.value
    }

    return {
      questionClone, deleteQuestion, saveQuestion
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
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #e1e1e1;
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
}

.sample-answers {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    max-width: 200px;
}

.sample-btn {
    padding: 10px 20px;
    border: 2px solid purple;
    border-radius: 4px;
    cursor: not-allowed;
}

</style>
