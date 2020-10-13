<template lang="pug">
  svg(width="100px", height="100px", viewBox="0 0 220 220", xmlns="http://www.w3.org/2000/svg")
    mask#masking
      filter#displacementFilter
        feTurbulence(type="turbulence" baseFrequency="0.05" :seed="seed" numOctaves="5" result="turbulence")
        feDisplacementMap(in2="turbulence" in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G")
      circle#test(cx="100" cy="100" r="75" style="filter: url(#displacementFilter)")
      
</template>

<script>
export default {
  props: ['radius', 'animate'],
  data() {
    return {
      seed: 0,
    };
  },
  mounted() {
    return;
    setInterval(() => {
      this.seed = ++this.seed % 20000;
    }, 1000);
  }
}
</script>

<style>

</style>