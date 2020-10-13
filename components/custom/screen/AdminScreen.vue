<template lang="pug">
  .admin-screen
    .admin-screen--wrapper
      .admin-screen--item(v-for="item in items", :class="attr(item.id, 'class')", @click="click(item)")
        | {{ item.name }}
</template>

<script>
import Client from '~/plugins/custom/admin';

export default {
  data() {
    return {
      items: {},
      data: {},
    };
  },
  methods: {
    attr(id, attr) {
      if (this.data[id] && this.data[id][attr]) return this.data[id][attr];
    },
    setAttr(id, attr, value, update = true) {
      this.data[id] = this.data[id] || {};
      this.data[id][attr] = value;
      if (update) this.$forceUpdate();
    },
    removeAttr(id, attr, value = null, update = true) {
      if (!this.data[id] || !this.data[id][attr]) return;
      if (value !== null && Array.isArray(this.data[id][attr])) {
        this.data[id][attr].splice(this.data[id][attr].indexOf(value), 1);
      } else {
        this.data[id][attr] = null;
      }
      if (update) this.$forceUpdate();
    },
    removeAllAttr(attr, value = null, update = true) {
      for (const id in this.data) {
        this.removeAttr(id, attr, value, false);
      }
      if (update) this.$forceUpdate();
    },
    async click(item) {
      const response = await Client.screen('start', {item});
      if (response.isOK()) {
        this.removeAllAttr('class', 'admin-screen--item--active', false);
        this.setAttr(item.id, 'class', ['admin-screen--item--active']);
      }
    },
  },
  async mounted() {
    const data = await Client.request('getData');

    this.items = data.data;
    Client.mount(this);
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

  &--item
    width: 100%
    padding: 20px
    font-size: 30px
    border: 1px solid black

    &--active
      background: rgba(255, 255, 255, .4)
</style>