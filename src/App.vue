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
      contentService: new RESTContentAdaptor(CONFIG.BACKEND_URL + '/content')
    }
  }

}
</script>
