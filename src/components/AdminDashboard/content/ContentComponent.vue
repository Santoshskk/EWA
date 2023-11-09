<template>
<!--  If the error is !null this will show and not any of the other sections of this page.-->
  <div v-if="error">
    <admin-error-component :error="error"/>
  </div>
  <section v-else>
  <h2 >Select the page you want to edit the content of</h2>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">{{ isPending ? 'Loading...': 'Page Title'}}</th>
    </tr>
    </thead>
    <tbody>
<!--    Shows loader when it is still fetching the Resources-->
    <div v-if="isPending">
      <admin-loader-component/>
    </div>
    <tr v-else v-for="page in allPages" :key="page.pageId" @click="pushIdToRoute(page.pageId)"
        :class="{ 'table-active': isActive(page.pageId) }">
      <th scope="row">{{ page.pageTitle }}</th>
    </tr>
    </tbody>
    <PageEditorComponent/>
  </table>
  </section>
</template>

<script>

import { inject, onBeforeMount, ref, watchEffect } from 'vue'
import AdminLoaderComponent from '@/components/AdminDashboard/AdminLoaderComponent'
import AdminErrorComponent from '@/components/AdminDashboard/AdminErrorComponent'
import router from '@/router'
import PageEditorComponent from '@/components/AdminDashboard/content/PageEditorComponent'

export default {
  name: 'ContentComponent',
  components: { PageEditorComponent, AdminErrorComponent, AdminLoaderComponent },
  setup () {
    const contentService = inject('contentService')
    const allPages = ref(null)
    const isPending = ref(true)
    const error = ref(null)
    const basePath = '/admin_dashboard/content'

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
    return { allPages, isPending, error, basePath }
  },
  methods: {
    pushIdToRoute (pageId) {
      const currentPath = this.$route.path

      // Check if the current path already contains the pageId
      if (currentPath.includes(pageId)) {
        // Empty the path if the pageId is the same
        router.push({ path: this.basePath })
      } else {
        const newPath = this.basePath + `/${pageId}`

        // Push the modified path to the route
        router.push({ path: newPath })
      }
    }
  },
  computed: {
    isActive () {
      return (pageId) => {
        return pageId === parseInt(this.$route.params.id)
      }
    }
  }
}
</script>

<style scoped>

</style>
