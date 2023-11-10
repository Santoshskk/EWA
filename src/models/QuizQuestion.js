/**
 * QuizQuestion model class.
 * @class QuizQuestion
 * @property {String} question
 * @property {Number} SDG can be an array of numbers
 * @author Marco de Boer
 */
export default class QuizQuestion {
  id
  index
  question
  SDG

  /**
   * This constructor is not meant to be used directly, but to be extended by other classes.
   * @param {String} question
   * @param {Number} SDG can be an array of numbers
   */
  constructor (isInQuizBuilder, id = null, index, question, SDGJSON) {
    if (!isInQuizBuilder) {
      if (question === undefined || SDGJSON === undefined) throw new Error('question or SDG is undefined')
    }
    this.id = id
    this.index = index
    this.question = question
    this.#instantiateSDG(isInQuizBuilder, SDGJSON)
  }

  async #instantiateSDG (isInQuizBuilder, SDGJSON) {
    this.SDG = []
    if (!isInQuizBuilder) {
      if (SDGJSON === undefined || SDGJSON.length === 0) throw new Error('sdg is undefined')
    }
    if (SDGJSON.length !== 0) {
      for (const sdg of SDGJSON) {
        if (sdg.sdg === undefined) {
          this.SDG.push(sdg)
          continue
        }
        this.SDG.push(sdg.sdg)
      }
    }
  }

  sdgEqualsCheck (other) {
    if (this.SDG.length !== other.SDG.length) return false
    for (let i = 0; i < this.SDG.length; i++) {
      if (this.SDG[i] !== other.SDG[i]) return false
    }
    return true
  }

  equals (other) {
    if (this.question !== other.question) return false
    if (this.index !== other.index) return false
    if (this.sdgEqualsCheck(other) === false) return false
    return true
  }
}
