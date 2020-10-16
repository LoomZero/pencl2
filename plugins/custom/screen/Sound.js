import YTMedia from './YTMedia';

export default class Sound extends YTMedia {

  get wrapper() {
    return 'sounds';
  }

  get type() {
    return 'sound';
  }

  play() {
    const index = this.random(0, this.items.length - 1);
    this.load(this.items[index]);
  }

}