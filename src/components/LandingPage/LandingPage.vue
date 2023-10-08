<template>
  <div class="main-container">
    <!--    our purpose info row-->
    <div class="row d-flex justify-content-center">
      <h1 class="text-center text-dark mt-3">Welcome to our webpage!</h1>
      <div class="card w-50 purpose-card">
        <div class="card-body">
          <h1 class="card-title">Our Purpose!</h1>
          <p class="card-text">Welcome to our interactive platform designed to help you discover which United Nations
            Sustainable Development Goal (SDG) aligns with your values and interests. The Sustainable Development Goals
            are a universal call to action to end poverty, protect the planet, and ensure prosperity for all by 2030. By
            understanding your passions and priorities, we can guide you to the SDG that resonates with you the most,
            empowering you to make a positive impact on the world. Let's explore together and find your SDG match! More
            <a class="link about-us-text" @click="goAboutUs">About Us!</a></p>
        </div>
      </div>
      <!--      quiz button row-->
      <div class="row d-flex justify-content-center">
        <button class="quiz-button" @click="goToQuiz">To Quiz!</button>
      </div>
      <!--      SDG overview field rows -->
      <div class="row gy-3"><h3>More about the Sustainable Development Goals:</h3></div>
      <SdgOverview></SdgOverview>
    </div>
  </div>
</template>

<script>

import SdgOverview from '@/components/LandingPage/SdgOverview.vue'

/**
 * LandingPage Component
 * This is the first page a user will see. Template consists of information about
 * our purpose, a quiz button and a Sustainable Development Goal overview
 */
export default {
  name: 'LandingPage',
  components: { SdgOverview },
  data () {
    return {
    }
  },
  methods: {
    /**
     * Redirects user to quiz page
     */
    goToQuiz () {
      this.$router.push({ path: '/quiz' })
      this.scrollToTop()
    },
    /**
     * Redirects to About Us page
     */
    goAboutUs () {
      this.$router.push({ path: '/about_us' })
      this.scrollToTop()
    },
    /**
     * Scroll user to top
     */
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style>
.text-center {
  animation: fade-up 0.5s;
}
.main-container {
  overflow-x: hidden;
  /*background-image: linear-gradient(#401B96, #ddf3f3 3%, #ddf3f3 97%, #401B96);*/
  background-color: #ddf3f3;
  padding-bottom: 75px;
}

.about-us-text {
  cursor: pointer;
}

.card-body {
  animation: fade-up 1s;
}
.purpose-card {
  margin-top: 25px;
  max-width: 500px;
  font-size: 18px;
}

.quiz-button {
  width: 200px;
  height: 100px;
  margin-top: 50px;
  border: none;
  border-radius: 25px;
  background-color: #401B96;
  font-size: 26px;
  color: white;
  animation: fade-up 1.5s;
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}
</style>
