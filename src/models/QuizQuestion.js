/**
 * QuizQuestion model class.
 * @class QuizQuestion
 * @property {String} question
 * @property {Number} SDG can be an array of numbers
 * @author Marco de Boer
 */
export default class QuizQuestion {
  question
  SDG

  /**
   * This constructor is not meant to be used directly, but to be extended by other classes.
   * @param {String} question
   * @param {Number} SDG can be an array of numbers
   */
  constructor (question, SDG) {
    this.question = question
    this.SDG = SDG
  }
}
