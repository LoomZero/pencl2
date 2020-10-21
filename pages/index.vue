<template lang="pug">
  LogoScreen(ref="logo")
</template>

<script>
import Client from '~/plugins/custom/screen';
import Manager from '~/plugins/custom/screen/Manager';
import LogoScreen from '~/components/custom/screen/LogoScreen';
export default {
  components: {
    LogoScreen
  },
  mounted() {
    Manager.mount(this);
  }
}
</script>

<style lang="sass">

</style>
