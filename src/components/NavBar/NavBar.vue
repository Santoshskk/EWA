<template>
<nav class="navbar navbar-expand-lg bg-navbar-color navbar-item-text">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
<!--        NavbarItems-->
        <NavBarItem item-text="Home" route="/"/>
        <NavBarItem item-text="About us" route="/about_us"/>
<!--        Drop down admin dashboard menu -->
        <NavBarDropdown/>
      </ul>
        <button class="btn btn-outline-success" type="submit">Login</button>
    </div>
  </div>
</nav>
</template>
<script>
import NavBarItem from '@/components/NavBar/NavBarItem'
import NavBarDropdown from '@/components/NavBar/NavBarDropdown'

export default {
  name: 'NavBar',
  components: { NavBarDropdown, NavBarItem }
}
</script>
<style>
.bg-navbar-color {
  background: purple;
}

.navbar-item-text {
  color: azure;
  font-size: 20px;
}
</style>
