import Sound from './Sound';
import Music from './Music';
import Video from './Video';
import Image from './Image';

class Manager {

  constructor() {
    this._element = null;
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
  }

  execute(data) {
    this.sound(data);
    this.music(data);
    this.video(data);
    this.image(data);
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

  sound(data) {
    if (!data.sounds) return;
    this.play('sound', new Sound(this, data));
  }

  music(data) {
    if (!data.musics) return;
    this.play('music', new Music(this, data));
  }

  video(data) {
    if (!data.videos) return;
    this.clear(this._image).then(() => {
      this.play('video', new Video(this, data));
    });
  }

  image(data) {
    if (!data.images) return;
    this.clear(this._players['video']).then(() => {
      this._image = new Image(this, data);
      this._image.play();
    });
  }

};

export default new Manager();