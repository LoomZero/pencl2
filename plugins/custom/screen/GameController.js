import Controller from 'sockettools/src/Controller';
import Manager from './Manager';

export default class GameController extends Controller {

  register() {
    this.addHandle('start');
    this.addHandle('getState');
    this.addHandle('stop');
    this.addHandle('intro');
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
    console.log(Manager.element.$nuxt.$route.path);
    if (Manager.element.$nuxt.$route.path === '/') {
      Manager.element.$refs.logo.start();
    } else {
      Manager.element.$router.push({
        path: '/',
      });
    }
  }

}