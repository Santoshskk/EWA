<template>
<!--  This is the whole footer -->
  <div class="card text-center" id="footerBody">
    <div class="card-body">
      <h5 class="card-title">Looks like you have reached the end...</h5>
      <div class="card-container">
        <!--  This is the section for potential questions of the users -->
        <div class="card" id="footerBox">
          <h5 class="card-title" id="footerTitle">Questions</h5>
          <hr/>
          <p class="card-text">Get started</p>
          <p class="card-text">How to use</p>
          <p class="card-text">Privacy Policy</p>
          <p class="card-text">Terms of Use</p>
          <p class="card-text">Content Usage Guidelines</p>
        </div>
        <!--  This is the section where the user can find ways to contact us -->
        <div class="card" id="footerBox">
          <h5 class="card-title" id="footerTitle">Contact</h5>
          <hr/>
          <p class="card-text">Hotline: 020 12345678</p>
          <p class="card-text">Email us at: greenoffice01@gmail.com</p>
          <p class="card-text">YouTube</p>
          <p class="card-text">Instagram</p>
          <p class="card-text">LinkedIn</p>
        </div>
        <!--  This is the section where the user can find more information about us -->
        <div class="card" id="footerBox">
          <h5 class="card-title" id="footerTitle">About Us</h5>
          <hr/>
          <a href="https://sdgs.un.org/goals" target="_blank" class="link-light">Sustainable Development</a>
          <router-link href="" class="link-light" to="/about_us">Meet the Team</router-link>
        </div>
        <img class="rounded float-end" src="../assets/img/logos/SDG_UN_LOGO.png" alt="sdg-un-logo" id="footerLogo">
      </div>
      <!--  This button allows the user to go back to the top of the page -->
      <p class="card-text">Or just simply go back to the top of this page with the button below</p>
      <a href="#" class="btn btn-primary">Go back to top</a>
    </div>
    <div class="card-footer text-body-secondary">
      <p class="card-text">Presented to you by: HvA HBO-ICT, S206-Green Office Team 1</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
/* Styling for the footer */
.text-center {
  width: 100%;
  margin: 0;
  padding: 0;
  color: red;
}

.card-body {
  background-color: #401B96;
}

.card-container{
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 2%;
}

.card-title, .card-text {
  color: white;
}

.card-footer {
  background-color: black;
}

#footerBox {
  background-color: #401B85;
  width: 18rem;
  margin-bottom: 2%;
}

#footerTitle {
  margin-top: 5%;
}

#footerLogo {
  margin-left: 5%;
  width: 350px;
  height: 300px;
}

/* Hides the SDG logo when a certain width is reached */
@media screen and (max-width: 1100px) {
  #footerLogo {
    display: none;
  }
}

.btn-primary {
  background-color: white;
  color: black;
  margin-bottom: 0;
}

a{
  margin-bottom: 4%;
}

</style>
