/**
 * QuizQuestionMultipleChoiceOption model
 * @class QuizQuestionMultipleChoiceOption
 * @property {String} option
 * @property {Boolean} isSelected
 * @author Marco de Boer
 */
export default class QuizQuestionMultipleChoiceOption {
  option
  isSelected

  /**
   * This is a class for the options of a multiple choice question
   * @param {String} option
   * @param {Boolean} isSelected
   */

  constructor (option, isSelected = false) {
    if (option === undefined) throw new Error('option is undefined')
    if (isSelected !== Boolean(isSelected)) throw new Error('isSelected is not a boolean')

    this.option = option
    this.isSelected = isSelected
  }

  /**
   * This function toggles the isSelected boolean
   */
  async toggleSelected () {
    this.isSelected = !this.isSelected
  }
}
