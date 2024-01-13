import { User } from '@/models/user'
const userId = 30001
const userName = 'Mike2000'
const firstName = 'Mike'
const lastName = 'Hawk'

let user1

beforeEach(function () {
  user1 = new User(
    userId,
    1,
    firstName,
    lastName,
    'mike2000hawk@gmail.com',
    1,
    userName,
    'Mikehawk2000!',
    '2000-03-07',
    0
  )
})

/**
 * Test for User Model in front end
 * @author Jiaming Yan
 */
describe('User Model', () => {
  it('creates a copy of a user', () => {
    const userCopy = User.copyConstructor(user1)

    expect(userCopy,
      'copy of user1 does not match original')
      .toStrictEqual(user1)
  })
})
