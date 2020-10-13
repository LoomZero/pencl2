<template lang="pug">
  .screen(:class="classes", @click="click")
    .screen--wrapper
      Logo.screen--logo(:animate="animate")
</template>

<script>
import Logo from "~/components/custom/media/Logo";
export default {
  components: {
    Logo,
  },
  data() {
    return {
      animate: false,
    }
  },
  computed: {
    classes() {
      return {
        'screen---animate': this.animate,
      };
    }
  },
  methods: {
    click() {
      this.animate = true;
    }
  },
  mounted() {

  }
}
</script>

<style lang="sass">
.screen
  width: 100vw
  height: 100vh
  background: black
  overflow: hidden
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/bg/blacklight.jpg')
  background-size: cover

  &--wrapper
    display: flex
    width: 100%
    height: 100%
    justify-content: center
    align-items: center

  &--logo
    display: inline-block
    width: 10%
    height: auto

  &---animate &--wrapper
    animation: logo--flip-shadow 5s forwards cubic-bezier(.22,1,.51,.99)

  &---animate &--logo
    animation: logo--flip 5s forwards cubic-bezier(.22,1,.51,.99)
 
</style>