import Controller from 'sockettools/src/Controller';
import Manager from './Manager';

export default class GameController extends Controller {

  register() {
    this.addHandle('start');
    this.addHandle('getState');
    this.addHandle('stop');
    this.addHandle('intro');
    this.addHandle('forward');
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

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  stop(request) {
    return Manager.stop(request.params.type || null);
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  intro(request) {
    if (Manager.element.$nuxt.$route.path === '/') {
      Manager.element.$refs.logo.start();
    } else {
      Manager.element.$router.push({
        path: '/',
      });
    }
  }

  /**
   * @param {import('sockettools/src/Request')} request 
   */
  forward(request) {
    Manager.next(request.params.type || 'music');
  }

}