/**
 * Profile model class
 * @class Profile
 * @property {Number} id
 * @property {String} name
 * @property {String} photo
 * @property {Date} birth
 * @property {String} occupation
 * @property {String} bio
 * @property {Array} goals
 * @author Justin Chan
 */

export class Profile {
  id
  name
  photo
  birth
  occupation
  bio
  goals

  constructor (id, name, photo, birth, occupation, bio, goals = []) {
    this.id = id
    this.name = name
    this.photo = photo
    this.birth = birth
    this.occupation = occupation
    this.bio = bio
    this.goals = goals
  }

  /**
   * Creates a copy of the profile
   * @param profile
   * @return {null|any}
   * @author Justin Chan
   */
  static copyConstructor (profile) {
    if (profile === null || profile === undefined) return null
    return Object.assign(new Profile(0), profile)
  }
}
