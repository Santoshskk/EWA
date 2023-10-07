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

  static copyConstructor (profile) {
    if (profile === null || profile === undefined) return null
    return Object.assign(new Profile(0), profile)
  }
}
