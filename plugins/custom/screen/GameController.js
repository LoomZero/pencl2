import Controller from 'sockettools/src/Controller';
import Manager from './Manager';

export default class GameController extends Controller {

  register() {
    this.addHandle('start');
    this.addHandle('getState');
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  start(request) {
    Manager.execute(request.params.item);
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  getState(request) {
    return Manager.getState();
  }

}