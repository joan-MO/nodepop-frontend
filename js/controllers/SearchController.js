import BaseController from './BaseController.js';
import { debounce } from '../utils.js';

export default class SearchController extends BaseController {
    
    constructor(element) {
        super(element);
        this.element.addEventListener('keyup', debounce(ev => {
            const query = this.element.value;
            this.publish(this.events.SEARCH, query);
        }, 500))
    }

}
