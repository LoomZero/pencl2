import YT from 'yt-player';

export default class Media {

  constructor(manager, data) {
    this._manager = manager;
    this._data = data;
    this._target = null;
    this._options = {
      wmode: 'transparent',
      host: 'https://www.youtube-nocookie.com',
      modestBranding: false,
    };

    this.player = null;
  }

  setTarget(target) {
    this._target = target;
  }

  /**
   * @returns {import('./Manager').default}
   */
  get manager() {
    return this._manager;
  }

  get data() {
    return this._data;
  }

  get items() {
    return this.data[this.wrapper];
  }

  get volume() {
    return 100;
  }

  stop() {
    this.player.destroy();
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  defaults() {
    return this.data.defaults || {};
  }

  isLoop() {
    return this.defaults().loop || false;
  }

  isShuffle() {
    return this.defaults().shuffle || false;
  }

  load(item) {
    const options = {
      videoId: (new URL(item.src)).searchParams.get('v'),
    };

    if (item.start) {
      options.startSeconds = item.start;
    }
    if (item.end) {
      options.endSeconds = item.end;
    }

    this.player = new YT(this._target, this._options);
    this.player.load(options, true);
    this.player.on('ended', this.onEnded.bind(this));

    if (item.volume === undefined) {
      this.player.setVolume(this.volume);
    } else {
      this.player.setVolume(item.volume);
    }
  }

  /**
   * @abstract
   * @returns {string}
   */
  get wrapper() {}

  /**
   * @abstract
   */
  play() {}

  /**
   * @abstract
   */
  onEnded() {
    this.stop();
    this.player = null;
  }

  /**
   * @abstract
   */
  onFinish() {}

}