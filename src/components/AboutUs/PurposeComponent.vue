<template>
  <h1 class="text-center"> What we want to achieve </h1>
  <div class="card-body justify-content-center d-flex flex-row gap-5" id="body">
    <div class="card">
      <img alt="purpose" class="team card-img align-self-center" src='../../assets/img/about-us/target.jpg' id="purpose-component">
      <p class="text-center font-monospace">
        Our main goal is to build a simple webpage for students and teachers of the Hogeschool van Amsterdam where they can all learn more about the Sustainable Development and how to contribute to a better environment.
      </p>
      <p class="text-center font-monospace">
        We would also like to create a community where we can inspire each other with different ideas for improving the climate.
      </p>
    </div>
  </div>
</template>

<script>
/**
 * This is the component that is responsible for showing the purpose of our web-page
 */
export default {
  name: 'PurposeComponent'
}
</script>

<style scoped>
#body {
  padding: 25px;
  animation: fade-up 3s;
}

h1.text-center {
  font-family: fantasy;
  color: #401B85;
  margin-top: 2%;
  animation: fade-up 1s;
}
.card {
  background-color: lightgray;
  max-width: 80%;
  height: auto;
}
#purpose-component {
  padding: 15px;
  max-width: 30vw;
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

@media screen and (max-width: 1100px) {
  #purpose-component {
    display: none;
  }
}
</style>
