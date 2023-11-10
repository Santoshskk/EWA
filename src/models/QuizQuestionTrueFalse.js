import QuizQuestion from './QuizQuestion'

/**
 * QuizQuestionTrueFalse model class.
 * @class QuizQuestionTrueFalse
 * @extends QuizQuestion
 * @property {Boolean} givenAnswer
 * @author Marco de Boer
 */

export default class QuizQuestoinTrueFalse extends QuizQuestion {
  givenAnswer

  /**
   * This class is for questions that only have 2 options as answers
   * @param {String} question
   * @param {Number} SDG
   */
  constructor (isInQuizBuilder, id = null, index, question = null, SDGJSON = null) {
    super(isInQuizBuilder, id, index, question, SDGJSON)
    this.givenAnswer = null
  }

  /**
   * This functions sets the givenAnswer
   * @param {boolean} answer
   * @author Marco de Boer
   */

  setGivenAnswer (answer) {
    if (answer === undefined) throw new Error('answer is undefined')
    if (answer !== Boolean(answer)) throw new Error('answer is not a boolean')

    this.givenAnswer = answer
  }

  async clone () {
    if (this.SDG === undefined) {
      this.SDG = []
    }
    const clone = new QuizQuestoinTrueFalse(true, this.id, this.index, this.question, this.SDG)
    clone.givenAnswer = this.givenAnswer
    return clone
  }

  equals (other) {
    if (super.equals(other) === false) return false
    return true
  }

  static copyConstructor (questionFromJson) {
    if (questionFromJson !== null && questionFromJson && questionFromJson !== undefined) {
      return new QuizQuestoinTrueFalse(false, questionFromJson.id, questionFromJson.index, questionFromJson.question, questionFromJson.SDG)
    }
    return null
  }

  static copyBuilderConstructor (questionFromJson) {
    if (questionFromJson !== null && questionFromJson && questionFromJson !== undefined) {
      return new QuizQuestoinTrueFalse(true, questionFromJson.id, questionFromJson.index, questionFromJson.question, questionFromJson.SDG)
    }
    return null
  }
}
