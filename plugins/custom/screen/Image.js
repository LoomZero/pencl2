import Media from './Media';

export default class Image extends Media {

  get wrapper() {
    return 'images';
  }

  play() {
    this._register = Array.from(Array(this.items.length).keys());
    this._index = -1;
    this.next();
  }

  load(item) {
    this.manager.element.setImage(item.src).then(() => {
      this.manager.element.setBlend(false);
    });
  }

  getNextItem() {
    this._index++;
    if (this._index === this.items.length) {
      if (this.isLoop()) {
        this._index = 0;
      } else {
        return null;
      }
    }
    return this.items[this._index];
  }

  getRandomItem() {
    if (this._register.length === 0) {
      if (this.isLoop()) {
        this._register = Array.from(Array(this.items.length).keys());
      } else {
        return null;
      }
    }
    const index = this.random(0, this._register.length - 1);
    const value = this._register[index];
    this._register.splice(index, 1);
    return this.items[value];
  }

  next() {
    let item = null;
    if (this.isShuffle()) {
      item = this.getRandomItem();
    } else {
      item = this.getNextItem();
    }
    if (item === null) {
      this.onFinish();
    } else {
      this.load(item);
    }
  }

  onEnded() {
    this.next();
  }

  onFinish() {
    console.log('finish');
  }

  stop() {
    this.manager.element.setBlend(true);
    this.manager.element.removeImage();
    return this;
  }

}