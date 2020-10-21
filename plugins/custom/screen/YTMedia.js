import Media from './Media';
import YT from 'yt-player';

export default class YTMedia extends Media {

  constructor(manager, data) {
    super(manager, data);
    this._options = {
      wmode: 'transparent',
      host: 'https://www.youtube-nocookie.com',
      modestBranding: false,
    };

    this.player = null;
  }

  get volume() {
    return 100;
  }

  get auotplay() {
    return true;
  }

  async stop() {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    } 
    return super.stop();
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

    if (this.player) this.player.destroy();
    this.player = new YT(this._target, this._options);
    this.player.load(options, this.auotplay);
    this.player.on('buffering', this.onReady.bind(this));
    this.player.on('playing', this.onPlay.bind(this));
    this.player.on('ended', this.onEnded.bind(this));

    if (item.volume === undefined) {
      this.player.setVolume(this.volume);
    } else {
      this.player.setVolume(item.volume);
    }
  }

  onReady() {
    this.manager.element.openLoading(this.wrapper, 'yt');
  }

  /**
   * @abstract
   */
  onPlay() { 
    this.manager.element.clearLoading();
  }

}