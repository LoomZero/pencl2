<template lang="pug">
  .game-screen
    .game-screen--audio
      .game-screen--music(ref="music")
      .game-screen--sound(ref="sound")
    .game-screen--content
      .game-screen--video(ref="video")
</template>

<script>
import Client from '~/plugins/custom/screen';
import Manager from '~/plugins/custom/screen/Manager';

export default {
  mounted() {
    Manager.mount(this);
  }
}
</script>

<style lang="sass">
.game-screen
  width: 100vw
  height: 100vh
  overflow: hidden
  position: relative

  &--audio
    position: absolute
    bottom: 100%

  &--content
    width: 100%
    height: 100%

  &--video
    width: 100%
    height: 100%


</style>