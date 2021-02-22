import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import LoginController from './controllers/LoginController.js';



window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.spinner-border');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.modal');
    const errorController = new ErrorController(errorsElement);

    const formElement = document.querySelector('form');
    const formController = new LoginController(formElement);
});

