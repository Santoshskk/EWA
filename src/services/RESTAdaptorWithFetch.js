import { ref, watch, watchEffect } from 'vue'
import useFetch from '@/utils/useFetch'
import Question from '@/models/Question'

/**
 * Provides utility methods for performing asynchronous CRUD operations via RESTful API using Vue.js Composition API
 * and Fetch.
 * @author Romello ten Broeke
 */
export class RESTAdaptorWithFetch /* <E> */ {
  resourcesUrl
  copyConstructor

  constructor (resourcesUrl, copyConstructor) {
    this.resourcesUrl = resourcesUrl
    this.copyConstructor = copyConstructor
  }

  /**
     * function to get all the scooters from the backend
     * @returns {entities, isPending, error, load} you need to make a const and destructure the return value
     * @author Romello ten Broeke
     */
  async asyncFindAll () {
    const entities = ref([])
    const { data, isPending, error, load } = await useFetch(this.resourcesUrl + '/all')

    watchEffect(() => {
      entities.value = data.value.map(entity => this.copyConstructor(entity))
    })

    return { entities, isPending, error, load }
  }

  /**
     * finds Scooter per id
     * @param {Number} id  the id of the scooter you want to get
     * @returns {entity, isPending, error, load, scooterId} you need to make a const and destructure the return value
     * @author Romello ten Broeke
     */
  async asyncFindById (id) {
    const entity = ref(null)
    const entityId = ref(id)

    const { data, isPending, error, load } = await useFetch(this.resourcesUrl + '/' + id)

    const updateAndLoad = (newId) => {
      entityId.value = newId
      load(this.resourcesUrl + '/' + newId)
    }
    watchEffect(() => {
      if (data.value === null || data.value.length === 0) return
      entity.value = this.copyConstructor(data.value)
    })

    watch(entityId, (newId) => {
      updateAndLoad(newId)
    })

    return { entity, isPending, error, load, entityId }
  }

  /**
     * Saves a scooter or updates it if it already exists.
     * @param {Scooter} scooterToSave  the scooter you want to save
     * @returns  {entity, isPending, error, load, abort, isAborted} you need to make a const and destructure the return value
     * @author Romello ten Broeke
     */

  async asyncSave (entityToSave, quizId = null, method = 'POST') {
    const entity = ref(entityToSave)
    let endpoint = this.resourcesUrl + '/' + entity.value.id

    if (entity.value instanceof Question) {
      switch (entity.value.type) {
        case 'yesno':
          endpoint = this.resourcesUrl + '/yesno/' + quizId
          break
        case 'multiplechoice':
          endpoint = this.resourcesUrl + '/multiplechoice/' + quizId
          break
        default:
          throw new Error('invalid type')
      }
    }
    const { data, isPending, error, load, abort, isAborted } = await useFetch(endpoint, entity.value, method)

    watchEffect(() => {
      if (isPending.value === false && error.value === null) {
        entity.value = this.copyConstructor(data.value)
      }
    })

    return { entity, isPending, error, load, abort, isAborted }
  }

  /**
     * Deletes a scooter from the backend.
     * @param {Number} id the id of the scooter you want to delete
     * @returns {isPending, error, load} you need to make a const and destructure the return value
     * @author Romello ten Broeke
     */

  async asyncDeleteById (id) {
    const entityId = ref(id)

    const { isPending, error, load, abort, isAborted } = await useFetch(this.resourcesUrl + '/' + entityId.value, {}, 'DELETE')

    return { isPending, error, load, abort, isAborted }
  }

  async asyncCustom (endpoint, method, body, params) {
    const entity = ref(null)
    endpoint = this.resourcesUrl + '/' + endpoint

    const { data, isPending, error, load, abort, isAborted } = await useFetch(endpoint, body, method, params)

    watchEffect(() => {
      if (data.value === null || data.value.length === 0) return
      entity.value = this.copyConstructor(data.value)
    })

    return { entity, isPending, error, load, abort, isAborted }
  }
}
