<template>
  <h2>Select the page you want to edit the content of</h2>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Page Title</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="page in allPages" :key="page.pageId">
      <th scope="row">{{ page.pageTitle }}</th>
    </tr>
    </tbody>
  </table></template>

<script>

import { inject, onBeforeMount, ref, watchEffect } from 'vue'

export default {
  name: 'editContentComponent',
  setup () {
    const contentService = inject('contentService')
    const allPages = ref(null)
    const isPending = ref(false)
    const error = ref(null)

    // What happens before this component gets mounted.
    onBeforeMount(async () => {
      const APIResults = await contentService.findAllPages()
      // Watches for changes  in the values and updated them accordingly.
      // Without this, it will always wait on a promise and stay empty.
      watchEffect(() => {
        allPages.value = APIResults.pages.value
        isPending.value = APIResults.isPending.value
        error.value = APIResults.error.value
      })
    })
    return { allPages, isPending, error }
  }
}
</script>

<style scoped>

</style>
