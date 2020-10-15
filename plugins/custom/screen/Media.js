import YT from 'yt-player';

export default class Media {

  constructor(manager, data) {
    this._manager = manager;
    this._data = data;
    this._target = null;
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

  get id() {
    return this.data.id;
  }

  async stop() {
    return this;
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

  /**
   * @abstract
   * @returns {string}
   */
  get wrapper() { }

  /**
   * @abstract
   */
  play() { }

  /**
   * @abstract
   */
  onEnded() {
    this.onFinish();
  }

  /**
   * @abstract
   */
  onFinish() { 
    this.stop();
  }

}