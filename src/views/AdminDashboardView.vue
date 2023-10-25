<template>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <router-link class="nav-link " active-class="active" to='/admin_dashboard'>Intro</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link text-black" href="#">Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-black" href="#">Content</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <h5 class="card-title">Welcome to the admin dashboard</h5>
      <p class="card-text">On this page you will find all the activities an admin can do and a small explanation per activity</p>
<!--      Panel holder -->
      <div class="row">
        <AdminPanelComponent title="Users" description="Lets you edit users" img-link=""/>
        <AdminPanelComponent title="Users" description="Lets you edit users" img-link=""/>
        <AdminPanelComponent title="Users" description="Lets you edit users" img-link=""/>
      </div>

    </div>
  </div>
</template>

<script>
import AdminPanelComponent from '@/components/AdminDashboard/PanelComponent/AdminPanelComponent'
export default {
  name: 'AdminDashboardView',
  components: { AdminPanelComponent }
}
</script>

<style scoped>

</style>
