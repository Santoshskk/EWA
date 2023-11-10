<template>
  <div>
    <form class="form">
      <button class="searchButton">
        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
          <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <input class="input" placeholder="Type your text" required="" type="text">
      <button class="reset" type="reset">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </form>
    <table class="table table-sm table-dark">
      <thead>
      <tr>
        <th >UserName</th>
        <th scope="col">Email</th>
        <th scope="col">Action Plan</th>
        <th scope="col">Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td >{{ user.username }}</td>
        <td >{{ user.email }}</td>
        <td >{{ user.usergoal }}</td>
        <td>
          <button @click="() => ToggelPopUp('isEditing')">Edit</button>
        </td>
      </tr>
      <!-- Edit dropdown that is displayed when the "Edit" button is clicked -->
      </tbody>
    </table>
    <EditPopUp v-if="popUpTrigger.isEditing" :ToggelPopUp="() => ToggelPopUp('isEditing')">
      <p>hoi</p>
    </EditPopUp>
  </div>
</template>

<script>
import { ref } from 'vue'
import EditPopUp from '@/components/AdminDashboard/EditPopUp'
export default {
  name: 'AdminUserComponent',
  components: { EditPopUp },
  inject: ['usersServices'],

  data () {
    const popUpTrigger = ref({
      isEditing: false
    })

    const ToggelPopUp = (trigger) => {
      popUpTrigger.value[trigger] = !popUpTrigger.value[trigger]
    }
    return {
      users: [],
      EditPopUp,
      popUpTrigger,
      ToggelPopUp
    }
  },
  async created () {
    this.users = await this.usersServices.asyncFindAll()
  },
  methods: {
    toggleEdit () {
      this.isEditing = !this.isEditing
    },
    saveEdit () {
      this.isEditing = false
    }
  }
}

</script>

<style scoped>
button {
  --color: #560bad;
  font-family: inherit;
  display: inline-block;
  width: 8em;
  height: 2.6em;
  line-height: 2.5em;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color .5s;
  z-index: 1;
  font-size: 17px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--color);
}

button:before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 150px;
  width: 200px;
  border-radius: 50%;
}

button:hover {
  color: #fff;
}

button:before {
  top: 100%;
  left: 100%;
  transition: all .7s;
}

button:hover:before {
  top: -30px;
  left: -30px;
}

button:active:before {
  background: #3a0ca3;
  transition: background 0s;
}

/* From uiverse.io by @satyamchaudharydev */
/* removing default style of button */

.form .searchButton {
  border: none;
  background: none;
  color: #8b8ba7;
}
/* styling of whole input container */
.form {
  --timing: 0.3s;
  --width-of-input: 200px;
  --height-of-input: 40px;
  --border-height: 2px;
  --input-bg: white;
  --border-color: #2f2ee9;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: 500px;
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 0.8em;
  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: var(--input-bg,#fff);
  margin: 5px;
}
/* styling of Input */
.input {
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
}
/* styling of animated border */
.form:before {
  content: "";
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}
/* Hover on Input */
.form:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}
/* here is code of animated border */
.form:focus-within:before {
  transform: scale(1);
}
/* styling of close button */
/* == you can click the close button to remove text == */
.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}
/* close button shown when typing */
input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}
/* sizing svg icons */
.form svg {
  width: 17px;
  margin-top: 3px;
}
</style>
