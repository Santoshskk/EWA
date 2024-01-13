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
    // Verifying whether the input field for username and password exists
    const userNameField = wrapper.find('input[placeholder="Username"]')
    const passwordField = wrapper.find('input[placeholder="Password"]')
    const loginButton = wrapper.find('button[id="loginButton"]')
    expect(userNameField.exists(),
      'Cannot find input field with placeholder = Username').toBe(true)
    expect(passwordField.exists(),
      'Cannot find input field with placeholder = Password').toBe(true)
    expect(loginButton.exists(),
      'Cannot find button with id = loginButton').toBe(true)

    // Attempt to log in with valid user credentials
    await userNameField.setValue('sTaylor37')
    await passwordField.setValue('Staylor123!')
    await loginButton.trigger('submit')

    // Error message should not exist when login attempt is successful
    expect(wrapper.vm.errorMessage,
      'Login attempt failed').toBe('')
  })
})

afterEach(function () {
  wrapper.unmount() // Clean up the wrapper after each test
  wrapper = null
})
