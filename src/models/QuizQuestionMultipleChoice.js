import QuizQuestion from './QuizQuestion'
import QuizQuestionMultipleChoiceOption from './QuizQuestionMultipleChoiceOption'

/**
 * QuizQuestionMultipleChoice model class.
 * @class QuizQuestionMultipleChoice
 * @extends QuizQuestion
 * @property {Array} optionsObjectArray array of options (possible answers) for the question
 * @property {Array} givenAnswers array of booleans
 * @property {Number} answerLimit number of answers that can be given (default is the amount of options)
 * @author Marco de Boer
 */

export default class QuizQuestionMultipleChoice extends QuizQuestion {
  optionsObjectArray
  givenAnswers
  answerLimit

  /**
   * This class is for questions that have more than 2 options as answers
   * @param {String} question
   * @param {Array} SDG array of numbers
   * @param {Array} options array of strings
   * @param {Number} answerLimit number of answers that can be given (default is the amount of options)
   */

  constructor (question, SDG, options, answerLimit = 0) {
    if (options === undefined || options.length === 0) throw new Error('options is undefined or length is 0' + options)
    if (answerLimit > options.length) throw new Error('answerLimit is bigger than the amount of options')
    super(question, SDG)
    this.#initializeOptions(options)
    this.givenAnswers = []
    if (answerLimit === 0) {
      this.answerLimit = options.length
    } else {
      this.answerLimit = answerLimit
    }
  }

  /**
   * This functions is used to make from each option a QuizQuestionMultipleChoiceOption object
   * this object contains the option and a boolean that says if it is selected or not
   * @private
   * @param {Array} options
   * @author Marco de Boer
   */

  #initializeOptions (options) {
    this.optionsObjectArray = []
    for (const option of options) {
      if (option === null) throw new Error('option is null')
      this.optionsObjectArray.push(new QuizQuestionMultipleChoiceOption(option, false))
    }
  }

  /**
   * This functions sets the givenAnswers by checking for each optionObject if isSelected is true
   * The total amount of givenAnswers is equal to the total amount of options so if an option is not selected it is false
   * @author Marco de Boer
   */
  async setGivenAnswers () {
    for (let i = 0; i < this.optionsObjectArray.length; i++) {
      if (this.optionsObjectArray[i].isSelected) {
        this.givenAnswers[i] = true
      } else {
        this.givenAnswers[i] = false
      }
    }
  }

  /**
   * This function get the amount of selected answers this can be used to know if the answerLimit is reached
   * @returns {Number} amount of selected answers
   * @author Marco de Boer
   */
  async getSelectedAnswersAmount () {
    let counter = 0
    for (const option of this.optionsObjectArray) {
      if (option.isSelected) {
        counter++
      }
    }
    return counter
  }
}
