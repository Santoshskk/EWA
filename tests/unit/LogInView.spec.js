import { mount } from '@vue/test-utils'
import LogInView from '@/views/LogInView'
import router from '@/router'
import { SessionSbService } from '@/services/SessionSbService'
import CONFIG from '../../app-config'
import { shallowReactive } from 'vue'

let wrapper

beforeEach(async function () {
  const sessionService = shallowReactive(
    new SessionSbService(CONFIG.BACKEND_URL + '/authentication/login'))
  wrapper = mount(LogInView, {
    global: {
      plugins: [router],
      provide: {
        sessionService: sessionService
      }
    }
  })
})
/**
 * Test for user-login
 * @author Jiaming Yan
 */
describe('Trying to login', () => {
  it('can login successfully', async function () {
    const userNameField = wrapper.find('input[placeholder="Username"]')
    expect(userNameField.exists(),
      'Cannot find input field with placeholder = Username').toBe(true)
  })
})

afterEach(function () {
  wrapper.unmount() // Clean up the wrapper after each test
  wrapper = null
})
