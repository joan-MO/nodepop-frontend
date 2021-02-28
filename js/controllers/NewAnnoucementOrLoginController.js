import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class NewAnnoucementOrLoginController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
    }

    async checkIfUserIsLogged() {
        const usesIsLogged = await dataService.isUserLogged();
        if (usesIsLogged) {
            const addAnnouncementButton = this.element.querySelector('.new-logout-button');
            addAnnouncementButton.classList.remove('is-hidden');
        } else {
            const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden');
        }
    }

}
