<template>
  <h2>Select the page you want to edit the content of</h2>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Page</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row">Home</th>
    </tr>
    </tbody>
  </table></template>

<script>

export default {
  name: 'editContentComponent',
  data () {
    return {
      pageEditContent: null,
      loading: false,
      error: null
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
