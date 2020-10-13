<template lang="pug">
  .logo(:class="{'logo---animate': animate}")
    SVGEmbed.logo--svg(src="/images/logos/tz.svg")
</template>

<script>
import SVGEmbed from "~/components/core/media/SVGEmbed";

export default {
  components: {
    SVGEmbed
  },
  props: ['animate'],
  data() {
    return {};
  }
};
</script>
<style lang="sass">
.logo
  width: 100%
  height: 100%
  overflow: hidden
  position: relative

  &---animate &--svg
    animation: logo--rotate 20s 9s infinite

  &---animate 
    .logo-t,
    .logo-z
      animation: logo--rotate--character 10s linear infinite
      transform-origin: 50%

</style>
