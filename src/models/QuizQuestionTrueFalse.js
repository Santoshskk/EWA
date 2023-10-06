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
  constructor (question, SDG) {
    super(question, SDG)
    this.givenAnswer = null
  }

  /**
   * This functions sets the givenAnswer
   * @param {boolean} answer
   * @author Marco de Boer
   */

  setGivenAnswer (answer) {
    this.givenAnswer = answer
  }
}
