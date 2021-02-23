import ErrorController from "./controllers/ErrorController.js";
import LoaderController from "./controllers/LoaderController.js";
import NewAnnouncementController from "./controllers/NewAnnoucementController.js";

window.addEventListener('DOMContentLoaded', async (event) => {
    const loader = document.querySelector('.spinner-border');
    const loaderController = new LoaderController(loader);
    
    const errorsElement = document.querySelector('.modal');
    const errorController = new ErrorController(errorsElement);

    
    const formElement = document.querySelector('form');
    new NewAnnouncementController(formElement);

});