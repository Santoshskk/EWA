/**
 * Question model class.
 * @class Question
 * @property {String} question
 * @property {Number} SDG can be an array of numbers
 * @author Marco de Boer
 */
export default class Question {
  id
  index
  question
  questionIsEmpty

  /**
   * This constructor is not meant to be used directly, but to be extended by other classes.
   * @param {String} question
   * @param {Number} SDG can be an array of numbers
   */
  constructor (id = null, index, question) {
    this.id = id
    this.index = index
    this.question = question
  }

  equals (other) {
    if (this.question !== other.question) return false
    if (this.index !== other.index) return false
    return true
  }
}
