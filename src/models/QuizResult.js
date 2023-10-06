/**
 * QuizResult model
 * @class QuizResult
 * @property {Number} SDG
 * @property {Number} score
 * @author Marco de Boer
 */
export default class QuizResult {
  SDG
  score

  /**
   * This class is used for formatting the results of the quiz
   * @param {Number} SDG
   * @param {Number} score
   */
  constructor (SDG, score) {
    this.SDG = SDG
    this.score = score
  }
}
