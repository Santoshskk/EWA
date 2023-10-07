<template>
  <h1 class="text-center"> Who we work for</h1>
  <div class="card-body justify-content-center d-flex flex-row gap-5" id="body">
    <div class="card">
      <img alt="client" class="team card-img align-self-center" src='../../assets/img/about-us/client-logo.png' id="client-component">
      <p class="text-center font-monospace">
        We are working for the Sustainable Development branch of the Department of Economic and Social Affairs organised by the United Nations.
      </p>
      <hr>
      <p class="text-center font-monospace">
        The Division for Sustainable Development Goals (DSDG) in the United Nations Department of Economic and Social Affairs (UNDESA) acts as the Secretariat for the SDGs, providing substantive support and capacity-building for the goals and their related thematic issues, including water, energy, climate, oceans, urbanization, transport, science and technology, the Global Sustainable Development Report (GSDR), partnerships and Small Island Developing States. DSDG plays a key role in the evaluation of UN system-wide implementation of the 2030 Agenda and on advocacy and outreach activities relating to the SDGs.
      </p>
      <hr>
      <a href="https://sdgs.un.org/about" target="_blank" class="link-dark">Find out more about the Sustainable Development...</a>
    </div>
  </div>
</template>

<script>
/**
 * This is the component that is responsible for displaying the information about our client
 */
export default {
  name: 'ClientComponent'
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

#client-component {
  padding: 15px;
  max-width: 50vw;
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
  #client-component {
    display: none;
  }
}
</style>
