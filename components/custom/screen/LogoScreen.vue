<template lang="pug">
  .logo-screen(:class="classes", @click="outro = !outro")
    SVGEmbed(src="/effects/wavy.svg", style="display: none;")
    .logo-screen--layer.logo-screen--layer-witcher
      .logo-screen--center
        .logo-screen--witcher-bg
          img.logo-screen--witcher-image(src="/images/logos/witcher_serie.svg")
        .logo-screen--witcher-effect
          img.logo-screen--witcher(src="/images/logos/witcher_logo_3.svg")
    .logo-screen--layer.logo-screen--layer-logo
      .logo-screen--center
        .logo-screen--logo-effect
          Logo.logo-screen--logo(:animate="animate")
    .logo-screen--layer
      .logo-screen--center
        SlideMonster.logo-screen--monster(ref="monster")
    .logo-screen--layer.logo-screen--layer-outro
      .logo-screen--center
        img.logo-screen--outro-image(src="/images/witcher/witcher_1.png")
        img.logo-screen--outro-image(src="/images/witcher/witcher_2.png")
        img.logo-screen--outro-image(src="/images/witcher/witcher_3.png")
    .logo-screen--layer.logo-screen--layer-outro
      .logo-screen--center
        img.logo-screen--outro-leshy(src="https://images.wikia.com/witcher_gamepedia/images/8/8b/Tw3_journal_kernun_locked.png")
    
</template>

<script>
import Logo from "~/components/custom/media/Logo";
import SVGEmbed from '~/components/core/media/SVGEmbed';
import SlideMonster from '~/components/custom/media/SlideMonster';
import { Howl } from 'howler';

let item = null;
let state = false;

const Intro = new Howl({
  src: "/music/intro_final.mp3",
  onload: () => {
    play();
  },
  onend: () => {
    item.$router.push({
      path: '/screen',
    });
  },
});

function play() {
  if (state) {
    item.animate = true;
    Intro.play();
    setTimeout(() => {
      item.$refs.monster.start();
    }, 10000);
    setTimeout(() => {
      item.outro = true;
    }, 50000);
  } else {
    state = true;
  }
}

export default {
  components: {
    Logo,
    SVGEmbed,
    SlideMonster,
  },
  data() {
    return {
      animate: false,
      outro: false,
    }
  },
  computed: {
    classes() {
      return {
        'logo-screen---animate': this.animate,
        'logo-screen---outro': this.outro,
      };
    }
  },
  methods: {
    start() {
      play();
    },
  },
  mounted() {
    item = this;
  }
}
</script>

<style lang="sass">
.logo-screen
  width: 100vw
  height: 100vh
  background: black
  overflow: hidden
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/bg/blacklight.jpg')
  background-size: cover
  position: relative

  &--layer
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    opacity: 1
    transition: opacity .2s ease-in-out

  &---outro &--layer
    opacity: 0

  &---outro &--layer-outro
    opacity: 1

  &--center
    display: flex
    width: 100%
    height: 100%
    justify-content: center
    align-items: center

  &--logo
    display: inline-block
    width: 10vw
    height: auto

  &--witcher
    width: auto
    height: 80vh
    animation: logo--witcher-glow 5s ease-in-out infinite

  &--witcher-bg
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  
  &--witcher-image
    width: auto
    height: 100vh
    opacity: 0
    filter: blur(30px) url('#wavy')
    transform: scale(1.1)
    transition: filter 2s 9.3s, opacity .8s 9.3s, transform 2s 9.3s

  &---animate &--witcher-image
    filter: blur(2px) url('#wavy') drop-shadow(0 0 50px rgba(255, 255, 255, .2))
    transform: scale(1)
    opacity: .4

  &--witcher-effect
    mask: url(/effects/swich.png)
    mask-size: 3000% 100%
    padding: 0 50px

  &--witcher-text
    font-family: witcher
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    font-size: 10vw
    text-shadow: 5px 5px 5px black
    opacity: 0
    transition: opacity 1s 8s

  &---animate &--witcher-text
    opacity: 1

  &---animate &--layer-witcher &--center
    animation: logo--force-wave 2s linear infinite

  &---animate &--witcher-effect
    animation: logo--swich 2s 7s steps(29) forwards

  &---animate &--layer-logo &--center
    animation: logo--flip-shadow 5s forwards cubic-bezier(.22,1,.51,.99)

  &---animate &--logo-effect
    mask: url(/effects/swich.png)
    mask-size: 3000% 100%
    mask-position: 100% 0
    animation: logo--swich 2s 7s steps(29) reverse forwards

  &---animate &--logo
    animation: logo--flip 5s forwards cubic-bezier(.22,1,.51,.99)
 
  &--outro-image
    width: 25vw
    filter: brightness(0) drop-shadow(0 0 5px black) drop-shadow(0 0 5px black) drop-shadow(0 0 5px black) drop-shadow(0 0 5px black) drop-shadow(0 0 50px rgba(255, 255, 255, .2))
    transform: scale(1.5)
    opacity: 0

    &:nth-child(1),
    &:nth-child(3)
      transition: all 3s 2s ease-in-out  

    &:nth-child(2)
      width: 33vw
      transition: all 3s 2.8s ease-in-out

  &---outro &--outro-image
    transform: scale(1)
    opacity: 1

  &--outro-leshy
    width: 50vw
    filter: blur(5px) drop-shadow(0 0 5px rgba(255, 255, 255, .2))
    transform: scale(1.5)
    opacity: 0
    transition: all 4s 6s ease-in-out

  &---outro &--outro-leshy
    transform: scale(1)
    opacity: 1

</style>