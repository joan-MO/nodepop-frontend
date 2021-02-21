import AnnouncementController from "./controllers/AnnouncementController.js";

window.addEventListener('DOMContentLoaded', async (event) => {

    const announcementElement = document.querySelector('.announcement-list');
    const controller = new AnnouncementController(announcementElement);
    controller.loadAnnouncements();

});