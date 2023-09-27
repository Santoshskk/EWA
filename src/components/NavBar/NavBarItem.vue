<template>
  <li class="nav-item">
    <router-link class="nav-link" exact-active-class="bg-navbar-active" :to='route'>{{ itemText }}</router-link>
  </li>
</template>
<script>
export default {
  name: 'NavBarItem',
  props: ['itemText', 'route']
}
</script>
<style>
.bg-navbar-active {
  color: dodgerblue;
}

</style>
