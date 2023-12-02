<template>
  <div class="popUpAdminContainer">
    <div class="popUpAdminInput">
      <table class="tableContainer">
        <tr>
          <td>Username:</td>
          <td><input type="text" v-model="username"></td>
        </tr>
        <tr>
          <td>Password:</td>
          <td><input type="password" v-model="password"></td>
        </tr>
      </table>
    </div>
    <div class="popUpAdminButton">
      <button @click="closePopup" class="popupButton">Close Popup</button>
      <button @click="checkAdmin" class="popupButton">Verify</button>
    </div>
  </div>
</template>

<script>
import { User } from '@/models/user'

export default {
  name: 'AdminVerifyComponent',
  props: {
    user: {
      type: User,
      required: true
    }
  },
  data () {
    return {
      isAdmin: false,
      username: '',
      password: ''
    }
  },
  methods: {
    closePopup () {
      if (!this.isAdmin) {
        this.$emit('close')
      }
    },
    checkAdmin () {
      if (this.username === this.user.isAdmin && this.password === this.user.password) {
        this.isAdmin = true
        this.$emit('verifiedClose')
      } else {
        this.isAdmin = false
        alert('You are not an admin')
      }
    }
  }
}
</script>

<style scoped>
.popUpAdminContainer {
  display: flex;
  flex-direction: column;
}
.tableContainer {
  background: #1d1d1d;
}
.popUpAdminInput {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -2em;
  //padding: 30px;
  //width: 100%;
  //height: 100%;
}
.popupButton {
  background: #1d1d1d;
  color: #FFFFFF;
}
.popUpAdminButton {
  //margin-top: -1.9em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
