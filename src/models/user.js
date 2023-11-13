export class User {
  userId
  email
  username
  isAdmin
  usergoal

  constructor (userId, email, username, isAdmin, usergoal) {
    this.userId = userId
    this.email = email
    this.username = username
    this.isAdmin = isAdmin
    this.usergoal = usergoal
  }

  async clone () {
    return new User(this.userId,
      this.email,
      this.username,
      this.isAdmin,
      this.usergoal)
  }

  static copyConstructor (user) {
    if (!user) return null // Handle the case where 'user' is null or undefined
    const clonedUser = new User(
      user.user_id,
      user.email,
      user.username,
      user.isAdmin,
      user.usergoal
    )
    return clonedUser
  }

  static equals (user1, user2) {
    if (user1 === null && user2 === null) {
      return true
    }

    if (user1 === null || user2 === null) {
      return false
    }

    // Basic field comparisons
    if (user1.userId !== user2.userId ||
      user1.email !== user2.email ||
      user1.username !== user2.username ||
      user1.isAdmin !== user2.isAdmin) {
      return false
    }
    // All checks passed, objects are equal
    return true
  }
}
