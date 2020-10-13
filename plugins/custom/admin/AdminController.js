import Controller from 'sockettools/src/Controller';
import Client from './index';

export default class AdminController extends Controller {

  register() {
    // this.addHandle('setFinish');
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  setFinish(request) {
    // Client._element.removeAttr(request.params.data.id, 'class', 'admin-screen--item--active');
  }

}