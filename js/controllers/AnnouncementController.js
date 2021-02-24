
import BaseController from "./BaseController.js";
import DataService from "../services/DataService.js"
import { announcementView } from "../views/views.js";
import AnnoucementByIdController from "./AnnoucementByIdController.js";


export default class AnnouncementController extends BaseController {
    render(announcements) {
        for (const announcement of announcements) {
            const col4 = document.createElement('div');
            col4.setAttribute('class', 'col-xs-4 ml-auto');
            col4.setAttribute('id', announcement.id);
            col4.innerHTML = announcementView(announcement);
            new AnnoucementByIdController(col4, announcement)
            this.element.appendChild(col4);
        }
        
    }

    navBar(user) {
        console.log(user);
    }

     async loadAnnouncements() {
        this.publish(this.events.START_LOADING, {});
        try {
            const announcements = await DataService.getAnnouncements();
            console.log(announcements);
            this.render(announcements);
        } catch (error) {
            console.error('error', error)
            this.publish(this.events.ERROR, error);
        } finally {
            this.publish(this.events.FINISH_LOADING, {});
        }
    }
}
