<template>
  <h1 class="text-center"> Who we are</h1>
  <div class="card-body justify-content-center d-flex gap-5" id="body">
    <div class="card">
      <img alt="team" class="team card-img" src='../../assets/img/about-us/team.jpg' id="team-component">
      <p class="text-center font-monospace">
        We are team Green Office-1,
        all of our current consisting members are second year Software Engineering students of the Hogeschool van Amsterdam!
      </p>
    </div>
    <div class="card">
      <p class="text-center font-monospace">
        Our members:
      </p>
      <ul class="list-group">
        <li class="list-group-item bg-dark text-white">Romello ten Broeke</li>
        <li class="list-group-item">Marco de Boer</li>
        <li class="list-group-item bg-dark text-white">Justin Chan</li>
        <li class="list-group-item">Santosh Kakkar</li>
        <li class="list-group-item bg-dark text-white">Pim Schuit</li>
        <li class="list-group-item">Jiaming Yan</li>
      </ul>
    </div>
  </div>
</template>
<script>
/**
 * This is the component that is responsible for showing the information about the team
 */
export default {
  name: 'TeamComponent'
}
</script>

<style scoped>
#body {
  padding: 25px;
  flex-direction: row;
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
  max-width: 50%;
  height: auto;
}

#team-component {
  place-self: center;
  padding: 12px;
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
  #team-component {
    display: none;
  }
  #body {
    flex-direction: column;
  }
  .card {
    max-width: 100%;
  }
}
</style>
