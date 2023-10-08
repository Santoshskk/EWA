<template>
  <section class="vh-100 bg-image">
    <div class="mask d-flex align-items-center h-100 background">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px;">
              <div class="loginBox p-5">
                <h2 class="text-uppercase text-center mb-5">Log In</h2>
                <form>
                  <div class="form-outline mb-4">
                    <input type="text" id="userName" class="form-control" placeholder="Username" v-model="userName"/>
                  </div>
                  <div class="form-outline mb-4">
                    <input type="password" id="password" class="form-control" placeholder="Password" v-model="password"/>
                    <p class="text-danger">{{ errorMessage }}</p>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="button"
                            @click="logInCheck" class="btn btn-success btn-block btn-lg buttonColor text-body">Log In</button>
                  </div>
                  <p class="text-center text-muted mt-4 mb-0">Don't have an account?
                    <router-link class="fw-bold text-body" to="/signup">Sign up here</router-link>
                  </p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from '@/router'

export default {
  name: 'LogInView',
  data () {
    return {
      errorMessage: '',
      userName: '',
      password: ''
    }
  },

  methods: {
    logIn () {
      // a methode to get the account from the database (later on)
      router.push({ name: 'home' })
    },

    logInCheck () {
      let countError = 0
      if (this.userName === '' || this.password === '') {
        this.errorMessage = 'Please check that you have used the correct email address and password and try again.'
        countError++
      } else {
        this.errorMessage = ''
      }
      if (countError === 0) {
        this.logIn()
      }
    }
  }
}

</script>

<style scoped>
.background{
  background: #401B96;
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom,#401B96 , rgba(143, 211, 244, 0.5))
}
.buttonColor {
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom,#401B96 , rgba(143, 211, 244, 0.5))
}
</style>
