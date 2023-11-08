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

import { inject, onBeforeMount, ref } from 'vue'

export default {
  name: 'editContentComponent',
  setup () {
    const contentService = inject('contentService')
    const allPages = ref(null)
    const isPending = ref(false)
    const error = ref(null)

    onBeforeMount(async () => {
      allPages.value = await contentService.findAllPages()
    })
    return { allPages, isPending, error }
  }
}
</script>

<style scoped>

</style>
