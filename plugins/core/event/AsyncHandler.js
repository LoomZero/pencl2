import AsyncPromise from 'utils/src/AsyncPromise';

export default class AsyncHandler {

  constructor() {
    this._listeners = {};
  }

  /**
   * @param {string} name
   * @returns {AsyncPromise}
   */
  get(name) {
    if (!this._listeners[name]) {
      this._listeners[name] = new AsyncPromise();
    }
    return this._listeners[name];
  }

  /**
   * @param {string} name 
   * @param  {...any} args 
   */
  resolve(name, ...args) {
    this.get(name).resolve(...args);
    delete this._listeners[name];
  }

  /**
   * @param {string} name 
   * @param  {...any} args 
   */
  reject(name, ...args) {
    this.get(name).reject(...args);
    delete this._listeners[name];
  }

}