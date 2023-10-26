<template>
  <div class="card text-center">
    <div class="card-header">
<!--      Dashboard navbar-->
      <AdminNavBar/>
    </div>
    <div class="card-body">
      <h5 class="card-title">Welcome to the admin dashboard</h5>
      <span class="card-text">On this page you will find all the activities an admin can do and a small explanation per activity</span>
<!--      Loads each section of the admin dashboard as clicked in the admin navbar. -->
      <router-view/>
    </div>
  </div>
</template>

<script>

import AdminNavBar from '@/components/AdminDashboard/AdminNavBar'

export default {
  name: 'AdminDashboardView',
  components: { AdminNavBar }
}
</script>
