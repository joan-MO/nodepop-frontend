import BaseController from './BaseController.js';
import { errorView } from '../views/views.js';


export default class ErrorController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.ERROR, (error) => {
            this.showError(error);
        });
    }

    showError(errorMessage) {
        this.element.innerHTML = errorView(errorMessage);
        this.element.style.display = 'block';
        this.element.addEventListener('click', (event) => {
            if (event.target == this.element || event.target.classList.contains('close')) {
                this.element.style.display ='none'
            }
        })
    }

}
