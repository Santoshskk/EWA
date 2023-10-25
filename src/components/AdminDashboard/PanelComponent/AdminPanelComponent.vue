<template>
  <div class="card bg-light m-md-3 mx-sm-0" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="imgLink" class="card-img" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanelComponent',
  props: ['title', 'description', 'imgLink']
}
</script>

<style scoped>

</style>
