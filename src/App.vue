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
import { UsersAdaptor } from '@/services/users-adaptor'
import CONFIG from '@/services/app-config.js'
export default {
  components: { NavBar, FooterComponent },
  provide () {
    return {
      usersServices: new UsersAdaptor(CONFIG.BACKEND_URL)
    }
  }

}
</script>
