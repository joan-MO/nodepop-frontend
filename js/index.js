import AnnouncementController from "./controllers/AnnouncementController.js";
import ErrorController from "./controllers/ErrorController.js";
import LoaderController from "./controllers/LoaderController.js";
import NewAnnoucementOrLoginController from "./controllers/NewAnnoucementOrLoginController.js";

window.addEventListener('DOMContentLoaded', async (event) => {
    const loader = document.querySelector('.spinner-border');
    const loaderController = new LoaderController(loader);

    const announcementElement = document.querySelector('.announcement-list');
    const controller = new AnnouncementController(announcementElement);
    controller.loadAnnouncements();

    const newTweetButtons = document.querySelector('.add-announcement');
    new NewAnnoucementOrLoginController(newTweetButtons);

    const errorsElement = document.querySelector('.modal');
    const errorController = new ErrorController(errorsElement);

});