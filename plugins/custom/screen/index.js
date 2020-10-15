import Client from 'socket.io-client';

import Server from 'sockettools/src/Server';
import GameController from './GameController';

const server = new Server();
server.addController(new GameController(server));
const client = server.createClient(Client(process.env.WS_URL), 'screen');

class ScreenClient {

  request(route, params) {
    return client.request(route, params);
  }

  admin(route, params) {
    return this.request('admin', { route, params });
  }

  update(state) {
    return this.admin('updateState', { state });
  }

}

export default new ScreenClient();