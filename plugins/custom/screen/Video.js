import Music from './Music';

export default class Video extends Music {

  get wrapper() {
    return 'videos';
  }

  stop() {
    return this.manager.element.setBlend(true).then(() => {
      return super.stop();
    });
  }

  onPlay() {
    this.manager.element.setBlend(false);
  }

}