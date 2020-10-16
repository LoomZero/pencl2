<template lang="pug">
  .message(:class="classes", @transitionend="onTransitionend")
    .message--text
      | {{ text }}
</template>

<script>
import AsyncPromise from 'utils/src/AsyncPromise';

let open = null;
let close = null;

export default {
  data() {
    return {
      state: null,
      isOpen: false,
      text: null
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.state) {
        classes.push('message--' + this.state);
      }
      if (this.isOpen) {
        classes.push('message--open');
      }
      return classes;
    }
  },
  methods: {
    /**
     * @param {import('sockettools/src/Response')} response
     */
    setResponse(response) {
      if (response.isError()) {
        this.setMessage(response.data.error, 'error');
      }
    },
    setMessage(text, state = 'info', time = 5000) {
      this.text = text;
      this.state = state;
      if (time) this.open(time);
    },
    setTimeout(time) {
      clearTimeout(this.timeout);
      if (time) {
        this.timeout = setTimeout(() => {
          this.close();
        }, time);
      }
    },
    open(time = 5000) {
      if (time) this.setTimeout(time);
      if (this.isOpen) return Promise.resolve();
      open = new AsyncPromise();
      this.isOpen = true;
      this.setTimeout(time);
      return open.promise;
    },
    close() {
      if (!this.isOpen) return Promise.resolve();
      close = new AsyncPromise();
      this.isOpen = false;
      return close;
    },
    onTransitionend() {
      if (this.isOpen) {
        if (open) {
          open.resolve();
          open = null;
        }
      } else {
        if (close) {
          close.resolve();
          close = null;
        }
      }
    }
  },
};
</script>
<style lang="sass">
.message
  padding: 20px
  box-sizing: border-box
  transform: scale(0)
  transition: transform .6s cubic-bezier(0.34, 1.56, 0.64, 1)

  &--open
    transform: scale(1)

  &--info
    background: #50c467

  &--warn
    background: #fedc86
    color: black

  &--error
    background: #f25c54
</style>
