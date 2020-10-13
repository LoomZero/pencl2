import Media from './Media';

export default class Video extends Media {

  get wrapper() {
    return 'videos';
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