import { ref } from 'vue'

export class RESTContentAdaptor {
  resourcesUrl;

  constructor (resourcesUrl) {
    this.resourcesUrl = resourcesUrl
  }

  async findAllPages () {
    const pages = ref([])
    try {
      const response = await fetch(this.resourcesUrl + '/all')
      if (response.ok) {
        pages.value = await response.json()
        return pages.value
      } else {
        // Handle HTTP errors if the response is not 'ok'
        return new Error('Network response was not ok.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}
