<template>
  <h2 v-if="pageId">current Id = {{ pageId }}</h2>
</template>

<script>
import { inject, onBeforeMount, ref, watch } from 'vue'

export default {
  name: 'PageEditorComponent',
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

      editableContent.value = APIResults.editableContent
      isPending.value = APIResults.isPending.value
      error.value = APIResults.error.value
    }
    // Only makes call if the page id is !null
    onBeforeMount(() => {
      if (props.pageId) {
        fetchData()
      }
    })
    // Watches if the pageId changes before making a new call to the Backend.
    // Only makes call if the page id is !null
    watch(
      () => props.pageId,
      (newPageId, oldPageId) => {
        if (newPageId && newPageId !== oldPageId) {
          fetchData()
        }
      }
    )

    return { editableContent, isPending, error }
  }
}
</script>

<style scoped>
</style>
