<template lang="pug">
  .loader(:class="classes", :style="styles")
    .loader--icon(:style="iconStyles")
    .loader--info
      .loader--type(v-if="type", :style="iconStyles")
        img.loader--image(:src="'/images/icons/' + type + '.svg'")
      .loader--more(v-if="more", :style="iconStyles")
        img.loader--image(:src="'/images/icons/' + more + '.svg'")
</template>

<script>
export default {
  props: ['size'],
  data() {
    return {
      type: null,
      more: null,
      modi: [],
    };
  },
  computed: {
    styles() {
      let height = this.size;

      if (this.modi.includes('show-more')) {
        height = 'calc(' + this.size + ' * 3)';
      }
      return {
        width: this.size,
        height: height,
      };
    },
    iconStyles() {
      return {
        width: this.size,
        height: this.size,
      };
    },
    classes() {
      const classes = [];

      for (const modi of this.modi) {
        classes.push('loader--' + modi);
      }
      return classes;
    }
  },
  methods: {
    open(type, more) {
      this.type = type;
      this.more = more;
      this.modi.push('open');
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.showMore.bind(this), 2000);
    },
    close() {
      this.type = null;
      this.more = null;
      this.modi = [];
      clearTimeout(this.timeout);
    },
    showMore() {
      clearTimeout(this.timeout);
      this.modi.push('show-more');
    }
  }
}
</script>

<style lang="sass">
.loader 
  display: inline-block
  opacity: 0
  transition: opacity .3s ease-in-out, height .3s ease-in-out
  height: 100%
  overflow: hidden

  &--icon:before
    content: " "
    display: block
    width: 100%
    height: 100%
    border-radius: 50%
    border: 5px solid #fff
    border-color: #fff transparent #fff transparent
    animation: loader 1s linear infinite

  &--open
    opacity: 1

  &--type,
  &--more
    padding: 2px
    transition: opacity .3s .3s ease-in-out
    opacity: 0

  &--image
    width: 100%
    height: 100%

  &--show-more &--type,
  &--show-more &--more,
    opacity: 1
  
@keyframes loader
  0% 
    transform: rotate(0deg)
  
  100% 
    transform: rotate(360deg)

</style>