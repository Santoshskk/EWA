import { ref } from 'vue'

export class RESTContentAdaptor {
  resourcesUrl;

  constructor (resourcesUrl) {
    this.resourcesUrl = resourcesUrl
  }

  async findAllPages () {
    const pages = ref([])
    const isPending = ref(true)
    const error = ref(null)
    try {
      const response = await fetch(this.resourcesUrl + '/all')
      if (response.ok) {
        pages.value = await response.json()
        error.value = null
      } else {
        // Handle HTTP errors if the response is not 'ok'
        return new Error('Network response was not ok.')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error fetching data:', error)
    } finally {
      isPending.value = false
    }
    return { pages, isPending, error }
  }
}
