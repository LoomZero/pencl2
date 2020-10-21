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
    .game-screen--loader-frame(:class="{'game-screen--loader-frame--active': loading}")
      Loader.game-screen--loader(ref="loader", size="2vw")
    .game-screen--message
      Message.game-screen--message-size(ref="message")
</template>

<script>
import Client from '~/plugins/custom/screen';
import Manager from '~/plugins/custom/screen/Manager';
import AsyncHander from '~/plugins/core/event/AsyncHandler';
import Message from '~/components/core/state/Message';
import Loader from '~/components/core/media/Loader';

const handler = new AsyncHander();

export default {
  components: {
    Message,
    Loader
  },
  data() {
    return {
      blend: true,
      imagedata: [],
      loading: false,
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
    openLoading(type, more) {
      this.loading = true;
      this.$refs.loader.open(type, more);
    },
    clearLoading() {
      this.loading = false;
      this.$refs.loader.close();
    }
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

  &--message
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

  &--message-size
    min-width: 30vw
    min-height: 30vh

  &--loader-frame
    position: absolute
    top: 10vh
    right: calc(-45px - 2vw)
    padding: 20px
    border: 2px solid white
    border-right-width: 0
    background: #01c5c4
    font-size: 0
    transition: right .5s ease-in-out

    &--active
      right: 0

</style>