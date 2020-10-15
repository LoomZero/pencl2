import Client from 'socket.io-client';

import Server from 'sockettools/src/Server';
import AdminController from './AdminController';

const server = new Server();
server.addController(new AdminController(server));
const client = server.createClient(Client(process.env.WS_URL), 'admin');

class AdminClient {

  request(route, params) {
    return client.request(route, params);
  }

  screen(route, params) {
    return this.request('screen', { route, params });
  }

  async getState() {
    const response = await this.screen('getState');
    
    if (this._element.checkResponse(response)) {
      this._element.setState(response.data);
    }
  }

  mount(element) {
    this._element = element;
  }

};

export default new AdminClient();
