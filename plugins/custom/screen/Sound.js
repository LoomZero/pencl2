import Media from './Media';

export default class Sound extends Media {

  get wrapper() {
    return 'sounds';
  }

  play() {
    const index = this.random(0, this.items.length - 1);
    this.load(this.items[index]);
  }

  onEnded() {
    super.onEnded();
    this.onFinish();
  }

}