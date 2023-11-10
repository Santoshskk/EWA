<template>
  <div v-if="error">
    <AdminErrorComponent :error="error"/>
  </div>
  <section v-else>
    <h2 v-if="!pageId">Select a page to begin editing</h2>
    <!-- If there is a pageId and is still pending show the load screen -->
    <div v-if="pageId && isPending">
      <AdminLoaderComponent/>
    </div>
    <form v-else-if="pageId">
      <div class="form-group" v-for="content in editableContent" :key="content.contentId">
        <label :for="'Textarea_' + content.contentId">{{ content.contentTitle }}</label>
        <textarea class="form-control" :id="'Textarea_' + content.contentId" rows="3"></textarea>
      </div>
    </form>
  </section>
</template>

<script>
import { inject, onBeforeMount, ref, watch } from 'vue'
import AdminErrorComponent from '@/components/AdminDashboard/AdminErrorComponent'
import AdminLoaderComponent from '@/components/AdminDashboard/AdminLoaderComponent'

export default {
  name: 'PageEditorComponent',
  components: {
    AdminLoaderComponent,
    AdminErrorComponent
  },

  props: {
    pageId: Number
  },
  setup (props) {
    const contentService = inject('contentService')
    const editableContent = ref(null)
    const isPending = ref(true)
    const error = ref(null)

    const fetchData = async () => {
      const APIResults = await contentService.findContentByPageId(props.pageId)

      editableContent.value = APIResults.editableContent.value
      isPending.value = APIResults.isPending.value
      error.value = APIResults.error.value
    }

    // Only makes a call if the page id is not null
    onBeforeMount(() => {
      if (props.pageId) {
        fetchData()
      } else {
        // Reset editableContent if pageId is null
        editableContent.value = null
      }
    })

    // Watches if the pageId changes before making a new call to the Backend
    // Only makes a call if the page id is not null
    watch(
      () => props.pageId,
      (newPageId, oldPageId) => {
        if (newPageId && newPageId !== oldPageId) {
          fetchData()
        } else {
          // Reset editableContent if pageId is null
          editableContent.value = null
        }
      }
    )

    return {
      editableContent,
      isPending,
      error
    }
  }
}
</script>

<style scoped>
</style>
