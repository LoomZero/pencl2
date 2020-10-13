import Controller from 'sockettools/src/Controller';
import Manager from './Manager';

export default class GameController extends Controller {

  register() {
    this.addHandle('start');
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  start(request) {
    Manager.execute(request.params.item);
  }

}