import Path from 'path';

import Controller from 'sockettools/src/Controller';

export default class ScreenController extends Controller {

  static getID(name) {
    return name
      .toLowerCase()
      .replace(/([^a-z0-9]+)/g, '_')
      .replace(/([_]+)/g, '_')
      .replace(/(^_+|_+$)/g, '');
  }

  register() {
    this._data = null;
    this.addHandle('getData');
    this.addHandle('screen');
    this.addHandle('admin');
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  getData(request) {
    if (this._data === null) {
      const json = Path.join(process.cwd(), 'static/data/data.json');
      const data = require(json);
      const format = {};

      for (const index in data) {
        data[index].id = ScreenController.getID(index);
        data[index].name = index;

        if (data[index].defaults) {
          for (const key in data[index].defaults) {
            for (const option of ['musics', 'images', 'sounds', 'videos']) {
              if (!data[index][option]) continue;
              for (const item in data[index][option]) {
                if (data[index][option][item][key] === undefined) {
                  data[index][option][item][key] = data[index].defaults[key];
                }
              }
            }
          }
        }

        format[data[index].id] = data[index];
      }

      this._data = format;
    }

    return this._data;
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  async screen(request) {
    const screens = this.server.getSockets('screen');

    let uuid = null;
    for (uuid in screens) break;
    
    if (screens[uuid]) {
      const response = await screens[uuid].request(request.params.route, request.params.params);
      return response.data;
    } else {
      throw new Error('No screen available.');
    }
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  async admin(request) {
    const admins = this.server.getSockets('admin');

    let uuid = null;
    for (uuid in admins) break;
    
    if (admins[uuid]) {
      const response = await admins[uuid].request(request.params.route, request.params.params); 
      return response.data;
    } else {
      throw new Error('No admin available.');
    }
  }

}