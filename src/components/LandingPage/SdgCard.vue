<template>
  <div class="col sdg-card d-flex" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave">
    <img :src="currentContent" class="img-fluid" :alt="'SDG-' + this.content.id">
    <div class="ml-auto" v-if="hover">
      <button @click="goPage" class="extra-sdg-info-btn"
              :style="{'background-color': this.content.color, 'border-color': this.content.color}">ⓘ</button></div>
  </div>
</template>

<script>
/**
 * SdgCard Component
 * Holds the HTML template of a SDG goal card with additional info
 */
export default {
  name: 'SdgCard',
  props: ['content'],
  data () {
    return {
      hover: false,
      currentContent: this.content.image
    }
  },
  methods: {
    /**
     * Function changes content of an image when hovered
     */
    mouseover: function () {
      this.hover = true
      this.currentContent = this.content.action
    },
    /**
     * Function changes content of an images when no longer hovered
     */
    mouseleave: function () {
      this.hover = false
      this.currentContent = this.content.image
    },
    /**
     * Function redirects to a page with goal information
     */
    goPage () {
      this.$router.push({ path: '/sdg/' + this.content.id })
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
.extra-sdg-info-btn {
  display: flex;
  align-items: center;
  left: 7px;
  /*height: 11%;*/
  height: fit-content; /* fit content inside button */
  border-width: 2px;
  border-radius: 0 10px 10px 0; /* top and bottom right corners are round */
  width: auto;
  /*font-size: 12px;*/
  font-size: 85%;
  text-decoration: none !important;
}

.sdg-card {
  object-fit: cover !important;
  transition: all 250ms ease-in-out;
}

.sdg-card:hover {
  transform: scale(1.85); /* Enlarged hovered image */
  min-width: 8vw; /* set min width for readability */
  height: auto;
}
</style>
