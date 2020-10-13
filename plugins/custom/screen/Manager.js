import Sound from './Sound';
import Music from './Music';
import Video from './Video';

class Manager {

  constructor() {
    this._element = null;
  }

  mount(element) {
    this._element = element;
    this._players = {};
  }

  execute(data) {
    this.sound(data);
    this.music(data);
    this.video(data);
  }

  clear(media) {
    if (media) {
      media.stop();
      return media.data.id;
    }
    return null;
  }

  play(type, media) {
    const id = this.clear(this._players[type]);
    if (id === media.data.id) {
      this._players[type] = null;  
    } else {
      this._players[type] = media;
      this._players[type].setTarget(this._element.$refs[type]);
      this._players[type].play();
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
    this.play('video', new Video(this, data));
  }

};

export default new Manager();