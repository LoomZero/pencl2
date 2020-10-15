<template lang="pug">
  .game-screen
    .game-screen--audio
      .game-screen--music(ref="music")
      .game-screen--sound(ref="sound")
    .game-screen--content
      .game-screen--video(ref="video")
      .game-screen--images
        .game-screen--image.game-screen--showable(v-for="image in images", :key="image.src", :class="{'game-screen--show': image.show}", :style="{'background-image': 'url(' + image.src + ')'}", @transitionend="removeImage()")
      .game-screen--blend.game-screen--showable(:class="{'game-screen--show': blend}", @transitionend="onFinish('blend')")
</template>

<script>
import Client from '~/plugins/custom/screen';
import Manager from '~/plugins/custom/screen/Manager';
import AsyncHander from '~/plugins/core/event/AsyncHandler';

const handler = new AsyncHander();

export default {
  data() {
    return {
      blend: true,
      imagedata: [],
    };
  },
  computed: {
    images() {
      return this.imagedata.slice().reverse();
    }
  },
  methods: {
    removeImage() {
      this.imagedata.shift();
    },
    setImage(src) {
      if (this.imagedata[0] && this.imagedata[0].src === src) {
        return Promise.resolve();
      }
      const image = new Image();
      image.onload = () => {
        this.imagedata.push({
          show: true,
          src: src,
        });
        if (this.imagedata.length === 2) {
          this.$nextTick(() => {
            this.imagedata[0].show = false;
          });
        }
        this.onFinish(src);
      };
      image.src = src;
      return handler.get(src).promise;
    },
    setBlend(blend) {
      if (blend && this.blend) {
        return Promise.resolve(this);
      } else {
        this.blend = blend;
        return handler.get('blend').promise;
      }
    },
    onFinish(name) {
      handler.resolve(name, this);
    },
  },
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
    position: relative
    width: 100%
    height: 100%

  &--video,
  &--images,
  &--image,
  &--blend
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  &--image
    background-size: cover

  &--content,
  &--blend
    background: black

  &--showable
    opacity: 0
    transition: opacity .3s ease-in-out

  &--show
    opacity: 1

</style>