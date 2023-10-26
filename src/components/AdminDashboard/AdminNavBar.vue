<template>
  <ul class="nav nav-tabs card-header-tabs">
    <AdminNavBarItem text="Intro" route="intro"/>
    <AdminNavBarItem text="Users" route="users"/>
    <AdminNavBarItem text="Content" route="content"/>
    <AdminNavBarItem text="Quiz" route="quiz"/>
  </ul>
</template>
<script>
import AdminNavBarItem from '@/components/AdminDashboard/AdminNavBarItem'

export default {
  name: 'AdminNavBar',
  components: { AdminNavBarItem }
}
</script>
