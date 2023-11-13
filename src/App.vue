<template>
  <nav-bar/>
  <router-view/>
  <FooterComponent/>
</template>

<style>

</style>
<script>
import NavBar from '@/components/NavBar/NavBar'
import FooterComponent from '@/components/FooterComponent'
import { RESTContentAdaptor } from '@/services/RESTContentAdaptor'
import { CONFIG } from '@/CONFIG'
export default {
  components: { NavBar, FooterComponent },
  provide () {
    return {
      contentService: new RESTContentAdaptor(CONFIG.BACKEND_URL + '/page')
    }
  },

  created () {
    // set language to english in sessionStorage, set default language to english (en-US)
    if (sessionStorage.getItem('language') === null) {
      sessionStorage.setItem('language', 'en-US')
    }
    // sessionStorage.setItem('language', 'nl-NL')
  }

}
</script>
