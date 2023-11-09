import { ref } from 'vue'

/**
 * RESTContentAdaptor is responsible for fetching pages and their editable content from a specified resource URL.
 * @author Romello ten Broeke
 */

export class RESTContentAdaptor {
  resourcesUrl;

  constructor (resourcesUrl) {
    this.resourcesUrl = resourcesUrl
  }
  /**
   * Fetches all available pages from the specified resources URL.
   * @returns {Object} An object containing ref objects for pages, isPending, and error.
   * @author Romello ten Broeke
   */

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
    } finally {
      isPending.value = false
    }
    return { pages, isPending, error }
  }
}
