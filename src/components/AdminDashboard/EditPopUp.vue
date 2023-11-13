<template>
  <div class="popup" v-if="clonedUser">
    <div class="popup-inner">
      <slot />
      <table>
        <tr>
          <td>Username: </td>
          <td><input type="text" v-model="clonedUser.username" /></td>
        </tr>
        <tr>
          <td>Email: </td>
          <td><input type="text" v-model="clonedUser.email"/></td>
        </tr>
        <tr>
          <td>Admin: </td>
          <td>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" v-model="clonedUser.isAdmin">
            </div>
          </td>
        </tr>
      </table>
      <button class="popup-close" @click="toggelPopUp()">
        Close Popup
      </button>
      <button @click="save" :disabled="!hasChanged">Save</button>

    </div>
  </div>
</template>

<script>
import { User } from '@/models/user'

export default {
  name: 'EditPopUp',
  props: {
    toggelPopUp: Function,
    user: {
      type: User,
      required: true
    }
  },
  data () {
    return {
      clonedUser: null
    }
  },
  async created () {
    if (this.user) {
      this.clonedUser = await this.user.clone()
    }
  },
  methods: {
    save () {
      this.$emit('updateUser', this.clonedUser)
      this.toggelPopUp()
    }
  },
  computed: {
    hasChanged () {
      return !User.equals(this.user, this.clonedUser)
    }
  },
  methode: {

  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  background: #FFF;
  padding: 32px;
}
</style>
