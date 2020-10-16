import Sound from './Sound';
import Music from './Music';
import Video from './Video';
import Image from './Image';
import Client from './index';

class Manager {

  constructor() {
    this._element = null;
    this._interval = setInterval(async () => {
      const response = await this.update();
      if (!response.isOK() && this._element) {
        this._element.$refs.message.setResponse(response);
      }
    }, 1000);
  }

  /**
   * @returns {import('vue').default}
   */
  get element() {
    return this._element;
  }

  mount(element) {
    this._element = element;
    this._players = {};
    this._image = null;
    this.update();
  }

  execute(data) {
    Promise.all([
      this.sound(data),
      this.music(data),
      this.video(data),
      this.image(data),
    ]).then(() => {
      this.update();
    });
  }

  /**
   * @param {import('./Media').default} media 
   */
  async clear(media) {
    if (media) {
      await media.stop();
      return media.id;
    }
    return null;
  }

  /**
   * @param {string} type 
   * @param {import('./Media').default} media 
   */
  async play(type, media) {
    const id = await this.clear(this._players[type]);
    if (id === media.id) {
      this._players[type] = null;
    } else {
      media.setTarget(this._element.$refs[type]);
      media.play();
      this._players[type] = media;
    }
  }

  onFinish(type) {
    return this.clear(this._players[type]).then(() => {
      this._players[type] = null;
      this.update();
    });
  }

  sound(data) {
    if (!data.sounds) return;
    return this.play('sound', new Sound(this, data));
  }

  music(data) {
    if (!data.musics) return;
    return this.play('music', new Music(this, data));
  }

  video(data) {
    if (!data.videos) return;
    return this.onFinish('image').then(() => {
      return this.play('video', new Video(this, data));
    });
  }

  image(data) {
    if (!data.images) return;
    return this.onFinish('video').then(() => {
      return this.play('image', new Image(this, data));
    });
  }

  update() {
    return Client.update(this.getState());
  }

  getState() {
    const state = {};

    for (const type in this._players) {
      if (this._players[type]) {
        state[this._players[type].id] = state[this._players[type].id] || [];
        state[this._players[type].id].push(this._players[type].wrapper);
      }
    }
    return state;
  }

};

export default new Manager();