import Controller from 'sockettools/src/Controller';
import Client from './index';

export default class AdminController extends Controller {

  register() {
    this.addHandle('updateState');
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  updateState(request) {
    Client._element.setState(request.params.state);
  }

}