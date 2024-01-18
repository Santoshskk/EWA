/**
 * Test for QuizResult Services
 * @author Santosh Kakkar
 */
import { RESTQuizResultAdaptor } from '@/services/RESTQuizResultAdaptor'
import CONFIG from '../../app-config'

const quizResultService = new RESTQuizResultAdaptor(CONFIG.BACKEND_URL + '/quizresult')

beforeEach(() => {
  fetch.resetMocks()
})
// FAST
describe('Saving results with async saveResults', () => {
  it('saves the quizResults', async function () {
    // Arrange: Mock a response with mock data
    fetch.mockResponseOnce(JSON.stringify(mockQuizResults), { headers: { 'Content-Type': 'application/json' }, method: 'POST' })

    // Act: Call the async saveResults method
    const response = await quizResultService.saveResults(mockQuizResults, mockUser)

    // Assert: Check that the response has the correct length
    expect(response.length, 'The amount of results is incorrect').toStrictEqual(2)
  })
})

// FAST
describe('Getting user with async getUserById', () => {
  it('should return null if userId is null', async function () {
    // Arrange: Mock a response with null
    fetch.mockResponseOnce(JSON.stringify(null), { headers: { 'Content-Type': 'application/json' }, method: 'POST' })

    // Act: Call the async getByUserId method with null userId
    const response = await quizResultService.getByUserId(null)

    // Assert: Check that the response is null
    expect(response, 'The user does not exist').toBeNull()
  })

  it('should return null if the user does not exist', async function () {
    // Arrange: Mock a response with an user that does not exist
    fetch.mockResponseOnce(JSON.stringify(null), { headers: { 'Content-Type': 'application/json' }, method: 'POST' })

    // Act: Call the async getByUserId method with a non-existing userId
    const response = await quizResultService.getByUserId(5)

    // Assert: Check that the response is null
    expect(response, 'The user does not exist').toBeNull()
  })
})
const mockQuizResults = [
  {
    resultId: 102,
    sdgArray: [
      2,
      3,
      15
    ],
    dateOfQuiz: [
      2024,
      1,
      6
    ]
  },
  {
    resultId: 152,
    sdgArray: [
      2,
      3,
      15
    ],
    dateOfQuiz: [
      2024,
      1,
      6
    ]
  }
]

const mockUser = {
  user_id: 3,
  sector_id: 1,
  first_name: 'User27',
  last_name: 'User27',
  email: 'User27@gmail.com',
  security_clearance: 1,
  password: '1234',
  username: 'User',
  bio: 'leeg',
  occupation: 'idk',
  date_of_birth: '2000-02-01',
  postalcode: null,
  user_goal: null,
  actionplans: [
    {
      id: 3,
      title: 'Enhance Global Education Awareness',
      description: '  <strong>Objective:</strong> To increase awareness and support for SDG 4, Quality Education, among a broad audience.<br><strong>Actions:</strong><br>* Research and share information about global education challenges and successes.<br>* Organize or participate in educational events or webinars focusing on SDG 4.<br>* Volunteer with organizations that focus on improving education quality worldwide.<br>* Advocate for educational policies that align with SDG 4 objectives.<br>* Collaborate with educational institutions to develop SDG 4-focused programs.\n',
      sector: {
        id: 1,
        name: 'None',
        description: 'No sector assigned'
      },
      sdgArray: [
        4,
        5,
        7,
        10
      ]
    }
  ],
  img_path: 'http://localhost:8085/images/a14bb9ef-f45e-4229-9af3-81a17aa503a7.PNG',
  isAdmin: true
}
