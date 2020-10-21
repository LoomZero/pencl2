import Music from './Music';

export default class Video extends Music {

  get wrapper() {
    return 'videos';
  }

  get type() {
    return 'video';
  }

  stop() {
    return this.manager.element.setBlend(true).then(() => {
      return super.stop();
    });
  }

  onPlay() {
    super.onPlay();
    this.manager.element.setBlend(false);
  }

}