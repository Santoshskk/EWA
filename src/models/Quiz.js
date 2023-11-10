import QuizQuestionTrueFalse from '@/models/QuizQuestionTrueFalse'
import QuizQuestionMultipleChoice from '@/models/QuizQuestionMultipleChoice'
import QuizResult from '@/models/QuizResult'

/**
 * Quiz model class.
 * @class Quiz
 * @property {String} quizName
 * @property {Array} questionObjectArray array of questions
 * @property {Number} currentQuestionIndex
 * @property {Number} totalQuestions
 * @property {Number} totalAnsweredQuestions
 * @property {Array} quizResultObjectArray array of quizResults (SDG, score)
 * @author Marco de Boer
 */

export default class Quiz {
  id
  quizName
  questionObjectArray
  currentQuestionIndex
  totalQuestions
  totalAnsweredQuestions
  quizResultObjectArray

  /**
   * For the constructor is only json needed the json needs to be in the following format:
   * {
   * "quizName": "name of the quiz",
   * "questions": []
   * }
   * @param {JSON} questionJSON
   * @author Marco de Boer
   */

  constructor (questionJSON, isInQuizBuilder = false) {
    if (questionJSON === undefined) throw new Error('JSON is undefined')

    if (questionJSON.quizName === undefined) throw new Error('quizName is undefined')

    if (questionJSON.quizQuestions === undefined) throw new Error('questions is undefined')

    this.id = questionJSON.id ? questionJSON.id : null
    this.quizName = questionJSON.quizName
    this.questionObjectArray = []
    this.#instatiateQuiz(questionJSON.quizQuestions, isInQuizBuilder).then(() => {
      this.totalQuestions = this.questionObjectArray.length
    })

    if (!isInQuizBuilder) {
      this.#instantieQuizResults()
      this.currentQuestionIndex = 0
      this.totalAnsweredQuestions = 0
    }
  }

  /**
   * This functions is used to make from each question a QuizQuestion object
   * The JSON only contains the questions from the original JSON send to the contructor
   * @param {JSON} questionJSON
   * @author Marco de Boer
   */
  async #instatiateQuiz (questionJSON, isInQuizBuilder) {
    try {
      if (questionJSON === undefined || questionJSON.length === 0) throw new Error('JSON is undefined or length is 0')

      for (const question of questionJSON) {
        if (question.type === 'multiplechoice') {
          this.questionObjectArray.push(new QuizQuestionMultipleChoice(isInQuizBuilder, question.id, question.index, question.question, question.sdg, question.options, question.answerLimit))
        } else if (question.type === 'yesno') {
          this.questionObjectArray.push(new QuizQuestionTrueFalse(isInQuizBuilder, question.id, question.index, question.question, question.sdg))
        } else throw new Error('Question type is not valid')
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * This functions is used to make from each SDG a QuizResult object
   * The score is set to 0 by default
   * @private
   * @author Marco de Boer
   */
  async #instantieQuizResults () {
    this.quizResultObjectArray = []
    for (let i = 1; i < 18; i++) {
      this.quizResultObjectArray.push(new QuizResult(i, 0))
    }
  }

  async getCurrentQuestion () {
    return this.questionObjectArray[this.currentQuestionIndex]
  }

  async getNextQuestion () {
    if (this.currentQuestionIndex >= this.questionObjectArray.length) throw new Error('Cant get Next Question, there are no more questions')

    this.currentQuestionIndex++
    return this.questionObjectArray[this.currentQuestionIndex]
  }

  async getPreviousQuestion () {
    if (this.currentQuestionIndex <= 0) throw new Error('Cant get Previous Question, there are no more questions')

    this.currentQuestionIndex--
    return this.questionObjectArray[this.currentQuestionIndex]
  }

  /**
   * This function calculates how many questions have been answered in the quiz this is used for navigation in QuizComponent
   * @returns {Number} totalAnsweredQuestions
   * @author Marco de Boer
   */
  async getTotalAnsweredQuestions () {
    this.totalAnsweredQuestions = 0
    for (const question of this.questionObjectArray) {
      if (question instanceof QuizQuestionTrueFalse && question.givenAnswer !== null) {
        this.totalAnsweredQuestions++
      } else if (question instanceof QuizQuestionMultipleChoice && question.givenAnswers.length !== 0) {
        this.totalAnsweredQuestions++
      }
    }
    return this.totalAnsweredQuestions
  }

  /**
   * This function calculates the score per SDG. It goes trough each question and checks if the givenAnswer is true and
   * sets the score of the SDG of that answer to +1
   * @returns {Array} quizResultObjectArray array of quizResults (SDG, score) this is used for the result page in QuizComponent
   * @author Marco de Boer
   */

  async setQuizResultObjectArray () {
    for (const question of this.questionObjectArray) {
      if (question instanceof QuizQuestionTrueFalse) {
        if (question.givenAnswer === true) {
          this.quizResultObjectArray[question.SDG - 1].score += 1
        }
      } else if (question instanceof QuizQuestionMultipleChoice) {
        for (let i = 0; i < question.givenAnswers.length; i++) {
          if (question.givenAnswers[i] === true) {
            this.quizResultObjectArray[question.SDG[i] - 1].score += 1
          }
        }
      }
    }
    return this.quizResultObjectArray
  }

  static copyConstructor (quizFromJson) {
    if (quizFromJson !== null && quizFromJson.length !== 0 && quizFromJson !== undefined) {
      return new Quiz(quizFromJson)
    }
    return null
  }

  static copyBuilderConstructor (quizFromJson) {
    if (quizFromJson !== null && quizFromJson.length !== 0 && quizFromJson !== undefined) {
      return new Quiz(quizFromJson, true)
    }
    return null
  }
}
