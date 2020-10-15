<template lang="pug">
  .admin-screen
    .admin-screen--message(:class="messageClasses", @transitionend="messageClosed")
      | {{ message.text }}
    .admin-screen--wrapper
      .admin-screen--item(v-for="item in items", :key="item.id", @click="click(item)")
        .admin-screen--name
          | {{ item.name }}
        .admin-screen--states
          .admin-screen--state(v-for="bool, state in getState(item)", :key="state", :class="stateClasses(item, state)")
            img.admin-screen--state-icon(:src="'/images/icons/' + state + '.svg'")
</template>

<script>
import Client from '~/plugins/custom/admin';

export default {
  data() {
    return {
      message: {
        open: false,
        state: null,
        text: 'Hallo',
      },
      items: {},
      states: {},
    };
  },
  computed: {
    messageClasses() {
      return {
        'admin-screen--message-open': this.message.open,
        'admin-screen--state-info': this.message.state === 'info',
        'admin-screen--state-warn': this.message.state === 'warn',
        'admin-screen--state-error': this.message.state === 'error',
      };
    }
  },
  methods: {
    messageClosed() {
      if (this.message.open === false) {
        this.message.state = null;
        this.message.text = null;
      }
    },
    setMessage(status, text, time = 3000) {
      this.message.state = status;
      this.message.open = true;
      this.message.text = text;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.message.open = false;
      }, time);
    },
    stateClasses(item, state) {
      const classes = [];

      classes.push('admin-screen--state-' + state);
      if (this.states[item.id] && this.states[item.id].includes(state)) {
        classes.push('admin-screen--state-active');
      }
      return classes;
    },
    getState(item) {
      const states = {};

      for (const state of item.states) {
        states[state] = false;
      }
      return states;
    },
    async click(item) {
      const response = await Client.screen('start', {item});
      if (this.checkResponse(response, item.name)) {
        this.setMessage('info', 'Sended "' + item.name + '"!');
      }
    },
    checkResponse(response, description = null) {
      if (!response.isOK()) {
        if (description) {
          description = 'Error by "' + description + '": ';
        } else {
          description = 'Error: ';
        }
        if (response.data.error) {
          this.setMessage('error', description + response.data.error);
        } else {
          this.setMessage('error', description + 'Unknown error');
        }
        return false;
      }
      return true;
    },
    setState(state) {
      this.states = state;
    },
  },
  async mounted() {
    const data = await Client.request('getData');

    this.items = data.data;
    Client.mount(this);
    Client.getState();
  },
}
</script>

<style lang="sass">
.admin-screen
  width: 100vw
  height: 100vh
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/bg/blacklight.jpg')
  background-size: cover

  &--wrapper
    display: flex
    flex-wrap: wrap
    overflow-y: auto
    height: 100%

  &--item
    display: flex
    width: 100%
    align-items: center
    font-size: 30px
    border: 1px solid black

  &--name
    width: 100%
    padding: 0 20px

  &--states
    display: flex
    height: 100%

  &--state
    display: flex
    justify-content: center
    align-items: center
    width: 50px
    height: 100%
    border-left: 1px solid black

  &--state-icon
    width: 80%

  &--state-active
    background: rgba(255, 255, 255, .4)

  &--message
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 0
    overflow: hidden
    transition: height .5s ease-in-out
    display: flex
    justify-content: left
    align-items: center
    padding: 0 20px

  &--message-open
    height: 50px

  &--state-info
    background: #50c467

  &--state-warn
    background: #fedc86

  &--state-error
    background: #f25c54

</style>