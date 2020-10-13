<template lang="pug">
  .slide-monster
    img.slide-monster--image(v-for="item in items", :src="item.src", :class="item.class", :style="item.style")
</template>

<script>
const source = [
  'https://images.wikia.com/witcher_gamepedia/images/7/72/Tw3_journal_woodlandspirit_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/d/d9/Tw3_journal_dettlaff_vampire_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/b/be/Tw3_journal_thewhitelady_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/5/53/Tw3_journal_gael_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/5/52/Tw3_journal_harrisi_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/a/ab/Tw3_journal_hym.png',
  'https://images.wikia.com/witcher_gamepedia/images/e/e2/Tw3_journal_ignisfatuus_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/d/da/Tw3_journal_melusine_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/e/e9/Tw3_journal_sharley_mh_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/2/25/Tw3_journal_morvudd_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/3/3b/Tw3_journal_archgriffin_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/8/8b/Tw3_journal_sarasti_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/2/23/Tw3_journal_devilbythewell_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/5/59/Tw3_journal_therazane_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/c/cf/Tw3_journal_whamawham_locked.png',
  'https://images.wikia.com/witcher_gamepedia/images/9/99/Tw3_journal_spriggan_mh_locked.png',
];

function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

export default {
  props: ['time'],
  data() {
    const items = [];
    for (const src of source) {
      items.push({
        src: src,
        class: [],
        style: {},
      });
    }
    return {
      items: items,
      active: [],
    };
  },
  methods: {
    next() {
      let index = random(0, this.items.length - 1);
      while (this.active.includes(index)) {
        index = ++index % this.items.length;
      }
      this.active.push(index);
      const direct = random(0, 3);
      let target = {};
      switch (direct) {
        case 0:
          target.top = '2vh';
          target.left = random(0, 90) + 'vw';
          break;
        case 1:
          target.top = random(0, 90) + 'vh';
          target.left = '88vw';
          break;
        case 2:
          target.top = '88vh';
          target.left = random(0, 90) + 'vw';
          break;
        case 3:
          target.top = random(0, 90) + 'vh';
          target.left = '2vw';
          break;
      }


      this.items[index].style.top = '40vh';
      this.items[index].style.left = '45vw';
      this.items[index].style.opacity = 0;
      this.items[index].style.width = '20vw';
      this.items[index].style.filter = 'blur(10px)';
      this.$forceUpdate();
      setTimeout(() => {
        this.items[index].style.top = target.top;
        this.items[index].style.left = target.left;
        this.items[index].style.opacity = '.4';
        this.items[index].style.width = '30vw';
        this.items[index].style.filter = 'blur(2px)';
        this.items[index].class.push('slide-monster--active');
        setTimeout(() => {
          this.items[index].style.opacity = 0;
          this.items[index].style.width = '20vw';
          this.items[index].style.filter = 'blur(10px)';
          this.$forceUpdate();
          setTimeout(() => {
            this.items[index].class = [];  
            this.active.splice(this.active.indexOf(index), 1);
          }, 5000);
        }, 5000);
      }, 100);
    },
    start() {
      setInterval(() => {
        this.next();
      }, (this.time || 10000) / 4);
    },
  },
}
</script>

<style lang="sass">
.slide-monster

  &--image
    position: absolute
    width: 10vw
    height: auto
    opacity: 0
  
  &--active
    transition: opacity 5s ease-in-out, top 10s ease-in-out, left 10s ease-in-out, width 5s ease-in-out, filter 5s ease-in-out

</style>