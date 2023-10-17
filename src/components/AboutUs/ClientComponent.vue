<template>
  <h1 class="text-center headerText1"> Who we work for</h1>
  <div class="card-body justify-content-center d-flex flex-row gap-5" id="body">
    <div class="card2">
      <img alt="client" class="team card-img align-self-center" src='../../assets/img/about-us/client-logo.png' id="client-component">
      <p class="text-center">
        We are working for the Sustainable Development branch of the Department of Economic and Social Affairs organised by the United Nations.
      </p>
      <hr>
      <p class="text-center font-monospace">
        The Division for Sustainable Development Goals (DSDG) in the United Nations Department of Economic and Social Affairs (UNDESA) acts as the Secretariat for the SDGs, providing substantive support and capacity-building for the goals and their related thematic issues, including water, energy, climate, oceans, urbanization, transport, science and technology, the Global Sustainable Development Report (GSDR), partnerships and Small Island Developing States. DSDG plays a key role in the evaluation of UN system-wide implementation of the 2030 Agenda and on advocacy and outreach activities relating to the SDGs.
      </p>
      <hr>
      <a href="https://sdgs.un.org/about" target="_blank" class="about-us-text">Find out more about the Sustainable Development...</a>
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

.headerText1{
  font-size: 2.8rem;
  font-weight: bold;
  margin-top: 50px;
  color: #292b2e;
}

h1.text-center {
  color: rgb(37, 37, 37);
  margin-top: 2%;
  animation: fade-up 1s;
}

.textWhite {
  color: white !important;
}

.card2 {
  background-color: #E0DBF1;
  max-width: 80%;
  height: auto;
  border-radius: 10px;
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
