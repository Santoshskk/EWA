<template>
  <div class="row">
    <AdminPanelComponent title="Users" description="Lets you edit users" img-link=""/>
    <AdminPanelComponent title="Content" description="Lets you edit users" img-link=""/>
    <AdminPanelComponent title="Quiz" description="Lets you edit users" img-link=""/>
  </div>
</template>
<script>
import AdminPanelComponent from '@/components/AdminDashboard/PanelComponent/AdminPanelComponent'

export default {
  name: 'IntroComponent',
  components: { AdminPanelComponent }
}
</script>
