import AnnoucementByIdController from "./controllers/AnnoucementByIdController.js";
import AnnoucementDetailController from "./controllers/AnnoucementDetailController.js";
import AnnouncementController from "./controllers/AnnouncementController.js";
import ErrorController from "./controllers/ErrorController.js";
import LoaderController from "./controllers/LoaderController.js";
import NewAnnoucementOrLoginController from "./controllers/NewAnnoucementOrLoginController.js";

window.addEventListener('DOMContentLoaded', async (event) => {
    const loader = document.querySelector('.spinner-border');
    const loaderController = new LoaderController(loader);

    const announcementElement = document.querySelector('.list');
    const controller = new AnnoucementDetailController(announcementElement);
    controller.loadAnnouncementById();

    const errorsElement = document.querySelector('.modal');
    const errorController = new ErrorController(errorsElement);

});