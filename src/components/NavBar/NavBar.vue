<template>
<nav class="navbar navbar-dark navbar-expand-lg bg-navbar-color navbar-item-text ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img class="navbar-logo" src="@/assets/img/logos/hva_logo_transparant.png" alt="HvA Logo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link mx-0 remove-hva-text" href="https://www.hva.nl/">Hogeschool van Amsterdam</a>
        </li>
<!--        NavbarItems-->
        <NavBarItem item-text="Home" route="/"/>
        <NavBarItem item-text="About us" route="/about_us"/>
        <NavBarItem item-text="Quiz" route="/quiz"/>
        <NavBarItem item-text="SDG info" route="/sdg/1"/>
        <NavBarItem item-text="Profile" route="/profile"/>
        <NavBarItem v-if="isAdmin" item-text="Admin Dashboard" route="/admin_dashboard"/>
      </ul>
      <NavBarItem class="btn btn-navsignup" v-if="!isLoggedIn" item-text="Sign up" route="/signup"/>
      <NavBarItem class="btn btn-navLogin mx-1" item-text="Log in" route="/login"/>
    </div>
  </div>
</nav>
</template>
<script>
import NavBarItem from '@/components/NavBar/NavBarItem'
export default {
  name: 'NavBar',
  components: { NavBarItem },
  data () {
    return {
      isAdmin: true,
      isLoggedIn: false
    }
  }
}
</script>
<style scoped>

.bg-navbar-color {
  background: #401B96;
}

.btn-navsignup {
  background: #348bfc;
  border: 1px solid #348bfc;
  font-size: 1.1rem;
  font-weight: 500;
  margin-right: 10px;
}

.btn-navsignup:hover {
  background: #2846ee;
  border: 1px solid #2846ee;
  color: white;
}

.btn-navLogin {
  background: transparent;
  border: 1px solid white;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
}

.btn-navLogin:hover {
  background: white;
  color: #401B96;
}

.navbar-item-text {
  font-size: 20px;
  text-decoration: none;
}

.navbar-logo {
  max-height: 50px;
  width: auto;
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 1100px) {
  .remove-hva-text {
    display: none;
  }
}

</style>
