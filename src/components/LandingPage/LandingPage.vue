<template>
  <div class="main-container">
    <!--    our purpose info row-->
    <div class="row d-flex justify-content-center gap-2 w-80 m-auto">
      <div class="col-lg-6 col-12 m-auto justify-content-center welcomeDiv align-items-lg-start">
        <h1 class="text-center text-dark my-2 headerText">Welcome to our webpage!</h1>
        <p class="paragraphText">
          Unlock your potential for global impact! On this website, you can explore and act on the UN’s Sustainable
           Development Goals tailored to your field of expertise. Ready to make a difference? Take our quiz now!
        </p>
        <button class="btn btn-primary quiz-button" @click="goToQuiz">To Quiz!</button>
      </div>
      <div class="col-lg-6 col-12  card purpose-card ">
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
      </div>
      <!--      SDG overview field rows -->
      <div class="row gy-3"><h2 class="headerText2">More about the Sustainable Development Goals:</h2></div>
      <div class="d-flex m-auto justify-content-center">
      <SdgOverview></SdgOverview>
      </div>
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
      itemShowIndex: 0
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
.card-title {
  font-weight: bold;
}
.welcomeDiv {
  margin-top: 100px !important;
}

.headerText {
  font-size: 2.8rem;
  font-weight: bold;
  text-align: start !important;
  margin-top: 50px;
  margin-bottom: 50px;
  color: #292b2e;
}

.headerText2 {
  font-size: 2.8rem;
  font-weight: bold;
  text-align: center !important;
  margin-top: 50px;
  color: #292b2e;
}

.paragraphText {
  font-size: 1.2rem;
  text-align: justify;
  text-justify: inter-word;
}
.w-80 {
  width: 90%;
}
.text-center {
}
.main-container {
  overflow-x: hidden;
  /*background-image: linear-gradient(#401B96, #ddf3f3 3%, #ddf3f3 97%, #401B96);*/
  background-color: #ffffff;
  padding-bottom: 75px;
}

.about-us-text {
  cursor: pointer;
  color: #401B96;
  text-decoration: none;
}

.about-us-text:hover {
  text-decoration: underline;
  color: #411C97;
}

.card-body {
}
.card-text {
  text-align: justify;
  text-justify: inter-word;
  /* color: white !important */
}

.card {
  /* border: 2px solid #401B96 !important; */
  background-color: #E0DBF1;
  border: none;
  margin-top: 150px !important;
  border-radius: 10px;
}

.purpose-card {
  margin-top: 25px;
  max-width: 450px;
  font-size: 18px;
}

.fadeAnimation {
  animation: fade-up 2s;
}

.quiz-button {
  width: 200px;
  margin-top: 50px;
  font-size: 1.6rem;
}

.slide-in-animation2 {
  /* Initial position -50px off the top of its original position */
  transform: translateY(50px);
  opacity: 0; /* Initial opacity set to 0 to make it invisible */

  /* Animation configuration */
  animation: slideIn 1.5s ease-out forwards; /* Name, duration, easing function, fill mode */
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

@media only screen and (max-width: 1000px) {
  .headerText {
    text-align: center !important;
  }
}
</style>
